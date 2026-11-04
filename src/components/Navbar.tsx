import React, { useState } from 'react';
import { Logo } from './Logo';

interface NavbarProps {
  onNavClick?: (targetId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Education', id: 'education' },
    { label: 'About', id: 'about' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavClick) {
      onNavClick(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-20 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center select-none backdrop-blur-sm bg-black/20 border-b border-white/5 transition-all">
        {/* Logo (left) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-row items-center gap-3 text-white focus:outline-none group cursor-pointer"
        >
          <Logo size={32} />
          <span
            className="text-[20px] sm:text-[25px] tracking-tight font-heading leading-none group-hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Aaditya Gurav®
          </span>
        </a>

        {/* Desktop Nav Links (center, hidden below md) */}
        <nav className="hidden md:flex flex-row items-center text-[21px] text-white">
          {navLinks.map((item, idx) => (
            <React.Fragment key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className="hover:opacity-60 transition-opacity cursor-pointer"
              >
                {item.label}
              </a>
              {idx < navLinks.length - 1 && ', '}
            </React.Fragment>
          ))}
        </nav>

        {/* Desktop CTA (right, hidden below md) */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="mailto:aaadityavgurav@gmail.com"
            className="text-[21px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile Hamburger Button (visible below md) */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden relative z-30 flex flex-col justify-center items-center gap-[5px] w-8 h-8 focus:outline-none cursor-pointer"
        >
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 transform origin-center ${
              mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 transform origin-center ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile Overlay (z-index: 19) */}
      <div
        className={`fixed inset-0 z-[19] bg-black/95 backdrop-blur-md flex flex-col justify-center items-start px-8 gap-8 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="text-white/60 text-xs tracking-widest uppercase mb-2">
          Navigation
        </div>
        {navLinks.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(item.id);
            }}
            className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity cursor-pointer"
          >
            {item.label}
          </a>
        ))}
        <div className="h-[1px] w-full bg-white/10 my-2" />
        <a
          href="mailto:aaadityavgurav@gmail.com"
          onClick={() => setMobileMenuOpen(false)}
          className="text-[28px] font-medium text-white underline underline-offset-4 hover:opacity-60 transition-opacity cursor-pointer"
        >
          aaadityavgurav@gmail.com
        </a>
        <a
          href="tel:9322378090"
          onClick={() => setMobileMenuOpen(false)}
          className="text-[22px] text-white/80 hover:text-white transition-opacity cursor-pointer"
        >
          +91 9322378090
        </a>
      </div>
    </>
  );
};
