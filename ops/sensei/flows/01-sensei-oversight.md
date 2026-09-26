# 01 — Sensei oversight of other bots

Sensei Bot oversees standards adherence across S1R1US bots. It does not replace Desk Steward mandate inventory or user APPROVE.

```mermaid
flowchart TB
  subgraph Proposers
    G[Grok Bot]
    C[Copilot / patch agent]
    O[Other S1R1US bots]
  end

  subgraph Sensei["Sensei Bot App (ops/sensei)"]
    GL[GLOSSARY a+b+c]
    RM[ROADMAP phases]
    AD[ADMIN-DETAIL report]
  end

  subgraph Gates
    J[Outer Jev ops/outer-jev]
    ST[Desk Steward mandate audit]
    U[User APPROVE]
  end

  G --> Sensei
  C --> Sensei
  O --> Sensei
  Sensei --> GL
  Sensei --> RM
  Sensei --> AD
  AD -->|PASS provisional| J
  AD -->|HOLD / FAIL| X[Stop — no merge]
  J -->|clear| ST
  J -->|HOLD| X
  ST -->|desk OK / N/A| U
  ST -->|mandate FAIL| X
  U -->|APPROVE| M[Merge allowed]
  U -->|no APPROVE| X
```

**Notes**

- Sensei id: `d40cd9e7-579d-4fc6-b860-60143c9d0b42`
- Paper Lab 3 only until a new project inherits the package
- See [BOT-INTERFACE.md](../BOT-INTERFACE.md)
