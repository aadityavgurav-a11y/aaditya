"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out py-6 px-6 md:px-12 flex items-center justify-between",
        scrolled ? "bg-background/80 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="font-display font-bold text-sm tracking-widest uppercase">
        Aaditya Gurav
      </div>
      
      <nav className="flex items-center gap-6 md:gap-10 text-sm font-medium tracking-wide">
        {["Work", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="relative overflow-hidden group"
          >
            <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
              {item}
            </span>
            <span className="absolute inset-0 block transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
              {item}
            </span>
          </a>
        ))}
      </nav>
    </header>
  );
}
