import blueprint from "../../../curriculum/taalmo-database-zero-to-master/curriculum-blueprint.json";
import foundation from "./l0.json";
import queries from "./l1-query.json";
import mutations from "./l1-mutation.json";
import subqueries from "./l2-subqueries.json";
import windows from "./l2-windows.json";
import timeReports from "./l2-time-reports.json";
import correctness from "./l2-correctness.json";
import modeling from "./l3-modeling.json";
import normalization from "./l3-normalization.json";
import typesConstraints from "./l3-types-constraints.json";
import evolution from "./l3-evolution.json";
import acid from "./l4-acid.json";
import isolation from "./l4-isolation.json";
import concurrency from "./l4-concurrency.json";
import payments from "./l4-payments.json";
import sideEffects from "./l4-side-effects.json";
import planner from "./l5-planner.json";
import indexes from "./l5-indexes.json";
import joinsRewrite from "./l5-joins-rewrite.json";
import largeData from "./l5-large-data.json";
import tuning from "./l5-tuning.json";
import storage from "./l6-storage.json";
import wal from "./l6-wal.json";
import vacuum from "./l6-vacuum.json";
import observability from "./l6-observability.json";
import type { AuthoredLesson, ConceptCheck } from "./types";
import { pathHref } from "../lessons";
export const databasePathHref = pathHref;
export const databaseVersion = blueprint.version;
const authored = [
  ...foundation,
  ...queries,
  ...mutations,
  ...subqueries,
  ...windows,
  ...timeReports,
  ...correctness,
  ...modeling,
  ...normalization,
  ...typesConstraints,
  ...evolution,
  ...acid,
  ...isolation,
  ...concurrency,
  ...payments,
  ...sideEffects,
  ...planner,
  ...indexes,
  ...joinsRewrite,
  ...largeData,
  ...tuning,
  ...storage,
  ...wal,
  ...vacuum,
  ...observability,
] as AuthoredLesson[];
const byId = new Map(authored.map((lesson) => [lesson.id, lesson]));
export const databaseLevels = blueprint.levels.map((level) => ({
  ...level,
  modules: level.modules.map((module) => ({
    ...module,
    levelId: level.id,
    lessons: module.lessons.map((lesson) => ({
      ...lesson,
      moduleId: module.id,
      levelId: level.id,
      content: byId.get(lesson.id),
      status: byId.has(lesson.id) ? ("published" as const) : ("draft" as const),
    })),
  })),
}));
export const databaseModules = databaseLevels.flatMap((level) => level.modules);
export const databaseLessons = databaseModules.flatMap(
  (module) => module.lessons,
);
export const publishedLessons = databaseLessons.filter(
  (lesson) => lesson.status === "published",
);
export const publishedModules = databaseModules.filter((item) =>
  item.lessons.every((lesson) => lesson.status === "published"),
);
export const draftLessonCount =
  databaseLessons.length - publishedLessons.length;
export type DatabaseLesson = (typeof databaseLessons)[number];
export const lessonRecordKey = (id: string, version: string) =>
  `${id}@${version}`;
export const assessmentKey = (id: string) => `${id}@${databaseVersion}`;
export function assessmentQuestions(id: string, attempt = 0): ConceptCheck[] {
  const targetModule = databaseModules.find((item) => item.id === id);
  const level = databaseLevels.find((item) => item.id === id);
  const lessons =
    targetModule?.lessons ??
    level?.modules.flatMap((item) => item.lessons) ??
    [];
  // Level assessments sample every lesson once; module checkpoints cover both concept checks.
  return lessons.flatMap(
    (lesson) =>
      lesson.content?.checks.filter(
        (_, index) =>
          targetModule ||
          index === attempt % (lesson.content?.checks.length ?? 1),
      ) ?? [],
  );
}
