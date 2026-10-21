"use client";
import { useLocale } from "@/lib/locale";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import {
  ArrowUpRight,
  BookOpen,
  FlaskConical,
  LayoutGrid,
  Moon,
  Sun,
  Sprout,
  ChevronRight,
  Database,
  Check,
} from "lucide-react";
import { Button } from "./ui/button";
import { milestoneIds } from "@/content/lessons";
import { useProgress } from "@/lib/progress";
const themeSubscribe = (fn: () => void) => {
  window.addEventListener("taalmo-theme", fn);
  return () => window.removeEventListener("taalmo-theme", fn);
};
function LanguageSelect() {
  const { locale, t, setLocale } = useLocale();
  return (
    <label className="language-control">
      <span className="sr-only">{t("Choose language")}</span>
      <select
        value={locale}
        onChange={(event) => {
          const next = event.target.value;
          if (next === "en" || next === "id") setLocale(next);
        }}
      >
        <option value="en" lang="en">
          English
        </option>
        <option value="id" lang="id">
          Indonesia
        </option>
      </select>
    </label>
  );
}
export function ThemeToggle() {
  const { t } = useLocale();

  const theme = useSyncExternalStore(
    themeSubscribe,
    () => document.documentElement.dataset.theme ?? "light",
    () => "light",
  );
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={t("Toggle theme")}
      onClick={() => {
        const next = theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("taalmo.theme", next);
        } catch {}
        window.dispatchEvent(new Event("taalmo-theme"));
      }}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}
export function Logo() {
  const { t } = useLocale();

  return (
    <Link href="/" className="logo" aria-label={t("Taalmo home")}>
      <span className="logo-mark">
        <Sprout size={24} strokeWidth={2.3} />
      </span>
      {t("taalmo")}
      <span className="logo-dot">.</span>
    </Link>
  );
}
export function Header() {
  const { t } = useLocale();

  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav aria-label={t("Main navigation")}>
          <Link
            className={pathname === "/dashboard" ? "active" : ""}
            href="/dashboard"
          >
            {t("Learn")}
          </Link>
          <Link
            className={pathname.startsWith("/challenges") ? "active" : ""}
            href="/challenges"
          >
            {t("Challenges")}
          </Link>
          <Link
            className={pathname.startsWith("/sandbox") ? "active" : ""}
            href="/sandbox/duplicate-payment"
          >
            {t("Sandbox")}
          </Link>
        </nav>
        <div className="header-actions">
          <LanguageSelect />
          <ThemeToggle />
          <Button asChild size="sm">
            <Link href="/dashboard">
              {t("Start learning ")}
              <ArrowUpRight size={15} />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
export function Workspace({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  const { t } = useLocale();

  const path = usePathname();
  const { progress } = useProgress();
  const links = [
    { href: "/dashboard", label: "My learning", icon: LayoutGrid },
    {
      href: "/learn/database-transactions",
      label: "Learning paths",
      icon: BookOpen,
    },
    {
      href: "/learn/database-zero-to-master",
      label: "Database Zero to Master",
      icon: Database,
    },
    { href: "/challenges", label: "Challenges", icon: FlaskConical },
  ];
  return (
    <>
      <Header />
      <div className={`workspace ${wide ? "workspace-wide" : ""}`}>
        <aside className="sidebar">
          <div className="eyebrow muted">{t("YOUR WORKSPACE")}</div>
          <nav aria-label={t("Workspace")}>
            {links.map((l) => (
              <Link
                className={path === l.href ? "selected" : ""}
                key={l.href}
                href={l.href}
              >
                <l.icon size={18} />
                {t(l.label)}
              </Link>
            ))}
          </nav>
          <div className="sidebar-section">
            <div className="eyebrow muted">{t("CURRENT PATH")}</div>
            <Link className="sidebar-path" href="/learn/database-transactions">
              <Database size={19} />
              <span>{t("Database Engineering")}</span>
              <ChevronRight size={14} />
            </Link>
            <div className="progress-track">
              <span
                style={{
                  width: `${(progress.completed.length / milestoneIds.length) * 100}%`,
                }}
              />
            </div>
            <small>
              {t("{0} of {1} milestones complete", [
                progress.completed.length,
                milestoneIds.length,
              ])}
            </small>
          </div>
          <div className="sidebar-note">
            <Sprout size={22} />
            <strong>
              {t("Small steps.")}
              <br />
              {t("Deeper understanding.")}
            </strong>
            <p>{t("Your next “aha” moment is one experiment away.")}</p>
          </div>
          <div className="local-status">
            <span className="status-dot" />
            {t(" Progress stays on this device")}
          </div>
        </aside>
        <main className="workspace-content" id="main-content">
          {children}
        </main>
      </div>
    </>
  );
}
export function Badge({
  children,
  tone = "mint",
}: {
  children: React.ReactNode;
  tone?: "mint" | "amber" | "gray";
}) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
export function Completion({ done }: { done: boolean }) {
  const { t } = useLocale();

  return done ? (
    <span className="completion">
      <Check size={15} />
      {t(" Complete")}
    </span>
  ) : (
    <span className="muted">{t("Not started")}</span>
  );
}
export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="site-footer">
      <Logo />
      <span>{t("Make learning come alive.")}</span>
      <span>{t("Built for curious minds.")}</span>
    </footer>
  );
}
