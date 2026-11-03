import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useSyncExternalStore } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { roadmap, statuses, type RoadmapStatus } from "../data/roadmap";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap — Verynize" },
      {
        name: "description",
        content:
          "Explore what works locally in Verynize, what remains partial, and the directions ahead. An always-free design app with transparent progress.",
      },
    ],
  }),
  component: RoadmapPage,
});
const subscribe = () => () => {};
function RoadmapPage() {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [filter, setFilter] = useState<RoadmapStatus | "all">("all");
  const filters = ["all", "available", "partial", "exploring"] as const;
  const count = roadmap
    .flatMap((group) => group.items)
    .filter((item) => filter === "all" || item.status === filter).length;
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="header roadmap-header">
        <Link className="brand" to="/" aria-label="Verynize home">
          <span className="brand-mark">v.</span>verynize
          <span className="alpha">LOCAL FIRST</span>
        </Link>
        <nav className="roadmap-nav" aria-label="Main navigation">
          <Link to="/">Overview</Link>
          <Link to="/roadmap" aria-current="page">
            Roadmap
          </Link>
          <a className="nav-cta" href="/#start">
            Start creating <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main id="main" className="roadmap-main">
        <section className="roadmap-hero">
          <span className="eyebrow">THE ROAD AHEAD</span>
          <h1>
            Good ideas take shape.
            <br />
            <span>Here’s where we are.</span>
          </h1>
          <p>
            What you can use locally, what needs more work,
            <br className="desktop-break" /> and the possibilities we’re
            exploring next.
          </p>
          <div className="roadmap-date">
            Product v0.17.0 · Evidence: October 31, 2026 · Reviewed: November 1,
            2026
          </div>
        </section>
        <section className="roadmap-key" aria-label="What the statuses mean">
          {Object.entries(statuses).map(([key, status]) => (
            <div key={key}>
              <span className={`status-badge status-${key}`}>
                {status.label}
              </span>
              <p>{status.description}</p>
            </div>
          ))}
        </section>
        <div className="roadmap-controls">
          <div
            className="roadmap-filters"
            role="group"
            aria-label="Filter roadmap"
          >
            {filters.map((value) => (
              <button
                key={value}
                disabled={!hydrated}
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
              >
                {value === "all" ? "All directions" : statuses[value].label}
              </button>
            ))}
          </div>
          <p aria-live="polite">{count} directions</p>
        </div>
        {roadmap.map((group, index) => {
          const items = group.items.filter(
            (item) => filter === "all" || item.status === filter,
          );
          if (!items.length) return null;
          return (
            <section
              className="roadmap-group"
              key={group.id}
              aria-labelledby={group.id}
            >
              <div className="roadmap-group-heading">
                <span className="eyebrow">
                  0{index + 1} /{" "}
                  {group.id === "canvas"
                    ? "CANVAS"
                    : group.id === "code"
                      ? "PROJECTS & CODE"
                      : "AGENTS & PEOPLE"}
                </span>
                <h2 id={group.id}>{group.title}</h2>
                <p>{group.intro}</p>
              </div>
              <div className="roadmap-grid">
                {items.map((item) => (
                  <article className="roadmap-card" key={item.title}>
                    <span className={`status-badge status-${item.status}`}>
                      {statuses[item.status].label}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
        <section className="roadmap-promise">
          <span className="eyebrow">ONE THING IS ALREADY DECIDED</span>
          <h2>The app stays free. Always.</h2>
          <p>
            Any future paid offerings are limited to optional cloud and AI
            services. Self-hosting stays free of Verynize license fees; your
            infrastructure and AI providers may charge for usage.
          </p>
          <a className="button primary" href="/#start">
            Start with your next idea <ArrowRight size={16} />
          </a>
        </section>
        <aside className="roadmap-evidence">
          <h2>About this roadmap</h2>
          <p>
            These are Verynize’s own implementation statuses. Available locally
            means tested within the stated scope, not a hosted production
            service. Exploring items have no committed delivery dates.
          </p>
          <p>
            Feature coverage began with the{" "}
            <a
              href="https://wonder.design/roadmap"
              target="_blank"
              rel="noreferrer"
            >
              Wonder roadmap <ArrowUpRight size={12} />
            </a>{" "}
            and now tracks our canvas, preview workflow, design guidance,
            agents, and locally exercised cloud capabilities. Verynize is
            independently authored; this page does not claim full Wonder parity
            or affiliation.
          </p>
        </aside>
      </main>
      <footer>
        <Link className="brand" to="/">
          <span className="brand-mark">v.</span>verynize
        </Link>
        <span>A little more possibility.</span>
        <Link to="/">
          Back to the workspace <ArrowUpRight size={13} />
        </Link>
      </footer>
    </>
  );
}
