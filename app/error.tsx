"use client";

import { useEffect } from "react";
import { PORTFOLIO_CONTENT } from "@/lib/content";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-background text-foreground">
      <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-6">
        Something went wrong
      </h2>
      <p className="font-sans text-muted mb-12 max-w-md">
        We encountered an unexpected error. Please try again or return home.
      </p>
      <div className="flex gap-6">
        <button
          onClick={() => reset()}
          className="border border-white/20 px-6 py-3 rounded-full font-sans text-sm uppercase tracking-widest hover:bg-white/5 transition-colors"
        >
          Try again
        </button>
        <a
          href="/"
          className="border border-foreground bg-foreground text-background px-6 py-3 rounded-full font-sans text-sm uppercase tracking-widest hover:bg-foreground/90 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
