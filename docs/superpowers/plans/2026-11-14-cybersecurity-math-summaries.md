# Cybersecurity Math Summarizing Data Plan

**Goal:** CM-06a/L4M01 from [approved design](../specs/2026-11-07-cybersecurity-math-design.md),base d16bc12 pushed,48published/72draft. Three complete bilingual lessons samples/bias,mean/median/quantiles/outliers,variation/standardization;2×3 lesson sets,2×5 module sets and task/rubric.

**Scope/interfaces:** `summaries.ts`,focused `MathSummaryVisual`,types/bounds/catalog/dispatch/current docs/runtime. `sampling`: mode0first/1last/2predeclared mixed ordering and size0…8 of eight known toy requests:interactive1,1,2,2ms/background8,8,10,10ms. No random draw or claim mixed ordering ensures representation. `summary`: tail0…30 and prefix size0…5 of[1,1,2,2,tail]ms,sorted for calculations;sample size0 undefined mean/median/percentiles. `standardization`: center4…12,spread0…4,full toy population[μ−s,μ−s,μ+s,μ+s],reference x10ms. Values remain nonnegative;σ=s;zeroσ means undefined z. Existing tuples/restore/target gate reused;no grading/storage/route APIs/version changes.

## Review focus

- Population,target/frame,sample and missing data distinct;larger convenience samples need not remove frame/selection/survivorship bias. Toy population mean42/8=21/4 known only because all eight toy records are given. Empty sample is not zero latency. No representativeness inferred from deterministic mixed order or one mean match;stratified summaries need population weights.
- Mean uses all data;median usual sorted middle/average of two middles. Explicit nearest-rank percentiles for0<p≤1:sorted rank ceil(pn). P25/P75 use this convention and may differ across software;usual even-n median need not equal nearest-rank P50. IQR=P75−P25 and strict1.5IQR flags are descriptive,not evidence of attacks or automatic deletion. Fixed0…30ms dot plot,duplicate stacking and noncolor markers,text/table equivalent. Provided task1,1,2,2,24 gives mean6/median2/P25=1/P75=2/IQR1.
- Variance:full-population sum squared deviations/n;sample variance estimate / (n−1),n≥2 with iid finite-variance conditions for unbiasedness. Do not conflate conventions;single observation population variance0 while sample estimator undefined. SD=sqrtvariance in original units,z=(x−μ)/σ dimensionless onlyσ>0. z alone does not imply a tail probability or Gaussian model;shading±σ not a confidence interval. Reference10ms may be outside dataset,explicitly a hypothetical new value.
- All stages/hints/feedback/edge/transfer/reflection,two comparable sets/rubric. Fractions and rounding within existing grader;undefined must not grade as0. Unit-test creation/suites/lint/audits remain banned;prior runnable-app request allows build/start/HTTP/representative browser checks. Preserve user files;scoped commit/push and continue roadmap.

## Tasks

- [x] Author/register complete lessons/checks/task.
- [x] Implement three focused visuals/bounds/dispatch and current docs.
- [x] Fresh source review/fix pass,authorized runnable-app checks,restore user next-env,commit/push.

## Ledger

- Ruling: finite toy data and deterministic selectable sampling orders,not a random-sampling simulator or arbitrary CSV tool. Cost:no empirical performance claim or general data analysis;all populations/frames stated.
- Ruling: nearest-rank P25/P75 with usual median,explicitly differing conventions for even-n P50. Cost:other software quartiles may differ;learner must name convention.
- Ruling: no unit creation/suites per user;source review and scoped runnable-app checks do not certify all progression or written reasoning.

- Own implementation ruling: center extends4…12 (spread0…4) so x_ref10 can be below,on or above mean while all synthetic latencies remain0…16. Cost: broader but still fixed plotting axis;no arbitrary data inputs.
- Final fresh source review: clean,no important findings. Verification: build exit0/188pages,startup ready70ms,new routes200/nextdraft404;browser ztarget/zeroSD and summarytarget/empty match declared conventions. No official progress;user next-env restored exactly. Scoped commit/push follows;unit/E2E/lint/audit not run.
