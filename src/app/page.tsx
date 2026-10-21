"use client";
import { useLocale } from "@/lib/locale";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  FlaskConical,
  Lightbulb,
  Database,
  Braces,
  Network,
  Check,
  Sparkles,
  MoveUpRight,
} from "lucide-react";
import { Header, Footer, Badge } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { lessons, labs, pathHref } from "@/content/lessons";
import { publishedLessons } from "@/content/database/catalog";
import { ProductPreview } from "@/components/preview";
export default function Home() {
  const { t } = useLocale();

  return (
    <>
      <Header />
      <main id="main-content">
        <section className="hero page-width">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="status-dot" />
              {t(" A playground for engineering minds")} <Sparkles size={13} />
            </div>
            <h1>
              {t("Don’t just learn it.")}
              <br />
              <span>{t("Make it happen.")}</span>
            </h1>
            <p className="hero-description">
              {t("The best way to understand a system?")}
              <br />
              {t(
                "Get your hands on it. Explore, experiment, and turn complex concepts into your next aha moment.",
              )}
            </p>
            <div className="hero-actions">
              <Button asChild>
                <Link href="/dashboard">
                  {t("Start learning ")}
                  <ArrowRight size={17} />
                </Link>
              </Button>
              <Link className="text-link" href="/sandbox/duplicate-payment">
                <FlaskConical size={18} />
                {t(" Explore the sandbox")} <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="hero-notes">
              <span>
                <Check size={14} />
                {t(" Learn by doing")}
              </span>
              <span>
                <Check size={14} />
                {t(" No setup needed")}
              </span>
              <span>
                <Check size={14} />
                {t(" Free to explore")}
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-note">
              <span>{t("less watching,")}</span>
              <strong>{t("more “oh, that’s why.”")}</strong>
              <MoveUpRight size={26} />
            </div>
            <ProductPreview />
          </div>
        </section>
        <div className="philosophy-strip">
          <span>{t("Built for the way engineers actually learn.")}</span>
          <div>
            <span>{t("Learn")}</span>
            <ArrowRight />
            <span>{t("Experiment")}</span>
            <ArrowRight />
            <span>{t("Break")}</span>
            <ArrowRight />
            <span>{t("Fix")}</span>
            <ArrowRight />
            <strong>{t("Understand.")}</strong>
          </div>
        </div>
        <section className="how-section page-width" id="how-it-works">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{t("UNDERSTANDING, UNLOCKED")}</span>
              <h2>
                {t("From “I’ve read about it”")}
                <br />
                {t("to “I know how it works.”")}
              </h2>
            </div>
            <p>
              {t("Short lessons. Real engineering problems.")}
              <br />
              {t("A safe space to try things and get them wrong.")}
            </p>
          </div>
          <div className="how-grid">
            {[
              {
                Icon: BookOpen,
                n: "01",
                title: "Get the idea.",
                text: "Build your intuition with bite-sized explanations connected to real software systems.",
                color: "mint",
              },
              {
                Icon: FlaskConical,
                n: "02",
                title: "Get your hands on it.",
                text: "Run requests, change the rules, and watch the system respond. Break things on purpose.",
                color: "lavender",
              },
              {
                Icon: Lightbulb,
                n: "03",
                title: "Make it click.",
                text: "Inspect what happened, fix the problem, and test your understanding with a challenge.",
                color: "peach",
              },
            ].map((item) => (
              <div className="how-card" key={item.n}>
                <div className={`feature-icon ${item.color}`}>
                  <item.Icon size={23} />
                </div>
                <span className="step-number">{item.n}</span>
                <h3>{t(item.title)}</h3>
                <p>{t(item.text)}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="paths-section page-width">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{t("FOLLOW YOUR CURIOSITY")}</span>
              <h2>{t("Big ideas. Small steps.")}</h2>
            </div>
            <Link className="text-link" href={pathHref}>
              {t("Explore learning paths ")}
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="path-preview-grid">
            <Link href={pathHref} className="path-preview featured">
              <div className="path-card-top">
                <span className="feature-icon mint">
                  <Database size={23} />
                </span>
                <Badge>{t("START HERE")}</Badge>
              </div>
              <h3>{t("Database Engineering")}</h3>
              <p>
                {t(
                  "Go beyond queries. Understand what happens when data meets the real world.",
                )}
              </p>
              <div className="path-card-bottom">
                <span>
                  {lessons.length + publishedLessons.length}
                  {t(" lessons · ")}
                  {labs.length}
                  {t(" interactive labs")}
                </span>
                <ArrowUpRight size={22} />
              </div>
            </Link>
            <div className="path-preview coming-soon">
              <div className="path-card-top">
                <span className="feature-icon lavender">
                  <Network size={23} />
                </span>
                <Badge tone="gray">{t("ON THE HORIZON")}</Badge>
              </div>
              <h3>{t("System Design")}</h3>
              <p>
                {t(
                  "Explore the trade-offs behind systems that scale, bend, and sometimes break.",
                )}
              </p>
              <div className="path-card-bottom">
                <span>{t("In the learning roadmap")}</span>
              </div>
            </div>
            <div className="path-preview coming-soon">
              <div className="path-card-top">
                <span className="feature-icon peach">
                  <Braces size={23} />
                </span>
                <Badge tone="gray">{t("ON THE HORIZON")}</Badge>
              </div>
              <h3>{t("Backend Foundations")}</h3>
              <p>
                {t(
                  "Follow a request from the API to the queue, and every interesting stop in between.",
                )}
              </p>
              <div className="path-card-bottom">
                <span>{t("In the learning roadmap")}</span>
              </div>
            </div>
          </div>
        </section>
        <section className="landing-cta page-width">
          <span className="eyebrow">{t("CURIOSITY IS ALL YOU NEED")}</span>
          <h2>{t("Your next “aha” is waiting.")}</h2>
          <p>{t("Start with one lesson. Leave with a better mental model.")}</p>
          <Button asChild>
            <Link href="/dashboard">
              {t("Let’s learn something ")}
              <ArrowRight size={17} />
            </Link>
          </Button>
          <span className="cta-scribble">{t("Make learning come alive.")}</span>
        </section>
      </main>
      <Footer />
    </>
  );
}
