import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import css from "../styles.css?url";
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Verynize — Your canvas. Your agents. Your ideas." },
      {
        name: "description",
        content:
          "An always-free, MIT-licensed macOS workspace for design and code. Shape your canvas, guide Claude or Codex with design styles, preview real apps, and review changes.",
      },
      { name: "theme-color", content: "#f6f5f1" },
    ],
    links: [
      { rel: "stylesheet", href: css },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  component: () => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  ),
  notFoundComponent: () => (
    <main className="section">
      <h1>Nothing on this canvas.</h1>
      <a href="/">Back to Verynize →</a>
    </main>
  ),
});
