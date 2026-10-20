import { expect, test } from "@playwright/test";

test("learn, break, fix, quiz, and retain progress", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Start learning", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/dashboard/);
  await page.getByRole("link", { name: "Explore path" }).click();
  await page.getByRole("link", { name: /Duplicate Payment Callback/ }).click();
  await page
    .getByRole("button", {
      name: "A unique key checked inside the same transaction",
    })
    .click();
  await page.getByRole("button", { name: "Check answer" }).click();
  await expect(page.getByText("Checkpoint complete")).toBeVisible();
  await page.getByRole("link", { name: "Launch sandbox" }).first().click();
  await page
    .getByRole("button", { name: "Run simulation", exact: true })
    .click();
  await expect(page.getByText("Duplicate payment detected")).toBeVisible();
  await expect(page.getByTestId("ledger-count")).toHaveText("2");
  await page.getByRole("button", { name: "Idempotent", exact: true }).click();
  await page
    .getByRole("button", { name: "Run simulation", exact: true })
    .click();
  await expect(page.getByText("One payment. One effect.")).toBeVisible();
  await expect(page.getByTestId("ledger-count")).toHaveText("1");
  await expect(page.getByTestId("outbox-count")).toHaveText("1");
  await page
    .getByRole("button", {
      name: "The unique key and both writes commit together",
    })
    .click();
  await page.getByRole("button", { name: "Check answer" }).click();
  await expect(page.getByText("Lab complete")).toBeVisible();
  await page.reload();
  await expect(page.getByText("Lab complete")).toBeVisible();
  await page.goto("/dashboard");
  await expect(page.getByText("Payment lab completed")).toBeVisible();
});

test("step, inspect history, reset, replay and recover from failure", async ({
  page,
}) => {
  await page.goto("/sandbox/duplicate-payment");
  await page.getByRole("button", { name: "Step forward" }).click();
  await expect(page.getByText("1 / 8 events")).toBeVisible();
  await page.getByRole("button", { name: "Reset experiment" }).click();
  await expect(page.getByText("0 / 8 events")).toBeVisible();
  await page.getByRole("button", { name: "Idempotent", exact: true }).click();
  await page.getByLabel("Fail callback A before commit").check();
  await page
    .getByRole("button", { name: "Run simulation", exact: true })
    .click();
  await expect(page.getByText("One payment. One effect.")).toBeVisible();
  await page
    .getByRole("button", { name: "Inspect step 3: Stage ledger + outbox" })
    .click();
  await expect(page.getByTestId("ledger-count")).toHaveText("0");
  await expect(page.getByTestId("outbox-count")).toHaveText("0");
  await expect(page.getByText("One payment. One effect.")).toBeHidden();
  await page.getByRole("button", { name: "Return to current state" }).click();
  await expect(page.getByTestId("ledger-count")).toHaveText("1");
  await page.getByRole("button", { name: "Replay execution" }).click();
  await expect(page.getByText("One payment. One effect.")).toBeVisible();
});

test("preview, challenges, and responsive pages render without runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.getByRole("button", { name: "Try it live" }).click();
  await expect(
    page.getByText("One payment credited twice. Now try idempotent mode."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Idempotent", exact: true }).click();
  await page.getByRole("button", { name: "Try it live" }).click();
  await expect(page.getByText("Duplicate safely skipped.")).toBeVisible();
  await page.screenshot({
    path: "output/playwright/landing-desktop.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.goto("/challenges");
  const checkpoint = page
    .getByRole("region", { name: "Knowledge checkpoint" })
    .first();
  await checkpoint
    .getByRole("button", { name: "A slow network connection" })
    .click();
  await checkpoint.getByRole("button", { name: "Check answer" }).click();
  await expect(
    checkpoint.getByText("Almost. Take another look."),
  ).toBeVisible();
  await page.goto("/dashboard");
  await page.screenshot({
    path: "output/playwright/dashboard-desktop.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.goto("/sandbox/duplicate-payment");
  await page.getByRole("button", { name: "Idempotent", exact: true }).click();
  await page
    .getByRole("button", { name: "Run simulation", exact: true })
    .click();
  await page.screenshot({
    path: "output/playwright/sandbox-desktop.png",
    fullPage: true,
    animations: "disabled",
  });
  for (const width of [390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    for (const path of [
      "/",
      "/dashboard",
      "/learn/database-transactions",
      "/lessons/duplicate-payment",
      "/challenges",
      "/sandbox/duplicate-payment",
    ]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${path} overflows at ${width}px`,
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await page.screenshot({
    path: "output/playwright/sandbox-mobile-dark.png",
    fullPage: true,
    animations: "disabled",
  });
  expect(errors).toEqual([]);
});

test("dashboard continues into the lab and recognizes a completed path", async ({
  page,
}) => {
  await page.goto("/dashboard");
  await page.evaluate(() =>
    localStorage.setItem(
      "taalmo.progress.v1",
      JSON.stringify({
        completed: ["lost-update", "duplicate-payment", "deadlock"],
        activity: [],
        experiments: [],
      }),
    ),
  );
  await page.reload();
  await expect(
    page.getByRole("link", { name: "Continue to the lab" }),
  ).toHaveAttribute("href", "/sandbox/duplicate-payment");
  await page.evaluate(() =>
    localStorage.setItem(
      "taalmo.progress.v1",
      JSON.stringify({
        completed: [
          "lost-update",
          "duplicate-payment",
          "deadlock",
          "lab-payment",
          "lab-lost-update",
          "lab-deadlock",
        ],
        activity: [],
        experiments: ["unsafe", "protected"],
      }),
    ),
  );
  await page.reload();
  await expect(
    page.getByText("You’ve completed your first path."),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Revisit the sandbox" }),
  ).toHaveAttribute("href", "/sandbox/duplicate-payment");
});

test("blocked local storage reports progress failure without crashing the simulator", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("Storage is disabled", "QuotaExceededError");
    };
  });
  await page.goto("/sandbox/duplicate-payment");
  await page
    .getByRole("button", { name: "Run simulation", exact: true })
    .click();
  await expect(page.getByText("Duplicate payment detected")).toBeVisible();
  await expect(
    page
      .getByRole("alert")
      .filter({ hasText: "Your browser could not save this experiment." }),
  ).toBeVisible();
});

test("mobile navigation, theme, and introductory lesson state", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("link", { name: "Learn", exact: true }).click();
  await page.getByRole("link", { name: "Explore path" }).click();
  await page.getByRole("link", { name: /Deadlock/ }).click();
  await expect(
    page.getByRole("link", { name: "Launch sandbox" }).first(),
  ).toHaveAttribute("href", "/sandbox/deadlock");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
