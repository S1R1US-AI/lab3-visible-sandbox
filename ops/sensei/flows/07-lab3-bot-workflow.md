# 07 — Lab 3 bot workflow (canonical)

Primary handoff for Lab 3 paper desk patches. Cite [GLOSSARY.md](../GLOSSARY.md) (a+b+c), [BOT-INTERFACE.md](../BOT-INTERFACE.md), and [`ops/outer-jev/`](../../outer-jev/). Skill: **lab-3-sensei-workflow**. No OpenJev. No merge without the system admin's go.

Canonical gate (same as [INDEX](./INDEX.md) and the [04 hard rules](./04-outer-jev-patch-gate.md#hard-rules-always-before-outer-jev--any-scoring-model)): 06 proposes → 03 → Outer Jev (`scan-runtime.mjs` + optional `score-patch.mjs`) → 04 (if desk) → 02 score → checks green + Copilot 0 open on head SHA → system admin squash-merges in a merge window (1–3 PM or 7–9 PM ET, max 2 / day). Any FAIL or HOLD stops the flow: do not merge.

04 path rule (same as [04](./04-outer-jev-patch-gate.md#control-plane)): 04 always runs if the patch touches `src/` (desk, tape, Coinbase, approve, FAQ or size), `ops/outer-jev/`, the drift-lock or desk tests, or any doc that states the mandate. When unclear, 04 runs.

## Sequence

```mermaid
sequenceDiagram
  participant P as 06 Proposer (+ Copilot)
  participant S as 03 (glossary a+b+c)
  participant J as Outer Jev (ops)
  participant D as 04
  participant SEC as 02
  participant CI as Checks + Copilot (head SHA)
  participant A as System admin

  P->>S: Propose (paths + intent)
  S->>S: Review vs GLOSSARY / ROADMAP / locks
  alt FAIL or HOLD
    S-->>P: Admin report (stop · do not merge)
  else PASS provisional
    S->>J: Hard rules (no model)
    J->>J: scan-runtime.mjs
    alt leak / hard-rule FAIL
      J-->>S: FAIL (stop · do not merge)
    else clean
      opt TYPESAFE_API_KEY present
        J->>J: score-patch.mjs --state state.json<br/>four nouls / one /v1/systemone call
      end
      alt no key (exit 2) or HOLD (exit 3)
        J-->>S: HOLD (stop · do not merge)
      else exit 0 PASS
        J-->>S: Outer gate clear
        opt Touches desk / mandate paths (or unclear)
          S->>D: 04 mandate audit
          D-->>S: 04 verdict
        end
        alt 04 FAIL (sell / short path, FAQ / size by agent, create unlocked, tape not display-only)
          S-->>P: FAIL (stop · do not merge)
        else 04 PASS or not required
          S->>SEC: Request 02 score
          alt 02 HOLD / FAIL
            SEC-->>P: HOLD / FAIL (stop · do not merge)
          else 02 PASS (SECURE)
            P->>CI: Push head SHA (ready for review)
            alt checks red or Copilot threads open
              CI-->>P: HOLD (stop · fix, new head, re-score)
            else checks green + Copilot 0 open on head SHA
              CI-->>A: Admin detail (PASS provisional)
              alt system admin's go
                A->>A: Squash-merge in a merge window<br/>1–3 PM or 7–9 PM ET · max 2 / day
              else no go
                Note over A: No go = no merge
              end
            end
          end
        end
      end
    end
  end
```

## Flowchart

```mermaid
flowchart TB
  P[06 proposes] --> S[03: glossary a+b+c + ROADMAP + locks]
  S -->|FAIL / HOLD| X[FAIL / HOLD — stop · do not merge]
  S -->|PASS provisional| H[Outer Jev hard rules — no model]
  H -->|violates| X
  H -->|PASS| SR["scan-runtime.mjs"]
  SR -->|leak exit 1| X
  SR -->|PASS| K{TYPESAFE_API_KEY?}
  K -->|no| HOLD[HOLD — exit 2 / no key]
  K -->|yes| SP["score-patch.mjs --state state.json"]
  SP -->|exit 3| HOLD
  SP -->|exit 1 error| X
  SP -->|exit 0 PASS| DESK{Touches desk / mandate?}
  HOLD --> X
  DESK -->|"yes · src/ · ops/outer-jev/ · drift-lock / desk tests · mandate doc · or unclear"| ST[04 mandate audit]
  DESK -->|"no · none of those paths · 04 skipped"| SEC[02 score — security review]
  ST -->|"FAIL · sell / short path · FAQ / size by agent · create unlocked · tape not display-only"| X
  ST -->|PASS| SEC
  SEC -->|HOLD / FAIL| X
  SEC -->|PASS · SECURE| CI["Checks green + Copilot 0 open on head SHA"]
  CI -->|red or open threads| X
  CI -->|PASS| GO{System admin's go?}
  GO -->|no go| X
  GO -->|go| M["System admin squash-merges in a merge window<br/>1–3 PM or 7–9 PM ET · max 2 / day"]
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
# optional — operator env only; never commit, never invent, never OpenJev,
# never put a key on the command line. Export it from your secrets manager,
# or type it hidden (stays out of shell history):
read -s TYPESAFE_API_KEY && export TYPESAFE_API_KEY
node ops/outer-jev/score-patch.mjs --state state.json
# optional gateway (key already exported in the environment, never inline):
# export TYPESAFE_BASE_URL=https://openrouter.ai/api
# node ops/outer-jev/score-patch.mjs --state state.json
```
