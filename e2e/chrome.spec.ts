import { expect, test } from "@playwright/test";

const BSC = "0x8F452a1fdd388A45e1080992eFF051b4dd9048d2";

test("copies the BSC constant and footer Token scrolls", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/#token");
  await expect(page.locator("#token").getByRole("heading", { name: "Token addresses & markets" })).toBeVisible();
  await page.locator("#token").getByRole("button", { name: /copy address/i }).first().click();
  await expect(page.locator("#token").getByRole("button", { name: /^copied$/i })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(BSC);

  await page.goto("/");
  await page.locator("#site-footer").getByRole("link", { name: "Token" }).click();
  await expect(page.locator("#token")).toBeInViewport();
});
