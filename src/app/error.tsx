"use client";
import { useLocale } from "@/lib/locale";

import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { reset: () => void }) {
  const { t } = useLocale();

  return (
    <main id="main-content" className="not-found">
      <h1>{t("Something interrupted the experiment.")}</h1>
      <p>
        {t(
          "Try opening the page again. Your saved learning progress stays on this device.",
        )}
      </p>
      <Button onClick={reset}>{t("Try again")}</Button>
    </main>
  );
}
