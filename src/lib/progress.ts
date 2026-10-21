"use client";
import { useMemo, useSyncExternalStore } from "react";
import {
  milestoneIds,
  experimentModes,
  type ExperimentMode,
} from "../content/lessons";
import type { CurriculumProgress, LearningRecord } from "./curriculum";
const key = "taalmo.progress.v1";
const emptyLearningRecord = (): LearningRecord => ({
  attempt: 0,
  answers: {},
  reflection: "",
});
const validRecordKey = (value: string) =>
  /^(?:l[0-9](?:m[0-9]{2}(?:l[0-9]{2})?)?)@[0-9]+\.[0-9]+\.[0-9]+$/.test(value);
function parseLearningRecord(value: unknown): LearningRecord | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  const answers: Record<string, number> = {};
  if (raw.answers && typeof raw.answers === "object") {
    for (const [id, answer] of Object.entries(raw.answers)) {
      if (
        /^[a-z0-9-]{1,100}$/.test(id) &&
        typeof answer === "number" &&
        Number.isInteger(answer) &&
        answer >= 0 &&
        answer <= 50
      )
        answers[id] = answer;
    }
  }
  return {
    attempt:
      typeof raw.attempt === "number" &&
      Number.isSafeInteger(raw.attempt) &&
      raw.attempt >= 0
        ? Math.min(raw.attempt, 1000000)
        : 0,
    answers,
    reflection:
      typeof raw.reflection === "string" ? raw.reflection.slice(0, 6000) : "",
    ...(typeof raw.completedAt === "string" &&
    !Number.isNaN(Date.parse(raw.completedAt))
      ? { completedAt: raw.completedAt }
      : {}),
  };
}
function parseCurriculum(value: unknown): CurriculumProgress | undefined {
  if (!value || typeof value !== "object") return undefined;
  const raw = value as Record<string, unknown>;
  const records: Record<string, LearningRecord> = {};
  if (raw.records && typeof raw.records === "object") {
    for (const [id, value] of Object.entries(raw.records)) {
      if (!validRecordKey(id)) continue;
      const record = parseLearningRecord(value);
      if (!record) continue;
      const passed = parseLearningRecord(
        (value as Record<string, unknown>).passed,
      );
      records[id] = { ...record, ...(passed?.completedAt ? { passed } : {}) };
    }
  }
  return {
    records,
    resume:
      typeof raw.resume === "string" &&
      /^l[0-9]m[0-9]{2}l[0-9]{2}$/.test(raw.resume)
        ? raw.resume
        : null,
  };
}

export interface Progress {
  curriculum?: CurriculumProgress;
  completed: string[];
  activity: { id: string; at: string }[];
  experiments: ExperimentMode[];
}
const empty = (): Progress => ({
  completed: [],
  activity: [],
  experiments: [],
});
const valid = milestoneIds;
export function parseProgress(raw: string): Progress {
  try {
    const p: unknown = JSON.parse(raw);
    if (!p || typeof p !== "object") return empty();
    const v = p as Record<string, unknown>;
    const curriculum = parseCurriculum(v.curriculum);
    return {
      ...(curriculum ? { curriculum } : {}),
      completed: Array.isArray(v.completed)
        ? [
            ...new Set(
              v.completed.filter(
                (id): id is string =>
                  typeof id === "string" && valid.includes(id),
              ),
            ),
          ]
        : [],
      activity: Array.isArray(v.activity)
        ? v.activity
            .filter(
              (a): a is { id: string; at: string } =>
                !!a &&
                typeof a === "object" &&
                valid.includes(a.id) &&
                typeof a.at === "string" &&
                !Number.isNaN(Date.parse(a.at)),
            )
            .slice(0, 8)
        : [],
      experiments: Array.isArray(v.experiments)
        ? v.experiments.filter(
            (m): m is ExperimentMode =>
              typeof m === "string" && experimentModes.includes(m),
          )
        : [],
    };
  } catch {
    return empty();
  }
}
// shortcut: browser-local persistence, replace this repository for authenticated cross-device progress.
export const progressRepository = {
  read() {
    try {
      return localStorage.getItem(key) ?? "";
    } catch {
      return "";
    }
  },
  save(progress: Progress) {
    try {
      localStorage.setItem(key, JSON.stringify(progress));
      window.dispatchEvent(new Event("taalmo-progress"));
      return true;
    } catch {
      return false;
    }
  },
};
function resumeLearning(id: string) {
  if (!/^l[0-9]m[0-9]{2}l[0-9]{2}$/.test(id)) return false;
  const latest = parseProgress(progressRepository.read());
  return progressRepository.save({
    ...latest,
    curriculum: { ...(latest.curriculum ?? { records: {} }), resume: id },
  });
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("taalmo-progress", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("taalmo-progress", callback);
  };
}
export function useProgress() {
  const raw = useSyncExternalStore(
    subscribe,
    progressRepository.read,
    () => "",
  );
  const progress = useMemo(() => parseProgress(raw), [raw]);
  const updateLearning = (
    recordKey: string,
    change: (record: LearningRecord) => LearningRecord,
  ) => {
    if (!validRecordKey(recordKey)) return false;
    const latest = parseProgress(progressRepository.read());
    const curriculum = latest.curriculum ?? { records: {}, resume: null };
    const record = change(
      curriculum.records[recordKey] ?? emptyLearningRecord(),
    );
    return progressRepository.save({
      ...latest,
      curriculum: {
        ...curriculum,
        records: { ...curriculum.records, [recordKey]: record },
      },
    });
  };
  return {
    progress,
    recordAnswer(recordKey: string, questionId: string, answer: number) {
      if (
        !/^[a-z0-9-]{1,100}$/.test(questionId) ||
        !Number.isInteger(answer) ||
        answer < 0 ||
        answer > 50
      )
        return false;
      return updateLearning(recordKey, (record) => ({
        ...record,
        answers: { ...record.answers, [questionId]: answer },
      }));
    },
    recordReflection(recordKey: string, reflection: string) {
      return updateLearning(recordKey, (record) => ({
        ...record,
        reflection: reflection.slice(0, 6000),
      }));
    },
    finishLearning(recordKey: string) {
      return updateLearning(recordKey, (record) => {
        const snapshot = {
          attempt: record.attempt,
          answers: record.answers,
          reflection: record.reflection,
          completedAt: new Date().toISOString(),
        };
        return { ...snapshot, passed: snapshot };
      });
    },
    retryLearning(recordKey: string) {
      return updateLearning(recordKey, (record) => ({
        ...emptyLearningRecord(),
        attempt: record.attempt + 1,
        ...(record.passed ? { passed: record.passed } : {}),
      }));
    },
    resumeLearning,
    complete(id: string) {
      if (!valid.includes(id)) return false;
      const p = parseProgress(progressRepository.read());
      if (p.completed.includes(id)) return true;
      return progressRepository.save({
        ...p,
        completed: [...p.completed, id],
        activity: [{ id, at: new Date().toISOString() }, ...p.activity].slice(
          0,
          8,
        ),
      });
    },
    experiment(mode: ExperimentMode) {
      if (!experimentModes.includes(mode)) return false;
      const p = parseProgress(progressRepository.read());
      return progressRepository.save({
        ...p,
        experiments: [...new Set([...p.experiments, mode])],
      });
    },
  };
}
