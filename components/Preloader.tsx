"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if already played this session
    const hasPlayed = sessionStorage.getItem("preloaderPlayed");
    if (hasPlayed) {
      setIsVisible(false);
      return;
    }

    const duration = 2; // seconds
    const interval = 20; // ms
    const steps = (duration * 1000) / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.floor((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        
        // Animate out
        gsap.to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.in",
        });

        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power3.inOut",
          delay: 0.3,
          onComplete: () => {
            sessionStorage.setItem("preloaderPlayed", "true");
            setIsVisible(false);
          },
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background text-foreground"
    >
      <div ref={textRef} className="font-display text-5xl md:text-8xl tracking-tight">
        {progress}%
      </div>
    </div>
  );
}
