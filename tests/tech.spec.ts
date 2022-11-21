import { test, expect } from "@playwright/test";

test("listing the posts", async ({ page }) => {
  await page.goto("/tech");

  const post = page.getByRole("link", { name: "Setting a Request ID in SvelteKit" });

  await expect(post).toHaveAttribute("href", "/tech/2022/sveltekit-request-id");

  await post.click();

  await expect(page).toHaveURL("/tech/2022/sveltekit-request-id");
});

test("redirecting from an old post URL", async ({ request }) => {
  const response = await request.get("/2020/replace-unused-dependency", {
    maxRedirects: 0,
  });

  expect(response.status()).toBe(301);
  expect(response.headers().location).toBe("/tech/2020/replace-unused-dependency");
});
