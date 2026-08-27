'use client';

import { RefObject } from 'react';

interface Props {
  showBlackScreen: boolean;
  hideIntro: boolean;
  videoRef: RefObject<HTMLVideoElement | null>;
}

export default function IntroVideo({ showBlackScreen, hideIntro, videoRef }: Props) {
  return (
    <>
      {/* Screen loading buffer */}
      {showBlackScreen && (
        <div className="fixed inset-0 z-[99999] bg-black" />
      )}

      {/* Intro Video Overlay */}
      {!hideIntro && !showBlackScreen && (
        <div className="fixed inset-0 z-[9999] bg-black">
          <video
            ref={videoRef}
            src="/assets/logo_video2.mp4"
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}
    </>
  );
}
