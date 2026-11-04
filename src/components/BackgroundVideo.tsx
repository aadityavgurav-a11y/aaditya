import React, { useEffect, useRef } from 'react';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';
const SENSITIVITY = 0.8;

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0.05);
  const isSeekingRef = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (video.readyState >= 1 && video.currentTime === 0) {
        video.currentTime = 0.05;
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      const vid = videoRef.current;
      if (!vid || !vid.duration || isNaN(vid.duration)) {
        return;
      }

      const timeDelta = (delta / window.innerWidth) * SENSITIVITY * vid.duration;
      targetTimeRef.current = Math.min(
        Math.max(0, targetTimeRef.current + timeDelta),
        vid.duration
      );

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        vid.currentTime = targetTimeRef.current;
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

      const vid = videoRef.current;
      if (!vid || !vid.duration || isNaN(vid.duration)) {
        return;
      }

      const timeDelta = (delta / window.innerWidth) * SENSITIVITY * vid.duration;
      targetTimeRef.current = Math.min(
        Math.max(0, targetTimeRef.current + timeDelta),
        vid.duration
      );

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        vid.currentTime = targetTimeRef.current;
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
    if (video && video.currentTime === 0) {
      targetTimeRef.current = 0.05;
      video.currentTime = 0.05;
    }
  };

  return (
    <video
      ref={videoRef}
      src={VIDEO_SRC}
      muted
      playsInline
      preload="auto"
      onSeeked={handleSeeked}
      onLoadedMetadata={handleLoadedMetadata}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: '70% center',
      }}
    />
  );
};
