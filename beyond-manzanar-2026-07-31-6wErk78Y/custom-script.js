
// leave at least one line of code here or the editor will disappear

// Beyond Manzanar Test Realm
// Notes: Usefull Notes.txt

const BARRACK_ID = 481241;
const SHOJI_ID = 481245;
const TRIGGER_CUBE_ID = 481246;

const CONFIG = {
  lookAhead: 2.5,
  rayHeightOffset: -2,
  disableJump: true,

  // Barrack entry cube
  entryDestSide: 'maxX',
  insideOvershoot: 0.75,
  triggerRadius: 7,
  cameraTweenMs: 1200,
  walkSpeed: 1,
  lockedSpeed: 0,
  hideTriggerCube: true,
  oneWay: false,
  debugEntry: false,

  // Shoji temple — step up + wall collisions (tune in Preview)
  // Heights are ~half the first pass (relative to floorDefault).
  // stairsSide = only open face (entry/exit + steps). Other faces = solid walls.
  // If stairs are on the wrong face, try: 'minZ' | 'maxZ' | 'minX' | 'maxX'
  shoji: {
    stairsSide: 'minZ',
    approachRadius: 35,
    floorDefault: 10,
    floorStep1: 11.25,
    floorStep2: 12,
    floorInside: 12.75,
    innerShrink: 0.22,
    doorHalfWidth: 4, // opening width on the stairs face
    doorDepth: 4, // how far from stairs face mesh hits are ignored (door only)
    stairRun: 5, // world units — both steps happen within this short distance
  },
};

const state = {
  prevX: null,
  prevZ: null,
  barrack: null,
  shoji: null,
  trigger: null,
  raycaster: null,
  groundY: null,
  hasEntered: false,
  cameraAnimating: false,
  proximityWired: false,
  mustLeaveCube: false,
  entryDebugAt: 0,
};

function isEditing() {
  return typeof mode !== 'undefined' && String(mode).indexOf('edit') === 0;
}

function getMover() {
  const cam = window.camera;
  if (!cam) return null;
  let mover = cam;
  while (mover.parent && mover.parent !== window.scene && mover.parent.type !== 'Scene') {
    mover = mover.parent;
  }
  return mover;
}

function getPlayerWorld() {
  const cam = window.camera;
  if (!cam) return null;
  const v = new THREE.Vector3();
  cam.getWorldPosition(v);
  return v;
}

function setPlayerXZ(x, z) {
  const mover = getMover();
  if (!mover) return;
  mover.position.x = x;
  mover.position.z = z;
}

function setPlayerFloor(y) {
  if (typeof nac.setFloorLevel === 'function') {
    nac.setFloorLevel(y);
  }
  const ms = window.controls;
  if (ms) ms.floorLevel = y;
  const mover = getMover();
  if (mover) mover.position.y = y;
  state.groundY = y;
}

function getArtwork(id, cacheKey) {
  if (state[cacheKey] && state[cacheKey].object3D) return state[cacheKey];
  state[cacheKey] = nac.getArtworkById(id);
  return state[cacheKey];
}

function getBarrack() {
  return getArtwork(BARRACK_ID, 'barrack');
}

function getShoji() {
  return getArtwork(SHOJI_ID, 'shoji');
}

function getTrigger() {
  return getArtwork(TRIGGER_CUBE_ID, 'trigger');
}

function getMeshBox(artwork) {
  if (!artwork || !artwork.object3D) return null;
  artwork.object3D.updateWorldMatrix(true, true);
  const box = new THREE.Box3().setFromObject(artwork.object3D);
  return box.isEmpty() ? null : box;
}

function getTriggerBox() {
  return getMeshBox(getTrigger());
}

function getShojiBox() {
  return getMeshBox(getShoji());
}

function getTriggerCenter() {
  const trigger = getTrigger();
  if (!trigger) return null;
  if (trigger.object3D) {
    trigger.object3D.updateWorldMatrix(true, true);
    const v = new THREE.Vector3();
    trigger.object3D.getWorldPosition(v);
    return v;
  }
  if (trigger.positionX != null) {
    return new THREE.Vector3(trigger.positionX, trigger.positionY || 0, trigger.positionZ);
  }
  return null;
}

function isInsideBoxXZ(pos, box, pad) {
  if (!pos || !box) return false;
  const p = pad || 0;
  return (
    pos.x >= box.min.x - p &&
    pos.x <= box.max.x + p &&
    pos.z >= box.min.z - p &&
    pos.z <= box.max.z + p
  );
}

function isInEntryZone(pos) {
  if (!pos) return false;
  const box = getTriggerBox();
  if (box && isInsideBoxXZ(pos, box, 1.5)) return true;
  const center = getTriggerCenter();
  if (!center) return false;
  const dx = pos.x - center.x;
  const dz = pos.z - center.z;
  return Math.sqrt(dx * dx + dz * dz) <= CONFIG.triggerRadius;
}

function nearTriggerCube(pos) {
  const box = getTriggerBox();
  if (!box || !pos) return false;
  const pad = 8;
  return isInsideBoxXZ(pos, box, pad);
}

// --- Wall collisions (barrack + shoji) ---

function castMeshRay(meshRoot, fromX, fromY, fromZ, toX, toZ) {
  if (!meshRoot) return null;

  const dx = toX - fromX;
  const dz = toZ - fromZ;
  const dist = Math.sqrt(dx * dx + dz * dz);
  if (dist < 0.0001) return null;

  if (!state.raycaster) state.raycaster = new THREE.Raycaster();

  const origin = new THREE.Vector3(fromX, fromY + CONFIG.rayHeightOffset, fromZ);
  const direction = new THREE.Vector3(dx, 0, dz).normalize();

  state.raycaster.set(origin, direction);
  state.raycaster.near = 0;
  state.raycaster.far = dist + CONFIG.lookAhead;

  const hits = state.raycaster.intersectObject(meshRoot, true);
  return hits.length ? hits[0] : null;
}

function isInShojiDoorGap(x, z, box) {
  const side = CONFIG.shoji.stairsSide;
  const half = CONFIG.shoji.doorHalfWidth;
  const cx = (box.min.x + box.max.x) * 0.5;
  const cz = (box.min.z + box.max.z) * 0.5;

  if (side === 'minZ' || side === 'maxZ') {
    return Math.abs(x - cx) <= half;
  }
  return Math.abs(z - cz) <= half;
}

// Only the stairs-face doorway — not the whole center aisle through the temple
function isNearShojiDoorFace(x, z, box) {
  const depth = CONFIG.shoji.doorDepth != null ? CONFIG.shoji.doorDepth : 4;
  const side = CONFIG.shoji.stairsSide;

  if (side === 'minZ') {
    return z >= box.min.z - depth && z <= box.min.z + depth;
  }
  if (side === 'maxZ') {
    return z <= box.max.z + depth && z >= box.max.z - depth;
  }
  if (side === 'minX') {
    return x >= box.min.x - depth && x <= box.min.x + depth;
  }
  return x <= box.max.x + depth && x >= box.max.x - depth;
}

function isInShojiDoorPassage(x, z, box) {
  return isInShojiDoorGap(x, z, box) && isNearShojiDoorFace(x, z, box);
}

// Deck ≈ inside the railing (mesh AABB is larger because of roof eaves)
function isOnShojiDeck(x, z, box) {
  const frac = 0.14;
  const sx = (box.max.x - box.min.x) * frac;
  const sz = (box.max.z - box.min.z) * frac;
  return (
    x >= box.min.x + sx &&
    x <= box.max.x - sx &&
    z >= box.min.z + sz &&
    z <= box.max.z - sz
  );
}

function isElevatedAtShoji() {
  const ms = window.controls;
  const y = ms && ms.floorLevel != null ? ms.floorLevel : null;
  if (y == null) return false;
  return y > CONFIG.shoji.floorDefault + 0.35;
}

// Elevated walk allowed on deck OR in door/stair gap (same width as entry).
// Blocks corridor → empty land beside stairs (parallel to stairs).
function isAllowedElevatedShojiXZ(x, z, box) {
  return isOnShojiDeck(x, z, box) || isInShojiDoorGap(x, z, box);
}

function resolveElevatedBesideStairs(prevX, prevZ, x, z, box) {
  if (!isElevatedAtShoji()) return null;
  const wasOk = isAllowedElevatedShojiXZ(prevX, prevZ, box);
  const nowOk = isAllowedElevatedShojiXZ(x, z, box);
  if (wasOk && !nowOk) return { x: prevX, z: prevZ };
  return null;
}

function clampElevatedBesideStairs() {
  if (state.cameraAnimating || isEditing()) return;

  const pos = getPlayerWorld();
  const box = getShojiBox();
  if (!pos || !box || !isElevatedAtShoji()) return;

  if (!isAllowedElevatedShojiXZ(pos.x, pos.z, box)) {
    if (state.prevX != null && state.prevZ != null) {
      setPlayerXZ(state.prevX, state.prevZ);
    }
  }
}

// Solid footprint walls on all faces except the stairs door gap
function resolveShojiFootprint(prevX, prevZ, x, z, box) {
  const wasInside = isInsideBoxXZ({ x: prevX, z: prevZ }, box, 0);
  const nowInside = isInsideBoxXZ({ x: x, z: z }, box, 0);
  if (wasInside === nowInside) return null;

  const side = CONFIG.shoji.stairsSide;
  let crossedStairsFace = false;

  if (side === 'minZ') {
    crossedStairsFace =
      (prevZ < box.min.z && z >= box.min.z) || (prevZ >= box.min.z && z < box.min.z);
  } else if (side === 'maxZ') {
    crossedStairsFace =
      (prevZ > box.max.z && z <= box.max.z) || (prevZ <= box.max.z && z > box.max.z);
  } else if (side === 'minX') {
    crossedStairsFace =
      (prevX < box.min.x && x >= box.min.x) || (prevX >= box.min.x && x < box.min.x);
  } else if (side === 'maxX') {
    crossedStairsFace =
      (prevX > box.max.x && x <= box.max.x) || (prevX <= box.max.x && x > box.max.x);
  }

  // Crossing the stairs face through the door gap is allowed (enter/exit)
  if (crossedStairsFace && isInShojiDoorGap(x, z, box)) return null;
  if (crossedStairsFace && isInShojiDoorGap(prevX, prevZ, box)) return null;

  // Any other face (or stairs face outside the door) = solid wall
  return { x: prevX, z: prevZ };
}

function enforceWallCollisions() {
  if (state.cameraAnimating) return;

  const pos = getPlayerWorld();
  if (!pos) return;
  if (nearTriggerCube(pos)) return;

  if (state.prevX == null || state.prevZ == null) {
    state.prevX = pos.x;
    state.prevZ = pos.z;
    return;
  }

  // Shoji: block all sides except stairs door gap
  const shojiBox = getShojiBox();
  if (shojiBox) {
    const blocked = resolveShojiFootprint(state.prevX, state.prevZ, pos.x, pos.z, shojiBox);
    if (blocked) {
      setPlayerXZ(blocked.x, blocked.z);
      return;
    }

    // Only change vs main: block elevated walk off corridor onto land beside stairs
    const beside = resolveElevatedBesideStairs(
      state.prevX,
      state.prevZ,
      pos.x,
      pos.z,
      shojiBox
    );
    if (beside) {
      setPlayerXZ(beside.x, beside.z);
      return;
    }
  }

  // Barrack mesh collisions (and shoji mesh for interior walls)
  const walls = [getBarrack(), getShoji()];
  for (let i = 0; i < walls.length; i++) {
    const art = walls[i];
    if (!art || !art.object3D) continue;
    const hit = castMeshRay(art.object3D, state.prevX, pos.y, state.prevZ, pos.x, pos.z);
    if (hit) {
      // Allow shoji mesh hits ONLY at the stairs doorway — not the whole center aisle
      if (
        art === getShoji() &&
        shojiBox &&
        (isInShojiDoorPassage(pos.x, pos.z, shojiBox) ||
          isInShojiDoorPassage(state.prevX, state.prevZ, shojiBox))
      ) {
        continue;
      }
      setPlayerXZ(state.prevX, state.prevZ);
      return;
    }
  }

  state.prevX = pos.x;
  state.prevZ = pos.z;
}

// --- Shoji steps (only on stairs side; raise/lower as you enter/exit) ---

function getShojiInnerBox(box) {
  const inner = box.clone();
  const sx = (box.max.x - box.min.x) * CONFIG.shoji.innerShrink;
  const sz = (box.max.z - box.min.z) * CONFIG.shoji.innerShrink;
  inner.min.x += sx;
  inner.max.x -= sx;
  inner.min.z += sz;
  inner.max.z -= sz;
  return inner;
}

// 0 = foot of stairs, 1 = top of stair run (door threshold) — short distance only
function getStairProgress(pos, box) {
  const side = CONFIG.shoji.stairsSide;
  const run = Math.max(CONFIG.shoji.stairRun, 2);
  let dist = 0;

  if (side === 'minZ') dist = pos.z - (box.min.z - run);
  else if (side === 'maxZ') dist = box.max.z + run - pos.z;
  else if (side === 'minX') dist = pos.x - (box.min.x - run);
  else dist = box.max.x + run - pos.x;

  return dist / run;
}

function floorFromStairProgress(t) {
  const s = CONFIG.shoji;
  if (t <= 0) return s.floorDefault;
  if (t < 0.5) return s.floorStep1; // step 1 — first half of stair run
  if (t < 1) return s.floorStep2; // step 2 — second half of stair run
  return s.floorInside;
}

function isOnStairsApproach(pos, box) {
  const side = CONFIG.shoji.stairsSide;
  const half = CONFIG.shoji.doorHalfWidth + 2;
  const cx = (box.min.x + box.max.x) * 0.5;
  const cz = (box.min.z + box.max.z) * 0.5;
  const reach = CONFIG.shoji.approachRadius;

  if (side === 'minZ') {
    return (
      Math.abs(pos.x - cx) <= half &&
      pos.z >= box.min.z - reach &&
      pos.z <= box.max.z
    );
  }
  if (side === 'maxZ') {
    return (
      Math.abs(pos.x - cx) <= half &&
      pos.z <= box.max.z + reach &&
      pos.z >= box.min.z
    );
  }
  if (side === 'minX') {
    return (
      Math.abs(pos.z - cz) <= half &&
      pos.x >= box.min.x - reach &&
      pos.x <= box.max.x
    );
  }
  return (
    Math.abs(pos.z - cz) <= half &&
    pos.x <= box.max.x + reach &&
    pos.x >= box.min.x
  );
}

function getShojiStepFloor(pos, box) {
  const inner = getShojiInnerBox(box);
  if (isInsideBoxXZ(pos, inner, 0)) {
    return CONFIG.shoji.floorInside;
  }

  return floorFromStairProgress(getStairProgress(pos, box));
}

function applyShojiSteps() {
  if (isEditing() || state.cameraAnimating) return;

  const pos = getPlayerWorld();
  const box = getShojiBox();
  if (!pos || !box) return;

  let target = CONFIG.shoji.floorDefault;

  // Height changes only on the stairs corridor / inside — not from other sides
  if (isInsideBoxXZ(pos, box, 0) || isOnStairsApproach(pos, box)) {
    if (isInsideBoxXZ(pos, box, 0)) {
      target = getShojiStepFloor(pos, box);
    } else if (isOnStairsApproach(pos, box)) {
      target = floorFromStairProgress(getStairProgress(pos, box));
    }
  }

  setPlayerFloor(target);
}

// --- Jump disabled ---

function disableJumpAtSource() {
  const ms = window.controls;
  if (!ms || ms._bmJumpDisabled) return;
  ms.doJump = function () {};
  ms._bmJumpDisabled = true;
}

function blockJump() {
  if (!CONFIG.disableJump || isEditing()) return;

  disableJumpAtSource();

  const ms = window.controls;
  if (ms && ms.velocity) ms.velocity.y = 0;

  const mover = getMover();
  if (!mover) return;

  const floorY = ms && ms.floorLevel != null ? ms.floorLevel : null;
  if (floorY != null) {
    mover.position.y = floorY;
    state.groundY = floorY;
    return;
  }

  const y = mover.position.y;
  if (state.groundY == null || y <= state.groundY) {
    state.groundY = y;
    return;
  }
  mover.position.y = state.groundY;
}

// --- Barrack entry (trigger cube) ---

function lockNavigation() {
  if (typeof nac.setMovementSpeed === 'function') {
    nac.setMovementSpeed(CONFIG.lockedSpeed);
  }
  if (window.desktopControls) {
    if (state._prevDesktopEnabled == null) {
      state._prevDesktopEnabled = window.desktopControls.enabled;
    }
    window.desktopControls.enabled = false;
  }
  const ms = window.controls;
  if (ms && ms.moving) {
    ms.moving.forward = false;
    ms.moving.backward = false;
    ms.moving.left = false;
    ms.moving.right = false;
  }
  if (ms && ms.velocity) ms.velocity.set(0, 0, 0);
}

function unlockNavigation() {
  if (typeof nac.setMovementSpeed === 'function') {
    nac.setMovementSpeed(CONFIG.walkSpeed);
  }
  if (window.desktopControls) {
    window.desktopControls.enabled = true;
    state._prevDesktopEnabled = null;
  }
}

function getInsideFaceWorldDest(playerPos) {
  const box = getTriggerBox();
  const center = getTriggerCenter();
  const ms = window.controls;
  const floorY = ms && ms.floorLevel != null ? ms.floorLevel : playerPos.y;
  const over = CONFIG.insideOvershoot;
  const clear = CONFIG.triggerRadius + 2;

  let x = playerPos.x;
  let z = playerPos.z;

  if (box) {
    if (CONFIG.entryDestSide === 'maxX') {
      x = box.max.x + over;
      z = Math.min(box.max.z, Math.max(box.min.z, playerPos.z));
    } else if (CONFIG.entryDestSide === 'minX') {
      x = box.min.x - over;
      z = Math.min(box.max.z, Math.max(box.min.z, playerPos.z));
    } else if (CONFIG.entryDestSide === 'maxZ') {
      z = box.max.z + over;
      x = Math.min(box.max.x, Math.max(box.min.x, playerPos.x));
    } else {
      z = box.min.z - over;
      x = Math.min(box.max.x, Math.max(box.min.x, playerPos.x));
    }
  } else if (center) {
    if (CONFIG.entryDestSide === 'maxX') x = center.x + clear;
    else if (CONFIG.entryDestSide === 'minX') x = center.x - clear;
    else if (CONFIG.entryDestSide === 'maxZ') z = center.z + clear;
    else z = center.z - clear;
  }

  if (center) {
    if (CONFIG.entryDestSide === 'maxX') x = Math.max(x, center.x + clear);
    else if (CONFIG.entryDestSide === 'minX') x = Math.min(x, center.x - clear);
    else if (CONFIG.entryDestSide === 'maxZ') z = Math.max(z, center.z + clear);
    else z = Math.min(z, center.z - clear);
  }

  return { x: x, y: floorY, z: z };
}

function startForcedPush() {
  if (state.cameraAnimating) return;
  if (CONFIG.oneWay && state.hasEntered) return;

  state.cameraAnimating = true;
  lockNavigation();

  const mover = getMover();
  const camWorld = getPlayerWorld();
  if (!mover || !camWorld) {
    state.cameraAnimating = false;
    unlockNavigation();
    return;
  }

  const destWorld = getInsideFaceWorldDest(camWorld);
  const from = { x: mover.position.x, y: mover.position.y, z: mover.position.z };
  const to = {
    x: mover.position.x + (destWorld.x - camWorld.x),
    y: mover.position.y,
    z: mover.position.z + (destWorld.z - camWorld.z),
  };

  if (typeof nac.tween !== 'function') {
    mover.position.x = to.x;
    mover.position.y = to.y;
    mover.position.z = to.z;
    state.cameraAnimating = false;
    unlockNavigation();
    state.hasEntered = true;
    state.mustLeaveCube = true;
    return;
  }

  nac.tween({
    from: from,
    to: to,
    duration: CONFIG.cameraTweenMs,
    onFrame: function (v) {
      mover.position.x = v.x;
      mover.position.y = v.y;
      mover.position.z = v.z;
      state.prevX = v.x;
      state.prevZ = v.z;
    },
    onComplete: function () {
      state.cameraAnimating = false;
      unlockNavigation();
      state.hasEntered = true;
      state.mustLeaveCube = true;
      if (window.desktopControls) window.desktopControls.enabled = true;
      if (typeof nac.setMovementSpeed === 'function') {
        nac.setMovementSpeed(CONFIG.walkSpeed);
      }
    },
  });
}

function checkProximityEntry() {
  if (state.cameraAnimating) return;

  const pos = getPlayerWorld();
  if (!pos || !getTrigger()) return;

  const inZone = isInEntryZone(pos);

  if (state.mustLeaveCube) {
    if (!inZone) {
      state.mustLeaveCube = false;
      if (!CONFIG.oneWay) state.hasEntered = false;
    }
    return;
  }

  if (CONFIG.oneWay && state.hasEntered) return;
  if (inZone) startForcedPush();
}

function setupProximityEntry() {
  if (state.proximityWired) return;
  const trigger = getTrigger();
  if (!trigger) return;

  //state.proximityWired = true;
  state.proximityWired = true;
try {
  nac.setArtworkOpacity(trigger, CONFIG.hideTriggerCube ? 0 : 1);
} catch (e) {}

if (CONFIG.hideTriggerCube && trigger.object3D) {
  trigger.object3D.visible = false;
}
if (typeof nac.onUserAvatarEntersArtworkRadius === 'function') {
  nac.onUserAvatarEntersArtworkRadius(trigger, CONFIG.triggerRadius, function () {
    startForcedPush();
  });
}
}

space.beforeInit = () => {
  nac.disableFog();
  nac.setCameraFar(5000);
};

space.afterInit = () => {
  if (CONFIG.disableJump) disableJumpAtSource();
  setupProximityEntry();
};

space.onFrame = () => {
  if (!state.proximityWired) setupProximityEntry();
  checkProximityEntry();
  applyShojiSteps();
  clampElevatedBesideStairs();
  enforceWallCollisions();
  blockJump();
};
