import { test, expect } from "@playwright/test";
import { latestDesktopRelease, productRepository, releasesApi } from "../src/lib/desktop-releases";

function release(version = "0.18.0", sequence = 1, published = "2026-11-08T12:00:00Z") {
  const tag = `desktop-v${version}-alpha.${sequence}`;
  return {
    tag_name: tag, draft: false, prerelease: true, published_at: published,
    assets: ["arm64", "x64"].flatMap((arch) => [".zip", ".zip.sha256"].map((suffix) => {
      const name = `Verynize-${version}-macos-${arch}${suffix}`;
      return { name, state: "uploaded", size: 123456, browser_download_url: `${productRepository}/releases/download/${tag}/${name}` };
    })),
  };
}

test("release selection rejects drafts, stable tags and incomplete or untrusted assets", () => {
  const old = release();
  const newest = release("0.19.0", 2, "2026-11-09T12:00:00Z");
  expect(latestDesktopRelease([old, newest])?.version).toBe("0.19.0");
  expect(latestDesktopRelease([{ ...newest, draft: true }, old])?.version).toBe("0.18.0");
  expect(latestDesktopRelease([{ ...newest, prerelease: false }])).toBeNull();
  expect(latestDesktopRelease([{ ...newest, tag_name: "v0.19.0" }])).toBeNull();
  expect(latestDesktopRelease([{ ...newest, tag_name: "desktop-v0.19.0-alpha.0" }])).toBeNull();
  expect(latestDesktopRelease([{ ...newest, assets: [newest.assets[0]] }])).toBeNull();
  expect(latestDesktopRelease([{ ...newest, assets: newest.assets.map((asset) => ({ ...asset, browser_download_url: "https://example.com/download.zip" })) }])).toBeNull();
});

test("download page has SSR installation notes and real architecture links", async ({ page, request }) => {
  const response = await request.get("/download");
  expect(response.ok()).toBeTruthy();
  expect(await response.text()).toContain("not Apple-notarized");
  await page.route(releasesApi, (route) => route.fulfill({ json: [release()] }));
  await page.goto("/download");
  await expect(page.getByRole("link", { name: "Download for Apple silicon" })).toHaveAttribute("href", release().assets[0].browser_download_url);
  await expect(page.getByRole("link", { name: "Download for Intel" })).toHaveAttribute("href", release().assets[2].browser_download_url);
  await expect(page.getByRole("link", { name: "SHA-256 checksum" })).toHaveCount(2);
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  }
});

test("no release and network errors never expose speculative downloads", async ({ page }) => {
  await page.route(releasesApi, (route) => route.fulfill({ json: [] }));
  await page.goto("/download");
  await expect(page.getByRole("status")).toContainText("No downloadable ALPHA is published yet");
  await expect(page.getByRole("link", { name: /^Download for/ })).toHaveCount(0);
  await page.unroute(releasesApi);
  await page.route(releasesApi, (route) => route.fulfill({ status: 403, json: { message: "rate limited" } }));
  await page.reload();
  await expect(page.getByRole("status")).toContainText("couldn’t check downloads");
  await expect(page.getByRole("link", { name: /^Download for/ })).toHaveCount(0);
  await page.unroute(releasesApi);
  await page.route(releasesApi, (route) => route.fulfill({ json: [release()] }));
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page.getByRole("link", { name: "Download for Apple silicon" })).toBeVisible();
});
