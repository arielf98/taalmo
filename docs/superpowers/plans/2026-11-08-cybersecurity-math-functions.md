# Cybersecurity Math Functions Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline under the approved roadmap and the user's no-test/current-branch instructions.

**Goal:** Complete CM-03b/L1M02 with three bilingual lessons on functions/domains, linear graphs, composition/inverses, checkpoints and a written task.

**Architecture:** Add authored content to the existing catalog/player. Use three bounded visual kinds with the existing two-number exploration state: finite function table, linear graph and two-stage composition. Keep all answer/progress rules and existing IDs/version unchanged.

**Tech Stack:** Existing React/TypeScript, native controls, HTML tables and SVG; no dependencies.

**Spec:** [Approved design](../specs/2026-11-07-cybersecurity-math-design.md).

## Global constraints

- No test creation/execution, sample execution, browser/manual checks, lint, typecheck or build; review source/diff only.
- Complete each lesson's six stages, bilingual hints/feedback, two sets of three lesson questions and two sets of five module questions. No L1 assessment yet.
- Keep old progress IDs/version, preview isolation, prerequisite gates and database storage unchanged.
- Commit only related files and push the authorized `arielf98/taalmo` main branch before continuing.

## Review focus

- A formula outside its declared domain must not produce an official model output; range is not the input domain.
- Graph axes and units must be explicit. The finite sampling model does not establish intermediate measured counts or causality.
- Zero slope is a valid constant function; two inputs may share one output but one input cannot have two outputs.
- Composition applies the inside function first and requires valid intermediate inputs; inverse reverses operation order and requires unique preimages.
- Functional inverse differs from reciprocal and only accepts values in the original range. No implication of a secure cipher.

## Task 1 — CM-03b

**Files:** Create `src/content/cybersecurity-math/functions.ts`, `src/components/cybersecurity-math-functions.tsx`; modify `types.ts`, `catalog.ts`, `cybersecurity-math-activities.tsx` and current curriculum/architecture/authoring/backlog/roadmap/status docs.

**Interfaces:** Export `functions: Partial<Record<string, MathLessonContent>>`, `functionsModuleChecks: [MathQuestion[], MathQuestion[]]` and `functionsTask: Copy`. `MathFunctionVisual` consumes the existing activity/value/onChange props. Add kinds/bounds: `function` input 0–4 and largest allowed input 0–4; `linear` whole minutes 0–6 and rate 0–4; `composition` input 0–6 and order index 0–1. All values remain integers and storage reuses `mathVisualBounds`.

- [x] Author `cm-l1m02l01`–`l03` with all lesson evidence and checkpoint variants; register module checks/task/description.
- [x] Implement domain/range table for f(x)=2x, graph/table N(t)=3+mt and pipeline/table f(x)=x+2 then g(u)=3u (plus reversed order and inverse round-trip). Validate controls against shared bounds.
- [x] Review content arithmetic/units, graph semantics/accessibility, storage/navigation callers and diff. Request one fresh read-only review under the review skill; apply important findings in one pass.
- [x] Update status/docs; delivery follows scoped staged-diff review, commit and authorized push, recorded in Git history. No runtime validation claim.

## Ledger

- Starting point: `ee2b95f`, 15 published lessons / 105 drafts, L0 complete and L1M01 published/pushed.
- Ruling: use fixed authored models and bounded native controls rather than a function-expression parser — this teaches the requested concepts without adding arbitrary evaluation or new storage shapes.
- Ruling: linear graph uses whole-minute samples; connecting dashes are a visual guide only, not additional allowed inputs — this keeps discrete count units explicit.
- Pre-flight: kinds/bounds feed the visual dispatch and progress parser; catalog entries feed static routes, prerequisite gates and module tasks automatically. No route, grading or storage API changes needed.
- Fresh source-only review found transfer contexts too close to worked examples. Replaced them with backup-mode/copy counts, archive bytes/block and header/copy composition in both languages. No test or example execution.
- Final: Ruling: the inverse/reciprocal argument ambiguity is Important for a beginner, because it can teach the wrong operation — label h(x), h⁻¹(output) and 1/h(input) explicitly in the same fix pass. No deferred findings or declined judgments remain.
- Outcome: 18 published lessons / 102 drafts; six checkpoint/task modules, L0 assessment unchanged. Next CM-03c/L1M03. Runtime remains unverified.
