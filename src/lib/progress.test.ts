import { expect, it } from "vitest";
import { parseProgress } from "./progress";
it("recovers from corrupt or old progress without inventing completions", () => {
  expect(parseProgress("broken").completed).toEqual([]);
  expect(
    parseProgress(
      '{"completed":["duplicate-payment","unknown","duplicate-payment"],"activity":[null],"experiments":["unsafe","invalid"]}',
    ),
  ).toEqual({
    completed: ["duplicate-payment"],
    activity: [],
    experiments: ["unsafe"],
  });
});
