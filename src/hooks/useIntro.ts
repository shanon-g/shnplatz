'use client';

import { useEffect, useRef, useState } from 'react';

// Drives the boot sequence: a black buffer while the page settles, then the
// logo video, then the desktop fades in.
export function useIntro() {
  const [showBlackScreen, setShowBlackScreen] = useState(true);
  const [hideIntro, setHideIntro] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const blackScreenTimeout = setTimeout(() => {
      setShowBlackScreen(false);
    }, 2000); // 2s

    return () => clearTimeout(blackScreenTimeout);
  }, []);

  useEffect(() => {
    if (showBlackScreen) return;

    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => setHideIntro(true);
    video.addEventListener('ended', handleEnded);
    const fallback = setTimeout(() => setHideIntro(true), 4000);

    return () => {
      video.removeEventListener('ended', handleEnded);
      clearTimeout(fallback);
    };
  }, [showBlackScreen]);

  return { showBlackScreen, hideIntro, videoRef };
}
