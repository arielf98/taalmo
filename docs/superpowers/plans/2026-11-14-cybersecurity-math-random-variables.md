# Cybersecurity Math Random Variables Plan

**Goal:** CM-05c/L3M03 from [approved design](../specs/2026-11-07-cybersecurity-math-design.md), base5d7d864 pushed. Three complete bilingual lessons distribution/expectation, Bernoulli/binomial, geometric/variance; all stages, two3-item lesson sets, module2×5 and task/rubric.42published/78draft before this module.

**Scope/interfaces:** `random-variables.ts` content; focused `MathRandomVariableVisual`; types/catalog/dispatch/current docs/runtime. `distribution` model0…2 and positive scale1…3: probabilities on base outcomes0,1,2 are respectively[2,0,2]/4,[0,4,0]/4,[1,2,1]/4. `binomial` n0…5,q0…4 for p=q/4; all k0…n and exact integer numerator/4^n. `geometric` q0…4,horizon1…6; exact first-success buckets1…h plus explicit tail T>h, common denominator4^h. Bounds feed existing restore/observation gates. No grading/storage/route API/version change, deps, random sampling or unit tests.

## Review focus

- Random variable maps elementary outcomes to numbers; distribution totals1, expectation sum x p(x), not necessarily an attainable outcome or a guarantee. Linearity of finite expectations does not require independence; identical means do not identify distributions. Scale changes values and means, not probabilities.
- Bernoulli indicator support0/1; binomial counts fixed n iid Bernoulli with common p, k0…n, PMF C(n,k)p^k(1−p)^(n−k), mean np. n0 gives certain0, p0 gives certain0, p1 gives certainn without evaluating ambiguous0^0. Without replacement or changing p generally not binomial.
- Geometric T counts trial INCLUDING first success, support1,2,…; iid constant p>0, P(T=t)=(1−p)^(t−1)p, tail P(T>h)=(1−p)^h, E1/p, Var(1−p)/p². p0 never succeeds,no finite mean and no ordinary variance; p1 certain1/Var0. p<1 has no finite deterministic upper bound despite a finite mean. Display tail explicitly; mean uses full distribution, not truncated chart.
- Variance E[(X−μ)²]=E[X²]−μ²,nonnegative,squared units,zero for constants. Different spreads can share a mean. Var of a sum uses covariance unless independent (or uncorrelated); don't infer np(1−p) from marginal p alone. No conflation with sample-variance estimators or real device measurements.
- Histogram fixed probability axis0…1 and labeled outcomes/probabilities, table equivalent, native controls/live results, explicit finite graph limits. All numerical answer fractions fit existing bounds. Transfer contexts differ from worked examples; written arguments need human review.

## Tasks

- [x] Author/register complete bilingual lessons/checks/task.
- [x] Implement histogram/table/controls and update all current docs.
- [x] One fresh source review/fix pass; authorized build/start/HTTP/representative browser checks, restore user next-env, scoped commit/push.

## Ledger

- Ruling: exact small distribution models and discrete p-quarter controls rather than arbitrary PMF editing. Cost: visual does not accept all probabilities, while text teaches general p/domain assumptions.
- Ruling: finite geometric chart has an explicit tail bucket; theoretical mean/variance include the full infinite support. Cost: individual late-trial bars aren't drawn, but no probability mass silently disappears.
- Ruling: user bans new unit tests/suites/lint/audits; prior runnable-app request authorizes scoped build/start/HTTP/browser only. No full progress or written-proof certification.

- Own review: module PMF checks use fresh p values rather than copying the worked case. Final source review fix pass qualifies equal pattern weights to equal success counts k, states dependence prevents automatic binomial inference (not categorical impossibility), and says means NEED NOT coincide with mode/median/bounds instead of never coinciding. No other source blockers.
- Verification: final build exit0/182pages; startup ready72ms; new routes200/nextdraft404. Browser geometric target/p0/p1 and binomial n0p0 match normalized exact tables; tail retained and no official progress. User next-env restored exactly. Scoped commit/push follows; no unit/E2E/lint/audit.
