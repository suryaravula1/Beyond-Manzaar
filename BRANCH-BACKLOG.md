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
| `audio-monument` | **In progress** | this branch | Play `documentsRecentlyDiscovered` voice on first click; when it ends (~26s), hide monument (`481244`). | Confirm voice artwork ID in live NAC if auto-detect fails. |
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
| Monument audio | First click plays voice; when it ends (~26s), monument disappears |

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
| Audio end → hide monument | `481244` | `audio-monument` (in progress) |

---

## Artwork IDs (Test Realm)

| ID | Asset |
|----|--------|
| 481241 | barrack_block_open |
| 481244 | fading_monument |
| 481245 | shoji |
| 481246 | triggerCube (barrack entry) |
| *(Inspect)* | `documentsRecentlyDiscovered_22kH8m-g2.wav` — set `VOICE_AUDIO_ID` if auto-find fails |
