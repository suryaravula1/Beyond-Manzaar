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
| Restore this known-good shoji script | `git checkout test-realm-shoji-interactions` |
| Start a new experiment | `git checkout -b <new-branch-name>` then add a row below |
| Save a script change | `git add beyond-manzanar-2026-07-31-6wErk78Y/custom-script.js` then `git commit` |

---

## Branches

| Branch | Status | Script snapshot | What this code does | Still open on this branch |
|--------|--------|-----------------|---------------------|---------------------------|
| `test-realm-shoji-interactions` | **Known good — keep this** | commit `922796b` (HEAD) | Barrack wall collisions (`481241`). Jump disabled. Barrack entry via trigger cube (`481246`) → forced push `maxX`. Shoji (`481245`): stairs-side only (`stairsSide: 'minZ'`), other 3 faces solid, door gap `doorHalfWidth: 4`, two-step height on `stairRun: 5` (10 → 11.25 → 12 → 12.75 inside). | Monument hide after audio (`481244`). Multi-door cube ID list. Tune `stairsSide` if stairs are on another face. |

### Template for the next branch

| Branch | Status | Script snapshot | What this code does | Still open on this branch |
|--------|--------|-----------------|---------------------|---------------------------|
| `<branch-name>` | in progress | copy from `test-realm-shoji-interactions` first | … | … |

Start every new branch from the known-good one:

```bash
git checkout test-realm-shoji-interactions
git checkout -b <new-branch-name>
```

Then update this table.

---

## Feature checklist (whole test kit)

| Feature | Artwork | Branch that has a working version |
|---------|---------|-----------------------------------|
| Barrack wall collisions | `481241` | `test-realm-shoji-interactions` |
| Jump disabled | — | `test-realm-shoji-interactions` |
| Barrack entry (trigger cube) | `481246` | `test-realm-shoji-interactions` |
| Shoji stairs + walls | `481245` | `test-realm-shoji-interactions` |
| Audio end → hide monument | `481244` | *not done yet* |

---

## Artwork IDs (Test Realm)

| ID | Asset |
|----|--------|
| 481241 | barrack_block_open |
| 481244 | fading_monument |
| 481245 | shoji |
| 481246 | triggerCube (barrack entry) |
