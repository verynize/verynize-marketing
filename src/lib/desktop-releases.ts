export const productRepository = "https://github.com/verynize/verynize-product";
export const releasesApi = "https://api.github.com/repos/verynize/verynize-product/releases?per_page=100";
export const architectures = [
  { id: "arm64", name: "Apple silicon", detail: "Mac with an M-series chip" },
  { id: "x64", name: "Intel", detail: "Mac with an Intel processor" },
] as const;

type Download = { url: string; checksum: string; size: number };
export type DesktopRelease = {
  version: string;
  tag: string;
  notes: string;
  downloads: Partial<Record<(typeof architectures)[number]["id"], Download>>;
};
function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

// Only use uploaded artifacts from published desktop ALPHAs. Never synthesize a
// download URL: releases/latest excludes prereleases and may point at other work.
export function latestDesktopRelease(value: unknown): DesktopRelease | null {
  if (!Array.isArray(value)) throw new Error("Invalid release response");
  const releases = value.filter(record).filter((release) =>
    release.draft === false && release.prerelease === true &&
    typeof release.published_at === "string" &&
    Number.isFinite(Date.parse(release.published_at)),
  ).sort((a, b) => Date.parse(String(b.published_at)) - Date.parse(String(a.published_at)));
  for (const release of releases) {
    if (typeof release.tag_name !== "string") continue;
    const match = /^desktop-v(\d+\.\d+\.\d+)-alpha\.[1-9]\d*$/.exec(release.tag_name);
    if (!match || !Array.isArray(release.assets)) continue;
    const tag = release.tag_name;
    const version = match[1];
    const prefix = `${productRepository}/releases/download/${tag}/`;
    const assets = release.assets.filter(record);
    const asset = (name: string) => assets.find((item) =>
      item.name === name && item.state === "uploaded" &&
      typeof item.size === "number" && item.size > 0 &&
      item.browser_download_url === prefix + name,
    );
    const downloads: DesktopRelease["downloads"] = {};
    for (const { id } of architectures) {
      const name = `Verynize-${version}-macos-${id}.zip`;
      const zip = asset(name);
      const checksum = asset(`${name}.sha256`);
      if (zip && checksum) downloads[id] = {
        url: String(zip.browser_download_url),
        checksum: String(checksum.browser_download_url),
        size: Number(zip.size),
      };
    }
    if (Object.keys(downloads).length) return {
      version, tag, downloads,
      notes: `${productRepository}/releases/tag/${tag}`,
    };
  }
  return null;
}
