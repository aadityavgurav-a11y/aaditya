import React from 'react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';

export const App: React.FC = () => {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white select-none">
      {/* Background video (mouse-scrub controlled) */}
      <BackgroundVideo />

      {/* Navbar (fixed, z-index: 10) */}
      <Navbar />

      {/* Hero Section (z-index: 1) */}
      <Hero />
    </main>
  );
};

export default App;
