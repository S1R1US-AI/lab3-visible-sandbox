# D1 — Standards-first (GLOSSARY a+b+c + Team Boolean)

**SoT:** `ops/sensei/media/` · **Cite:** [GLOSSARY.md](../GLOSSARY.md) (a+b+c + Team Boolean)  
**Story:** Lock shared definitions **before** roles/lanes. Dual verdict vocabularies must not rewrite each other. HOLD ≠ FAIL.

## Flow

```mermaid
flowchart TB
  H[Human statement / intent] --> C{Clear true/false?}
  C -->|Unclear / mixed / illogical| HOLD[HOLD — pause and ask human]
  HOLD --> H
  C -->|Clear| STD[1. STANDARDS first — GLOSSARY a+b+c]
  STD --> A[a — shared definitions]
  STD --> B[b — Lab 3 operational drift]
  STD --> Cc[c — checkable meaning / evidence]
  A --> TB[Team Boolean contract]
  B --> TB
  Cc --> TB
  TB --> S[Sensei meaning: PASS / HOLD / FAIL]
  TB --> SEC[Security controls: SECURE / HOLD / FAIL]
  S -.->|neither rewrites peer words| SEC
  S --> NEXT[Then roles / lanes — see D3]
  SEC --> NEXT
```

## Notes

- Sensei owns **PASS/HOLD/FAIL** (mission meaning).
- Security Sensei owns **SECURE/HOLD/FAIL** (controls).
- HOLD means unknown / ask — not denied (FAIL).
- No contested geopolitics in glossary as asserted truth.
