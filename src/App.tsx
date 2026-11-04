import React from 'react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResumeSections } from './components/ResumeSections';

export const App: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen bg-black text-white overflow-x-hidden selection:bg-white selection:text-black">
      {/* Fixed interactive mouse-scrubbed background video */}
      <BackgroundVideo />

      {/* Fixed Navbar (z-index: 20) */}
      <Navbar />

      {/* Hero Section (z-index: 10) */}
      <Hero />

      {/* Detailed Resume Sections (z-index: 10) */}
      <ResumeSections />
    </main>
  );
};

export default App;
