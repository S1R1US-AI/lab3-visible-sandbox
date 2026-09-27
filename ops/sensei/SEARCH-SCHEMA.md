# Sensei search / index schema (ops-only)

Checkable term map for operators, sitemap stubs, and search indexes. **Not imported by `src/`.** Does not write live s1r1us.ai. Prefer short queries that resolve to a named file.

## Schema shape (operator JSON-LD–style record)

Use one record per indexed doc (operators may emit as `application/ld+json` offline):

| Field | Type | Meaning |
| --- | --- | --- |
| `@type` | string | `TechArticle` or `HowTo` |
| `name` | string | Doc title |
| `url` | string | GitHub blob URL under `ops/sensei/` or `public/sensei-roadmap.html` |
| `keywords` | string[] | From the controlled vocabulary below |
| `isPartOf` | string | `Sensei Bot App` |
| `version` | string | Cite [ROADMAP.md](./ROADMAP.md) Sensei version / HEAD |

Public stub (served from this repo’s `public/`): [`/sensei-roadmap.html`](../../public/sensei-roadmap.html) → GitHub blobs. `ops/` itself is **not** a public site root.

## Controlled vocabulary

| Term | Meaning | Primary cite |
| --- | --- | --- |
| `PASS` | Provisional or final clear to next gate | [ADMIN-DETAIL.md](./ADMIN-DETAIL.md) · [INSTRUMENTATION.md](./INSTRUMENTATION.md) |
| `HOLD` | Stop merge until key / APPROVE / scan / clarification | GLOSSARY · INSTRUMENTATION |
| `FAIL` | Hard stop; remediation required | ADMIN-DETAIL |
| `maker-checker` | Propose (maker); human Approve/Deny (checker); AUTO does not fire | [flows/03](./flows/03-lab3-maker-checker.md) |
| `outer Jev` | Ops-only patch scorer; never in `src/` | [`ops/outer-jev/`](../outer-jev/) |
| `scan-runtime` | Leak scanner `scan-runtime.mjs` | INSTRUMENTATION · flows/04 |
| `score-patch` | Optional four-noul scorer `score-patch.mjs` (PR #10) | INSTRUMENTATION · flows/04 · flows/07 |
| `hard rules` | No-model locks before any Jev call | QUESTIONS.md · flows/04 |
| `never-sell` / `never-short` / `createLocked` | Paper locks | GLOSSARY · drift-lock |
| `jevOutsideApp` | Architecture contract = 100; in-app Jev retired | Checkpoint 152 |
| `APPROVE` | User merge gate; Sensei never substitutes | BOT-INTERFACE · flows/07 |
| `Steward` | Desk mandate / inventory audit when desk touched | BOT-INTERFACE |
| `lab-3-sensei-workflow` | Skill name for this handoff | flows/07 |
| `glossary a+b+c` | Communication standards | [GLOSSARY.md](./GLOSSARY.md) |

## Index targets (priority)

1. [flows/07-lab3-bot-workflow.md](./flows/07-lab3-bot-workflow.md) — canonical handoff  
2. [ROADMAP.md](./ROADMAP.md) · [GLOSSARY.md](./GLOSSARY.md) · [BOT-INTERFACE.md](./BOT-INTERFACE.md)  
3. [INSTRUMENTATION.md](./INSTRUMENTATION.md) · flows/04 · outer-jev CONFIG/QUESTIONS  
4. Public stub [`public/sensei-roadmap.html`](../../public/sensei-roadmap.html)

## Anti-index

Do not index TypeSafe keys, operator env paths with secrets, or proprietary admin-media logic charts on public FAQ/roadmap pages.
