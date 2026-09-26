# Sensei Bot App

**Baseline standards guardian for all S1R1US projects.**

Sensei Bot App is the portable paper-only standards package that every S1R1US project inherits: glossary, roadmap, logic flows, admin detail protocol, and bot interface rules. It lives under `ops/sensei/` — operator documentation only. Nothing here is imported by `src/`. Nothing here writes to [s1r1us.ai](https://s1r1us.ai).

| Field | Value |
| --- | --- |
| Sensei Bot id | `d40cd9e7-579d-4fc6-b860-60143c9d0b42` |
| Role | Grok Bot teammate — standards oversight |
| Scope today | Lab 3 sandbox paper desk only |
| Package home | `ops/sensei/` (same ops pattern as `ops/outer-jev/`) |

## What this is

Sensei Bot App defines the **a+b+c communication standards** (glossary + Lab 3 operational drift + checkable meaning) so every bot, patch, and steward audit speaks the same language. It does **not** run desk logic, pick sizes, sell, short, write FAQ copy, or hold TypeSafe keys.

Current instantiation: **Lab 3 visible sandbox** — paper trading desk for testing S1R1US.ai desk ideas. Coinbase create stays locked. Never sell. Never short. Tape is display only.

## How Sensei interfaces

| Partner | Relationship |
| --- | --- |
| **Grok Bot** | Primary teammate; Sensei reviews proposals against glossary, roadmap, and locks before merge path continues. |
| **Lab 3 Desk Steward** | Mandate and inventory authority on the desk; Sensei defers desk-runtime audits to Steward after standards review. |
| **GitHub Copilot / patch agents** | Propose code; Sensei + outer Jev gate patches; user must say **APPROVE** before merge. |

Sequence (detail in [BOT-INTERFACE.md](./BOT-INTERFACE.md)):

1. Bot or agent **proposes** a change.
2. **Sensei** reviews against glossary, roadmap, and hard locks.
3. If the change touches the desk, **Steward** runs mandate audit.
4. User says **APPROVE** for merge. No key / no APPROVE = **HOLD**.

## Documentation map

| Doc | Purpose |
| --- | --- |
| [APP.md](./APP.md) | Portable baseline package definition |
| [GLOSSARY.md](./GLOSSARY.md) | a+b+c standards + Lab 3 terms |
| [ROADMAP.md](./ROADMAP.md) | Living Sensei-version roadmap (phases Now / Next / Later / Never) |
| [ADMIN-DETAIL.md](./ADMIN-DETAIL.md) | Max-detail PASS / HOLD / FAIL report protocol |
| [BOT-INTERFACE.md](./BOT-INTERFACE.md) | How Sensei aligns other S1R1US bots |
| [flows/INDEX.md](./flows/INDEX.md) | Logic and workflow diagrams (Mermaid) |

Legacy desk design assets (still valid for desk bots):

- `public/admin-media/S1R1US-bot-functions-flowchart.png`
- `public/admin-media/S1R1US-full-logic-diagram.png`

## Hard scope

- **Lab 3 paper desk only** until a new project explicitly inherits this baseline.
- Do **not** modify `src/` desk runtime for Sensei (no decision logic, no TypeSafe keys in `src/`).
- Do **not** weaken `drift-lock`, `shared-security`, or mandate gates.
- Do **not** touch live s1r1us.ai from this work.
- Outer Jev stays in `ops/outer-jev/`. Missing TypeSafe key = **HOLD**.

## Related ops

- Outer Jev: [`ops/outer-jev/`](../outer-jev/) — `scan-runtime.mjs`, `QUESTIONS.md`, `CONFIG.md` (**pending PR #6** on `main`)
- Checkpoint roadmap note: [`checkpoints/ROADMAP-141.md`](../../checkpoints/ROADMAP-141.md)
