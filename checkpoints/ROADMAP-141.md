# Lab 3 sandbox roadmap — checkpoint 141

> **Sensei living roadmap:** see [`ops/sensei/ROADMAP.md`](../ops/sensei/ROADMAP.md) for the Sensei Bot App version (Checkpoint 152+). This file remains the historical checkpoint-141 public note. Prior content below is preserved.

Paper desk only. This file is the sandbox public note. It does not write https://s1r1us.ai.

## Now

- Live public tape is display only.
- 7-B0T CLIP still requires two-lane HIGH + 7 ON + bots 1–6 ON.
- 9-B0T sleeve add is user Approve or Deny. AUTO does not fire.
- Jev is an outer operator hook (`ops/outer-jev/`). It does not sit inside `src/`.
- Coinbase create stays locked. Never sell. Never short.

## Next (paper)

- Finish stripping leftover in-src Jev callers on the desk branch before that branch merges.
- Keep `npm run scan:jev` on every proposed patch.
- Optional TypeSafe key only in `~/.s1r1us/outer-jev.env`. Missing key = HOLD.

## Not this desk

- No live Coinbase create.
- No sell tool.
- No FAQ written by an agent.
- No host SOL receive.

## Sensei version (checkpoint 152+)

Summary of Sensei Bot App baseline items (detail in [`ops/sensei/ROADMAP.md`](../ops/sensei/ROADMAP.md)):

- Sensei Bot App package under `ops/sensei/` (ops-only; never imported by `src/`)
- Sensei Bot id `d40cd9e7-579d-4fc6-b860-60143c9d0b42` oversights standards; interfaces with Grok Bot, Desk Steward, Copilot patches
- Communication standards a+b+c (glossary + Lab 3 operational drift + checkable meaning)
- Checkpoint 152 (**pending PR #6**, not on main yet): preserve full desk; Approve gated on `nineCall` yes && `needsCoord` && `action === ACCUMULATE`; `jevOutsideApp: 100`
- Full admin detail visibility protocol (`ops/sensei/ADMIN-DETAIL.md`)
- Logic / workflow Mermaid diagrams (`ops/sensei/flows/`)
- Sensei version functionality + baseline for all future S1R1US projects
- Never sell / never short / Coinbase create locked / no FAQ by agent / no size picking by agent (unchanged)
