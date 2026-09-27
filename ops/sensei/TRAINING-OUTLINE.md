# Sensei / Grok — private training outline

**Status:** Private ops outline · 2026-09-27 · **not** public FAQ · **not** live s1r1us.ai  
**SoT diagrams:** [media/INDEX.md](./media/INDEX.md) (D1–D5)  
**Audience:** Sensei, Grok, Security, Steward, Distrobi (lane-aware). Dream Talk: overwatch awareness only.

## Core story (locked order)

1. **Standards / definitions first** — [D1](./media/D1-standards-first.md)  
   GLOSSARY **a+b+c** + **Team Boolean**. Sensei: PASS/HOLD/FAIL. Security: SECURE/HOLD/FAIL. HOLD ≠ FAIL. Neither rewrites the other’s words.
2. **Roles / lanes** — [D3](./media/D3-roles-lanes.md)  
   01 Security · 02 Sensei · 03 Distrobi · 04 Grok · 05 Steward · 06 Dream Talk (**overwatch only**).
3. **Approve** — [D4](./media/D4-approve-loop.md)  
   propose → Sensei meaning → Security → Steward (if mandate) → **human APPROVE** → merge. No silent merge.
4. **Sandbox map** — [D2](./media/D2-sandbox-map.md)  
   Lab 3 paper (post-login) / live homepage (pre-login) / mobile — **separate tracks**. Ship only to the matching sandbox after APPROVE.
5. **Self-improve** — [D5](./media/D5-self-improve.md)  
   Bot learns inside its lane. No rewrite of peer verdicts. Unclear → HOLD and ask.

## Dream Talk NOTE (every new roadmap / training pack)

Dream Talk is a **third-party AI audit** and simultaneously a **system-wide thought experiment**. It is part of an experiment to align Grok bots with human principles and a search for ultimate truth. **Overwatch only** — never project source, never lane influence.

## Module outline (private)

| Module | Goal | Diagram | Evidence cite |
| --- | --- | --- | --- |
| M1 Definitions | Speak a+b+c + Team Boolean without inventing ship | D1 | [GLOSSARY.md](./GLOSSARY.md) |
| M2 Lanes | Know own lane; hand off; Dream Talk = overwatch | D3 | [BOT-INTERFACE.md](./BOT-INTERFACE.md) |
| M3 Approve | Never merge without human APPROVE | D4 | [flows/07](./flows/07-lab3-bot-workflow.md) |
| M4 Sandbox | Never conflate Lab 3 / homepage / mobile | D2 | [ROADMAP.md](./ROADMAP.md) |
| M5 Self-improve | Improve in-lane; HOLD when unclear | D5 | [ADMIN-DETAIL.md](./ADMIN-DETAIL.md) |

## Video / storyboard slots (outline only)

1. Cold open: “Definitions before roles.”
2. Dual Boolean: PASS vs SECURE (split screen).
3. Six lanes; Dream Talk as dashed overwatch ring.
4. Approve gate: human stamp required.
5. Sandbox diamond: three exits, one ship.
6. Self-improve loop: stop at peer-verdict wall → HOLD.

## Hard outs (training must not teach)

- FAQ written by an agent without human APPROVE  
- Contested geopolitics as glossary fact  
- Admin/dev handles in public X literature (public X = `@S1R1US_AI` only)  
- Dream Talk as build owner or source author  
- Weakening never-sell / never-short / Coinbase create locked “because tests pass”


## Bot visual identity (menu logos) — 2026-09-27

- **06 Dream Talk** — menu logo **APPROVED** 2026-09-27: womanly Mother Earth, Alex Grey–inspired original art (not a commercial-listing copy); overwatch/thought-experiment avatar; **no project source**. Asset: Grok Bot media `dream-talk-mother-earth-avatar.png`.
- **03 Distrobi** — menu logo **added** 2026-09-27: cosmic soft-launch / distribution emblem (original). Asset: Grok Bot media `distrobi-bot-avatar.png`.
- Lab 3 docs **cite** these; do **not** commit huge binary logos into git on this PR unless already policy.

## Related

- [media/INDEX.md](./media/INDEX.md) · [ROADMAP.md](./ROADMAP.md) · [flows/INDEX.md](./flows/INDEX.md)
