import { notFound } from "next/navigation";
import { lessons } from "@/content/lessons";
import { databaseLessons, publishedLessons } from "@/content/database/catalog";
import { DatabaseLessonPlayer } from "@/components/database-learning";
import { Lesson } from "@/components/learning";
export const dynamicParams = false;
export function generateStaticParams() {
  return [...lessons, ...publishedLessons].map((l) => ({ slug: l.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      lessons.find((l) => l.id === slug)?.title ??
      publishedLessons.find((l) => l.id === slug)?.title ??
      "Lesson not found",
  };
}
export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const databaseLesson = databaseLessons.find(
    (lesson) => lesson.id === slug && lesson.status === "published",
  );
  if (databaseLesson)
    return (
      <DatabaseLessonPlayer key={databaseLesson.id} lesson={databaseLesson} />
    );
  if (!lessons.some((l) => l.id === slug)) notFound();
  return <Lesson slug={slug} />;
}
