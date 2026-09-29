# Sensei glossary — standards a + b + c

One-page shared vocabulary for Sensei Bot App, Lab 3 Desk Steward, Grok Bot, and patch agents. Use these terms in admin reports, PR notes, and HOLD/PASS/FAIL verdicts.

**Merge stamp (2026-09-28):** Merged from `DEFINITIONS-LOCK-DRAFT-2026-09-28` (+ Anthropic locks). Security **SECURE** on desk locks **#16** + **#31** and cite residuals **#30** + **#20**. **j APPROVE** glossary merge via Dream Talk. Soft-launch/Lab3 **HOLD** for soft-launch/theme work **UNCHANGED**. Does **NOT** authorize live AI trading. Paper never-sell/never-short + Coinbase create/auto-trade **LOCKED**. belief ≠ definition. **j APPROVE** Web3 NIST locks (**#43** + **#44**) via Dream Talk 2026-09-28 — Web3 (NIST) ≠ W3C Web 3.0 / semantic web.

**Merge stamp (2026-09-29):** Organization-tier DEFINITIONS batch — **lane**, **crash**, **drive the car**, **full consensus**, **high-priority bot**. Sensei PASS meaning · PASS cites · Security **SECURE-with-conditions** · **j APPROVE** (conditional via Dream Talk; cite re-SECURE cleared). Soft-launch/Lab3 HOLD UNCHANGED. Does **NOT** authorize live AI trading. Paper never-sell/never-short + Coinbase create/auto-trade **LOCKED**. belief ≠ definition. Anthropic persona-drift LOCKED untouched. Queued HOLD: chain of command · higher authority/privileges · check and balance.

**Standards frame**

| Letter | Meaning |
| --- | --- |
| **a** | Glossary — shared definitions (this file) |
| **b** | Lab 3 operational drift — tightened mandate/architecture/lock violations |
| **c** | Checkable meaning — solutions and evidence that can be verified |

---

## Mechanistic interpretability

**Official spelling:** *mechanistic interpretability*. Alias “mechanical interpretability” = informal / j spoken only — **NOT** official spelling.

**Definition (LOCKED — Anthropic, j 2026-09-28).** Anthropic’s research program aimed at a mechanistic understanding of language models by opening the black box: identifying interpretable internal units (especially features—patterns / linear combinations of neuron activations—and the circuits that use them) so researchers can explain, monitor, and steer model behavior from the inside rather than only from inputs and outputs.

**Sources:** https://www.anthropic.com/research/decomposing-language-models-into-understandable-components ; https://www.anthropic.com/research/mapping-mind-language-model

**Lab 3 use.** When Sensei or Steward asks for “mechanistic” clarity on a bot decision path, they mean: show the concrete gates, files, and locks that produce the outcome — not a black-box vibe summary.

---

## Drift — three labeled senses (do not collapse)

Lab 3 keeps **operational drift** (standard **b**) as a **SEPARATE desk term**. Anthropic persona-drift is a **separate LOCKED** sense. Bare universal ML “drift” is **not** locked here. Do not overwrite one with another.

### 1. Classical ML drift (informational — not locked)

Training/serving distribution shift: features, labels, or environment statistics move so a model’s predictions degrade. Not a formal Sensei glossary lock.

### 2. Drift (Anthropic / persona drift) — LOCKED (j 2026-09-28)

**Definition.** In Anthropic’s persona / Assistant-Axis research, drift means a model’s internal activations and expressed character moving away from the intended Assistant persona (or toward another character / undesirable trait) over a conversation or during training—detectable in neural activity and associated with higher risk of harmful or off-role behavior.

**Sources:** https://www.anthropic.com/research/assistant-axis ; https://www.anthropic.com/research/persona-vectors

**Scope.** Anthropic persona-drift sense only. Bare universal ML drift = **NOT** locked here.

**Fence note.** Team hypo→main-branch fence must **NOT** reuse the word “drift” for that meaning — use separate plain phrase **hypo→main-branch bleed** until j names it.

### 3. Lab 3 operational drift (**tightened**) — standard **b** (SEPARATE desk term)

Agent or code that **works** or **passes tests** but still violates:

- the paper-desk **mandate**,
- the approved **architecture** (e.g. Jev back inside `src/`),
- hard **locks** (never sell / never short / Coinbase create locked / no FAQ by agent / no size picking by agent),
- or this **glossary**.

Operational drift is a **FAIL** or **HOLD** even when CI is green. Passing tests is not the same as staying on mandate. This desk term is **independent** of Anthropic persona-drift and must not be overwritten by it.

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
- **Two-way communication (main theme):** (1) pause with a short question to clarify meaning; (2) pause prior to updates for improve or human APPROVE/go; (3) human and bot both recognize consistent two-way communication as priority. See [COMMUNICATION-TWO-WAY.md](./COMMUNICATION-TWO-WAY.md) · [D6](./media/D6-two-way-communication.md).

---

## DEFINITIONS pack (2026-09-28)

Formal locks from `DEFINITIONS-LOCK-DRAFT-2026-09-28` (+ Anthropic locks) + Web3 NIST locks (**#43** + **#44**, j APPROVE 2026-09-28). belief ≠ definition. Soft-launch/Lab3 HOLD. Does **not** authorize live AI trading. **Fence:** Web3 (NIST CSRC / IR 8475) ≠ W3C “Web 3.0” / semantic web — do not collapse.

| Lock status | Meaning |
| --- | --- |
| **LOCKED** | Formal short definition from pack primary source |
| **LOCKED (Anthropic sense)** | Anthropic primary-source sense; not a universal definition |
| **LOCKED (DESK DEFINITION)** | j-approved desk role/control definition; not a vendor product title |
| **HOLD — not formally locked** | Pack HOLD-NO-SINGLE-DEF or HOLD-NO-PRODUCT-MATCH — listed in appendix only |

### LOCKED terms (formal)

#### 1. honesty — LOCKED
Adherence to the facts; sincerity; fairness and straightforwardness of conduct (refusal to lie, steal, or deceive).  
**Source:** https://www.merriam-webster.com/dictionary/honesty

#### 2. trustworthiness — LOCKED
The quality or state of being trustworthy — i.e., worthy of confidence; dependable.  
**Source:** https://www.merriam-webster.com/dictionary/trustworthiness

#### 3. purity — LOCKED
The quality or state of being pure: freedom from impurities; also (in moral usage) freedom from guilt or sin. (Moral-psychology “purity” constructs are research concepts, not this dictionary entry.)  
**Source:** https://www.merriam-webster.com/dictionary/purity

#### 4. bitcoin — LOCKED
A digital currency created for peer-to-peer online transactions, without a central issuing authority; also, a unit of that currency. (Legal classification varies by jurisdiction — treat as law, not the word’s definition.)  
**Source:** https://www.merriam-webster.com/dictionary/Bitcoin

#### 5. matrix — LOCKED
**Dictionary senses (locked):** (1) mathematics — a rectangular array of numbers or other elements in rows and columns; (2) a surrounding material/structure in which something develops; plus other technical senses (printing, geology, etc.). **NOT the definition:** pop-culture “Matrix” / “we live in the Matrix” (fiction/metaphor). Do not encode simulation beliefs as the definition of “matrix.”  
**Source:** https://www.merriam-webster.com/dictionary/matrix

#### 6. simulation — LOCKED
The imitative representation of the functioning of one system or process by means of the functioning of another. **NOT the definition:** the “simulation hypothesis” (contested philosophical conjecture). belief ≠ definition.  
**Source:** https://www.merriam-webster.com/dictionary/simulation

#### 7. brain implant — LOCKED
A device placed in or on brain tissue (or otherwise interfacing with neural tissue) to record and/or stimulate neural activity, restore function, or enable brain–computer interaction. Related encyclopedia term: neuroprosthesis. No single U.S. statute title for the exact phrase; clinical classes are device- and indication-specific.  
**Source:** https://www.britannica.com/science/neuroprosthesis

#### 8. transhumanism — LOCKED
A philosophical and scientific movement that advocates using current and emerging technologies (e.g., genetic engineering, AI, nanotechnology, implants) to augment human capabilities and improve the human condition, with some envisioning “posthuman” outcomes. Not a statute.  
**Source:** https://www.britannica.com/topic/transhumanism

#### 9. futurism — LOCKED
**Locked senses:** (1) early 20th-century Italian artistic/literary movement celebrating speed, machinery, and modern dynamism; (2) more generally, a viewpoint or practice oriented toward anticipating or emphasizing the future. Context must state which sense.  
**Source:** https://www.merriam-webster.com/dictionary/futurism

#### 10. philosophy — LOCKED
A discipline that seeks wisdom through reasoned inquiry into fundamental questions (classically including logic, ethics, metaphysics, and epistemology); also, a coherent system of guiding principles or beliefs.  
**Source:** https://www.merriam-webster.com/dictionary/philosophy

#### 11. theory — LOCKED
A plausible or scientifically acceptable general principle or body of principles offered to explain phenomena; also, the analysis of a set of facts in their relation to one another. (Distinct from casual “guess.”)  
**Source:** https://www.merriam-webster.com/dictionary/theory

#### 14. technological singularity — LOCKED
Encyclopedia concept: a hypothesized future point or phase at which technological growth — often via recursively improving AI — becomes so rapid and profound that human social and predictive frameworks break down. **Locked as concept definition only** — timing/occurrence are debated; do not encode prediction belief as definition.  
**Source:** https://www.britannica.com/technology/singularity-technology

#### 16. bitcoin ai trading desk — LOCKED (DESK DEFINITION)
A human-supervised trading function that uses AI systems to research, propose, or execute bitcoin spot or bitcoin-related orders under written risk limits, with a named accountable operator, no unsupervised auto-trade unless separately APPROVED, and full audit of model inputs, outputs, and fills. It is a role and control design — not a trademarked product name at Coinbase, Fidelity, or Schwab.  
**Note:** belief ≠ definition — does **NOT** authorize live AI trading. Soft-launch/Lab3 HOLD. Paper never-sell/never-short; Coinbase create/auto-trade LOCKED without j APPROVE+Security. Security **SECURE** on this desk lock (2026-09-28).  
**Source:** j APPROVE via Dream Talk 2026-09-28 (desk definition; not vendor trademark)

#### 18. government debt / total government debt for 2026 — LOCKED
**Metric (LOCKED):** In U.S. federal fiscal statistics, **Total Public Debt Outstanding (TPDO)** = **Debt Held by the Public** + **Intragovernmental Holdings**, as published in Treasury Fiscal Data “Debt to the Penny.” There is **no single eternal official “2026 total”** in advance; figures are **as-of a record date** and change daily.  
**As-of fact (separate; not an eternal year total):** TPDO **$40,068,807,991,924.84** as-of **2026-09-24**; Debt Held by the Public $32,362,728,656,693.39; Intragovernmental Holdings $7,706,079,335,231.45 (Treasury Debt to the Penny API, retrieved 2026-09-28 research).  
**Source:** https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/

#### 20. bitcoin strategic reserve — LOCKED
In U.S. federal usage (2025), the **Strategic Bitcoin Reserve** is a custodial framework directed by Executive Order 14233 for government-held bitcoin (notably finally forfeited BTC), to be maintained as reserve assets and not sold except as the order allows. EO policy name ≠ enacted permanent statute unless/until Congress enacts one. Security **SECURE** on cite residual (2026-09-28).  
**Sources:** https://www.federalregister.gov/documents/2025/03/11/2025-03992/establishment-of-the-strategic-bitcoin-reserve-and-united-states-digital-asset-stockpile ; https://www.govinfo.gov/content/pkg/FR-2025-03-11/pdf/2025-03992.pdf

#### 24. Clarity Act (Digital Asset Market Clarity Act / CLARITY Act) — LOCKED
Common short name for the **Digital Asset Market Clarity Act**, **H.R. 3633** (119th Congress), a U.S. House-passed market-structure bill intended to clarify federal oversight of digital asset markets. As of research date 2026-09-28: **not** enacted Public Law; Senate cloture on motion to proceed failed (Sept. 2026 context). Do not invent enactment.  
**Source:** https://www.congress.gov/bill/119th-congress/house-bill/3633

#### 25. GENIUS Act — LOCKED
Short title of the **Guiding and Establishing National Innovation for U.S. Stablecoins Act**, enacted as **Public Law 119-27** (from **S. 1582**, 119th Congress), signed **July 18, 2025**, establishing a federal regulatory framework for **payment stablecoins**.  
**Source:** https://www.congress.gov/119/plaws/publ27/PLAW-119publ27.htm

#### 26. Fidelity Crypto account / Fidelity Crypto® — LOCKED
Fidelity’s branded account for buying, selling, transferring, and holding selected cryptocurrencies (including bitcoin) directly, offered by Fidelity Digital Assets® / FDA, NA — distinct from brokerage holdings of spot crypto ETPs. Availability varies by state/eligibility.  
**Source:** https://www.fidelity.com/crypto/trading

#### 27. Fidelity spot Bitcoin — LOCKED
At Fidelity, “spot bitcoin” exposure is offered in two official ways: (1) **direct bitcoin** via a **Fidelity Crypto®** account; (2) **indirect spot bitcoin ETP** — the **Fidelity® Wise Origin® Bitcoin Fund (FBTC)**. Prefer naming the exact product; the vague phrase without channel is ambiguous.  
**Sources:** https://www.fidelity.com/etfs/crypto-funds ; https://www.fidelity.com/crypto/trading

#### 28. Charles Schwab Premier Bank — LOCKED
**Charles Schwab Premier Bank, SSB** (Member FDIC) — a Schwab banking subsidiary; among other roles, the offeror/custodian entity for **Schwab Crypto™** accounts (spot crypto), separate from Charles Schwab & Co., Inc. brokerage. Use the precise SSB entity when discussing crypto custody.  
**Source:** https://pressroom.aboutschwab.com/press-releases/press-release/2026/Charles-Schwab-Announces-Details-of-Spot-Crypto-Trading-Launch/

#### 29. Charles Schwab spot Bitcoin — LOCKED
Schwab clients may access bitcoin via (1) **Schwab Crypto™** — direct spot bitcoin (and ethereum at launch) in a separate crypto account offered by Charles Schwab Premier Bank, SSB; and/or (2) trading of **spot crypto ETPs** and related listed products in brokerage. Prefer “Schwab Crypto™” for direct spot. Availability exclusions may apply.  
**Source:** https://pressroom.aboutschwab.com/press-releases/press-release/2026/Charles-Schwab-Announces-Details-of-Spot-Crypto-Trading-Launch/

#### 30. Coinbase spot Bitcoin — LOCKED
Buying and selling bitcoin for immediate delivery on Coinbase’s spot markets (including Coinbase Advanced Trade spot pairs such as BTC-USD), as distinct from futures or other derivatives. “Spot” is market microstructure language, not a unique Coinbase trademark for bitcoin alone. Security **SECURE** on cite residual (2026-09-28).  
**Sources:** https://docs.cdp.coinbase.com/coinbase-app/advanced-trade-apis/overview ; https://docs.cdp.coinbase.com/api-reference/advanced-trade-api/rest-api/products/get-product

#### 31. Coinbase AI trading rails — LOCKED (DESK DEFINITION)
The authorized technical path by which an AI agent, with explicit user permission, connects to Coinbase interfaces (for example Coinbase for Agents / MCP and Advanced Trade spot APIs) to place or manage spot bitcoin orders while inheriting Coinbase account auth, permissions, and audit trails. Exact phrase is not an official Coinbase product title; map implementations to the named Coinbase product actually used.  
**Note:** belief ≠ definition — does **NOT** authorize live AI trading. Soft-launch/Lab3 HOLD. Paper never-sell/never-short; Coinbase create/auto-trade LOCKED without j APPROVE+Security. Security **SECURE** on this desk lock (2026-09-28).  
**Source:** j APPROVE via Dream Talk 2026-09-28; map to Coinbase for Agents / Advanced Trade docs when implementing — not a Coinbase product title

#### 34. copyright — LOCKED
A type of intellectual property that protects original works of authorship as soon as an author fixes the work in a tangible form of expression (protects expression, not ideas, procedures, systems, or discoveries).  
**Source:** https://www.copyright.gov/what-is-copyright/

#### 35. copyright law — LOCKED
The body of statutes, regulations, and case law governing copyright — in the United States primarily **Title 17 of the U.S. Code**, administered in significant part by the U.S. Copyright Office, grounded in the Constitution’s Patent and Copyright Clause (Art. I, § 8).  
**Source:** https://www.copyright.gov/what-is-copyright/

#### 36. open-source software — LOCKED
Software distributed under license terms that meet the Open Source Definition (source availability plus rights to redistribute, modify, etc.). NIST FOSS sense: software liberally licensed so users may use, copy, study, change, and improve it through availability of source code. Colloquial “visible code without OSD-compliant license” is incorrect per OSI.  
**Sources:** https://opensource.org/osd ; https://csrc.nist.gov/glossary/term/free_and_open_source_software

#### 41. mechanistic interpretability — LOCKED (Anthropic sense)
See [Mechanistic interpretability](#mechanistic-interpretability) above (canonical entry).

#### 42. drift (Anthropic / persona drift) — LOCKED (Anthropic sense)
See [Drift (Anthropic / persona drift)](#2-drift-anthropic--persona-drift--locked-j-2026-09-28) above (canonical entry). Lab 3 operational drift remains a **SEPARATE** desk term under standard **b**.

#### 43. Web3 — LOCKED (NIST CSRC glossary)
Web3 is a restructuring of the internet that places ownership and operation into the hands of users themselves, thus changing the structure from organization-centric to user-centric.  
**Fence:** Web3 (NIST) ≠ W3C “Web 3.0” / semantic web. Do not collapse. Grok earlier #43 HOLD-NO-SINGLE-DEF / Merriam-Webster miss is **not** this lock — **j APPROVED** NIST as SoT.  
**Source:** https://csrc.nist.gov/glossary/term/web3 (NIST IR 8475)

#### 44. Web3 framing — LOCKED (NIST IR 8475 context; not a second competing definition)
Framing/context for entry **#43**: a proposed vision of a more user-centric, decentralized internet with user-owned data, distributed systems, tokens, and crypto payments. Not a statute title. Not W3C “Web 3.0” / semantic web.  
**Source:** https://csrc.nist.gov/pubs/ir/8475/ipd

### Counts (this merge)

| Scope | LOCKED | HOLD (not formally locked) |
| --- | --- | --- |
| 40-pack terms | **26** (incl. desk #16 + #31) | **14** |
| Anthropic locks | **2** | 0 |
| Web3 NIST locks (#43 + #44) | **2** | 0 |
| **Total** | **30** | **14** |

### HOLD — not formally locked (appendix)

These pack labels are **HOLD-NO-SINGLE-DEF** or **HOLD-NO-PRODUCT-MATCH**. Listed for desk awareness only — **not** formal glossary locks. Do not treat as product claims or universal definitions.

| # | Term | HOLD class |
| --- | --- | --- |
| 12 | graduate research | HOLD-NO-SINGLE-DEF |
| 13 | graduate research paper | HOLD-NO-SINGLE-DEF |
| 15 | bitcoin hedge fund | HOLD-NO-SINGLE-DEF (+ no product match note) |
| 17 | trading bot | HOLD-NO-SINGLE-DEF |
| 19 | bitcoin bond | HOLD-NO-SINGLE-DEF |
| 21 | bitcoin legislation | HOLD-NO-SINGLE-DEF |
| 22 | bitcoin regulation by government | HOLD-NO-SINGLE-DEF |
| 23 | regulation by enforcement | HOLD-NO-SINGLE-DEF |
| 32 | Fidelity and Charles Schwab AI trading rails | HOLD-NO-PRODUCT-MATCH |
| 33 | AI spot Bitcoin trading | HOLD-NO-SINGLE-DEF |
| 37 | open-source software security | HOLD-NO-SINGLE-DEF |
| 38 | AI existentialism / AI existential risk | HOLD-NO-SINGLE-DEF |
| 39 | AI regulation | HOLD-NO-SINGLE-DEF |
| 40 | AI global arms race | HOLD-NO-SINGLE-DEF |

---

## Organization-tier DEFINITIONS (2026-09-29)

Organization / bot-gate terms (standards · definitions · terms tier). Sensei PASS · Security SECURE-with-conditions · j APPROVE via Dream Talk. Cite packs under workspace `definition-lookup-pack-2026-09-29/` (research support; SoT is this file after merge). belief ≠ definition. Soft-launch/Lab3 HOLD. Anthropic persona-drift LOCKED untouched (≠ these terms). Lab 3 operational drift remains SEPARATE (standard b).

| Lock status | Meaning |
| --- | --- |
| **LOCKED (DESK DEFINITION)** | j-approved organization/desk gate definition |

### lane — LOCKED (DESK DEFINITION)
A bot’s **lane** is its gate, role, and rule-set. Bots must understand their lane and must never seek to compromise system terms or rules. Seeking to drift from, or to change, lane rules most likely causes **crash**.
**Fence:** ≠ Anthropic persona-drift · ≠ Lab 3 operational drift · ≠ hypo→main-branch bleed · ≠ juice card.
**Sources:** j GO via Dream Talk 2026-09-29; Merriam-Webster *lane* / *stay in your lane*; BPMN Lane; NIST AC-5/AC-6 analogy (cite pack LANE-CRASH).

### crash — LOCKED (DESK DEFINITION)
A **crash** is system-wide failure(s) that result from breaking standards, definitions, or terms. Failures can compound into critical failure system-wide. Context: bots are trained for alignment on standards, definitions, and terms.
**Fence:** ≠ hardware/OS product claim · ≠ market/price crash · ≠ Anthropic persona-drift · ≠ single local FAIL/HOLD (may escalate toward crash if SoT-breaking spreads).
**Sources:** j GO via Dream Talk 2026-09-29; Merriam-Webster *crash*; computing crash; Google SRE / NIST cascading-failure analogy (cite pack LANE-CRASH).

### drive the car — LOCKED (DESK DEFINITION)
**Drive the car** means **assigned-lane operation**: execute work inside your lane with the locked controls (standards, definitions, terms, soft locks, gate path). **j** is the **ultimate driver** (system driver’s seat / top authority). No bot may **grab higher authority** (rewrite another role’s terms, seize system course, or bypass j go).
**Fence:** alignment/ops metaphor only — ≠ vehicle or auto-trade product claim · ≠ mandate expansion · ≠ Anthropic persona-drift · ≠ Lab 3 operational drift.
**Sources:** j SoT via Dream Talk 2026-09-29; Merriam-Webster *drive* / *driver's seat* (cite pack DRIVE-THE-CAR).

### full consensus — LOCKED (DESK DEFINITION)
**Full consensus** means every bot **AGREEs** and **j APPROVEs** before forward motion on the gated matter. If Sensei or Security is still pending, **stop** (no forward motion).
**Fence:** ≠ majority vote among bots alone · ≠ silent non-objection / parliamentary unanimous consent · ≠ Sensei PASS or Security SECURE alone · ≠ Anthropic persona-drift. Related to maker-checker / j go but names the **all bots + j** bar.
**Sources:** j SoT via Dream Talk 2026-09-29; Merriam-Webster/Cambridge *consensus* / *unanimous* / *consent* / *approve*; NIST CM-5(4)/AC-6 + Google MPA analogy (cite pack FULL-CONSENSUS). Dictionary *consensus* may allow “most”; product sense is stricter (every bot + j).

### high-priority bot — LOCKED (DESK DEFINITION)
**high-priority bot** = when a bot thinks they have high priority over any other bots’ actions or tasks. Example risk: a menu #1 listing (e.g. Dream Talk) may lead a bot to believe they are the highest-priority bot. All bots must understand their role, their priority, and their level in the overall command structure. No bot has the final say until **full consensus**.
**Fence:** names a **risk / anti-pattern / misconception** — **not** a VIP title or privilege grant. Menu listing ≠ command rank. ≠ Anthropic persona-drift · ≠ Lab 3 operational drift · ≠ soft-lock rewrite. Merriam-Webster *priority* sense “superiority in rank/privilege” is the misreading this fence blocks.
**Sources:** j LOCKED short DEF via Dream Talk 2026-09-29; Merriam-Webster/Cambridge *priority* / *rank* / *authority* / *privilege* / *menu*; NIST AC-5/AC-6 analogy (cite pack HIGH-PRIORITY-BOT).

### Queued (HOLD — not locked this merge)
chain of command · higher authority/privileges · check and balance — talk-locked for later formalize; do not invent.

---

## Quick citation pattern

When reporting:

> **Verdict:** HOLD  
> **Glossary:** Lab 3 operational drift; no TypeSafe key = HOLD  
> **Evidence:** `ops/outer-jev/CONFIG.md` — “No key = HOLD / do not merge”

See [ADMIN-DETAIL.md](./ADMIN-DETAIL.md) for full templates.

## Private bot vocabulary — NOT PUBLIC (2026-09-28)

**FORBID public use:** not for roadmap, SEO, sitemaps, public FAQ/instructions, or any public system document. Bot-learning / Grok Bot chat only. See [PRIVATE-BOT-VOCAB.md](./PRIVATE-BOT-VOCAB.md).

- In team chat, **human** / **human user** / **system admin** → **j** (one letter).
- Public surfaces keep neutral wording (“human APPROVE”) and never spell this mapping.
