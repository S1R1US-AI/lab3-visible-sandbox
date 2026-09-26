# Sensei Bot App — portable baseline package

Sensei Bot App is the **portable standards baseline** that any new S1R1US project starts from. It is documentation and protocol only: glossary, roadmap, flow diagrams, admin detail format, and bot interface sequence. It is not a runtime dependency of the desk.

## Package contents

```
ops/sensei/
├── README.md           # Studio landing + scope
├── APP.md              # This file — portable baseline definition
├── GLOSSARY.md         # Standards a+b+c + Lab 3 terms
├── ROADMAP.md          # Sensei-version living roadmap
├── ADMIN-DETAIL.md     # Max-detail PASS/HOLD/FAIL protocol
├── BOT-INTERFACE.md    # Sensei ↔ other bots sequence
└── flows/              # Mermaid logic + workflow diagrams
    ├── INDEX.md
    ├── 01-sensei-oversight.md
    ├── 02-standards-adherence.md
    ├── 03-lab3-maker-checker.md
    ├── 04-outer-jev-patch-gate.md
    ├── 05-sensei-app-baseline.md
    └── 06-admin-visibility.md
```

Companion ops (not part of the Sensei package root, but required on Lab 3):

- `ops/outer-jev/` — outer Jev questions, config, `scan-runtime.mjs`

## First instantiation: Lab 3

Lab 3 visible sandbox is the **first project** that instantiates Sensei Bot App:

- Paper desk only; tape display only.
- Never sell / never short / Coinbase create locked.
- Maker-checker sleeve adds; outer Jev outside `src/`.
- Sensei Bot id `d40cd9e7-579d-4fc6-b860-60143c9d0b42` oversees standards while Desk Steward owns mandate inventory on the desk.

## How a new project inherits Sensei

1. Copy or submodule the `ops/sensei/` tree into the new repo (or link the canonical Lab 3 copy until a shared package exists).
2. Keep Sensei **ops-only** — never import into application `src/`.
3. Extend [GLOSSARY.md](./GLOSSARY.md) with project-specific terms; do not redefine Lab 3 locks away.
4. Add a project phase under [ROADMAP.md](./ROADMAP.md) **Later (new projects)**; do not move “Never on this desk” items onto a paper Lab 3 desk.
5. Wire [BOT-INTERFACE.md](./BOT-INTERFACE.md) so propose → Sensei review → steward/mandate audit → user APPROVE remains the merge path.
6. Require admin reports in [ADMIN-DETAIL.md](./ADMIN-DETAIL.md) form.

## What Sensei Bot App never includes

- Sell tools, short paths, or live Coinbase create unlocks for Lab 3.
- TypeSafe / API keys in the repo or in `src/`.
- FAQ writing or trade-size picking by agents.
- Decision logic that replaces desk gates in `src/lib/` (mandates, drift-lock, shared-security).

## Version functionality (Sensei version)

“Sensei version” means the living documentation revision tracked in [ROADMAP.md](./ROADMAP.md) and pointed from `checkpoints/ROADMAP-141.md`. Checkpoint 152+ items (Approve gate, `jevOutsideApp: 100`, Sensei oversight, admin detail, flows) are part of the Sensei version baseline, not optional footnotes.
