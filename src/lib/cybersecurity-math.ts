import { mathLessons, mathLevels, mathModules, mathQuestions, mathRecordKey, mathVersion } from "@/content/cybersecurity-math/catalog";
import { mathVisualBounds, type MathAnswer, type MathQuestion } from "@/content/cybersecurity-math/types";

export interface MathAttempt {
  attempt: number;
  answers: Partial<Record<string, MathAnswer>>;
  step: number;
  exploration: [number, number];
  reflection: string;
  transfer: string;
  hint: number;
  solutionOpen: boolean;
  seenSets: number[];
  viewedSets: number[];
  helped: boolean;
  completedAt?: string;
}
export interface MathRecord extends MathAttempt { passed?: MathAttempt }
export interface MathProgress {
  records: Record<string, MathRecord>;
  resume: string | null;
  tasks: Record<string, { text: string; ready: boolean }>;
  history: Record<string, unknown>;
}
export const emptyMathProgress = (): MathProgress => ({ records: {}, resume: null, tasks: {}, history: {} });
export function newMathAttempt(id: string, previous?: MathRecord): MathRecord {
  const content = mathLessons.find((lesson) => lesson.id === id)?.content;
  const initial = content?.exploration.initial ?? [0, 0];
  const viewedSets = previous ? [...new Set([...previous.viewedSets, ...(!content ? [previous.attempt % 2] : [])])] : [];
  return {
    attempt: previous ? (previous.attempt + 1) % 1000000 : 0,
    answers: {}, step: 0, exploration: [initial[0], initial[1]], reflection: "", transfer: "", hint: 0,
    solutionOpen: false, seenSets: viewedSets, viewedSets,
    helped: previous?.helped ?? false,
    ...(previous?.passed ? { passed: previous.passed } : {}),
  };
}
const object = (value: unknown): Record<string, unknown> | null =>
  value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
const integer = (value: unknown, max: number) => typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= max;
const knownId = (id: string) => mathLessons.some((lesson) => lesson.id === id && lesson.content)
  || mathModules.some((module) => module.id === id && module.checks) || mathLevels.some((level) => level.id === id && level.checks);
export function questionsInRecord(id: string, attempt: number): MathQuestion[] {
  const content = mathLessons.find((lesson) => lesson.id === id)?.content;
  return [...(content ? [content.prediction, content.exploration.question, ...content.practice] : []), ...mathQuestions(id, attempt)];
}
function parseAttempt(id: string, value: unknown): MathAttempt | null {
  const raw = object(value);
  if (!raw || !integer(raw.attempt, 999999)
    || typeof raw.solutionOpen !== "boolean" || typeof raw.helped !== "boolean"
    || !integer(raw.hint, 3) || !integer(raw.step, 5)
    || !Array.isArray(raw.seenSets) || !raw.seenSets.every((item) => item === 0 || item === 1)
    || !Array.isArray(raw.viewedSets) || !raw.viewedSets.every((item) => item === 0 || item === 1)) return null;
  const attempt = raw.attempt as number;
  const answers: Record<string, MathAnswer> = {};
  const inputAnswers = object(raw.answers);
  for (const question of questionsInRecord(id, attempt)) {
    const answer = inputAnswers?.[question.id];
    if (typeof question.answer === "number") {
      if (typeof answer === "number" && mathAnswer(String(answer), question.decimalPlaces !== undefined) === answer) answers[question.id] = answer;
    } else {
      const fraction = object(answer);
      if (fraction && typeof fraction.numerator === "number" && Number.isInteger(fraction.numerator)
        && Math.abs(fraction.numerator) <= 10000 && integer(fraction.denominator, 10000) && (fraction.denominator as number) > 0) {
        answers[question.id] = { numerator: fraction.numerator, denominator: fraction.denominator as number };
      }
    }
  }
  const content = mathLessons.find((lesson) => lesson.id === id)?.content;
  const initial = content?.exploration.initial ?? [0, 0];
  const position = Array.isArray(raw.exploration) ? raw.exploration : [];
  const bounds = mathVisualBounds[content?.exploration.kind ?? "count"];
  const validPosition = position.length === 2 && bounds.every(([min, max], index) => typeof position[index] === "number" && Number.isInteger(position[index]) && position[index] >= min && position[index] <= max);
  return {
    attempt, answers,
    step: integer(raw.step, 5) ? raw.step as number : 0,
    exploration: validPosition ? [position[0] as number, position[1] as number] : [initial[0], initial[1]],
    reflection: typeof raw.reflection === "string" ? raw.reflection.slice(0, 6000) : "",
    transfer: typeof raw.transfer === "string" ? raw.transfer.slice(0, 6000) : "",
    hint: integer(raw.hint, 3) ? raw.hint as number : 0,
    solutionOpen: raw.solutionOpen === true,
    seenSets: Array.isArray(raw.seenSets) ? [...new Set(raw.seenSets.filter((item): item is number => item === 0 || item === 1))] : [],
    viewedSets: [...new Set(raw.viewedSets as number[])],
    helped: raw.helped === true || (raw.hint as number) > 0,
    ...(typeof raw.completedAt === "string" && !Number.isNaN(Date.parse(raw.completedAt)) ? { completedAt: raw.completedAt } : {}),
  };
}
export function parseMathProgress(value: string): MathProgress {
  try {
    const raw = object(JSON.parse(value));
    if (!raw) return emptyMathProgress();
    const records: MathProgress["records"] = {};
    const history: MathProgress["history"] = {};
    const historicalKey = /^cm-l[0-9](?:m[0-9]{2}(?:l[0-9]{2})?)?@[0-9]+\.[0-9]+\.[0-9]+$/;
    for (const [key, record] of Object.entries(object(raw.history) ?? {})) {
      if (historicalKey.test(key) && object(record)) history[key] = record;
    }
    for (const [key, value] of Object.entries(object(raw.records) ?? {})) {
      const match = /^(cm-l[0-9](?:m[0-9]{2}(?:l[0-9]{2})?)?)@([0-9]+\.[0-9]+\.[0-9]+)$/.exec(key);
      if (!match) continue;
      if (match[2] !== mathVersion) { if (object(value)) history[key] = value; continue; }
      if (!knownId(match[1])) continue;
      const current = parseAttempt(match[1], value);
      if (!current) continue;
      const passed = parseAttempt(match[1], object(value)?.passed);
      records[key] = { ...current, ...(passed?.completedAt && mathAttemptComplete(match[1], passed) ? { passed } : {}) };
    }
    const tasks: MathProgress["tasks"] = {};
    for (const module of mathModules.filter((item) => item.checks)) {
      const task = object(object(raw.tasks)?.[module.id]);
      if (task && typeof task.text === "string") {
        const text = task.text.slice(0, 20000);
        tasks[module.id] = { text, ready: task.ready === true && !!text.trim() };
      }
    }
    return { records, tasks, history, resume: typeof raw.resume === "string" && mathLessons.some((lesson) => lesson.id === raw.resume && lesson.content) ? raw.resume : null };
  } catch { return emptyMathProgress(); }
}
export function mathAnswer(input: string, decimal = false): number | null {
  if (!(decimal ? /^-?\d{1,7}(?:[.,]\d{1,4})?$/ : /^-?\d{1,7}$/).test(input.trim())) return null;
  const number = Number(input.trim().replace(",", "."));
  return Number.isFinite(number) && (decimal || Number.isSafeInteger(number)) && Math.abs(number) <= 1000000 ? number : null;
}
export function mathFraction(numerator: string, denominator: string): MathAnswer | null {
  const n = mathAnswer(numerator), d = mathAnswer(denominator);
  return n !== null && d !== null && Math.abs(n) <= 10000 && d >= 1 && d <= 10000 ? { numerator: n, denominator: d } : null;
}
export function mathAnswerCorrect(question: MathQuestion, value: MathAnswer | undefined): boolean {
  if (typeof question.answer === "number") return typeof value === "number"
    && Math.abs(value - question.answer) <= (question.decimalPlaces === undefined ? 0 : 0.5 * 10 ** -question.decimalPlaces + Number.EPSILON);
  return !!value && typeof value !== "number" && value.numerator * question.answer.denominator === question.answer.numerator * value.denominator;
}
export const mathQuestionCorrect = (question: MathQuestion, record: MathAttempt) => mathAnswerCorrect(question, record.answers[question.id]);
export function mathAttemptComplete(id: string, record: MathAttempt): boolean {
  const questions = mathQuestions(id, record.attempt);
  if (!questions.length || record.solutionOpen || !record.viewedSets.includes(record.attempt % 2)) return false;
  const allAnswered = questions.every((question) => record.answers[question.id] !== undefined);
  const correct = questions.filter((question) => mathQuestionCorrect(question, record)).length;
  const critical = questions.every((question) => !question.critical || mathQuestionCorrect(question, record));
  const content = mathLessons.find((lesson) => lesson.id === id)?.content;
  if (!content) return allAnswered && critical && correct / questions.length >= (mathLevels.some((level) => level.id === id) ? 0.85 : 0.8);
  return allAnswered && correct === questions.length
    && content.practice.every((question) => mathQuestionCorrect(question, record))
    && content.exploration.target.every((value, index) => value === record.exploration[index])
    && mathQuestionCorrect(content.exploration.question, record)
    && !!record.reflection.trim();
}
function recordPassed(id: string, progress: MathProgress): boolean {
  const saved = progress.records[mathRecordKey(id)];
  const record = saved?.passed ?? saved;
  return !!record?.completedAt && mathAttemptComplete(id, record);
}
export function mathModulePassed(id: string, progress: MathProgress): boolean {
  const module = mathModules.find((item) => item.id === id);
  return !!module?.checks && mathModuleUnlocked(id, progress)
    && module.lessons.every((lesson) => !!lesson.content && recordPassed(lesson.id, progress)) && recordPassed(id, progress);
}
export function mathModuleUnlocked(id: string, progress: MathProgress): boolean {
  const index = mathModules.findIndex((module) => module.id === id);
  if (index < 0) return false;
  if (index === 0) return true;
  const previous = mathModules[index - 1];
  if (previous.levelId !== mathModules[index].levelId) {
    return mathLevelPassed(previous.levelId, progress);
  }
  return mathModulePassed(previous.id, progress);
}
export function mathLevelPassed(id: string, progress: MathProgress): boolean {
  const level = mathLevels.find((item) => item.id === id);
  const lastModule = level?.modules.at(-1);
  // Linear module prerequisites make the final module prove the entire preceding chain.
  return !!level?.checks && !!lastModule && mathModulePassed(lastModule.id, progress) && recordPassed(id, progress);
}
export function mathLessonUnlocked(id: string, progress: MathProgress): boolean {
  const lesson = mathLessons.find((item) => item.id === id);
  if (!lesson?.content || !mathModuleUnlocked(lesson.moduleId, progress)) return false;
  const module = mathModules.find((item) => item.id === lesson.moduleId)!;
  const index = module.lessons.findIndex((item) => item.id === id);
  return index === 0 || mathLessonPassed(module.lessons[index - 1].id, progress);
}
export function mathLessonPassed(id: string, progress: MathProgress): boolean {
  return mathLessonUnlocked(id, progress) && recordPassed(id, progress);
}
export function mathSummary(progress: MathProgress) {
  const published = mathLessons.filter((lesson) => lesson.content);
  const completed = published.filter((lesson) => mathLessonPassed(lesson.id, progress)).length;
  const resume = published.find((lesson) => lesson.id === progress.resume && mathLessonUnlocked(lesson.id, progress) && !mathLessonPassed(lesson.id, progress))
    ?? published.find((lesson) => mathLessonUnlocked(lesson.id, progress) && !mathLessonPassed(lesson.id, progress));
  return { completed, total: published.length, target: mathLessons.length, percent: published.length ? Math.round(100 * completed / published.length) : 0, resume };
}

