import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";

import { PORTFOLIO_CONTENT } from "@/lib/content";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["700"],
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: `${PORTFOLIO_CONTENT.person.name} | Portfolio`,
    template: `%s | ${PORTFOLIO_CONTENT.person.name}`
  },
  description: PORTFOLIO_CONTENT.person.identity,
  authors: [{ name: PORTFOLIO_CONTENT.person.name }],
  openGraph: {
    title: `${PORTFOLIO_CONTENT.person.name} | Portfolio`,
    description: PORTFOLIO_CONTENT.person.identity,
    url: 'https://yoursite.com', // {/* SEO: Update with production URL */}
    siteName: PORTFOLIO_CONTENT.person.name,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${PORTFOLIO_CONTENT.person.name} Portfolio Preview`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PORTFOLIO_CONTENT.person.name} | Portfolio`,
    description: PORTFOLIO_CONTENT.person.identity,
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-background text-foreground relative min-h-screen">
        <Preloader />
        <CustomCursor />
        <Header />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
