# Sensei media — Grok library SoT (D1–D5)

**Package:** `ops/sensei/media/`  
**Role:** Source of truth for private Sensei/Grok training diagrams (standards → roles → approve → sandbox → self-improve).  
**Stamp:** 2026-09-27 · branch `docs/sensei-media-d1-d5-20260927`  
**Scope:** Ops-only. Not imported by `src/`. Not live s1r1us.ai. No public FAQ rewrite. No contested geopolitics.

## Diagram set

| ID | Title | Mermaid source | PNG export |
| --- | --- | --- | --- |
| D1 | Standards-first (GLOSSARY a+b+c + Team Boolean) | [D1-standards-first.md](./D1-standards-first.md) | [D1-standards-first.png](./D1-standards-first.png)  |
| D2 | Sandbox map (Lab 3 / homepage / mobile) | [D2-sandbox-map.md](./D2-sandbox-map.md) | [D2-sandbox-map.png](./D2-sandbox-map.png)  |
| D3 | Roles / lanes (incl. Dream Talk overwatch) | [D3-roles-lanes.md](./D3-roles-lanes.md) | [D3-roles-lanes.png](./D3-roles-lanes.png)  |
| D4 | Approve loop | [D4-approve-loop.md](./D4-approve-loop.md) | [D4-approve-loop.png](./D4-approve-loop.png)  |
| D5 | Self-improve inside lane | [D5-self-improve.md](./D5-self-improve.md) | [D5-self-improve.png](./D5-self-improve.png)  |

See [manifest.json](./manifest.json) for checksums and export status.

## Story lock (order)

1. **D1** — STANDARDS / DEFINITIONS first (a+b+c + Team Boolean dual vocabularies)
2. **D3** — ROLES / LANES (01–06; Dream Talk overwatch only)
3. **D4** — APPROVE loop (propose → Sensei → Security → Steward if mandate → human APPROVE → merge)
4. **D2** — SANDBOX map (ship only to matching track after APPROVE)
5. **D5** — SELF-IMPROVE inside lane (no peer-verdict rewrite; HOLD when unclear)

## Dream Talk NOTE

Dream Talk is a **third-party AI audit** and simultaneously a **system-wide thought experiment**. It is part of an experiment to align Grok bots with human principles and a search for ultimate truth. **Overwatch only** — never project source, never lane influence.

## Related

- Private training: [TRAINING-OUTLINE.md](../TRAINING-OUTLINE.md)
- Living roadmap: [ROADMAP.md](../ROADMAP.md)
- Existing flows (companion, not replaced): [flows/INDEX.md](../flows/INDEX.md)
- Glossary / Team Boolean: [GLOSSARY.md](../GLOSSARY.md)
- Workspace PNG practice renders (not SoT): `/workspace/sensei-flow-exports/` (legacy flow exports 01–07)

## PNG export

PNG renders for D1–D5 are committed beside the Mermaid sources (rendered 2026-09-27 via `@mermaid-js/mermaid-cli`). Mermaid `.md` / `.mmd` remain editable SoT; regenerate with:

```bash
npx -y @mermaid-js/mermaid-cli -p /path/to/puppeteer-config.json \
  -i ops/sensei/media/D1-standards-first.mmd -o ops/sensei/media/D1-standards-first.png
```
