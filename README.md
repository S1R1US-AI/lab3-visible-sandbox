# Lab 3

Paper trading desk for S1R1US. Not the live site at s1r1us.ai.

Coinbase create stays locked. The desk does not sell the stack.

The older clickable still is in `snapshot/clickable-still.html`.

## Sensei Bot App

**Sensei** is the baseline standards guardian for S1R1US projects (Grok Bot teammate). Lab 3 is the first instantiation — paper desk sandbox only.

| | |
| --- | --- |
| Package (ops-only) | [`ops/sensei/`](./ops/sensei/README.md) |
| Living roadmap | [`ops/sensei/ROADMAP.md`](./ops/sensei/ROADMAP.md) |
| Glossary (a+b+c) | [`ops/sensei/GLOSSARY.md`](./ops/sensei/GLOSSARY.md) |
| Instruction module | [`ops/sensei/INSTRUCTIONS.md`](./ops/sensei/INSTRUCTIONS.md) |
| Flows | [`ops/sensei/flows/INDEX.md`](./ops/sensei/flows/INDEX.md) · canonical [07](./ops/sensei/flows/07-lab3-bot-workflow.md) |
| Search / instrumentation | [`SEARCH-SCHEMA.md`](./ops/sensei/SEARCH-SCHEMA.md) · [`INSTRUMENTATION.md`](./ops/sensei/INSTRUMENTATION.md) |
| Outer Jev companion | [`ops/outer-jev/`](./ops/outer-jev/) — PR #6; [`score-patch.mjs`](./ops/outer-jev/score-patch.mjs) PR #10 |
| Public Sensei stub | [`public/sensei-roadmap.html`](./public/sensei-roadmap.html) |
| Checkpoint 152 | [`checkpoints/CHECKPOINT-152.md`](./checkpoints/CHECKPOINT-152.md) |

Sensei docs live under `ops/` like outer Jev. They are never imported by `src/`. They do not unlock Coinbase create, sell, or short.

## Architecture after Checkpoint 152

- Jev is **outside** the running desk. `src/` does not import Jev, does not call TypeSafe, and does not score `sleeve_add_allowed`.
- Sleeve adds are maker-checker only. The user must click **Approve**. AUTO does not fire.
- Hard locks stay in `src/lib/drift-lock.ts`: neverSell, neverShort, paperOnly, createLocked, sleeveCap, twoLane, makerChecker, liveTape, **jevOutsideApp: 100**.
- Outer Jev scores *patches / coding agents* (`ops/outer-jev/QUESTIONS.md`). No TypeSafe key = HOLD. No user **APPROVE** = no merge.
- Do not write https://s1r1us.ai from this repo.
