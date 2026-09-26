# 06 — Admin detail disclosure flow

Max-detail reports for Sensei and peer bots. Templates live in [ADMIN-DETAIL.md](../ADMIN-DETAIL.md).

```mermaid
flowchart TB
  E[Trigger: patch / audit / incident] --> G[Gather]
  G --> G1[Verdict candidate]
  G --> G2[Glossary terms]
  G --> G3[File paths]
  G --> G4[Lock names]
  G --> G5[Diagram links]
  G --> G6[Patch questions]
  G --> G7[Scan commands]
  G --> G8[Evidence quotes]
  G1 & G2 & G3 & G4 & G5 & G6 & G7 & G8 --> R[Compose admin report]
  R --> V{Final verdict}
  V -->|PASS| A[Show full detail → APPROVE gate]
  V -->|HOLD| B[Show blockers — no merge]
  V -->|FAIL| C[Show violation — no merge]
```

**Minimum bar:** verdict + glossary cite + path + evidence quote. Prefer including scan command output when a patch is involved.
