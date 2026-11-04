# Beyond Manzanar — Handover for Christopher

**From:** Surya  
**Date:** November 2026  
**Space:** Beyond Manzanar Production (NAC)  
**Published:** https://newart.city/show/beyond-manzanar-production  
**Password:** manzanar2026

---

## Where things stand

| Area | Status |
|------|--------|
| Scene 1 (monument → camp → windows → doors → barrack enter/seal) | **Working in NAC** |
| Barrack ghosts + wall photos hide on seal | **Working** |
| Audio (wind, footsteps, door2, documents, azan) | **Working** (NAC artwork media / CDN) |
| Scene 2 (small shoji → Japanese garden → leave) | **Working in NAC** |
| Garden height in NAC | **Open issue** — enter/ground Y still needs tuning |
| Migration corridor | **Next** — planned in Test Realm (not finished) |
| Flat lighting + FOV | **APIs available** from Don (not fully wired yet) |

---

## Current export / files

**Export folder:** `beyond-manzanar-2026-10-16-C5o4kLrD/`

| Role | Path |
|------|------|
| Source of truth (edit this) | `beyond-manzanar-2026-10-16-C5o4kLrD/custom-script.js` |
| NAC Script Editor paste | `beyond-manzanar-2026-10-16-C5o4kLrD/custom-script.nac-paste.js` |
| Production reference (survives new downloads) | `PRODUCTION.md` (repo root) |
| Branch backlog | `BRANCH-BACKLOG.md` |

**Local preview:** from the export folder run `python3 -m http.server 8769`, then open  
`http://localhost:8769/show/beyond-manzanar-production/`

NAC HTML loader fetches `../../custom-script.js` for local; Production uses the pasted Script Editor code.

---

## NAC script size (important)

- Old limit ~**64KB** → we had to paste a **compressed** `custom-script.nac-paste.js`.
- Don Hanson (2026-10-22): limit is now **128KB**.
- Prefer pasting the **normal readable** script (or comment-stripped full script) going forward — easier for Christopher to maintain.
- Paste flow: Script Editor → Select All → Delete → Paste → Save.

---

## Don Hanson API updates (2026-10-22)

### Flat lighting (match VRML-style)
```js
space.beforeInit = (nac) => {
  nac.disableEnvironmentMap()
  nac.setAmbientLight(0xffffff, 1) // color, intensity
}
```
Can call `setAmbientLight` again later / in `afterInit`.

### Camera FOV / clip
- Default FOV = **75°** vertical  
- `nac.setCameraFov(50)`  
- `nac.setCameraNear(n)` / `nac.setCameraFar(n)`

See also: `PRODUCTION.md` § “NAC paste limit + API”.

---

## Scene 1 — do not regress

- Barrack entry: ID **487168** (`triggerCubeBarrackEntry_indiv`) — 64 cubes.
- Barrack phases: closed → windowsOpen → open → **sealed**.
- On seal: door shut, **ghosts on** (489606), wall photos hide + no collide.
- Photos: materials **FrontSide**; ghosts: **BackSide**.
- Barrack-back shoji: keep shield **`front-open2`**; hide **`fusuma`** only when doorway opens.
- Fences: centers always; sides pop at `fencePopRadius: 420`.
- Monument flaps: **DoubleSide**.

### Key audio IDs
| Key | ID |
|-----|-----|
| footsteps | 488720 |
| doorSfx (door2) | 488721 |
| songbird | 488722 |
| wind | 485353 |
| radio (documents) | 485351 |
| azan | 485354 |

---

## Scene 2 — Japanese garden

### Flow
1. Enter small barrack shoji (washitsu) → hit garden entry cube.  
2. Teleport into open garden shoji; camp barracks/sky/ground hide; ghosts hide.  
3. Stairs down; optional open→closed shoji seal.  
4. Leave via exit cube → camp teleport; **fences/tower/ground restore**; barracks + ghosts + monument **stay hidden**.

### Key IDs
| Key | ID | Notes |
|-----|-----|--------|
| gardenEntryTriggers | **487169** | 64 indiv cubes |
| shojiGardenOpen | 485361 | |
| shojiGardenClosed | 485362 | |
| gardenWallTrees | 485363 | |
| gardenExtras | 485364 | |
| leaveGardenTrigger | **485366** | CubeOnly — **1** exit cube wired |

### Heights (last known NAC tune — still open)
| Setting | Value |
|---------|-------|
| Enter / `floorInside` | **14** |
| Ground / `floorDefault` | **10** |
| `gardenYAlign` | **10** (via `artwork.positionY`) |

**Warning:** Do not auto-derive floors from full shoji AABB / “deckMax” — that put the player at ~**24.6**. Keep fixed Y bands unless re-tuned carefully with console logs (`shojiMinY` / player Y samples).

### Exit
- Wired: `leaveGarden-trigger-CubeOnly` (485366).  
- Also in space but not wired: leaveGarden full (485365).  
- Leave teleport: `{ x: -316, y: 10, z: -663 }`.

---

## Open / next for Christopher

1. **Garden height** — final NAC feel (enter vs stairs vs mesh).  
2. **Wire Don’s lighting + FOV** if matching VRML/Blender look is still needed.  
3. **Migration corridor** — next major beat; start in Test Realm.  
4. Optional: re-place `tower_all` if needed (single `tower` **489617** is placed).  
5. Songbird currently off until garden rules say otherwise (`playSongbird`).

---

## Do not regress (checklist)

- [ ] Don’t hide `front-open2` (barrack shoji shield)  
- [ ] Don’t use fused entry/garden trigger GLBs  
- [ ] Don’t paste over Production without a backup of the working script  
- [ ] Prefer indiv triggers **487168** / **487169**  
- [ ] Leave garden: barracks stay hidden; fences/tower come back  

---

## Contacts / links

- Production: https://newart.city/show/beyond-manzanar-production (PW: manzanar2026)  
- NAC contact who raised limits / APIs: Don Hanson (don@newart.city)  
- Team: Rhonda, Tyler, Ganesh, Christopher  

Good luck — the Production space through leave-garden is the baseline to build on.
