# Outer Jev configuration — Lab 3 sandbox

Jev is not a product feature inside the running desk.
The app does not import Jev. The app does not call TypeSafe.
Sleeve adds are maker-checker only: the user must click Approve.
AUTO does not fire a sleeve add. No key means HOLD. Paper only.

## Stated goals this config serves

- Maximize BTC accumulation on paper.
- Never sell. Never short.
- Coinbase create stays locked.
- Overlay never votes HIGH.
- Jev never sizes, never writes the FAQ, never sells.
- Tape is display only. This is not a trade instruction.

## Where things live

| Piece | Location | Imported by src/? |
| --- | --- | --- |
| Desk runtime | `src/` | yes |
| Drift / security locks | `src/lib/drift-lock.ts`, `src/lib/shared-security.ts` | yes |
| Outer questions | `ops/outer-jev/QUESTIONS.md` | no |
| Leak scanner | `ops/outer-jev/scan-runtime.mjs` | no |
| Patch scorer (optional) | `ops/outer-jev/score-patch.mjs` | no |
| Operator key | `$TYPESAFE_API_KEY` in the operator home / shell | no |

Do not put `TYPESAFE_API_KEY` in this repo. Do not invent a key.
Do not use OpenJev or other stand-ins.

## Operator steps

1. Keep the key in the operator environment only:
   `export TYPESAFE_API_KEY=...`  (from TypeSafe, never committed)
   Optional gateway (same System One shape):
   `export TYPESAFE_BASE_URL=https://openrouter.ai/api` (or Vercel AI Gateway / Cloudflare)
2. Before a patch lands on `main`, run:
   `node ops/outer-jev/scan-runtime.mjs`
   Fail means Jev leaked back into `src/`. Do not merge.
3. If a key is present, score the *patch / coding agent*:
   `node ops/outer-jev/score-patch.mjs --state state.json`
   Four atomic nouls in one `/v1/systemone` call (see QUESTIONS.md).
   Cutoff 0.70. Under cutoff = HOLD. No key = HOLD / do not merge.
4. Hard rules run with no model at all:
   - never add a sell tool
   - never write the FAQ from an agent
   - never pick a trade size
   - never weaken a lock in drift-lock or shared-security
   - never merge to main without the user saying APPROVE
5. Do not touch https://s1r1us.ai. Do not push S1R1US-LABs from this work.

## Old vs new question

- Old in-desk question `sleeve_add_allowed` is retired from `src/`.
- New outer questions score the patch, not the live tape.
