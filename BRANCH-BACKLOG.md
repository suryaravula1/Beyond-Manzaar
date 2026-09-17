# Branch backlog — Test Realm script

**Remote:** [https://github.com/suryaravula1/Beyond-Manzaar](https://github.com/suryaravula1/Beyond-Manzaar)

Git tracks **only** `beyond-manzanar-2026-09-17-FC5RTRJi/custom-script.js` (plus this file).
Paste that script into the NAC Script Editor for Test Realm.

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
| Save a script change | `git add beyond-manzanar-2026-09-17-FC5RTRJi/custom-script.js` then `git commit` |
| Push feature branch | `git push -u origin <branch-name>` |

---

## Branches

| Branch | Status | Script snapshot | What this code does | Still open on this branch |
|--------|--------|-----------------|---------------------|---------------------------|
| `main` | **Stable** | (after shoji-v3 merge) | Barrack + jump + hidden cube + shoji stairs/walls + stairs-face railing beside door gap. | Multi-door cube ID list. |
| `scene1-desert` | **In progress** | this branch | Scene 1 clock + Scene 2 garden teleport. Lives in `beyond-manzanar-2026-09-17-FC5RTRJi/custom-script.js`. | Tune garden teleport dest; leave-garden cube later; open/closed shoji swap; stairs on garden shoji. |
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
| 49s | Windows/doors open — **shoji stays hidden** (later scene) |

**FUTURE:** North left/right proximity pop (`fencePopEnabled: false`). Shoji temple. Kane1 gong. Placement cubes collision-disabled.

### Tyler fence / tower notes (2026-09)

| Asset | Role |
|-------|------|
| **Tower All** | Group fade-in with camp (1 ID). Later: 8 individual + NAC billboard. |
| **Individual tower** | Mid-camp test; Scene 1 keeps it hidden for now. |
| **Fence All** | Hidden — not used. |
| **North center** | Always visible once camp fades in. |
| **North left + right** | Proximity pop in/out (`fencePopRadius`, default 80). |
