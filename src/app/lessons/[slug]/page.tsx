import { notFound } from "next/navigation";
import { lessons } from "@/content/lessons";
import { Lesson } from "@/components/learning";
export function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: lessons.find((l) => l.id === slug)?.title ?? "Lesson not found",
  };
}
export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!lessons.some((l) => l.id === slug)) notFound();
  return <Lesson slug={slug} />;
}
