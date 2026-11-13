# Cybersecurity Math Counting Plan

**Goal:** Complete CM-05a/L3M01 under the approved curriculum: three full bilingual lessons counting rules, permutations/combinations, inclusion–exclusion/pigeonhole. Base `0336a14` pushed;36published/84draft. Spec: [approved design](../specs/2026-11-07-cybersecurity-math-design.md).

**Scope:** `counting.ts` full stage contracts, two comparable lesson sets each, module2×5 and task/rubric; focused `MathCountingVisual` with disjoint labeled choices/product table, fixed two-person selection list, and balanced item-to-box diagram/table with bound proof plus a separate overlap example. Types/bounds, catalog/dispatch and current docs/status. No dependencies, generic combinatorics engine or grading/storage/route API changes.

**Interfaces/preflight:** `counting` two category sizes0…4; `selection` n0…5 and mode0unordered/1ordered, exactly2distinct people without replacement; `pigeonhole` Nitems0…6 and Mboxes1…4, one box per item. Existing tuple restoration and target gate apply. Register L3M01 only; L3 assessment remains absent. Official progress requires L2 assessment and prior modules, preview stays write-free.

## Review focus

- Sum rule only disjoint alternatives; product for successive choices with the stated per-branch counts, not an unstated probabilistic independence assumption. Constraints/repeats require re-counting. Empty category gives zero products but need not zero sum.
- All people distinct; roles distinguish ordered selections, teams do not. n! and0!, P(n,k),C(n,k) only with valid integer domains; k>n yields zero selections, not a negative factorial; k=0 one empty selection. No confusion with combinations with repetition or uniform probabilities.
- Two-set inclusion–exclusion subtracts overlap exactly once, not union-as-sum. Finite pigeonhole: N items each in exactly one of M≥1 boxes, some box has at least ceil(N/M); N>M forces a shared box. For2≤N≤M collisions remain possible without a guarantee; N<2 has no colliding pair. Chosen balanced assignment illustrates the sharp bound, not all assignments or a probability estimate. N=0 has max occupancy0; zero boxes is outside this visual/model.
- No real attacks/targets/permission changes; counts do not prove distributions or security. Native controls/text/table equivalence/live result. Full lesson transfer contexts differ from worked examples; module task has explicit quantities and rubric. Unit-test creation/suites/lint/audits remain banned; authorized build/start/HTTP and representative browser checks only.

## Tasks

- [x] Author/register three complete lessons, all checks and task/rubric.
- [x] Implement three focused visuals, bounds/dispatch and status docs.
- [x] Fresh source reviewer, one fix pass; build/start/route checks; preserve user files, scoped commit then immediate push.

## Ledger

- Ruling: fixed two-person selection visual lists every result (at most20), while general k formulas are taught in text/practice. Cost: visual does not enumerate arbitrary k, but no hidden truncation/extra engine.
- Ruling: use a balanced deterministic box assignment to illustrate the minimum unavoidable occupancy; explicitly distinguish it from arbitrary mappings and probabilities. No random simulation needed.
- Ruling: user forbids new unit tests/suites; evidence is source review and explicitly authorized runnable-app checks, not full regression coverage.

- Own review: qualified collision-possible statements with N≥2; N0/1 have no pair. Changed selection transfer to5collectors/3shifts so quantities differ from the worked4person example. No new grading/schema API.
- Final fresh review: source confirms arithmetic/enumeration/contracts/gates. Fixed all graded pigeonhole bounds to explicitly ask for the LARGEST guaranteed lower bound, avoiding rejection of another valid weaker bound; N0/1 qualification already fixed in own review and plan aligned. One source fix pass; no unit suite authorized.
- Browser finding: N0 correctly displayed empty boxes/max0, but reused a positive-N capacity explanation. Root cause was unconditional proof paragraph; now branches to an explicit empty-case explanation. Rebuild/browser recheck before closure.
- Verification: final build exit0/176pages after N0 fix; startup ready72ms; main/new routes200 and next draft404. Browser confirms20ordered/10unordered/0insufficient pairs, pigeonhole target/optional/empty and corrected empty explanation. User next-env restored exactly. Scoped commit/push follows; unit/E2E/lint/audit not run.
