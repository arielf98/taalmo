import blueprint from "../../../curriculum/taalmo-database-zero-to-master/curriculum-blueprint.json";
import foundation from "./l0.json";
import queries from "./l1-query.json";
import mutations from "./l1-mutation.json";
import type { AuthoredLesson, ConceptCheck } from "./types";
export const databasePathHref = "/learn/database-zero-to-master";
export const databaseVersion = blueprint.version;
const authored = [...foundation, ...queries, ...mutations] as AuthoredLesson[];
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
