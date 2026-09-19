# ASCENSION fitness
Personal use fitness app vibecoded and developed using claude. Uses HTML for full deployment via PWA. Dependencies and cache is all local. Runs on browser as well. I can't code but I can design...

# ASCENSION v7 Changelog

## HAMR / PACER test (v7.0 – v7.1)
- 20 m shuttle run with the official audio.
- Shows a sweeping line, the level as "8 - 10", a READY countdown, and a 0 to 20 m scale.
- Grid flashes each beep. Drag the bar to seek.
- Logs your final level. Clears the Gate.

## Run pacer (v7.2 – v7.4)
- Timed run with a track diagram. It is a page, not a window, so progress is saved.
- 3 pace markers show where you must be: Field House (outer), 400 m (middle), custom (inner).
- Field House lane takes its turns 9x faster, to match the real hangar track.
- Markers fill the lane, with a thin front line and a fading trail.
- Lap start line at the top left. Inner oval flashes each lap.
- Lap counters in the centre and in the legend.
- Rest allowance = maximum time − goal time. Unused seconds are banked.
- Editable distance, goal time, and maximum time.
- Header bar shows the 400 m laps.
- Logs the run. Clears the Gate.

## Visual
- Theme colours for the markers. Red theme uses yellow, red, and orange.
- Rising light streaks in the background.
- Track drawing 20% smaller, to fit a phone.
- Sharper font for the timer.


ASCENSION — installable PWA bundle
==================================

OPTION A — Run it now (offline, no install)
  Open index.html in a browser. Works fully offline; progress saves on-device.

OPTION B — Install as a real "lite app" (PWA)
  Open https://kvrysv.github.io/ascension.fitness.app/ in Chrome 
  Android Chrome > menu > "Install app".
  It launches standalone (no address bar), with its own icon, and runs offline
  via the service worker (sw.js).
  IOS Chrome or Safari: menu > Add to Home screen as an app shortcut.

Files
  index.html              the entire app (UI + logic + data)
  manifest.webmanifest    app metadata for install
  sw.js                   offline caching service worker
  icons/                  app icons (192, 512, maskable, apple-touch)
