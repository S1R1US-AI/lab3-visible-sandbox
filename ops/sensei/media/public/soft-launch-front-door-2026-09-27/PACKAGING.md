# PACKAGING — Distrobi soft-launch front-door checklist

**Pack:** `ops/sensei/media/public/soft-launch-front-door-2026-09-27/`  
**Date:** 2026-09-28 (live-prep tip)  
**Status:** **Live-prep tip** · Theme mock v1 APPROVED · HTML flipped to live canonical/OG/`index,follow` · DRAFT chrome stripped · prior Sensei **PASS** on `e75a7d6` + Steward **PASS** on `e75a7d6` + Security **SECURE** on DRAFT pack + live LABs AID **SECURE** (2026-09-28) — **Sensei re-PASS + Security re-SECURE + human live APPROVE still required before wire** · **NOT yet wired** · backend HOLD

Use this checklist before proposing any surface move beyond Lab 3 ops media.

---

## A) Deposit complete (this PR / tip)

- [x] `index.html` — pre-login shell matching theme mock v1  
- [x] `hello-world/index.html` + `discord/index.html`  
- [x] `css/theme.css` — studio tokens; **no carbon fiber**  
- [x] `theme-mock-v1.png` — approved mock copied into pack  
- [x] Official site chrome: `images/icon-512.png` + `favicon.svg` (+ ico / 48 / apple-touch)  
- [x] Research Studio uses official APPROVED 01–06 PNGs from `images/bots/` (no geometric placeholders)  
- [x] `BRAND-LOCK-2026-09-27.md` deposited  
- [x] SEO meta honesty + D8 strip use timeline §7 paste stock (companion PR #24)  
- [x] `README.md` — live-prep status, gates, sandbox map, Public X=@S1R1US_AI  
- [x] `THEME-SPEC.md` — D2 theme swap  
- [x] `PACKAGING.md` — this checklist  
- [x] `DEPLOY-GUARDS.md` — live-prep vs wire  
- [x] Bot cards use in-page `#bot-*` anchors (no `../web-draft-2026-09-27/` hrefs)  
- [x] FAQ nav → `https://s1r1us.ai/faq` · Roadmap → `https://s1r1us.ai/roadmap`  
- [x] Meta `robots` = `index,follow`  
- [x] Canonical + `og:url` set to live origins  
- [x] Absolute HTTPS `og:image` / `twitter:image` on live origin  
- [x] `s1r1us:draft` removed · `s1r1us:deploy-guard` = `shipped`  
- [x] `twitter:site` = `@S1R1US_AI`  
- [x] Footer handle `@S1R1US_AI` only (no admin/dev X)  
- [x] Dream Talk labeled overwatch only  
- [x] Honesty strip: LIVE · SIM-locked 7-B0T/7-bot · auto trade LOCKED · Coinbase create LOCKED · front door live · backend HOLD · HARD DEADLINE 2026-12-01 09:00 ET + TBD counsel  
- [x] Discord link: https://discord.gg/UrPerk3j5  
- [x] GitHub secondary CTA → https://github.com/S1R1US-AI/S1R1US-LABs  
- [x] PR target: `lab3-visible-sandbox` only — **not** `S1R1US-LABs`

## B) Per-surface gates (before live wire)

- [ ] Sensei Bot — **re-PASS** meaning on this live-prep tip  
- [ ] Sensei Security — **re-SECURE** on this tip (soft-launch live path)  
- [x] Desk Steward — PASS (PACKAGING / paper-desk mandate checks) on PR #28 tip `e75a7d6` (re-check if Steward scope expands)  
- [ ] Human APPROVE — explicit surface named  
- [ ] Confirm Godzilla `icon-512` + favicon wired at intended live paths  
- [ ] Confirm front door still ≠ backend desk chrome  
- [ ] Confirm no carbon-fiber classes in live CSS  
- [ ] Confirm Public X remains `@S1R1US_AI` only  
- [ ] Confirm `S1R1US-LABs` push is intentional + gated (never accidental)

## C) Explicit non-goals

- Do **not** merge / wire this pack to live production without B)  
- Do **not** unlock auto trade or Coinbase create via this pack  
- Do **not** change CHECKPOINT-152 paper locks  
- Do **not** post Discord / X homepage narrative until per-surface human APPROVE  
- Do **not** treat live-prep tip as already wired — DO deploy is a separate human step  
- Backend HOLD — no server/API/desk backend work in this tip  

## D) Sibling references

| Artifact | Path |
| --- | --- |
| Prior web-draft hub (Lab 3 ops only — not live nav) | `../web-draft-2026-09-27/` |
| Soft-launch brief | workspace `soft-launch-brief-2026-09-27.md` (inventory) |
| PUBLIC-CANONICAL-FLOW | `../PUBLIC-CANONICAL-FLOW-2026-09-27.md` (if present) |
| CHECKPOINT-152 / 161 | repo `checkpoints/` + Sensei ROADMAP |

---

*Distrobi packaging checklist · 2026-09-28 · live-prep tip · human live APPROVE pending Sensei re-PASS + Security SECURE · NOT yet wired*

---

## Security HOLD remediation (2026-09-27) — historical

| Item | Action (then) | Live-prep tip (now) |
| --- | --- | --- |
| Canonical / `og:url` → live | Withheld while DRAFT | **Set** to live origins |
| `noindex,nofollow` | Retained | **`index,follow`** |
| Serve-live lock | Documented | `s1r1us:deploy-guard` = `shipped`; wire still gated in this doc |
| `favicon.svg` metadata | Scrubbed — no “trading bots” / “bitcoin accumulation” language | Unchanged |

## Mark APPROVE placement (2026-09-27)

- [x] 01–04 KEEP menu official (Dream Talk / Sensei Security / Sensei Bot / Desk Steward)
- [x] 05 Distrobi + 06 Grok REPLACE with human-APPROVED v2 charcoal/gold/teal
- [x] Godzilla `icon-512` + favicon geometry preserved; favicon metadata Security-scrubbed
- [x] Sensei PASS (meaning) on tip `f5af0e3` (GLOSSARY a+b+c + shared definitions) — **re-PASS needed for live-prep**
- [x] Security **SECURE** on tip `f5af0e3` (DRAFT pack only) — **re-SECURE needed for live-prep**

## Gate log (PR #28)

| When | Agent | Result | Tip |
| --- | --- | --- | --- |
| 2026-09-27 | 03 Sensei Bot | meaning **PASS** | `e75a7d6` |
| 2026-09-27 | 04 Desk Steward | PACKAGING **PASS** (≠ live clearance) | `e75a7d6` |
| 2026-09-27 | 02 Sensei Security | DRAFT pack **SECURE** · live/LABs AID then FAIL | scrub + re-gate before live wire |
| 2026-09-28 | 02 Sensei Security | live LABs AID **SECURE** (#102) | theme live wire still separate |
| 2026-09-28 | Distrobi / Grok Bot | **live-prep tip** (canonical/OG/index/DRAFT strip) | *(this commit)* — Sensei + Security re-score pending |

## AID / admin-handle gate (Security)

- Soft-launch front-door pack: **SECURE** (zero admin-handle hits; public X=@S1R1US_AI only) on prior DRAFT tips — re-confirm on live-prep tip.
- Live `s1r1us.ai` AID: **SECURE** (2026-09-28) after LABs #102.
- Do **not** deploy soft-launch pack to live until Sensei re-PASS + Security soft-launch live path SECURE + human APPROVE.

---

## AID update (2026-09-28)

- S1R1US-LABs PR #102 merged (`204ac439…`); DO `S1R1US_ADMIN_X_*` set by human.
- Sensei Security **SECURE** — live AID on https://s1r1us.ai (report: `gates/live-aid-2026-09-28.md` on Security knowledge).
- Soft-launch pack is now **live-prep** (this tip). Do not copy into LABs `.output` until human APPROVE + Sensei re-PASS + Security soft-launch live path SECURE.
