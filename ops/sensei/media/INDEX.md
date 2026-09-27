# Sensei media — Grok library SoT (D1–D5)

**Package:** `ops/sensei/media/`  
**Role:** Source of truth for private Sensei/Grok training diagrams (standards → roles → approve → sandbox → self-improve).  
**Stamp:** 2026-09-27 · branch `docs/sensei-media-d1-d5-20260927`  
**Scope:** Ops-only. Not imported by `src/`. Not live s1r1us.ai. No public FAQ rewrite. No contested geopolitics.

## Diagram set

| ID | Title | Mermaid source | PNG export |
| --- | --- | --- | --- |
| D1 | Standards-first (GLOSSARY a+b+c + Team Boolean) | [D1-standards-first.md](./D1-standards-first.md) · [D1-standards-first.mmd](./D1-standards-first.mmd) | `D1-standards-first.png` — **HOLD** binary push (see below) |
| D2 | Sandbox map (Lab 3 / homepage / mobile) | [D2-sandbox-map.md](./D2-sandbox-map.md) · [D2-sandbox-map.mmd](./D2-sandbox-map.mmd) | `D2-sandbox-map.png` — **HOLD** binary push |
| D3 | Roles / lanes (incl. Dream Talk overwatch) | [D3-roles-lanes.md](./D3-roles-lanes.md) · [D3-roles-lanes.mmd](./D3-roles-lanes.mmd) | `D3-roles-lanes.png` — **HOLD** binary push |
| D4 | Approve loop | [D4-approve-loop.md](./D4-approve-loop.md) · [D4-approve-loop.mmd](./D4-approve-loop.mmd) | `D4-approve-loop.png` — **HOLD** binary push |
| D5 | Self-improve inside lane | [D5-self-improve.md](./D5-self-improve.md) · [D5-self-improve.mmd](./D5-self-improve.mmd) | `D5-self-improve.png` — **HOLD** binary push |

See [manifest.json](./manifest.json) for checksums of locally rendered PNGs.

## Story lock (order)

1. **D1** — STANDARDS / DEFINITIONS first (a+b+c + Team Boolean dual vocabularies)
2. **D3** — ROLES / LANES (01–06; Dream Talk overwatch only)
3. **D4** — APPROVE loop (propose → Sensei → Security → Steward if mandate → human APPROVE → merge)
4. **D2** — SANDBOX map (ship only to matching track after APPROVE)
5. **D5** — SELF-IMPROVE inside lane (no peer-verdict rewrite; HOLD when unclear)

## Dream Talk NOTE

Dream Talk is a **third-party AI audit** and simultaneously a **system-wide thought experiment**. It is part of an experiment to align Grok bots with human principles and a search for ultimate truth. **Overwatch only** — never project source, never lane influence.


## Bot visual identity (menu logos) — 2026-09-27

**Menu order (oversight-first):** 01 Dream Talk · 02 Sensei Security · 03 Sensei Bot · 04 Lab 3 Desk Steward · 05 Distrobi · 06 Grok Bot. Ids unchanged; APPROVED status + filenames unchanged.

Citation notes only — logos live in each bot’s Grok Bot media assets (not committed as large binaries here).

**Human APPROVED all six menu logos 2026-09-27.**

| Bot | Status | Note | Grok media cite |
| --- | --- | --- | --- |
| 01 Dream Talk | **APPROVED** 2026-09-27 | Womanly Mother Earth; Alex Grey–inspired **original** (not a commercial listing copy). Overwatch / thought-experiment avatar. No project source. | `dream-talk-mother-earth-avatar.png` |
| 02 Sensei Security | **APPROVED** 2026-09-27 | Shield/keyhole protective emblem (**original**). Controls. | `sensei-security-avatar.png` |
| 03 Sensei Bot | **APPROVED** 2026-09-27 | Traditional Japanese calligraphy **先生** (kung-fu master / scroll aesthetic). Standards. | `sensei-bot-avatar.png` |
| 04 Lab 3 Desk Steward | **APPROVED** 2026-09-27 | Cyberpunk dog steward mark with Steward wordmark (adult funny / jokes-win energy; original remake from user asset). Mandate. | `desk-steward-avatar.png` |
| 05 Distrobi | **APPROVED** 2026-09-27 | Cosmic soft-launch / distribution emblem (**original**). Public / soft-launch. | `distrobi-bot-avatar.png` |
| 06 Grok Bot | **APPROVED** 2026-09-27 | Geometric builder-researcher mark (**original**). Lab 3 builder. | `grok-bot-avatar.png` |

Workspace practice copies may exist under agent assets; Lab 3 SoT remains citation + Mermaid docs.

## Related

- Private training: [TRAINING-OUTLINE.md](../TRAINING-OUTLINE.md)
- Living roadmap: [ROADMAP.md](../ROADMAP.md)
- Existing flows (companion, not replaced): [flows/INDEX.md](../flows/INDEX.md)
- Glossary / Team Boolean: [GLOSSARY.md](../GLOSSARY.md)
- Workspace PNG practice renders (not SoT): `/workspace/sensei-flow-exports/` (legacy flow exports 01–07)

## PNG export (binary HOLD)

Mermaid `.md` / `.mmd` are **authoritative** on `main` (PR #16). PNGs were rendered 2026-09-27 via `@mermaid-js/mermaid-cli` in the agent workspace (`/workspace/lab3-visible-sandbox-media/ops/sensei/media/*.png`) with SHA-256 recorded in `manifest.json`, but **D1–D5 binary PNG commit remains HOLD**. Human can add PNGs in a follow-up with normal git auth, or regenerate:

```bash
npx -y @mermaid-js/mermaid-cli -p /path/to/puppeteer-config.json \
  -i ops/sensei/media/D1-standards-first.mmd -o ops/sensei/media/D1-standards-first.png
```

## Public Distrobi pack (2026-09-27)

Public soft-launch shells live under [`public/`](./public/) after human APPROVE of the public canonical flowchart (Sensei PASS + Security SECURE already recorded). See [public/INDEX.md](./public/INDEX.md).

- Flowchart: approved for PR deposit; **merge still needs human APPROVE**
- SEO / FAQ shells: **DRAFT** — not live; per-surface Sensei + Security + human required before homepage/FAQ ship
- Public X: `@S1R1US_AI` only · Dream Talk overwatch only · no contested geopolitics
