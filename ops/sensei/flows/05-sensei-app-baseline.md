# 05 — Sensei Bot App as baseline for new projects

Lab 3 is the first instantiation. Future S1R1US projects inherit the `ops/sensei/` package before feature work. Keep the same bot roles and handoff ([07-lab3-bot-workflow](./07-lab3-bot-workflow.md)).

```mermaid
flowchart TB
  L3[Lab 3 visible sandbox<br/>first instantiation] --> PKG[ops/sensei package]
  PKG --> NEW[New S1R1US project]
  NEW --> C1[Copy or link ops/sensei]
  C1 --> C2[Keep ops-only — no src import]
  C2 --> C3[Extend glossary carefully]
  C3 --> C4[Add Later-phase roadmap items]
  C4 --> C5[Wire BOT-INTERFACE + flow 07]
  C5 --> C6[Require ADMIN-DETAIL + INSTRUMENTATION cites]
  C6 --> C7[Companion ops/outer-jev: scan-runtime + score-patch]
  C7 --> READY[Standards baseline ready]

  NEVER[Never on Lab 3 desk items] -.->|do not smuggle onto paper desk| L3
```

```mermaid
flowchart LR
  subgraph Roles
    P[Proposer / Grok]
    S[Sensei]
    J[Outer Jev]
    D[Desk Steward]
    U[User APPROVE]
  end
  P --> S --> J --> D --> U
```

```mermaid
mindmap
  root((Sensei Bot App))
    Glossary a+b+c
    ROADMAP phases
    Admin detail
    Bot interface
    Flows Mermaid
    SEARCH-SCHEMA
    INSTRUMENTATION
    Outer Jev companion
```

See [APP.md](../APP.md) and [ROADMAP.md](../ROADMAP.md) § Later.
