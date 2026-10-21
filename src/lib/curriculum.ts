import {
  assessmentQuestions,
  assessmentKey,
  databaseLevels,
  databaseModules,
  publishedLessons,
  lessonRecordKey,
  type DatabaseLesson,
} from "../content/database/catalog";
import { lessons, labs } from "../content/lessons";
import type { Progress } from "./progress";
export interface LearningRecord {
  attempt: number;
  answers: Record<string, number>;
  reflection: string;
  completedAt?: string;
  passed?: Omit<LearningRecord, "passed">;
}
export interface CurriculumProgress {
  records: Record<string, LearningRecord>;
  resume: string | null;
}
export const emptyCurriculum = (): CurriculumProgress => ({
  records: {},
  resume: null,
});
export function databaseEngineeringProgress(progress: Progress) {
  const curriculum = progress.curriculum ?? emptyCurriculum();
  const completedLessons =
    lessons.filter((lesson) => progress.completed.includes(lesson.id)).length +
    publishedLessons.filter((lesson) => lessonPassed(lesson, curriculum))
      .length;
  const completedLabs = labs.filter((lab) =>
    progress.completed.includes(lab.id),
  ).length;
  const totalLessons = lessons.length + publishedLessons.length;
  const totalMilestones = totalLessons + labs.length;
  const completedMilestones = completedLessons + completedLabs;
  return {
    completedLessons,
    totalLessons,
    completedMilestones,
    totalMilestones,
    percent: Math.round((completedMilestones / totalMilestones) * 100),
  };
}
export function lessonPassed(
  lesson: DatabaseLesson,
  progress: CurriculumProgress,
): boolean {
  const content = lesson.content;
  if (!content || lesson.status !== "published") return false;
  const saved = progress.records[lessonRecordKey(lesson.id, content.version)];
  const record = saved?.passed ?? saved;
  if (!record?.completedAt || !record.reflection.trim()) return false;
  const variant =
    content.activity.variants[
      record.attempt % content.activity.variants.length
    ];
  return [...content.checks, variant, ...content.activity.edgeCases].every(
    (question) => record.answers[question.id] === question.answer,
  );
}
export function modulePassed(
  id: string,
  progress: CurriculumProgress,
): boolean {
  const targetModule = databaseModules.find((item) => item.id === id);
  const saved = progress.records[assessmentKey(id)];
  const record = saved?.passed ?? saved;
  const result = assessmentResult(
    assessmentQuestions(id, record?.attempt ?? 0),
    record?.answers ?? {},
  );
  return (
    !!targetModule &&
    targetModule.prerequisite_module_ids.every((prior) =>
      modulePassed(prior, progress),
    ) &&
    targetModule.lessons.every((lesson) => lessonPassed(lesson, progress)) &&
    !!record?.completedAt &&
    result.score >= targetModule.checkpoint.concept_min_score_percent &&
    result.criticalPassed &&
    result.allAnswered
  );
}
export function moduleUnlocked(
  id: string,
  progress: CurriculumProgress,
): boolean {
  return (
    databaseModules
      .find((item) => item.id === id)
      ?.prerequisite_module_ids.every((prior) =>
        modulePassed(prior, progress),
      ) ?? false
  );
}
export function levelPassed(id: string, progress: CurriculumProgress): boolean {
  const level = databaseLevels.find((item) => item.id === id);
  const saved = progress.records[assessmentKey(id)];
  const record = saved?.passed ?? saved;
  const result = assessmentResult(
    assessmentQuestions(id, record?.attempt ?? 0),
    record?.answers ?? {},
  );
  return (
    !!level &&
    level.modules.every((module) => modulePassed(module.id, progress)) &&
    !!record?.completedAt &&
    result.score >= level.exit_gate.stage_exam_min_score_percent &&
    result.criticalPassed &&
    result.allAnswered
  );
}

export function assessmentResult(
  questions: import("../content/database/types").ConceptCheck[],
  answers: Record<string, number>,
) {
  return {
    allAnswered: questions.every(
      (question) => answers[question.id] !== undefined,
    ),
    score: questions.length
      ? (100 *
          questions.filter(
            (question) => answers[question.id] === question.answer,
          ).length) /
        questions.length
      : 0,
    criticalPassed:
      questions.length > 0 &&
      questions
        .filter((question) => question.critical)
        .every((question) => answers[question.id] === question.answer),
  };
}
