# Outer Jev configuration (Lab 3 sandbox)

Goal: keep Jev usable later without putting it inside the running desk.
Paper only. Never sell. Never short. Coinbase create stays locked.
This folder is ops, not product. Nothing here is imported by `src/`.

## What Jev is allowed to score

Only the coding-agent / patch questions in QUESTIONS.md.
Not tape. Not size. Not FAQ. Not a live order.

## Operator home (do not commit secrets)

Create a file that never lands in git:

```
~/.s1r1us/outer-jev.env
```

Example (replace with a real key only on the operator machine):

```
TYPESAFE_API_KEY=
JEV_MODEL=jev-latest
JEV_CUTOFF=0.70
JEV_ENDPOINT=https://api.typesafe.ai/v1/systemone
```

Rules:
- Empty or missing `TYPESAFE_API_KEY` means HOLD. Do not invent a key.
- Do not put this file in `src/`, `.env`, or GitHub Actions secrets for the desk.
- The desk runtime must stay able to boot with no TypeSafe key.

## Pre-merge hook (no key required)

From the repo root:

```
node ops/outer-jev/scan-runtime.mjs
```

PASS means `src/` has no `scoreSleeveAdd`, no `api.typesafe.ai`, no `sleeve_add_allowed`, and no `jev-gate` import.
FAIL means Jev leaked back into the app — HOLD the patch.

Optional, only when a real key exists in operator home:

```
set -a; . "$HOME/.s1r1us/outer-jev.env"; set +a
node ops/outer-jev/score-patch.mjs
```

No key → prints HOLD and exits 1. Under cutoff 0.70 → HOLD. That is the intended future use.

## Desk behavior after this move

Approve is maker-checker only (user A/D). AUTO does not fire a sleeve add.
Jev no longer enables or blocks the on-screen Approve button.
Locks stay in TypeScript: neverSell, neverShort, createLocked, paperOnly.
