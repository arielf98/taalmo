# Architecture

Taalmo is a single Next.js application. Route metadata stays on server entry points; localized screens use client components. The domain engine imports no React, browser, network, or database code.

## Boundaries

- **Routing:** `/`, `/dashboard`, `/learn/database-engineering`, `/lessons/[slug]`, `/challenges`, `/sandbox/duplicate-payment`, `/sandbox/lost-update`, `/sandbox/deadlock`. Unknown lessons return 404. The old database path URLs redirect to the unified Database Engineering path; the transaction alias targets its `#transaction-labs` section.
- **Content:** `src/content/lessons.ts` defines stable lesson IDs, concept text, examples, quiz options, answers, explanations, and per-lesson lab routes and a catalog of lab milestones. English source copy stays in content, components, and deterministic scenario definitions. `src/content/messages/` provides Indonesian dictionaries; `messages.ts` handles translation and placeholder interpolation at render time.
- **Simulation:** `src/lib/simulation/engine.ts` handles step/run/history. `payment.ts`, `lost-update.ts`, and `deadlock.ts` define scenario schedules, transitions, configuration validation, and evaluation.
- **UI:** `Architecture` maps explicit state to React Flow nodes. `Experiment` controls execution, historical inspection, and replay. Tables display committed rows only; staged writes are visible separately in the inspector and raw state.
- **Persistence:** `progressRepository` owns localStorage access. `useProgress` subscribes via `useSyncExternalStore` for consistent browser/server rendering and updates across tabs. Stored content is parsed and validated. Reads recover from corrupt data; writes return success/failure and the UI reports failures.

## Progress model

The versioned key `taalmo.progress.v1` stores checkpoint IDs, recent completion dates, and observed completed experiment modes. Checkpoints are idempotent. A quiz answer records a lesson checkpoint; lab completion requires both experiment modes and the correct final answer. The transaction path has six milestones: three lesson checkpoints and three lab checkpoints. Counts and valid milestone IDs come from the lesson/lab catalog. The original `unsafe` / `protected` experiment IDs remain assigned to the payment lab for backward compatibility. Lost Update uses `lost-update:unsafe` / `lost-update:atomic`, and Deadlock uses `deadlock:opposite` / `deadlock:ordered`, so experiments in one lab cannot unlock another. Repeating experiments does not manufacture a streak or runtime metric.

An eventual PostgreSQL repository must associate records with authenticated users and support asynchronous loading, conflict resolution, migrations, and server-side validation. The current repository boundary is deliberately small; it does not pretend a localStorage API can drop into a remote database unchanged.

## Localization

`useLocale` subscribes through `useSyncExternalStore` to a validated `en` / `id` preference stored separately at `taalmo.locale.v1`. It handles same-tab and cross-tab updates, storage removal, and an in-memory fallback when persistence is blocked. `LocaleDocument` updates the document language. English server snapshots match initial hydration; browser preferences apply afterward. Static metadata remains English; there are no locale-specific routes.

Components translate display copy without changing keys, progress IDs, quiz answer indexes, or simulation state. English event labels/details remain in historical snapshots: the translator matches authored placeholder templates when rendering dynamic event messages. New source copy falls back to English until a dictionary entry is supplied. SQL, raw state, identifiers, and fixed USD examples retain their original representation. Native language controls, diagram controls, accessible labels, and activity dates follow the preference.

## Database Engineering learning path

The public learning path has one dashboard card, one sidebar entry and one canonical page at `/learn/database-engineering`. SQL/database levels and transaction practice share that page. `databaseEngineeringProgress` derives the displayed activity totals from published curriculum lessons plus the original lesson/lab milestones (currently 27 lessons and three labs), without writing or migrating storage. Assessments still enforce their own module/level gates; the activity percentage is not certification.

`src/content/database/catalog.ts` adapts the canonical JSON hierarchy without changing its IDs/order. The Indonesian authored JSON records cover L0–L1 and L2M01; other lessons are draft. The existing `/lessons/[slug]` entry point selects the legacy or extended player and statically permits only published slugs. Shared Quiz adds optional graded callbacks, per-option feedback and saved answers without changing legacy completion behavior.

The same `taalmo.progress.v1` repository stores an optional `curriculum` extension: versioned lesson/exam records, immutable passed snapshots and a resume ID. `src/lib/curriculum.ts` derives mastery from the actual answers, required activities and canonical module prerequisites. Retakes keep earned mastery. The module/level thresholds are 80%/85% and critical questions cannot be overridden by the aggregate score. There is no calendar gating or account service.

Current practice is prediction/debugging with deterministic authored inputs and graded edge cases. No learner SQL runs in the product. Trusted SQL examples are validated separately using a network-isolated disposable PostgreSQL container; the checker accepts no external database URL. See `database-path-authoring.md` for the content contract and `database-path-implementation.md` for actual evidence and limits.

## Add a lesson

1. Add a stable ID and English content to `lessons.ts`; set `labHref` to a working lab route or `null`.
2. Register an available lab in `labs` with its completion ID, lesson ID, route, title, and experiment-mode IDs. Progress validation and milestone totals derive from this catalog.
3. Add the interleaving example to `InteractiveExample`, or provide a dedicated example when it needs different controls.
4. Available labs need an explicit route/action. Do not mark a lab available until implemented.
5. Add a knowledge question with feedback and Indonesian dictionary entries for new learner-facing copy, including event templates with numbered placeholders. Review navigation and new stateful behavior in code, following `AGENTS.md`.

`generateStaticParams` includes content IDs automatically. Launch actions use each lesson’s `labHref`. The dashboard retains a clearly labeled transaction-practice recommendation for an incomplete lab whose lesson checkpoint has been completed, then other transaction lessons. Completing that section does not claim the whole Database Engineering path is complete; the shared course card resumes an unfinished curriculum lesson, then remaining transaction lessons/labs.

## Visual system and accessibility

CSS tokens define light/dark surfaces, navy text, mint accents, borders, radii, and semantic feedback. Layouts adapt from a sidebar workspace to a mobile single column. Controls have keyboard focus styles, accessible labels, native form controls, pressed states, live feedback, and a skip link. React Flow exposes focusable nodes; a native select provides an equivalent inspector navigation. Tables include captions. Reduced-motion preferences disable decorative motion.

## Existing test coverage and current work policy

Vitest covers observable state transitions, unsafe stale reads, unique-key contention, atomic committed visibility, rollback, input validation, immutable history, replay, and progress parsing. Playwright covers the complete learning journey, persistence after refresh, execution controls, theme, and mobile lesson navigation. This describes coverage from the initial MVP, not validation of the later Lost Update or Deadlock additions. Per `AGENTS.md`, subsequent work does not run tests, lint, typecheck, builds, or browser verification and does not add unit tests. Review the code and diff instead. No full WCAG or cross-browser conformance is claimed.

The Database Zero to Master master prompt explicitly authorized scoped integration/SQL verification and static/build checks for that curriculum change. Its evidence is documented separately; it does not lift the no-test policy for unrelated subsequent work.

The Database Engineering path consolidation was reviewed through source and diff only, under the general no-test policy. Existing E2E route/title expectations were updated without adding test cases or executing them. No lint, typecheck, build, browser or runtime validation was run for that consolidation.
