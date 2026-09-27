# D5 — Self-improve (inside lane)

**SoT:** `ops/sensei/media/` · Each bot improves **inside its lane**.  
**Hard rule:** Never rewrite a peer’s verdict words. Unclear → HOLD and ask.

## Flow

```mermaid
flowchart TB
  W[Work inside own lane] --> L{Learned something?}
  L -->|Yes — stays in lane| KEEP[Update own drafts / checklists / skill notes]
  L -->|Would change peer verdict words| BLOCK[Do not rewrite peer PASS/SECURE/HOLD/FAIL]
  BLOCK --> ASK[HOLD — ask Sensei / Security / human]
  KEEP --> CHK{Still clear?}
  CHK -->|Unclear or mixed| ASK
  CHK -->|Clear| NEXT[Next propose cycle — D4]
  ASK --> H[Human clarification]
  H --> W
```

## Notes

- Sensei does not rewrite Security’s SECURE/HOLD/FAIL.
- Security does not rewrite Sensei’s PASS/HOLD/FAIL.
- Dream Talk does not rewrite any lane or write project source.
- Self-improve never unlocks never-sell / FAQ-by-agent / size-by-agent / Coinbase create.
