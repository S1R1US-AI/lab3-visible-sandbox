# Deploy guards — soft-launch front-door live-prep

**Live-prep tip (2026-09-28)** — Distrobi / Grok Bot

## Status of this surface

| Gate | State |
| --- | --- |
| HTML live-prep (canonical / OG / index / DRAFT chrome strip) | **Done in tip** |
| Sensei meaning re-PASS on this tip | **Pending** |
| Security SECURE on this tip (soft-launch live path) | **Pending** |
| Human live APPROVE (named surface) | **Pending** |
| Wired to DigitalOcean / `S1R1US-LABs` `.output` | **NOT done** — do not deploy from this tip alone |

This tip makes the pack **live-ready frontend theme**. It does **not** authorize DO deploy or merge.

## Must not wire without gates

- Do **not** copy or publish these files to DigitalOcean / `S1R1US-LABs` `main` / any host that serves `https://s1r1us.ai` until **per-surface** Sensei **re-PASS** + Security **SECURE** + human **APPROVE**.
- Backend / API / paper desk remain **HOLD** — front door HTML/CSS only.
- Godzilla dragon `icon-512` + favicon = **NEVER overwrite**.

## Canonical / Open Graph policy (live-prep)

| Tag | Live-prep tip policy |
| --- | --- |
| `<link rel="canonical">` | `https://s1r1us.ai/` (+ `/hello-world/`, `/discord/`) |
| `og:url` | Same live origins |
| `og:image` / `twitter:image` | Absolute HTTPS on live origin — prefer `https://s1r1us.ai/images/icon-512.png` (home/HW); Discord hero `https://s1r1us.ai/discord/assets/discord-hero.png` |
| `robots` | `index, follow` |
| `s1r1us:draft` | **Removed** |
| `s1r1us:deploy-guard` | `shipped` (frontend tip only — wire still gated) |
| `s1r1us:production-target` | `https://s1r1us.ai` |

Intended live asset path for site chrome OG: **`https://s1r1us.ai/images/icon-512.png`** once the pack is served at site root. Pack-relative `images/icon-512.png` remains the source file (do not overwrite Godzilla art).

## Favicon metadata

Pack `images/favicon.svg` `<title>` / `<desc>` must stay aligned with SIM-locked / NFA / education posture. Do **not** restore “trading bots” or “bitcoin accumulation” agent language in SVG metadata.

## Prior re-gates (history)

- Security **SECURE** + Sensei **PASS** on tip `f5af0e3` / `e75a7d6` applied to **DRAFT** deposit only.
- This live-prep tip **invalidates** prior meaning PASS for wire purposes — Sensei + Security must re-score before human APPROVE.
