
// leave at least one line of code here or the editor will disappear

// Beyond Manzanar Test Realm
// Notes: Usefull Notes.txt

// Known ids from the 2026-07-31 export. Anything Tyler adds later resolves by
// filename instead, so new uploads work without hunting for ids.
const ASSET_IDS = {
  barrackOpen: 481241,
  barrackClosed: 481790,
  monument: 481244,
  shoji: 481245,
  trigger: 481246,
  radio: 483627,
  gong: 483629,
  wind: 483630,
  azan: 483631,
  // Tyler 2026-09-10: Fence All is hidden in NAC — use North pieces instead
  towerAll: 484162,
  tower: 484163, // individual billboard test piece — not used in Scene 1 fade
  northCenter: 484167,
  northLeft: 484168,
  northRight: 484169,
};

// The downloaded export contains no audio artworks, so locally these load
// straight from ./Audio instead. In NAC the artworks above win.
const AUDIO_FILES = {
  gong: 'kane1-8m.wav',
  azan: 'azan2-8m.wav',
  wind: 'wind2a11-8m.wav',
  radio: 'documentsRecentlyDiscovered_22kH8m-g2.wav',
};

// Lowercase filename fragments, tried in order against fileName/prettyFileName/title
const ASSET_NAMES = {
  barrackOpen: ['barrack_block_open'],
  barrackClosed: ['barrack_block_closed'],
  shoji: ['shoji'],
  trigger: ['triggercube'],
  monument: ['fading_monument'],
  groundImage: ['groundimage'],
  groundColor: ['groundcolor'],
  skyColor: ['skycolor'],
  pano: ['fullpano'],
  skyBarrier: ['skybarriar', 'skybarrier'],
  radio: ['documentsrecentlydiscovered'],
  gong: ['kane1', 'gong'],
  azan: ['azan'],
  wind: ['wind2a11', 'wind'],
  towerAll: ['tower_all'],
  tower: ['tower-ucwzfyoa', 'tower.glb'], // avoid matching tower_all
  northCenter: ['north_center_fence'],
  northLeft: ['north_left_fence'],
  northRight: ['north_right_fence'],
};

const CONFIG = {
  lookAhead: 2.5,
  rayHeightOffset: -2,
  disableJump: true,

  // Barrack doors: start closed → open after delay → seal closed after entry
  barrackOpenDelayMs: 3000,
  sealBarrackOnEnter: true,

  // Barrack entry cube
  entryDestSide: 'maxX',
  insideOvershoot: 0.75,
  triggerRadius: 7,
  cameraTweenMs: 1200,
  walkSpeed: 1,
  lockedSpeed: 0,
  hideTriggerCube: true,
  oneWay: true, // after enter + seal, do not re-trigger entry
  debugEntry: false,
  // Set true to log [BM height] ~2×/sec in browser console
  debugHeight: false,
  // Logs every artwork id/name once on load — needed to wire new Scene 1 assets
  logArtworkInventory: true,

  // -------------------------------------------------------------------------
  // SCENE 1 TIMELINE (master clock from first interaction) — keep for later
  // -------------------------------------------------------------------------
  //  0–5s   Outer monument (stone) fades out; calligraphy stays visible
  //  0–26s  Voice audio plays (documentsRecentlyDiscovered, 26s)
  //  25–26s Calligraphy fades out; audio ends at 26s
  //  26–32s Closed barracks + ALL fences (+ Tower All) fade in (6s)
  //         Barracks stay forever; fence/barrack collision — user can't leave camp
  //  32–40s Hold
  //  40–49s Sky banners (skybarriar) fade in slowly (9s)
  //  49s    Windows/doors open (open barrack + shoji)
  //
  // FUTURE (not active now): North left/right fence proximity pop-in/out
  // (VRML-style). Toggle with fencePopEnabled once we revisit that effect.
  // -------------------------------------------------------------------------
  scene1: {
    enabled: true,
    autoStartMs: 8000, // fallback if no click; clock still starts on first interaction
    windVolume: 0.4 / 4,
    localAudioPath: '../../Audio/',
    voiceVolume: 1,
    voiceDurationMs: 26000,

    monumentBodyFadeAtMs: 0,
    monumentBodyFadeMs: 5000, // 0 → 5s
    calligraphyFadeAtMs: 25000, // hold text until ~25s
    calligraphyFadeMs: 1000, // gone by 26s with the voice

    campAtMs: 26000,
    campFadeMs: 6000, // 26 → 32s

    skyBarrierAtMs: 40000,
    skyBarrierFadeMs: 9000, // 40 → 49s

    doorsAtMs: 49000,

    // FUTURE: set true to restore left/right proximity pop instead of always-on
    fencePopEnabled: false,
    fencePopRadius: 80,

    monumentBodyMaterials: ['mon_mat1'],
    monumentFaceMaterials: ['ireito-128', '1943y8m-128'],
    monumentBodyNodes: ['Box01', 'Box02', 'Box03', 'Cone01', 'Cone02'],
    monumentFaceNodes: ['front01', 'back01'],
  },

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
  barrackOpen: null,
  barrackClosed: null,
  shoji: null,
  trigger: null,
  raycaster: null,
  groundY: null,
  hasEntered: false,
  cameraAnimating: false,
  proximityWired: false,
  mustLeaveCube: false,
  entryDebugAt: 0,
  heightDebugAt: 0,
  fogCleared: false,
  // 'closed' (start) | 'open' (after delay) | 'sealed' (after player enters)
  barrackDoorPhase: 'closed',
  barrackOpenScheduled: false,
  assets: {},
  missingWarned: {},
  audioFallback: {},
  scene1: {
    started: false,
    startedAt: 0,
    monumentFaded: false,
    calligraphyGone: false,
    voiceStarted: false,
    voiceDone: false,
    campShown: false,
    skyBarrierShown: false,
    doorsOpened: false,
    shojiShown: false,
    facesPrepared: false,
    fenceSideShown: { northLeft: false, northRight: false },
  },
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

function allArtworks() {
  if (typeof nac.getArtworks !== 'function') return [];
  const all = nac.getArtworks() || {};
  return Array.isArray(all) ? all : Object.values(all);
}

function artworkLabel(a) {
  return String(a.fileName || a.prettyFileName || a.title || '').toLowerCase();
}

// Resolves by id first (fast, exact) then by filename, so assets added to the
// space after this script was written still get picked up.
function getAsset(key) {
  const cached = state.assets[key];
  if (cached && cached.object3D) return cached;

  let found = null;
  const id = ASSET_IDS[key];
  if (id != null) found = nac.getArtworkById(id);

  if (!found) {
    const fragments = ASSET_NAMES[key] || [];
    const list = allArtworks();
    for (let f = 0; f < fragments.length && !found; f++) {
      for (let i = 0; i < list.length; i++) {
        if (artworkLabel(list[i]).indexOf(fragments[f]) !== -1) {
          found = list[i];
          break;
        }
      }
    }
  }

  if (!found) {
    if (!state.missingWarned[key]) {
      state.missingWarned[key] = true;
      console.warn('[BM] asset not in space:', key, ASSET_NAMES[key]);
    }
    return null;
  }

  state.assets[key] = found;
  return found;
}

// Lists every artwork in the space so new assets can be wired without Inspect
function dumpArtworkInventory() {
  if (typeof nac.getArtworks !== 'function') {
    console.warn('[BM inventory] nac.getArtworks unavailable');
    return;
  }
  const all = nac.getArtworks() || {};
  const list = Array.isArray(all) ? all : Object.values(all);
  const rows = list.map(function (a) {
    return {
      id: a.id,
      type: a.type,
      name: a.title || a.prettyFileName || a.fileName || '(untitled)',
      file: a.fileName || '',
      hasAudioEl: !!a.element,
    };
  });
  console.log('[BM inventory] ' + rows.length + ' artworks');
  if (typeof console.table === 'function') console.table(rows);
  else console.log(rows);
  // Paste-friendly copy for sharing
  console.log('[BM inventory json] ' + JSON.stringify(rows));
}

// Answers "what still needs placing in the space?" in one table
function dumpAssetResolution() {
  const keys = Object.keys(ASSET_NAMES);
  const rows = [];
  const missing = [];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const art = getAsset(key);
    if (!art) missing.push(key);
    rows.push({
      asset: key,
      found: !!art,
      id: art ? art.id : '',
      file: art ? art.fileName || art.prettyFileName || '' : '',
      audio: art ? !!art.element : '',
    });
  }

  if (typeof console.table === 'function') console.table(rows);
  else console.log(rows);

  if (missing.length) {
    console.warn('[BM assets] MISSING (' + missing.length + '): ' + missing.join(', '));
  } else {
    console.log('[BM assets] all assets resolved');
  }
}

function getBarrackOpen() {
  return getAsset('barrackOpen');
}

function getBarrackClosed() {
  return getAsset('barrackClosed');
}

// Collision mesh follows door phase: open mesh while doors open; closed mesh otherwise
function getBarrack() {
  if (state.barrackDoorPhase === 'open') return getBarrackOpen();
  return getBarrackClosed();
}

function setArtworkShown(artwork, shown) {
  if (!artwork) return;
  try {
    nac.setArtworkOpacity(artwork, shown ? 1 : 0);
  } catch (e) {}
  if (artwork.object3D) artwork.object3D.visible = !!shown;
}

// Tyler's export cubes are for NAC placement only — never draw or collide with them
function disablePlacementHelpers(artwork) {
  if (!artwork || !artwork.object3D || artwork._bmPlacementDisabled) return;
  artwork.object3D.traverse(function (child) {
    const name = String(child.name || '');
    if (!/placementcube/i.test(name)) return;
    child.visible = false;
    child.traverse(function (c) {
      c.visible = false;
      if (c.isMesh) c.raycast = function () {};
    });
  });
  artwork._bmPlacementDisabled = true;
}

function prepareCampCollisionMeshes() {
  ['towerAll', 'northCenter', 'northLeft', 'northRight', 'tower'].forEach(function (key) {
    disablePlacementHelpers(getAsset(key));
  });
}

function applyBarrackDoorVisuals() {
  const phase = state.barrackDoorPhase;
  // Sealed: keep open visible so interior photos/items stay; closed stays for the shut door
  const showOpen = phase === 'open' || phase === 'sealed';
  const showClosed = phase === 'closed' || phase === 'sealed';
  setArtworkShown(getBarrackOpen(), showOpen);
  setArtworkShown(getBarrackClosed(), showClosed);
  console.log('[BM] barrack doors →', phase, { showOpen: showOpen, showClosed: showClosed });
}

function scheduleBarrackOpen() {
  if (state.barrackOpenScheduled) return;
  state.barrackOpenScheduled = true;
  window.setTimeout(function () {
    if (state.barrackDoorPhase !== 'closed') return;
    state.barrackDoorPhase = 'open';
    applyBarrackDoorVisuals();
  }, CONFIG.barrackOpenDelayMs);
}

function sealBarrackDoors() {
  if (!CONFIG.sealBarrackOnEnter) return;
  if (state.barrackDoorPhase === 'sealed') return;
  state.barrackDoorPhase = 'sealed';
  applyBarrackDoorVisuals();
}

function canEnterBarrack() {
  return state.barrackDoorPhase === 'open';
}

function getShoji() {
  return getAsset('shoji');
}

function getTrigger() {
  return getAsset('trigger');
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

// The temple only switches on late in Scene 1 — no invisible walls before that
function shojiActive() {
  return !CONFIG.scene1.enabled || state.scene1.shojiShown;
}

function getShojiBox() {
  if (!shojiActive()) return null;
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

function isElevatedAtShoji() {
  const ms = window.controls;
  const y = ms && ms.floorLevel != null ? ms.floorLevel : null;
  if (y == null) return false;
  return y > CONFIG.shoji.floorDefault + 0.35;
}

// Stairs-face railing line (inset from mesh AABB so it matches the visual railing, not roof)
function getStairsRailingCoord(box) {
  const side = CONFIG.shoji.stairsSide;
  // ~14% in from AABB face ≈ railing / deck edge
  const insetX = (box.max.x - box.min.x) * 0.14;
  const insetZ = (box.max.z - box.min.z) * 0.14;

  if (side === 'minZ') return box.min.z + insetZ;
  if (side === 'maxZ') return box.max.z - insetZ;
  if (side === 'minX') return box.min.x + insetX;
  return box.max.x - insetX;
}

// Past the stairs-face railing into empty land beside stairs (NOT the door/stair gap)
function isPastStairsRailing(x, z, box) {
  if (isInShojiDoorGap(x, z, box)) return false;

  const side = CONFIG.shoji.stairsSide;
  const rail = getStairsRailingCoord(box);
  const run = Math.max(CONFIG.shoji.stairRun, 2) + 2;

  if (side === 'minZ') return z < rail && z >= box.min.z - run;
  if (side === 'maxZ') return z > rail && z <= box.max.z + run;
  if (side === 'minX') return x < rail && x >= box.min.x - run;
  return x > rail && x <= box.max.x + run;
}

// Crossed the stairs-face railing left/right of the opening (corridor → empty land)
function crossedStairsRailingBesideGap(prevX, prevZ, x, z, box) {
  if (isInShojiDoorGap(x, z, box) || isInShojiDoorGap(prevX, prevZ, box)) return false;

  const side = CONFIG.shoji.stairsSide;
  const rail = getStairsRailingCoord(box);

  if (side === 'minZ') {
    return (prevZ >= rail && z < rail) || (prevZ > rail && z <= rail);
  }
  if (side === 'maxZ') {
    return (prevZ <= rail && z > rail) || (prevZ < rail && z >= rail);
  }
  if (side === 'minX') {
    return (prevX >= rail && x < rail) || (prevX > rail && x <= rail);
  }
  return (prevX <= rail && x > rail) || (prevX < rail && x >= rail);
}

function resolveElevatedBesideStairs(prevX, prevZ, x, z, box) {
  if (!isElevatedAtShoji()) return null;

  if (crossedStairsRailingBesideGap(prevX, prevZ, x, z, box)) {
    return { x: prevX, z: prevZ };
  }
  if (!isPastStairsRailing(prevX, prevZ, box) && isPastStairsRailing(x, z, box)) {
    return { x: prevX, z: prevZ };
  }
  return null;
}

function clampElevatedBesideStairs() {
  // Allow in edit-3d — NAC Preview as editor often stays in that mode
  if (state.cameraAnimating) return;

  const pos = getPlayerWorld();
  const box = getShojiBox();
  if (!pos || !box || !isElevatedAtShoji()) return;

  if (isPastStairsRailing(pos.x, pos.z, box)) {
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
  // Only ignore walls near the door trigger while doors are OPEN (so entry push works).
  // When sealed/closed, keep collisions so the closed door can block exit/entry.
  if (state.barrackDoorPhase === 'open' && nearTriggerCube(pos)) return;

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

    // Only change vs main: stairs-face railing collision left/right of door gap
    // (blocks elevated walk onto empty land beside stairs)
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

  // When doors are sealed/closed: solid barrack footprint (no door gap) — blocks walking out
  if (state.barrackDoorPhase !== 'open') {
    const closedBox = getMeshBox(getBarrackClosed());
    if (closedBox) {
      const wasInside = isInsideBoxXZ(
        { x: state.prevX, z: state.prevZ },
        closedBox,
        0
      );
      const nowInside = isInsideBoxXZ(pos, closedBox, 0);
      if (wasInside !== nowInside) {
        setPlayerXZ(state.prevX, state.prevZ);
        return;
      }
    }
  }

  // Barrack mesh collisions (and shoji mesh for interior walls)
  // After camp fades in, fences also block so the player can't walk out of camp
  const walls = [getBarrack(), shojiActive() ? getShoji() : null];
  if (state.scene1.campShown) {
    walls.push(
      getAsset('northCenter'),
      getAsset('northLeft'),
      getAsset('northRight'),
      getAsset('towerAll')
    );
  }
  for (let i = 0; i < walls.length; i++) {
    const art = walls[i];
    if (!art || !art.object3D) continue;
    if (art.object3D.visible === false) continue;
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
  // Do NOT skip when mode is edit-3d — NAC Preview as editor often stays in
  // edit-3d, which previously blocked stairs while walls still worked.
  if (state.cameraAnimating) return;

  const pos = getPlayerWorld();
  const box = getShojiBox();
  if (!pos || !box) {
    if (CONFIG.debugHeight && performance.now() - state.heightDebugAt > 500) {
      state.heightDebugAt = performance.now();
      console.warn('[BM height]', {
        mode: typeof mode !== 'undefined' ? String(mode) : '(none)',
        isEditing: isEditing(),
        hasPos: !!pos,
        hasShojiBox: !!box,
        shojiId: ASSET_IDS.shoji,
      });
    }
    return;
  }

  let target = CONFIG.shoji.floorDefault;
  const inside = isInsideBoxXZ(pos, box, 0);
  const onStairs = isOnStairsApproach(pos, box);

  // Height changes only on the stairs corridor / inside — not from other sides
  if (inside || onStairs) {
    if (inside) {
      target = getShojiStepFloor(pos, box);
    } else if (onStairs) {
      target = floorFromStairProgress(getStairProgress(pos, box));
    }
  }

  setPlayerFloor(target);

  if (CONFIG.debugHeight && performance.now() - state.heightDebugAt > 500) {
    state.heightDebugAt = performance.now();
    const ms = window.controls;
    const mover = getMover();
    console.log('[BM height]', {
      mode: typeof mode !== 'undefined' ? String(mode) : '(none)',
      isEditing: isEditing(),
      inside: inside,
      onStairs: onStairs,
      stairT: onStairs || inside ? getStairProgress(pos, box) : null,
      targetY: target,
      msFloor: ms ? ms.floorLevel : null,
      moverY: mover ? mover.position.y : null,
      camY: pos.y,
      x: pos.x.toFixed(1),
      z: pos.z.toFixed(1),
      boxMinZ: box.min.z.toFixed(1),
      boxMaxZ: box.max.z.toFixed(1),
    });
  }
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
  if (!canEnterBarrack()) return;
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
    sealBarrackDoors();
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
      sealBarrackDoors();
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

function hideTriggerCubeVisual() {
  if (!CONFIG.hideTriggerCube) return;
  const trigger = getTrigger();
  if (!trigger) return;
  try {
    nac.setArtworkOpacity(trigger, 0);
  } catch (e) {}
  if (trigger.object3D) {
    trigger.object3D.visible = false;
    trigger.object3D.traverse(function (child) {
      if (child.isMesh) child.visible = false;
    });
  }
}

function setupProximityEntry() {
  if (state.proximityWired) return;
  const trigger = getTrigger();
  if (!trigger) return;

  state.proximityWired = true;
  hideTriggerCubeVisual();
  if (typeof nac.onUserAvatarEntersArtworkRadius === 'function') {
    nac.onUserAvatarEntersArtworkRadius(trigger, CONFIG.triggerRadius, function () {
      if (!canEnterBarrack()) return;
      startForcedPush();
    });
  }
}

// --- Scene 1: desert opening ---
// VRML header: "starts with ground grid and monument; wind blowing. gong sounds
// once, then monument fades out. azan plays, when azan finished camp1 fades in.
// X seconds later, barrier sky1 fades in. then N doors to barracks open,
// wa_Shitsu switches on."

function scene1() {
  return CONFIG.scene1;
}

function forEachMaterial(root, fn) {
  if (!root) return;
  root.traverse(function (child) {
    if (!child.isMesh || !child.material) return;
    const mats = Array.isArray(child.material) ? child.material : [child.material];
    for (let i = 0; i < mats.length; i++) {
      if (mats[i]) fn(mats[i], child);
    }
  });
}

function nodeNameMatches(node, names) {
  if (!node || !node.name) return false;
  const n = String(node.name);
  for (let i = 0; i < names.length; i++) {
    if (n === names[i] || n.indexOf(names[i]) === 0) return true;
  }
  return false;
}

function forEachMonumentPart(root, nodeNames, fn) {
  if (!root) return;
  root.traverse(function (child) {
    if (!child.isMesh) return;
    // Match the mesh or any ancestor (GLBs often nest mesh under Name_root)
    let n = child;
    let matched = false;
    while (n) {
      if (nodeNameMatches(n, nodeNames)) {
        matched = true;
        break;
      }
      n = n.parent;
    }
    if (matched) fn(child);
  });
}

// Per-material fade — nac.setArtworkOpacity works on a whole artwork, but the
// monument body and its calligraphy faces have to fade independently.
function setMaterialGroupOpacity(root, names, opacity) {
  forEachMaterial(root, function (mat) {
    if (names.indexOf(String(mat.name)) === -1) return;
    mat.transparent = true;
    mat.opacity = opacity;
    mat.depthWrite = opacity >= 0.99;
    mat.needsUpdate = true;
  });
}

function setMaterialGroupVisible(root, names, visible) {
  forEachMaterial(root, function (mat, mesh) {
    if (names.indexOf(String(mat.name)) === -1) return;
    mesh.visible = !!visible;
  });
}

function setMonumentBodyOpacity(root, opacity) {
  const bodyNodes = scene1().monumentBodyNodes;
  const bodyMats = scene1().monumentBodyMaterials;
  forEachMonumentPart(root, bodyNodes, function (mesh) {
    mesh.visible = opacity > 0.02;
    mesh.renderOrder = 0;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (let i = 0; i < mats.length; i++) {
      const mat = mats[i];
      if (!mat) continue;
      mat.transparent = true;
      mat.opacity = opacity;
      // Once fading, stop writing depth so the calligraphy planes show through
      mat.depthWrite = opacity >= 0.99;
      mat.needsUpdate = true;
    }
  });
  // Also catch by material name if node names differ after import
  setMaterialGroupOpacity(root, bodyMats, opacity);
}

// Calligraphy must read from t0 — not only after the stone fades away
function prepareMonumentFaces(root) {
  if (!root) return;
  const faceNodes = scene1().monumentFaceNodes;
  const faceMats = scene1().monumentFaceMaterials;

  forEachMonumentPart(root, faceNodes, function (mesh) {
    mesh.visible = true;
    mesh.renderOrder = 2; // draw after stone so text isn't buried
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (let i = 0; i < mats.length; i++) {
      const mat = mats[i];
      if (!mat) continue;
      mat.transparent = true; // textures have alpha around the characters
      mat.opacity = 1;
      mat.depthWrite = true;
      mat.depthTest = true;
      mat.side = THREE.DoubleSide;
      // Pull slightly toward camera in depth to beat coplanar body faces
      mat.polygonOffset = true;
      mat.polygonOffsetFactor = -2;
      mat.polygonOffsetUnits = -2;
      mat.needsUpdate = true;
    }
  });

  forEachMaterial(root, function (mat, mesh) {
    if (faceMats.indexOf(String(mat.name)) === -1) return;
    mesh.visible = true;
    mesh.renderOrder = 2;
    mat.transparent = true;
    mat.opacity = 1;
    mat.depthWrite = true;
    mat.side = THREE.DoubleSide;
    mat.polygonOffset = true;
    mat.polygonOffsetFactor = -2;
    mat.polygonOffsetUnits = -2;
    mat.needsUpdate = true;
  });
}

function setMonumentFacesVisible(root, visible) {
  forEachMonumentPart(root, scene1().monumentFaceNodes, function (mesh) {
    mesh.visible = !!visible;
  });
  setMaterialGroupVisible(root, scene1().monumentFaceMaterials, visible);
}

function setMonumentFaceOpacity(root, opacity) {
  const faceNodes = scene1().monumentFaceNodes;
  const faceMats = scene1().monumentFaceMaterials;
  forEachMonumentPart(root, faceNodes, function (mesh) {
    mesh.visible = opacity > 0.02;
    mesh.renderOrder = 2;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (let i = 0; i < mats.length; i++) {
      const mat = mats[i];
      if (!mat) continue;
      mat.transparent = true;
      mat.opacity = opacity;
      mat.depthWrite = opacity >= 0.99;
      mat.needsUpdate = true;
    }
  });
  setMaterialGroupOpacity(root, faceMats, opacity);
}

function fadeArtwork(artwork, from, to, durationMs, onDone) {
  if (!artwork) {
    if (onDone) onDone();
    return;
  }
  if (artwork.object3D) artwork.object3D.visible = true;
  try {
    nac.setArtworkOpacity(artwork, from);
  } catch (e) {}

  if (typeof nac.tween !== 'function') {
    try {
      nac.setArtworkOpacity(artwork, to);
    } catch (e) {}
    if (onDone) onDone();
    return;
  }

  nac.tween({
    from: { v: from },
    to: { v: to },
    duration: durationMs,
    onFrame: function (o) {
      try {
        nac.setArtworkOpacity(artwork, o.v);
      } catch (e) {}
    },
    onComplete: function () {
      try {
        nac.setArtworkOpacity(artwork, to);
      } catch (e) {}
      if (onDone) onDone();
    },
  });
}

// NAC's own playAudioOnce/stopAudio just drive artwork.element, so using the
// element directly keeps one code path for artworks and local files alike.
function getAudioElement(key) {
  const art = getAsset(key);
  if (art && art.element) return art.element;

  if (state.audioFallback[key]) return state.audioFallback[key];
  const file = AUDIO_FILES[key];
  if (!file) return null;

  const el = new Audio(scene1().localAudioPath + file);
  el.preload = 'auto';
  state.audioFallback[key] = el;
  console.log('[BM scene1] local audio file for', key, '→', file);
  return el;
}

function playAudioAsset(key, volume, loop) {
  const el = getAudioElement(key);
  if (!el) return null;
  el.volume = volume;
  el.loop = !!loop;
  el.currentTime = 0;
  const played = el.play();
  if (played && typeof played.catch === 'function') {
    played.catch(function (err) {
      console.warn('[BM scene1] audio blocked:', key, err && err.name);
    });
  }
  return el;
}

function setAzanVolume(v) {
  const el = getAudioElement('azan');
  if (el) el.volume = v;
}

// Everything except the ground grid and the monument starts hidden
function hideCampForScene1() {
  setArtworkShown(getBarrackOpen(), false);
  setArtworkShown(getBarrackClosed(), false);
  setArtworkShown(getAsset('skyBarrier'), false);
  setArtworkShown(getShoji(), false);
  setArtworkShown(getAsset('towerAll'), false);
  setArtworkShown(getAsset('tower'), false); // individual billboard test — leave off for Scene 1
  setArtworkShown(getAsset('northCenter'), false);
  setArtworkShown(getAsset('northLeft'), false);
  setArtworkShown(getAsset('northRight'), false);
  state.scene1.campShown = false;
  state.scene1.shojiShown = false;
  state.scene1.skyBarrierShown = false;
  state.scene1.doorsOpened = false;
  state.scene1.calligraphyGone = false;
  state.scene1.fenceSideShown.northLeft = false;
  state.scene1.fenceSideShown.northRight = false;

  const mon = getAsset('monument');
  if (mon && mon.object3D) {
    setMonumentBodyOpacity(mon.object3D, 1);
    prepareMonumentFaces(mon.object3D);
    state.scene1.facesPrepared = true;
  }
}

function artworkWorldPos(art) {
  if (!art) return null;
  if (art.object3D) {
    art.object3D.updateWorldMatrix(true, true);
    const v = new THREE.Vector3();
    art.object3D.getWorldPosition(v);
    const box = getMeshBox(art);
    if (box) {
      return new THREE.Vector3(
        (box.min.x + box.max.x) * 0.5,
        (box.min.y + box.max.y) * 0.5,
        (box.min.z + box.max.z) * 0.5
      );
    }
    return v;
  }
  if (art.positionX != null) {
    return new THREE.Vector3(art.positionX, art.positionY || 0, art.positionZ);
  }
  return null;
}

function isNearArtworkXZ(pos, art, radius) {
  const c = artworkWorldPos(art);
  if (!pos || !c) return false;
  const dx = pos.x - c.x;
  const dz = pos.z - c.z;
  return Math.sqrt(dx * dx + dz * dz) <= radius;
}

// FUTURE: VRML-style left/right pop. Off by default (fencePopEnabled: false) —
// all fences currently fade in with the barracks and stay.
function updateNorthFencePop() {
  if (!CONFIG.scene1.enabled || !state.scene1.campShown) return;
  if (!scene1().fencePopEnabled) return;
  const pos = getPlayerWorld();
  if (!pos) return;

  const radius = scene1().fencePopRadius;
  const sides = ['northLeft', 'northRight'];
  for (let i = 0; i < sides.length; i++) {
    const key = sides[i];
    const art = getAsset(key);
    if (!art) continue;
    const near = isNearArtworkXZ(pos, art, radius);
    const shown = !!state.scene1.fenceSideShown[key];
    if (near && !shown) {
      state.scene1.fenceSideShown[key] = true;
      setArtworkShown(art, true);
      console.log('[BM scene1] fence pop in', key);
    } else if (!near && shown) {
      state.scene1.fenceSideShown[key] = false;
      setArtworkShown(art, false);
      console.log('[BM scene1] fence pop out', key);
    }
  }
}

function fadeOutMonumentBody() {
  const mon = getAsset('monument');
  if (!mon || !mon.object3D) return;
  prepareMonumentFaces(mon.object3D);

  const finish = function () {
    setMonumentBodyOpacity(mon.object3D, 0);
    forEachMonumentPart(mon.object3D, scene1().monumentBodyNodes, function (mesh) {
      mesh.visible = false;
    });
    setMaterialGroupVisible(mon.object3D, scene1().monumentBodyMaterials, false);
    state.scene1.monumentFaded = true;
    console.log('[BM scene1] monument body gone — calligraphy holds');
  };

  if (typeof nac.tween !== 'function') {
    finish();
    return;
  }

  nac.tween({
    from: { v: 1 },
    to: { v: 0 },
    duration: scene1().monumentBodyFadeMs,
    onFrame: function (o) {
      setMonumentBodyOpacity(mon.object3D, o.v);
      prepareMonumentFaces(mon.object3D);
    },
    onComplete: finish,
  });
}

function fadeOutCalligraphy() {
  if (state.scene1.calligraphyGone) return;
  const mon = getAsset('monument');
  if (!mon || !mon.object3D) {
    state.scene1.calligraphyGone = true;
    return;
  }

  const finish = function () {
    setMonumentFaceOpacity(mon.object3D, 0);
    setMonumentFacesVisible(mon.object3D, false);
    setArtworkShown(mon, false);
    state.scene1.calligraphyGone = true;
    console.log('[BM scene1] calligraphy off');
  };

  if (typeof nac.tween !== 'function') {
    finish();
    return;
  }

  nac.tween({
    from: { v: 1 },
    to: { v: 0 },
    duration: scene1().calligraphyFadeMs,
    onFrame: function (o) {
      setMonumentFaceOpacity(mon.object3D, o.v);
    },
    onComplete: finish,
  });
}

function startVoiceAudio() {
  if (state.scene1.voiceStarted) return;
  state.scene1.voiceStarted = true;
  const el = getAudioElement('radio');
  if (!el) {
    console.warn('[BM scene1] voice audio missing — timeline still runs on clock');
    window.setTimeout(function () {
      state.scene1.voiceDone = true;
    }, scene1().voiceDurationMs);
    return;
  }
  el.onended = function () {
    state.scene1.voiceDone = true;
    console.log('[BM scene1] voice ended');
  };
  playAudioAsset('radio', scene1().voiceVolume, false);
  // Hard stop at 26s in case the file is longer / loops oddly
  window.setTimeout(function () {
    if (!state.scene1.voiceDone) {
      try {
        el.pause();
      } catch (e) {}
      state.scene1.voiceDone = true;
    }
  }, scene1().voiceDurationMs + 200);
  console.log('[BM scene1] voice started (26s)');
}

function showShojiTemple() {
  const shoji = getShoji();
  if (!shoji) return;
  fadeArtwork(shoji, 0, 1, 2000);
  state.scene1.shojiShown = true;
}

function openBarrackDoorsForScene1() {
  if (state.scene1.doorsOpened) return;
  if (state.barrackDoorPhase === 'open' || state.barrackDoorPhase === 'sealed') return;
  state.scene1.doorsOpened = true;
  state.barrackDoorPhase = 'open';
  applyBarrackDoorVisuals();
  showShojiTemple();
  console.log('[BM scene1] t=49s doors/windows open');
}

function fadeInSkyBarrier() {
  if (state.scene1.skyBarrierShown) return;
  state.scene1.skyBarrierShown = true;
  fadeArtwork(getAsset('skyBarrier'), 0, 1, scene1().skyBarrierFadeMs);
  console.log('[BM scene1] t=40s sky banners fade in');
}

// t=26s → closed barracks + ALL fences + towers, stay forever
function fadeInCamp() {
  if (state.scene1.campShown) return;
  state.scene1.campShown = true;
  prepareCampCollisionMeshes();

  const windEl = getAudioElement('wind');
  if (windEl) windEl.volume = 0.4;

  state.barrackDoorPhase = 'closed';
  const fadeMs = scene1().campFadeMs;
  fadeArtwork(getBarrackClosed(), 0, 1, fadeMs);
  fadeArtwork(getAsset('towerAll'), 0, 1, fadeMs);
  fadeArtwork(getAsset('northCenter'), 0, 1, fadeMs);
  // All fences together (left/right not waiting on proximity)
  if (!scene1().fencePopEnabled) {
    fadeArtwork(getAsset('northLeft'), 0, 1, fadeMs);
    fadeArtwork(getAsset('northRight'), 0, 1, fadeMs);
    state.scene1.fenceSideShown.northLeft = true;
    state.scene1.fenceSideShown.northRight = true;
  } else {
    setArtworkShown(getAsset('northLeft'), false);
    setArtworkShown(getAsset('northRight'), false);
  }
  console.log('[BM scene1] t=26s camp fades in (barracks + fences + towers)');
}

function startScene1() {
  if (state.scene1.started) return;
  state.scene1.started = true;
  state.scene1.startedAt = performance.now();
  console.log('[BM scene1] start — 0–49s master clock');

  playAudioAsset('wind', scene1().windVolume, true);
  playAudioAsset('gong', 1, false);
  startVoiceAudio();

  // Absolute timeline from t0 (see CONFIG.scene1 comment block)
  window.setTimeout(fadeOutMonumentBody, scene1().monumentBodyFadeAtMs);
  window.setTimeout(fadeOutCalligraphy, scene1().calligraphyFadeAtMs);
  window.setTimeout(fadeInCamp, scene1().campAtMs);
  window.setTimeout(fadeInSkyBarrier, scene1().skyBarrierAtMs);
  window.setTimeout(openBarrackDoorsForScene1, scene1().doorsAtMs);
}

function setupScene1() {
  hideCampForScene1();

  if (typeof nac.setOnFirstInteraction === 'function') {
    nac.setOnFirstInteraction(startScene1);
  }
  window.setTimeout(startScene1, scene1().autoStartMs);
}

function clearFogAndExtendCamera() {
  const far = 5000;
  try {
    if (typeof nac.disableFog === 'function') nac.disableFog();
  } catch (e) {}
  // Tunnel sideload runs after fog already exists — flag alone is not enough
  if (window.scene) window.scene.fog = null;
  try {
    if (typeof nac.setCameraFar === 'function') nac.setCameraFar(far);
  } catch (e) {}
  // setCameraFar only writes settings; force the live camera clip plane
  const cam = window.camera;
  if (cam) {
    cam.far = far;
    if (typeof cam.updateProjectionMatrix === 'function') cam.updateProjectionMatrix();
  }
}

space.beforeInit = () => {
  clearFogAndExtendCamera();
};

space.afterInit = () => {
  clearFogAndExtendCamera();
  if (CONFIG.logArtworkInventory) {
    dumpArtworkInventory();
    dumpAssetResolution();
  }
  if (CONFIG.disableJump) disableJumpAtSource();
  state.barrackDoorPhase = 'closed';
  if (CONFIG.scene1.enabled) {
    setupScene1();
  } else {
    applyBarrackDoorVisuals();
    scheduleBarrackOpen();
  }
  setupProximityEntry();
};

space.onFrame = () => {
  // NAC may recreate fog after late load; clear until it sticks
  if (!state.fogCleared || (window.scene && window.scene.fog)) {
    clearFogAndExtendCamera();
    if (!window.scene || !window.scene.fog) state.fogCleared = true;
  }
  if (!state.proximityWired) setupProximityEntry();
  hideTriggerCubeVisual();
  // Monument GLB may finish loading after afterInit — pin calligraphy as soon as it's ready
  if (CONFIG.scene1.enabled && !state.scene1.facesPrepared) {
    const mon = getAsset('monument');
    if (mon && mon.object3D) {
      prepareMonumentFaces(mon.object3D);
      state.scene1.facesPrepared = true;
      console.log('[BM scene1] monument calligraphy prepared');
    }
  }
  checkProximityEntry();
  if (state.scene1.campShown) prepareCampCollisionMeshes();
  updateNorthFencePop();
  applyShojiSteps();
  clampElevatedBesideStairs();
  enforceWallCollisions();
  blockJump();
};
