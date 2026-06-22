# ascension.fitness.app
personal use fitness app vibecoded using claude.

v5.3 polish pass


Stats start on your real start date. Week count and every derived stat (missed days, debuffs, nutrition flags) track from the program start, so starting today never hands you phantom penalties. Settings now shows start date + estimated end and lets you set the start date.
More glass. Floating nav and panels are ~20% more transparent with stronger bokeh blur, so the live background reads through every window.
Edgier nav. The floating bar is now polygonal with a glowing edge (no solid outline); the centre Status button is a diamond.
Free attributes. Tap any attribute to set it to any value (arrows still nudge ±1) — no point economy.
Distinct bar styles — glow / solid / striped / minimal now actually look different (not just sized differently).
Cohesive theming. Crimson is properly red now, and the whole text ramp + live background re-hue to the active accent instead of staying blue.
Current Arc shows a progress bar to the next Arc instead of duplicated advice (advice now lives only on Today's Gate).
Cleaner Train: removed the page-dots indicator; gentler one-card-per-swipe snapping.
Cleaner Profile: the level number is now an EXP-to-next bar.
Supplements = items/potions: logged as consumables and tracked in Profile + Data (uptake, weekly count, last taken).
Body window now draws the weight trend chart.
About rewritten as a quirky summary, crediting Claude as coder, designer & builder.

# ASCENSION — v5.0 update notes

A self-contained, offline-first fitness PWA with a Solo-Leveling "System" interface. Everything below ships inside the single `index.html` (no external dependencies). Old saves migrate automatically — nothing is wiped.

## Interface
- **Full-bleed header** that runs edge to edge.
- **Levitating, frosted bottom nav** with stronger glass blur and glow.
- **Status is now the centre of the nav** as a large, raised, highlighted button — it's the focus.
- Tabs renamed: **Stats → Data**, **System → Settings**.

## Status screen
- **Giant LEVEL** number sitting inside a **circular EXP ring** (the ring fills as you approach the next level).
- **Attributes with ▴▾ arrows** — raise or lower STR / AGI / VIT / SEN / INT freely to match your training focus.
- **7-day tracker strip** — tap any day to see the workouts you logged that day (stored locally).
- **Current Arc** panel now appears **before** Today's Gate.
- **Skill tree moved here**, into Status.
- HP / MP bars, rank ladder, equipped-title line, and active-debuff warnings.

## Profile (tap the level / rank badge in the header)
- **Massive Hunter rank** (E … S … Monarch) with the rank ladder.
- **Attributes** showing base + modifiers (effective values).
- **Equippable Titles** (RPG-style, 3 slots) that change your modifiers — e.g. **[Dumbbell Slayer]** +2 STR, **[Demon Lord]** +2 STR / +2 AGI, **[Shadow Monarch]** +3 to all. Titles unlock from milestones.
- **Debuffs** from missed workouts or missed goals — **[Muscle Atrophy]**, **[Weakness]**, **[Sluggish]**, **[Poisoned]**, **[Famished]**, **[Unaccounted]** — each applies a negative modifier.
- **PR records**, **total + weekly EXP / score**, **calories per day this week**, a **missed-days tracker**, and a **per-day Gate history** you can scroll back through.

## Train screen
- **Horizontal swipe deck** — overview → one movement per screen → finish, so you focus on one thing at a time. Pager dots + a **top progress bar** that fills as you complete sets (dots turn green per finished movement).
- Each movement shows the **machine to use** plus an **optional free-weight** alternative.
- **Embedded form video** in-card, **plus** a separate **"Open in YouTube app"** button (Android deep link, web fallback) and a redundant **"Form video ↗"** link.
- A **recommended track** (title + artist) per movement for motivation.

## Boss fights
- Every **4th week's** training day becomes a **Boss Gate** (until cleared) — an **intense HIIT trial**.
- The banner shows the **recommended level**. Beat it **under-level** for **+50% EXP, bonus ability points, and the Giant Slayer title**.

## Data screen
- Activity and training-volume charts are now **line graphs** (alongside the bodyweight trend).

## Settings (settings-only now)
- **Bar style** selector — glow / solid / striped / minimal.
- **Program length** — extend the climb (+4 / +8 weeks, or reset to 24).
- **Form-video link editor** — override any movement's demo with your own YouTube link or ID.
- **Admin editor** (no password, confirm to enter) — directly edit level, attributes, EXP, ability/skill points, and grant/revoke titles.
- Accent, interface sound, profile/schedule edit, backup export/import, full reset.


______________________________________________________________________________________________________
 
ASCENSION — v2 update (splash, glass UI, sound, muscle map, rest timer)
=======================================================================

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
