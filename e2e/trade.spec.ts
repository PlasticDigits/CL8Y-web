import { expect, test } from "@playwright/test";

test("lists CL8Y DEX first and no CEX", async ({ page }) => {
  await page.goto("/#token");
  const html = await page.locator("#token").innerHTML();
  expect(html).toContain("https://dex.cl8y.com");
  expect(html).not.toMatch(/ascendex|coinbase|more exchanges/i);
  await expect(page.locator("#token").getByRole("heading", { name: "Trade on DEX" })).toBeVisible();
});
