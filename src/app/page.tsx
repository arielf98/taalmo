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
import { ProductPreview } from "@/components/preview";
export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="hero page-width">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="status-dot" /> A playground for engineering minds{" "}
              <Sparkles size={13} />
            </div>
            <h1>
              Don’t just learn it.
              <br />
              <span>Make it happen.</span>
            </h1>
            <p className="hero-description">
              The best way to understand a system?
              <br />
              Get your hands on it. Explore, experiment, and turn
              <br className="desktop-break" /> complex concepts into your next{" "}
              <em>aha</em> moment.
            </p>
            <div className="hero-actions">
              <Button asChild>
                <Link href="/dashboard">
                  Start learning <ArrowRight size={17} />
                </Link>
              </Button>
              <Link className="text-link" href="/sandbox/duplicate-payment">
                <FlaskConical size={18} /> Explore the sandbox{" "}
                <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="hero-notes">
              <span>
                <Check size={14} /> Learn by doing
              </span>
              <span>
                <Check size={14} /> No setup needed
              </span>
              <span>
                <Check size={14} /> Free to explore
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-note">
              <span>less watching,</span>
              <strong>more “oh, that’s why.”</strong>
              <MoveUpRight size={26} />
            </div>
            <ProductPreview />
          </div>
        </section>
        <div className="philosophy-strip">
          <span>Built for the way engineers actually learn.</span>
          <div>
            <span>Learn</span>
            <ArrowRight />
            <span>Experiment</span>
            <ArrowRight />
            <span>Break</span>
            <ArrowRight />
            <span>Fix</span>
            <ArrowRight />
            <strong>Understand.</strong>
          </div>
        </div>
        <section className="how-section page-width" id="how-it-works">
          <div className="section-heading">
            <div>
              <span className="eyebrow">UNDERSTANDING, UNLOCKED</span>
              <h2>
                From “I’ve read about it”
                <br />
                to “I know how it works.”
              </h2>
            </div>
            <p>
              Short lessons. Real engineering problems.
              <br />A safe space to try things and get them wrong.
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
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="paths-section page-width">
          <div className="section-heading">
            <div>
              <span className="eyebrow">FOLLOW YOUR CURIOSITY</span>
              <h2>Big ideas. Small steps.</h2>
            </div>
            <Link className="text-link" href="/learn/database-transactions">
              Explore learning paths <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="path-preview-grid">
            <Link
              href="/learn/database-transactions"
              className="path-preview featured"
            >
              <div className="path-card-top">
                <span className="feature-icon mint">
                  <Database size={23} />
                </span>
                <Badge>START HERE</Badge>
              </div>
              <h3>Database Engineering</h3>
              <p>
                Go beyond queries. Understand what happens when data meets the
                real world.
              </p>
              <div className="path-card-bottom">
                <span>3 lessons · 1 interactive lab</span>
                <ArrowUpRight size={22} />
              </div>
            </Link>
            <div className="path-preview coming-soon">
              <div className="path-card-top">
                <span className="feature-icon lavender">
                  <Network size={23} />
                </span>
                <Badge tone="gray">ON THE HORIZON</Badge>
              </div>
              <h3>System Design</h3>
              <p>
                Explore the trade-offs behind systems that scale, bend, and
                sometimes break.
              </p>
              <div className="path-card-bottom">
                <span>In the learning roadmap</span>
              </div>
            </div>
            <div className="path-preview coming-soon">
              <div className="path-card-top">
                <span className="feature-icon peach">
                  <Braces size={23} />
                </span>
                <Badge tone="gray">ON THE HORIZON</Badge>
              </div>
              <h3>Backend Foundations</h3>
              <p>
                Follow a request from the API to the queue, and every
                interesting stop in between.
              </p>
              <div className="path-card-bottom">
                <span>In the learning roadmap</span>
              </div>
            </div>
          </div>
        </section>
        <section className="landing-cta page-width">
          <span className="eyebrow">CURIOSITY IS ALL YOU NEED</span>
          <h2>Your next “aha” is waiting.</h2>
          <p>Start with one lesson. Leave with a better mental model.</p>
          <Button asChild>
            <Link href="/dashboard">
              Let’s learn something <ArrowRight size={17} />
            </Link>
          </Button>
          <span className="cta-scribble">Make learning come alive.</span>
        </section>
      </main>
      <Footer />
    </>
  );
}
