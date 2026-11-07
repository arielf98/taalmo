"use client";
import { useMemo, useSyncExternalStore } from "react";
import { mathRecordKey } from "@/content/cybersecurity-math/catalog";
import { emptyMathProgress, mathAttemptComplete, mathLessonUnlocked, mathModuleUnlocked, mathModulePassed, mathLessonPassed, newMathAttempt, parseMathProgress, type MathProgress, type MathRecord } from "./cybersecurity-math";
import { mathLessons, mathModules } from "@/content/cybersecurity-math/catalog";

const key = "taalmo.cybersecurity-math.progress.v1";
let fallback: string | undefined;
let failed = false;
function read() {
  if (fallback !== undefined) return fallback;
  try { return localStorage.getItem(key) ?? ""; }
  catch { return ""; }
}
function subscribe(callback: () => void) {
  const storage = (event: StorageEvent) => {
    if (event.key !== key && event.key !== null) return;
    if (!failed) fallback = undefined;
    callback();
  };
  window.addEventListener("storage", storage);
  window.addEventListener("taalmo-math-progress", callback);
  return () => { window.removeEventListener("storage", storage); window.removeEventListener("taalmo-math-progress", callback); };
}
function save(progress: MathProgress) {
  const raw = JSON.stringify(progress);
  try { localStorage.setItem(key, raw); fallback = undefined; failed = false; }
  catch { fallback = raw; failed = true; }
  window.dispatchEvent(new Event("taalmo-math-progress"));
}
function canWrite(id: string, progress: MathProgress) {
  if (mathLessons.some((lesson) => lesson.id === id && lesson.content)) return mathLessonUnlocked(id, progress);
  const module = mathModules.find((item) => item.id === id && item.checks);
  return !!module && mathModuleUnlocked(id, progress) && module.lessons.every((lesson) => mathLessonPassed(lesson.id, progress));
}

export function useMathProgress() {
  const raw = useSyncExternalStore(subscribe, read, () => "");
  const storageFailed = useSyncExternalStore(subscribe, () => failed, () => false);
  const progress = useMemo(() => raw ? parseMathProgress(raw) : emptyMathProgress(), [raw]);
  const update = (id: string, patch: Partial<MathRecord>) => {
    const latest = parseMathProgress(read());
    if (!canWrite(id, latest)) return;
    const recordKey = mathRecordKey(id);
    const current = latest.records[recordKey] ?? newMathAttempt(id);
    const record = { ...current, ...patch, answers: { ...current.answers, ...patch.answers } };
    save({ ...latest, records: { ...latest.records, [recordKey]: record },
      resume: mathLessons.some((lesson) => lesson.id === id) ? id : latest.resume });
  };
  const finish = (id: string) => {
    const latest = parseMathProgress(read());
    const record = latest.records[mathRecordKey(id)];
    if (!record || !canWrite(id, latest) || !mathAttemptComplete(id, record)) return;
    const { passed: previous, ...attempt } = record;
    const completed = { ...attempt, completedAt: new Date().toISOString() };
    save({ ...latest, records: { ...latest.records, [mathRecordKey(id)]: { ...completed, passed: previous ?? completed } } });
  };
  const restart = (id: string) => {
    const latest = parseMathProgress(read());
    if (!canWrite(id, latest)) return;
    const recordKey = mathRecordKey(id);
    save({ ...latest, records: { ...latest.records, [recordKey]: newMathAttempt(id, latest.records[recordKey] ?? newMathAttempt(id)) } });
  };
  const task = (id: string, text: string, ready: boolean) => {
    const latest = parseMathProgress(read());
    if (!mathModulePassed(id, latest)) return;
    save({ ...latest, tasks: { ...latest.tasks, [id]: { text: text.slice(0, 20000), ready: ready && !!text.trim() } } });
  };
  return { progress, storageFailed, update, finish, restart, task };
}
