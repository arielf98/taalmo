import interfaceMessages from "./messages/id-interface.json";
import learningMessages from "./messages/id-learning.json";
import commonMessages from "./messages/id-common.json";
export type Locale = "en" | "id";
const indonesian: Record<string, string> = {
  ...interfaceMessages,
  ...learningMessages,
  ...commonMessages,
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
  if (locale === "en") return format(message, values);
  const key = normalize(message);
  let copy = Object.hasOwn(indonesian, key) ? indonesian[key] : undefined;
  let args = values;
  if (copy === undefined && !values.length) {
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
