import { PORTFOLIO_CONTENT } from "@/lib/content";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-background text-foreground">
      <h1 className="font-display font-bold text-[clamp(6rem,15vw,12rem)] leading-none tracking-tighter mb-4 opacity-5">
        404
      </h1>
      <h2 className="font-display text-2xl md:text-4xl uppercase tracking-widest mb-6 relative z-10 -mt-16">
        Page Not Found
      </h2>
      <p className="font-sans text-muted mb-12 max-w-md relative z-10">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <a
        href="/"
        className="relative z-10 border border-foreground bg-foreground text-background px-8 py-4 rounded-full font-sans text-sm uppercase tracking-widest hover:bg-foreground/90 transition-colors"
      >
        Return Home
      </a>
    </div>
  );
}
