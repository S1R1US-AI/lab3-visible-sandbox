# Sensei flows — index

Professional Mermaid workflows for Sensei Bot App. These diagrams are **ops documentation**; they are not imported by `src/`.

| # | Flow | File |
| --- | --- | --- |
| 01 | Sensei oversight of other bots | [01-sensei-oversight.md](./01-sensei-oversight.md) |
| 02 | Standards adherence loop | [02-standards-adherence.md](./02-standards-adherence.md) |
| 03 | Lab 3 maker-checker (nineCall + Approve/Deny) | [03-lab3-maker-checker.md](./03-lab3-maker-checker.md) |
| 04 | Outer Jev patch gate (hard rules + scan-runtime + score-patch) | [04-outer-jev-patch-gate.md](./04-outer-jev-patch-gate.md) |
| 05 | New projects inherit Sensei Bot App | [05-sensei-app-baseline.md](./05-sensei-app-baseline.md) |
| 06 | Admin detail disclosure | [06-admin-visibility.md](./06-admin-visibility.md) |
| 07 | **Lab 3 bot workflow (canonical)** | [07-lab3-bot-workflow.md](./07-lab3-bot-workflow.md) |

Flow **07** is the primary handoff: propose → Sensei → Outer Jev (`scan-runtime.mjs` + optional `score-patch.mjs`) → Steward (if desk) → user APPROVE. Skill: `lab-3-sensei-workflow`.

## Companion Sensei modules

- [SEARCH-SCHEMA.md](../SEARCH-SCHEMA.md) — checkable search/index vocabulary (PASS/HOLD/FAIL, locks, outer Jev, maker-checker)
- [INSTRUMENTATION.md](../INSTRUMENTATION.md) — scan-runtime / score-patch exit codes for admin reports

## Legacy design assets (desk bots)

Still valid visual references for Lab 3 desk bot layout (PNG/GIF under `public/admin-media/`):

- [`public/admin-media/S1R1US-bot-functions-flowchart.png`](../../../public/admin-media/S1R1US-bot-functions-flowchart.png)
- [`public/admin-media/S1R1US-full-logic-diagram.png`](../../../public/admin-media/S1R1US-full-logic-diagram.png)

Prefer Mermaid in `ops/sensei/flows/` for new Sensei/process diagrams; keep the PNGs as historical desk design art. Refresh figures that still show retired 01:43 `jevScope` / `sleeve_add_allowed` labels.

## Parent docs

- [Sensei home](../README.md) · [ROADMAP](../ROADMAP.md) · [GLOSSARY](../GLOSSARY.md) · [ADMIN-DETAIL](../ADMIN-DETAIL.md) · [BOT-INTERFACE](../BOT-INTERFACE.md)
