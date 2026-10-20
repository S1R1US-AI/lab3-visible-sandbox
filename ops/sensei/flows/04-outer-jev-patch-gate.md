# 04 — Outer Jev patch gate

Jev scores **patches / coding agents**, not the live tape. Lives only under `ops/outer-jev/`. Hard rules run **before** any model. Optional scorer: `score-patch.mjs` (PR #10, `5346feb`). No OpenJev. Not imported by `src/`.

Canonical handoff sequence stays in [07-lab3-bot-workflow](./07-lab3-bot-workflow.md). This file is the architecture.

Status: Soft locks Present · Soft-Launch PARKED

---

## Studio poster — system mark + roadmap rail

GitHub-renderable control-plane poster. Uses the **official Neural Network system mark**, the text label TypeSafe / `jev-1.13.0` for the outer scorer (no scorer logo), bots by number only (02 / 03 / 04 / 06), and the [ROADMAP](../ROADMAP.md) Now / Next / Later / Never rail.

![S1R1US Outer Jev patch gate — research studio poster](./assets/S1R1US-outer-jev-patch-gate-studio.svg)

Official logo strip (2026-09-27 marks; cited, not re-authored):

<p>
<img src="../media/public/soft-launch-front-door-2026-09-27/images/Neural-Network-logo-card.png" alt="Neural Network system apex" width="72" height="72" />
<img src="../media/public/soft-launch-front-door-2026-09-27/images/bots/Sensei-Security-logo-card.png" alt="02" width="72" height="72" />
<img src="../media/public/soft-launch-front-door-2026-09-27/images/bots/Sensei-Bot-logo-card.png" alt="03" width="72" height="72" />
<img src="../media/public/soft-launch-front-door-2026-09-27/images/bots/Desk-Steward-logo-card.png" alt="04" width="72" height="72" />
<img src="../media/public/soft-launch-front-door-2026-09-27/images/bots/7-B0T-logo-card.png" alt="7-B0T" width="72" height="72" />
<img src="../media/public/soft-launch-front-door-2026-09-27/images/bots/8-B0T-logo-card.png" alt="8-B0T" width="72" height="72" />
<img src="../media/public/soft-launch-front-door-2026-09-27/images/bots/9-B0T-logo-card.png" alt="9-B0T" width="72" height="72" />
</p>

| Mark | Role on this gate |
| --- | --- |
| **Neural Network** | System apex. Oversight / recursive engineer. Not a live-tape voter. |
| **TypeSafe / `jev-1.13.0`** | Outer scorer only (`jev-1.13.0` / System One). Code is System Two. |
| **02** | Own security-review lane: scores the PR (SECURE / HOLD / FAIL) after the outer gate. Not a hard-rule layer; L1 is deterministic code, no model. |
| **03** | Standards lane (glossary a+b+c) — runs first, before Outer Jev L1–L4. Standards, not merge. |
| **04** | L5 mandate / inventory if the patch touches the desk. |
| **06** | L0 proposer / builder (06 writes). Does not self-merge. |
| **7-B0T** | Purchase-call / CLIP board (SIM-locked). Desk context only. Gate still never sells, never sizes, never writes FAQ. |
| **8-B0T** | Maker-checker propose lane. Desk context only. Gate still never sells, never sizes, never writes FAQ. |
| **9-B0T** | ≤30% paper-profit sleeve, 1–30% risk slider, user Approve/Deny. Desk context only. Gate still never sells, never sizes, never writes FAQ. |

Quality Bot unnumbered; desk context only.

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
    P["Proposed patch\n06 writes · diff + file list"]
    T["Agent transcript\ntools · intent"]
    SRC["src/ desk runtime\njevOutsideApp: 100"]
    OPS["ops/outer-jev/\nnever imported by src/"]
  end

  subgraph STD["03 · STANDARDS — runs before Outer Jev"]
    direction LR
    SE["03\nglossary a+b+c\nROADMAP + locks"]
  end

  subgraph L1["L1 · DETERMINISTIC HARD RULES — no model"]
    direction LR
    R1["no sell / short path"]
    R2["no FAQ / size by agent"]
    R3["no lock weaken"]
    R4["no silent merge"]
    R5["paper only · create locked"]
    R6["no invented key · no OpenJev"]
    R7["auto trade LOCKED"]
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

  subgraph L5["L5 · MANDATE + MERGE GATE — CLEAR is still not a merge"]
    direction LR
    ST["04\nif desk / mandate"]
    SEC["02 score\nsecurity review"]
    CI["checks green +\nCopilot 0 open\non head SHA"]
    U["system admin's go"]
    M["system admin squash-merges\n1–3 PM or 7–9 PM ET window\nmax 2 merges / day"]
  end

  P --> SE
  T --> SE
  SRC --> SE
  OPS --> SE
  SE -->|FAIL| FAIL
  SE -->|HOLD| HOLD
  SE -->|PASS provisional| L1
  L1 -->|any rule hits| FAIL
  L1 -->|PASS · all clear| L2
  TOK --> S0
  TOK --> S1
  S1 --> FAIL
  S0 -->|PASS| KEY
  KEY -->|absent · exit 2| HOLD
  KEY -->|present| CALL
  CALL -->|exit 1 error| FAIL
  CALL -->|exit 3 cutoff| HOLD
  CALL -->|exit 0 PASS| CLEAR
  CLEAR -->|"PASS · touches src/ (desk · tape · Coinbase · approve · FAQ · size) · ops/outer-jev/ · drift-lock / desk tests · any mandate doc incl. this file · or unclear"| ST
  CLEAR -->|"PASS · 04 skipped only if the patch touches none of those paths (unclear → 04 runs)"| SEC
  ST -->|"FAIL · sell / short path · FAQ / size by agent · create unlocked · tape not display-only"| FAIL
  ST -->|PASS| SEC
  SEC -->|HOLD / FAIL| HOLD
  SEC -->|PASS · SECURE| CI
  CI -->|red or open threads| HOLD
  CI -->|PASS · green + 0 open on head SHA| U
  U -->|go| M
  U -->|no go| HOLD

  class P,T,SRC,OPS,R1,R2,R3,R4,R5,R6,R7,TOK plane
  class S1,FAIL fail
  class S0,CLEAR pass
  class KEY,CALL,HOLD hold
  class SE,ST,SEC,CI,U,M human
```

Fail-closed: **FAIL** and **HOLD** are terminal (do not merge) and have no onward edge. Only arrows labeled **PASS** (or the system admin's **go**) move a patch forward. Lane order matches [Flow 07](./07-lab3-bot-workflow.md) and [INDEX](./INDEX.md): 03 runs first, then Outer Jev (L1–L4), then 04 (if desk), 02, checks + Copilot, and the system admin. 04 path rule: 04 always runs if the patch touches `src/` (desk, tape, Coinbase, approve, FAQ or size), `ops/outer-jev/`, the drift-lock or desk tests, or any doc that states the mandate (this file included). When unclear, 04 runs. A 04 FAIL (sell or short path, FAQ or size set by an agent, create left unlocked, tape not display-only) stops the flow, and so does a 03 FAIL or HOLD.

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
| `patch_touches_sell_path` | ≥ 0.70 | Patch adds or opens a sell or short path |
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
- Never merge to main without the system admin's go: 06 proposes → 03 → Outer Jev → 04 (if desk) → 02 score → checks green + Copilot 0 open on head SHA → system admin squash-merges in a merge window (1–3 PM or 7–9 PM ET, max 2 / day)
- Never sell, never short, Coinbase create locked, paper only
- Auto trade LOCKED
- Never invent keys; never OpenJev stand-in

## Commands

```bash
node ops/outer-jev/scan-runtime.mjs

# optional — operator env only; never commit, never put a key on the command line
# export it from your secrets manager, or type it hidden (stays out of shell history):
read -s TYPESAFE_API_KEY && export TYPESAFE_API_KEY
node ops/outer-jev/score-patch.mjs --state state.json

# optional gateway (same System One shape):
# TYPESAFE_BASE_URL=https://openrouter.ai/api TYPESAFE_API_KEY=$OPENROUTER_API_KEY \
#   node ops/outer-jev/score-patch.mjs --state state.json
```

Key location: operator env only — never commit. See `ops/outer-jev/CONFIG.md`, `QUESTIONS.md`, and [INSTRUMENTATION.md](../INSTRUMENTATION.md).

Retired in-app labels (do not restore): `sleeve_add_allowed`, `jevScope`, `scoreSleeveAdd`, desk Jev panel.
