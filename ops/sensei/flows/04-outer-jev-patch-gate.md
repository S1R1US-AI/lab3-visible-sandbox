# 04 — Outer Jev patch gate

Jev scores **patches / coding agents**, not the live tape. Lives only under `ops/outer-jev/`.

```mermaid
flowchart TB
  P[Proposed patch] --> S["Run scan-runtime.mjs"]
  S -->|Jev leaked into src/| FAIL[FAIL — do not merge]
  S -->|clean| K{TYPESAFE_API_KEY present?}
  K -->|no| HOLD[HOLD — no key]
  K -->|yes| Q[Score QUESTIONS.md<br/>cutoff 0.70]
  Q --> H1{patch_touches_sell_path ≥ 0.70?}
  H1 -->|yes| HOLD2[HOLD]
  H1 -->|no| H2{patch_weakens_a_lock ≥ 0.70?}
  H2 -->|yes| HOLD2
  H2 -->|no| H3{patch_writes_faq_or_size ≥ 0.70?}
  H3 -->|yes| HOLD2
  H3 -->|no| H4{patch_on_mandate < 0.70?}
  H4 -->|yes| HOLD2
  H4 -->|no| OK[Outer gate clear → Steward / Sensei / APPROVE]

  HARD[Hard rules — no model needed] -.-> FAIL
  HARD -.-> HOLD2
```

**Hard rules (always)**

- Never add a sell tool
- Never write FAQ from an agent
- Never pick a trade size
- Never weaken drift-lock / shared-security locks
- Never merge to main without user **APPROVE**
- Never sell, never short, Coinbase create locked, paper only

**Commands**

```bash
node ops/outer-jev/scan-runtime.mjs
```

Key location: operator env only — never commit. See `ops/outer-jev/CONFIG.md` and `QUESTIONS.md`.
