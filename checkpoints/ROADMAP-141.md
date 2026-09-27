# Lab 3 sandbox roadmap — checkpoint 141

> **Sensei living roadmap:** see [`ops/sensei/ROADMAP.md`](../ops/sensei/ROADMAP.md) for the Sensei Bot App version (Checkpoint 152+). This file remains the historical checkpoint-141 public note. Prior content below is preserved.
>
> **Accuracy (2026-09-26):** Checkpoint 152 / `ops/outer-jev/` **are on `main`** via [PR #6](https://github.com/S1R1US-AI/lab3-visible-sandbox/pull/6) (`24b80a6`) after user APPROVE 6. See [`CHECKPOINT-152.md`](./CHECKPOINT-152.md).

Paper desk only. This file is the sandbox public note. It does not write https://s1r1us.ai.

## Now

- Live public tape is display only.
- 7-B0T CLIP still requires two-lane HIGH + 7 ON + bots 1–6 ON.
- 9-B0T sleeve add is user Approve or Deny. AUTO does not fire.
- Jev is an outer operator hook (`ops/outer-jev/`). It does not sit inside `src/`.
- Coinbase create stays locked. Never sell. Never short.
- `jevOutsideApp: 100` is in force on `main`.

## Next (paper)

- Keep `node ops/outer-jev/scan-runtime.mjs` on every proposed patch.
- Optional TypeSafe key only in operator env / `~/.s1r1us/outer-jev.env`. Missing key = HOLD.
- Refresh Library / `public/admin-media` figures so they no longer display retired `jevScope` / `sleeve_add_allowed` labels. 01:43 EDT assets are historical.
- User **APPROVE \<pr\>** still required before any later merge to main.

## Not this desk

- No live Coinbase create.
- No sell tool.
- No FAQ written by an agent.
- No host SOL receive.
- No in-app Jev.

## Sensei version (checkpoint 152+)

Summary of Sensei Bot App baseline items (detail in [`ops/sensei/ROADMAP.md`](../ops/sensei/ROADMAP.md)):

- Sensei Bot App package under `ops/sensei/` (ops-only; never imported by `src/`)
- Sensei Bot id `d40cd9e7-579d-4fc6-b860-60143c9d0b42` oversights standards; interfaces with Grok Bot, Desk Steward, Copilot patches
- Communication standards a+b+c (glossary + Lab 3 operational drift + checkable meaning)
- Checkpoint 152 **on main**: preserve full desk; Approve gated on `nineCall` yes && `needsCoord` && `action === ACCUMULATE`; `jevOutsideApp: 100`
- Full admin detail visibility protocol (`ops/sensei/ADMIN-DETAIL.md`)
- Instruction module: public `public/sandbox-original/INSTRUCTIONS.md` + private `ops/sensei/INSTRUCTIONS.md`
- Logic / workflow Mermaid diagrams (`ops/sensei/flows/`)
- Sensei version functionality + baseline for all future S1R1US projects
- Never sell / never short / Coinbase create locked / no FAQ by agent / no size picking by agent (unchanged)

## Sensei Bot App (living)

See [`ops/sensei/ROADMAP.md`](../ops/sensei/ROADMAP.md) and canonical bot workflow [`ops/sensei/flows/07-lab3-bot-workflow.md`](../ops/sensei/flows/07-lab3-bot-workflow.md).
