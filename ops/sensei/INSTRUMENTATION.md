# Instrumentation module — Outer Jev + Sensei reports

Ops-only. What to run, what exit codes mean, and what to cite in [ADMIN-DETAIL.md](./ADMIN-DETAIL.md) reports. Never import into `src/`. Never invent keys. Never OpenJev.

## Tools

| Tool | Command | When |
| --- | --- | --- |
| Hard rules | Manual checklist in [QUESTIONS.md](../outer-jev/QUESTIONS.md) | Always, **before** any model call |
| Leak scan | `node ops/outer-jev/scan-runtime.mjs` | Every proposed patch |
| Patch score | `TYPESAFE_API_KEY=... node ops/outer-jev/score-patch.mjs --state state.json` | When key present (PR #10, `5346feb`) |

Optional gateway (same System One shape; still no key in repo):

```bash
TYPESAFE_BASE_URL=https://openrouter.ai/api TYPESAFE_API_KEY=$OPENROUTER_API_KEY \
  node ops/outer-jev/score-patch.mjs --state state.json
```

## Exit codes

### `scan-runtime.mjs`

| Exit | Meaning | Admin cite |
| --- | --- | --- |
| `0` | PASS — no in-app Jev in `src/` | Quote stdout `PASS · no in-app Jev in src/` |
| `1` | FAIL — Jev leaked into `src/` (or scan error) | FAIL report; do not merge; remediate then re-run |

### `score-patch.mjs`

| Exit | Meaning | Admin cite |
| --- | --- | --- |
| `0` | PASS — four nouls clear cutoff 0.70 | Attach JSON verdict (`verdict: PASS` + answers) |
| `1` | Error (usage, HTTP, fabricated noul) | FAIL / HOLD until fixed; do not invent answers |
| `2` | HOLD — no `TYPESAFE_API_KEY` (or gateway key) | HOLD — no key; do not merge |
| `3` | HOLD — noul cutoff trip | Attach JSON (`verdict: HOLD` + answers); do not merge |

Four atomic nouls in **one** `/v1/systemone` call: `patch_touches_sell_path`, `patch_weakens_a_lock`, `patch_writes_faq_or_size`, `patch_on_mandate` — see [QUESTIONS.md](../outer-jev/QUESTIONS.md).

## What to put in admin reports

1. Lead with **PASS / HOLD / FAIL**.  
2. Cite glossary term + file path (checkable meaning).  
3. Paste scan command + exit code; if scored, paste `score-patch` JSON verdict (no keys).  
4. Diagram link: [flows/07](./flows/07-lab3-bot-workflow.md) and/or [flows/04](./flows/04-outer-jev-patch-gate.md).  
5. Next gate: Steward (if desk) → user **APPROVE**.

## Related

- [flows/07-lab3-bot-workflow.md](./flows/07-lab3-bot-workflow.md) · [BOT-INTERFACE.md](./BOT-INTERFACE.md) · [SEARCH-SCHEMA.md](./SEARCH-SCHEMA.md)
- Outer Jev: [CONFIG.md](../outer-jev/CONFIG.md) · [score-patch.mjs](../outer-jev/score-patch.mjs)
