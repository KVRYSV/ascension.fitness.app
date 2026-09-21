# ASCENSION fitness
Personal use fitness app vibecoded and developed using claude. Uses HTML for full deployment via PWA. 
Dependencies and cache is all local. Runs on browser as well. I can't code but I can design...

## v7.9.9 — 2026-09-20

Changes from v7.5.3 to v7.9.9.

### Added
**Data and logging**
- Delete a logged Gate. Open a day and tap ✕ on the Gate. A confirm appears. The Gate's EXP is removed.
- Recent Gates: tap a row to open that day. Tap ✕ to delete the Gate.
- Log a workout for any past date from Recent Gates.
- Gate history window on the Data tab. Grouped by month. Scrolls past 10 entries.

**Fitness tests**
- HAMR: SHUTTLES DONE and THIS LEVEL counters.
- HAMR: "Audio not found" message when `hamr-audio.mp3` is missing.
- Run: Gate clear sound and effect when a run is logged.
- Run: laps-left number shown in each marker's colour.

### Changed
**Layout**
- Data tab order: Today, Training Volume, 7-Day Activity, Bodyweight, Nutrition Targets, Calorie Log, Items & Potions, Recent Gates.
- Quests tab order: Pop-up quests, Daily Quest, Boss Challenge, Bodyweight, Items & Potions, Nutrition & Fuel.
- Run legend order: Field House, 400 m, Custom. Lap counters in a boxed display font.
- Data tab: Today rings centred in their boxes.
- 
**Behaviour**
- Default interface sound: Low (50%). Default bar style: Minimal.
- Excuse Week also covers missed days already in the panel.
- Session Guide and About text rewritten.
- New builds install on the first open. If a workout or run is active, a toast asks you to reopen.
- Rest timer alarm is scheduled on the audio clock. It sounds on time while another app is open.
- Boot sound follows the interface sound setting.

### Fixed
- Malformed backups are rejected before anything is saved. The current save is kept.
- Press sounds played more than once.
- Cancel on the date picker trapped the parent pop-up.
- Boot screen could hang when the 2D canvas was unavailable.
- A failed save turned off all later saves with no warning. Saves now retry, and a toast warns once.
- A run that crossed midnight disappeared.
- The run page and the 3D model kept drawing while hidden.
- Navigation to an unknown tab caused a crash.

### Removed
- Machine icons on exercise pages.
- Recommended music on exercise pages.
- HAMR and Timed Run from the manual log search.
- Machine-first paragraph in the Session Guide.

### Deploy
- Upload `index.html`, `sw.js`, and `hamr-audio.mp3` to the same folder.


ASCENSION — installable PWA bundle
==================================

OPTION A — Run it now (offline, no install)
  Open index.html in a browser. Works fully offline; progress saves on-device. Make sure to download the Service worker, Index.html,
  and the HAMR audio file if you want to run it locally. the HAMR test won't work without the audio.

OPTION B — Install as a real "lite app" (PWA)
  Open https://kvrysv.github.io/ascension.fitness.app/ in Chrome 
  Android Chrome > menu > "Install app".
  It launches standalone (no address bar), with its own icon, and runs offline
  via the service worker (sw.js).
  IOS Chrome or Safari: menu > Add to Home screen as an app shortcut.

OPTION C - Download APK
  The APK is just a chrome container. It's not a standalone app. It needs to connect online once to sync with this repo. Clear chrome cache, force close it, and restart the app for new updates to take effect. 
