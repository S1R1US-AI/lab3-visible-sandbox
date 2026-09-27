# 07 — Lab 3 bot workflow (canonical)

Primary handoff for Lab 3 paper desk patches. Cite [GLOSSARY.md](../GLOSSARY.md) (a+b+c), [BOT-INTERFACE.md](../BOT-INTERFACE.md), and [`ops/outer-jev/`](../../outer-jev/). Skill: **lab-3-sensei-workflow**. No OpenJev. No merge without user **APPROVE**.

## Sequence

```mermaid
sequenceDiagram
  participant P as Proposer (Grok / Copilot)
  participant S as Sensei (glossary a+b+c)
  participant J as Outer Jev (ops)
  participant D as Desk Steward
  participant U as User

  P->>S: Propose (paths + intent)
  S->>S: Review vs GLOSSARY / ROADMAP / locks
  alt FAIL or HOLD
    S-->>P: Admin report (stop)
  else PASS provisional
    S->>J: Hard rules (no model)
    J->>J: scan-runtime.mjs
    alt leak / hard-rule FAIL
      J-->>S: FAIL
    else clean
      opt TYPESAFE_API_KEY present
        J->>J: score-patch.mjs --state state.json<br/>four nouls / one /v1/systemone call
      end
      alt no key (exit 2) or HOLD (exit 3)
        J-->>S: HOLD
      else exit 0 PASS
        J-->>S: Outer gate clear
        alt Touches desk / mandate
          S->>D: Steward mandate audit
          D-->>S: Steward verdict
        end
        S-->>U: Admin detail (PASS provisional)
        U->>U: APPROVE or stop
        Note over U: No APPROVE = no merge
      end
    end
  end
```

## Flowchart

```mermaid
flowchart TB
  P[Propose] --> S[Sensei: glossary a+b+c + ROADMAP + locks]
  S -->|FAIL / HOLD| X[Stop — no merge]
  S -->|PASS provisional| H[Outer Jev hard rules — no model]
  H -->|violates| X
  H --> SR["scan-runtime.mjs"]
  SR -->|leak exit 1| X
  SR -->|PASS| K{TYPESAFE_API_KEY?}
  K -->|no| HOLD[HOLD — exit 2 / no key]
  K -->|yes| SP["score-patch.mjs --state state.json"]
  SP -->|exit 3| HOLD
  SP -->|exit 1 error| X
  SP -->|exit 0 PASS| DESK{Touches desk / mandate?}
  HOLD --> X
  DESK -->|yes| ST[Desk Steward audit]
  DESK -->|no| U[User APPROVE]
  ST -->|FAIL| X
  ST -->|OK| U
  U -->|APPROVE| M[Merge allowed]
  U -->|no APPROVE| X
```

## Cite

| Step | Artifact |
| --- | --- |
| Standards | [GLOSSARY.md](../GLOSSARY.md) · [ROADMAP.md](../ROADMAP.md) |
| Handoff | [BOT-INTERFACE.md](../BOT-INTERFACE.md) · skill `lab-3-sensei-workflow` |
| Outer Jev | [04-outer-jev-patch-gate](./04-outer-jev-patch-gate.md) · [`scan-runtime.mjs`](../../outer-jev/scan-runtime.mjs) · [`score-patch.mjs`](../../outer-jev/score-patch.mjs) (PR #10, `5346feb`) · [QUESTIONS.md](../../outer-jev/QUESTIONS.md) · [CONFIG.md](../../outer-jev/CONFIG.md) |
| Reports / exits | [ADMIN-DETAIL.md](../ADMIN-DETAIL.md) · [INSTRUMENTATION.md](../INSTRUMENTATION.md) |
| Search terms | [SEARCH-SCHEMA.md](../SEARCH-SCHEMA.md) |

**Commands**

```bash
node ops/outer-jev/scan-runtime.mjs
# optional key in operator env only — never commit; never invent; never OpenJev
TYPESAFE_API_KEY=... node ops/outer-jev/score-patch.mjs --state state.json
# optional gateway:
# TYPESAFE_BASE_URL=https://openrouter.ai/api TYPESAFE_API_KEY=$OPENROUTER_API_KEY ...
```
