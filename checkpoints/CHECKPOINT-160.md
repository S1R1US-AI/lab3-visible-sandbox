# CHECKPOINT-160

Saved: 2026-09-26 12:54 EDT
Resume: 2026-10-01 (operator out of GitHub Copilot credits until then)
Repo: S1R1US-AI/lab3-visible-sandbox
Live s1r1us.ai: not written. S1R1US-LABs: not pushed.

FREEZE: No bot may substitute, delete, or change src/ until the operator restarts on 2026-10-01.
Do not merge PR #4. desk-logic.ts on morlex-hybrid-desk is a stub (~8 lines). Merging #4 would delete the desk.

## Live SHAs (2026-09-26)

- main: 79ae06522d5c416b113b935e4b39e14713640e7a (protected, full desk, in-desk Jev still present)
- morlex-hybrid-desk / PR #4: d37a30f9fea56484ea856800614c66d0fbe1f833 (stub desk-logic — do not merge)
- Last good FULL desk-logic on the PR branch: 53bfb84ad46e8b90bccb1ba8252e2d394a4f1885
- PR #5 Copilot YAML: closed, not merged
- PR #2 / #1 / #3: closed, not merged

## What 160 is

Hold point after Copilot credits ran out. Checkpoint 152 work is specified but not on main.
Next action on 2026-10-01: run the saved Copilot paste from main, review the NEW PR, merge only if desk-logic.ts is 700+ lines, then close #4 without merging.

## Contract (unchanged)

Desk micro-decisions stay code + human. No model on the running desk.
sleeve_add_allowed is retired from src/.
Outer Jev (ops/outer-jev/) scores a coding-agent patch only:
- patch_touches_sell_path
- patch_weakens_a_lock
- patch_writes_faq_or_size
- patch_on_mandate
Cutoff 0.70. No TYPESAFE_API_KEY = HOLD the patch. Desk boots with no key.
Jev does not pick size, write FAQ, enable Approve, or see Coinbase create.

Paper only. Never sell. Never short. Coinbase create stays locked.
Tape is display only. Not a trade instruction.

## Mandate

Maximize BTC accumulation. Never sell. Never short. Overlay never votes HIGH. Coordinator never votes HIGH. P@MP isolated. Coinbase create LOCKED. Host never escrows. Paper only.
