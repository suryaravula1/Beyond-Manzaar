# Branch backlog — Beyond Manzanar

**Remote:** [https://github.com/suryaravula1/Beyond-Manzaar](https://github.com/suryaravula1/Beyond-Manzaar)

## Active: Production (Nov 2026 handover)

| Item | Path |
|------|------|
| **Edit (source)** | `beyond-manzanar-2026-10-16-C5o4kLrD/custom-script.js` |
| **Paste into NAC** | `beyond-manzanar-2026-10-16-C5o4kLrD/custom-script.nac-paste.js` |
| **Local preview** | `http://localhost:8769/show/beyond-manzanar-production/` |
| **Export** | `beyond-manzanar-2026-10-16-C5o4kLrD` |
| **Handover for Christopher** | `CHRISTOPHER-HANDOVER.md` |
| **Production reference** | `PRODUCTION.md` |

### Production script status

- Scene 1 + Scene 2 (enter/leave Japanese garden) **working in NAC Production**
- NAC script limit raised to **128KB** (Don) — paste is readable (comment-stripped), not heavily compressed
- Garden height still needs final tune; migration corridor next (Test Realm)
- Flat lighting + FOV APIs from Don available, not fully wired

See **`CHRISTOPHER-HANDOVER.md`** and **`PRODUCTION.md`** for the full handoff.

---

## Older: Test Realm

Git also tracks `beyond-manzanar-2026-09-17-FC5RTRJi/custom-script.js` (Test Realm Scene 1+2).

Older exports are superseded. Checking out older branches may recreate old script paths.

When you create a new branch, add a row here before you start changing the script.
After you commit, push with: `git push -u origin <branch-name>`

---

## How to use

| Goal | Command |
|------|---------|
| See current branch | `git branch` |
| Use stable code | `git checkout main` |
| Start a new experiment | `git checkout main` then `git checkout -b <new-branch-name>` |
| Save Production script | `git add beyond-manzanar-2026-09-30-1qTXd3oQ/custom-script.js beyond-manzanar-2026-09-30-1qTXd3oQ/custom-script.nac-paste.js` then `git commit` |
| Push feature branch | `git push -u origin <branch-name>` |

---

## Branches

| Branch | Status | Script snapshot | What this code does | Still open on this branch |
|--------|--------|-----------------|---------------------|---------------------------|
| `main` | **Stable** | (after shoji-v3 merge) | Barrack + jump + hidden cube + shoji stairs/walls + stairs-face railing beside door gap. | Multi-door cube ID list. |
| `scene1-desert` | **In progress** | this branch | Scene 1 clock + Scene 2 garden (enter/leave teleport, camp hide/restore, stair seal). Lives in `beyond-manzanar-2026-09-17-FC5RTRJi/custom-script.js`. | Confirm leave cube path + closed-shoji collision in Preview. |
| `barrack-doors` | **In progress** | this branch | Barracks start closed → open after 3s → seal closed after entry; collisions use closed mesh so you can’t walk back out. Includes shoji-height + fog/camera far fixes for tunnel. | Confirm in NAC; more barrack pairs later. |
| `shoji-height` | **In progress** | commit `a400f7f` | Fix shoji stair height in NAC Preview: steps no longer skip when `mode` is `edit-3d`. | Merge after confirm. |
| `audio-monument` | **In progress** | commit `21b17ee` | Play `documentsRecentlyDiscovered` voice; hide monument (`481244`) when it ends. | Rebase onto main after `shoji-height` merges. |
| `shoji-v3` | Merged into `main` | commit `2157775` | Stairs-face railing collision left/right of door gap — blocks elevated walk onto empty land beside stairs. | — |
| `shoji-v2` | Merged into `main` | commit `4831cd1` | Door-passage fix: no walk-through along stairs center aisle. | — |
| `hide-trigger-cube` | Merged into `main` | commit `4b34f2b` | Hid trigger cube (`hideTriggerCube: true` + `object3D.visible = false`). | — |
| `test-realm-shoji-interactions` | Older snapshot | commit `662388f` | Earlier known-good shoji + barrack work (before cube hide). | Kept for history. |

Start every new branch from `main`:

```bash
git checkout main
git checkout -b <new-branch-name>
```

Then update this table.

---

## Test checklist (`main`)

Local preview: [http://localhost:8765/show/beyond-manzanar-space-33/](http://localhost:8765/show/beyond-manzanar-space-33/)  
Hard refresh after script changes: `Cmd+Shift+R`

| Feature | What to try |
|---------|-------------|
| Trigger cube | Should be **invisible**; still pushes you into the barrack |
| Barrack walls | Can’t walk through walls |
| Jump | Disabled |
| Shoji stairs | Enter/exit only via stairs; 2 height steps |
| Shoji beside stairs | From corridor, cannot walk past stairs-face railing onto empty land |
| Shoji interior | Walk straight into mesh after stairs → **blocked** |

---

## Feature checklist (whole test kit)

| Feature | Artwork | Branch that has a working version |
|---------|---------|-----------------------------------|
| Barrack wall collisions | `481241` | `main` |
| Jump disabled | — | `main` |
| Barrack entry (trigger cube) | `481246` | `main` |
| Trigger cube hidden | `481246` | `main` |
| Shoji stairs + walls | `481245` | `main` |
| Shoji doorway mesh fix | `481245` | `main` (via `shoji-v2`) |
| Shoji height in NAC edit-3d Preview | `481245` | `shoji-height` |
| Audio end → hide monument | `481244` | `audio-monument` (in progress) |

---

## Artwork IDs (Test Realm)

| ID | Asset |
|----|--------|
From export `beyond-manzanar-2026-09-10-VzXk5c1G` (published 2026-09-10).

| ID | Asset | Position |
|----|--------|----------|
| 481241 | barrack_block_open | 20, 12.51, -20 |
| 481790 | barrack_block_closed (stacked on open) | 20, 12.51, -20 |
| 481244 | fading_monument | 20, 10, -20 |
| 481245 | shoji | -83.23, 15.14, -7.83 |
| 481246 | triggerCube (barrack entry) | 86.23, 4.31, -126.73 |
| 483435 | skybarriar_All | 0, 254.74, 0 |
| 483437 | skyColor | 0, 1000, 0 |
| 483438 | groundColor | 0, -850, 84.38 |
| 483439 | fullPano | 0, 1000, 0 |
| 483441 | groundImage | 0, 1, 0 |
| 483627 | documentsRecentlyDiscovered (voice) | 20, 10, -20 |
| 483629 | kane1-8m (gong) | 20, 10, -20 |
| 483630 | wind2a11-8m (wind loop) | 33.06, 16.07, -16.95 |
| 483631 | azan2-8m (azan) | 8.96, 11.34, -8.39 |
| 484162 | tower_all | 0, 0, 0 |
| 484163 | tower (individual billboard test) | 446.67, 36.67, -20 |
| 484167 | north_center_fence (always on after camp) | 0, 0, 0 |
| 484168 | north_left_fence (proximity pop) | 0, 0, 0 |
| 484169 | north_right_fence (proximity pop) | 0, 0, 0 |

Fence All is hidden in NAC / not in this export. Local audio fallback: `Audio/*.wav`.

### Scene 1 master clock (keep for later)

Absolute times from first interaction / Scene 1 start:

| Time | Event |
|------|--------|
| 0–5s | Outer monument fades; calligraphy stays |
| 0–26s | `wind2a11` loops; `documents` + `azan` play once (26s). No `kane1`. |
| 25–26s | Calligraphy fades; 26s clips end |
| 26–32s | Closed barracks + **all** fences + Tower All fade in; stay forever; collision |
| 32–40s | Hold |
| 40–49s | Sky banners (`skybarriar`) fade in |
| 49s | Doors open — keep barrack-back **shield** (`front-open2`); hide doorway fill (`fusuma`) so rectangle is enterable |

**FUTURE:** North left/right proximity pop (`fencePopEnabled: false`). Shoji temple. Kane1 gong. Placement cubes collision-disabled.

### Scene 2 — Japanese Paradise Garden (2026-09-17)

**Script:** `beyond-manzanar-2026-09-17-FC5RTRJi/custom-script.js`

#### Assets

| ID | Asset | Role |
|----|--------|------|
| 485230 | triggerCube (barracks → garden) | Enter zone → teleport into garden shoji |
| 484583 | leaveGarden-trigger-CubeOnly | Enter → leave garden to `(-316, 10, -663)` |
| 484578 | shojiTemplate-open | Open temple **with stairs** (shown on teleport) |
| 484579 | shojiTemplate-closed | Closed temple **no stairs** (shown after last step down) |
| 484580 | japanGardenWall-tree-Colliders | Shown + collision in Scene 2 |
| 484581 | japanGardenExtras | Shown (decorative / garden ground extras) |
| 483441 | groundImage | Camp ground — **hidden** on garden enter |
| 481241 / 481790 | barrack open / closed | **Hidden** on garden enter |
| 483435 | skybarriar_All | Sky posters — **hidden** on garden enter |

#### Flow (current)

1. **Trigger** — walk into Scene 2 cube near barracks.
2. **Teleport** — land inside open garden shoji at `(-10, 4, 1)`.
3. **Hide camp** — camp `groundImage`, both barracks, and sky posters hide. Garden assets show (open shoji, walls/trees, extras). Closed shoji stays hidden. `leaveGarden` cube is shown/armed.
4. **Stairs** — height bands while leaving the temple: **4 → 3.25 → 2.5 → 1.6 → 1** (garden ground).
5. **Seal** — after the **last step** (off stairs onto garden ground): open shoji hides, **closed shoji** appears.
6. **No re-entry** — closed temple uses **solid exterior collision** (no door gap) so the player cannot walk back in.
7. **Leave garden** — enter `leaveGarden-trigger-CubeOnly` (484583) → teleport to **`(-316, 10, -663)`**. Garden hides; barracks + camp ground restore; **sky posters stay hidden**.

#### Config knobs (`CONFIG.scene2`)

| Key | Purpose |
|-----|---------|
| `teleport` | Inside open temple `{ x: -10, y: 4, z: 1 }` |
| `shoji.*` | Stair side, heights, door gap (same model as old shoji) |
| `hideOldGround` | Hide camp ground on enter |
| `hideCampBarracks` | Hide barrack open/closed on enter |
| `hideSkyPosters` | Hide skybarriar on enter (stays hidden after leave) |
| `sealShojiAfterStairs` | Open→closed swap after last step |
| `leaveGardenEnabled` | Arm leaveGarden cube |
| `leaveTeleport` | Exit dest `{ x: -316, y: 10, z: -663 }` |
| `leaveTriggerRadius` | Proximity radius for leave cube |

#### Changelog

| Date | Change |
|------|--------|
| 2026-09-17 | Scene 2 garden teleport wired; hide garden until trigger |
| 2026-09-17 | Teleport inside open shoji; camp ground hide; deck/stair heights tuned to 4→…→1 |
| 2026-09-17 | On enter: also hide barracks + sky posters |
| 2026-09-17 | After last stair step: open→closed shoji swap; closed temple solid collision (no re-entry) |
| 2026-09-17 | Leave-garden cube → `(-316, 10, -663)`; hide garden; restore barracks + ground; posters stay hidden |
| 2026-09-17 | **NAC save limit:** full `custom-script.js` (~72KB JSON) fails Script Editor save. Paste **`custom-script.nac-paste.js`** instead (comments stripped, ~60KB JSON). Edit the full file in Cursor; regenerate paste build before NAC. |

**FUTURE:** optional fence/tower hide with camp; re-entry to garden if needed.

### NAC Script Editor notes

- Official warning: code goes in a `<script>` tag; don’t change NAC UI; avoid external loads.
- **Save error** (“An error occurred when saving this data”) → payload too large (likely ~**64KB** field limit after JSON escaping).
- **Paste this into NAC:** `beyond-manzanar-2026-09-17-FC5RTRJi/custom-script.nac-paste.js`
- **Source of truth (with comments):** `beyond-manzanar-2026-09-17-FC5RTRJi/custom-script.js`
- Ladder/probe test files were temporary and have been removed.

### Tyler fence / tower notes (2026-09)

| Asset | Role |
|-------|------|
| **Tower All** | Group fade-in with camp (1 ID). Later: 8 individual + NAC billboard. |
| **Individual tower** | Mid-camp test; Scene 1 keeps it hidden for now. |
| **Fence All** | Hidden — not used. |
| **North center** | Always visible once camp fades in. |
| **North left + right** | Proximity pop in/out (`fencePopRadius`, default 80). |
