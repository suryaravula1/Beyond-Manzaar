# Beyond Manzanar — Production reference

Lives at the **repo root** (not inside an export folder) so it survives new world downloads.

**Current export folder:** `beyond-manzanar-2026-10-16-C5o4kLrD/` ← update this line when you switch exports  
**Space:** Beyond Manzanar Production (NAC)  
**Script (edit):** `beyond-manzanar-2026-10-16-C5o4kLrD/custom-script.js`  
**Script (paste into NAC):** `beyond-manzanar-2026-10-16-C5o4kLrD/custom-script.nac-paste.js`  
**Local preview:** `http://localhost:8769/show/beyond-manzanar-production/`  
(serve from the **current export** folder: `python3 -m http.server 8769`)

Last updated: 2026-10-16 — **Scene 1 + Scene 2 confirmed working in NAC Production** (nac-paste ~58KB escaped; NAC audio via artwork elements/CDN).

---

## Handoff / where we left off (2026-10-01)

**Status:** Scene 1 + barrack entry + barrack-back shoji doorway **working in NAC Production**. Cursor closed; waiting on Tyler.

### Confirmed working
| Item | Detail |
|------|--------|
| Barrack entry | **487168** (V1: 64 indiv meshes + giant placement). V2 also worked; we standardized on V1. |
| Barrack-back shoji | Baked into open/windows GLBs as `_barr_shoji_room_isolated.*`. Keep **`front-open2`** (shield wall with rectangle). On door open, hide **`fusuma`** only + clear collision. |
| Fences | Centers from start; sides pop @ `fencePopRadius: 420` |
| NAC paste | Saves OK with trimmed `custom-script.nac-paste.js` (~63KB escaped). Full script stays in `custom-script.js` for local. Scene 2 stubbed in paste while `enabled: false`. |

### Waiting / next (as of 2026-10-16 export C5o4kLrD)
**Received in Production:** garden temple/walls/extras/leave cube + garden_indiv **487169** (64 cubes). Scene 2 **enabled locally**.

**Still to do:**
1. Local-test Scene 2 (shoji room → garden teleport, stair seal, leave cube).
2. Regenerate nac-paste under ~64KB and paste to NAC.
3. Re-place `tower_all` if needed (only single `tower` **489617** is placed).

### Do not regress
- Do **not** hide `front-open2` (that removes the VRML-like shield).
- Do **not** use fused entry/garden cubes (488575 / old 487169 style).
- Monument flaps stay **DoubleSide** both.

## New in export `2026-10-14-iryXc1pj` (to wire into Scene)

### Placed in Production space (have IDs)

| ID | File | Role / next step |
|----|------|------------------|
| **489606** | `barrack_ghosts.glb` | Shown when player enters + doors **seal**; barrack wall photo panels hide at the same time |
| **488720** | `footsteps-8m.mp3` | Footstep SFX — play on walk / near barracks (not wired yet) |
| **488721** | `door2-8m.mp3` | Door SFX — play when barrack doors open (not wired yet) |
| **488722** | `songbird-8m.mp3` | Ambient bird — garden / outdoor bed (not wired yet) |
| **487169** | `triggerCubeBarrack_to_Garden_indiv.glb` | **Upgraded** (was fused) — same ID, now indiv meshes like 487168. Ready to wire Scene 2 enter. |

### In zip / Test Realm only (not in Production space yet)

| File | Notes |
|------|--------|
| `shojiTemplate-open.glb` / `shojiTemplate-closed.glb` | Garden temple — place in Production for Scene 2 |
| `japanGardenWall-tree-Colliders.glb` | Garden walls/trees |
| `japanGardenExtras.glb` | Garden props |
| `leaveGarden-trigger-CubeOnly.glb` | Leave-garden cube |
| `tower_all.glb` / `tower.glb` | Were in prior Production; **not placed** in this Production space HTML (files still in `artworks/`) |

### Still confirmed from prior work

| ID | File |
|----|------|
| 487168 | barrack entry indiv |
| 485340 / 485345 / 485612 | barrack open / closed / windows |
| fences, monument, audio wind/radio/azan/gong | unchanged IDs |

---

## Quick status

| Area | Status |
|------|--------|
| Scene 1 (monument → camp → windows → doors) | **Working** |
| Barrack entry (64 door cubes) | **Confirmed on ID 487168** |
| Barrack-back shoji (shield + doorway) | **Confirmed in NAC** — keep shield (`front-open2`); hide doorway fill (`fusuma`) on door open |
| Fences (centers always / sides proximity) | **Working** (`fencePopRadius: 420`) |
| Scene 2 (Japanese garden) | **Off** — garden trigger now **indiv (487169)**; garden GLBs still Test Realm only |
| Barrack ghosts + new SFX | **Ghosts on seal** (489606); wall photos hide. footsteps/door2/songbird not wired yet |
| NAC Script Editor paste | Use `custom-script.nac-paste.js` (~64KB limit) |

---

## Files to edit / paste

Paths below are relative to the **current export** folder (see top of this file).

| Role | Path |
|------|------|
| Source of truth (comments OK) | `<export>/custom-script.js` |
| Paste into NAC Script Editor | `<export>/custom-script.nac-paste.js` (comments stripped) |
| HTML loads local script | `<export>/show/beyond-manzanar-production/index.html` → `fetch('../../custom-script.js')` |

After changing `custom-script.js`, regenerate nac-paste (strip `//` and `/* */` comments + blank lines) before pasting to NAC if the full file exceeds the save limit.

When you download a **new** export: copy `custom-script.js` into it, remount the HTML loader if needed, update the **Current export folder** line above, and keep this `PRODUCTION.md` at repo root.
---

## Scene 1 timeline

Master clock starts on first interaction (or `autoStartMs: 8000`).

| Time | What happens |
|------|----------------|
| **0s** | Monument stone starts fading (5s). **Center fences** already visible. Wind loops. Documents + azan play once (~26s). |
| **0–5s** | Outer monument body gone; **front01 + back01** calligraphy remain (`DoubleSide`). |
| **25s** | Calligraphy fades out (~1s). |
| **26s** | Camp fades in (6s): closed barracks + Tower All. Side fences still hidden. |
| **40s** | Sky banners fade in (9s). Barracks → **windows open** (**instant pop**, not fade). |
| **49s** | Barracks → **doors open** (**instant pop**). Entry cubes armed (invisible). Small shoji: **shield stays**; doorway fill (`fusuma`) hides so you can walk through the rectangle (VRML-like). |
| After enter | Barrack **seals** (open mesh + closed shell); one-way entry. Shoji shield + open doorway stay. **`barrack_ghosts` appear**; historic **wall photos hide**. |

### Barrack visual stages (3 GLBs)

| Phase | Meaning | Artwork ID | File |
|-------|---------|------------|------|
| `closed` | Doors closed, windows closed | **485345** | `_barrack_block_closed` |
| `windowsOpen` | Doors closed, windows open | **485612** | `_barrack_block_closed_windows` |
| `open` | Doors open, windows open | **485340** | `_barrack_block__opened` |
| `sealed` | After player enters | open + closed shown | — |

Windows / doors stage changes are an **instant pop** (no fade).

Tune times in `CONFIG.scene1`: `campAtMs`, `windowsAtMs`, `doorsAtMs`, fade durations.

### Small shoji at barrack back (doorway) — confirmed in NAC

Tyler baked `_barr_shoji_room_isolated.*` washitsu **into** the barrack GLBs (windows + open) — not a separate artwork ID.

**Reference (VRML):** dark barrack **shield** wall with a **rectangular cutout** into the shoji (tatami + screens + garden photo).

| Part | Material / mesh | Behavior |
|------|-----------------|----------|
| **Shield** (barrack back wall with rectangle) | `front-open2` | **Always visible** — do not hide |
| **Doorway fill** | `fusuma` | Hidden + collision cleared on `open` / `sealed` |
| Interior | `shouji1x`, `tatami` | Always stay |
| **Garden photo** (back of washitsu) | `adams_garden_photo_240h` | Always force-visible (DoubleSide). If still missing in NAC → Tyler / texture issue |

**Code:** `applyBarrackShojiRoomOpenings()` from `applyBarrackDoorVisuals()` — only matches `/fusuma/i`, never `front-open2`.

**Lesson:** Named materials made this easy. Do **not** hide the whole shield (that removed the VRML look). Fused unnamed meshes (old entry cubes) need a Tyler re-export instead.

---

## Barrack entry cubes

### Confirmed active

| ID | File | Notes |
|----|------|--------|
| **487168** | `triggerCubeBarrackEntry_indiv.glb` | **64 individual door meshes** + giant placement cube (script ignores giant) |

### Hard-hidden (do not use)

| ID | File | Why |
|----|------|-----|
| **488576** | `triggerCubeBarrackEntry-ooQF2mzY.glb` | 64 indiv, no giant — tested; not the chosen set |
| **488575** | `triggerCubeBarrackEntry-cG48Ztuo.glb` | Old **4 fused quadrants** — breaks opposite-face entry |
| **485344** / **485370** | legacy `triggerCube.glb` | Single test cubes |

### Config knobs

```js
CONFIG.entryTriggerVariant = 'withGiant'; // → 487168
CONFIG.hideTriggerCube = true;           // invisible but proximity works
CONFIG.oneWay = true;
CONFIG.sealBarrackOnEnter = true;
CONFIG.triggerRadius = 7;
CONFIG.cameraTweenMs = 1200;
CONFIG.entryCubeTestMode = false;        // true = skip Scene 1, cubes only (debug)
```

Variants: `'withGiant'` (487168) | `'noGiant'` (488576) | `'fused'` (488575).

### How entry works

1. Player walks into a small door cube (proximity / AABB).
2. Script picks **exit side opposite approach**.
3. Short tween past that face into the barrack (`insideOvershoot`).
4. Doors seal; can’t re-trigger while `oneWay`.

### Tyler / Blender lesson (important)

- **Wanted:** 64 separate meshes in one GLB / one artwork ID.  
- **Bad export:** 16 cubes fused into 1 mesh × 4 corner instances → script saw **4 huge boxes** → wrong teleports.  
- **Good export (487168):** **64 separate mesh nodes**. Giant placement cube OK (script strips it).

Ask Tyler for **garden** triggers the same way as **487168**.

---

## Fences

Full ring: N/S/E/W × center + left + right.

| Piece | Behavior |
|-------|----------|
| **Center** (N/S/E/W) | Visible **from Scene 1 start** (with monument). Always collide. |
| **Left / right** (all 4 sides) | Hidden until player is within `fencePopRadius` of that **fence mesh**. Then fade in and **stay on**. Collide only after pop. |

```js
CONFIG.scene1.fencePopEnabled = true;
CONFIG.scene1.fencePopRadius = 420; // tuned ~last barrack row toward fence
```

**Note:** NAC artwork `position` is often `(0,0,0)`; real offset is inside the GLB. Proximity uses mesh AABB (excluding `placementCubeLarge`).

**Shading:** Side fences must fade in via `fadeArtwork` / artwork opacity — do **not** force `material.transparent = false` (that caused gray fill on wire/alpha fences).

### Fence IDs

| Key | ID |
|-----|-----|
| northCenter / Left / Right | 485358 / 485359 / 485360 |
| southCenter / Left / Right | 487172 / 487171 / 487170 |
| eastCenter / Left / Right | 487178 / 487177 / 487176 |
| westCenter / Left / Right | 487179 / 487180 / 487181 |

---

## Monument

| Part | Nodes / materials | Behavior |
|------|-------------------|----------|
| Body (stone) | `Box01–03`, `Cone01–02`, mat `mon_mat1` | Fades 0–5s |
| Calligraphy | `front01`, `back01`; mats `ireito-128`, `1943y8m-128` | Stay after body; `DoubleSide`; fade ~25s |

ID **485342** (`monument-6i7Orpyc`).  
Experiments to glue/hide one flap were reverted — keep both flaps, original placement.

---

## Audio (Scene 1)

| Key | File / artwork | Behavior |
|-----|----------------|----------|
| wind | `wind2a11…` / 485353 | Loops whole scene |
| radio | `documentsRecentlyDiscovered…` / 485351 | Once ~26s |
| azan | `azan2…` / 485354 | Once ~26s |
| gong | `kane1…` / 485352 | **Not** used in Scene 1 (`playGong: false`) |

Local preview loads from `./artworks/` when artworks aren’t audio objects in the export.

---

## Asset ID cheat sheet (Production)

| Purpose | ID |
|---------|-----|
| Barrack open | 485340 |
| Barrack closed | 485345 |
| Barrack closed + windows open | 485612 |
| Monument | 485342 |
| Entry triggers (**active**) | **487168** |
| Entry unused | 488576, 488575 |
| Garden triggers (**indiv** now) | **487169** |
| Barrack ghosts | **489606** |
| Footsteps / door2 / songbird | **488720** / **488721** / **488722** |
| Ground image / color | 485350 / 485348 |
| Sky barrier | 485346 |
| Tower all / tower | 485356 / 485357 |

---

## Scene 2 (not active yet)

`CONFIG.scene2.enabled = false`.

When ready:

1. Tyler re-exports **garden** cubes like **487168** (64 separate meshes).  
2. Place garden GLBs in Production (`shojiGardenOpen/Closed`, walls, extras, `leaveGarden`).  
3. Set `scene2.enabled = true` and fill `ASSET_IDS` for garden / leave.  
4. Test enter/leave teleports (`teleport`, `leaveTeleport` in CONFIG).

---

## Debug / test flags

| Flag | Use |
|------|-----|
| `entryCubeTestMode: true` | Skip Scene 1; hide barracks; no seal; walk all entry cubes |
| `hideTriggerCube: false` | See door cubes while placing |
| `debugEntry: true` | Log cube name / exit side / dest |
| `logArtworkInventory: true` | Dump all artworks + resolution on load |
| `fencePopRadius` | Side fence pop distance |

---

## NAC paste limit + API (Don Hanson, 2026-10-22)

**Script size limit is now 128KB** (was ~64KB). Confirmed by Don after Rhonda asked.

Yellow advisory in the editor (“don’t load external resources…”) is always shown — it is **not** the save error.

- Edit full `custom-script.js` in Cursor (local preview uses this).  
- Paste **`custom-script.nac-paste.js`** into NAC when needed; under 128KB should save.  
- In the editor: **Select All → Delete → Paste → Save**.

### New / confirmed NAC APIs (Don)

**Flat lighting** (kill HDRI / env map):
```js
space.beforeInit = (nac) => {
  nac.disableEnvironmentMap()
  nac.setAmbientLight(0xffffff, 1) // color, intensity
}
// Can call setAmbientLight again in afterInit or later
```

**Camera FOV / clip** (default FOV = 75° vertical):
```js
space.beforeInit = (nac) => {
  nac.setCameraFov(50)
  // nac.setCameraNear(n)
  // nac.setCameraFar(n)
}
```

---

## Open / ask Tyler

1. **Garden triggers** — same as entry **487168** (64 individual meshes, one GLB). Optional: with/without giant placement.  
2. Garden / leaveGarden / shoji temple assets placed in Production.  
3. Optional: delete unused entry GLBs **488575** / **488576** from the space once everyone agrees.  
4. Towers billboard placement (low priority).  
5. Audio: global vs spatial in NAC if needed.

---

## Related docs

- Repo backlog: `BRANCH-BACKLOG.md` (same folder as this file)  
- Test Realm prior work: `beyond-manzanar-2026-09-17-FC5RTRJi/` (Scene 1+2 prototype)
