import { redirect } from "next/navigation";
import { pathHref } from "@/content/lessons";
export default function LegacyTransactionPath() {
  redirect(`${pathHref}#transaction-labs`);
}
