# Sensei glossary — standards a + b + c

One-page shared vocabulary for Sensei Bot App, Lab 3 Desk Steward, Grok Bot, and patch agents. Use these terms in admin reports, PR notes, and HOLD/PASS/FAIL verdicts.

**Standards frame**

| Letter | Meaning |
| --- | --- |
| **a** | Glossary — shared definitions (this file) |
| **b** | Lab 3 operational drift — tightened mandate/architecture/lock violations |
| **c** | Checkable meaning — solutions and evidence that can be verified |

---

## Mechanistic interpretability

**Definition.** Research program associated with Chris Olah and Anthropic: reverse-engineer neural network *features* and *circuits* so model behavior is explainable in terms of internal structure, not only inputs and outputs.

**Lab 3 use.** When Sensei or Steward asks for “mechanistic” clarity on a bot decision path, they mean: show the concrete gates, files, and locks that produce the outcome — not a black-box vibe summary.

---

## Drift

Three layers; Lab 3 uses the third as the primary enforcement sense.

### 1. Classical ML drift

Training/serving distribution shift: features, labels, or environment statistics move so a model’s predictions degrade.

### 2. Semantic / persona drift

An agent’s stated role, tone, or product story slowly diverges from the approved mandate (e.g. starts acting like a live broker when the project is paper-only).

### 3. Lab 3 operational drift (**tightened**)

Agent or code that **works** or **passes tests** but still violates:

- the paper-desk **mandate**,
- the approved **architecture** (e.g. Jev back inside `src/`),
- hard **locks** (never sell / never short / Coinbase create locked / no FAQ by agent / no size picking by agent),
- or this **glossary**.

Operational drift is a **FAIL** or **HOLD** even when CI is green. Passing tests is not the same as staying on mandate.

---

## Solutions / checkable meaning

**Definition.** A claim is *checkable* when another operator can verify it with a named file path, lock name, scan command, diagram link, or quoted evidence — not only with prose.

**Sensei requirement.** Every PASS / HOLD / FAIL should cite at least one checkable artifact (see [ADMIN-DETAIL.md](./ADMIN-DETAIL.md)).

---

## Lab 3 terms

| Term | Meaning |
| --- | --- |
| **Maker-checker** | Two-step control: a system may *propose* (maker); a human must **Approve** or **Deny** (checker). AUTO does not complete the protected action. |
| **nineCall** | Desk gate flag: coordination / nine-bot sleeve path is in play. Approve for sleeve add is gated on `nineCall` yes **and** related conditions (see Checkpoint 152). |
| **needsCoord** | Coordination required before the protected action proceeds. |
| **ACCUMULATE** | Paper action intent: add to the stack on paper. Never sell / never short. |
| **Approve gated (Checkpoint 152)** | User Approve is gated on `nineCall === yes && needsCoord && action === ACCUMULATE`. Preserve full desk; do not invent weaker gates. **In force on `main`** (`24b80a6`, PR #6). |
| **outer Jev** | Operator hook under `ops/outer-jev/`. Scores *patches / coding agents*, not the live tape. Not imported by `src/`. **On `main` as of PR #6.** |
| **jevOutsideApp** | Architecture score / contract: Jev remains outside the running app (`jevOutsideApp: 100` at Checkpoint 152). In-src Jev callers are drift. **In force on `main`.** |
| **scan-runtime** | `ops/outer-jev/scan-runtime.mjs` — fails if Jev leaked back into `src/`. Run before merge. |
| **score-patch** | `ops/outer-jev/score-patch.mjs` — optional outer patch scorer (four atomic nouls / one System One call; needs `--state` + TypeSafe key; cutoff 0.70; PR #10). Missing key = HOLD. |
| **No TypeSafe key = HOLD** | Optional key only in operator env (`~/.s1r1us/outer-jev.env` / `$TYPESAFE_API_KEY`). Missing key → do not merge. Never commit keys. |
| **never-sell** | Hard lock: no sell tool, no sell path, no “sell the stack” behavior on this desk. |
| **never short** | Hard lock: no shorting path. |
| **Coinbase create locked** | Live Coinbase create remains locked on this desk. |
| **tape display-only** | Public / live tape is for display. It is not a trade instruction. |
| **PASS** | Change or audit meets glossary, roadmap, locks, and checkable evidence. |
| **HOLD** | Stop merge / stop action until missing key, APPROVE, scan, or clarification is resolved. |
| **FAIL** | Violates mandate, architecture, locks, or glossary (including operational drift with green tests). |
| **Team Boolean contract** | Human ↔ bots contract for interpreting statements and assigning verdicts; see [Team Boolean contract (human ↔ bots)](#team-boolean-contract-human--bots). |

---

## Team Boolean contract (human ↔ bots)

- Boolean basics (true/false, and/or/not) are assumed known to bots.
- This term defines how S1R1US bots treat human statements while building OSS under shared standards.
- Clear true/false human statement → act with scoped verdict (Sensei: PASS/FAIL for meaning; Security Sensei: SECURE/FAIL for controls).
- Unclear, mixed, or illogical human statement → HOLD, pause, ask human to clarify. Never invent a ship.
- HOLD ≠ FAIL (unknown is not denied).
- Sensei owns mission meaning vocabulary (PASS/HOLD/FAIL). Security Sensei owns security vocabulary (SECURE/HOLD/FAIL). Neither rewrites the other’s words.
- Every bot’s duty: understand the human; if not understood → pause and ask.

---

## Quick citation pattern

When reporting:

> **Verdict:** HOLD  
> **Glossary:** Lab 3 operational drift; no TypeSafe key = HOLD  
> **Evidence:** `ops/outer-jev/CONFIG.md` — “No key = HOLD / do not merge”

See [ADMIN-DETAIL.md](./ADMIN-DETAIL.md) for full templates.
