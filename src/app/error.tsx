"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className="not-found">
      <h1>Something interrupted the experiment.</h1>
      <p>
        Try opening the page again. Your saved learning progress stays on this
        device.
      </p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
