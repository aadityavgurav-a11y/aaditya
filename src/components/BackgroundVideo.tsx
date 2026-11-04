import React, { useEffect, useRef, useState } from 'react';

const LOCAL_SRC = '/video/hero.mp4';
const REMOTE_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';
const SENSITIVITY = 0.8;

export const BackgroundVideo: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState(LOCAL_SRC);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0.8);
  const isSeekingRef = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure frame renders on load
    const forceRender = () => {
      try {
        if (video.currentTime < 0.2) {
          video.currentTime = 0.8;
          targetTimeRef.current = 0.8;
        }
      } catch {
        // ignore
      }
    };

    video.addEventListener('loadeddata', forceRender);
    video.addEventListener('canplay', forceRender);

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
      video.removeEventListener('loadeddata', forceRender);
      video.removeEventListener('canplay', forceRender);
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
      // Seek to 0.8s where the 3D red Mainframe visual is clearly visible
      targetTimeRef.current = 0.8;
      try {
        video.currentTime = 0.8;
      } catch {
        // ignore
      }
    }
  };

  const handleError = () => {
    // Fall back to remote CDN if local fails
    if (videoSrc !== REMOTE_SRC) {
      setVideoSrc(REMOTE_SRC);
    }
  };

  return (
    <video
      ref={videoRef}
      src={videoSrc}
      muted
      playsInline
      preload="auto"
      onError={handleError}
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
    />
  );
};
