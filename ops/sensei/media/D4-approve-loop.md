# D4 — Approve loop

**SoT:** `ops/sensei/media/` · No silent merge. Human **APPROVE** before main.  
**Aligns with:** [flows/07-lab3-bot-workflow.md](../flows/07-lab3-bot-workflow.md)

## Flow

```mermaid
flowchart TB
  P[Propose — paths + intent] --> S[Sensei — meaning vs GLOSSARY / ROADMAP / locks]
  S -->|FAIL or HOLD| X[Stop — no merge]
  S -->|PASS provisional| SEC[Security — controls SECURE/HOLD/FAIL]
  SEC -->|FAIL or HOLD| X
  SEC -->|SECURE provisional| ST{Touches desk / mandate?}
  ST -->|yes| STE[Steward mandate audit]
  ST -->|no| U[Human APPROVE]
  STE -->|FAIL| X
  STE -->|OK| U
  U -->|APPROVE| M[Merge allowed]
  U -->|no APPROVE| X
```

## Notes

- Sensei never substitutes for human APPROVE.
- Steward never substitutes for human APPROVE.
- Outer Jev scan (`npm run scan:jev`) sits with Security/ops gates on patches — see flows/04 and flows/07.
- Public X literature: `@S1R1US_AI` only.
