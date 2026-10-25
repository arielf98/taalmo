import interfaceMessages from "./messages/id-interface.json" with { type: "json" };
import learningMessages from "./messages/id-learning.json" with { type: "json" };
import commonMessages from "./messages/id-common.json" with { type: "json" };
import databaseInterface from "./messages/id-database-interface.json" with { type: "json" };
import englishCatalog from "./messages/en-database-catalog.json" with { type: "json" };
import englishFoundation from "./messages/en-database-foundation.json" with { type: "json" };
import englishQueries from "./messages/en-database-queries.json" with { type: "json" };
import englishMutations from "./messages/en-database-mutations-sets.json" with { type: "json" };
import englishInterface from "./messages/en-database-interface.json" with { type: "json" };
import englishFlow from "./messages/en-database-flow.json" with { type: "json" };
import englishWindows from "./messages/en-database-windows.json" with { type: "json" };
import englishTimeReports from "./messages/en-database-time-reports.json" with { type: "json" };
import englishCorrectness from "./messages/en-database-correctness.json" with { type: "json" };
import englishModeling from "./messages/en-database-modeling.json" with { type: "json" };
import englishNormalization from "./messages/en-database-normalization.json" with { type: "json" };
import englishTypesConstraints from "./messages/en-database-types-constraints.json" with { type: "json" };
import englishEvolution from "./messages/en-database-evolution.json" with { type: "json" };
export type Locale = "en" | "id";
const indonesian: Record<string, string> = {
  ...interfaceMessages,
  ...learningMessages,
  ...commonMessages,
  ...databaseInterface,
};
const english: Record<string, string> = {
  ...englishCatalog,
  ...englishFoundation,
  ...englishQueries,
  ...englishMutations,
  ...englishInterface,
  ...englishFlow,
  ...englishWindows,
  ...englishTimeReports,
  ...englishCorrectness,
  ...englishModeling,
  ...englishNormalization,
  ...englishTypesConstraints,
  ...englishEvolution,
};
const normalize = (value: string) => value.replace(/\s+/g, " ").trim();
const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Existing simulation history keeps its English copy; match authored templates at render time.
const templates = Object.keys(indonesian)
  .filter((key) => /\{\d+\}/.test(key))
  .sort(
    (a, b) =>
      b.replace(/\{\d+\}/g, "").length - a.replace(/\{\d+\}/g, "").length,
  )
  .map((key) => ({
    key,
    slots: [...key.matchAll(/\{(\d+)\}/g)].map((match) => Number(match[1])),
    pattern: new RegExp(
      "^" +
        key
          .split(/\{\d+\}/)
          .map(escape)
          .join("(.+?)") +
        "$",
    ),
  }));
export function translate(
  message: string,
  locale: Locale,
  values: readonly unknown[] = [],
): string {
  const format = (text: string, args: readonly unknown[]) =>
    text.replace(/\{(\d+)\}/g, (_, index: string) => {
      const value = String(args[Number(index)] ?? "");
      return locale === "id" ? translate(value, locale) : value;
    });
  const key = normalize(message);
  const dictionary = locale === "en" ? english : indonesian;
  let copy = Object.hasOwn(dictionary, key) ? dictionary[key] : undefined;
  let args = values;
  if (locale === "id" && copy === undefined && !values.length) {
    for (const template of templates) {
      const match = template.pattern.exec(key);
      if (!match) continue;
      const captured: string[] = [];
      template.slots.forEach((slot, index) => {
        captured[slot] = match[index + 1];
      });
      copy = indonesian[template.key];
      args = captured;
      break;
    }
  }
  if (copy === undefined) return format(message, values);
  const leading = message.match(/^\s*/)?.[0] ?? "";
  const trailing = message.match(/\s*$/)?.[0] ?? "";
  return leading + format(copy, args) + trailing;
}
