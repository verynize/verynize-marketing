import { test, expect } from "@playwright/test";
test("SSR includes meaningful content and product boundaries", async ({
  request,
}) => {
  const response = await request.get("/");
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  expect(html).toContain("Your canvas. Your agents.");
  expect(html).toContain("no notarized public installer");
  expect(html).toContain("not been deployed to production");
  expect(html).toContain(
    "New repository chats get their own Git worktree when the repository has a commit",
  );
  expect(html).toContain(
    "One real reply-only turn has passed through each integrated runtime",
  );
  expect(html).not.toContain("still awaits a real model-turn validation");
  expect(html).toContain("The app is free. Always.");
  expect(html).toContain("31 named design styles");
  expect(html).toContain("versioned static apps with rollback");
  expect(html).toContain(
    "Real Figma OAuth and clipboard data remain unverified",
  );
  expect(html).not.toContain(
    "Publishing currently means a design snapshot, not a deployed application",
  );
});
test("perspectives, FAQ, and source CTA work without browser errors", async ({
  page,
  context,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Code", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Code", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByText(
      "The desktop editor, CLI, and MCP tools use the same design document.",
    ),
  ).toBeVisible();
  await page
    .getByText("Can I collaborate or publish a website?", { exact: true })
    .click();
  await expect(
    page.getByText(/The collaboration service has not been deployed/),
  ).toBeVisible();
  await page.getByRole("link", { name: "Make something better" }).click();
  await expect(page).toHaveURL(/#start$/);
  await page.getByRole("button", { name: "Copy commands" }).click();
  await expect(page.getByRole("button", { name: "Copied!" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "cd verynize-product",
  );
  expect(errors).toEqual([]);
});
test("mobile navigation and responsive layout", async ({ page }, testInfo) => {
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
    await page.screenshot({
      path: testInfo.outputPath(`landing-${width}.png`),
      fullPage: true,
    });
    if (width === 375) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page
        .getByRole("navigation")
        .getByRole("link", { name: "Features" })
        .click();
      await expect(page).toHaveURL(/#features$/);
      await expect(
        page.getByRole("button", { name: "Open navigation" }),
      ).toHaveAttribute("aria-expanded", "false");
    }
  }
});
