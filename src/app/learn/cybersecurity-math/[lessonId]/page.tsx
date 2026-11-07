import { notFound } from "next/navigation";
import { publishedMathLessons } from "@/content/cybersecurity-math/catalog";
import { CybersecurityMathPlayer } from "@/components/cybersecurity-math-player";

export const dynamicParams = false;
export function generateStaticParams() {
  return publishedMathLessons.map((lesson) => ({ lessonId: lesson.id }));
}
export async function generateMetadata({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  return { title: publishedMathLessons.find((lesson) => lesson.id === lessonId)?.title.en ?? "Lesson not found" };
}
export default async function MathLessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const lesson = publishedMathLessons.find((item) => item.id === lessonId);
  if (!lesson?.content) notFound();
  return <CybersecurityMathPlayer key={lesson.id} lesson={lesson} />;
}
