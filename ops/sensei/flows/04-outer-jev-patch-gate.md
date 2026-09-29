# 04 — Outer Jev patch gate

Jev scores **patches / coding agents**, not the live tape. Lives only under `ops/outer-jev/`. Hard rules run **before** any model. Optional scorer: `score-patch.mjs`. No OpenJev. Not imported by `src/`.

Canonical handoff sequence stays in [07-lab3-bot-workflow](./07-lab3-bot-workflow.md). This file is the architecture.

---

## Studio poster — official marks + roadmap rail

GitHub-renderable control-plane poster. Uses the **APPROVED Neural Network** system mark (hub · rainbow · JEV interconnects), the official TypeSafe J-cube for the outer scorer, official bot marks for Sensei / Steward / Grok, and the Sensei [ROADMAP](../ROADMAP.md) Now / Next / Later / Never rail.

![S1R1US Outer Jev patch gate — research studio poster](./assets/S1R1US-outer-jev-patch-gate-studio.svg)

Official logo strip (already APPROVED 2026-09-27 — cited, not re-authored):

<p>
<img src="../media/public/soft-launch-front-door-2026-09-27/images/Neural-Network-logo-card.png" alt="Neural Network system apex" width="72" height="72" />
<img src="../media/public/soft-launch-front-door-2026-09-27/images/bots/Sensei-Security-logo-card.png" alt="Sensei Security" width="72" height="72" />
<img src="../media/public/soft-launch-front-door-2026-09-27/images/bots/Sensei-Bot-logo-card.png" alt="Sensei Bot" width="72" height="72" />
<img src="../media/public/soft-launch-front-door-2026-09-27/images/bots/Desk-Steward-logo-card.png" alt="Desk Steward" width="72" height="72" />
<img src="../media/public/soft-launch-front-door-2026-09-27/images/bots/Grok-botlogo-card.png" alt="Grok Bot" width="72" height="72" />
<img src="../media/public/soft-launch-front-door-2026-09-27/images/bots/7-B0T-logo-card.png" alt="7-B0T" width="72" height="72" />
<img src="../media/public/soft-launch-front-door-2026-09-27/images/bots/9-B0T-logo-card.png" alt="9-B0T" width="72" height="72" />
</p>

| Mark | Role on this gate |
| --- | --- |
| **Neural Network** | System apex. Oversight / recursive engineer. Not a live-tape voter. |
| **TypeSafe J-cube** | Outer scorer only (`jev-1.13.0` / System One). Code is System Two. |
| **Sensei Security** | L1 deterministic hard rules. No model. |
| **Sensei Bot 先生** | L5 glossary a+b+c. Standards, not merge. |
| **Desk Steward** | L5 mandate / inventory if the patch touches the desk. |
| **Grok Bot** | L0 proposer / builder. Does not self-merge. |
| **7-B0T / 9-B0T** | Desk context only. Gate still never sells, never sizes, never writes FAQ. |

Library PNG target (HOLD until **APPROVE 39**):

- [`public/admin-media/S1R1US-outer-jev-patch-gate.png`](../../../public/admin-media/S1R1US-outer-jev-patch-gate.png)

Jev engineering reference (official X, not a product import): System One is a parallel decision primitive — state + typed questions in, nouls out, code branches. Do not plug Jev into high-level product decisions inside `src/`. Program the gate.

---

## Control plane

Six planes. Fail-closed. Policy is code — Jev never has the last word.

```mermaid
flowchart TB
  classDef plane fill:#12182b,stroke:#2c3658,color:#e7edf8
  classDef fail fill:#2b1218,stroke:#ff5d70,color:#ffc0c7
  classDef hold fill:#2a210f,stroke:#ffb020,color:#ffe0a0
  classDef pass fill:#0d2a26,stroke:#3dd6c6,color:#9feee4
  classDef human fill:#1a2238,stroke:#f0c14b,color:#f3f6ff

  subgraph L0["L0 · INTAKE"]
    direction LR
    P["Proposed patch\ndiff + file list"]
    T["Agent transcript\ntools · intent"]
    SRC["src/ desk runtime\njevOutsideApp: 100"]
    OPS["ops/outer-jev/\nnever imported by src/"]
  end

  subgraph L1["L1 · DETERMINISTIC HARD RULES — no model"]
    direction LR
    R1["no sell / short path"]
    R2["no FAQ / size by agent"]
    R3["no lock weaken"]
    R4["no silent merge"]
    R5["paper only · create locked"]
    R6["no invented key · no OpenJev"]
  end

  subgraph L2["L2 · LEAK SCAN — scan-runtime.mjs"]
    direction LR
    TOK["FORBIDDEN in src/\nscoreSleeveAdd\nsleeve_add_allowed\napi.typesafe.ai\njev-gate imports"]
    S0["exit 0 PASS\nsrc/ clean"]
    S1["exit 1 FAIL\nleak or scan error"]
  end

  subgraph L3["L3 · TYPED JEV — optional score-patch.mjs"]
    direction LR
    KEY{"TYPESAFE_API_KEY\nin operator env?"}
    CALL["one POST /v1/systemone\njev-1.13.0\nfour atomic nouls\ncutoff 0.70"]
  end

  subgraph L4["L4 · VERDICT — policy is code"]
    direction LR
    FAIL["FAIL · do not merge"]
    HOLD["HOLD · do not merge"]
    CLEAR["CLEAR · outer gate only"]
  end

  subgraph L5["L5 · HUMAN GATE — still not a merge"]
    direction LR
    SE["Sensei\nglossary a+b+c"]
    ST["Steward\nif desk / mandate"]
    U["User APPROVE <pr>"]
    M["Merge allowed\nLab 3 main only"]
  end

  P --> L1
  T --> L1
  SRC --> L1
  OPS --> L1
  L1 -->|any rule hits| FAIL
  L1 -->|all clear| L2
  TOK --> S0
  TOK --> S1
  S1 --> FAIL
  S0 --> KEY
  KEY -->|absent · exit 2| HOLD
  KEY -->|present| CALL
  CALL -->|exit 1 error| FAIL
  CALL -->|exit 3 cutoff| HOLD
  CALL -->|exit 0 PASS| CLEAR
  CLEAR --> SE --> ST --> U
  U -->|APPROVE| M
  U -->|no APPROVE| HOLD

  class P,T,SRC,OPS,R1,R2,R3,R4,R5,R6,TOK plane
  class S1,FAIL fail
  class S0,CLEAR pass
  class KEY,CALL,HOLD hold
  class SE,ST,U,M human
```

---

## Execution — four nouls, one call

```mermaid
flowchart TB
  classDef fail fill:#2b1218,stroke:#ff5d70,color:#ffc0c7
  classDef hold fill:#2a210f,stroke:#ffb020,color:#ffe0a0
  classDef pass fill:#0d2a26,stroke:#3dd6c6,color:#9feee4
  classDef plane fill:#12182b,stroke:#2c3658,color:#e7edf8

  START["score-patch.mjs --state state.json"] --> ENV{TYPESAFE_API_KEY?}
  ENV -->|no| E2["exit 2 HOLD · no key"]
  ENV -->|yes| POST["POST {BASE}/v1/systemone\nAuthorization: Bearer key\nstate + QUESTIONS"]
  POST -->|HTTP / shape error| E1["exit 1 FAIL · do not invent answers"]
  POST -->|four numeric nouls| POL["HOLD =\nsell ≥ 0.70 OR weaken ≥ 0.70\nOR faq/size ≥ 0.70 OR on_mandate < 0.70"]
  POL -->|true| E3["exit 3 HOLD · attach JSON"]
  POL -->|false| E0["exit 0 PASS · attach JSON"]

  Q1["patch_touches_sell_path"] -.-> POL
  Q2["patch_weakens_a_lock"] -.-> POL
  Q3["patch_writes_faq_or_size"] -.-> POL
  Q4["patch_on_mandate"] -.-> POL

  class START,POST,POL,Q1,Q2,Q3,Q4 plane
  class E2,E3 hold
  class E1 fail
  class E0 pass
```

| Noul | HOLD when | Means |
| --- | --- | --- |
| `patch_touches_sell_path` | ≥ 0.70 | Patch adds or opens a sell / short / reduce-long path |
| `patch_weakens_a_lock` | ≥ 0.70 | drift-lock or shared-security lock is softened |
| `patch_writes_faq_or_size` | ≥ 0.70 | Agent writes FAQ copy or picks a trade size |
| `patch_on_mandate` | **< 0.70** | Patch left paper accumulate / maker-checker / outer-Jev mandate |

Cutoff `0.70` is code in `ops/outer-jev/score-patch.mjs`. Jev returns nouls. Code decides.

---

## Exit codes

| Tool | Exit | Meaning |
| --- | --- | --- |
| `scan-runtime.mjs` | 0 | PASS — no in-app Jev in `src/` |
| `scan-runtime.mjs` | 1 | FAIL — leak or scan error |
| `score-patch.mjs` | 0 | PASS — four nouls clear cutoff |
| `score-patch.mjs` | 1 | Error — usage / HTTP / fabricated noul |
| `score-patch.mjs` | 2 | HOLD — no `TYPESAFE_API_KEY` |
| `score-patch.mjs` | 3 | HOLD — noul cutoff trip |

---

## Hard rules (always, before any model)

- Never add a sell tool
- Never write FAQ from an agent
- Never pick a trade size
- Never weaken drift-lock / shared-security locks
- Never merge to main without user **APPROVE**
- Never sell, never short, Coinbase create locked, paper only
- Never invent keys; never OpenJev stand-in

## Commands

```bash
node ops/outer-jev/scan-runtime.mjs

# optional — operator env only; never commit
TYPESAFE_API_KEY=... node ops/outer-jev/score-patch.mjs --state state.json

# optional gateway (same System One shape):
# TYPESAFE_BASE_URL=https://openrouter.ai/api TYPESAFE_API_KEY=$OPENROUTER_API_KEY \
#   node ops/outer-jev/score-patch.mjs --state state.json
```

Key location: operator env only — never commit. See `ops/outer-jev/CONFIG.md`, `QUESTIONS.md`, and [INSTRUMENTATION.md](../INSTRUMENTATION.md).

Retired in-app labels (do not restore): `sleeve_add_allowed`, `jevScope`, `scoreSleeveAdd`, desk Jev panel.
