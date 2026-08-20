"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ANIMATION_CONFIG } from "@/lib/animations";

export default function Loading() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dotRef.current) {
      gsap.to(dotRef.current, {
        scale: 1.5,
        opacity: 0.5,
        duration: ANIMATION_CONFIG.durations.normal,
        repeat: -1,
        yoyo: true,
        ease: ANIMATION_CONFIG.easing.smooth,
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div 
        ref={dotRef}
        className="w-4 h-4 bg-foreground rounded-full"
      />
    </div>
  );
}
