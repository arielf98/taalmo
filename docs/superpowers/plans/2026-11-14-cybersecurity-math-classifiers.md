# Cybersecurity Math Classifiers Plan

Approved design CM-06c/L4M03; base f4ccb72 pushed,54 published/66 draft. Author three complete bilingual lessons,all six stages,2×3 lesson checkpoints,2×5 module checkpoints and task/rubric. No new dependency,route/progress/grader/schema/version change. Keep L4 assessment draft until M04 complete.

## Scope and decisions

- Content `classifiers.ts`, focused client visual,types/bounds/catalog/dispatcher;current requirements/curriculum/backlog/runtime docs. Reuse existing question cards,tuple state,restore bounds and target gating. No tests created;user bans suites/lint/audits. Runnable-app request authorizes scoped build/start/HTTP/preview UI only.
- Matrix controls table0…3 and multiplier1…3: [TP,FN,FP,TN]=[3,1,2,4],[0,4,0,6],[0,0,2,8],[0,0,0,0]. Metrics controls TP0…4/FP0…6,actual classes4/6 fixed. P=TP/(TP+FP),R=TP/(TP+FN),F1=2TP/(2TP+FP+FN) using explicitly count-based extension: F1 may be0 when P undefined,only zero total F1 denominator undefined. Accuracy undefined on empty table. Include no actual D and no actual non-D in written edge discussion.
- Threshold inclusive score>=t,0…101. Scores/truth:90D,80nonD,70D,70nonD,50D,40nonD,20D,10nonD. Scores rank only,not calibrated probabilities. Ties move together. FixedFP cost1,FN cost1…5;cost units illustrative. Target t50/FNcost3 ->3TP/1FN/2FP/2TN,P3/5,R3/4,F1=2/3,cost5.
- ROC xFPR/yTPR and PR xrecall/yprecision axes fixed0…1;all thresholds from101 and distinct scores plus selected threshold,descending. No precision at empty predicted-positive group: omit that PR point,show undefined in table,never invent precision1. Dashed connections visual guides,not interpolated observations/AUC/calibration. Explain lower thresholds increase recall/FPR but precision can move either direction;selection uses separate validation,not automatically best deployment threshold.
- Ruling: small fixed labeled dataset plus controls is enough to teach all requested math without imports/model engine. Cost: no inference about real detectors. Ruling: count-based F1 convention stated before edge questions;avoid teaching 0/0 as0. Ruling: continue authorized main branch and immediate normal push, preserve next-env bytes/unrelated files.

## Tasks

- [x] Full bilingual content/checkpoints/task and catalog integration.
- [x] Matrix/metric/threshold visual with accessible tables and current docs.
- [x] Fresh source review and one fix pass;authorized runnable checks,restore state,commit/push.

## Ledger

- Read current catalog,types,dispatcher,Bayes visual/content,blueprint and installed Next server/client guide before editing. Review all new callers/exports/bounds/metadata;no existing tests need changes under user instruction.

- Source reviewer: no substantive issues;minor curriculum6/2 vs9/3 fixed. Own review checked all keys/formulas/threshold cases. Build exit0/194 pages;HTTP and preview UI evidence recorded in runtime doc. Exact next-env restored;scoped commit/normal push close milestone. No suites/lint/audit run.
