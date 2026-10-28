# Sandbox Overview Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline and a fresh source/diff reviewer. The user's continuation and AGENTS.md authorize roadmap implementation, commit and push without approval pauses; no tests or execution checks.

**Goal:** Implement the next roadmap item: a compact overview of the three existing transaction labs.

**Architecture:** Add `/sandbox` through the App Router. Read `labs` and related `lessons` from `src/content/lessons.ts`; reuse Workspace, Badge, Button, useLocale and useProgress. No new catalog, progress writes, simulator behavior or dependency.

**Spec:** docs/roadmap.md, AGENTS.md and the existing transaction lab catalog. This small design follows the established product: choose a lab, understand its scenario and open its lesson/simulator. Header Sandbox and the completed-dashboard revisit action lead here; scenario-specific launch links remain direct.

## Scope and review focus

- Create src/app/sandbox/page.tsx, src/components/sandbox-overview.tsx and its focused CSS module.
- Display lab-scoped completion and mode exploration independently. Reading a lesson or visiting this page must not complete a lab.
- Derive links and mode membership from the catalog; join lessons by lessonId rather than duplicating order or metadata.
- Keep all display copy English/Indonesian, link names descriptive, heading hierarchy clear, and controls keyboard accessible. Reuse layout tokens and wrap actions on narrow screens.
- Update Header and completed Dashboard navigation only. Preserve individual simulator routes, IDs, storage and mastery logic.
- Update README, architecture and roadmap to record actual scope and no-execution limits. Leave unrelated next-env.d.ts/workspace changes untouched.
- No tests, new test cases, audits, SQL, manual/browser checks, lint, typecheck or build. Review source/diff, then commit and push origin/main. Other optional roadmap ideas need a concrete scope or currently prohibited execution.

## Steps

- [x] Add the overview route/component/styles and Indonesian copy through the existing message registry.
- [x] Update generic Sandbox entry points and docs.
- [x] Review catalog joins, completion versus exploration, localization, navigation and responsive CSS by reading/diff, including independent review. Commit and push.

## Review record

Independent source/diff review found no important component issues. Added the omitted `/sandbox` route to the architecture inventory after the reviewer noted that documentation gap. Catalog joins, mode-scoped exploration, lab completion, translation keys, link names and wrapping styles were reviewed by reading. No test/audit, manual/browser check, lint, typecheck or build was run. Commit/push outcome follows in Git history; no simulator or progress mutation was added. The remaining optional accessibility/browser-coverage item cannot be executed under the current no-test instruction.
