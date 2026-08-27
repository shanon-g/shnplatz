'use client';

import { useRef, useState, useEffect } from 'react';
import TimeDisp from '@/components/TimeDisp';
import AbtOverlay from '@/components/overlay/AbtOverlay';
import CtcOverlay from '@/components/overlay/CtcOverlay';
import JrnyOverlay from '@/components/overlay/JrnyOverlay';
import ProjOverlay from '@/components/overlay/ProjOverlay';
import { funFacts } from '@/data/funfacts';
import { projectsList } from '@/data/proj';

export default function Home() {
  const [showProjects, setShowProjects] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'detailed'>('detailed');
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const [showJourney, setShowJourney] = useState(false);
  const journeyRef = useRef<HTMLDivElement | null>(null);

  const projectsRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const offset = useRef({ x: 0, y: 0 });
  const activeRef = useRef<React.RefObject<HTMLDivElement | null> | null>(null);
  
  const availableFactsRef = useRef<number[]>([]);

  const [showBlackScreen, setShowBlackScreen] = useState(true);
  const [hideIntro, setHideIntro] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [showPlane, setShowPlane] = useState(false);
  const [airdrops, setAirdrops] = useState<{ x: number; y: number; id: number }[]>([]);
  const [planeClickable, setPlaneClickable] = useState(true);

  // Spawn plane every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setShowPlane(true);
      setPlaneClickable(true);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  

  const handlePlaneClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!planeClickable) return;

    setPlaneClickable(false);

    const rect = e.currentTarget.getBoundingClientRect();
    const dropX = rect.left + rect.width / 2;
    const dropY = window.innerHeight * 0.11;

    setAirdrops(prev => [...prev, { x: dropX, y: dropY, id: Date.now() }]);
    setPlaneClickable(false);
  };


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

  useEffect(() => {                    // at the start open about overlay after 6s
    const timer = setTimeout(() => {
      setShowAbout(true);
    }, 6600);

    return () => clearTimeout(timer);
  }, []);

  const onPointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    const elem = ref.current;
    if (!elem) return;

    activeRef.current = ref;
    pos.current = { x: e.clientX, y: e.clientY };
    offset.current = {
      x: elem.offsetLeft,
      y: elem.offsetTop,
    };

    // Use pointer events for unified touch/mouse handling
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointercancel', onPointerUp); // safety fallback for mobile
  };

  const handlePointerMove = (e: PointerEvent) => {
    const ref = activeRef.current;
    if (!ref || !ref.current) return;

    e.preventDefault(); 

    const dx = e.clientX - pos.current.x;
    const dy = e.clientY - pos.current.y;
    ref.current.style.left = `${offset.current.x + dx}px`;
    ref.current.style.top = `${offset.current.y + dy}px`;
  };

  const onPointerUp = () => {
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', onPointerUp);
    document.removeEventListener('pointercancel', onPointerUp);
    activeRef.current = null;
  };

  const handleCloseAll = () => {
    setShowProjects(false);
    setShowAbout(false);
    setShowContact(false);
    setShowJourney(false);
  };

  return (
    <div
      className={`relative h-[100dvh] w-screen bg-[#C1E3E1] overflow-hidden transition-opacity duration-700 ${
        hideIntro ? 'main-fade-in' : 'pointer-events-none'
      }`}
    >
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
        
        {/* Cloud Layers */}
        <div className="cloud-wrapper absolute top-0 left-0 w-full h-[120px] sm:h-[220px] pointer-events-none overflow-hidden">
          {/* Cloud Back Layer */}
          <div className="z-10  opacity-90 cloud-strip animate-clouds-back">
            <img src="/assets/cloudback.png" className="cloud-img" />
            <img src="/assets/cloudback.png" className="cloud-img" />
          </div>

          {/* Cloud Front Layer */}
          <div className="z-20 opacity-90 cloud-strip absolute top-0 left-0 animate-clouds-front">
            <img src="/assets/cloudfront.png" className="cloud-img" />
            <img src="/assets/cloudfront.png" className="cloud-img" />
          </div>
        </div>


        {/* Plane */}
        {showPlane && (
          <img
            src="/assets/plane.png"
            className="plane"
            onAnimationEnd={() => setShowPlane(false)}
            onClick={handlePlaneClick}
            alt="Plane"
          />
        )}

        {airdrops.map((drop) => {
          return (
            <div
              key={drop.id}
              className="airdrop"
              style={{ left: drop.x, top: drop.y }}
              onAnimationEnd={() => {
                
                // funfact shuffle logic
                if (availableFactsRef.current.length === 0) {
                  // if bag is empty, fill it with indices [0, 1, 2, ... length-1]
                  const indices = funFacts.map((_, i) => i);
                  
                  // shuffle the array (Fisher-Yates shuffle)
                  for (let i = indices.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [indices[i], indices[j]] = [indices[j], indices[i]];
                  }
                  availableFactsRef.current = indices;
                }
                
                // pull the next random fact out of the bag
                const nextIndex = availableFactsRef.current.pop()!;
                const funFact = funFacts[nextIndex];

                const text = document.createElement('div');
                text.className = 'explosion-text';
                text.textContent = funFact;

                text.style.left = `${drop.x}px`;
                text.style.top = `calc(100vh - 120px)`; // sync with footer height

                document.body.appendChild(text);

                setTimeout(() => {
                  text.remove();
                }, 8000);
              }}
            >
              <img src="/assets/airdrop.png" alt="Airdrop" style={{ width: '100%' }} />
            </div>
          );
        })}

        
        {/* Sidebar Icons */}
        <aside className="z-40 flex flex-col items-center justify-evenly py-0.1 px-1 sm:py-0.1 sm:px-3 min-h-0 overflow-hidden h-full">
          <button
            onClick={() => setShowProjects(true)}
            className="hover:bg-[#7F9795] rounded-xl p-none sm:p-0.1 transition flex items-center justify-center flex-shrink"
          >
            <img 
              src="/assets/folder_icon.png" 
              alt="Projects" 
              className="h-[15dvh] w-auto object-contain max-w-[110px] sm:max-w-[160px]"
            />
          </button>

          <button
            onClick={() => setShowAbout(true)}
            className="hover:bg-[#7F9795] rounded-xl p-none sm:p-0.1 transition flex items-center justify-center flex-shrink"
          >
            <img 
              src="/assets/about_icon.png" 
              alt="About Me" 
              className="h-[15dvh] w-auto object-contain max-w-[110px] sm:max-w-[160px]" 
            />
          </button>

          <button 
            onClick={() => setShowContact(true)}
            className="hover:bg-[#7F9795] rounded-xl p-none sm:p-0.1 transition flex items-center justify-center flex-shrink"
          >
            <img 
              src="/assets/contact_icon.png" 
              alt="Contact Me" 
              className="h-[15dvh] w-auto object-contain max-w-[110px] sm:max-w-[160px]" 
            />
          </button>

          <button>
            <a
              href="/CV_ATS_Shanon.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-[#7F9795] rounded-xl p-none sm:p-0.1 transition flex items-center justify-center flex-shrink"
            >
              <img 
                src="/assets/cv_icon.png" 
                alt="CV" 
                className="h-[15dvh] w-auto object-contain max-w-[110px] sm:max-w-[160px]" 
              />
            </a>
          </button>

          <button
            onClick={() => setShowJourney(true)}
            className="hover:bg-[#7F9795] rounded-xl p-none sm:p-0.1 transition flex items-center justify-center flex-shrink"
          >
            <img 
              src="/assets/journey_icon.png" 
              alt="Journey" 
              className="h-[15dvh] w-auto object-contain max-w-[110px] sm:max-w-[160px]" 
            />
          </button>

        </aside>

        {/* Main Panel */}
        <main className="relative min-h-0">
          {showProjects && (
            <ProjOverlay
              projects={projectsList}
              projectsRef={projectsRef}
              onPointerDown={(e) => onPointerDown(e, projectsRef)}
              setShowProjects={setShowProjects}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          )}

          {showAbout && (
            <AbtOverlay
              aboutRef={aboutRef}
              onPointerDown={(e) => onPointerDown(e, aboutRef)}
              setShowAbout={setShowAbout}
            />
          )}

          {showContact && (
            <CtcOverlay
              contactRef={contactRef}
              onPointerDown={(e) => onPointerDown(e, contactRef)}
              setShowContact={setShowContact}
            />
          )}

          {showJourney && (
            <JrnyOverlay
              journeyRef={journeyRef}
              onPointerDown={(e) => onPointerDown(e, journeyRef)}
              setShowJourney={setShowJourney}
            />
          )}

        </main>

        {/* Footer */}
        <footer className="opacity-95 z-[200] col-span-2 bg-[#7F9795] border-t-[4px] border-[#36312C] px-4 py-3 flex justify-between items-center text-[#F9F2E4] text-sm relative">
          <div className="relative flex items-center">
            
            {/* Circle Button*/}
            <button
              onClick={handleCloseAll}
              className="peer rounded-full w-12 h-12 bg-[#F9F2E4] border-[3px] border-[#36312C] flex items-center justify-center pulse-glow transition hover:scale-105 relative z-10"
            >
              <img
                src="/assets/logo.png"
                alt="logo"
                className="w-8 h-8 object-contain small-rotate"
              />
            </button>

            {/* Label */}
            <span 
              className="ml-2 sm:ml-4 px-2 py-1 sm:px-3 sm:py-1.5 bg-[#F9F2E4] text-[#36312C] border-[2px] border-[#36312C] 
                rounded-lg shadow-[2px_2px_0px_#36312C] font-extrabold text-[10px] sm:text-sm uppercase tracking-wider pointer-events-none 
                opacity-60 origin-left transition-all duration-300 peer-hover:opacity-100 peer-hover:scale-110 whitespace-nowrap z-0"
            >
              Close All
            </span>
            
          </div>

          <div className="flex gap-6 items-center">
            <img src="/assets/battery_icon.png" className="w-8" />
            <img src="/assets/wifi_icon.png" className="w-6" />
            <TimeDisp />
          </div>
        </footer>
      </div>
    </div>
  );
}