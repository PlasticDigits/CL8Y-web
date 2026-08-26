import { expect, test } from "@playwright/test";

test("header Token reaches #token", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Token" }).click();
  await expect(page.locator("#token")).toBeInViewport();
});
