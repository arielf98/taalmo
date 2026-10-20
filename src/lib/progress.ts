"use client";
import { useMemo, useSyncExternalStore } from "react";
const key = "taalmo.progress.v1";
export interface Progress {
  completed: string[];
  activity: { id: string; at: string }[];
  experiments: ("unsafe" | "protected")[];
}
const empty = (): Progress => ({
  completed: [],
  activity: [],
  experiments: [],
});
const valid = ["lost-update", "duplicate-payment", "deadlock", "lab-payment"];
export function parseProgress(raw: string): Progress {
  try {
    const p: unknown = JSON.parse(raw);
    if (!p || typeof p !== "object") return empty();
    const v = p as Record<string, unknown>;
    return {
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
            (m): m is "unsafe" | "protected" =>
              m === "unsafe" || m === "protected",
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
  return {
    progress,
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
    experiment(mode: "unsafe" | "protected") {
      const p = parseProgress(progressRepository.read());
      return progressRepository.save({
        ...p,
        experiments: [...new Set([...p.experiments, mode])],
      });
    },
  };
}
