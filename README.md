# Lab 3

Paper trading desk for S1R1US. Not the live site at s1r1us.ai.

Coinbase create stays locked. The desk does not sell the stack.

Desk micro-decisions (locks, CLIP, sleeve cap, overlays, Approve) are code + human. No model call on the running desk.

Jev is outside `src/`. Outer questions live in `ops/outer-jev/` and score a coding-agent patch before a dangerous write. No TypeSafe key means HOLD the patch. The desk boots without a key.

The older clickable still is in `snapshot/clickable-still.html`.

`npm run scan:jev` fails if Jev leaks back into `src/`.
