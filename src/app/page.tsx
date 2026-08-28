'use client';

import { useEffect, useRef, useState } from 'react';
import CloudLayer from '@/components/desktop/CloudLayer';
import Footer from '@/components/desktop/Footer';
import IntroVideo from '@/components/desktop/IntroVideo';
import PlaneLayer from '@/components/desktop/PlaneLayer';
import Sidebar from '@/components/desktop/Sidebar';
import AbtOverlay from '@/components/overlay/AbtOverlay';
import CtcOverlay from '@/components/overlay/CtcOverlay';
import JrnyOverlay from '@/components/overlay/JrnyOverlay';
import ProjOverlay from '@/components/overlay/ProjOverlay';
import { projectsList } from '@/data/proj';
import { useDragWin } from '@/hooks/useDragWin';
import { useIntro } from '@/hooks/useIntro';

export default function Home() {
  const [showProj, setShowProj] = useState(false);
  const [showAbt, setShowAbt] = useState(false);
  const [showCtc, setShowCtc] = useState(false);
  const [showJrny, setShowJrny] = useState(false);

  const projRef = useRef<HTMLDivElement | null>(null);
  const abtRef = useRef<HTMLDivElement | null>(null);
  const ctcRef = useRef<HTMLDivElement | null>(null);
  const jrnyRef = useRef<HTMLDivElement | null>(null);

  const startDrag = useDragWin();
  const { showBlackScreen, hideIntro, videoRef } = useIntro();

  useEffect(() => {                    // at the start open about overlay after 6s
    const timer = setTimeout(() => {
      setShowAbt(true);
    }, 6600);

    return () => clearTimeout(timer);
  }, []);

  const hndlCloseAll = () => {
    setShowProj(false);
    setShowAbt(false);
    setShowCtc(false);
    setShowJrny(false);
  };

  return (
    <div
      className={`relative h-[100dvh] w-screen bg-[#C1E3E1] overflow-hidden transition-opacity duration-700 ${
        hideIntro ? 'main-fade-in' : 'pointer-events-none'
      }`}
    >
      <IntroVideo
        showBlackScreen={showBlackScreen}
        hideIntro={hideIntro}
        videoRef={videoRef}
      />

      {/* Background Grid */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/grid.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: 'contain',
          opacity: 0.2,
        }}
      />

      {/* Centered Logo */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <img
          src="/assets/logo.png"
          alt="shn's Platz"
          className="opacity-15 w-3/4 max-w-2xl"
        />
      </div>


      {/* Main Content Layout */}
      <div className="relative z-50 h-full w-full grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] text-[#36312C]">

        <CloudLayer />
        <PlaneLayer />

        <Sidebar
          onProjects={() => setShowProj(true)}
          onAbout={() => setShowAbt(true)}
          onContact={() => setShowCtc(true)}
          onJourney={() => setShowJrny(true)}
        />

        {/* Main Panel */}
        <main className="relative min-h-0">
          {showProj && (
            <ProjOverlay
              projects={projectsList}
              winRef={projRef}
              onPointerDown={(e) => startDrag(e, projRef)}
              setShow={setShowProj}
            />
          )}

          {showAbt && (
            <AbtOverlay
              winRef={abtRef}
              onPointerDown={(e) => startDrag(e, abtRef)}
              setShow={setShowAbt}
            />
          )}

          {showCtc && (
            <CtcOverlay
              winRef={ctcRef}
              onPointerDown={(e) => startDrag(e, ctcRef)}
              setShow={setShowCtc}
            />
          )}

          {showJrny && (
            <JrnyOverlay
              winRef={jrnyRef}
              onPointerDown={(e) => startDrag(e, jrnyRef)}
              setShow={setShowJrny}
            />
          )}

        </main>

        <Footer onCloseAll={hndlCloseAll} />
      </div>
    </div>
  );
}
