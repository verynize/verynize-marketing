import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { architectures, latestDesktopRelease, productRepository, releasesApi, type DesktopRelease } from "../lib/desktop-releases";

export const Route = createFileRoute("/download")({
  head: () => ({ meta: [
    { title: "Download Verynize ALPHA for macOS" },
    { name: "description", content: "Download the latest published Verynize macOS ALPHA for Apple silicon or Intel. Installation notes, release notes, and checksums." },
  ] }),
  component: DownloadPage,
});

function DownloadPage() {
  const [state, setState] = useState<{ status: "loading" | "ready" | "error"; release: DesktopRelease | null }>({ status: "loading", release: null });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 12000);
    setState({ status: "loading", release: null });
    fetch(releasesApi, { headers: { Accept: "application/vnd.github+json" }, signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Release lookup failed");
        return latestDesktopRelease(await response.json());
      })
      .then((release) => { if (active) setState({ status: "ready", release }); })
      .catch(() => { if (active) setState({ status: "error", release: null }); })
      .finally(() => clearTimeout(timeout));
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, [attempt]);
  const release = state.release;
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className="header roadmap-header">
      <Link className="brand" to="/" aria-label="Verynize home"><span className="brand-mark">v.</span>verynize <span className="alpha">ALPHA</span></Link>
      <nav className="roadmap-nav" aria-label="Main navigation">
        <Link to="/">Overview</Link><Link to="/roadmap">Roadmap</Link><Link to="/download" aria-current="page">Download</Link>
      </nav>
    </header>
    <main id="main" className="roadmap-main download-main">
      <section className="roadmap-hero">
        <span className="eyebrow">EARLY IDEAS. REAL POSSIBILITIES.</span>
        <h1>Your next idea.<br /><span>Now on your Mac.</span></h1>
        <p>Try the Verynize ALPHA. Free to use, still taking shape.<br />Choose the build for your Mac in Apple menu → About This Mac.</p>
      </section>
      <div className="download-status" role="status">
        {state.status === "loading" ? "Checking published ALPHA builds…" : state.status === "error" ? "We couldn’t check downloads right now. GitHub may be unavailable or rate-limited." : release ? `Version ${release.version} · ${release.tag}` : "No downloadable ALPHA is published yet. Check GitHub releases or run from source below."}
        {state.status === "error" && <button onClick={() => setAttempt((value) => value + 1)}>Try again</button>}
      </div>
      <section className="download-grid" aria-label="macOS downloads">
        {architectures.map(({ id, name, detail }) => {
          const download = release?.downloads[id];
          return <article className="roadmap-card download-card" key={id}>
            <span className="eyebrow">macOS · {id}</span><h2>{name}</h2><p>{detail}</p>
            {download ? <>
              <a className="button primary" href={download.url}><Download size={16} />Download for {name}</a>
              <p className="download-meta">ZIP · {Math.ceil(download.size / 1048576)} MB · <a href={download.checksum}>SHA-256 checksum</a></p>
            </> : <p className="download-unavailable">{state.status === "loading" ? "Checking availability…" : "Build not available"}</p>}
          </article>;
        })}
      </section>
      <div className="download-links">
        <a href={release?.notes ?? `${productRepository}/releases`}>{release ? "Release notes" : "Check GitHub releases"} <ArrowUpRight size={14} /></a>
        <a href={`${productRepository}/issues`}>Report an issue <ArrowUpRight size={14} /></a>
      </div>
      <section className="download-help" aria-labelledby="install-heading">
        <h2 id="install-heading">A few things before you start.</h2>
        <ol>
          <li>Download the ZIP for your Mac, unzip it, and move Verynize.app to Applications.</li>
          <li>These ALPHA builds are locally signed, not Apple-notarized. macOS may block the first launch. If you trust this download, use System Settings → Privacy &amp; Security → Open Anyway after trying to open the app.</li>
          <li>Updates are manual: quit Verynize, download the next ALPHA, then replace the app in Applications. Keep a backup of your design files.</li>
        </ol>
        <p>Use ALPHA for experiments and save important work to a local .verynize.json file. A new cloud file created while signed in and offline can be lost on reload; wait for cloud saves to finish before closing the app.</p>
        <p>Canvas editing does not need an AI account. Local agent features require Claude or Codex installed and connected. Windows and Linux downloads are not available.</p>
        <p>Prefer the source? <a href={`${productRepository}#readme`}>Follow the product setup instructions <ArrowUpRight size={13} /></a>.</p>
      </section>
    </main>
    <footer><Link className="brand" to="/"><span className="brand-mark">v.</span>verynize</Link><span>A little more possibility.</span><Link to="/roadmap">Roadmap &amp; status <ArrowUpRight size={13} /></Link></footer>
  </>;
}
