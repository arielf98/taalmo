# Architecture

Taalmo is a single Next.js application. Pages are server entry points with interactive client components. The domain engine imports no React, browser, network, or database code.

## Boundaries

- **Routing:** `/`, `/dashboard`, `/learn/database-transactions`, `/lessons/[slug]`, `/challenges`, `/sandbox/duplicate-payment`, `/sandbox/lost-update`, `/sandbox/deadlock`. Unknown lessons return 404.
- **Content:** `src/content/lessons.ts` defines stable lesson IDs, concept text, examples, quiz options, answers, explanations, and per-lesson lab routes and a catalog of lab milestones. Interface copy is in components; a full translation dictionary is a later milestone.
- **Simulation:** `src/lib/simulation/engine.ts` handles step/run/history. `payment.ts`, `lost-update.ts`, and `deadlock.ts` define scenario schedules, transitions, configuration validation, and evaluation.
- **UI:** `Architecture` maps explicit state to React Flow nodes. `Experiment` controls execution, historical inspection, and replay. Tables display committed rows only; staged writes are visible separately in the inspector and raw state.
- **Persistence:** `progressRepository` owns localStorage access. `useProgress` subscribes via `useSyncExternalStore` for consistent browser/server rendering and updates across tabs. Stored content is parsed and validated. Reads recover from corrupt data; writes return success/failure and the UI reports failures.

## Progress model

The versioned key `taalmo.progress.v1` stores checkpoint IDs, recent completion dates, and observed completed experiment modes. Checkpoints are idempotent. A quiz answer records a lesson checkpoint; lab completion requires both experiment modes and the correct final answer. Path progress has six milestones: three lesson checkpoints and three lab checkpoints. Counts and valid milestone IDs come from the lesson/lab catalog. The original `unsafe` / `protected` experiment IDs remain assigned to the payment lab for backward compatibility. Lost Update uses `lost-update:unsafe` / `lost-update:atomic`, and Deadlock uses `deadlock:opposite` / `deadlock:ordered`, so experiments in one lab cannot unlock another. Repeating experiments does not manufacture a streak or runtime metric.

An eventual PostgreSQL repository must associate records with authenticated users and support asynchronous loading, conflict resolution, migrations, and server-side validation. The current repository boundary is deliberately small; it does not pretend a localStorage API can drop into a remote database unchanged.

## Add a lesson

1. Add a stable ID and English content to `lessons.ts`; set `labHref` to a working lab route or `null`.
2. Register an available lab in `labs` with its completion ID, lesson ID, route, title, and experiment-mode IDs. Progress validation and milestone totals derive from this catalog.
3. Add the interleaving example to `InteractiveExample`, or provide a dedicated example when it needs different controls.
4. Available labs need an explicit route/action. Do not mark a lab available until implemented.
5. Add a knowledge question with feedback and review navigation and new stateful behavior in code, following `AGENTS.md`.

`generateStaticParams` includes content IDs automatically. Launch actions use each lesson’s `labHref`. The dashboard continues to an incomplete lab whose lesson checkpoint has been completed, then to other lessons.

## Visual system and accessibility

CSS tokens define light/dark surfaces, navy text, mint accents, borders, radii, and semantic feedback. Layouts adapt from a sidebar workspace to a mobile single column. Controls have keyboard focus styles, accessible labels, native form controls, pressed states, live feedback, and a skip link. React Flow exposes focusable nodes; a native select provides an equivalent inspector navigation. Tables include captions. Reduced-motion preferences disable decorative motion.

## Existing test coverage and current work policy

Vitest covers observable state transitions, unsafe stale reads, unique-key contention, atomic committed visibility, rollback, input validation, immutable history, replay, and progress parsing. Playwright covers the complete learning journey, persistence after refresh, execution controls, theme, and mobile lesson navigation. This describes coverage from the initial MVP, not validation of the later Lost Update or Deadlock additions. Per `AGENTS.md`, subsequent work does not run tests, lint, typecheck, builds, or browser verification and does not add unit tests. Review the code and diff instead. No full WCAG or cross-browser conformance is claimed.
