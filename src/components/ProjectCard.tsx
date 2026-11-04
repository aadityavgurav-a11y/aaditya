import React, { useRef, useState } from 'react';

interface ProjectCardProps {
  name: string;
  tagline: string;
  category: string;
  company: string;
  iconSrc: string;
  playStoreUrl: string;
  description: string;
  tags: string[];
  screenshots: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  tagline,
  category,
  company,
  iconSrc,
  playStoreUrl,
  description,
  tags,
  screenshots,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black/60 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all hover:border-white/35 hover:bg-black/70 group relative overflow-hidden">
      {/* Top Header: Icon + Info + Play Store CTA */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <img
              src={iconSrc}
              alt={`${name} App Icon`}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-white/20 shadow-lg shrink-0 bg-neutral-900"
              loading="lazy"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/15">
                  {category}
                </span>
                <span className="text-xs text-white/50 font-mono">
                  {company}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-normal text-white">
                {name}
              </h3>
            </div>
          </div>

          {/* Google Play Store Link */}
          <a
            href={playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white text-black hover:bg-neutral-200 text-xs sm:text-sm font-medium transition-all shadow-md shrink-0 w-fit cursor-pointer"
          >
            {/* Google Play Triangle SVG */}
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M3.6 2.4C3.2 2.8 3 3.4 3 4.2V19.8C3 20.6 3.2 21.2 3.6 21.6L3.7 21.7L13.7 12V11.8L3.7 2.3L3.6 2.4Z"
                fill="#00E5FF"
              />
              <path
                d="M17 15.3L13.7 12V11.8L17 8.7L17.1 8.8L21 11.1C22.1 11.7 22.1 12.3 21 12.9L17.1 15.2L17 15.3Z"
                fill="#FFD600"
              />
              <path
                d="M17.1 15.3L13.7 11.9L3.6 21.7C4 22.1 4.7 22.2 5.5 21.7L17.1 15.3Z"
                fill="#FF3D00"
              />
              <path
                d="M17.1 8.7L5.5 2.3C4.7 1.8 4 1.9 3.6 2.3L13.7 12.1L17.1 8.7Z"
                fill="#00E676"
              />
            </svg>
            <span>View on Google Play</span>
            <span className="text-[10px] opacity-60">↗</span>
          </a>
        </div>

        {/* Tagline & Resume Description */}
        <div className="mt-4 mb-6">
          <p className="text-white/90 text-sm sm:text-base font-medium italic mb-2">
            "{tagline}"
          </p>
          <p className="text-white/70 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Horizontal Screenshot Carousel */}
        <div className="relative my-6 group/carousel">
          {/* Scroll Controls */}
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Previous screenshot"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/80 text-white border border-white/20 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white hover:text-black shadow-lg cursor-pointer"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Next screenshot"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/80 text-white border border-white/20 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-white hover:text-black shadow-lg cursor-pointer"
          >
            →
          </button>

          {/* Screenshot List */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto pb-3 pt-1 scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'thin' }}
          >
            {screenshots.map((src, index) => (
              <div
                key={src}
                onClick={() => setSelectedImage(src)}
                className="shrink-0 snap-center cursor-pointer group/item relative overflow-hidden rounded-2xl border border-white/15 bg-neutral-900/50 shadow-md transition-all hover:scale-[1.02] hover:border-white/40"
              >
                <img
                  src={src}
                  alt={`${name} Screenshot ${index + 1}`}
                  className="h-56 sm:h-64 w-auto object-cover rounded-2xl"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/90 text-black shadow">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[11px] text-white/40 mt-1 px-1">
            <span>Scroll or drag for more screenshots ({screenshots.length} previews)</span>
            <span className="hidden sm:inline">Click image to expand</span>
          </div>
        </div>
      </div>

      {/* Focus Area Tags */}
      <div className="pt-4 border-t border-white/10">
        <div className="text-xs uppercase font-mono text-white/50 mb-3">
          Key Focus Areas:
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-sm sm:max-w-md w-full max-h-[90vh] flex flex-col items-center">
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white text-sm font-mono flex items-center gap-1 cursor-pointer"
            >
              Close [✕]
            </button>
            <img
              src={selectedImage}
              alt={`${name} Enlarged Preview`}
              className="max-h-[82vh] w-auto object-contain rounded-2xl border border-white/20 shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

