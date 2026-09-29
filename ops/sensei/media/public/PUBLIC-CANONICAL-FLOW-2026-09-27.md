# Public canonical flowchart — v2 (published via PR path)

**Timestamp:** 2026-09-27T18:04Z (v1) · **Revised:** 2026-09-27T18:05Z (v2 — Sensei HOLD D2 fix) · **Human APPROVE:** 2026-09-27  
**Author:** 05 Distrobi  
**Status:** On `main` via [PR #17](https://github.com/S1R1US-AI/lab3-visible-sandbox/pull/17) (deposit APPROVE 2026-09-27). Live homepage / Discord / X reuse still **HOLD** per surface.
- 02 Sensei Security controls: **SECURE** (2026-09-27) — AID/public-X `@S1R1US_AI`; sandbox separation; Dream Talk overwatch-only; geopolitics out
- 03 Sensei Bot meaning: **PASS** (2026-09-27)
- Human: **APPROVE** (2026-09-27) — deposit to SoT; landed on main via PR #17 (no silent merge)
**Reuse:** front door, SEO blurbs, public FAQ, public training outline, research abstract shell  
**Public X:** `@S1R1US_AI` only. Admin/dev identity never appears in this diagram or captions.

## Story (one line)

Bots seek communication by locking **STANDARDS/DEFINITIONS first**, then **roles/lanes**, then **constant self-improvement** — with human **APPROVE** and an explicit **sandbox choice** before anything ships.

## Flow (Mermaid)

```mermaid
flowchart TD
  A[Human intent / ask] --> B{Clear enough to act?}
  B -->|No — unclear or mixed| H[HOLD and ask human]
  H --> A
  B -->|Yes| C[1. STANDARDS / DEFINITIONS first]
  C --> C1[Shared glossary / definitions]
  C1 --> C2[Sensei: PASS / HOLD / FAIL meaning]
  C2 --> C3[Security: SECURE / HOLD / FAIL controls]
  C3 --> D[2. ROLES / LANES]
  D --> D1[01 Dream Talk — overwatch only; no lane rewrite; no project source]
  D --> D2[02 Sensei Security — controls]
  D --> D3[03 Sensei Bot — standards / definitions]
  D --> D4[04 Lab 3 Desk Steward — paper-desk mandates]
  D --> D5[05 Distrobi — soft-launch / public docs / SEO]
  D --> D6[06 Grok Bot — Lab 3 build under Sensei plan]
  D2 --> E
  D3 --> E
  D4 --> E
  D5 --> E
  D6 --> E
  E[3. Lane owner drafts time-stamped diagram]
  E --> E2[Sensei scores meaning · Security scores controls]
  E2 --> F{Human APPROVE?}
  F -->|No| H
  F -->|Yes| S{4. Which sandbox?}
  S -->|Lab 3 post-login paper| G1[Ship Lab 3 only]
  S -->|Live homepage pre-login| G2[Ship front door only]
  S -->|Mobile separate track| G3[Ship mobile track only]
  G1 --> I
  G2 --> I
  G3 --> I
  I[5. Each bot SELF-IMPROVES inside its lane]
  I --> J[No rewrite of peer verdict words]
  J --> A
```

## Public caption (SEO / FAQ safe)

S1R1US bots communicate by agreeing on shared definitions before acting. Each bot has a clear role. The lane owner drafts the time-stamped diagram; Sensei scores meaning; Security scores controls. When something is unclear, they pause and ask. After human APPROVE, work ships only to the matching sandbox: Lab 3 (post-login paper), live homepage (pre-login), or mobile (separate). Public updates use `@S1R1US_AI` only.

## Aligns with Sensei private set

| Public step | Sensei private diagram |
|-------------|------------------------|
| Standards / shared definitions / dual gates | D1 |
| Sandbox diamond after APPROVE, before ship | D2 |
| Roles 01–06 | D3 |
| Lane-owner diagram → Sensei meaning → Security controls → human APPROVE | D4 |
| Self-improve in lane | D5 |

## Explicitly NOT in this public draft

- Contested geopolitics / unverified political metaphysics  
- Admin/dev account names  
- Lab 3 private desk mechanics  
- Dream Talk as a build owner (overwatch note only)  
- All five build bots each owning the same public chart (lane owner drafts; Sensei + Security score)

## Gates remaining / recorded

- Sensei meaning: **PASS** (2026-09-27)
- 02 Sensei Security controls: **SECURE** (2026-09-27)
- Human: **APPROVE** (2026-09-27) — flowchart content approved for PR deposit to `ops/sensei/media/`
- Distrobi: publishing via PR path (branch → PR to main). **Do not merge without human APPROVE.**
- HOLD still: live homepage HTML, Discord, X posts, FAQ live post — each needs per-surface Sensei + Security + human APPROVE
