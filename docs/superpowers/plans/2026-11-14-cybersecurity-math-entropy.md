# Cybersecurity Math Entropy and L3 Assessment Plan

**Goal:** Complete CM-05d/L3M04 and L3 assessment under [approved design](../specs/2026-11-07-cybersecurity-math-design.md). Basef90da40 pushed:45published/75draft. Three complete bilingual lessons Shannon information/entropy,min-entropy/bias,collision/birthday bounds;2×3 lesson checks,2×5 module checks/task,2×18 level checks covering all12lessons plus guards.

**Scope/interfaces:** `entropy.ts`,`l3-assessment.ts`,focused `MathEntropyVisual`,bounds/catalog/dispatch/current docs/runtime. `shannon` model0uniform4/1weights[4,2,1,1]/8/2deterministic and selected symbol0…3; `min-entropy` length1…4 and mode0independent fair bits/1copies of one fair bit; `birthday` output count N1…8 and q0…6 iid uniform outputs. Exact small integer fractions,approximation explicitly marked. No random simulation,attack code,new deps or grading/storage/route API change.

## Review focus

- Information I(x)=−log2 p(x) for p>0, Shannon H=ΣpI;zero weights contribute0 without evaluating log0. Impossible outcome has no finite information under model. H expected information,not storage length or expected guess count; distributions explicit,deterministic H0,uniformm Hlog2m.
- Hmin=−log2(max p),best one-shot success=max p;Hmin≤H. Bias/correlation change joint entropy;lengthk fair marginals alone do not implykbits entropy. Copied fair bits have only two positive strings,entropy1 regardlessk≥1. No real human-secret estimate or security certification.
- q iid uniform outputs in N≥1 bins:exact no-collision product for q≤N,collision1 ifq>N; q0/1 collision0. Expected colliding pairs λ=q(q−1)/(2N) is not itself a probability;union bound Pcollision≤min(1,λ). Approximation1−exp(−λ) assumes individual i/N small;further≈λ requires λ≪1. Exact authoritative for toy sizes;never force approximations in deterministic regime. Explain e≈2.718 and exponential;no hidden natural-log prerequisite. Birthday existence/event differs from hitting a fixed target (preimage),search algorithm/cost or real hash cryptanalysis.
- Level assessment exact fractions/finite models,all12lessons and model guards,balanced comparable sets. Existing ≥85%/all critical/all modules gate remains;no L4 publication. All learner arguments retain human-review status.
- Native labels/keyboard/table equivalents/live results,finite bounds/zero cases,probability mass totals1. No unit creation/suites/lint/audits;prior runnable-app request authorizes build/start/HTTP and representative browser checks only.

## Tasks

- [x] Author/register three complete lessons/checks/task and L3 assessment2×18.
- [x] Implement focused visuals/bounds/dispatch/current docs.
- [x] Fresh source reviewer/fix pass,authorized build/start/route/browser checks,restore user files,scoped commit/push.

## Ledger

- Ruling: predefined probability models and short bit strings instead of an arbitrary entropy calculator. Cost: cannot estimate user passwords;explicitly no such claim.
- Ruling: exact finite collision fractions with a separately labeled approximation and pair-count bound;do not animate random draws. Cost: no search-cost/algorithm measurement,only model probabilities.
- Ruling: no unit-test creation/suites/lint/audits per user. Scoped runnable-app evidence does not certify every assessment/progress path or written argument.

- Own review: birthday-only arithmetic is guarded from other visual state domains; q0/1 receive exact no-pair explanation rather than a negative(q−1)/N display. Added full module2×5 and level2×18 registration after all L3 lessons authored. L4 stays draft.
- Final review fix pass: exp(−λ) approximates no-collision product,its complement collision probability;confirmed 1−exp(−λ) is also a lower bound via1−x≤exp(−x),distinct from upper min(1,λ). Raw Shannon weights sum8/normalized probabilities1,Indonesian decimals restored. All36level and28lesson/module keys reviewed consistent. Removed finite-decimal equality from exact λ/upper-bound display. No other source blockers.
- Verification: final build exit0/185pages; startup ready72ms; main/newroutes200 and L4draft404. Browser Shannon uniform/bias/deterministic-zero and birthday target/q0/q>N matched source;no official progress. User next-env restored. All tasks source-reviewed; scoped commit/push follows. Unit/E2E/lint/audit not run.
