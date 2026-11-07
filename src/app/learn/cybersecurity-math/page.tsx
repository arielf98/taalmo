import type { Metadata } from "next";
import { CybersecurityMathPath } from "@/components/cybersecurity-math";

export const metadata: Metadata = {
  title: "Cybersecurity Math",
  description: "Learn mathematics for cybersecurity from zero through interactive lessons on counting, logic, probability, and cryptographic mathematics.",
};
export default function CybersecurityMathPage() {
  return <CybersecurityMathPath />;
}
