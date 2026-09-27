# THEME-SPEC — D2 theme swap (soft-launch front door)

**Date:** 2026-09-27  
**Status:** DRAFT · Theme mock v1 **APPROVED** · NO LIVE  
**Owner:** Distrobi / Grok (implement) · Sensei meaning + Security controls + human APPROVE before live wiring  
**Source mock:** `theme-mock-v1.png` (human APPROVED)

---

## Intent

Retire **carbon fiber** from the **pre-login** homepage. Adopt a calm professional **software studio** look. Keep official **Godzilla dragon** site logo + favicon (`icon-512` + favicon set) when this DRAFT is eventually wired to live — **NEVER overwrite**; do not replace site identity with bot marks or new generated art.

**Canon:** front-end ≠ backend desk UI. Live build #113 / carbon baseline #68 stays a historical product skin, not the soft-launch brand.

## Retire from front door

| Remove | Notes |
| --- | --- |
| `carbon-fiber` CSS class / texture | No woven fiber wallpaper |
| `desk-nav-fiber` language | No desk-chrome nav skin on pre-login |
| `#070908` carbon theme-color as brand default | Soft-launch uses studio `#121619` |
| Tape / order-ticket desk chrome as first paint | Desk entry is secondary CTA / bottom bar only |

## Studio tokens (DRAFT)

Defined in `css/theme.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#121619` | Page background |
| `--bg-elev` / `--bg-card` | `#181c20` / `#1c2126` | Panels / bot cards |
| `--gold` | `#c9a227` | Primary CTA, active nav underline, accents |
| `--teal` | `#2ec4b6` | LIVE status, secondary accents |
| `--text` / `--muted` | `#f2f4f6` / `#9aa3ad` | Primary / secondary type |
| `--font` | Inter / system sans | Clean sans — not terminal mono-first |
| Grid | Subtle 28px line grid on studio panel | Technical blueprint feel — **not** carbon fiber |

## Layout contract (mock v1)

1. **Header** — `S1R1US.ai` + gold star · nav Home / FAQ / Roadmap / GitHub / Discord · mark  
2. **Hero left** — H1 “AI Bitcoin research desk” · education/paper/OSS lead · primary “Explore the Desk” · secondary “View on GitHub”  
3. **Hero right** — RESEARCH STUDIO 2×3 bot grid (APPROVED logo cards 01–06)  
4. **Bottom bar** — Live Tape (LIVE) · Labs · Roadmap · BYO Compute · Request Access · GitHub  
5. **Honesty strip** — SIM-locked vs LIVE · HARD DEADLINE 2026-12-01 09:00 ET + TBD-counsel · auto trade LOCKED · Coinbase create LOCKED · 7-B0T / 7-bot leet+plain  
6. **Footer** — `@S1R1US_AI` only · short NFA  
7. **DRAFT banner** + meta `robots: noindex,nofollow` + `twitter:site @S1R1US_AI`  
8. **No hello-world hero** — D6 human-owned; muted HOLD note only  

## Keep when wiring live (future)

- **HARD LOCK** Godzilla dragon site logo: `icon-512.png` (header chrome — wired; NEVER overwrite)  
- **HARD LOCK** same mark as favicon set (`favicon.svg`, `.ico`, 48, apple-touch — NEVER overwrite)  
- 01–06 Research Studio marks: **separate** lane (`images/bots/*`; redesign does not touch chrome)  
- Godzilla JPGs = same site-identity reference; not bot stand-ins  
- Official S1R1US wordmark as **site** identity (not a bot card as the sole brand)  
- Intentional leet + plain SEO spellings (`7-B0T` + `7-bot`, etc.) elsewhere in public SEO  
- Education / NFA / PoC disclaimers  

## Out of scope for this DRAFT

- Editing live `S1R1US-LABs` homepage HTML  
- Unlocking Coinbase create / auto trade  
- Changing Lab 3 CHECKPOINT-152 desk locks  
- Shipping Discord / X posts of the new homepage  

---

*D2 theme swap spec · Distrobi · 2026-09-27 · NO LIVE*
