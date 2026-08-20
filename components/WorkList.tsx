"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { PORTFOLIO_CONTENT } from "@/lib/content";
import { ANIMATION_CONFIG } from "@/lib/animations";

export default function WorkList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Hide preview on touch devices or if no projects
    if (window.matchMedia("(pointer: coarse)").matches || PORTFOLIO_CONTENT.projects.length === 0) return;

    const preview = previewRef.current;
    if (!preview) return;

    const xTo = gsap.quickTo(preview, "x", { duration: ANIMATION_CONFIG.durations.fast, ease: ANIMATION_CONFIG.easing.standard });
    const yTo = gsap.quickTo(preview, "y", { duration: ANIMATION_CONFIG.durations.fast, ease: ANIMATION_CONFIG.easing.standard });

    const movePreview = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", movePreview);
    
    // Set initial position
    gsap.set(preview, { x: window.innerWidth / 2, y: window.innerHeight / 2, xPercent: -50, yPercent: -50 });

    return () => {
      window.removeEventListener("mousemove", movePreview);
    };
  }, []);

  const handleMouseEnter = (img: string) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (previewImageRef.current) {
      previewImageRef.current.src = img;
    }
    gsap.to(previewRef.current, { scale: 1, opacity: 1, duration: ANIMATION_CONFIG.durations.fast, ease: ANIMATION_CONFIG.easing.standard });
  };

  const handleMouseLeave = () => {
    gsap.to(previewRef.current, { scale: 0, opacity: 0, duration: ANIMATION_CONFIG.durations.fast, ease: ANIMATION_CONFIG.easing.standard });
  };

  return (
    <section id="work" className="py-24 px-6 md:px-12" ref={containerRef}>
      <h2 className="font-display text-2xl md:text-4xl uppercase mb-12">Selected Work</h2>
      
      {PORTFOLIO_CONTENT.projects.length === 0 ? (
        <div className="border-t border-white/10 py-16 text-center">
          <p className="font-sans text-xl md:text-2xl text-muted tracking-wide">
            Projects coming soon.
          </p>
        </div>
      ) : (
        <div className="border-t border-white/10">
          {PORTFOLIO_CONTENT.projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block py-10 md:py-16 border-b border-white/10 relative overflow-hidden"
              onMouseEnter={() => handleMouseEnter(project.thumbnailSrc)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Background Hover Effect */}
              <div className="absolute inset-0 bg-white/5 origin-bottom scale-y-0 transition-transform duration-500 ease-out group-hover:scale-y-100" />
              
              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 pointer-events-none">
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
                  <span className="text-muted font-sans text-sm md:text-base">{project.number}</span>
                  <h3 className="font-display text-4xl md:text-6xl uppercase tracking-tight group-hover:translate-x-4 transition-transform duration-500 ease-out">
                    {project.title}
                  </h3>
                </div>
                <span className="text-muted font-sans text-sm uppercase tracking-widest">
                  {project.category}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Floating Preview */}
      {PORTFOLIO_CONTENT.projects.length > 0 && (
        <div
          ref={previewRef}
          className="fixed top-0 left-0 w-[300px] md:w-[450px] aspect-[4/3] rounded-lg overflow-hidden pointer-events-none z-40 opacity-0 scale-0 origin-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={previewImageRef}
            src=""
            alt="Project Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </section>
  );
}
