"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { ANIMATION_CONFIG } from "@/lib/animations";

export default function Footer() {
  const emailRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Magnetic hover effect for email
    const email = emailRef.current;
    if (!email || window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(email, "x", { duration: ANIMATION_CONFIG.durations.fast, ease: ANIMATION_CONFIG.easing.standard });
    const yTo = gsap.quickTo(email, "y", { duration: ANIMATION_CONFIG.durations.fast, ease: ANIMATION_CONFIG.easing.standard });
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;
      const rect = email.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * 0.2);
      yTo(relY * 0.2);
    };

    const handleMouseEnter = () => { isHovering = true; };
    const handleMouseLeave = () => {
      isHovering = false;
      xTo(0);
      yTo(0);
    };

    email.addEventListener("mouseenter", handleMouseEnter);
    email.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      email.removeEventListener("mouseenter", handleMouseEnter);
      email.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <footer id="contact" className="relative pt-32 pb-12 px-6 md:px-12 overflow-hidden bg-background">
      {/* Decorative background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] pointer-events-none opacity-[0.02] select-none text-center">
        <h2 className="font-display text-[15vw] uppercase leading-none whitespace-nowrap overflow-hidden">
          {PORTFOLIO_CONTENT.person.name.toUpperCase()} {PORTFOLIO_CONTENT.person.name.toUpperCase()} {PORTFOLIO_CONTENT.person.name.toUpperCase()}
        </h2>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center mb-32">
        <h2 className="font-display text-4xl md:text-7xl uppercase mb-8">Let&apos;s build something</h2>
        <a
          ref={emailRef}
          href={`mailto:${PORTFOLIO_CONTENT.person.email}`}
          className="inline-block font-sans text-xl md:text-3xl border-b border-foreground pb-2 hover:text-muted transition-colors"
        >
          {PORTFOLIO_CONTENT.person.email}
        </a>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 font-sans text-sm text-muted uppercase tracking-widest">
        <div>
          {PORTFOLIO_CONTENT.person.location}
        </div>
        
        <div className="flex items-center gap-6">
          {PORTFOLIO_CONTENT.person.socials.map((social) => (
            <a key={social.name} href={social.url} className="hover:text-foreground transition-colors">
              {social.name}
            </a>
          ))}
        </div>
        
        <div>
          &copy; {new Date().getFullYear()} {PORTFOLIO_CONTENT.person.name}
        </div>
      </div>
    </footer>
  );
}
