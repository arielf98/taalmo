import Link from "next/link";
import { Header } from "@/components/shell";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="not-found">
        <span className="eyebrow">404 · UNEXPLORED TERRITORY</span>
        <h1>This path doesn’t exist yet.</h1>
        <p>There’s still plenty to discover in your learning playground.</p>
        <Button asChild>
          <Link href="/dashboard">Back to learning →</Link>
        </Button>
      </main>
    </>
  );
}
