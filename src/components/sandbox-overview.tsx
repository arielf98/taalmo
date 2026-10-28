"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronRight, FlaskConical } from "lucide-react";
import { labs, lessons } from "@/content/lessons";
import { useLocale } from "@/lib/locale";
import { useProgress } from "@/lib/progress";
import { Badge, Workspace } from "./shell";
import { Button } from "./ui/button";
import styles from "./sandbox-overview.module.css";

export function SandboxOverview() {
  const { t } = useLocale();
  const { progress } = useProgress();
  const completedLabs = labs.filter((lab) =>
    progress.completed.includes(lab.id),
  ).length;

  return (
    <Workspace>
      <div className="breadcrumb">
        {t("Your workspace ")}
        <ChevronRight size={13} aria-hidden="true" />
        {t("Sandbox")}
      </div>
      <div className="page-heading">
        <div>
          <span className="eyebrow">{t("INTERACTIVE LABS")}</span>
          <h1>{t("Choose your next experiment")}</h1>
          <p>
            {t(
              "Finish both modes, then pass the final checkpoint. Your progress stays on this device.",
            )}
          </p>
        </div>
        <span className="feature-icon mint" aria-hidden="true">
          <FlaskConical size={30} />
        </span>
      </div>
      <p className="simulation-notice">
        {t(
          "These labs use deterministic database models. No real PostgreSQL server, payments, or measured runtime metrics.",
        )}
      </p>
      <p className="small muted">
        {t("{0} of {1} labs complete", [completedLabs, labs.length])}
      </p>
      <section className={styles.list} aria-label={t("Available sandboxes")}>
        {labs.map((lab) => {
          const lesson = lessons.find((item) => item.id === lab.lessonId);
          if (!lesson) return null;
          const done = progress.completed.includes(lab.id);
          const explored = lab.modes.filter((mode) =>
            progress.experiments.includes(mode),
          ).length;

          return (
            <article
              className={`card ${styles.card}`}
              key={lab.id}
              aria-labelledby={`${lab.id}-title`}
            >
              <div className={styles.labels}>
                <Badge tone="gray">{t(lesson.tag)}</Badge>
                <Badge tone={done ? "mint" : "gray"}>
                  {t(
                    done
                      ? "Lab complete"
                      : explored
                        ? "In progress"
                        : "Not started",
                  )}
                </Badge>
              </div>
              <h2 className={styles.title} id={`${lab.id}-title`}>
                {t(lesson.title)}
              </h2>
              <p className={styles.description}>{t(lesson.intro)}</p>
              <p className="small muted">
                {t("{0} of {1} modes explored", [explored, lab.modes.length])}
              </p>
              <div className={styles.actions}>
                <Button asChild>
                  <Link href={lab.href}>
                    {t("Launch sandbox")}
                    <span className="sr-only">: {t(lesson.title)}</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </Button>
                <Link className="text-link small" href={`/lessons/${lesson.id}`}>
                  {t("Read the lesson")}
                  <span className="sr-only">: {t(lesson.title)}</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </Workspace>
  );
}
