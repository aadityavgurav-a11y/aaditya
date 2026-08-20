"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { ANIMATION_CONFIG } from "@/lib/animations";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }
    
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsTouch(true);
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // quickTo is highly optimized for performance
    const xTo = gsap.quickTo(cursor, "x", { duration: ANIMATION_CONFIG.durations.fast, ease: ANIMATION_CONFIG.easing.standard });
    const yTo = gsap.quickTo(cursor, "y", { duration: ANIMATION_CONFIG.durations.fast, ease: ANIMATION_CONFIG.easing.standard });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering interactive elements
      if (
        target.closest("a") || 
        target.closest("button") || 
        target.closest("[data-hoverable]")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    // Set initial position immediately without easing
    gsap.set(cursor, { x: window.innerWidth / 2, y: window.innerHeight / 2 });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed top-0 left-0 w-4 h-4 bg-foreground rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-300 ease-out",
        isHovering ? "scale-[3]" : "scale-100"
      )}
    />
  );
}
