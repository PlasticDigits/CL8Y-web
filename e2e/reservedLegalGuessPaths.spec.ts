import { expect, test } from "@playwright/test";

const PRODUCT_HOME_TITLE = "CL8Y — Bridge, DEX, and utility token";

const RESERVED_SAMPLES = [
  "/privacy",
  "/cookies",
  "/opt-out",
  "/PRIVACY",
  "/privacy-policy",
  "/%70rivacy",
  "/privacy/%2e%2e/privacy",
];

test.describe("reserved legal-guess paths (GitLab #12)", () => {
  for (const path of RESERVED_SAMPLES) {
    test(`GET ${path} is not the marketing homepage`, async ({ request, page }) => {
      const response = await request.get(path);
      expect(response.status()).toBe(404);
      const body = await response.text();
      expect(body).not.toContain(PRODUCT_HOME_TITLE);
      expect(body).not.toContain("og:title");

      await page.goto(path);
      await expect(page.getByRole("heading", { name: /open bridge|products|utility/i })).toHaveCount(0);
      await expect(page).toHaveTitle(/not found/i);
      await expect(page.locator('meta[property="og:title"]')).toHaveCount(0);
    });
  }

  test("product routes stay reachable", async ({ request, page }) => {
    expect((await request.get("/")).status()).toBe(200);
    await page.goto("/");
    await expect(page).toHaveTitle(PRODUCT_HOME_TITLE);

    expect((await request.get("/blog")).status()).toBe(200);
    await page.goto("/security");
    await expect(page).toHaveURL(/\/#trust$/);
  });

  test("a non-reserved prefix stays on the marketing SPA", async ({ request }) => {
    const response = await request.get("/privacy-not-a-policy");
    expect(response.status()).toBe(200);
  });

  test("POST /privacy does not return the marketing shell", async ({ request }) => {
    const response = await request.post("/privacy", { maxRedirects: 0 });
    expect([404, 405]).toContain(response.status());
    expect(await response.text()).not.toContain(PRODUCT_HOME_TITLE);
  });

  test("query on reserved path does not redirect off-origin", async ({ request }) => {
    const response = await request.get("/privacy?next=https://evil.example", {
      maxRedirects: 0,
    });
    expect(response.status()).toBe(404);
    const location = response.headers()["location"];
    expect(location ?? "").not.toMatch(/evil\.example/);
  });
});
