# Lab 3 self-correcting desk locks

Process note for lab3-bot automation. Not FAQ marketing.

- **Four-hour lock check**: run `npm run test:desk` (and typecheck) on a schedule; fail closed on mandate / drift / coined-noun regressions.
- **Daily cleanup**: opens a PR only. Never merges to `main`. Never force-pushes `main`.
- **Weekday morning review**: human review before any merge to `main`.
- **Jev HOLD without key**: if `TYPESAFE_API_KEY` is unset, scoring stays `HOLD` / `unconfigured`. Do not invent a key or fake Jev.
- **Locks are TypeScript fail functions**: `assertNeverSell` / `assertNeverShort` in `src/lib/mandate-fail.ts` must reject sell/short intents on mutate paths. Prose flags alone are not locks.
- **Hard rules**: never sell the core BTC stack; never short; Coinbase create stays locked.
