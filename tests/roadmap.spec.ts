import { test, expect } from "@playwright/test";

test("roadmap is server-rendered with honest status and free-app commitment", async ({
  request,
}) => {
  const response = await request.get("/roadmap");
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain("Roadmap — Verynize");
  expect(html).toContain("The app stays free. Always.");
  expect(html).toContain("no committed delivery dates");
  expect(html).toContain("https://wonder.design/roadmap");
  expect(html).toContain(
    "Real Figma credentials and clipboard payloads remain unverified",
  );
  expect(html).toContain("Design and Code workspaces");
  expect(html).toContain("Rewind and second opinions");
  expect(html).toContain(
    "direct agent edits to bound properties can still be reset by binding sync",
  );
  expect(html).not.toContain("still needs a real model turn");
});

test("homepage navigation, status filters, and return navigation work", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.getByRole("link", { name: "Explore the roadmap" }).click();
  await expect(page).toHaveURL(/\/roadmap$/);
  await expect(page).toHaveTitle("Roadmap — Verynize");
  await expect(page.locator(".roadmap-card")).toHaveCount(42);
  await page
    .getByRole("button", { name: "Available locally", exact: true })
    .click();
  await expect(page.locator(".roadmap-card")).toHaveCount(14);
  await expect(
    page.getByRole("heading", { name: "Figma imports" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Partial", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Figma imports" }),
  ).toBeVisible();
  await expect(page.locator(".roadmap-card .status-available")).toHaveCount(0);
  await page.getByRole("button", { name: "Exploring", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Point and curve editing" }),
  ).toBeVisible();
  await expect(page.locator(".roadmap-card .status-partial")).toHaveCount(0);
  await page.getByRole("button", { name: "All directions" }).click();
  await expect(page.locator(".roadmap-card")).toHaveCount(42);
  await page.getByRole("link", { name: "Back to the workspace" }).click();
  await expect(page).toHaveURL("/");
  expect(errors).toEqual([]);
});

test("roadmap fits mobile, tablet, and desktop with usable links", async ({
  page,
}, testInfo) => {
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/roadmap");
    await expect(
      page.getByRole("button", { name: "All directions" }),
    ).toBeEnabled();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    await page.screenshot({
      path: testInfo.outputPath(`roadmap-${width}.png`),
      fullPage: true,
    });
  }
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Roadmap", exact: true })
    .click();
  await expect(page).toHaveURL(/\/roadmap$/);
  await page.getByRole("link", { name: "Start creating", exact: true }).click();
  await expect(page).toHaveURL(/\/#start$/);
});
