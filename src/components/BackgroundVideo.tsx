import React, { useEffect, useRef } from 'react';

const LOCAL_VIDEO = '/video/hero.mp4';
const REMOTE_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';
const SENSITIVITY = 0.8;

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0.1);
  const isSeekingRef = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force frame render immediately upon load so it is NEVER black
    const renderFirstFrame = () => {
      try {
        video.currentTime = 0.1;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              video.pause();
            })
            .catch(() => {});
        }
      } catch {
        // Fallback
      }
    };

    video.addEventListener('loadeddata', renderFirstFrame);
    if (video.readyState >= 2) {
      renderFirstFrame();
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      if (!video || !video.duration || isNaN(video.duration)) {
        return;
      }

      const timeDelta = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = Math.min(
        Math.max(0, targetTimeRef.current + timeDelta),
        video.duration
      );

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const currentX = e.touches[0].clientX;
      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      if (!video || !video.duration || isNaN(video.duration)) {
        return;
      }

      const timeDelta = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = Math.min(
        Math.max(0, targetTimeRef.current + timeDelta),
        video.duration
      );

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      video.removeEventListener('loadeddata', renderFirstFrame);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) return;

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.001) {
      video.currentTime = targetTimeRef.current;
    } else {
      isSeekingRef.current = false;
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      targetTimeRef.current = 0.1;
      try {
        video.currentTime = 0.1;
      } catch {
        // ignore
      }
    }
  };

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      preload="auto"
      onSeeked={handleSeeked}
      onLoadedMetadata={handleLoadedMetadata}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        objectPosition: '70% center',
        pointerEvents: 'none',
        backgroundColor: '#000',
      }}
    >
      <source src={LOCAL_VIDEO} type="video/mp4" />
      <source src={REMOTE_VIDEO} type="video/mp4" />
    </video>
  );
};
