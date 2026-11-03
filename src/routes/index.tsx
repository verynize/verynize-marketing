import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useSyncExternalStore } from "react";
const subscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
import {
  ArrowUpRight,
  ArrowRight,
  MousePointer2,
  Frame,
  Type,
  Square,
  Hand,
  Plus,
  Sparkles,
  Layers,
  Code2,
  FolderOpen,
  Command,
  Check,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
export const Route = createFileRoute("/")({ component: Home });
const modes = ["Canvas", "Agents", "Code"] as const;
function Workspace() {
  const hydrated = useHydrated();
  const [mode, setMode] = useState<(typeof modes)[number]>("Canvas");
  return (
    <div className="workspace" id="workspace">
      <div className="windowbar">
        <span className="traffic">
          <i />
          <i />
          <i />
        </span>
        <span>Studio / A little more possibility</span>
        <span className="saved">
          <span /> Saved locally
        </span>
      </div>
      <div className="editor">
        <aside className="layers">
          <div className="side-title">
            Your workspace <Plus size={13} />
          </div>
          <div className="page-name">
            <Frame size={13} /> Landing page
          </div>
          <p>LAYERS</p>
          {[
            "Navigation",
            "Hero section",
            "Headline",
            "Orbit artwork",
            "Call to action",
          ].map((item, i) => (
            <div className={i === 3 ? "layer selected" : "layer"} key={item}>
              <Layers size={12} />
              {item}
            </div>
          ))}
          <div className="local-note">
            <FolderOpen size={14} /> A home for your ideas.
          </div>
        </aside>
        <div className="artboard-area">
          <span className="artboard-label">Explorations / 01</span>
          <div className="artboard">
            <div className="sample-nav">
              forma<span>Objects with intention ↗</span>
            </div>
            <div className="sample-copy">
              <span className="eyebrow">LESS, BUT BETTER.</span>
              <h2>
                Make room
                <br />
                for the unusual.
              </h2>
              <p>
                Everyday objects.
                <br />A different perspective.
              </p>
              <span className="sample-cta">
                Explore the collection <ArrowUpRight size={13} />
              </span>
            </div>
            <div className="sculpture">
              <div className="ring ring-one" />
              <div className="ring ring-two" />
              <div className="ring ring-three" />
              <div className="selection">
                <i />
                <i />
                <i />
                <i />
              </div>
              <span className="cursor">
                <MousePointer2 size={16} fill="currentColor" /> You
              </span>
            </div>
            <span className="sample-bottom">DESIGNED TO FEEL DIFFERENT.</span>
          </div>
          <div className="tools">
            {[MousePointer2, Frame, Square, Type, Hand].map((Icon, i) => (
              <span className={i === 0 ? "active-tool" : ""} key={i}>
                <Icon size={17} />
              </span>
            ))}
            <span className="tool-divider" />
            <Sparkles size={17} />
          </div>
        </div>
        <aside className="agent">
          <div className="side-title">
            <Sparkles size={14} /> Design partner <span>↗</span>
          </div>
          <div className="agent-tag">
            {mode === "Code" ? "Shared document" : "Claude / Codex"}
          </div>
          <div className="user-message">
            {mode === "Canvas"
              ? "A little more playful. Keep the layout clean."
              : mode === "Agents"
                ? "Help me refine this selected frame."
                : "Keep the canvas and my tools on the same page."}
          </div>
          <div className="agent-message">
            <span className="spark-icon">✳</span>
            <p>
              {mode === "Code"
                ? "The desktop editor, CLI, and MCP tools use the same design document."
                : mode === "Agents"
                  ? "Bring your selection and project context into a task with your installed agent."
                  : "Explore the composition, adjust the details, and make it yours."}
            </p>
          </div>
          <div className="context-chip">
            <Frame size={12} /> Hero section <Check size={12} />
          </div>
          <div className="composer">
            Your next idea…
            <span>
              <Plus size={13} />
              <ArrowRight size={15} />
            </span>
          </div>
        </aside>
      </div>
      <div className="demo-caption">
        Illustrative workspace · Explore a perspective below
      </div>
      <div className="demo-tabs" aria-label="Workspace perspectives">
        {modes.map((item) => (
          <button
            disabled={!hydrated}
            key={item}
            aria-pressed={mode === item}
            onClick={() => setMode(item)}
          >
            {item === "Canvas" ? (
              <MousePointer2 size={14} />
            ) : item === "Agents" ? (
              <Sparkles size={14} />
            ) : (
              <Code2 size={14} />
            )}
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
function Home() {
  const hydrated = useHydrated();
  const [menu, setMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const command = "cd verynize-product\nnpm install\nnpm start";
  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="header">
        <a className="brand" href="/" aria-label="Verynize home">
          <span className="brand-mark">v.</span>verynize
          <span className="alpha">LOCAL FIRST</span>
        </a>
        <button
          disabled={!hydrated}
          className="menu-toggle"
          aria-label={menu ? "Close navigation" : "Open navigation"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
        <nav className={menu ? "nav open" : "nav"} aria-label="Main navigation">
          <a href="#features" onClick={() => setMenu(false)}>
            Features
          </a>
          <Link to="/roadmap" onClick={() => setMenu(false)}>
            Roadmap
          </Link>
          <a href="#questions" onClick={() => setMenu(false)}>
            Good to know
          </a>
          <a className="nav-cta" href="#start" onClick={() => setMenu(false)}>
            Start creating <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero">
          <div className="release">
            <span /> Always free. More room for your ideas.{" "}
            <ArrowRight size={13} />
          </div>
          <h1>
            Your canvas. Your agents.
            <br />
            <span>Your next great idea.</span>
          </h1>
          <p>
            Shape your canvas, work on your code, and review the changes.
            <br className="desktop-break" /> A local macOS workspace with Claude
            and Codex close at hand.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#start">
              Make something better <ArrowUpRight size={17} />
            </a>
            <a className="text-link" href="#workspace">
              Explore the workspace <ArrowDown />
            </a>
          </div>
          <div className="platform">
            <Command size={12} /> Built for macOS <span>·</span> Your files.
            Your installed agents.
          </div>
          <Workspace />
        </section>
        <div className="belief">
          <span>LESS DISTANCE BETWEEN</span>
          <p>
            The idea in your head.<span>The thing on your canvas.</span>
          </p>
          <span className="asterisk">✳</span>
        </div>
        <section className="section" id="features">
          <div className="section-heading">
            <span className="eyebrow">A WORKSPACE THAT WORKS WITH YOU</span>
            <h2>Stay in the creative part.</h2>
            <p>
              Make the big moves. Sweat the small details.
              <br />
              Keep your tools close and your work your own.
            </p>
          </div>
          <div className="features">
            <article>
              <div className="feature-art canvas-art">
                <div className="mini-frame">
                  <span>
                    Make it
                    <br />
                    <em>your own.</em>
                  </span>
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <span className="measure">320 × 200</span>
              </div>
              <span className="feature-number">01 / THE CANVAS</span>
              <h3>Room to find your direction.</h3>
              <p>
                Start with an empty page and choose its background color. Shape
                frames, text, images, and ellipses with flexible layouts, drag
                layers into place, and undo as you explore.
              </p>
            </article>
            <article>
              <div className="feature-art agent-art">
                <div className="prompt">
                  <Sparkles size={18} />
                  <span>
                    A second pair of hands.
                    <br />
                    <strong>You keep the direction.</strong>
                  </span>
                </div>
                <div className="agent-pills">
                  <span>✳ Claude</span>
                  <span>⌘ Codex</span>
                </div>
              </div>
              <span className="feature-number">02 / YOUR AGENTS</span>
              <h3>A partner for the next move.</h3>
              <p>
                Give Claude or Codex your canvas selection, project context, and
                a chosen design style. Follow streaming output, choose an access
                level, and queue or stop tasks while you stay in control.
              </p>
            </article>
            <article>
              <div className="feature-art file-art">
                <div className="file-card">
                  <Code2 size={26} />
                  <strong>something-great</strong>
                  <span>.verynize.json</span>
                  <div>
                    <span>Canvas</span>
                    <span>CLI</span>
                    <span>MCP</span>
                  </div>
                </div>
              </div>
              <span className="feature-number">03 / YOUR WORK</span>
              <h3>Good ideas deserve a home.</h3>
              <p>
                Save .verynize.json documents locally and edit them from the
                desktop, CLI, or MCP. Export HTML, images, or PDF, with artwork
                export scales from 0.5× to 4×.
              </p>
            </article>
          </div>
        </section>
        <section className="detail-band">
          <span className="eyebrow">FROM FIRST FRAME TO FINER DETAILS</span>
          <h2>
            Small tools.
            <br />A lot of possibility.
          </h2>
          <div className="capabilities">
            {[
              [
                "Details that stay consistent",
                "Pair flexible layouts with color, dimension, number, and font variables. Bind properties and export your tokens as CSS.",
              ],
              [
                "A little more dimension",
                "Add gradients, advanced masks, shadows, and independently authored WebGL shaders. Apply Shader mode beneath a layer’s content.",
              ],
              [
                "A workspace for the code, too",
                "Switch from Design to Code for repository chats, file editing, and project memory. New repository chats get their own Git worktree when the repository has a commit.",
              ],
              [
                "Review before you commit",
                "Inspect changed files and diffs, then commit or push from the Changes panel. Start an agent task from a selected design to carry the idea into code.",
              ],
              [
                "Your running app, in view",
                "Start a local dev server and move between Navigate, Edit, and Capture modes. Stage text edits, capture supported elements into layers, and attach them to chat.",
              ],
              [
                "A direction to build on",
                "Choose from 31 named design styles and twelve styled starter briefs. Saved design preferences give your agent context to carry into the next chat.",
              ],
              [
                "Bring more into the canvas",
                "Import supported HTML and JSX with external stylesheets, or capture a URL with images and embedded fonts. Unsupported browser features are reported as limitations.",
              ],
              [
                "A bridge to your tools",
                "Connect agents to the live canvas or saved documents over MCP. Desktop shell tools can operate previews and project commands; an authenticated cloud endpoint is tested locally.",
              ],
            ].map(([title, text]) => (
              <article key={title}>
                <Plus size={18} />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="roadmap-teaser" aria-labelledby="roadmap-title">
          <div>
            <span className="eyebrow">THE ROAD AHEAD</span>
            <h2 id="roadmap-title">See what’s here. And what’s ahead.</h2>
            <p>
              Explore the canvas, code, and collaboration roadmap, with a clear
              status for every direction.
            </p>
          </div>
          <Link className="nav-cta" to="/roadmap">
            Explore the roadmap <ArrowUpRight size={15} />
          </Link>
        </section>
        <section
          className="section"
          id="always-free"
          aria-labelledby="free-heading"
        >
          <div className="section-heading">
            <span className="eyebrow">CREATIVITY HAS NO SUBSCRIPTION</span>
            <h2 id="free-heading">The app is free. Always.</h2>
            <p>
              Verynize will always be free to use.
              <br />
              Any future paid offerings will be limited to optional cloud and AI
              services.
              <br />
              Deploy to your own cloud? Verynize is still free.
            </p>
            <p>
              Original Verynize code is MIT-licensed; third-party materials keep
              their own licenses. Your hosting and AI providers may charge for
              their services.
            </p>
          </div>
        </section>
        <section className="section faq" id="questions">
          <div>
            <span className="eyebrow">GOOD TO KNOW</span>
            <h2>
              A clear picture.
              <br />
              Before you jump in.
            </h2>
            <p>
              Built locally. Still growing.
              <br />
              Here’s where things stand.
            </p>
          </div>
          <div>
            {[
              [
                "Will Verynize always be free?",
                "Yes. The Verynize app will always be free. Any future paid offerings will be limited to optional cloud and AI services. You will not need a paid Verynize plan to use the app.",
              ],
              [
                "Is self-hosting free too?",
                "Yes. Deploying Verynize to your own cloud remains free, with no Verynize license or subscription fee. You only cover any infrastructure or AI usage charged by your chosen providers. The collaboration service has been tested locally; no production-hosted service is available here yet.",
              ],
              [
                "Can I use Verynize today?",
                "You can run the macOS app from the product source. Original Verynize code is MIT-licensed. An older locally signed app build was tested, but the package has not been rebuilt for all recent changes and there is no notarized public installer available here yet.",
              ],
              [
                "Do I need an AI subscription?",
                "Canvas editing works independently of an agent. Agent tasks use your installed Claude or Codex and its existing account; provider access and usage charges are managed by that provider. One real reply-only turn has passed through each integrated runtime, including event streaming and MCP tool discovery. Results on your own coding tasks still depend on the provider and the task.",
              ],
              [
                "How does the Design-to-Code workflow work?",
                "Switch to Code to work with repository chats, files, and project memory. New chats in repositories with a commit get their own Git worktree; older chats and uncommitted repositories can use the project root. Files, previews, and the agent follow the active chat. Send a canvas selection into an implementation task, then inspect diffs and commit or push from the Changes panel. This is an agent-assisted workflow, not a guaranteed design-to-source round trip. Real GitHub pull-request creation remains unverified.",
              ],
              [
                "Can I revisit a turn or ask another agent to review it?",
                "Rewind can fork a provider session at a kept turn, with a transcript fallback. Second opinion sends the latest answer and diff to the other provider for read-only review. Both controls are implemented, but neither has been exercised live from inside the app yet.",
              ],
              [
                "How do styles and saved preferences guide the agent?",
                "The composer offers 31 named styles and twelve styled starter briefs, backed by design guidance and saved preferences. Style checks cover structure, contrast, and fonts; they do not guarantee the quality of generated designs. Preference changes have approval controls in Claude, while allowed Codex chats still rely on a guidance rule that has not been live-verified.",
              ],
              [
                "Can I generate images as well as illustrations?",
                "Agent-authored SVG illustrations, configurable image-provider adapters, and smooth bitmap-to-vector tracing are implemented. Real image-provider APIs still need live-credential validation. The agent design harness itself has no image-generation tool; it uses stock photos, SVG, shaders, and gradients.",
              ],
              [
                "Can I collaborate or publish a website?",
                "Accounts, organization workspaces, room roles, shared cursors, and operation-based collaboration are implemented and tested locally. Publishing supports frozen design snapshots and versioned static apps with rollback. The collaboration service has not been deployed to production; live email, sign-in, and a separate apps domain remain unverified. Published apps are sandboxed without cookies or localStorage.",
              ],
              [
                "Can I keep working on a shared file offline?",
                "Previously opened cloud files can keep edits in a persistent outbox and send them when the desktop reconnects, including after an app restart. This was tested in Electron; the shared web implementation has not been separately exercised. Shared-image display while offline depends on the browser cache.",
              ],
              [
                "Can I bring in Figma or existing websites?",
                "Figma REST import, clipboard decoding, .fig import, and OAuth are implemented against local fixtures. Real Figma OAuth and clipboard data remain unverified; encrypted .pen files are refused. URL capture supports cross-origin images, embedded fonts, region selection, and source mapping. Shadow DOM, iframes, pseudo-elements, animation keyframes, and off-viewport content remain outside capture support.",
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <ChevronDown size={17} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="start" id="start">
          <div>
            <span className="eyebrow">YOUR NEXT IDEA STARTS HERE</span>
            <h2>
              Make space
              <br />
              for something better.
            </h2>
            <p>
              Have the Verynize workspace locally?
              <br />
              Open a terminal at its root and start creating.
            </p>
            <span className="platform">
              <Command size={13} /> macOS · Node.js 22.18+, 24.11+, or 26+
            </span>
          </div>
          <div className="terminal">
            <div>
              <span>Run the product locally</span>
              <button disabled={!hydrated} onClick={copy}>
                {copied ? "Copied!" : "Copy commands"}
              </button>
            </div>
            <pre>
              <code>{command}</code>
            </pre>
            <p role="status">
              {copied
                ? "Commands copied to clipboard."
                : "Requires the verynize-product source checkout."}
            </p>
          </div>
        </section>
      </main>
      <footer>
        <a className="brand" href="/">
          <span className="brand-mark">v.</span>verynize
        </a>
        <span>A little more possibility.</span>
        <Link to="/roadmap">
          Roadmap &amp; status <ArrowUpRight size={13} />
        </Link>
      </footer>
    </>
  );
}
function ArrowDown() {
  return <ArrowRight size={15} className="arrow-down" />;
}
