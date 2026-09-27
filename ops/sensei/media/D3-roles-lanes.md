# D3 — Roles / lanes

**SoT:** `ops/sensei/media/` · Standards (D1) come **before** this diagram.  
**Dream Talk:** overwatch only — never project source, never lane rewrite.

## Flow

```mermaid
flowchart LR
  subgraph Lanes
    SEC[01 Sensei Security — controls SECURE/HOLD/FAIL]
    SEN[02 Sensei — definitions PASS/HOLD/FAIL]
    DIS[03 Distrobi — public docs / SEO / soft-launch]
    GRO[04 Grok — Lab 3 build under Sensei plan]
    STE[05 Lab 3 Desk Steward — paper-desk mandates]
    DT[06 Dream Talk — overwatch only]
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
| 01 Security | Controls verdict vocabulary | Meaning PASS words |
| 02 Sensei | Glossary / ROADMAP meaning | Security SECURE words; silent merge |
| 03 Distrobi | Public / SEO / websites shell | Lab 3 private mechanics leak |
| 04 Grok | Lab 3 private build + media library deposit | Merge without human APPROVE |
| 05 Steward | Paper-desk mandate audit | Substitute for user APPROVE |
| 06 Dream Talk | Third-party AI audit + system-wide thought experiment | Project source; lane influence |

## Bot visual identity (menu logos)

**Human APPROVED all six menu logos 2026-09-27.**

- **01 Sensei Security** — menu logo **APPROVED** 2026-09-27: shield/keyhole protective emblem (original). Cite Grok Bot media `sensei-security-avatar.png` (do not commit huge binary here).
- **02 Sensei Bot** — menu logo **APPROVED** 2026-09-27: traditional Japanese calligraphy **先生** (kung-fu master / scroll aesthetic). Cite Grok Bot media `sensei-bot-avatar.png`.
- **03 Distrobi** — menu logo **APPROVED** 2026-09-27: cosmic soft-launch / distribution emblem (original). Cite Grok Bot media `distrobi-bot-avatar.png`.
- **04 Grok Bot** — menu logo **APPROVED** 2026-09-27: geometric builder-researcher mark (original). Cite Grok Bot media `grok-bot-avatar.png`.
- **05 Lab 3 Desk Steward** — menu logo **APPROVED** 2026-09-27: cyberpunk dog steward mark with Steward wordmark (adult funny / jokes-win energy; original remake from user asset). Cite Grok Bot media `desk-steward-avatar.png`.
- **06 Dream Talk** — menu logo **APPROVED** 2026-09-27: womanly Mother Earth, Alex Grey–inspired original art; overwatch/thought-experiment avatar; no project source. Cite Grok Bot media `dream-talk-mother-earth-avatar.png` (do not commit huge binary here).
