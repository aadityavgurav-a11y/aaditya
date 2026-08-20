"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { ANIMATION_CONFIG } from "@/lib/animations";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLHeadingElement>(null);
  const textRef2 = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 }); // Delay to wait for preloader

    // Using simple stagger on words
    const animateText = (element: HTMLElement | null) => {
      if (!element) return;
      const chars = element.querySelectorAll(".char");
      tl.fromTo(
        chars,
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: ANIMATION_CONFIG.durations.normal, 
          ease: ANIMATION_CONFIG.easing.snappy, 
          stagger: ANIMATION_CONFIG.stagger.text 
        },
        "<0.1"
      );
    };

    if (textRef1.current) animateText(textRef1.current);
    if (textRef2.current) animateText(textRef2.current);

    // Subline fade in
    tl.fromTo(
      sublineRef.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: ANIMATION_CONFIG.durations.normal, 
        ease: ANIMATION_CONFIG.easing.standard 
      },
      "-=0.5"
    );

    return () => tl.kill();
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block opacity-0 translate-y-12">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section className="h-screen w-full flex flex-col justify-center px-6 md:px-12 pt-20 relative">
      <div ref={containerRef} className="max-w-7xl">
        <h1 className="font-display font-bold text-[clamp(2.5rem,8vw,9rem)] leading-[0.9] uppercase tracking-tighter mb-8">
          <div ref={textRef1} className="overflow-hidden pb-2">
            {splitText(PORTFOLIO_CONTENT.person.taglineParts[0])}
          </div>
          <div ref={textRef2} className="overflow-hidden pb-2">
            {splitText(PORTFOLIO_CONTENT.person.taglineParts[1])}
          </div>
        </h1>
        
        <p ref={sublineRef} className="text-muted font-sans text-sm md:text-lg max-w-xl font-medium tracking-wide">
          {PORTFOLIO_CONTENT.person.identity}
        </p>
      </div>

      <div className="absolute bottom-10 right-6 md:right-12 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] uppercase tracking-widest rotate-90 mb-4">Scroll</span>
        <div className="w-[1px] h-12 bg-muted relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-foreground animate-[scroll_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
