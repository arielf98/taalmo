"use client";
import { useLocale } from "@/lib/locale";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  Database,
  FlaskConical,
  GitBranch,
  Lightbulb,
  LockKeyhole,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { lessons, labs, milestoneIds, pathHref } from "@/content/lessons";
import { useProgress } from "@/lib/progress";
import { Badge, Workspace } from "./shell";
import { Button } from "./ui/button";
import { Quiz } from "./quiz";
import { DatabaseEngineeringCourseCard } from "./database-learning";
import { databaseEngineeringProgress } from "@/lib/curriculum";

export function Dashboard() {
  const { t, locale } = useLocale();

  const { progress } = useProgress();
  const pathProgress = databaseEngineeringProgress(progress);
  const completedLabs = labs.filter((lab) =>
    progress.completed.includes(lab.id),
  );
  const labDone = completedLabs.length > 0;
  const next = lessons.find((l) => !progress.completed.includes(l.id));
  const transactionComplete = milestoneIds.every((id) =>
    progress.completed.includes(id),
  );
  const readyLab = labs.find(
    (lab) =>
      !progress.completed.includes(lab.id) &&
      progress.completed.includes(lab.lessonId),
  );
  const continueLab = !!readyLab;
  const focusLostUpdate = readyLab?.id === "lab-lost-update";
  const focusDeadlock = readyLab?.id === "lab-deadlock";
  return (
    <Workspace>
      <div className="breadcrumb">
        {t("Your workspace ")}
        <ChevronRight size={13} />
        {t(" My learning")}
      </div>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            {t("A LITTLE CURIOSITY GOES A LONG WAY")}
          </span>
          <h1>
            {t("Welcome to your playground")}
            <span className="mint-text">.</span>
          </h1>
          <p>{t("Let’s turn one more concept into something that clicks.")}</p>
        </div>
        <span className="welcome-spark">
          <Sparkles size={30} />
        </span>
      </div>
      <DatabaseEngineeringCourseCard />
      <section className="continue-card">
        <div>
          <Badge>
            {transactionComplete
              ? t("TRANSACTION LABS COMPLETE")
              : t("TRANSACTION PRACTICE")}
          </Badge>
          <h2>
            {transactionComplete
              ? t("Transaction labs complete.")
              : continueLab
                ? t("Ready to put it to the test?")
                : labDone
                  ? t("Keep your curiosity going.")
                  : t("One payment. Two callbacks.")}
          </h2>
          <p>
            {transactionComplete
              ? t(
                  "Keep experimenting: revisit the sandbox and explore what changes when a transaction fails.",
                )
              : continueLab
                ? t(
                    "You’ve checked the concept. Run both modes and inspect how the database protects the business change.",
                  )
                : labDone
                  ? t(
                      "You’ve completed a lab. Explore another transaction concept.",
                    )
                  : t(
                      "Discover how a tiny race condition can turn into a double payment.",
                    )}
          </p>
          <Button asChild>
            <Link
              href={
                transactionComplete || continueLab
                  ? (readyLab?.href ?? "/sandbox")
                  : labDone
                    ? `/lessons/${next?.id ?? "duplicate-payment"}`
                    : "/lessons/duplicate-payment"
              }
            >
              {transactionComplete
                ? t("Revisit the sandbox")
                : continueLab
                  ? t("Continue to the lab")
                  : labDone
                    ? t("Explore a lesson")
                    : t("Pick up the lesson")}
              <ArrowRight size={17} />
            </Link>
          </Button>
          <div className="continue-meta">
            {transactionComplete ? (
              <>
                <Check size={13} />
                {t(" All {0} milestones complete", [milestoneIds.length])}
              </>
            ) : (
              <>
                <Clock size={13} />
                {t(" About 15 minutes ")}
                <span>•</span>
                {t(" Beginner friendly")}
              </>
            )}
          </div>
        </div>
        <div className="continue-art" aria-hidden="true">
          <div className="art-callback a">
            {focusDeadlock
              ? t("transaction A")
              : focusLostUpdate
                ? t("request A")
                : t("callback A")}{" "}
            <ArrowRight size={18} />
          </div>
          <div className="art-callback b">
            {focusDeadlock
              ? t("transaction B")
              : focusLostUpdate
                ? t("request B")
                : t("callback B")}{" "}
            <ArrowRight size={18} />
          </div>
          <div className="art-db">
            <Database size={40} />
            <span>
              {focusDeadlock
                ? t("No cycle.")
                : focusLostUpdate
                  ? t("Both updates.")
                  : t("One effect.")}
            </span>
          </div>
          <span className="art-stamp">
            <Check size={17} />{" "}
            {focusDeadlock
              ? t("consistent locks")
              : focusLostUpdate
                ? t("atomic increment")
                : t("idempotent")}
          </span>
        </div>
      </section>
      <div className="dashboard-stats">
        <div>
          <BookOpen size={20} />
          <strong>
            {pathProgress.completedLessons}
            <span>/ {pathProgress.totalLessons}</span>
          </strong>
          <span>{t("Lessons completed")}</span>
        </div>
        <div>
          <FlaskConical size={20} />
          <strong>
            {completedLabs.length}
            <span>/ {labs.length}</span>
          </strong>
          <span>{t("Labs completed")}</span>
        </div>
        <div>
          <GitBranch size={20} />
          <strong>
            {pathProgress.percent}
            <span>%</span>
          </strong>
          <span>{t("Path progress")}</span>
        </div>
      </div>
      <section className="activity-section">
        <div className="section-heading compact">
          <h2>{t("Recent activity")}</h2>
          <Badge tone="gray">{t("ON THIS DEVICE")}</Badge>
        </div>
        {progress.activity.length ? (
          <div className="card activity-list">
            {progress.activity.map((a) => (
              <Link
                key={a.id}
                href={
                  labs.find((lab) => lab.id === a.id)?.href ??
                  `/lessons/${a.id}`
                }
              >
                <span className="activity-check">
                  <Check size={17} />
                </span>
                <div>
                  <strong>
                    {t("{0} completed", [
                      labs.find((lab) => lab.id === a.id)?.title ??
                        lessons.find((lesson) => lesson.id === a.id)?.title,
                    ])}
                  </strong>
                  <p>
                    {new Date(a.at).toLocaleDateString(locale, {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    {t("· Keep building your understanding")}
                  </p>
                </div>
                <ChevronRight size={16} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-activity">
            <span className="feature-icon mint">
              <Lightbulb size={20} />
            </span>
            <div>
              <strong>{t("Your first “aha” goes here.")}</strong>
              <p>
                {t(
                  "Finish a checkpoint or a lab to start your learning story.",
                )}
              </p>
            </div>
          </div>
        )}
      </section>
      <div className="recommendation">
        <Lightbulb size={19} />
        <p>
          <strong>{t("A good next step:")}</strong>{" "}
          {readyLab
            ? t("Continue with {0} and compare both execution strategies.", [
                readyLab.title,
              ])
            : transactionComplete
              ? t(
                  "Revisit Lost Update with a different write order, then compare the payment lab’s idempotency guarantee.",
                )
              : t(
                  "Complete a lesson checkpoint, then explore its interactive lab.",
                )}
        </p>
      </div>
    </Workspace>
  );
}
function InteractiveExample({ slug }: { slug: string }) {
  const { t } = useLocale();

  const [step, setStep] = useState(0);
  const content =
    slug === "lost-update"
      ? [
          "Start: balance = $100.",
          "A reads $100. B also reads $100.",
          "A adds $20 and writes $120.",
          "B adds $30 to its old $100 and writes $130.",
          "Expected $150. Actual $130. A’s update was lost.",
        ]
      : slug === "deadlock"
        ? [
            "Start: both accounts are unlocked.",
            "A locks account X.",
            "B locks account Y.",
            "A waits for Y. B waits for X. A circular wait.",
            "The database aborts one transaction. Retry the full transaction.",
          ]
        : [
            "Start: pay_1042 has not been processed.",
            "Callback A reads processed = false.",
            "Callback B also reads false, before A commits.",
            "A credits $49. B credits $49. Same payment.",
            "The ledger now has $98 in credits for one $49 payment.",
          ];
  return (
    <div className="interactive-example">
      <div className="example-top">
        <span className="eyebrow">
          <FlaskConical size={15} />
          {t(" FOLLOW THE INTERLEAVING")}
        </span>
        <span>
          {step + 1} / {content.length}
        </span>
      </div>
      <div className="example-state" aria-live="polite">
        <span className="example-step">
          {String(step + 1).padStart(2, "0")}
        </span>
        <p>{t(content[step])}</p>
      </div>
      <div className="example-controls">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStep((s) => s + 1)}
          disabled={step === content.length - 1}
        >
          {t("Next step ")}
          <ArrowRight size={14} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setStep(0)}
          aria-label={t("Reset example")}
        >
          <RotateCcw size={15} />
          {t("Reset")}
        </Button>
      </div>
    </div>
  );
}
export function Lesson({ slug }: { slug: string }) {
  const { t } = useLocale();

  const index = lessons.findIndex((l) => l.id === slug);
  const lesson = lessons[index];
  if (!lesson) return null;
  return (
    <Workspace>
      <div className="breadcrumb">
        <Link href={pathHref}>{t("Database Engineering")}</Link>
        <ChevronRight size={13} />
        <span>
          {t("Lesson ")}
          {lesson.number}
        </span>
      </div>
      <div className="lesson-layout">
        <article>
          <div className="lesson-heading">
            <Badge>{t(lesson.tag).toUpperCase()}</Badge>
            <h1>{t(lesson.title)}</h1>
            <p>{t(lesson.subtitle)}</p>
            <div className="inline-meta">
              <span>
                <Clock size={14} />
                {t(lesson.duration)}
              </span>
              <span>
                <BookOpen size={14} />
                {t(" Beginner friendly")}
              </span>
            </div>
          </div>
          <section className="lesson-section" id="the-concept">
            <span className="eyebrow">{t("01 · THE CONCEPT")}</span>
            <h2>
              {slug === "duplicate-payment"
                ? t("Retries are normal. Double payments aren’t.")
                : slug === "lost-update"
                  ? t("A read and a write leave room for a race.")
                  : t("Two locks. One circular wait.")}
            </h2>
            <p>{t(lesson.intro)}</p>
            <div className="concept-callout">
              <Lightbulb size={20} />
              <p>{t(lesson.example)}</p>
            </div>
          </section>
          <section className="lesson-section" id="try-it">
            <span className="eyebrow">{t("02 · SEE IT HAPPEN")}</span>
            <h2>{t("Slow things down. See the problem.")}</h2>
            <p>
              {t(
                "Step through the requests to see where the two operations overlap.",
              )}
            </p>
            <InteractiveExample slug={slug} />
          </section>
          <section className="lesson-section" id="the-fix">
            <span className="eyebrow">{t("03 · THE ENGINEERING IDEA")}</span>
            <h2>
              {slug === "duplicate-payment"
                ? t("Make the decision and the effect atomic.")
                : t("Make concurrency part of the design.")}
            </h2>
            <p>{t(lesson.principle)}</p>
            {slug === "duplicate-payment" && (
              <>
                <pre className="code-block">
                  <code>{`BEGIN;\nINSERT INTO processed_payments (payment_id)\nVALUES ('pay_1042')\nON CONFLICT DO NOTHING\nRETURNING payment_id;\n\n-- Only when INSERT returns a row:\nINSERT INTO ledger (...);\nINSERT INTO outbox (...);\nCOMMIT;`}</code>
                </pre>
                <p className="small muted">
                  {t(
                    "Conceptual SQL. The unique constraint must be on payment_id. Only the transaction that claims the key makes the business writes. Outbox publication happens later, and delivery may repeat.",
                  )}
                </p>
              </>
            )}
          </section>
          <div id="checkpoint">
            <Quiz
              id={lesson.id}
              question={lesson.question}
              options={lesson.options}
              answer={lesson.answer}
              explanation={lesson.explanation}
            />
          </div>
          {lesson.labHref ? (
            <section className="launch-card">
              <span className="feature-icon mint">
                <FlaskConical size={26} />
              </span>
              <div>
                <h3>{t("Now, make it happen.")}</h3>
                <p>
                  {slug === "lost-update"
                    ? t(
                        "Make two requests compete for one balance. Then preserve both increments.",
                      )
                    : slug === "deadlock"
                      ? t(
                          "Inspect a circular wait. Then prevent it with a consistent lock order.",
                        )
                      : t(
                          "Break a payment handler. Then protect it with atomic idempotency.",
                        )}
                </p>
              </div>
              <Button asChild>
                <Link href={lesson.labHref}>
                  {t("Launch sandbox ")}
                  <ArrowUpRight size={16} />
                </Link>
              </Button>
            </section>
          ) : (
            <section className="unavailable-lab">
              <LockKeyhole size={23} />
              <div>
                <h3>{t("Interactive lab coming next")}</h3>
                <p>
                  {t(
                    "The introduction and checkpoint are available. Explore the learning path for available interactive labs.",
                  )}
                </p>
                <Link className="text-link" href={pathHref}>
                  {t("Explore the available labs ")}
                  <ArrowRight size={15} />
                </Link>
              </div>
            </section>
          )}
          <div className="lesson-pagination">
            <Link
              href={index > 0 ? `/lessons/${lessons[index - 1].id}` : pathHref}
            >
              ← {index > 0 ? t("Previous lesson") : t("Back to path")}
            </Link>
            {index < lessons.length - 1 && (
              <Link href={`/lessons/${lessons[index + 1].id}`}>
                {t("Next: ")}
                {t(lessons[index + 1].title)} <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </article>
        <aside className="lesson-toc">
          <span className="eyebrow muted">{t("IN THIS LESSON")}</span>
          <a href="#the-concept">
            01 <span>{t("The concept")}</span>
          </a>
          <a href="#try-it">
            02 <span>{t("See it happen")}</span>
          </a>
          <a href="#the-fix">
            03 <span>{t("The engineering idea")}</span>
          </a>
          <a href="#checkpoint">
            04 <span>{t("Check your understanding")}</span>
          </a>
          {lesson.labHref && (
            <Button asChild variant="outline" size="sm">
              <Link href={lesson.labHref}>
                {t("Launch sandbox ")}
                <ArrowUpRight size={14} />
              </Link>
            </Button>
          )}
        </aside>
      </div>
    </Workspace>
  );
}
export function Challenges() {
  const { t } = useLocale();

  return (
    <Workspace>
      <div className="breadcrumb">
        {t("Your workspace ")}
        <ChevronRight size={13} />
        {t(" Challenges")}
      </div>
      <div className="page-heading">
        <div>
          <span className="eyebrow">{t("TEST YOUR MENTAL MODEL")}</span>
          <h1>
            {t("A small challenge.")}
            <br />
            {t("A deeper understanding.")}
          </h1>
          <p>
            {t(
              "Reason through the scenario. Every answer comes with an explanation.",
            )}
          </p>
        </div>
        <span className="feature-icon lavender">
          <FlaskConical size={30} />
        </span>
      </div>
      <div className="challenge-grid">
        {lessons.map((l) => (
          <div key={l.id}>
            <div className="challenge-label">
              <Badge tone="gray">{t(l.tag)}</Badge>
              <Link className="text-link small" href={`/lessons/${l.id}`}>
                {t("Read the lesson ")}
                <ArrowUpRight size={13} />
              </Link>
            </div>
            <Quiz
              id={l.id}
              question={l.question}
              options={l.options}
              answer={l.answer}
              explanation={l.explanation}
            />
          </div>
        ))}
      </div>
    </Workspace>
  );
}
