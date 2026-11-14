# Cybersecurity Math Bayes and Base Rate Plan

**Goal:** CM-06b/L4M02 from [approved design](../specs/2026-11-07-cybersecurity-math-design.md),base bea0130 pushed,51published/69draft. Three complete bilingual lessons reversing conditionals,natural frequencies,base-rate fallacy. All stages,2×3 lesson sets,2×5 module sets and task/rubric.

**Scope/interfaces:** `bayes.ts`,focused `MathBayesVisual`,types/bounds/catalog/dispatch/current docs/runtime. `bayes-reverse` table0…2/direction0DgivenA-or1AgivenD; tables[TP,FN,FP,TN]=[3,1,4,12],[6,4,2,8],[0,4,0,16],N20. `natural-frequencies` scale1…3 for N=10000scale,priorPercent1…10,TPR90%,FPR5%;integer counts exact. `base-rate` priorPercent1…20,FPRPercent0…20,N10000,TPR90%;both truth classes nonempty,alerts positive. Zero-alert conditional handled by first visual's third table. No freeform classifier editor,data imports,dependencies,storage/grading/route API or versions changes;L4 assessment stays draft.

## Review focus

- Truth D and alert A distinct. P(A|D)=TP/(TP+FN),P(D|A)=TP/(TP+FP);reverse not automatically equal. Bayes derives from joint identity and law of total probability,not independence or causality. P(A)>0 required;no alert means posterior undefined,not0. Known synthetic truth is not assumed observable in actual logs.
- Canonical10000events,prior1%,TPR90%,FPR5% gives D100,notD9900,TP90,FN10,FP495,TN9405,alerts585,posterior90/585=2/13≈15.38%. Rates and counts label denominators/units clearly;scaled cohorts preserve ratio,not measured empirical data.
- Base rate changes posterior with TPR/FPR fixed. FPR=P(A|notD) differs from false-alert fraction P(notD|A),which equals1−posterior when alerts positive. TPR alone not overall accuracy/PPV. FPR0 with positive TP yields posterior1,but can still miss D. Population/model shift and sampling limits explicit;no real detector or medical/security diagnosis.
- Count tree schematic,not probability-area scale;full captioned contingency table equivalent. No ambiguous fractional expected counts:chosen percentage grids keep every cell integer. Exact fraction display,decimal approximations labeled. Minimal existing tuple bounds/restore/target gating reused;native controls/live result and no official progress from preview.
- User bans unit creation/suites/lint/audits. Prior runnable-app request permits scoped build/start/HTTP/representative browser checks. Source reviewer then commit/push;preserve unrelated files and exact next-env bytes.

## Tasks

- [x] Author/register full bilingual lessons/checks/task.
- [x] Implement tables/tree/base-rate controls and current docs.
- [x] Fresh source review/fix pass,authorized runnable-app verification,restore user state,commit/push.

## Ledger

- Ruling: fixed known-truth toy tables and integer-count cohorts,not an operational detector/calibration tool. Cost:no deployment or real PPV claim;model must fit data before application.
- Ruling: percentage controls keep classes nonempty;zero-alert denominator is a separate explicit scenario rather than making zero-class rates look measured. Cost:visual does not cover every possible boundary;lesson/practice discuss denominator conditions.
- Ruling: no unit tests/suites per user;source review and permitted smoke checks do not certify every mastery path or written argument.

- Own review: both truth classes remain positive in controls;only no-alert scenario makes posterior denominator zero. Integer cohort arithmetic and curve samples have complete table equivalents;rounded percentages marked≈after exact fractions. No extra UI metrics or operational recommendations.

- Fresh independent source review: no important findings; counts/keys/zero-denominators/plots/registration reviewed. Build compiled/TypeScript/static generation191 completed; HTTP/browser evidence in runtime document. Exact next-env restored. Scoped commit and normal push close this milestone.
