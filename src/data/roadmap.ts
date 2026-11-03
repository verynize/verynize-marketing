// Evidence: verynize-product/docs/implementation-status.md, updated 2026-10-31; reviewed 2026-11-01 at product v0.17.0 (e14b81b).
// Later acceptance sections and source checks supersede older status entries.
// Exploring means a parity direction, not an approved delivery schedule.
export const statuses = {
  available: {
    label: "Available locally",
    description: "Implemented and exercised within the scope described.",
  },
  partial: {
    label: "Partial",
    description:
      "A working foundation with important limits or validation still pending.",
  },
  exploring: {
    label: "Exploring",
    description:
      "A parity direction. Not available, scheduled, or promised for a release.",
  },
} as const;
export type RoadmapStatus = keyof typeof statuses;
interface RoadmapItem {
  title: string;
  status: RoadmapStatus;
  description: string;
}
interface RoadmapGroup {
  id: string;
  title: string;
  intro: string;
  items: RoadmapItem[];
}
export const roadmap: RoadmapGroup[] = [
  {
    id: "canvas",
    title: "More ways to shape an idea.",
    intro: "A precise canvas, with space for experimentation.",
    items: [
      {
        title: "Flexible layouts",
        status: "available",
        description:
          "Arrange frames with free, flex, grid, block, and inline layouts, plus Fixed, Hug, and Fill sizing.",
      },
      {
        title: "Text with character",
        status: "available",
        description:
          "Style typography and individual text ranges inside a layer.",
      },
      {
        title: "Gradients and masks",
        status: "partial",
        description:
          "Build gradients, image/custom masks, and advanced mask treatments. On-canvas mask handles and editable mask stops remain gaps.",
      },
      {
        title: "Animated shader backgrounds",
        status: "available",
        description:
          "Use independently authored WebGL presets, including a 13-preset family with expanded parameters. Shader fills can sit beneath layer content and export with it; picker previews remain static.",
      },
      {
        title: "Scale and stacking",
        status: "available",
        description:
          "Resize proportionally and control stacking, opacity, and clipping. Flip layers horizontally or vertically and rotate them in 90° steps.",
      },
      {
        title: "Guides and measurements",
        status: "available",
        description:
          "Position layers with smart guides, equal-gap snapping, alignment, and distance indicators.",
      },
      {
        title: "Design variables",
        status: "available",
        description:
          "Create color, dimension, number, font-family, and font-weight variables with bindings and CSS export. Folder-aware MCP tools support typed variables; direct agent edits to bound properties can still be reset by binding sync.",
      },
      {
        title: "Layer organization",
        status: "available",
        description:
          "Drag layers to reorder them or move them into and out of frames, including multiple selections. Locked layers are respected and each move is one undo step.",
      },
      {
        title: "Color, type, and artwork export",
        status: "available",
        description:
          "Pick colors with alpha, HEX, RGB, HSL, or OKLCH controls and an eyedropper. Choose installed or Fontsource fonts, then export artwork at 0.5×–4× or as PDF through a native save dialog.",
      },
      {
        title: "Figma imports",
        status: "partial",
        description:
          "REST import, clipboard paste, .fig decoding, and encrypted PKCE OAuth are implemented against local fixtures. Real Figma credentials and clipboard payloads remain unverified; encrypted .pen files are deliberately refused.",
      },
      {
        title: "Illustrations and bitmap tracing",
        status: "partial",
        description:
          "Generate agent-authored SVG, connect configurable image providers, and trace bitmaps into smooth Bézier paths. Provider APIs have fixture coverage but no live-credential validation; harness asset generation does not invoke image models.",
      },
      {
        title: "Point and curve editing",
        status: "exploring",
        description:
          "Direct manipulation of vector points and Bézier handles is not currently available.",
      },
    ],
  },
  {
    id: "code",
    title: "Keep the real project close.",
    intro: "Move between the canvas, your files, and a running app.",
    items: [
      {
        title: "Project-wide search and reusable parts",
        status: "available",
        description:
          "Search project text with ripgrep, import template packs, reuse shared components, and move files while preserving workspace history. Public discovery and arbitrary live code components are separate future directions.",
      },
      {
        title: "Design and Code workspaces",
        status: "available",
        description:
          "Switch from the canvas to a full-window Code workspace with repository chats, All/Changed file trees, a file editor, project memory, and a dev-server preview. The active project follows the selected chat.",
      },
      {
        title: "Review and commit changes",
        status: "partial",
        description:
          "Inspect file diffs, confirm discards, commit changes, and push without force from the Changes panel. Local Git workflows are tested; GitHub pull-request creation uses a test stub and is not live-verified.",
      },
      {
        title: "Design and code exchange",
        status: "partial",
        description:
          "Import HTML and JSX with external stylesheets, cascade, and CSS variables. Supported document round trips have schema coverage. Scripts are not executed; pseudo-elements, floats, relative offsets, and some backgrounds produce warnings.",
      },
      {
        title: "Capture into editable layers",
        status: "partial",
        description:
          "Capture supported remote pages or local apps, select a region, and retain embedded fonts, images, and source mapping. Shadow DOM, iframes, pseudo-elements, keyframes, and off-viewport content are not captured; interaction states remain metadata.",
      },
      {
        title: "Local app preview",
        status: "available",
        description:
          "Detect and start npm, pnpm, Yarn, Bun, or plain HTML projects. Navigate, stage text edits, capture elements, and open an expanded preview tab. Responsive presets and setup/error/paused states are exercised; the embedded terminal is read-only.",
      },
      {
        title: "Git worktrees",
        status: "available",
        description:
          "New chats in repositories with a commit get their own Git worktree and Verynize branch. Older chats and repositories without a commit can use the project root. Files, diffs, previews, and the agent follow the active chat.",
      },
      {
        title: "Icons on the canvas",
        status: "partial",
        description:
          "Authored canvas icons and icon tools are available. A complete library for organizing, swapping, and reusing icon collections is not established.",
      },
      {
        title: "Live code components",
        status: "exploring",
        description:
          "Using arbitrary application components directly as live canvas elements is a future direction.",
      },
    ],
  },
  {
    id: "together",
    title: "Bring your tools. Keep your context.",
    intro: "Connect agents and people while keeping control of your work.",
    items: [
      {
        title: "Run the cloud on your own infrastructure",
        status: "partial",
        description:
          "Cloudflare, VPS/Docker with Node and SQLite, and Vercel with Redis/libSQL adapters share backend scenarios. Deployment paths are implemented; production infrastructure remains unverified. Self-hosting has no Verynize license fee.",
      },
      {
        title: "MCP for cloud rooms",
        status: "partial",
        description:
          "A session-authenticated hosted MCP endpoint reads and edits account rooms without an editor open. Its 31-tool subset is locally tested, with role checks; OAuth, desktop tools, and production deployment are not available.",
      },
      {
        title: "Shared room image storage",
        status: "partial",
        description:
          "Room images are deduplicated and uploaded through signed URLs, with raster-export embedding. Tested with local R2 emulation, not a real bucket; image URLs are not revoked with membership changes and SVG/MCP image embedding has gaps.",
      },
      {
        title: "Reopen cloud files and work offline",
        status: "partial",
        description:
          "Previously opened rooms can be edited offline and replay unacknowledged operations after reconnect or restart. Desktop flows are exercised; the shared web implementation has only been exercised in Electron, and images may depend on cache.",
      },
      {
        title: "Accounts and organization workspaces",
        status: "partial",
        description:
          "Email sign-in, verification/reset, workspace creation, invitations, and roles connect desktop and cloud files. Local D1/workerd tests cover the flows; real email, live D1, production sign-in, and device passkeys remain unverified.",
      },
      {
        title: "Tools, context, and usage at a glance",
        status: "partial",
        description:
          "Composer indicators show design files, runtime tool status, provider limits, context, and generated-layer activity without an AI-layer quota. Claude live tool status and detailed context categories have unit-test coverage only.",
      },
      {
        title: "Remember your design preferences",
        status: "partial",
        description:
          "Saved preferences accompany each chat, with limits shown in Settings. Claude uses per-call approval; Codex write gating in allowed access modes relies on persona instructions and has not been live-verified.",
      },
      {
        title: "Guided design styles",
        status: "available",
        description:
          "Choose from 31 named style guides and twelve styled starter briefs. The harness includes 12 design skills and structured fundamentals; checks cover contracts, contrast, and fonts, not a judged guarantee of design quality.",
      },
      {
        title: "Claude and Codex alongside your work",
        status: "partial",
        description:
          "Both integrated runtimes passed a real smoke-test turn. Named provider accounts, tool permissions, and per-chat autonomy controls are implemented; real browser sign-in and account plan limits remain unverified.",
      },
      {
        title: "Live and headless MCP",
        status: "available",
        description:
          "The current catalog contains 55 MCP tools, including 16 desktop-only shell tools. Design tools edit the live canvas with undo or saved documents headlessly; screenshots and desktop shell actions require the running app.",
      },
      {
        title: "Desktop tools for your agents",
        status: "partial",
        description:
          "Sixteen desktop-only tools cover preview setup, dev servers, interaction and capture, terminal commands, and editor actions. Execution follows approval/access controls. Codex main threads still require approval, and a preview-click test is known to be flaky.",
      },
      {
        title: "Rewind and second opinions",
        status: "partial",
        description:
          "Rewind can fork a provider session at a kept turn, with a transcript fallback. A second opinion sends the latest answer and diff to the other provider read-only. Neither flow has been run live from inside the app.",
      },
      {
        title: "Shared rooms and presence",
        status: "partial",
        description:
          "Shared rooms support presence, server-sequenced operations, reconnect, and collaborator-safe undo. Local clients exercise these flows; merging is not peer-to-peer CRDT, and production infrastructure is unverified.",
      },
      {
        title: "Share a running preview",
        status: "partial",
        description:
          "Build and publish static apps with version history, rollback, and unpublish. Locally exercised apps run sandboxed without cookies or localStorage; a separate apps domain and production publishing remain unverified.",
      },
      {
        title: "Agents in the cloud",
        status: "exploring",
        description:
          "Agents continuing remotely after your computer goes offline are a future direction, not an available service.",
      },
      {
        title: "Creator profiles",
        status: "partial",
        description:
          "Public profile pages can list published designs and static apps. Account/profile flows are tested locally; production sign-in and real email delivery remain unverified.",
      },
      {
        title: "Private files and public snapshots",
        status: "partial",
        description:
          "Keep room files private or publish frozen snapshots with access checks and revocation. Signed-in cloud files reopen connected and belong to workspaces; the service has not been deployed to production.",
      },
      {
        title: "Granular sharing permissions",
        status: "partial",
        description:
          "Owner, editor, commenter, and viewer roles, invitations, token rotation, and recovery are implemented. Organization role changes reach live rooms in local tests; production identity flows remain unverified.",
      },
      {
        title: "Feedback on the canvas",
        status: "partial",
        description:
          "Room comments and live feedback updates are implemented and covered by local desktop/cloud tests. Production collaboration has not been validated.",
      },
      {
        title: "Find designs by describing them",
        status: "exploring",
        description:
          "File, page, layer, and global project text search are implemented. Finding designs through natural-language meaning remains a future direction.",
      },
      {
        title: "A community of starting points",
        status: "exploring",
        description:
          "A local template gallery accepts JSON/ZIP packs and a shared component library supports reuse. A public creator marketplace remains a future direction.",
      },
    ],
  },
];
