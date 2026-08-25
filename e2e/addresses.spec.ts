import { expect, test } from "@playwright/test";

const BSC = "0x8F452a1fdd388A45e1080992eFF051b4dd9048d2";
const TERRA = "terra16wtml2q66g82fdkx66tap0qjkahqwp4lwq3ngtygacg5q0kzycgqvhpax3";
const MEGA = "0xfBAa45A537cF07dC768c469FfaC4e88208B0098D";

test("shows checksummed official addresses", async ({ page }) => {
  await page.goto("/#token");
  await expect(page.locator("#token")).toContainText(BSC);
  await expect(page.locator("#token")).toContainText(TERRA);
  await expect(page.locator("#token")).toContainText(MEGA);
  await expect(page.locator("#token").getByRole("button", { name: /copy address/i })).toHaveCount(3);
});
