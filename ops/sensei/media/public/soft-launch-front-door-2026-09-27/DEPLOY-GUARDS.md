# Deploy guards — soft-launch front-door DRAFT

**Security HOLD remediation (2026-09-27)** — Distrobi

## Must not serve live

This HTML/CSS/image pack under Lab 3 `ops/sensei/media/public/` is a **DRAFT deposit only**.

- Do **not** copy or publish these files to DigitalOcean / `S1R1US-LABs` `main` / any host that serves `https://s1r1us.ai` until **per-surface** Sensei **PASS** + Security **SECURE** + human **APPROVE**.
- `robots` = `noindex, nofollow` stays for the entire DRAFT life of this pack.
- Live homepage / FAQ remain **HOLD**.

## Canonical / Open Graph policy (DRAFT)

| Tag | DRAFT policy | After live APPROVE |
| --- | --- | --- |
| `<link rel="canonical">` | **Withheld** (must not claim live URL) | Set to `https://s1r1us.ai/` |
| `og:url` | **Withheld** | Set to `https://s1r1us.ai/` |
| `og:image` / `twitter:image` | Relative pack paths OK for review | Absolute HTTPS asset URLs on live origin |
| `s1r1us:production-target` | Documents intended live origin only | Unchanged |
| `s1r1us:deploy-guard` | `must-not-serve-live-without-per-surface-APPROVE` | Remove or set to shipped |

Pointing DRAFT `canonical` / `og:url` at live `s1r1us.ai` while the pack is not the live front door is a **Security HOLD** risk (false ship signal / SEO confusion).

## Favicon metadata

Pack `images/favicon.svg` `<title>` / `<desc>` must stay aligned with SIM-locked / NFA / education posture. Do **not** restore “trading bots” or “bitcoin accumulation” agent language in SVG metadata.

## Re-gate (2026-09-27)
Security **SECURE** + Sensei **PASS** on tip `f5af0e3` apply to this **DRAFT** pack deposit only. Not live clearance. Canonical/OG remain withheld until human APPROVE per surface + explicit live wire.
