"use client";
import { useLocale } from "@/lib/locale";
export default function Loading() {
  const { t } = useLocale();

  return (
    <main id="main-content" className="not-found" role="status">
      <span className="status-dot" />
      <p>{t("Opening your learning playground…")}</p>
    </main>
  );
}
