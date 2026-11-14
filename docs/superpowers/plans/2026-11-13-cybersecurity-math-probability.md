# Cybersecurity Math Probability Plan

**Goal:** CM-05b/L3M02 under the [approved design](../specs/2026-11-07-cybersecurity-math-design.md). Base245053f pushed,39published/81draft. Complete three bilingual lessons: sample spaces/events, complement/union/conditional probability, independence/repeated trials.

**Scope:** `probability.ts` complete lesson stages, two3-item checkpoint sets each, module2×5 and task/rubric. `MathProbabilityVisual` finite ticket sample/table, event-membership grid and conditional denominators, two-trial exact probability tree/table. Types/bounds/catalog/dispatch/current status/runtime docs. No dependencies, probability engine, random simulation, storage/schema/route API change or tests.

**Interfaces/preflight:** `sample-space`: red/blue distinct ticket counts0…4/0…4, uniform among tickets; total0 invalid. `conditional`: two event masks0…15 on four equally likely outcomes, including conditioning on empty B as undefined. `repeated-trials`: N1…16 and mode0two distinct guesses/1two iid uniform guesses with replacement against one fixed unknown uniform synthetic target. N1/mode0 cannot supply two distinct guesses; mark unavailable, not clamp or divide by0. Existing tuple validation and target gates apply; published-only routing and L2 assessment prerequisite remain. L3 assessment stays draft.

## Review focus

- Sample space must be nonempty; event probability ratio only for equiprobable elementary outcomes. A biased generator needs explicit weights summing1. Empty event probability0 differs from empty sample space; probabilities in[0,1].
- P(Aᶜ)=1−P(A), P(A∪B)=P(A)+P(B)−P(A∩B). Conditional P(A|B)=P(A∩B)/P(B), P(B)>0; conditioning restricts denominator and differs from converse. Masks are internal UI encoding only.
- Independence P(A∩B)=P(A)P(B), not disjointness; positive-probability disjoint events dependent. Zero-probability B makes P(A|B) undefined, even if product definition can hold.
- Fixed target, guesses independent of target. With replacement: HH1/N²,HM/MH(N−1)/N²,MM(N−1)²/N². Two distinct guesses for N≥2: HH0,HM/MH1/N,MM(N−2)/N; later conditional changes after a miss. Tree paths multiply conditional probabilities; disjoint leaves add. All leaves sum1, boundaries N1/N2 exact. Counting results do not imply real password distributions or operational security.
- Full bilingual worked/practice/edge/hints/transfer/reflection/checkpoint; task human-review rubric preserved. Fractions exact within existing numerator/denominator bounds. No official progress from preview.

## Tasks

- [x] Author/register three complete lessons/checks/task.
- [x] Implement focused controls/tables/tree and update all current docs/status.
- [x] One fresh source reviewer/fix pass, authorized build/start/HTTP/representative browser checks, restore user next-env, scoped commit and push.

## Ledger

- Ruling: exact small finite models and a fixed two-trial tree, rather than sampling or a general probability editor. Cost: no arbitrary distributions/long trial sequences in the visual; general rules taught in text.
- Ruling: preserve user ban on unit creation/suites/lint/audits; prior explicit runnable-app request authorizes build/start/HTTP/representative browser checks only. Evidence does not certify all progress paths or written reasoning.

- Own review: distinguish impossible N1/no-repeat from valid N1/iid and undefined conditionals on zero-probability branches. Clarified that a changed target prior alone does not alter results for iid uniform guesses independent of target; fixed candidates can differ. Fractions remain inside existing exact-input bounds.
- Final review fix pass: task gives an explicit biased prior and separately compares a fixed pair, uniform distinct pair and iid uniform guesses. Uniform guessing schemes retain rates when only prior changes; fixed label pair can change. Conditional reflection now asks when probabilities differ OR coincide (positive conditioning probability), rather than asserting they always differ. No other review blockers.
- Verification14November: final build exit0/179pages; startup ready89ms; new routes200/nextdraft404. Browser confirms iidN16 leaves/31over256,N1 valid/invalid modes and empty conditioning undefined; no official progress. User next-env restored. Source-reviewed fixes complete; scoped commit/push follows. Unit/E2E/lint/audits not run.
