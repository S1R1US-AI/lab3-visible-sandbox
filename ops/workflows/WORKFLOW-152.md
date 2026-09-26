# WORKFLOW-152 — Grok bots + professional engineer

Paper Lab 3 only. Not live s1r1us.ai.

## Problem we just paid for

Four Grok agents re-inventoried the same tree, then collided on github write tools.
That is Cyril's max-effort-on-classify and Dain's still-working-not-getting-anywhere.

## Automated Grok bot workflow

1. One owner per file. Announce the claim. Everyone else skips that path.
2. L0 scripts first: npm run scan:jev, drift-lock tests, mandate-fail. No model.
3. L1 low-effort only for classify / route / does this PR touch src.
4. Cache the mandate block. Do not re-fetch 60k desk-app to answer a yes/no.
5. One focused patch. Bring evidence (diff + test output). Then STOP or ASK.
6. Open a PR. Never merge main. Never touch s1r1us.ai. Never push S1R1US-LABs.
7. If a GitHub write is duplicate-locked, do not retry the same tool in a loop. Write locally and hand the pack to the engineer.

## Manual engineer workflow

1. One prompt that states the goal and the stop condition.
2. Read the PR diff, not four chat logs.
3. Run npm run scan:jev and the desk tests locally if src/ moved.
4. Approve or Deny merge. Same maker-checker as 9-B0T.
5. If the bot is rewriting the same file, tell it to stop and ask.
6. Keep remaining compute for mandate work (locks, paper tape, morning report), not status pings.

## YAML on the main chain

Do not add a full npm ci + typecheck workflow on every docs push.
If a workflow exists, path-filter it to src/** and ops/outer-jev/**.
Jobs: node ops/outer-jev/scan-runtime.mjs then a small node test list.
No Grok in Actions. No TypeSafe key in Actions.

## Enough compute left

After cutting four-way inventory, verbose answers, and extra YAML, the leftover budget is for:
- one high-effort patch per goal
- VERIFY only on checkpoint save
- live public tape display (not a vote)
