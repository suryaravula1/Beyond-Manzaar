// Beyond Manzanar NAC paste — Scene1+Scene2 — comments/logs stripped (~100KB target)
// Audio: NAC artwork CDN/element. Select All → Delete → Paste → Save.
const ASSET_IDS = {
barrackOpen: 485340,
barrackClosed: 485345,
barrackClosedWindows: 485612,
monument: 485342,
shoji: null,
trigger: 485370,
radio: 485351,
gong: 485352,
wind: 485353,
azan: 485354,
footsteps: 488720,
doorSfx: 488721,
songbird: 488722,
barrackGhosts: 489606,
towerAll: null,
tower: 489617,
northCenter: 485358,
northLeft: 485359,
northRight: 485360,
southCenter: 487172,
southLeft: 487171,
southRight: 487170,
eastCenter: 487178,
eastLeft: 487177,
eastRight: 487176,
westCenter: 487179,
westLeft: 487180,
westRight: 487181,
barrackEntryNoGiant: null,
barrackEntryWithGiant: 487168,
barrackEntryFused: null,
barrackEntryTriggers: 487168,
gardenEntryTriggers: 487169,
scene2Trigger: 485370,
leaveGardenTrigger: 485366,
shojiGardenOpen: 485361,
shojiGardenClosed: 485362,
gardenWallTrees: 485363,
gardenExtras: 485364,
groundImage: 485350,
groundColor: 485348,
skyBarrier: 485346,
};
const AUDIO_FILES = {
gong: 'kane1-8m-ftNnzxVY.mp3',
azan: 'azan2-8m-ji38paDM.mp3',
wind: 'wind2a11-8m-iv1Ad1Qf.mp3',
radio: 'documentsRecentlyDiscovered_22kH8m-g2-uus4J7tT.mp3',
footsteps: 'footsteps-8m-M_tBBzDR.mp3',
doorSfx: 'door2-8m-_cPVFb42.mp3',
songbird: 'songbird-8m-uVp8O2bP.mp3',
};
const ASSET_NAMES = {
barrackOpen: ['_barrack_block__opened', 'barrack_block__opened'],
barrackClosed: ['_barrack_block_closed-es5k', '_barrack_block_closed.glb'],
barrackClosedWindows: ['_barrack_block_closed_windows', 'closed_windows'],
shoji: ['shoji'],
trigger: ['triggercube-3esbqdfz', 'triggercube'],
monument: ['monument-6i7orpyc', 'monument'],
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
tower: ['tower-ucwzfyoa', 'tower.glb'],
northCenter: ['north_center_fence'],
northLeft: ['north_left_fence'],
northRight: ['north_right_fence'],
southCenter: ['south_center_fence'],
southLeft: ['south_left_fence'],
southRight: ['south_right_fence'],
eastCenter: ['east_center_fence'],
eastLeft: ['east_left_fence'],
eastRight: ['east_right_fence'],
westCenter: ['west_center_fence'],
westLeft: ['west_left_fence'],
westRight: ['west_right_fence'],
barrackEntryNoGiant: ['triggercubebarrackentry-ooqf2mzy'],
barrackEntryWithGiant: ['triggercubebarrackentry_indiv'],
barrackEntryFused: ['triggercubebarrackentry-cg48ztuo'],
barrackEntryTriggers: ['triggercubebarrackentry_indiv'],
gardenEntryTriggers: [
'triggercubebarrack_to_garden_indiv',
'triggercubebarrack_to_garden',
'triggercubebarracktogarden',
],
scene2Trigger: ['triggercube'],
leaveGardenTrigger: ['leavegarden-trigger-cubeonly', 'leavegarden-trigger', 'leavegarden'],
shojiGardenOpen: ['shojitemplate-open'],
shojiGardenClosed: ['shojitemplate-closed'],
gardenWallTrees: ['japangardenwall-tree', 'japangardenwall'],
gardenExtras: ['japangardenextras'],
barrackGhosts: ['barrack_ghosts'],
footsteps: ['footsteps'],
doorSfx: ['door2'],
songbird: ['songbird'],
};
const CONFIG = {
lookAhead: 2.5,
rayHeightOffset: -2,
disableJump: true,
barrackOpenDelayMs: 3000,
sealBarrackOnEnter: true,
revealGhostsOnSeal: true,
ghostProximityReveal: false,
ghostProximityRadius: 16,
barrackWallPhotoSide: 'FrontSide',
enteredBarrackPhotoPad: 20,
enteredBarrackPhotoRadius: 40,
barrackWallPhotoMaterials: [
'vaccination',
'ukulele',
'studygirls',
'babyformula',
'girlgames',
'ironing',
'recruitmt',
'dancers',
'clothes_cot',
'blindarrival',
'checkin',
'typewriters',
'cook2',
'entraining',
'dancetoo',
'workreg',
'messhall',
'hospital',
],
entryCubeTestMode: false,
entryTriggerVariant: 'withGiant',
entryDestSide: 'maxX',
insideOvershoot: 0.75,
entryPushDistance: 3,
triggerRadius: 7,
cameraTweenMs: 1200,
walkSpeed: 1,
lockedSpeed: 0,
hideTriggerCube: true,
oneWay: true,
debugEntry: false,
debugHeight: false,
logArtworkInventory: true,
scene1: {
enabled: true,
autoStartMs: 8000,
windVolume: 0.4 / 4,
localAudioPath: '',
voiceVolume: 1,
azanVolume: 0.5,
voiceDurationMs: 26000,
playGong: false,
playSongbird: false,
footstepsVolume: 0.55,
doorSfxVolume: 1,
showShojiInScene1: false,
monumentBodyFadeAtMs: 0,
monumentBodyFadeMs: 5000,
calligraphyFadeAtMs: 25000,
calligraphyFadeMs: 1000,
campAtMs: 26000,
campFadeMs: 6000,
skyBarrierAtMs: 40000,
skyBarrierFadeMs: 9000,
windowsAtMs: 40000,
windowsFadeMs: 2000,
doorsAtMs: 49000,
doorsFadeMs: 2000,
fencePopEnabled: true,
fencePopRadius: 420,
monumentBodyMaterials: ['mon_mat1'],
monumentFaceMaterials: ['ireito-128', '1943y8m-128'],
monumentBodyNodes: ['Box01', 'Box02', 'Box03', 'Cone01', 'Cone02'],
monumentFaceNodes: ['front01', 'back01'],
},
shoji: {
stairsSide: 'minZ',
approachRadius: 35,
floorDefault: 10,
floorStep1: 11.25,
floorStep2: 12,
floorInside: 12.75,
innerShrink: 0.22,
doorHalfWidth: 4,
doorDepth: 4,
stairRun: 5,
},
scene2: {
enabled: true,
triggerRadius: 8,
hideTriggerCubes: false,
teleport: { y: 14 },
teleportInFrontOfOpenShoji: false,
shojiApproachOffset: 3.5,
gardenYAlign: 10,
hideOldGround: true,
hideCampBarracks: true,
hideSkyPosters: true,
sealShojiAfterStairs: true,
showClosedShoji: false,
leaveGardenEnabled: true,
leaveTeleport: { x: -316, y: 10, z: -663 },
leaveTriggerRadius: 8,
shoji: {
stairsSide: 'minZ',
approachRadius: 20,
floorDefault: 10,
floorStep1: 11,
floorStep2: 12,
floorStep3: 13,
floorInside: 14,
innerShrink: 0.22,
doorHalfWidth: 4,
doorDepth: 4,
stairRun: 5,
},
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
enteredBarrackZone: null,
enteredBarrackAnchor: null,
ghostProximityUniforms: [],
ghostsProximityArmed: false,
cameraAnimating: false,
proximityWired: false,
mustLeaveCube: false,
entryDebugAt: 0,
heightDebugAt: 0,
fogCleared: false,
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
azanStarted: false,
azanDone: false,
campShown: false,
skyBarrierShown: false,
windowsOpened: false,
doorsOpened: false,
shojiShown: false,
facesPrepared: false,
fenceSideShown: {
northLeft: false,
northRight: false,
southLeft: false,
southRight: false,
eastLeft: false,
eastRight: false,
westLeft: false,
westRight: false,
},
},
scene2: {
active: false,
triggerWired: false,
teleported: false,
mustLeaveTrigger: false,
shojiSealed: false,
wasInTemple: false,
leftGarden: false,
mustLeaveLeaveTrigger: false,
leaveTriggerWired: false,
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
if (typeof console.table === 'function') console.table(rows);
else console.log(rows);
}
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
}
}
function getBarrackOpen() {
return getAsset('barrackOpen');
}
function getBarrackClosed() {
return getAsset('barrackClosed');
}
function getBarrackClosedWindows() {
return getAsset('barrackClosedWindows');
}
function getBarrack() {
if (state.barrackDoorPhase === 'open' || state.barrackDoorPhase === 'sealed') {
return getBarrackOpen();
}
if (state.barrackDoorPhase === 'windowsOpen') {
return getBarrackClosedWindows() || getBarrackClosed();
}
return getBarrackClosed();
}
function setArtworkShown(artwork, shown) {
if (!artwork) return;
try {
nac.setArtworkOpacity(artwork, shown ? 1 : 0);
} catch (e) {}
if (artwork.object3D) artwork.object3D.visible = !!shown;
}
function forceHideArtwork(artwork) {
if (!artwork) return;
try {
nac.setArtworkOpacity(artwork, 0);
} catch (e) {}
if (!artwork.object3D) return;
artwork.object3D.visible = false;
artwork.object3D.traverse(function (child) {
child.visible = false;
if (!child.isMesh) return;
child.raycast = function () {};
const mats = child.material
? Array.isArray(child.material)
? child.material
: [child.material]
: [];
for (let i = 0; i < mats.length; i++) {
const m = mats[i];
if (!m) continue;
m.transparent = true;
m.opacity = 0;
m.depthWrite = false;
if (m.colorWrite != null) m.colorWrite = false;
}
});
}
function forceHideArtworkById(id) {
if (id == null || typeof nac.getArtworkById !== 'function') return;
forceHideArtwork(nac.getArtworkById(id));
}
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
function allFenceKeys() {
return [
'northCenter', 'northLeft', 'northRight',
'southCenter', 'southLeft', 'southRight',
'eastCenter', 'eastLeft', 'eastRight',
'westCenter', 'westLeft', 'westRight',
];
}
function fenceCenterKeys() {
return ['northCenter', 'southCenter', 'eastCenter', 'westCenter'];
}
function fenceSideKeys() {
return [
'northLeft', 'northRight',
'southLeft', 'southRight',
'eastLeft', 'eastRight',
'westLeft', 'westRight',
];
}
function resetFenceSideShown() {
fenceSideKeys().forEach(function (key) {
state.scene1.fenceSideShown[key] = false;
});
}
function prepareCampCollisionMeshes() {
['towerAll', 'tower'].concat(allFenceKeys()).forEach(function (key) {
disablePlacementHelpers(getAsset(key));
});
disablePlacementHelpers(getAsset('barrackEntryTriggers'));
disablePlacementHelpers(getAsset('barrackEntryNoGiant'));
disablePlacementHelpers(getAsset('barrackEntryWithGiant'));
disablePlacementHelpers(getAsset('barrackEntryFused'));
disablePlacementHelpers(getAsset('gardenEntryTriggers'));
}
function collectBarrackShojiRooms(artwork) {
const rooms = [];
if (!artwork || !artwork.object3D) return rooms;
artwork.object3D.traverse(function (obj) {
if (/^_barr_shoji_room_isolated/i.test(String(obj.name || ''))) {
rooms.push(obj);
}
});
return rooms;
}
function meshMaterialName(mesh) {
if (!mesh || !mesh.material) return '';
if (Array.isArray(mesh.material)) {
return mesh.material
.map(function (m) {
return (m && m.name) || '';
})
.join(' ');
}
return String(mesh.material.name || '');
}
function isBarrackShojiDoorwayFill(mesh) {
if (!mesh || !mesh.isMesh) return false;
const mat = meshMaterialName(mesh);
const name = String(mesh.name || '');
return /fusuma/i.test(mat) || /fusuma/i.test(name);
}
function isBarrackShojiGardenPhoto(mesh) {
if (!mesh || !mesh.isMesh) return false;
const mat = meshMaterialName(mesh);
const name = String(mesh.name || '');
return /adams|garden_photo|garden-photo/i.test(mat) || /adams|garden_photo/i.test(name);
}
function setMeshCollidable(mesh, collidable) {
if (!mesh || !mesh.isMesh) return;
if (!collidable) {
if (!mesh.userData._bmShojiRaycast) {
mesh.userData._bmShojiRaycast = mesh.raycast;
}
mesh.raycast = function () {};
} else if (mesh.userData._bmShojiRaycast) {
mesh.raycast = mesh.userData._bmShojiRaycast;
}
}
function forceShowShojiGardenPhoto(mesh) {
if (!isBarrackShojiGardenPhoto(mesh)) return false;
mesh.visible = true;
const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
for (let i = 0; i < mats.length; i++) {
const mat = mats[i];
if (!mat) continue;
mat.transparent = true;
mat.opacity = 1;
mat.depthWrite = true;
mat.side = THREE.DoubleSide;
mat.needsUpdate = true;
}
return true;
}
function setBarrackShojiEntranceOpen(room, open) {
if (!room) return;
let n = 0;
let photos = 0;
room.traverse(function (child) {
if (forceShowShojiGardenPhoto(child)) {
photos += 1;
return;
}
if (!isBarrackShojiDoorwayFill(child)) return;
child.visible = !open;
setMeshCollidable(child, !open);
n += 1;
});
room.userData._bmShojiEntranceOpen = !!open;
room.userData._bmShojiPhotoCount = photos;
return n;
}
function applyBarrackShojiRoomOpenings(openSide) {
const arts = [getBarrackOpen(), getBarrackClosedWindows()];
let roomsTotal = 0;
let changed = 0;
let photoN = 0;
for (let a = 0; a < arts.length; a++) {
const art = arts[a];
if (!art || !art.object3D) continue;
const rooms = collectBarrackShojiRooms(art);
roomsTotal += rooms.length;
for (let i = 0; i < rooms.length; i++) {
changed += setBarrackShojiEntranceOpen(rooms[i], openSide) || 0;
photoN += rooms[i].userData._bmShojiPhotoCount || 0;
}
}
if (!roomsTotal) return;
}
function isBarrackWallPhotoMaterial(name) {
const n = String(name || '').toLowerCase();
if (!n) return false;
const list = CONFIG.barrackWallPhotoMaterials || [];
for (let i = 0; i < list.length; i++) {
if (n === String(list[i]).toLowerCase() || n.indexOf(String(list[i]).toLowerCase()) === 0) {
return true;
}
}
return false;
}
function captureEnteredBarrackZone(entryCube) {
const pad =
CONFIG.enteredBarrackPhotoPad != null ? CONFIG.enteredBarrackPhotoPad : 14;
const player = getPlayerWorld();
let minX = null;
let maxX = null;
let minZ = null;
let maxZ = null;
function includeXZ(x, z) {
if (minX == null) {
minX = maxX = x;
minZ = maxZ = z;
return;
}
minX = Math.min(minX, x);
maxX = Math.max(maxX, x);
minZ = Math.min(minZ, z);
maxZ = Math.max(maxZ, z);
}
function includeBox(box) {
if (!box) return;
includeXZ(box.min.x, box.min.z);
includeXZ(box.max.x, box.max.z);
}
if (entryCube && entryCube.box) includeBox(entryCube.box);
else if (entryCube && entryCube.pos) includeXZ(entryCube.pos.x, entryCube.pos.z);
const garden = pairedGardenCube(entryCube);
if (garden && garden.box) includeBox(garden.box);
else if (garden && garden.pos) includeXZ(garden.pos.x, garden.pos.z);
if (player) includeXZ(player.x, player.z);
if (minX == null) {
state.enteredBarrackZone = null;
state.enteredBarrackAnchor = player ? { x: player.x, z: player.z } : null;
return null;
}
const anchor = entryCube && entryCube.pos
? { x: entryCube.pos.x, z: entryCube.pos.z }
: player
? { x: player.x, z: player.z }
: { x: (minX + maxX) * 0.5, z: (minZ + maxZ) * 0.5 };
state.enteredBarrackAnchor = anchor;
state.enteredBarrackZone = {
min: { x: minX - pad, z: minZ - pad },
max: { x: maxX + pad, z: maxZ + pad },
};
return state.enteredBarrackZone;
}
function barrackWallPhotoSideMode() {
const key = CONFIG.barrackWallPhotoSide || 'FrontSide';
if (key === 'BackSide') return THREE.BackSide;
if (key === 'DoubleSide') return THREE.DoubleSide;
return THREE.FrontSide;
}
function forEachBarrackWallPhotoMesh(fn) {
const arts = [getBarrackOpen(), getBarrackClosedWindows(), getBarrackClosed()];
let n = 0;
for (let a = 0; a < arts.length; a++) {
const art = arts[a];
if (!art || !art.object3D) continue;
art.object3D.traverse(function (child) {
if (!child.isMesh || !child.material) return;
let p = child;
while (p) {
if (/^_barr_shoji_room_isolated/i.test(String(p.name || ''))) return;
p = p.parent;
}
const matName = meshMaterialName(child);
if (!isBarrackWallPhotoMaterial(matName) && !isBarrackWallPhotoMaterial(child.name)) {
return;
}
fn(child);
n += 1;
});
}
return n;
}
function prepareBarrackWallPhotoFacing() {
const side = barrackWallPhotoSideMode();
const n = forEachBarrackWallPhotoMesh(function (child) {
child.visible = true;
const mats = Array.isArray(child.material) ? child.material : [child.material];
for (let i = 0; i < mats.length; i++) {
const mat = mats[i];
if (!mat) continue;
mat.side = side;
mat.needsUpdate = true;
}
});
return n;
}
function setBarrackWallPhotosVisible(visible) {
const side = barrackWallPhotoSideMode();
const n = forEachBarrackWallPhotoMesh(function (child) {
child.visible = !!visible;
setMeshCollidable(child, !!visible);
if (!visible) return;
const mats = Array.isArray(child.material) ? child.material : [child.material];
for (let i = 0; i < mats.length; i++) {
const mat = mats[i];
if (!mat) continue;
mat.side = side;
mat.needsUpdate = true;
}
});
return n;
}
function getEnteredBarrackFootprintBox() {
const zone = state.enteredBarrackZone;
if (!zone || !zone.min || !zone.max) return null;
return {
min: { x: zone.min.x, y: 0, z: zone.min.z },
max: { x: zone.max.x, y: 0, z: zone.max.z },
};
}
function ensureGhostProximityMaterial(mat) {
if (!mat) return null;
if (mat.userData && mat.userData._bmGhostProxUniforms) {
return mat.userData._bmGhostProxUniforms;
}
const uniforms = {
bmGhostPlayerPos: { value: new THREE.Vector3(0, 0, 0) },
bmGhostRadiusSq: { value: -1 },
};
const prev = mat.onBeforeCompile;
mat.onBeforeCompile = function (shader) {
if (typeof prev === 'function') prev(shader);
shader.uniforms.bmGhostPlayerPos = uniforms.bmGhostPlayerPos;
shader.uniforms.bmGhostRadiusSq = uniforms.bmGhostRadiusSq;
shader.vertexShader = shader.vertexShader
.replace(
'#include <common>',
'#include <common>\nvarying vec3 bmGhostWorldPos;'
)
.replace(
'#include <project_vertex>',
'bmGhostWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;\n#include <project_vertex>'
);
shader.fragmentShader = shader.fragmentShader
.replace(
'#include <common>',
[
'#include <common>',
'uniform vec3 bmGhostPlayerPos;',
'uniform float bmGhostRadiusSq;',
'varying vec3 bmGhostWorldPos;',
].join('\n')
)
.replace(
'#include <clipping_planes_fragment>',
[
'#include <clipping_planes_fragment>',
'if (bmGhostRadiusSq >= 0.0) {',
'  float _gdx = bmGhostWorldPos.x - bmGhostPlayerPos.x;',
'  float _gdz = bmGhostWorldPos.z - bmGhostPlayerPos.z;',
'  if (_gdx * _gdx + _gdz * _gdz > bmGhostRadiusSq) discard;',
'}',
].join('\n')
);
};
mat.customProgramCacheKey = function () {
return 'bmGhostProx1';
};
mat.userData = mat.userData || {};
mat.userData._bmGhostProxUniforms = uniforms;
mat.needsUpdate = true;
return uniforms;
}
function prepareBarrackGhostMaterials(artwork) {
if (!artwork || !artwork.object3D) return;
const proxList = [];
const seen = [];
const useProx = !!CONFIG.ghostProximityReveal;
const radius =
CONFIG.ghostProximityRadius != null ? CONFIG.ghostProximityRadius : 16;
const radiusSq = useProx ? radius * radius : -1;
artwork.object3D.traverse(function (child) {
const name = String(child.name || '');
if (/placementcube|giantplacement|fake/i.test(name)) {
child.visible = false;
if (child.isMesh) child.raycast = function () {};
return;
}
if (!child.isMesh || !child.material) return;
child.raycast = function () {};
child.renderOrder = 4;
child.frustumCulled = false;
child.visible = true;
const mats = Array.isArray(child.material) ? child.material : [child.material];
for (let i = 0; i < mats.length; i++) {
const mat = mats[i];
if (!mat) continue;
if (/fake/i.test(String(mat.name || ''))) {
child.visible = false;
continue;
}
mat.side = THREE.BackSide;
mat.transparent = true;
mat.opacity = 1;
mat.depthTest = true;
mat.depthWrite = false;
mat.alphaTest = 0.02;
mat.toneMapped = false;
if (useProx) {
if (seen.indexOf(mat) === -1) {
seen.push(mat);
const u = ensureGhostProximityMaterial(mat);
if (u) {
u.bmGhostRadiusSq.value = radiusSq;
proxList.push(u);
}
}
}
mat.needsUpdate = true;
}
});
state.ghostProximityUniforms = proxList;
state.ghostsProximityArmed = useProx && proxList.length > 0;
artwork._bmGhostsPrepared = true;
if (useProx) {
}
}
function updateGhostProximityReveal() {
if (!state.ghostsProximityArmed) return;
if (state.barrackDoorPhase !== 'sealed') return;
const pos = getPlayerWorld();
if (!pos) return;
const list = state.ghostProximityUniforms || [];
for (let i = 0; i < list.length; i++) {
const u = list[i];
if (!u || !u.bmGhostPlayerPos) continue;
u.bmGhostPlayerPos.value.set(pos.x, pos.y, pos.z);
}
}
function stabilizeBarrackShojiShield() {
const art = getBarrackOpen();
if (!art || !art.object3D) return;
art.object3D.traverse(function (child) {
if (!child.isMesh || !child.material) return;
let p = child;
let inShoji = false;
while (p) {
if (/^_barr_shoji_room_isolated/i.test(String(p.name || ''))) {
inShoji = true;
break;
}
p = p.parent;
}
if (!inShoji) return;
const matName = meshMaterialName(child);
if (!/front-open/i.test(matName) && !/front-open/i.test(String(child.name || ''))) {
return;
}
child.renderOrder = 1;
const mats = Array.isArray(child.material) ? child.material : [child.material];
for (let i = 0; i < mats.length; i++) {
const mat = mats[i];
if (!mat) continue;
mat.side = THREE.DoubleSide;
mat.depthWrite = true;
mat.depthTest = true;
mat.polygonOffset = true;
mat.polygonOffsetFactor = -1;
mat.polygonOffsetUnits = -1;
mat.needsUpdate = true;
}
});
}
function applyBarrackGhostReveal(sealed) {
const ghosts = getAsset('barrackGhosts');
if (state.scene2 && (state.scene2.active || state.scene2.leftGarden)) {
setArtworkShown(ghosts, false);
state.ghostsProximityArmed = false;
return;
}
if (!CONFIG.revealGhostsOnSeal) {
setArtworkShown(ghosts, false);
state.ghostsProximityArmed = false;
return;
}
if (sealed) {
setArtworkShown(ghosts, true);
disablePlacementHelpers(ghosts);
prepareBarrackGhostMaterials(ghosts);
stabilizeBarrackShojiShield();
const hidden = setBarrackWallPhotosVisible(false);
updateGhostProximityReveal();
} else {
setArtworkShown(ghosts, false);
state.ghostsProximityArmed = false;
}
}
function applyBarrackDoorVisuals() {
if (state.scene2 && state.scene2.leftGarden) {
setArtworkShown(getBarrackClosed(), false);
setArtworkShown(getBarrackClosedWindows(), false);
setArtworkShown(getBarrackOpen(), false);
setArtworkShown(getAsset('barrackGhosts'), false);
return;
}
const phase = state.barrackDoorPhase;
const showClosed = phase === 'closed';
const showClosedWindows = phase === 'windowsOpen' || phase === 'sealed';
const showOpen = phase === 'open' || phase === 'sealed';
setArtworkShown(getBarrackClosed(), showClosed);
setArtworkShown(getBarrackClosedWindows(), showClosedWindows);
setArtworkShown(getBarrackOpen(), showOpen);
applyBarrackShojiRoomOpenings(phase === 'open' || phase === 'sealed');
if (phase === 'windowsOpen' || phase === 'open') {
prepareBarrackWallPhotoFacing();
setBarrackWallPhotosVisible(true);
}
applyBarrackGhostReveal(phase === 'sealed');
}
function scheduleBarrackOpen() {
if (state.barrackOpenScheduled) return;
state.barrackOpenScheduled = true;
const stepMs = Math.max(500, Math.floor(CONFIG.barrackOpenDelayMs / 2));
window.setTimeout(function () {
if (state.barrackDoorPhase !== 'closed') return;
state.barrackDoorPhase = 'windowsOpen';
applyBarrackDoorVisuals();
}, stepMs);
window.setTimeout(function () {
if (state.barrackDoorPhase !== 'windowsOpen') return;
state.barrackDoorPhase = 'open';
applyBarrackDoorVisuals();
playDoorSfx();
}, CONFIG.barrackOpenDelayMs);
}
function sealBarrackDoors() {
if (CONFIG.entryCubeTestMode) return;
if (!CONFIG.sealBarrackOnEnter) return;
if (state.barrackDoorPhase === 'sealed') return;
const pos = getPlayerWorld();
if (pos) {
state.enteredBarrackAnchor = { x: pos.x, z: pos.z };
if (state.enteredBarrackZone) {
const pad =
CONFIG.enteredBarrackPhotoPad != null ? CONFIG.enteredBarrackPhotoPad : 14;
state.enteredBarrackZone = {
min: {
x: Math.min(state.enteredBarrackZone.min.x, pos.x - pad),
z: Math.min(state.enteredBarrackZone.min.z, pos.z - pad),
},
max: {
x: Math.max(state.enteredBarrackZone.max.x, pos.x + pad),
z: Math.max(state.enteredBarrackZone.max.z, pos.z + pad),
},
};
}
}
state.barrackDoorPhase = 'sealed';
applyBarrackDoorVisuals();
playDoorSfx();
const feet = state.audioFallback.footsteps || getScriptSfxElement('footsteps');
if (feet) {
try {
feet.pause();
} catch (e) {}
feet._bmFootPlaying = false;
}
}
function canEnterBarrack() {
if (CONFIG.entryCubeTestMode) return true;
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
function getMeshBoxExcludingPlacement(artwork) {
if (!artwork || !artwork.object3D) return null;
artwork.object3D.updateWorldMatrix(true, true);
const box = new THREE.Box3();
let found = false;
artwork.object3D.traverse(function (child) {
if (!child.isMesh) return;
let n = child;
while (n) {
const name = String(n.name || '');
if (/placementcube|giantplacement/i.test(name)) return;
n = n.parent;
}
child.updateWorldMatrix(true, false);
const b = new THREE.Box3().setFromObject(child);
if (!b.isEmpty()) {
box.union(b);
found = true;
}
});
return found ? box : null;
}
function getTriggerBox() {
return getMeshBox(getTrigger());
}
function shojiActive() {
if (CONFIG.scene1.enabled && !scene1().showShojiInScene1) return false;
return !CONFIG.scene1.enabled || state.scene1.shojiShown;
}
function shojiCfg() {
if (state.scene2 && state.scene2.active && scene2().shoji) {
return scene2().shoji;
}
return CONFIG.shoji;
}
function getShojiBox() {
if (state.scene2 && state.scene2.active) {
const key = state.scene2.shojiSealed ? 'shojiGardenClosed' : 'shojiGardenOpen';
return getMeshBoxExcludingPlacement(getAsset(key));
}
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
function castGardenMeshRay(meshRoot, fromX, fromY, fromZ, toX, toZ) {
const offsets = [-0.5, -2, -4, 0.5];
for (let i = 0; i < offsets.length; i++) {
const saved = CONFIG.rayHeightOffset;
CONFIG.rayHeightOffset = offsets[i];
const hit = castMeshRay(meshRoot, fromX, fromY, fromZ, toX, toZ);
CONFIG.rayHeightOffset = saved;
if (hit) return hit;
}
return null;
}
function prepareGardenColliders() {
const keys = ['gardenWallTrees', 'gardenExtras', 'shojiGardenOpen', 'shojiGardenClosed'];
for (let k = 0; k < keys.length; k++) {
const art = getAsset(keys[k]);
if (!art || !art.object3D) continue;
disablePlacementHelpers(art);
art.object3D.updateWorldMatrix(true, true);
art.object3D.traverse(function (child) {
if (!child.isMesh) return;
const name = String(child.name || '');
if (/^Cube(\.\d+)?$/i.test(name)) {
child.visible = true;
if (child.userData._bmShojiRaycast) {
child.raycast = child.userData._bmShojiRaycast;
}
const mats = child.material
? Array.isArray(child.material)
? child.material
: [child.material]
: [];
for (let m = 0; m < mats.length; m++) {
if (!mats[m]) continue;
mats[m].transparent = true;
mats[m].opacity = 0;
mats[m].depthWrite = false;
mats[m].needsUpdate = true;
}
return;
}
if (child.userData._bmShojiRaycast) {
child.raycast = child.userData._bmShojiRaycast;
}
setMeshCollidable(child, true);
});
}
}
function isInShojiDoorGap(x, z, box) {
const side = shojiCfg().stairsSide;
const half = shojiCfg().doorHalfWidth;
const cx = (box.min.x + box.max.x) * 0.5;
const cz = (box.min.z + box.max.z) * 0.5;
if (side === 'minZ' || side === 'maxZ') {
return Math.abs(x - cx) <= half;
}
return Math.abs(z - cz) <= half;
}
function isNearShojiDoorFace(x, z, box) {
const depth = shojiCfg().doorDepth != null ? shojiCfg().doorDepth : 4;
const side = shojiCfg().stairsSide;
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
return y > shojiCfg().floorDefault + 0.35;
}
function getStairsRailingCoord(box) {
const side = shojiCfg().stairsSide;
const insetX = (box.max.x - box.min.x) * 0.14;
const insetZ = (box.max.z - box.min.z) * 0.14;
if (side === 'minZ') return box.min.z + insetZ;
if (side === 'maxZ') return box.max.z - insetZ;
if (side === 'minX') return box.min.x + insetX;
return box.max.x - insetX;
}
function isPastStairsRailing(x, z, box) {
if (isInShojiDoorGap(x, z, box)) return false;
const side = shojiCfg().stairsSide;
const rail = getStairsRailingCoord(box);
const run = Math.max(shojiCfg().stairRun, 2) + 2;
if (side === 'minZ') return z < rail && z >= box.min.z - run;
if (side === 'maxZ') return z > rail && z <= box.max.z + run;
if (side === 'minX') return x < rail && x >= box.min.x - run;
return x > rail && x <= box.max.x + run;
}
function crossedStairsRailingBesideGap(prevX, prevZ, x, z, box) {
if (isInShojiDoorGap(x, z, box) || isInShojiDoorGap(prevX, prevZ, box)) return false;
const side = shojiCfg().stairsSide;
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
function resolveShojiFootprint(prevX, prevZ, x, z, box) {
const wasInside = isInsideBoxXZ({ x: prevX, z: prevZ }, box, 0);
const nowInside = isInsideBoxXZ({ x: x, z: z }, box, 0);
if (wasInside === nowInside) return null;
if (state.scene2.active && state.scene2.shojiSealed) {
return { x: prevX, z: prevZ };
}
const side = shojiCfg().stairsSide;
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
if (crossedStairsFace && isInShojiDoorGap(x, z, box)) return null;
if (crossedStairsFace && isInShojiDoorGap(prevX, prevZ, box)) return null;
return { x: prevX, z: prevZ };
}
function enforceWallCollisions() {
if (state.cameraAnimating) return;
if (CONFIG.entryCubeTestMode) {
const pos = getPlayerWorld();
if (pos) {
state.prevX = pos.x;
state.prevZ = pos.z;
}
return;
}
const pos = getPlayerWorld();
if (!pos) return;
if (state.barrackDoorPhase === 'open' && nearTriggerCube(pos)) return;
if (state.prevX == null || state.prevZ == null) {
state.prevX = pos.x;
state.prevZ = pos.z;
return;
}
const shojiBox = getShojiBox();
if (shojiBox) {
const blocked = resolveShojiFootprint(state.prevX, state.prevZ, pos.x, pos.z, shojiBox);
if (blocked) {
setPlayerXZ(blocked.x, blocked.z);
return;
}
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
if (!state.scene2.active && state.barrackDoorPhase === 'sealed') {
const foot = getEnteredBarrackFootprintBox();
if (foot) {
const wasInside = isInsideBoxXZ(
{ x: state.prevX, z: state.prevZ },
foot,
0
);
const nowInside = isInsideBoxXZ(pos, foot, 0);
if (wasInside !== nowInside) {
setPlayerXZ(state.prevX, state.prevZ);
return;
}
}
} else if (!state.scene2.active && state.barrackDoorPhase !== 'open') {
const shell =
state.barrackDoorPhase === 'windowsOpen'
? getBarrackClosedWindows() || getBarrackClosed()
: getBarrackClosed();
const closedBox = getMeshBox(shell);
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
const walls = [];
if (!state.scene2.active) {
if (state.barrackDoorPhase === 'open' || state.barrackDoorPhase === 'sealed') {
walls.push(getBarrackOpen());
}
if (state.barrackDoorPhase === 'windowsOpen' || state.barrackDoorPhase === 'sealed') {
walls.push(getBarrackClosedWindows());
}
if (state.barrackDoorPhase === 'closed') {
walls.push(getBarrackClosed());
}
}
if (shojiActive()) walls.push(getShoji());
if (CONFIG.scene1.enabled && !state.scene2.active) {
walls.push(getAsset('towerAll'));
fenceCenterKeys().forEach(function (key) {
walls.push(getAsset(key));
});
fenceSideKeys().forEach(function (key) {
if (state.scene1.fenceSideShown[key]) walls.push(getAsset(key));
});
}
if (state.scene2.active) {
walls.push(getAsset('gardenWallTrees'));
walls.push(getAsset('gardenExtras'));
walls.push(
getAsset(state.scene2.shojiSealed ? 'shojiGardenClosed' : 'shojiGardenOpen')
);
}
for (let i = 0; i < walls.length; i++) {
const art = walls[i];
if (!art || !art.object3D) continue;
const hit = state.scene2.active
? castGardenMeshRay(art.object3D, state.prevX, pos.y, state.prevZ, pos.x, pos.z)
: castMeshRay(art.object3D, state.prevX, pos.y, state.prevZ, pos.x, pos.z);
if (hit) {
const isOpenGardenShoji =
state.scene2.active &&
!state.scene2.shojiSealed &&
art === getAsset('shojiGardenOpen');
const isOldShoji = art === getShoji();
if (
(isOldShoji || isOpenGardenShoji) &&
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
function getShojiInnerBox(box) {
const inner = box.clone();
const sx = (box.max.x - box.min.x) * shojiCfg().innerShrink;
const sz = (box.max.z - box.min.z) * shojiCfg().innerShrink;
inner.min.x += sx;
inner.max.x -= sx;
inner.min.z += sz;
inner.max.z -= sz;
return inner;
}
function getStairProgress(pos, box) {
const side = shojiCfg().stairsSide;
const run = Math.max(shojiCfg().stairRun, 2);
let dist = 0;
if (side === 'minZ') dist = pos.z - (box.min.z - run);
else if (side === 'maxZ') dist = box.max.z + run - pos.z;
else if (side === 'minX') dist = pos.x - (box.min.x - run);
else dist = box.max.x + run - pos.x;
return dist / run;
}
function floorFromStairProgress(t) {
const s = shojiCfg();
if (t <= 0) return s.floorDefault;
if (s.floorStep3 != null) {
if (t < 0.25) return s.floorStep1;
if (t < 0.5) return s.floorStep2;
if (t < 0.75) return s.floorStep3;
return s.floorInside;
}
if (t < 0.5) return s.floorStep1;
if (t < 1) return s.floorStep2;
return s.floorInside;
}
function isOnStairsApproach(pos, box) {
const side = shojiCfg().stairsSide;
const half = shojiCfg().doorHalfWidth + 2;
const cx = (box.min.x + box.max.x) * 0.5;
const cz = (box.min.z + box.max.z) * 0.5;
const reach = shojiCfg().approachRadius;
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
return shojiCfg().floorInside;
}
return floorFromStairProgress(getStairProgress(pos, box));
}
function applyShojiSteps() {
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
if (state.scene2.active && state.scene2.shojiSealed) {
setPlayerFloor(shojiCfg().floorDefault);
return;
}
if (
state.scene2.active &&
state.scene2.holdDeckUntil &&
performance.now() < state.scene2.holdDeckUntil
) {
setPlayerFloor(shojiCfg().floorInside);
return;
}
let target = shojiCfg().floorDefault;
const inside = isInsideBoxXZ(pos, box, 0);
const onStairs = isOnStairsApproach(pos, box);
if (inside || onStairs) {
if (inside) {
target = getShojiStepFloor(pos, box);
} else if (onStairs) {
target = floorFromStairProgress(getStairProgress(pos, box));
}
}
setPlayerFloor(target);
if (state.scene2.active) {
checkGardenShojiSeal(pos, box);
}
if (CONFIG.debugHeight && performance.now() - state.heightDebugAt > 500) {
state.heightDebugAt = performance.now();
const ms = window.controls;
const mover = getMover();
}
}
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
function entryVariantKey(variant) {
if (variant === 'withGiant') return 'barrackEntryWithGiant';
if (variant === 'fused') return 'barrackEntryFused';
return 'barrackEntryNoGiant';
}
function getBarrackEntryTriggerId() {
const key = entryVariantKey(CONFIG.entryTriggerVariant);
return ASSET_IDS[key];
}
function allEntryVariantKeys() {
return ['barrackEntryNoGiant', 'barrackEntryWithGiant', 'barrackEntryFused'];
}
function applyEntryTriggerVariant() {
const activeId = getBarrackEntryTriggerId();
ASSET_IDS.barrackEntryTriggers = activeId;
delete state.assets.barrackEntryTriggers;
const activeKey = entryVariantKey(CONFIG.entryTriggerVariant);
allEntryVariantKeys().forEach(function (key) {
if (key === activeKey) return;
forceHideArtwork(getAsset(key));
forceHideArtworkById(ASSET_IDS[key]);
});
forceHideArtwork(getAsset('trigger'));
forceHideArtwork(getAsset('scene2Trigger'));
setArtworkShown(getAsset(activeKey), true);
}
function listTriggerCubes(artwork, nameHint) {
const out = [];
if (!artwork || !artwork.object3D) return out;
artwork.object3D.updateWorldMatrix(true, true);
const hint = (nameHint || 'trigger').toLowerCase();
artwork.object3D.traverse(function (child) {
if (!child.isMesh) return;
const name = String(child.name || '');
if (/placementcube|giantplacement/i.test(name)) return;
if (name.toLowerCase().indexOf(hint) === -1 && name.toLowerCase().indexOf('trigger') === -1) {
return;
}
child.updateWorldMatrix(true, false);
const box = new THREE.Box3().setFromObject(child);
if (box.isEmpty()) return;
const pos = new THREE.Vector3();
child.getWorldPosition(pos);
out.push({ name: name, mesh: child, box: box, pos: pos });
});
return out;
}
function distXZ(ax, az, bx, bz) {
const dx = ax - bx;
const dz = az - bz;
return Math.sqrt(dx * dx + dz * dz);
}
function nearestTriggerCube(pos, cubes, radius) {
if (!pos || !cubes || !cubes.length) return null;
let best = null;
let bestD = radius != null ? radius : CONFIG.triggerRadius;
for (let i = 0; i < cubes.length; i++) {
const c = cubes[i];
if (c.box && isInsideBoxXZ(pos, c.box, 1.5)) {
return c;
}
const d = distXZ(pos.x, pos.z, c.pos.x, c.pos.z);
if (d <= bestD) {
bestD = d;
best = c;
}
}
return best;
}
function pairedGardenCube(entryCube) {
const gardens = getGardenEntryCubes();
if (!entryCube || !gardens.length) return null;
const m = /\.(\d+)$/.exec(String(entryCube.name || ''));
if (m) {
const suf = '.' + m[1];
for (let i = 0; i < gardens.length; i++) {
if (String(gardens[i].name || '').indexOf(suf) !== -1) return gardens[i];
}
}
let best = null;
let bestD = Infinity;
for (let i = 0; i < gardens.length; i++) {
const d = distXZ(entryCube.pos.x, entryCube.pos.z, gardens[i].pos.x, gardens[i].pos.z);
if (d < bestD) {
bestD = d;
best = gardens[i];
}
}
return best;
}
function entryExitSideFromApproach(playerPos, cube) {
if (!playerPos || !cube || !cube.box) {
return CONFIG.entryDestSide || 'maxX';
}
const box = cube.box;
const cx = (box.min.x + box.max.x) * 0.5;
const cz = (box.min.z + box.max.z) * 0.5;
const dx = playerPos.x - cx;
const dz = playerPos.z - cz;
if (Math.abs(dx) >= Math.abs(dz)) {
return dx > 0 ? 'minX' : 'maxX';
}
return dz > 0 ? 'minZ' : 'maxZ';
}
function getInsideFaceWorldDestFromCube(playerPos, cube) {
const ms = window.controls;
const floorY = ms && ms.floorLevel != null ? ms.floorLevel : playerPos.y;
const over = CONFIG.insideOvershoot;
const clear = CONFIG.triggerRadius + 2;
const box = cube && cube.box;
const center = cube && cube.pos;
const destSide = entryExitSideFromApproach(playerPos, cube);
let x = playerPos.x;
let z = playerPos.z;
if (box) {
if (destSide === 'maxX') {
x = box.max.x + over;
z = Math.min(box.max.z, Math.max(box.min.z, playerPos.z));
} else if (destSide === 'minX') {
x = box.min.x - over;
z = Math.min(box.max.z, Math.max(box.min.z, playerPos.z));
} else if (destSide === 'maxZ') {
z = box.max.z + over;
x = Math.min(box.max.x, Math.max(box.min.x, playerPos.x));
} else {
z = box.min.z - over;
x = Math.min(box.max.x, Math.max(box.min.x, playerPos.x));
}
} else if (center) {
if (destSide === 'maxX') x = center.x + clear;
else if (destSide === 'minX') x = center.x - clear;
else if (destSide === 'maxZ') z = center.z + clear;
else z = center.z - clear;
}
return { x: x, y: floorY, z: z };
}
function hideMultiTriggerVisual(artwork) {
if (!artwork || !artwork.object3D) return;
const show = !CONFIG.hideTriggerCube;
try {
nac.setArtworkOpacity(artwork, show ? 1 : 0);
} catch (e) {}
artwork.object3D.visible = show;
artwork.object3D.traverse(function (child) {
if (!child.isMesh) return;
const name = String(child.name || '');
if (/placementcube|giantplacement/i.test(name)) {
child.visible = false;
return;
}
child.visible = show;
});
}
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
function startForcedPush(activeCube) {
if (state.cameraAnimating) return;
if (!canEnterBarrack()) return;
if (CONFIG.oneWay && state.hasEntered) return;
captureEnteredBarrackZone(activeCube);
state.cameraAnimating = true;
lockNavigation();
const mover = getMover();
const camWorld = getPlayerWorld();
if (!mover || !camWorld) {
state.cameraAnimating = false;
unlockNavigation();
return;
}
const destWorld = activeCube
? getInsideFaceWorldDestFromCube(camWorld, activeCube)
: getInsideFaceWorldDest(camWorld);
if (activeCube) {
}
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
function getBarrackEntryCubes() {
return listTriggerCubes(getAsset('barrackEntryTriggers'), 'barrackentry');
}
function checkProximityEntry() {
if (state.cameraAnimating) return;
const pos = getPlayerWorld();
if (!pos) return;
const cubes = getBarrackEntryCubes();
if (!cubes.length) return;
const hit = nearestTriggerCube(pos, cubes, CONFIG.triggerRadius);
const inZone = !!hit;
if (state.mustLeaveCube) {
if (!inZone) {
state.mustLeaveCube = false;
if (!CONFIG.oneWay) state.hasEntered = false;
}
return;
}
if (CONFIG.oneWay && state.hasEntered) return;
if (inZone) startForcedPush(hit);
}
function hideTriggerCubeVisual() {
hideMultiTriggerVisual(getAsset('barrackEntryTriggers'));
hideMultiTriggerVisual(getAsset('gardenEntryTriggers'));
const activeKey = entryVariantKey(CONFIG.entryTriggerVariant);
allEntryVariantKeys().forEach(function (key) {
if (key === activeKey) return;
forceHideArtworkById(ASSET_IDS[key]);
});
forceHideArtwork(getAsset('trigger'));
forceHideArtwork(getAsset('scene2Trigger'));
}
function setupProximityEntry() {
if (state.proximityWired) return;
applyEntryTriggerVariant();
const multi = getAsset('barrackEntryTriggers');
if (!multi) {
console.warn('[BM] barrackEntryTriggers GLB not found');
return;
}
state.proximityWired = true;
hideTriggerCubeVisual();
disablePlacementHelpers(multi);
disablePlacementHelpers(getAsset('barrackEntryWithGiant'));
disablePlacementHelpers(getAsset('barrackEntryNoGiant'));
disablePlacementHelpers(getAsset('barrackEntryFused'));
disablePlacementHelpers(getAsset('gardenEntryTriggers'));
if (typeof nac.onUserAvatarEntersArtworkRadius === 'function') {
nac.onUserAvatarEntersArtworkRadius(multi, 200, function () {
if (!canEnterBarrack()) return;
const pos = getPlayerWorld();
const hit = nearestTriggerCube(pos, getBarrackEntryCubes(), CONFIG.triggerRadius);
if (hit) startForcedPush(hit);
});
}
}
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
mat.depthWrite = opacity >= 0.99;
mat.needsUpdate = true;
}
});
setMaterialGroupOpacity(root, bodyMats, opacity);
}
function prepareMonumentFaces(root) {
if (!root) return;
const faceNodes = scene1().monumentFaceNodes;
const faceMats = scene1().monumentFaceMaterials;
forEachMonumentPart(root, faceNodes, function (mesh) {
mesh.visible = true;
mesh.renderOrder = 2;
const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
for (let i = 0; i < mats.length; i++) {
const mat = mats[i];
if (!mat) continue;
mat.transparent = true;
mat.opacity = 1;
mat.depthWrite = true;
mat.depthTest = true;
mat.side = THREE.DoubleSide;
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
function getAudioElement(key) {
const art = getAsset(key);
if (art && art.element) return art.element;
if (state.audioFallback[key]) return state.audioFallback[key];
const file = AUDIO_FILES[key];
if (!file) return null;
const el = new Audio(scene1().localAudioPath + file);
el.preload = 'auto';
state.audioFallback[key] = el;
return el;
}
function playAudioAsset(key, volume, loop) {
const el = getAudioElement(key);
if (!el) return null;
if (el._bmFinished) return el;
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
function getOneShotAudioElement(key) {
const cacheKey = key + 'OneShot';
if (state.audioFallback[cacheKey] && !state.audioFallback[cacheKey]._bmSrcFailed) {
return state.audioFallback[cacheKey];
}
let src = null;
const art = getAsset(key);
const nacEl = art && art.element;
if (nacAudioElementUsable(nacEl)) {
src = nacEl.currentSrc || nacEl.src;
}
if (!src) src = resolveScriptSfxSrc(key);
if (!src && AUDIO_FILES[key]) src = scene1().localAudioPath + AUDIO_FILES[key];
if (!src) {
console.warn('[BM] one-shot src missing', key);
return null;
}
const el = new Audio(src);
el.preload = 'auto';
el.loop = false;
el._bmSrcFailed = false;
el.onerror = function () {
el._bmSrcFailed = true;
console.warn('[BM] one-shot failed to load', key, src);
};
state.audioFallback[cacheKey] = el;
muteNacAudioArtwork(key);
return el;
}
function playOneShotSceneAudio(key, volume, doneFlag, durationMs, label) {
muteNacAudioArtwork(key);
const el = getOneShotAudioElement(key);
if (!el || el._bmSrcFailed) {
console.warn('[BM scene1]', label || key, 'audio missing');
window.setTimeout(function () {
state.scene1[doneFlag] = true;
muteNacAudioArtwork(key);
}, durationMs || 26000);
return null;
}
if (el._bmFinished) return el;
el._bmFinished = false;
el.loop = false;
el.volume = volume != null ? volume : 1;
el.onended = function () {
markOneShotFinished(key, doneFlag);
muteNacAudioArtwork(key);
};
const start = function () {
try {
el.currentTime = 0;
} catch (e) {}
const played = el.play();
if (played && typeof played.catch === 'function') {
played.catch(function (err) {
console.warn('[BM scene1]', label || key, 'blocked:', err && err.name);
if (err && err.name === 'NotAllowedError' && !el._bmGestureRetry) {
el._bmGestureRetry = true;
const retry = function () {
document.removeEventListener('pointerdown', retry, true);
document.removeEventListener('keydown', retry, true);
el.play().catch(function () {});
};
document.addEventListener('pointerdown', retry, true);
document.addEventListener('keydown', retry, true);
}
});
}
};
if (el.readyState >= 2) start();
else {
el.addEventListener('canplay', start, { once: true });
try {
el.load();
} catch (e) {}
}
stopAudioAfterMs(key, el, doneFlag, durationMs || 26000);
return el;
}
function muteNacAudioArtwork(key) {
const art = getAsset(key);
if (!art) return;
art.maxAudibleRadius = 0;
art.maxVolume = 0;
if (art.element) {
try {
art.element.volume = 0;
art.element.pause();
} catch (e) {}
}
try {
if (typeof nac.stopAudio === 'function') nac.stopAudio(art);
} catch (e) {}
}
function resolveScriptSfxSrc(key) {
const art = getAsset(key);
if (art) {
const el = art.element;
if (el) {
const live = el.currentSrc || el.src;
if (live) return live;
}
if (art.src) return art.src;
if (art.url) return art.url;
if (art.audioUrl) return art.audioUrl;
if (art.fileUrl) return art.fileUrl;
const fname = art.fileName || art.prettyFileName;
if (fname) return scene1().localAudioPath + String(fname).replace(/^.*\
}
if (AUDIO_FILES[key]) return scene1().localAudioPath + AUDIO_FILES[key];
return null;
}
function getScriptSfxElement(key) {
const cached = state.audioFallback[key];
if (cached && cached._bmSrcOk) return cached;
if (cached && cached._bmSrcFailed) {
if (cached._bmRetryAt && Date.now() < cached._bmRetryAt) return null;
}
const src = resolveScriptSfxSrc(key);
if (!src) {
if (!state.missingWarned['sfx:' + key]) {
state.missingWarned['sfx:' + key] = true;
console.warn('[BM] no SFX src for', key);
}
return null;
}
const el = new Audio();
el.preload = 'auto';
el._bmSrcOk = false;
el._bmSrcFailed = false;
el.onerror = function () {
el._bmSrcFailed = true;
el._bmSrcOk = false;
el._bmRetryAt = Date.now() + 2000;
console.warn('[BM] SFX failed to load', key, src);
};
el.oncanplaythrough = function () {
el._bmSrcOk = true;
el._bmSrcFailed = false;
};
el.src = src;
try {
el.load();
} catch (e) {}
state.audioFallback[key] = el;
return el;
}
function nacAudioElementUsable(el) {
if (!el) return false;
const src = el.currentSrc || el.src || '';
if (!src) return false;
if (el.error) return false;
return true;
}
function playDoorSfx() {
const vol = scene1().doorSfxVolume != null ? scene1().doorSfxVolume : 1;
const art = getAsset('doorSfx');
const nacEl = art && art.element;
if (nacAudioElementUsable(nacEl)) {
state._bmDoorPlaying = true;
art.maxAudibleRadius = 1e6;
art.maxVolume = vol;
nacEl._bmFinished = false;
nacEl.loop = false;
nacEl.volume = vol;
try {
nacEl.currentTime = 0;
} catch (e) {}
const played = nacEl.play();
if (played && typeof played.catch === 'function') {
played.catch(function (err) {
console.warn('[BM] door2 nac blocked:', err && err.name);
state._bmDoorPlaying = false;
});
}
const remute = function () {
state._bmDoorPlaying = false;
muteNacAudioArtwork('doorSfx');
};
nacEl.onended = remute;
window.setTimeout(remute, 3000);
return nacEl;
}
let el = state.audioFallback.doorSfx;
if (!el || el._bmSrcFailed) {
const file = AUDIO_FILES.doorSfx;
const src = file ? scene1().localAudioPath + file : resolveScriptSfxSrc('doorSfx');
if (!src) {
console.warn('[BM] door2 missing — place 488721 in space or artworks/' + file);
return null;
}
el = new Audio(src);
el.preload = 'auto';
el._bmSrcOk = false;
el._bmSrcFailed = false;
el.onerror = function () {
el._bmSrcFailed = true;
console.warn('[BM] door2 local load failed', src);
};
el.oncanplaythrough = function () {
el._bmSrcOk = true;
};
state.audioFallback.doorSfx = el;
}
state._bmDoorPlaying = true;
el._bmFinished = false;
el.loop = false;
el.volume = vol;
const start = function () {
try {
el.currentTime = 0;
} catch (e) {}
const played = el.play();
if (played && typeof played.catch === 'function') {
played.catch(function (err) {
console.warn('[BM] door2 local blocked:', err && err.name);
state._bmDoorPlaying = false;
});
}
};
if (el.readyState >= 2) start();
else {
el.addEventListener('canplay', start, { once: true });
try {
el.load();
} catch (e) {}
}
window.setTimeout(function () {
state._bmDoorPlaying = false;
}, 3000);
return el;
}
function silenceSongbirdForever() {
muteNacAudioArtwork('songbird');
const el = state.audioFallback.songbird;
if (el) {
el.volume = 0;
el.loop = false;
el._bmFinished = true;
try {
el.pause();
el.currentTime = 0;
} catch (e) {}
}
}
function isPlayerMoving() {
if (state.cameraAnimating) return false;
const ms = window.controls;
if (ms && ms.moving) {
if (
ms.moving.forward ||
ms.moving.backward ||
ms.moving.left ||
ms.moving.right
) {
return true;
}
}
if (ms && ms.velocity) {
const v = ms.velocity;
const vx = v.x || 0;
const vz = v.z || 0;
if (vx * vx + vz * vz > 0.0004) return true;
}
const pos = getPlayerWorld();
if (!pos) return false;
if (state._footLastX != null && state._footLastZ != null) {
const dx = pos.x - state._footLastX;
const dz = pos.z - state._footLastZ;
state._footLastX = pos.x;
state._footLastZ = pos.z;
if (dx * dx + dz * dz > 0.00005) return true;
} else {
state._footLastX = pos.x;
state._footLastZ = pos.z;
}
return false;
}
function isOutsideBarrackForFootsteps() {
if (state.scene2 && state.scene2.active) return false;
if (state.hasEntered) return false;
if (state.barrackDoorPhase === 'sealed') return false;
return true;
}
function updateFootstepsAudio() {
muteNacAudioArtwork('footsteps');
const shouldPlay = isPlayerMoving() && isOutsideBarrackForFootsteps();
const vol =
scene1().footstepsVolume != null ? scene1().footstepsVolume : 0.55;
const el = getScriptSfxElement('footsteps');
const cloneReady = !!(el && el._bmSrcOk && !el._bmSrcFailed);
if (!cloneReady) {
const art = getAsset('footsteps');
const nacEl = art && art.element;
if (shouldPlay && nacEl) {
art.maxAudibleRadius = 1e6;
art.maxVolume = vol;
nacEl._bmFinished = false;
nacEl.loop = true;
nacEl.volume = vol;
if (nacEl.paused) {
const played = nacEl.play();
if (played && typeof played.catch === 'function') {
played.catch(function () {});
}
}
state._bmNacFeetPlaying = true;
} else if (state._bmNacFeetPlaying && nacEl) {
try {
nacEl.pause();
} catch (e) {}
state._bmNacFeetPlaying = false;
muteNacAudioArtwork('footsteps');
} else if (!shouldPlay) {
muteNacAudioArtwork('footsteps');
}
return;
}
if (shouldPlay) {
el._bmFinished = false;
el.loop = true;
el.volume = vol;
if (el.paused || !el._bmFootPlaying) {
const played = el.play();
if (played && typeof played.catch === 'function') {
played.catch(function (err) {
if (!el._bmWarnedPlay) {
el._bmWarnedPlay = true;
console.warn('[BM] footsteps blocked:', err && err.name, el.src);
}
});
}
el._bmFootPlaying = true;
}
} else if (el._bmFootPlaying || !el.paused) {
try {
el.pause();
} catch (e) {}
el._bmFootPlaying = false;
}
}
function lockAudioFromReplay(key) {
const art = getAsset(key);
const el = getAudioElement(key);
if (el) {
el._bmFinished = true;
el.loop = false;
try {
el.pause();
el.currentTime = 0;
} catch (e) {}
if (!el._bmPlayLocked) {
el._bmPlayLocked = true;
const orig = el.play.bind(el);
el.play = function () {
if (el._bmFinished) {
try {
el.pause();
el.currentTime = 0;
} catch (e) {}
return Promise.resolve();
}
return orig();
};
}
}
if (art) {
art.maxAudibleRadius = 0;
try {
if (typeof nac.stopAudio === 'function') nac.stopAudio(art);
} catch (e) {}
}
}
function silenceGongForever() {
const art = getAsset('gong');
const el = getAudioElement('gong');
if (el) {
el.volume = 0;
el.loop = false;
el._bmFinished = true;
try {
el.pause();
el.currentTime = 0;
} catch (e) {}
}
lockAudioFromReplay('gong');
if (art) {
art.maxAudibleRadius = 0;
art.maxVolume = 0;
}
}
function silenceNewSfxUntilWired() {
silenceSongbirdForever();
if (!state._bmDoorPlaying) muteNacAudioArtwork('doorSfx');
muteNacAudioArtwork('footsteps');
}
function markOneShotFinished(key, doneFlag) {
state.scene1[doneFlag] = true;
lockAudioFromReplay(key);
}
function enforceScene1AudioLocks() {
if (!CONFIG.scene1.enabled) return;
silenceGongForever();
if (!scene1().playSongbird) silenceSongbirdForever();
silenceNewSfxUntilWired();
if (state.scene1.voiceDone) {
lockAudioFromReplay('radio');
muteNacAudioArtwork('radio');
}
if (state.scene1.azanDone) {
lockAudioFromReplay('azan');
muteNacAudioArtwork('azan');
}
if (state.scene1.voiceStarted && state.scene1.voiceDone) {
['radio', 'radioOneShot'].forEach(function (k) {
const v = k === 'radio' ? getAudioElement('radio') : state.audioFallback.radioOneShot;
if (v && !v.paused) {
try {
v.pause();
v.currentTime = 0;
} catch (e) {}
}
});
}
if (state.scene1.azanStarted && state.scene1.azanDone) {
['azan', 'azanOneShot'].forEach(function (k) {
const a = k === 'azan' ? getAudioElement('azan') : state.audioFallback.azanOneShot;
if (a && !a.paused) {
try {
a.pause();
a.currentTime = 0;
} catch (e) {}
}
});
}
}
function setAzanVolume(v) {
const el = getAudioElement('azan');
if (el && !el._bmFinished) el.volume = v;
}
function hideCampForScene1() {
setArtworkShown(getBarrackOpen(), false);
setArtworkShown(getBarrackClosed(), false);
setArtworkShown(getBarrackClosedWindows(), false);
setArtworkShown(getAsset('skyBarrier'), false);
setArtworkShown(getShoji(), false);
setArtworkShown(getAsset('towerAll'), false);
setArtworkShown(getAsset('tower'), false);
setArtworkShown(getAsset('barrackGhosts'), false);
fenceCenterKeys().forEach(function (key) {
setArtworkShown(getAsset(key), true);
disablePlacementHelpers(getAsset(key));
});
resetFenceSideShown();
fenceSideKeys().forEach(function (key) {
setArtworkShown(getAsset(key), false);
disablePlacementHelpers(getAsset(key));
});
applyEntryTriggerVariant();
setArtworkShown(getAsset('gardenEntryTriggers'), true);
state.scene1.campShown = false;
state.scene1.shojiShown = false;
state.scene1.skyBarrierShown = false;
state.scene1.windowsOpened = false;
state.scene1.doorsOpened = false;
state.scene1.calligraphyGone = false;
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
function distToFenceMeshXZ(pos, art) {
if (!pos || !art) return Infinity;
const box =
typeof getMeshBoxExcludingPlacement === 'function'
? getMeshBoxExcludingPlacement(art)
: getMeshBox(art);
if (box) {
const cx = Math.min(box.max.x, Math.max(box.min.x, pos.x));
const cz = Math.min(box.max.z, Math.max(box.min.z, pos.z));
const dx = pos.x - cx;
const dz = pos.z - cz;
return Math.sqrt(dx * dx + dz * dz);
}
const c = artworkWorldPos(art);
if (!c) return Infinity;
const dx = pos.x - c.x;
const dz = pos.z - c.z;
return Math.sqrt(dx * dx + dz * dz);
}
function showFenceSide(key) {
const art = getAsset(key);
if (!art) return;
state.scene1.fenceSideShown[key] = true;
disablePlacementHelpers(art);
fadeArtwork(art, 0, 1, 800);
if (art.object3D) {
art.object3D.visible = true;
art.object3D.traverse(function (child) {
const name = String(child.name || '');
if (/placementcube|giantplacement/i.test(name)) {
child.visible = false;
return;
}
child.visible = true;
});
}
}
function updateFenceSidePops() {
if (!CONFIG.scene1.enabled) return;
if (!scene1().fencePopEnabled) return;
if (!state.scene1.started && !state.scene1.campShown) return;
const pos = getPlayerWorld();
if (!pos) return;
const radius = scene1().fencePopRadius;
const sides = fenceSideKeys();
for (let i = 0; i < sides.length; i++) {
const key = sides[i];
if (state.scene1.fenceSideShown[key]) continue;
const art = getAsset(key);
if (!art) continue;
const d = distToFenceMeshXZ(pos, art);
if (d <= radius) {
showFenceSide(key);
}
}
}
function updateNorthFencePop() {
updateFenceSidePops();
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
function stopAudioAfterMs(key, el, doneFlag, ms) {
window.setTimeout(function () {
if (state.scene1[doneFlag]) {
lockAudioFromReplay(key);
muteNacAudioArtwork(key);
return;
}
if (el) {
try {
el.pause();
el.currentTime = 0;
} catch (e) {}
}
markOneShotFinished(key, doneFlag);
muteNacAudioArtwork(key);
}, ms + 200);
}
function getGlobalWindElement() {
if (state.audioFallback.windGlobal && !state.audioFallback.windGlobal._bmSrcFailed) {
return state.audioFallback.windGlobal;
}
const art = getAsset('wind');
const nacEl = art && art.element;
let src = null;
if (nacAudioElementUsable(nacEl)) {
src = nacEl.currentSrc || nacEl.src;
}
if (!src) src = resolveScriptSfxSrc('wind');
if (!src && AUDIO_FILES.wind) src = scene1().localAudioPath + AUDIO_FILES.wind;
if (!src) {
console.warn('[BM] wind src missing');
return null;
}
const el = new Audio(src);
el.preload = 'auto';
el.loop = true;
el._bmSrcFailed = false;
el.onerror = function () {
el._bmSrcFailed = true;
console.warn('[BM] global wind failed to load', src);
};
state.audioFallback.windGlobal = el;
return el;
}
function startGlobalWindAudio() {
muteNacAudioArtwork('wind');
const vol = scene1().windVolume != null ? scene1().windVolume : 0.1;
const art = getAsset('wind');
const nacEl = art && art.element;
const el = getGlobalWindElement();
if (el && !el._bmSrcFailed) {
el.loop = true;
el.volume = vol;
el._bmFinished = false;
if (el.paused) {
const played = el.play();
if (played && typeof played.catch === 'function') {
played.catch(function (err) {
console.warn('[BM] global wind blocked:', err && err.name);
});
}
}
state._bmGlobalWindPlaying = true;
return el;
}
if (nacAudioElementUsable(nacEl)) {
art.maxAudibleRadius = 1e9;
art.maxVolume = vol;
nacEl.loop = true;
nacEl.volume = vol;
nacEl._bmFinished = false;
if (nacEl.paused) {
const played = nacEl.play();
if (played && typeof played.catch === 'function') {
played.catch(function () {});
}
}
state._bmGlobalWindPlaying = true;
return nacEl;
}
return null;
}
function ensureGlobalWindAudio() {
if (!CONFIG.scene1.enabled || !state.scene1.started) return;
muteNacAudioArtwork('wind');
const vol = scene1().windVolume != null ? scene1().windVolume : 0.1;
const el = state.audioFallback.windGlobal;
if (el && !el._bmSrcFailed) {
el.loop = true;
el.volume = vol;
if (el.paused) {
const played = el.play();
if (played && typeof played.catch === 'function') played.catch(function () {});
}
return;
}
if (!state._bmGlobalWindPlaying) startGlobalWindAudio();
else {
const art = getAsset('wind');
const nacEl = art && art.element;
if (nacAudioElementUsable(nacEl)) {
art.maxAudibleRadius = 1e9;
art.maxVolume = vol;
nacEl.loop = true;
nacEl.volume = vol;
if (nacEl.paused) {
const played = nacEl.play();
if (played && typeof played.catch === 'function') played.catch(function () {});
}
}
}
}
function setGlobalWindVolume(vol) {
scene1().windVolume = vol;
const el = state.audioFallback.windGlobal;
if (el) el.volume = vol;
const art = getAsset('wind');
if (art && art.element && state._bmGlobalWindPlaying && !el) {
art.element.volume = vol;
art.maxVolume = vol;
}
}
function startScene1Audio() {
silenceGongForever();
silenceNewSfxUntilWired();
startGlobalWindAudio();
if (scene1().playGong) playAudioAsset('gong', 1, false);
else silenceGongForever();
if (!scene1().playSongbird) silenceSongbirdForever();
getScriptSfxElement('footsteps');
getScriptSfxElement('doorSfx');
if (!state.scene1.voiceStarted) {
state.scene1.voiceStarted = true;
playOneShotSceneAudio(
'radio',
scene1().voiceVolume,
'voiceDone',
scene1().voiceDurationMs,
'documents'
);
}
if (!state.scene1.azanStarted) {
state.scene1.azanStarted = true;
playOneShotSceneAudio(
'azan',
scene1().azanVolume,
'azanDone',
scene1().voiceDurationMs,
'azan'
);
}
}
function showShojiTemple() {
if (!scene1().showShojiInScene1) return;
const shoji = getShoji();
if (!shoji) return;
fadeArtwork(shoji, 0, 1, 2000);
state.scene1.shojiShown = true;
}
function openBarrackWindowsForScene1() {
if (state.scene1.windowsOpened) return;
if (state.barrackDoorPhase !== 'closed') return;
state.scene1.windowsOpened = true;
state.barrackDoorPhase = 'windowsOpen';
applyBarrackDoorVisuals();
}
function openBarrackDoorsForScene1() {
if (state.scene1.doorsOpened) return;
if (state.barrackDoorPhase === 'open' || state.barrackDoorPhase === 'sealed') return;
state.scene1.doorsOpened = true;
state.barrackDoorPhase = 'open';
applyBarrackDoorVisuals();
playDoorSfx();
if (scene1().showShojiInScene1) showShojiTemple();
console.log('[BM scene1] t=49s doors open, windows open (pop; shoji still hidden)');
}
function fadeInSkyBarrier() {
if (state.scene1.skyBarrierShown) return;
state.scene1.skyBarrierShown = true;
fadeArtwork(getAsset('skyBarrier'), 0, 1, scene1().skyBarrierFadeMs);
}
function fadeInCamp() {
if (state.scene1.campShown) return;
state.scene1.campShown = true;
prepareCampCollisionMeshes();
setGlobalWindVolume(0.4);
state.barrackDoorPhase = 'closed';
setArtworkShown(getBarrackOpen(), false);
setArtworkShown(getBarrackClosedWindows(), false);
const fadeMs = scene1().campFadeMs;
fadeArtwork(getBarrackClosed(), 0, 1, fadeMs);
fadeArtwork(getAsset('towerAll'), 0, 1, fadeMs);
fenceCenterKeys().forEach(function (key) {
setArtworkShown(getAsset(key), true);
disablePlacementHelpers(getAsset(key));
});
if (scene1().fencePopEnabled) {
fenceSideKeys().forEach(function (key) {
if (!state.scene1.fenceSideShown[key]) setArtworkShown(getAsset(key), false);
});
} else {
fenceSideKeys().forEach(function (key) {
fadeArtwork(getAsset(key), 0, 1, fadeMs);
state.scene1.fenceSideShown[key] = true;
});
}
console.log(
'[BM scene1] t=26s camp fades in (barracks + towers; center fences already up;',
scene1().fencePopEnabled ? 'side fences on proximity)' : 'all fences)'
);
}
function startScene1() {
if (state.scene1.started) return;
state.scene1.started = true;
state.scene1.startedAt = performance.now();
startScene1Audio();
window.setTimeout(fadeOutMonumentBody, scene1().monumentBodyFadeAtMs);
window.setTimeout(fadeOutCalligraphy, scene1().calligraphyFadeAtMs);
window.setTimeout(fadeInCamp, scene1().campAtMs);
window.setTimeout(fadeInSkyBarrier, scene1().skyBarrierAtMs);
window.setTimeout(openBarrackWindowsForScene1, scene1().windowsAtMs);
window.setTimeout(openBarrackDoorsForScene1, scene1().doorsAtMs);
}
function setupScene1() {
hideCampForScene1();
silenceGongForever();
if (typeof nac.setOnFirstInteraction === 'function') {
nac.setOnFirstInteraction(startScene1);
}
window.setTimeout(startScene1, scene1().autoStartMs);
}
function scene2() {
return CONFIG.scene2;
}
function gardenAssetKeys() {
return ['shojiGardenOpen', 'shojiGardenClosed', 'gardenWallTrees', 'gardenExtras'];
}
function getGardenDeckBox(artwork) {
if (!artwork || !artwork.object3D) return null;
artwork.object3D.updateWorldMatrix(true, true);
const box = new THREE.Box3();
let found = false;
artwork.object3D.traverse(function (child) {
if (!child.isMesh) return;
const name = String(child.name || '').toLowerCase();
if (/placementcube|giantplacement/.test(name)) return;
if (!/(^deck|tatami|step\d|step[0-9])/.test(name) && name.indexOf('deck') === -1 && name.indexOf('tatami') === -1 && name.indexOf('step') === -1) {
return;
}
child.updateWorldMatrix(true, false);
const b = new THREE.Box3().setFromObject(child);
if (!b.isEmpty()) {
box.union(b);
found = true;
}
});
return found ? box : null;
}
function syncGardenFloorsFromMesh() {
const sc = scene2().shoji;
sc.floorInside = 14;
sc.floorDefault = 10;
sc.floorStep1 = 11;
sc.floorStep2 = 12;
sc.floorStep3 = 13;
if (!scene2().teleport) scene2().teleport = {};
scene2().teleport.y = 14;
console.warn('[BM scene2] floors FIXED floorInside=14 floorDefault=10');
}
function applyGardenWorldYAlign(enabled) {
const align = scene2().gardenYAlign != null ? scene2().gardenYAlign : 10;
const dy = enabled ? align : 0;
const keys = gardenAssetKeys().concat(['leaveGardenTrigger']);
for (let i = 0; i < keys.length; i++) {
const art = getAsset(keys[i]);
if (!art) continue;
if (art._bmGardenBasePosY == null) {
art._bmGardenBasePosY = art.positionY != null ? Number(art.positionY) : 0;
}
art.positionY = art._bmGardenBasePosY + dy;
if (!art.object3D) continue;
if (art.object3D.userData._bmGardenBaseY == null) {
art.object3D.userData._bmGardenBaseY = art.object3D.position.y;
}
art.object3D.position.y = art.positionY;
art.object3D.updateMatrixWorld(true);
}
state.scene2.gardenYAligned = !!enabled;
if (enabled) {
const box = getMeshBoxExcludingPlacement(getAsset('shojiGardenOpen'));
console.warn(
'[BM scene2] garden align dy=',
dy,
'shojiMinY=',
box ? box.min.y : null,
'shojiMaxY=',
box ? box.max.y : null,
'shojiMidY=',
box ? (box.min.y + box.max.y) * 0.5 : null,
'artPosY=',
getAsset('shojiGardenOpen') && getAsset('shojiGardenOpen').positionY
);
}
}
function hideGardenUntilScene2() {
applyGardenWorldYAlign(false);
gardenAssetKeys().forEach(function (key) {
setArtworkShown(getAsset(key), false);
});
setArtworkShown(getAsset('leaveGardenTrigger'), false);
disablePlacementHelpers(getAsset('leaveGardenTrigger'));
disablePlacementHelpers(getAsset('scene2Trigger'));
state.scene2.active = false;
state.scene2.shojiSealed = false;
state.scene2.wasInTemple = false;
}
function setCampGroundShown(shown) {
setArtworkShown(getAsset('groundImage'), shown);
}
function hideCampForGarden() {
if (scene2().hideCampBarracks !== false) {
setArtworkShown(getBarrackOpen(), false);
setArtworkShown(getBarrackClosed(), false);
setArtworkShown(getBarrackClosedWindows(), false);
setArtworkShown(getAsset('barrackGhosts'), false);
}
if (scene2().hideSkyPosters !== false) {
setArtworkShown(getAsset('skyBarrier'), false);
state.scene1.skyBarrierShown = false;
}
if (scene2().hideOldGround !== false) {
setCampGroundShown(false);
}
}
function forceShowCampArtwork(artwork) {
if (!artwork) return;
try {
nac.setArtworkOpacity(artwork, 1);
} catch (e) {}
if (!artwork.object3D) return;
artwork.object3D.visible = true;
artwork.object3D.traverse(function (child) {
const name = String(child.name || '');
if (/placementcube|giantplacement/i.test(name)) {
child.visible = false;
return;
}
child.visible = true;
if (!child.isMesh || !child.material) return;
const mats = Array.isArray(child.material) ? child.material : [child.material];
for (let i = 0; i < mats.length; i++) {
const m = mats[i];
if (!m) continue;
if (m.opacity != null && m.opacity < 1) m.opacity = 1;
m.needsUpdate = true;
}
});
}
function restoreCampFromGarden() {
applyGardenWorldYAlign(false);
gardenAssetKeys().forEach(function (key) {
setArtworkShown(getAsset(key), false);
});
setArtworkShown(getAsset('leaveGardenTrigger'), false);
disablePlacementHelpers(getAsset('leaveGardenTrigger'));
state.scene2.active = false;
state.scene2.shojiSealed = false;
state.scene2.wasInTemple = false;
state.scene2.leftGarden = true;
if (scene2().hideCampBarracks !== false) {
setArtworkShown(getBarrackOpen(), false);
setArtworkShown(getBarrackClosed(), false);
setArtworkShown(getBarrackClosedWindows(), false);
setArtworkShown(getAsset('barrackGhosts'), false);
}
forceShowCampArtwork(getAsset('tower'));
forceShowCampArtwork(getAsset('towerAll'));
allFenceKeys().forEach(function (key) {
if (fenceCenterKeys().indexOf(key) !== -1 || state.scene1.fenceSideShown[key]) {
forceShowCampArtwork(getAsset(key));
}
});
setArtworkShown(getAsset('monument'), false);
forceShowCampArtwork(getAsset('groundColor'));
if (scene2().hideOldGround !== false) {
setCampGroundShown(true);
forceShowCampArtwork(getAsset('groundImage'));
}
setArtworkShown(getAsset('skyBarrier'), false);
state.scene1.skyBarrierShown = false;
}
function sealGardenShoji() {
if (state.scene2.shojiSealed) return;
state.scene2.shojiSealed = true;
setArtworkShown(getAsset('shojiGardenOpen'), false);
setArtworkShown(getAsset('shojiGardenClosed'), true);
disablePlacementHelpers(getAsset('shojiGardenOpen'));
disablePlacementHelpers(getAsset('shojiGardenClosed'));
setPlayerFloor(shojiCfg().floorDefault);
}
function checkGardenShojiSeal(pos, box) {
if (!scene2().sealShojiAfterStairs) return;
if (!state.scene2.active || state.scene2.shojiSealed) return;
if (!pos || !box) return;
const inside = isInsideBoxXZ(pos, box, 0);
const t = getStairProgress(pos, box);
if (inside || t > 0.2) {
state.scene2.wasInTemple = true;
}
if (state.scene2.wasInTemple && !inside && t <= 0) {
sealGardenShoji();
}
}
function forceShowGardenArtwork(artwork) {
if (!artwork) return;
try {
nac.setArtworkOpacity(artwork, 1);
} catch (e) {}
if (!artwork.object3D) return;
artwork.object3D.visible = true;
artwork.object3D.traverse(function (child) {
child.visible = true;
if (!child.isMesh || !child.material) return;
const mats = Array.isArray(child.material) ? child.material : [child.material];
for (let i = 0; i < mats.length; i++) {
const m = mats[i];
if (!m) continue;
if (m.opacity != null && m.opacity < 1) m.opacity = 1;
m.needsUpdate = true;
}
});
}
function showJapaneseGarden() {
applyGardenWorldYAlign(true);
syncGardenFloorsFromMesh();
forceShowGardenArtwork(getAsset('shojiGardenOpen'));
forceShowGardenArtwork(getAsset('gardenWallTrees'));
forceShowGardenArtwork(getAsset('gardenExtras'));
prepareGardenColliders();
setArtworkShown(getAsset('shojiGardenClosed'), false);
hideLeaveGardenTriggerVisual();
['shojiGardenOpen', 'shojiGardenClosed', 'gardenWallTrees', 'gardenExtras', 'leaveGardenTrigger'].forEach(
function (key) {
disablePlacementHelpers(getAsset(key));
}
);
hideCampForGarden();
armLeaveGardenTrigger();
state.scene2.active = true;
state.scene2.shojiSealed = false;
state.scene2.wasInTemple = true;
state.scene2.leftGarden = false;
const open = getAsset('shojiGardenOpen');
const box = getMeshBoxExcludingPlacement(open);
}
function hideScene2TriggerVisual() {
if (!scene2().hideTriggerCubes) return;
const t = getAsset('scene2Trigger');
if (!t) return;
try {
nac.setArtworkOpacity(t, 0);
} catch (e) {}
if (t.object3D) {
t.object3D.visible = false;
t.object3D.traverse(function (child) {
if (child.isMesh) child.visible = false;
});
}
disablePlacementHelpers(t);
}
function getScene2TriggerBox() {
return getMeshBox(getAsset('scene2Trigger'));
}
function getGardenEntryCubes() {
return listTriggerCubes(getAsset('gardenEntryTriggers'), 'garden');
}
function isInScene2TriggerZone(pos) {
if (!pos) return false;
const hit = nearestTriggerCube(pos, getGardenEntryCubes(), scene2().triggerRadius);
return !!hit;
}
function gardenTeleportDestination() {
const cfg = scene2().teleport || {};
const sc = scene2().shoji || {};
const gardenY =
cfg.y != null ? cfg.y : sc.floorInside != null ? sc.floorInside : 4;
const shoji = getAsset('shojiGardenOpen');
const box = getMeshBoxExcludingPlacement(shoji);
const walls = getMeshBoxExcludingPlacement(getAsset('gardenWallTrees'));
const useBox = box || walls;
const dest = { x: 0, y: gardenY, z: 0 };
if (useBox) {
const cx = (useBox.min.x + useBox.max.x) * 0.5;
const cz = (useBox.min.z + useBox.max.z) * 0.5;
if (scene2().teleportInFrontOfOpenShoji && box) {
const offset =
scene2().shojiApproachOffset != null ? scene2().shojiApproachOffset : 3.5;
dest.x = cfg.x != null ? cfg.x : cx;
dest.z = cfg.z != null ? cfg.z : box.min.z - offset;
dest.y = cfg.y != null ? cfg.y : Math.max(box.min.y + 1.0, 1);
} else {
dest.x = cfg.x != null ? cfg.x : cx;
dest.z = cfg.z != null ? cfg.z : cz;
dest.y = gardenY;
}
} else {
dest.x = cfg.x != null ? cfg.x : 0;
dest.z = cfg.z != null ? cfg.z : 0;
}
return dest;
}
function teleportPlayerTo(x, y, z) {
const mover = getMover();
if (!mover) return;
mover.position.x = x;
mover.position.y = y;
mover.position.z = z;
setPlayerFloor(y);
state.prevX = x;
state.prevZ = z;
state.groundY = y;
}
function enterJapaneseGarden() {
if (state.scene2.teleported || state.cameraAnimating) return;
if (state.scene2.leftGarden) return;
state.scene2.teleported = true;
state.scene2.mustLeaveTrigger = true;
showJapaneseGarden();
const dest = gardenTeleportDestination();
teleportPlayerTo(dest.x, dest.y, dest.z);
state.scene2.holdDeckUntil = performance.now() + 4000;
console.warn('[BM scene2] teleported to garden x=', dest.x, 'y=', dest.y, 'z=', dest.z);
;[0, 500, 1500, 3000].forEach(function (ms) {
setTimeout(function () {
const p = getPlayerWorld();
const m = getMover();
console.warn(
'[BM scene2] Y@' + ms + 'ms player=',
p ? p.y : null,
'mover=',
m ? m.position.y : null,
'floorCfg=',
shojiCfg().floorInside
);
}, ms);
});
}
function leaveTeleportDestination() {
const d = scene2().leaveTeleport || {};
return {
x: d.x != null ? d.x : -316,
y: d.y != null ? d.y : 10,
z: d.z != null ? d.z : -663,
};
}
function getLeaveGardenTriggerBox() {
return getMeshBox(getAsset('leaveGardenTrigger'));
}
function isInLeaveGardenZone(pos) {
if (!pos) return false;
const box = getLeaveGardenTriggerBox();
if (box && isInsideBoxXZ(pos, box, 1.5)) return true;
const art = getAsset('leaveGardenTrigger');
const c = artworkWorldPos(art);
if (!c) return false;
const r = scene2().leaveTriggerRadius != null ? scene2().leaveTriggerRadius : 8;
const dx = pos.x - c.x;
const dz = pos.z - c.z;
return Math.sqrt(dx * dx + dz * dz) <= r;
}
function leaveJapaneseGarden() {
if (!scene2().leaveGardenEnabled) return;
if (!state.scene2.active || state.scene2.leftGarden) return;
if (state.cameraAnimating) return;
state.scene2.mustLeaveLeaveTrigger = true;
restoreCampFromGarden();
const dest = leaveTeleportDestination();
teleportPlayerTo(dest.x, dest.y, dest.z);
}
function checkLeaveGardenTrigger() {
if (!CONFIG.scene2.enabled) return;
if (!scene2().leaveGardenEnabled) return;
if (!state.scene2.active || state.scene2.leftGarden) return;
if (state.cameraAnimating) return;
const pos = getPlayerWorld();
if (!pos || !getAsset('leaveGardenTrigger')) return;
const inZone = isInLeaveGardenZone(pos);
if (state.scene2.mustLeaveLeaveTrigger) {
if (!inZone) state.scene2.mustLeaveLeaveTrigger = false;
return;
}
if (inZone) leaveJapaneseGarden();
}
function hideLeaveGardenTriggerVisual() {
const leave = getAsset('leaveGardenTrigger');
if (!leave) return;
try {
nac.setArtworkOpacity(leave, 0);
} catch (e) {}
if (!leave.object3D) return;
leave.object3D.visible = false;
leave.object3D.traverse(function (child) {
child.visible = false;
});
disablePlacementHelpers(leave);
}
function armLeaveGardenTrigger() {
if (!scene2().leaveGardenEnabled) return;
if (state.scene2.leaveTriggerWired) return;
const leave = getAsset('leaveGardenTrigger');
if (!leave) {
console.warn('[BM scene2] leaveGardenTrigger cube not found');
return;
}
state.scene2.leaveTriggerWired = true;
const r = scene2().leaveTriggerRadius != null ? scene2().leaveTriggerRadius : 8;
if (typeof nac.onUserAvatarEntersArtworkRadius === 'function') {
nac.onUserAvatarEntersArtworkRadius(leave, r, function () {
leaveJapaneseGarden();
});
}
}
function checkScene2Trigger() {
if (!CONFIG.scene2.enabled) return;
if (state.scene2.teleported) return;
if (state.cameraAnimating) return;
const pos = getPlayerWorld();
if (!pos || !getAsset('scene2Trigger')) return;
const inZone = isInScene2TriggerZone(pos);
if (state.scene2.mustLeaveTrigger) {
if (!inZone) state.scene2.mustLeaveTrigger = false;
return;
}
if (inZone) enterJapaneseGarden();
}
function setupScene2() {
if (!CONFIG.scene2.enabled) return;
hideGardenUntilScene2();
hideScene2TriggerVisual();
hideMultiTriggerVisual(getAsset('gardenEntryTriggers'));
disablePlacementHelpers(getAsset('gardenEntryTriggers'));
const multi = getAsset('gardenEntryTriggers');
if (!multi) {
console.warn('[BM scene2] gardenEntryTriggers GLB not found');
return;
}
if (state.scene2.triggerWired) return;
state.scene2.triggerWired = true;
if (typeof nac.onUserAvatarEntersArtworkRadius === 'function') {
nac.onUserAvatarEntersArtworkRadius(multi, 200, function () {
const pos = getPlayerWorld();
if (isInScene2TriggerZone(pos)) enterJapaneseGarden();
});
}
}
function clearFogAndExtendCamera() {
const far = 5000;
try {
if (typeof nac.disableFog === 'function') nac.disableFog();
} catch (e) {}
if (window.scene) window.scene.fog = null;
try {
if (typeof nac.setCameraFar === 'function') nac.setCameraFar(far);
} catch (e) {}
const cam = window.camera;
if (cam) {
cam.far = far;
if (typeof cam.updateProjectionMatrix === 'function') cam.updateProjectionMatrix();
}
}
function setupEntryCubeTestMode() {
if (!CONFIG.entryCubeTestMode) return;
CONFIG.scene1.enabled = false;
CONFIG.sealBarrackOnEnter = false;
CONFIG.oneWay = false;
setArtworkShown(getBarrackOpen(), false);
setArtworkShown(getBarrackClosed(), false);
setArtworkShown(getBarrackClosedWindows(), false);
setArtworkShown(getAsset('towerAll'), false);
setArtworkShown(getAsset('tower'), false);
setArtworkShown(getAsset('skyBarrier'), false);
setArtworkShown(getShoji(), false);
allFenceKeys().forEach(function (key) {
setArtworkShown(getAsset(key), false);
});
applyEntryTriggerVariant();
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
if (CONFIG.entryCubeTestMode) {
setupEntryCubeTestMode();
} else if (CONFIG.scene1.enabled) {
setupScene1();
} else {
applyBarrackDoorVisuals();
scheduleBarrackOpen();
}
setupProximityEntry();
setupScene2();
};
space.onFrame = () => {
if (!state.fogCleared || (window.scene && window.scene.fog)) {
clearFogAndExtendCamera();
if (!window.scene || !window.scene.fog) state.fogCleared = true;
}
if (!state.proximityWired) setupProximityEntry();
hideTriggerCubeVisual();
hideScene2TriggerVisual();
if (CONFIG.entryCubeTestMode) {
setArtworkShown(getBarrackOpen(), false);
setArtworkShown(getBarrackClosed(), false);
setArtworkShown(getBarrackClosedWindows(), false);
}
if (CONFIG.scene2.enabled && !state.scene2.active) {
hideGardenUntilScene2();
}
enforceScene1AudioLocks();
if (CONFIG.scene1.enabled && !state.scene1.facesPrepared) {
const mon = getAsset('monument');
if (mon && mon.object3D) {
prepareMonumentFaces(mon.object3D);
state.scene1.facesPrepared = true;
}
}
checkProximityEntry();
checkScene2Trigger();
checkLeaveGardenTrigger();
updateGhostProximityReveal();
updateFootstepsAudio();
ensureGlobalWindAudio();
if (state.scene1.campShown) prepareCampCollisionMeshes();
updateNorthFencePop();
applyShojiSteps();
clampElevatedBesideStairs();
enforceWallCollisions();
blockJump();
};
