"use client";
import { useCallback, useEffect, useSyncExternalStore } from "react";
import { translate, type Locale } from "@/content/messages";
const key = "taalmo.locale.v1";
let current: Locale | undefined;
function readLocale(): Locale {
  if (current) return current;
  try {
    return localStorage.getItem(key) === "id" ? "id" : "en";
  } catch {
    return "en";
  }
}
function subscribe(callback: () => void) {
  const storage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) {
      current = undefined;
      callback();
    }
  };
  window.addEventListener("storage", storage);
  window.addEventListener("taalmo-locale", callback);
  return () => {
    window.removeEventListener("storage", storage);
    window.removeEventListener("taalmo-locale", callback);
  };
}
function setLocale(locale: Locale) {
  if (locale !== "en" && locale !== "id") return;
  current = locale;
  try {
    localStorage.setItem(key, locale);
  } catch {
    /* The active language still works when persistence is unavailable. */
  }
  document.documentElement.lang = locale;
  window.dispatchEvent(new Event("taalmo-locale"));
}
export function useLocale() {
  const locale = useSyncExternalStore(
    subscribe,
    readLocale,
    (): Locale => "en",
  );
  const t = useCallback(
    (message: string, values: readonly unknown[] = []) =>
      translate(message, locale, values),
    [locale],
  );
  return { locale, t, setLocale };
}
export function LocaleDocument() {
  const { locale } = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
export function SkipLink() {
  const { t } = useLocale();
  return (
    <a className="skip-link" href="#main-content">
      {t("Skip to content")}
    </a>
  );
}

export function localizedFlowLabels(
  t: (message: string) => string,
  inspectable = true,
) {
  const nodeInstructions = t(
    inspectable
      ? "Press Enter or Space to select a node. Use the component selector below to inspect it."
      : "Diagram overview. Open an interactive lab to inspect components.",
  );
  return {
    "node.a11yDescription.default": nodeInstructions,
    "node.a11yDescription.keyboardDisabled": nodeInstructions,
    "edge.a11yDescription.default": t(
      "Press Enter or Space to select an edge.",
    ),
    "controls.ariaLabel": t("Diagram controls"),
    "controls.zoomIn.ariaLabel": t("Zoom in"),
    "controls.zoomOut.ariaLabel": t("Zoom out"),
    "controls.fitView.ariaLabel": t("Fit view"),
    "controls.interactive.ariaLabel": t("Toggle interactivity"),
  };
}
