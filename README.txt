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
