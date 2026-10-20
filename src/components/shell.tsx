"use client";
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
export function ThemeToggle() {
  const theme = useSyncExternalStore(
    themeSubscribe,
    () => document.documentElement.dataset.theme ?? "light",
    () => "light",
  );
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
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
  return (
    <Link href="/" className="logo" aria-label="Taalmo home">
      <span className="logo-mark">
        <Sprout size={24} strokeWidth={2.3} />
      </span>
      taalmo<span className="logo-dot">.</span>
    </Link>
  );
}
export function Header() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav aria-label="Main navigation">
          <Link
            className={pathname === "/dashboard" ? "active" : ""}
            href="/dashboard"
          >
            Learn
          </Link>
          <Link
            className={pathname.startsWith("/challenges") ? "active" : ""}
            href="/challenges"
          >
            Challenges
          </Link>
          <Link
            className={pathname.startsWith("/sandbox") ? "active" : ""}
            href="/sandbox/duplicate-payment"
          >
            Sandbox
          </Link>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Button asChild size="sm">
            <Link href="/dashboard">
              Start learning <ArrowUpRight size={15} />
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
  const path = usePathname();
  const { progress } = useProgress();
  const links = [
    { href: "/dashboard", label: "My learning", icon: LayoutGrid },
    {
      href: "/learn/database-transactions",
      label: "Learning paths",
      icon: BookOpen,
    },
    { href: "/challenges", label: "Challenges", icon: FlaskConical },
  ];
  return (
    <>
      <Header />
      <div className={`workspace ${wide ? "workspace-wide" : ""}`}>
        <aside className="sidebar">
          <div className="eyebrow muted">YOUR WORKSPACE</div>
          <nav aria-label="Workspace">
            {links.map((l) => (
              <Link
                className={path === l.href ? "selected" : ""}
                key={l.href}
                href={l.href}
              >
                <l.icon size={18} />
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="sidebar-section">
            <div className="eyebrow muted">CURRENT PATH</div>
            <Link className="sidebar-path" href="/learn/database-transactions">
              <Database size={19} />
              <span>
                Database
                <br />
                Engineering
              </span>
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
              {progress.completed.length} of {milestoneIds.length} milestones
              complete
            </small>
          </div>
          <div className="sidebar-note">
            <Sprout size={22} />
            <strong>
              Small steps.
              <br />
              Deeper understanding.
            </strong>
            <p>Your next “aha” moment is one experiment away.</p>
          </div>
          <div className="local-status">
            <span className="status-dot" /> Progress stays on this device
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
  return done ? (
    <span className="completion">
      <Check size={15} /> Complete
    </span>
  ) : (
    <span className="muted">Not started</span>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <Logo />
      <span>Make learning come alive.</span>
      <span>Built for curious minds.</span>
    </footer>
  );
}
