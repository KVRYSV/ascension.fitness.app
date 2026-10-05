# ASCENSION fitness
Personal use fitness app vibecoded and developed using claude. Uses HTML for full deployment via PWA. 
Dependencies and cache is all local. Runs on browser as well. I can't code but I can design...

## v8.4.0

Big update since v7.13.0: research-based program, auto phase planner, cardio plan, new themes and fonts.

### Added
- **Phase planner**: BMI, BMR and estimated body fat (from waist or BMI). Picks Cut or Lean Build, shows weeks to target and switches on its own. Learns your real TDEE from logged calories and the weight trend.
- **Targets**: TARGET box and gray placeholder weight/reps on every set, based on your last log.
- **Stall check**: flags a lift that is flat for 3 sessions. Offers an early deload when 2+ lifts stall.
- **Cardio plan**: weekly 4×4 intervals, Zone 2, and a HAMR test in week 6 of each block. Run and HAMR windows open from the Gate with pace and heart-rate targets, then log back into it.
- **Loadout picker**: choose machines, cables, dumbbells, barbell, bodyweight or full gym when you open a Gate. Each move has an equipment field and a swap button.
- **New moves**: leg extension, sissy squat, overhead triceps (machine/cable), ab crunch machine, box and broad jumps, 4×4 intervals.
- **Hunter Systems** (each can be turned off): shadow army, crates and buffs, momentum combo, quest timer, Hunter Assessment registry, trophy wall.
- **Themes**: Deus Ex, Yellow, Green, Navy. Extra themes unlock from crates.
- **Fonts**: System, Digital, Terminal, Grotesk, Serif.
- Stat radar behind the 3D model on Recovery Map and Train.
- Admin editor for soldiers, trophies, themes, buffs and crates.
- Skill work setting for planche, lever and handstand holds (off by default).
- Onboarding: Custom button for height (ft/in or cm) and bodyweight (lb or kg); profile edit no longer reads kg as lb.


### Changed
- Program rebuilt for a lean V-taper: more side delt, lat, leg and calf work. Weighted abs replace stomach vacuums. Overhead triceps first. Seated leg curl. Build weeks add sets to priority moves. Max 5 sets per move.
- Stats now change the workout:
  - STR: top set and an extra set.
  - AGI: reps, holds and a jump primer.
  - VIT: rest and Zone 2.
  - SEN: hard last set.
  - INT: estimated 1RM.
- Rest: 150 / 90 s base, minimum 90 / 60 s. Load steps are set by equipment.
- Nutrition: the cut scales with body weight. Calories adjust from weigh-ins, with a BMR floor. Fiber and water targets. Live targets in Nutrition & Fuel.
- App text trimmed and matched to research: supplement doses, About, Session Guide (today's time, sets and effort).
- Boss Gates move to weeks 4 and 7 of each block. Daily quest growth capped.
- Primary target tags pulse. Gate-clear EXP counts up.
- Move page: sets × reps now show as unboxed large digits. The target or suggested-load cell stays on the same row on phones.
- Shorter suggested-load text for bodyweight, core and conditioning moves.

### Fixed
- WebGL crash (white background) when switching Train and Status.
- Train model stopped spinning after a touch.
- Theme picker showed raw markup.
- Gate-clear animation played with no sets logged.
- Fonts did not reach every text field.
- Program stayed in deload after week 24.
- Next target mixed rep ranges and used deload or boss logs.

### Removed
- Avatar cosmetics.
- Unproven cues (spot reduction, "without burning muscle", and similar).


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
