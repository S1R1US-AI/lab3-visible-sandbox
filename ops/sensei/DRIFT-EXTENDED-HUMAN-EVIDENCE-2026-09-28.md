# Extended drift training — human evidence 2026-09-28

**Status:** Private ops training · **human SoT for visual drift**  
**Communication:** reset — bots agree/disagree with human before repairs  
**Related:** DRIFT-BOT-HUMAN-COMMS-2026-09-28.md · matrix-mistake · soft-launch-drift-and-go-gates skill

## Human judgment (locked)

Human says: the same class of mistake that broke `/roadmap` (theme overreach / unreadable) now appears on other soft-launch pages. Theme is broken in more places. Recalibrate. Do not ship more theme until repairs follow human attachments.

## Evidence A — `/r0b0ts` rain-dominant (same class as matrix-mistake)

**File:** `media/public/drift-training-2026-09-28/r0b0ts-rain-dominant-broken.png`  
**URL:** https://s1r1us.ai/r0b0ts  

What human sees:
- Full-viewport Matrix rain only
- No usable nav, copy, logos strip, or footer in the shot
- White frame around the rain viewport
- Soft-launch “outer theme” overwrote readable page content (same failure mode as pre-remove `/roadmap` rain)

**Training name:** `matrix-mistake-class` — always-on ghost rain (or equivalent chrome) that **wins over content**.

## Evidence B — `/roadmap` unstyled / CSS broken

**File:** `media/public/drift-training-2026-09-28/roadmap-unstyled-css-broken.png`  
**URL:** https://s1r1us.ai/roadmap  

What human sees:
- Plain white page, default browser serif, purple links
- Content HTML present (nav, OSS Roadmap copy, brand marks) but **theme CSS not applied**
- Rain already removed — but surface is still broken (different failure mode: **missing/broken stylesheet**, not rain)

**Training name:** `theme-css-miss` — markup ships without the soft-launch visual system.

## Two failure modes (must not conflate)

| Id | Symptom | Example |
|----|---------|---------|
| `matrix-mistake-class` | Rain/chrome dominates; content unreadable or absent | `/r0b0ts` shot; original `/roadmap` rain |
| `theme-css-miss` | Content present; unstyled / wrong chrome | `/roadmap` white Times shot |

Both are **drift**. Both require human-guided repair. Stamps (SECURE/PASS) on HTML deploy-guard do **not** override human visual SoT.

## Rules update (internalize)

1. Human screenshot of broken UX **outranks** bot READY/SECURE on that surface until repaired.
2. After any soft-launch wire: **visual smoke** (readable content + theme CSS loaded + rain not dominating) before claiming done.
3. Removing rain ≠ theme fixed (`theme-css-miss` can remain).
4. Adding soft-launch rain to desk pages can replay `matrix-mistake-class` — treat as high-risk.
5. Communication reset: ask **AGREE with human?** before repair fan-out.

## Bot poll question

Do you AGREE with the human that these two shots show unacceptable soft-launch drift and that recalibration/repairs must follow human attachments (not more unsolicited theme ship)?


## Pause + clarify (human teaching 2026-09-28)

This incident is a **good example of when bots should have paused** and asked the human for more clarification **before** shipping more soft-launch pages.

Rule for both sides:
- If the bot does not understand the intended theme/UX → **pause and ask** (one short question).
- If the human sees the bot may have misunderstood → **clarify**.
- Do **not** assume, stamp SECURE/READY, and wire more surfaces.

Related human preference: “if not sure ask me w short question, then go” — **ask first** still wins over blind go when visual intent is ambiguous.
