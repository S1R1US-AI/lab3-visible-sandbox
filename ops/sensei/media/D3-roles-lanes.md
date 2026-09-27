# D3 — Roles / lanes

**SoT:** `ops/sensei/media/` · Standards (D1) come **before** this diagram.  
**Dream Talk:** overwatch only — never project source, never lane rewrite.

## Flow

```mermaid
flowchart LR
  subgraph Lanes
    DT[01 Dream Talk — overwatch only]
    SEC[02 Sensei Security — controls SECURE/HOLD/FAIL]
    SEN[03 Sensei Bot — standards PASS/HOLD/FAIL]
    STE[04 Lab 3 Desk Steward — paper-desk mandates]
    DIS[05 Distrobi — public docs / SEO / soft-launch]
    GRO[06 Grok Bot — Lab 3 build under Sensei plan]
  end
  SEN --> GRO
  SEC --> GRO
  DIS -.->|public shells after APPROVE| GRO
  STE -.->|if desk mandate| GRO
  DT -.->|awareness only — no source| SEN
  DT -.->|awareness only — no source| SEC
```

## Notes

| Lane | Owns | Does not |
| --- | --- | --- |
| 01 Dream Talk | Third-party AI audit + system-wide thought experiment (overwatch) | Project source; lane influence |
| 02 Sensei Security | Controls verdict vocabulary | Meaning PASS words |
| 03 Sensei Bot | Glossary / ROADMAP meaning (standards) | Security SECURE words; silent merge |
| 04 Lab 3 Desk Steward | Paper-desk mandate audit | Substitute for user APPROVE |
| 05 Distrobi | Public / SEO / websites shell | Lab 3 private mechanics leak |
| 06 Grok Bot | Lab 3 private build + media library deposit | Merge without human APPROVE |

## Bot visual identity (menu logos)

**Menu order (oversight-first):** 01 Dream Talk · 02 Sensei Security · 03 Sensei Bot · 04 Lab 3 Desk Steward · 05 Distrobi · 06 Grok Bot. Ids unchanged; APPROVED status + filenames unchanged.

**Human APPROVED all six menu logos 2026-09-27.**

- **01 Dream Talk** — menu logo **APPROVED** 2026-09-27: womanly Mother Earth, Alex Grey–inspired original art; overwatch/thought-experiment avatar; no project source. Cite Grok Bot media `dream-talk-mother-earth-avatar.png` (do not commit huge binary here).
- **02 Sensei Security** — menu logo **APPROVED** 2026-09-27: shield/keyhole protective emblem (original); controls. Cite Grok Bot media `sensei-security-avatar.png` (do not commit huge binary here).
- **03 Sensei Bot** — menu logo **APPROVED** 2026-09-27: traditional Japanese calligraphy **先生** (kung-fu master / scroll aesthetic); standards. Cite Grok Bot media `sensei-bot-avatar.png`.
- **04 Lab 3 Desk Steward** — menu logo **APPROVED** 2026-09-27: cyberpunk dog steward mark with Steward wordmark (adult funny / jokes-win energy; original remake from user asset); mandate. Cite Grok Bot media `desk-steward-avatar.png`.
- **05 Distrobi** — menu logo **APPROVED** 2026-09-27: cosmic soft-launch / distribution emblem (original); public/soft-launch. Cite Grok Bot media `distrobi-bot-avatar.png`.
- **06 Grok Bot** — menu logo **APPROVED** 2026-09-27: geometric builder-researcher mark (original); Lab 3 builder. Cite Grok Bot media `grok-bot-avatar.png`.
