# 05 — Sensei Bot App as baseline for new projects

Lab 3 is the first instantiation. Future S1R1US projects inherit the `ops/sensei/` package before feature work.

```mermaid
flowchart TB
  L3[Lab 3 visible sandbox<br/>first instantiation] --> PKG[ops/sensei package]
  PKG --> NEW[New S1R1US project]
  NEW --> C1[Copy or link ops/sensei]
  C1 --> C2[Keep ops-only — no src import]
  C2 --> C3[Extend glossary carefully]
  C3 --> C4[Add Later-phase roadmap items]
  C4 --> C5[Wire BOT-INTERFACE sequence]
  C5 --> C6[Require ADMIN-DETAIL reports]
  C6 --> READY[Standards baseline ready]

  NEVER[Never on Lab 3 desk items] -.->|do not smuggle onto paper desk| L3
```

```mermaid
mindmap
  root((Sensei Bot App))
    Glossary a+b+c
    ROADMAP phases
    Admin detail
    Bot interface
    Flows Mermaid
    Outer Jev companion
```

See [APP.md](../APP.md) and [ROADMAP.md](../ROADMAP.md) § Later.
