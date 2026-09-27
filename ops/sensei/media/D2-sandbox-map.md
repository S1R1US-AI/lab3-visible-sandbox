# D2 — Sandbox map (separate tracks)

**SoT:** `ops/sensei/media/` · Paper Lab 3 ≠ live homepage ≠ mobile.  
**Rule:** After human APPROVE, ship **only** to the matching sandbox. Never conflate tracks.

## Flow

```mermaid
flowchart TB
  AP[Human APPROVE granted] --> Q{Which sandbox?}
  Q -->|Lab 3 — post-login paper desk| L3[Lab 3 paper track only]
  Q -->|Live homepage — pre-login front door| HP[Live homepage track only]
  Q -->|Mobile — separate product track| MOB[Mobile track only]
  L3 --> NOTE[Do not write other tracks from this ship]
  HP --> NOTE
  MOB --> NOTE
  NOTE --> X[Public X: @S1R1US_AI only — no admin/dev handles]
```

## Notes

- Lab 3 work in this repo is **paper desk only** — does not write https://s1r1us.ai.
- Live homepage / SEO / public FAQ are Distrobi lane (separate APPROVE).
- Mobile is its own track; never smuggle Lab 3 desk mechanics into front-door copy.
