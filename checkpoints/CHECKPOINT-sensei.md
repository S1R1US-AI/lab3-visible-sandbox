# Checkpoint — Sensei Bot App baseline

Paper only. Does not write https://s1r1us.ai. No `src/` Sensei decision logic.

## Stamp

- **Landed on `main`:** Sensei package via PR #7; Checkpoint 152 / outer Jev via [PR #6](https://github.com/S1R1US-AI/lab3-visible-sandbox/pull/6) (`24b80a6`, user APPROVE 6).
- **Outer score-patch on `main`:** [PR #10](https://github.com/S1R1US-AI/lab3-visible-sandbox/pull/10) (`5346feb`, user APPROVE).
- **Bot workflow + schema/instrumentation on `main`:** [PR #11](https://github.com/S1R1US-AI/lab3-visible-sandbox/pull/11) (`83791e3`) — [flows/07](../ops/sensei/flows/07-lab3-bot-workflow.md), SEARCH-SCHEMA, INSTRUMENTATION.
- **Package:** `ops/sensei/`
- **Bot id:** `d40cd9e7-579d-4fc6-b860-60143c9d0b42`
- **Instruction module:** [`ops/sensei/INSTRUCTIONS.md`](../ops/sensei/INSTRUCTIONS.md) (private) + [`public/sandbox-original/INSTRUCTIONS.md`](../public/sandbox-original/INSTRUCTIONS.md) (public)
- **Current contract:** Checkpoint 152 is **in force**. Outer Jev + score-patch are on `main`. In-app Jev is retired. Canonical handoff is flows/07.

## Delivered

- Sensei studio docs: README, APP, GLOSSARY, ROADMAP, INSTRUCTIONS, ADMIN-DETAIL, BOT-INTERFACE
- Flows 01–07 + INDEX (Mermaid); canonical [07](../ops/sensei/flows/07-lab3-bot-workflow.md)
- [SEARCH-SCHEMA.md](../ops/sensei/SEARCH-SCHEMA.md) · [INSTRUMENTATION.md](../ops/sensei/INSTRUMENTATION.md)
- Pointer from `checkpoints/ROADMAP-141.md` (prior content preserved)
- Root README Sensei section → living [`ops/sensei/ROADMAP.md`](../ops/sensei/ROADMAP.md)
- Outer Jev tree under `ops/outer-jev/` (`scan-runtime.mjs`, `score-patch.mjs`, QUESTIONS, CONFIG)
- `npm run scan:jev` / `npm run score:patch` scripts (score:patch needs `-- --state` + key)
- Admin-media historical note: [`public/admin-media/RETIRED-LABELS.md`](../public/admin-media/RETIRED-LABELS.md)

## Locks unchanged (in force on main today)

- Never sell / never short / Coinbase create locked
- No FAQ / no size picking by agent
- `jevOutsideApp: 100`
- Do not modify mandates / drift-lock / shared-security / desk-logic gates for Sensei

## Next / HOLD

- Steward + Sensei joint audits using ADMIN-DETAIL on every non-trivial PR
- User says **APPROVE** before merge of any later PR
- TypeSafe key remains operator-home only — never commit (HOLD without key for score-patch merges that require it)
- Admin-media PNG art refresh HOLD — retired 01:43 labels documented; do not regenerate binary art unless easy
- Prefer leave remote branches; do not delete unless clearly obsolete and safe

See [`ops/sensei/ROADMAP.md`](../ops/sensei/ROADMAP.md) and [`checkpoints/CHECKPOINT-152.md`](./CHECKPOINT-152.md).
