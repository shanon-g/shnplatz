'use client';

import { useRef, useState, useEffect } from 'react';
import TimeDisplay from './components/TimeDisplay';
import ProjectsOverlay from './components/ProjectsOverlay';
import { projectsList } from './data/projects';
import AboutOverlay from './components/AboutOverlay';
import ContactOverlay from './components/ContactOverlay';

export default function Home() {
  const [showProjects, setShowProjects] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'detailed'>('detailed');
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const projectsRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const offset = useRef({ x: 0, y: 0 });
  const activeRef = useRef<React.RefObject<HTMLDivElement | null> | null>(null);

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

  useEffect(() => {                    // At the start open About Overlay after 6s
    const timer = setTimeout(() => {
      setShowAbout(true);
    }, 6600);

    return () => clearTimeout(timer);
  }, []);

  const funFacts = [
    "I have a popcorn addiction",
    "I love Twice",
    "I can solve a Rubik's Cube",
    "Teaching is my hidden passion",
    "Minecraft made me pursue coding",
    "I can't work with music playing",
    "How are you :O",
    "I hate flowers",
    "cats.",
    "\"on Wednesdays we wear pink!\"",
  ];


  const onMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
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

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const ref = activeRef.current;
    if (!ref || !ref.current) return;

    const dx = e.clientX - pos.current.x;
    const dy = e.clientY - pos.current.y;
    ref.current.style.left = `${offset.current.x + dx}px`;
    ref.current.style.top = `${offset.current.y + dy}px`;
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    activeRef.current = null;
  };

  return (
    <div
      className={`relative h-screen w-screen bg-[#C1E3E1] overflow-hidden transition-opacity duration-700 ${
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
        <div className="cloud-wrapper absolute top-0 left-0 w-full h-[220px] pointer-events-none overflow-hidden">
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
                const funFact = funFacts[Math.floor(Math.random() * funFacts.length)];
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
        <aside className="z-40 flex flex-col gap-8 items-center justify-start py-8 px-3">
          <button
            onClick={() => setShowProjects(true)}
            className="w-40 h-30 hover:bg-[#7F9795] rounded-xl p-2 transition flex items-center justify-center"
          >
            <img src="/assets/folder_icon.png" alt="Projects" className="w-full" />
          </button>

          <button
            onClick={() => setShowAbout(true)}
            className="w-40 h-30 hover:bg-[#7F9795] rounded-xl p-2 transition flex items-center justify-center"
          >
            <img src="/assets/about_icon.png" alt="About Me" className="w-full" />
          </button>

          <button 
            onClick={() => setShowContact(true)}
            className="w-40 h-30 hover:bg-[#7F9795] rounded-xl p-2 transition flex items-center justify-center"
          >
            <img src="/assets/contact_icon.png" alt="Contact Me" className="w-full" />
          </button>

          <button className="w-40 h-30 hover:bg-[#7F9795] rounded-xl p-2 transition flex items-center justify-center">
            <a
              href="/CV_ATS_Shanon.pdf"
              target="_blank"
              download
              className="w-40 h-30 hover:bg-[#7F9795] rounded-xl p-2 transition flex items-center justify-center"
            >
              <img src="/assets/cv_icon.png" alt="CV" className="w-full" />
            </a>
          </button>
        </aside>

        {/* Main Panel */}
        <main className="relative">
          {showProjects && (
            <ProjectsOverlay
              projects={projectsList}
              projectsRef={projectsRef}
              onMouseDown={(e) => onMouseDown(e, projectsRef)}
              setShowProjects={setShowProjects}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          )}

          {showAbout && (
            <AboutOverlay
              aboutRef={aboutRef}
              onMouseDown={(e) => onMouseDown(e, aboutRef)}
              setShowAbout={setShowAbout}
            />
          )}

          {showContact && (
            <ContactOverlay
              contactRef={contactRef}
              onMouseDown={(e) => onMouseDown(e, contactRef)}
              setShowContact={setShowContact}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="opacity-95 z-200 col-span-2 bg-[#7F9795] border-t-[4px] border-[#36312C] px-4 py-3 flex justify-between items-center text-[#F9F2E4] text-sm">
          <div className="relative group flex items-center">
            <button
              onClick={() => {
                setShowProjects(false);
                setShowAbout(false);
                setShowContact(false);
              }}
              className="rounded-full w-12 h-12 bg-[#F9F2E4] border-[3px] border-[#36312C] flex items-center justify-center pulse-glow transition hover:scale-105"
            >
              <img
                src="/assets/logo.png"
                alt="logo"
                className="w-8 h-8 object-contain small-rotate"
              />
            </button>

            {/* Hover Text */}
            <span className="ml-3 text-[#36312C] font-bold text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-full top-1/2 -translate-y-1/2 whitespace-nowrap z-50">
              Close All
            </span>
          </div>

          <div className="flex gap-6 items-center">
            <img src="/assets/battery_icon.png" className="w-8" />
            <img src="/assets/wifi_icon.png" className="w-6" />
            <TimeDisplay />
          </div>
        </footer>
      </div>
    </div>
  );
}
