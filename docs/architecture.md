# Architecture

Taalmo is a single Next.js application. Pages are server entry points with interactive client components. The domain engine imports no React, browser, network, or database code.

## Boundaries

- **Routing:** `/`, `/dashboard`, `/learn/database-transactions`, `/lessons/[slug]`, `/challenges`, `/sandbox/duplicate-payment`. Unknown lessons return 404.
- **Content:** `src/content/lessons.ts` defines stable lesson IDs, concept text, examples, quiz options, answers, explanations, and available-lab flags. Interface copy is in components; a full translation dictionary is a later milestone.
- **Simulation:** `src/lib/simulation/engine.ts` handles step/run/history. `payment.ts` defines the scenario schedule, transition function, and evaluation.
- **UI:** `Architecture` maps explicit state to React Flow nodes. `Experiment` controls execution, historical inspection, and replay. Tables display committed rows only; staged writes are visible separately in the inspector and raw state.
- **Persistence:** `progressRepository` owns localStorage access. `useProgress` subscribes via `useSyncExternalStore` for consistent browser/server rendering and updates across tabs. Stored content is parsed and validated. Reads recover from corrupt data; writes return success/failure and the UI reports failures.

## Progress model

The versioned key `taalmo.progress.v1` stores checkpoint IDs, recent completion dates, and observed completed experiment modes. Checkpoints are idempotent. A quiz answer records a lesson checkpoint; lab completion requires both experiment modes and the correct final answer. Path progress has four milestones: three lesson checkpoints and one lab checkpoint. Repeating experiments does not manufacture a streak or runtime metric.

An eventual PostgreSQL repository must associate records with authenticated users and support asynchronous loading, conflict resolution, migrations, and server-side validation. The current repository boundary is deliberately small; it does not pretend a localStorage API can drop into a remote database unchanged.

## Add a lesson

1. Add a stable ID and English content to `lessons.ts`; include an accurate availability flag.
2. Add its ID to progress validation and update path milestone denominators if the path grows.
3. Add the interleaving example to `InteractiveExample`, or provide a dedicated example when it needs different controls.
4. Available labs need an explicit route/action. Do not mark a lab available until implemented.
5. Add a knowledge question with feedback, check navigation, and cover new stateful behavior.

`generateStaticParams` includes content IDs automatically. The current launch action points to the only available payment lab; generalize the lesson-to-lab route mapping when a second lab is implemented.

## Visual system and accessibility

CSS tokens define light/dark surfaces, navy text, mint accents, borders, radii, and semantic feedback. Layouts adapt from a sidebar workspace to a mobile single column. Controls have keyboard focus styles, accessible labels, native form controls, pressed states, live feedback, and a skip link. React Flow exposes focusable nodes; a native select provides an equivalent inspector navigation. Tables include captions. Reduced-motion preferences disable decorative motion.

## Testing

Vitest covers observable state transitions, unsafe stale reads, unique-key contention, atomic committed visibility, rollback, input validation, immutable history, replay, and progress parsing. Playwright covers the complete learning journey, persistence after refresh, execution controls, theme, and mobile lesson navigation. This does not establish full WCAG conformance or cross-browser compatibility.
