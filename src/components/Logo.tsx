import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 32, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${className}`}
      aria-label="Aaditya Gurav Logo"
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="8"
        fill="#000000"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />
      {/* 'A' Glyph */}
      <path
        d="M7.5 22L12.5 10L17.5 22"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 17.5H15.5"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* 'G' Glyph */}
      <path
        d="M24.5 13H21C19.6 13 18.5 14.1 18.5 15.5V17.5C18.5 18.9 19.6 20 21 20H24C24.3 20 24.5 19.8 24.5 19.5V16H21.5"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

