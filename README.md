# ascension.fitness.app
personal use fitness app vibecoded using claude.

______________________________________________________________________________________________________

edit 6/21/26 
ASCENSION — v2 update (splash, glass UI, sound, muscle map, rest timer)
=======================================================================

WHAT CHANGED IN THE REPO
  Replace these two files in your GitHub repo with the ones here:
    - index.html   (the whole updated app, sounds embedded inside it)
    - sw.js        (cache bumped to ascension-v2 so the update actually loads)
  Everything else (manifest.webmanifest, icons/, .well-known/assetlinks.json,
  .nojekyll) is UNCHANGED — leave it as-is.

WHY sw.js MATTERS
  Your installed app caches itself via the service worker. If you only replace
  index.html, the old version keeps loading from cache. Bumping the cache name
  (done here: ascension-v2) forces the new version to install on next launch
  with internet. After updating, open the app online once, then fully close and
  reopen it — you may need to open it twice for the new cache to take over.

NO REBUILD NEEDED
  You do NOT need to re-run PWABuilder or reinstall the APK. The APK is a thin
  shell that loads your hosted site — updating the repo updates the app. (Only
  re-run PWABuilder if you change the manifest, package name, or host URL.)

NEW IN THIS VERSION
  - Longer animated boot/splash (~4s) with system readout
  - Glassmorphism across panels, nav, header, and notifications
  - Bigger logo + larger framed rank pill
  - Interface sound effects (embedded, offline) + haptic vibration
    toggle in System > Settings > Interface sound + haptics
  - Muscle Map on the Train screen: front/back body that highlights the
    muscles each session targets (bright = primary, dim = secondary)
  - Rest timer: auto-starts when you check off a set (scaled to movement),
    plus manual 0:60 / 1:30 / 2:00 / 3:00 presets
  - Fixed the Stats calorie/protein input alignment
  - More entrance animations (number pop-ins, panel sheen sweep)

_________________________________________________________________________________________________


ASCENSION — installable PWA bundle
==================================

OPTION A — Run it now (offline, no install)
  Open index.html in a browser. Works fully offline; progress saves on-device.
  On Android Chrome: menu > Add to Home screen for an app shortcut.

OPTION B — Install as a real "lite app" (PWA)
  Host this folder on any free static host so it has an https:// URL:
    - GitHub Pages, Netlify (drag-and-drop), Cloudflare Pages, or Firebase Hosting.
  Open that URL in Chrome on Android > menu > "Install app".
  It launches standalone (no address bar), with its own icon, and runs offline
  via the service worker (sw.js).

OPTION C — Turn it into a sideloadable .apk / Play Store .aab
  1. Host the folder (Option B) so it has an https:// URL.
  2. Go to https://www.pwabuilder.com and enter that URL.
  3. It validates the manifest + service worker, then under "Package for stores"
     choose Android > Generate. You get a zip with:
        - a signed .apk  (sideload directly onto your phone for testing)
        - an .aab        (for Google Play submission)
     PWABuilder uses Bubblewrap/TWA + a cloud Android build box, so you need
     NO local Android SDK.
  4. (Optional, to hide the address bar fully) add the assetlinks.json that
     PWABuilder gives you to /.well-known/ on your host.

Files
  index.html              the entire app (UI + logic + data)
  manifest.webmanifest    app metadata for install
  sw.js                   offline caching service worker
  icons/                  app icons (192, 512, maskable, apple-touch)
