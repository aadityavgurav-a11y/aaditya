"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { ANIMATION_CONFIG } from "@/lib/animations";

export default function About() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Marquee animation
    const marqueeContent = marqueeRef.current?.firstElementChild as HTMLElement;
    if (marqueeContent) {
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(marqueeContent, {
        xPercent: -50,
        ease: "none",
        duration: 20,
      });

      // Pause on hover
      marqueeRef.current?.addEventListener("mouseenter", () => tl.pause());
      marqueeRef.current?.addEventListener("mouseleave", () => tl.play());
    }

    // Scroll reveal for bio
    if (textRef.current) {
      const words = textRef.current.querySelectorAll(".word");
      gsap.fromTo(
        words,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: ANIMATION_CONFIG.durations.normal,
          stagger: ANIMATION_CONFIG.stagger.text,
          ease: ANIMATION_CONFIG.easing.standard,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <section id="about" className="py-24 overflow-hidden">
      {/* Infinite Marquee */}
      <div 
        ref={marqueeRef} 
        className="w-full border-y border-white/10 py-6 mb-24 overflow-hidden bg-white/5 cursor-default select-none"
      >
        <div className="flex whitespace-nowrap font-display text-4xl md:text-6xl uppercase tracking-widest text-muted">
          <div className="flex shrink-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="mx-8">
                {PORTFOLIO_CONTENT.marqueePhrases.join(" ")}
              </span>
            ))}
          </div>
          {/* Duplicate for seamless looping */}
          <div className="flex shrink-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i + 4} className="mx-8">
                {PORTFOLIO_CONTENT.marqueePhrases.join(" ")}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h2 className="font-display text-2xl uppercase mb-6">About Me</h2>
        </div>
        
        <div className="md:col-span-8 flex flex-col gap-12">
          <p ref={textRef} className="font-sans text-xl md:text-3xl leading-relaxed max-w-3xl">
            {PORTFOLIO_CONTENT.person.bio.split(" ").map((word, i) => (
              <span key={i} className="word inline-block mr-2 opacity-0 translate-y-4">
                {word}
              </span>
            ))}
          </p>

          <div>
            <h3 className="font-sans text-sm text-muted uppercase tracking-widest mb-6">Toolkit</h3>
            <div className="flex flex-wrap gap-3">
              {PORTFOLIO_CONTENT.person.skills.map((skill) => (
                <span 
                  key={skill} 
                  className="px-4 py-2 rounded-full border border-white/20 font-sans text-sm uppercase tracking-wide"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
