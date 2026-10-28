import { test, expect, type Locator, type Page } from "@playwright/test";
import foundation from "../../src/content/database/l0.json" with { type: "json" };
import queries from "../../src/content/database/l1-query.json" with { type: "json" };
import mutations from "../../src/content/database/l1-mutation.json" with { type: "json" };
import subqueries from "../../src/content/database/l2-subqueries.json" with { type: "json" };
import { translate } from "../../src/content/messages";
import type { ConceptCheck } from "../../src/content/database/types";
const content = [...foundation, ...queries, ...mutations, ...subqueries];
const path = "/learn/database-engineering";
const english = (message: string) => translate(message, "en");
async function answer(
  scope: Page | Locator,
  question: ConceptCheck,
  index = question.answer,
) {
  const quiz = scope
    .getByRole("region", { name: "Knowledge checkpoint" })
    .filter({ hasText: english(question.question) });
  await quiz
    .getByRole("button", {
      name: english(question.options[index]),
      exact: true,
    })
    .click();
  await quiz.getByRole("button", { name: "Check answer" }).click();
}

test("complete registered lessons, module and level gates, resume, and preserve mastery on retake", async ({
  page,
}) => {
  test.setTimeout(240000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(path);
  await expect(
    page
      .getByRole("heading", { name: "Database Engineering", exact: true })
      .first(),
  ).toBeVisible();
  await expect(
    page.getByText("Database curriculum: 39 modules, 117 lessons available;", {
      exact: false,
    }),
  ).toBeVisible();
  for (const moduleId of [
    ...new Set(content.map((lesson) => lesson.id.slice(0, 5))),
  ]) {
    const lessons = content.filter((lesson) => lesson.id.startsWith(moduleId));
    for (const lesson of lessons) {
      await page.goto(`/lessons/${lesson.id}`);
      const complete = page.getByRole("button", {
        name: "Record lesson completion",
        exact: true,
      });
      await expect(complete).toBeDisabled();
      await expect(
        page.getByText("Solution and explanation after an attempt", {
          exact: true,
        }),
      ).toHaveCount(0);
      if (lesson.id === "l0m01l01") {
        await page.getByRole("button", { name: "Open hint 1" }).click();
        await page.getByRole("button", { name: "Open hint 2" }).click();
        await expect(
          page.getByRole("button", { name: "Open hint 3" }),
        ).toBeDisabled();
        const q = lesson.activity.variants[0];
        await answer(page, q, (q.answer + 1) % q.options.length);
        await expect(
          page.getByText(
            english(q.feedback[(q.answer + 1) % q.options.length]),
            {
              exact: true,
            },
          ),
        ).toBeVisible();
        await expect(complete).toBeDisabled();
      }
      for (const q of [
        ...lesson.checks,
        lesson.activity.variants[0],
        ...lesson.activity.edgeCases,
      ])
        await answer(page, q);
      await expect(complete).toBeDisabled();
      await page
        .getByLabel(english(lesson.reflection), { exact: true })
        .fill(
          "Saya memakai grain yang tepat, memeriksa batas data dan tidak menyamakan hasil satu kasus dengan semua kemungkinan.",
        );
      await expect(complete).toBeEnabled();
      await complete.click();
      await expect(
        page.getByText(
          "Lesson passed. Completion is saved for this content version.",
          { exact: true },
        ),
      ).toBeVisible();
      if (lesson.id === "l0m01l01") {
        await page.reload();
        await expect(
          page.getByLabel(english(lesson.reflection), { exact: true }),
        ).not.toHaveValue("");
        await expect(
          page.getByText(
            "Lesson passed. Completion is saved for this content version.",
            { exact: true },
          ),
        ).toBeVisible();
      }
    }
    await page.goto(`${path}#${moduleId}`);
    const moduleCard = page.locator(`#${moduleId}`);
    const exam = moduleCard.locator(".database-assessment");
    await exam.locator("summary").click();
    const qs = lessons.flatMap((lesson) => lesson.checks);
    const certify = exam.getByRole("button", {
      name: `Record completion for ${moduleId.toUpperCase()}`,
      exact: true,
    });
    if (moduleId === "l0m01") {
      for (const [i, q] of qs.entries())
        await answer(
          exam,
          q,
          i >= qs.length - 2 ? (q.answer + 1) % q.options.length : q.answer,
        );
      await expect(certify).toBeDisabled();
      await answer(exam, qs[qs.length - 2]);
      await expect(certify).toBeEnabled(); // 5/6 = 83.3%, above the 80% module threshold.
    } else {
      for (const q of qs) await answer(exam, q);
      if (moduleId === "l0m02") {
        const critical = qs.find((q) => "critical" in q && q.critical)!;
        await answer(
          exam,
          critical,
          (critical.answer + 1) % critical.options.length,
        );
        await expect(certify).toBeDisabled(); // 83.3% does not override a critical failure.
        await answer(exam, critical);
      }
    }
    await exam
      .getByRole("button", {
        name: `Record completion for ${moduleId.toUpperCase()}`,
        exact: true,
      })
      .click();
    await expect(exam.locator("summary")).toContainText("PASSED");
    if (moduleId === "l0m02" || moduleId === "l1m05") {
      const levelId = moduleId.slice(0, 2);
      const level = page
        .locator(".database-level")
        .filter({ has: page.locator(`#title-${levelId}`) });
      const stage = level.locator(":scope > .database-assessment");
      await stage.locator("summary").click();
      const levelQuestions = content
        .filter((lesson) => lesson.id.startsWith(levelId))
        .map((lesson) => lesson.checks[0]);
      for (const q of levelQuestions) await answer(stage, q);
      const stageComplete = stage.getByRole("button", {
        name: `Record completion for ${levelId.toUpperCase()}`,
        exact: true,
      });
      const probe =
        levelId === "l0"
          ? levelQuestions[0]
          : levelQuestions.find((q) => "critical" in q && q.critical)!;
      await answer(stage, probe, (probe.answer + 1) % probe.options.length);
      await expect(stageComplete).toBeDisabled(); // L0: 83.3% <85%; L1: >85% but critical incorrect.
      await answer(stage, probe);
      await stage
        .getByRole("button", {
          name: `Record completion for ${levelId.toUpperCase()}`,
          exact: true,
        })
        .click();
      await expect(stage.locator("summary")).toContainText("PASSED");
    }
  }
  await page.goto("/lessons/l0m01l01");
  await page
    .getByRole("button", { name: "Retry with another variant" })
    .click();
  await expect(
    page.getByRole("heading", {
      name: english(foundation[0].activity.variants[1].question),
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Lesson passed. Completion is saved for this content version.",
      { exact: true },
    ),
  ).toBeVisible();
  await expect(
    page.getByText("Solution and explanation after an attempt", {
      exact: true,
    }),
  ).toHaveCount(0);
  await page.goto("/dashboard");
  await expect(page.getByRole("link", { name: /Continue:/ })).toBeVisible();
  expect(errors).toEqual([]);
});

test("draft routes, prerequisites, local progress compatibility and mobile access", async ({
  page,
}) => {
  const response = await page.goto("/lessons/l9m03l01");
  expect(response?.status()).toBe(404);
  await page.goto(path);
  await expect(page.locator('a[href="/lessons/l9m03l01"]')).toHaveCount(0);
  await expect(page.locator('a[href="/lessons/l2m01l01"]')).toBeVisible();
  const level = page
    .locator(".database-level")
    .filter({ has: page.locator("#title-l2") });
  await expect(level.locator(":scope > .database-assessment")).toHaveCount(1);
  await page.goto("/lessons/l2m01l01");
  await expect(
    page.getByText("L2 · L2M01 · INTERMEDIATE", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Record lesson completion" }),
  ).toBeDisabled();
  await page.goto("/lessons/l1m05l03");
  await expect(
    page.getByText("Theory exploration is open.", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Record lesson completion" }),
  ).toBeDisabled();
  await page.evaluate(() =>
    localStorage.setItem(
      "taalmo.progress.v1",
      JSON.stringify({
        completed: ["duplicate-payment"],
        activity: [],
        experiments: ["unsafe"],
        curriculum: {
          records: {
            ...Object.fromEntries(
              Array.from({ length: 501 }, (_, index) => [
                `l8m99l01@1.0.${index}`,
                {
                  attempt: 0,
                  answers: {},
                  reflection: "Unknown future record",
                },
              ]),
            ),
            "l0m01l01@0.9.0": {
              attempt: 0,
              answers: {},
              reflection: "Riwayat versi lama",
            },
          },
          resume: null,
        },
      }),
    ),
  );
  await page.goto("/lessons/l0m01l01");
  await answer(page, foundation[0].checks[0]);
  const stored = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("taalmo.progress.v1")!),
  );
  expect(stored.completed).toEqual(["duplicate-payment"]);
  expect(stored.experiments).toEqual(["unsafe"]);
  expect(stored.curriculum.records["l0m01l01@0.9.0"].reflection).toBe(
    "Riwayat versi lama",
  );
  expect(stored.curriculum.resume).toBe("l0m01l01");
  for (const width of [390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of [path, "/lessons/l1m01l03", "/lessons/l2m01l03"]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} overflows at ${width}`,
      ).toBe(true);
    }
  }
  await page.screenshot({
    path: "output/playwright/database-lesson-mobile.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(path);
  await page.screenshot({
    path: "output/playwright/database-path-desktop.png",
    fullPage: true,
    animations: "disabled",
  });
});

test("blocked or malformed storage cannot manufacture learning completion", async ({
  page,
}) => {
  await page.goto(path);
  await page.evaluate(() =>
    localStorage.setItem(
      "taalmo.progress.v1",
      JSON.stringify({
        completed: ["deadlock"],
        activity: [],
        experiments: [],
        curriculum: {
          records: {
            "l0m01l01@1.0.0": {
              attempt: -2,
              answers: null,
              reflection: 12,
              completedAt: "nonsense",
            },
          },
          resume: "invalid",
        },
      }),
    ),
  );
  await page.goto("/lessons/l0m01l01");
  await expect(
    page.getByRole("button", { name: "Record lesson completion" }),
  ).toBeDisabled();
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException("Disabled", "QuotaExceededError");
    };
  });
  await answer(page, foundation[0].checks[0]);
  await expect(
    page
      .getByRole("alert")
      .filter({ hasText: "The browser could not save progress" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Record lesson completion" }),
  ).toBeDisabled();
});
