import fs from "node:fs";
import assert from "node:assert/strict";
const root = new URL("../", import.meta.url);
const read = (path) => JSON.parse(fs.readFileSync(new URL(path, root), "utf8"));
const blueprint = read(
  "curriculum/taalmo-database-zero-to-master/curriculum-blueprint.json",
);
export const authored = [
  "l0",
  "l1-query",
  "l1-mutation",
  "l2-subqueries",
  "l2-windows",
  "l2-time-reports",
  "l2-correctness",
  "l3-modeling",
  "l3-normalization",
].flatMap((file) => read(`src/content/database/${file}.json`));
const modules = blueprint.levels.flatMap((level) => level.modules);
const lessons = modules.flatMap((module) => module.lessons);
const byId = new Map(lessons.map((lesson) => [lesson.id, lesson]));
assert.equal(blueprint.levels.length, 10);
assert.equal(modules.length, 40);
assert.equal(lessons.length, 120);
assert.equal(
  new Set(lessons.map((lesson) => lesson.id)).size,
  120,
  "duplicate canonical lesson IDs",
);
assert.equal(
  new Set(authored.map((lesson) => lesson.id)).size,
  authored.length,
  "duplicate authored lesson IDs",
);
const moduleOrder = modules.map((module) => module.id);
const questionIds = new Set();
const question = (q, owner) => {
  assert.match(q.id, /^[a-z0-9-]{1,100}$/, owner);
  assert(!questionIds.has(q.id), `duplicate question ${q.id}`);
  questionIds.add(q.id);
  assert(
    q.question?.length > 15 && q.explanation?.length > 25,
    `${owner}: substantive question/explanation required`,
  );
  assert(
    q.options.length >= 2 && new Set(q.options).size === q.options.length,
    `${owner}: distinct options`,
  );
  assert(
    Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length,
    `${owner}: invalid answer`,
  );
  assert.equal(
    q.feedback.length,
    q.options.length,
    `${owner}: per-option feedback`,
  );
  assert(
    q.feedback.every((text) => text.length > 15),
    `${owner}: specific feedback required`,
  );
};
for (const [index, module] of modules.entries()) {
  assert(
    module.prerequisite_module_ids.every(
      (id) => moduleOrder.indexOf(id) >= 0 && moduleOrder.indexOf(id) < index,
    ),
    `${module.id}: broken/cyclic prerequisite`,
  );
  assert.equal(module.lessons.length, 3);
  module.lessons.forEach((lesson, i) => {
    assert.equal(lesson.order, i + 1);
    assert.equal(lesson.id, `${module.id}l0${i + 1}`);
  });
}
for (const content of authored) {
  assert(byId.has(content.id), `unregistered ${content.id}`);
  assert.match(content.version, /^\d+\.\d+\.\d+$/);
  assert(["beginner", "intermediate"].includes(content.difficulty));
  assert(
    content.tags.length &&
      content.hook.length > 60 &&
      content.objectives.length >= 2,
  );
  const prose = content.sections
    .flatMap((section) => section.paragraphs)
    .join(" ");
  assert(
    prose.split(/\s+/).length >= 300,
    `${content.id}: insufficient teaching prose`,
  );
  assert(
    content.sections.length >= 2 &&
      content.sections.every(
        (section) => section.title && section.paragraphs.length,
      ),
  );
  assert(
    content.worked.sql &&
      content.worked.columns.length &&
      content.worked.explanation.length > 50,
  );
  assert(
    content.worked.rows.every(
      (row) =>
        row.length === content.worked.columns.length &&
        row.every((value) => value === null || typeof value === "string"),
    ),
    `${content.id}: expected result shape`,
  );
  assert(
    content.checks.length >= 2 &&
      content.activity.variants.length >= 2 &&
      content.activity.edgeCases.length >= 2,
  );
  [
    ...content.checks,
    ...content.activity.variants,
    ...content.activity.edgeCases,
  ].forEach((q) => question(q, content.id));
  assert.equal(content.activity.kind, "prediction");
  assert(
    content.activity.prompt &&
      content.activity.setup &&
      content.activity.starterSql &&
      content.activity.solutionSql,
  );
  assert.equal(content.activity.hints.length, 3);
  assert(content.activity.hints.every((hint) => hint.length > 20));
  assert(
    content.activity.solutionExplanation.length > 60 &&
      content.reflection.length > 40,
  );
}
for (const lesson of blueprint.levels
  .slice(0, 2)
  .flatMap((level) => level.modules.flatMap((module) => module.lessons)))
  assert(
    authored.some((content) => content.id === lesson.id),
    `missing L0-L1 ${lesson.id}`,
  );
for (const id of ["l0m02l03", "l1m05l02", "l1m05l03"]) {
  const content = authored.find((lesson) => lesson.id === id);
  assert(
    content.activity.critical && content.checks.some((check) => check.critical),
    `${id}: mandatory safety checks`,
  );
}
console.log(
  `Content audit passed: ${blueprint.levels.length} levels, ${modules.length} modules, ${lessons.length} stable lessons; ${authored.length} published / ${lessons.length - authored.length} draft; ${questionIds.size} graded questions. Draft entries have no player content.`,
);
