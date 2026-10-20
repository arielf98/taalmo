"use client";
import { useLocale } from "@/lib/locale";
import Link from "next/link";
import { Header } from "@/components/shell";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  const { t } = useLocale();

  return (
    <>
      <Header />
      <main id="main-content" className="not-found">
        <span className="eyebrow">{t("404 · UNEXPLORED TERRITORY")}</span>
        <h1>{t("This path doesn’t exist yet.")}</h1>
        <p>
          {t("There’s still plenty to discover in your learning playground.")}
        </p>
        <Button asChild>
          <Link href="/dashboard">{t("Back to learning →")}</Link>
        </Button>
      </main>
    </>
  );
}
