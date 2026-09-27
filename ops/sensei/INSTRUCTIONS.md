# Instruction module — Sensei / system admin (private)

Ops-only. Never imported by `src/`. Not FAQ. Not the public Roadmap. Not live s1r1us.ai public docs.

Public instruction remains [`public/sandbox-original/INSTRUCTIONS.md`](../../public/sandbox-original/INSTRUCTIONS.md). This file is the private / agent-facing module after Checkpoint 152.

## Stamp

- **In force on `main`:** [PR #6](https://github.com/S1R1US-AI/lab3-visible-sandbox/pull/6) `24b80a6`; [PR #10](https://github.com/S1R1US-AI/lab3-visible-sandbox/pull/10) `score-patch.mjs` `5346feb`.
- **Checkpoint:** [`checkpoints/CHECKPOINT-152.md`](../../checkpoints/CHECKPOINT-152.md)
- **Desk:** Lab 3 paper sandbox only. Do not write https://s1r1us.ai.

## Video / analysis script (admin tab)

1. Open analysis. Confirm stamp date/time + S1R1US.ai Proprietary on Figure 1 and Figure 2.
2. Read Figure 2 top-to-bottom: research 1-6, then 7/8/9, then G0, PR3DICTION$, BTC VACUUM, P@MP.fun as their own rows.
3. Read PATH TO FULL SYSTEM AWARENESS including GO-6 Neural Network (10 external AI agents). If a gate or trigger changed, restamp both figures before leaving the desk.
4. MEDIA library holds the same files for download. Public pages must not receive them.
5. Run Research security function on this tab. PASS only may feed Agent 9. REJECT is dropped.
6. Confirm figures and captions do **not** treat Jev as an in-desk scorer. Retired labels: `sleeve_add_allowed`, `jevScope`, `scoreSleeveAdd`, in-app Jev panel. Current contract: `jevOutsideApp: 100`.

## Agent / bot standing orders

1. Propose on a branch. Never silent-merge to `main`.
2. Sensei reviews against [GLOSSARY.md](./GLOSSARY.md), [ROADMAP.md](./ROADMAP.md), and hard locks.
3. Run `node ops/outer-jev/scan-runtime.mjs`. Leak of Jev into `src/` is FAIL.
4. If `$TYPESAFE_API_KEY` exists, score the *patch* with [outer questions](../outer-jev/QUESTIONS.md): `patch_touches_sell_path`, `patch_weakens_a_lock`, `patch_writes_faq_or_size`, `patch_on_mandate`. Cutoff 0.70. No key = HOLD.
5. Steward mandate audit if desk / locks are touched.
6. User must say **APPROVE \<pr\>** before merge. **DISAPPROVE \<pr\>** stops the patch.
7. Do not pick size. Do not write FAQ copy. Do not add a sell or short path. Do not unlock Coinbase create.

## Hard locks (in force)

neverSell · neverShort · paperOnly · createLocked · sleeveCap · twoLane · makerChecker · liveTape · jevOutsideApp = 100

## What Jev is now

| Was (Checkpoint 139, superseded) | Is (Checkpoint 152, on main) |
| --- | --- |
| In-app `sleeve_add_allowed` score | Retired from `src/` |
| `jevScope` drift lock | Replaced by `jevOutsideApp: 100` |
| TypeSafe called from the desk | TypeSafe only in operator env, optional |
| Jev panel on the desk | No Jev UI in the product |
| Scores the live tape / sleeve add | Scores the *coding agent / patch* |

## Related

- [Sensei home](./README.md) · [BOT-INTERFACE.md](./BOT-INTERFACE.md) · [ADMIN-DETAIL.md](./ADMIN-DETAIL.md)
- Outer Jev: [`ops/outer-jev/`](../outer-jev/)
- Flows: [07-lab3-bot-workflow](./flows/07-lab3-bot-workflow.md) (canonical) · [04-outer-jev-patch-gate](./flows/04-outer-jev-patch-gate.md) · [03-lab3-maker-checker](./flows/03-lab3-maker-checker.md)
- [INSTRUMENTATION.md](./INSTRUMENTATION.md) · [SEARCH-SCHEMA.md](./SEARCH-SCHEMA.md)
