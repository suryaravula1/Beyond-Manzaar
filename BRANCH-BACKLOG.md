# Branch backlog — Test Realm script

**Remote:** [https://github.com/suryaravula1/Beyond-Manzaar](https://github.com/suryaravula1/Beyond-Manzaar)

Git tracks **only** `beyond-manzanar-2026-07-31-6wErk78Y/custom-script.js` (plus this file).
Paste that script into the NAC Script Editor for Test Realm.

When you create a new branch, add a row here before you start changing the script.
After you commit, push with: `git push -u origin <branch-name>`

---

## How to use

| Goal | Command |
|------|---------|
| See current branch | `git branch` |
| Use stable code | `git checkout main` |
| Start a new experiment | `git checkout main` then `git checkout -b <new-branch-name>` |
| Save a script change | `git add beyond-manzanar-2026-07-31-6wErk78Y/custom-script.js` then `git commit` |
| Push feature branch | `git push -u origin <branch-name>` |

---

## Branches

| Branch | Status | Script snapshot | What this code does | Still open on this branch |
|--------|--------|-----------------|---------------------|---------------------------|
| `main` | **Stable** | (after shoji-v3 merge) | Barrack + jump + hidden cube + shoji stairs/walls + stairs-face railing beside door gap. | Multi-door cube ID list. |
| `scene1-desert` | **In progress** | this branch | Scene 1 opening from the VRML: wind + gong, monument body fades at t+4s over 6s, azan at t+6s, azan end → camp fades in → sky barrier → doors open + shoji on. Monument calligraphy holds until the radio broadcast ends. Assets resolve by filename, so new uploads need no IDs. Lives in `beyond-manzanar-2026-09-02-sl5oKWTD/custom-script.js`. | No audio artwork is placed in the space yet — gong, azan, wind and the radio broadcast all need uploading. |
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
From export `beyond-manzanar-2026-09-02-sl5oKWTD` (published 2026-09-02).

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
| 483627 | documentsRecentlyDiscovered (voice) | spatial, at monument |
| 483629 | kane1-8m (gong) | global |
| 483630 | wind2a11-8m (wind loop) | global |
| 483631 | azan2-8m (azan) | global |

Locally the export has no audio artworks, so the script falls back to
`beyond-manzanar-2026-09-02-sl5oKWTD/Audio/*.wav`.

Still not placed in the space: `fence_All.glb`, `towers_All.glb`.
