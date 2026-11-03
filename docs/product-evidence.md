# Product evidence for marketing

Reviewed **2026-11-01** against Verynize product **0.17.0**, commit
`e14b81b79aefe7cc94bfb34128670f123d6caba5`.

This is a source and documentation audit, not a fresh run of the product test suite.
Marketing build and browser tests validate the website, not product capabilities.
Uncommitted product changes and sibling experimental checkouts are outside this snapshot.

## Sources and precedence

- [Implementation acceptance status](../../verynize-product/docs/implementation-status.md), updated 2026-10-31: exercised behavior and remaining boundaries, including the later **Gaps closed on 30 October** and **Remaining gaps and live-credential boundaries** sections.
- [Product README](../../verynize-product/README.md): setup and distribution context, with older feature descriptions that must not override newer evidence.
- [Product version](../../verynize-product/package.json): current source version, not proof that the older packaged-app smoke test was repeated for this release.
- [Preview reference](../../verynize-product/docs/wonder-preview-reference.md) and the preview audit linked from acceptance notes: bounded paired UI evidence, not proof of every preview or publishing operation.
- [Deployment guide](../../verynize-product/docs/deployment.md), [Node self-hosting](../../verynize-product/docs/self-hosting.md), and [runtime adapters](../../verynize-product/cloud/platform/README.md): implemented hosting options and their validation boundaries.
- [Original parity ledger](../../verynize-product/docs/wonder-roadmap.md): coverage reference only; vendor declarations do not establish Verynize capability or full parity.

When sources conflict, prefer current implementation and the most recent specific acceptance/audit section. Retain live-account and production boundaries. Test source is not evidence that a test was executed in this marketing update.

## Claims and boundaries

| Area | Supported message | Evidence and qualification |
| --- | --- | --- |
| Design and Code workspaces | Canvas, repository chats, files, changes, preview, and worktrees share project context. | Acceptance notes; `tests/code-workspace.cjs`, `tests/repositories.cjs`. New repository chats get isolated worktrees when a commit exists; older chats and uncommitted repositories can use the project root. |
| Local agents | Claude SDK and Codex app-server each completed a real reply-only smoke turn with streaming, usage, and MCP discovery. | `tests/agent-runtime-live.cjs` and acceptance notes. General code/design success is task/provider dependent. Rewind and read-only second opinion are implemented but not live-tested inside the app; rewind does not revert files. |
| Agent settings | Named provider accounts, tool permissions, MCP settings, autonomy controls, and composer indicators are implemented. | Oct30 agents/workspace audit and Oct31 indicators section. Browser login, real account plan limits, Claude live MCP status, and context breakdown retain fixture/unit-test boundaries. |
| MCP catalog | **55 tools total, including 16 desktop-only shell tools.** | Direct imports of `TOOL_NAMES` from `integrations/design-tools.mjs` and source `SHELL_TOOL_NAMES` from `integrations/shell-tools.mjs`; `propose_preview` is now included. Earlier 49/15 counts are stale. Tool availability differs by runtime; screenshots and shell operations need the desktop. |
| Hosted MCP | A bearer-authenticated endpoint exposes **31 design tools** for account cloud rooms. | `cloud/mcp.js`: 55 minus 16 shell tools and 8 other unavailable tools. Local workerd validation only; no deployed endpoint or OAuth flow is advertised. Remote image-network behavior remains unverified. |
| Design guidance | **31 named styles and 12 skills** (6 primary, 6 supporting), style selection, styled starter briefs, and saved preferences guide agents. | Direct imports of the style/skill registries confirm counts; acceptance notes cite contract, contrast, font, and runtime tests. No judged design-quality evaluation. Harness asset guidance does not include an image-model tool; image providers elsewhere in the app are separate. Codex preference gating still has live-verification limits. |
| Preview | Start/stop, setup settings, device presets, Navigate/Edit/Capture modes, staged text edits, element-to-chat context, and element capture are implemented. | Oct31 paired preview audit. Terminal is read-only; unsupported inspector rows and capture differences remain. Do not infer automatic source synchronization or successful publishing from the Publish control. |
| Remote capture | Isolated URL capture supports cross-origin images, custom fonts, region selection, source mapping, and interaction-state metadata. | Oct30 capture audit supersedes the old localhost-only description. No keyframes, pseudo-elements, shadow DOM, iframes, or off-viewport capture; interaction variants have no editing UI. |
| Figma | Clipboard/.fig decoder, REST import, PKCE OAuth, and encrypted token storage are implemented. | Oct30 Figma audit. Real OAuth/data and real Figma clipboard input remain unverified; fixture coverage does not establish universal fidelity. Vendor-encrypted .pen files are refused. |
| Images and tracing | Configurable image-provider adapters, agent-authored SVG, and smooth Bézier tracing are implemented. | Oct30 capture/generation audit. Real image-provider APIs need live credentials; tracing fidelity is bounded to recorded cases. Avoid a blanket photographic-generation quality claim. |
| Canvas and inspector | Typed/bound variables, per-side borders, masks, imported monochrome SVG tint, shader fills, layer drag/reparent, and scaled artwork export are implemented. | Oct30 workflow and inspector audits; Oct31 shader-fill notes. Folder-aware MCP token support supersedes the old blanket unsupported-types warning. Bound-property agent edits can still be reverted by binding sync; mask handles/editable stops and some shader picker interactions remain gaps. SVG export uses `foreignObject`. |
| Code import/export | External stylesheets, cascade, CSS variables, and HTML/JSX/CSS import/export have schema-coverage round-trip tests. | Oct30 codec audit. This concerns supported document data, not arbitrary executable application code; scripts are not executed, and unsupported CSS is reported as warnings. |
| Git and project reuse | Changes review, confirmed discard, commit/non-force push, global search, template packs, shared components, and history-preserving moves are implemented. | Acceptance notes and Oct30 agents/workspace audit. Real GitHub PR creation remains unverified because `gh` is stubbed in relevant tests. A template gallery is not a public marketplace. |
| Accounts and workspaces | Accounts, organization invitations, roles, workspace switching, onboarding, profiles, and member settings are implemented. | Better Auth phases 0–4 and Oct30 cloud audit. Email delivery, live D1, production login, and native Touch ID/iCloud passkeys remain unverified. Do not present a live signup service. |
| Shared and offline files | Server-sequenced operations, collaborator-safe undo, persistent cloud-file records, and a restart-persistent offline outbox are implemented. | Oct30 cloud audit and `tests/cloud-files-desktop.mjs`. A room must have been opened on the device before offline editing; shared web code was exercised in Electron. Merging is not peer-to-peer CRDT. |
| Publishing | Frozen snapshots and versioned static apps with rollback are implemented. | Oct30 cloud audit supersedes the old snapshots-only claim. Apps are sandboxed without cookies/localStorage; a separate production app domain and real production publishing remain unverified. No arbitrary backend deployment is promised. |
| Shared images | Room images upload through signed URLs with content checks and per-room deduplication; raster exports inline them. | Room-assets acceptance section; local Miniflare R2/two-client tests. No real R2 bucket used. Signed image URLs are not revoked by membership removal/rotation; offline images depend on cache, and MCP screenshots/SVG export do not inline room images. |
| Self-hosting | Cloudflare, Node/VPS/Docker, and Vercel runtime paths are implemented and documented. | Deployment/runtime docs describe shared cloud scenarios: Node SQLite, Vercel Redis/libSQL, and Cloudflare services. These are deployment options, not proof of deployed production services. |
| Distribution and licensing | Run the macOS application from source; original code and documentation use MIT. | Product package, LICENSE, and third-party notices. Third-party material keeps its own licenses. Recorded packaged-app validation is older; packaging was not rerun after adding ripgrep, and no notarized public installer is advertised. |
| Free app | The application remains always free; paid offerings are limited to optional cloud and AI services; self-hosting has no Verynize license/subscription fee. | Explicit owner policy. Provider infrastructure and AI usage fees remain separate. No hosted service launch or paid plan is implied. |

## Known source conflicts

The README and early acceptance bullets still describe missing .fig/OAuth import, localhost-only capture, no image-model provider, snapshots-only publishing, no identity roles, and older codec limitations. The later October 30 closure sections supersede those claims, while the **Remaining gaps and live-credential boundaries** section narrows what can be asserted.

The old MCP counts (49 total / 15 shell) are superseded by current exports (55 / 16). The old claim that MCP cannot handle new variable types is superseded by folder-aware token tooling; it does not eliminate the separate bound-property update limitation.

A newer source version does not update older package validation automatically. Do not claim a v0.17.0 notarized download, successful production email/identity deployment, or that every product test is currently passing. The acceptance notes explicitly retain flaky capture-live-state and preview-click tests.

## Maintenance

Refresh the source SHA, version, and review date with future content updates. Keep implemented/local-fixture behavior separate from real-account validation and production availability. Preserve the original illustrative workspace labeling and always-free commitment. Changes to the marketing inventory should be driven by product evidence rather than vendor roadmap status.
