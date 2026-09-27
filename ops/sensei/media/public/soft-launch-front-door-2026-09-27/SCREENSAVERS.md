# Soft-launch front-door screensavers (DRAFT)

Display-only Matrix overlays on the soft-launch homepage. **No auth, no login, no Sensei security gate, no saver-lock, no sign-out.**

Engines reused from `/workspace/screensaver-demos/` (`rain-engine.js` — classic green + Godzilla Mode rainbow). Ghost background rain (`js/matrix-rain.js`) stays a separate low-opacity layer and is hidden while a fullscreen saver is up.

## Behaviors

### Godzilla Mode (`theme: gm`)

| Trigger | Behavior |
|---------|----------|
| Click hierarchy **Godzilla Mode** card (`#gm` / `.gm-card`) | Play GM rainbow rain fullscreen for **2.5 s**, **once per browser tab session** (`sessionStorage` key `s1r1us-gm-saver-intro`). Then return to the page. |
| Idle while in GM context | If user is on / interacting with the GM sleeve (hash `#gm` or `.tier-gm` substantially in view) and **no mouse click for 5 minutes**, show GM saver until **mouse click** (or **ESC**). |

### Classic Matrix (`theme: classic`)

| Trigger | Behavior |
|---------|----------|
| Home idle | If **not** in GM context and user **does not click** for **5 minutes**, show classic green rain fullscreen. |
| Dismiss | **Mouse move** or **click** (or **ESC**) returns to the website. |

### Precedence

- Classic idle does **not** run while any GM saver is active.
- When the user is in GM context, **GM idle rules win** (classic timer is not armed).

## Files

| Path | Role |
|------|------|
| `js/rain-engine.js` | Paint engine (`S1R1USRain.startRain`) |
| `js/screensavers.js` | Overlay, session intro flag, idle timers, dismiss |
| `js/matrix-rain.js` | Ghost background only (unchanged) |
| `css/theme.css` | `.screensaver-overlay` fullscreen styles |

## QA helpers

- `?saverDemo=1` — idle **3 s**, GM intro **1.2 s** (manual timing checks).
- Console: `S1R1USScreensavers.showClassic()`, `.showGm()`, `.showGmIntro()`, `.hide()`, `.getState()`.

## Local preview

Server already bound on **8765** from the preview folder:

```bash
# if needed:
python3 -m http.server 8765 --bind 127.0.0.1
# open http://127.0.0.1:8765/
```

## Ambiguities resolved

1. **GM “page”** — front door is a single HTML page; GM context = `#gm` hash **or** `.tier-gm` in view (after scroll/click).
2. **Classic idle** — armed on **click** absence (per spec), not mousemove; dismiss still accepts mousemove/click/ESC.
3. **GM idle dismiss** — click or ESC (mousemove does not dismiss GM).
4. **Intro skip** — click/ESC during the 2.5 s intro dismisses early; flag still counts as played.
5. **No separate GM route** — card `href="#gm"` kept; intro hooks the same click.
