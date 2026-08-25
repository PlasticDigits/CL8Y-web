import { expect, test } from "@playwright/test";

test("keeps listings visually separate from trade", async ({ page }) => {
  await page.goto("/#token");
  await expect(page.locator("#token").getByRole("heading", { name: "Listings" })).toBeVisible();
  await expect(page.locator("#token").getByText("These are not places to trade.")).toBeVisible();
});
