'use client';

import { useRef, useState, useEffect } from 'react';
import TimeDisplay from './components/TimeDisplay';
import ProjectsOverlay from './components/ProjectsOverlay';
import { projectsList } from './data/projects';
import AboutOverlay from './components/AboutOverlay';

export default function Home() {
  const [showProjects, setShowProjects] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'detailed'>('detailed');
  const [showAbout, setShowAbout] = useState(false);

  const projectsRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const offset = useRef({ x: 0, y: 0 });
  const activeRef = useRef<React.RefObject<HTMLDivElement | null> | null>(null);

  // const [showIntro, setShowIntro] = useState(true);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setShowIntro(false);
  //   }, 2600); // Should match animation duration
  //   return () => clearTimeout(timeout);
  // }, []);

  const [hideIntro, setHideIntro] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => setHideIntro(true);

    video.addEventListener('ended', handleEnded);

    const fallback = setTimeout(() => setHideIntro(true), 4000);

    return () => {
      video.removeEventListener('ended', handleEnded);
      clearTimeout(fallback);
    };
  }, []);


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
      
    {/* {showIntro && (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center intro-fade-out">
        <div className="loading-ring-container">
          <img
            src="/assets/logo.png"
            alt="Intro Logo"
            className="intro-logo-fade"
          />
          <div className="loading-ring-spinner" />
        </div>
      </div>
    )} */}

      {/* Intro Video Overlay */}
      {!hideIntro && (
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

      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/grid.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: 'contain',
          opacity: 0.2,
        }}
      />

      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <img
          src="/assets/logo.png"
          alt="shn's Platz"
          className="opacity-15 w-3/4 max-w-2xl"
        />
      </div>

      <div className="relative z-30 h-full w-full grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] text-[#36312C]">
        <aside className="flex flex-col gap-8 items-center justify-start py-8 px-3">
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

          <button className="w-40 h-30 hover:bg-[#7F9795] rounded-xl p-2 transition flex items-center justify-center">
            <img src="/assets/contact_icon.png" alt="Contact Me" className="w-full" />
          </button>

          <button className="w-40 h-30 hover:bg-[#7F9795] rounded-xl p-2 transition flex items-center justify-center">
            <img src="/assets/cv_icon.png" alt="CV" className="w-full" />
          </button>
        </aside>

        <main className="relative">
          {showProjects && (
            <ProjectsOverlay
              projects={projectsList}
              onClose={() => setShowProjects(false)}
              projectsRef={projectsRef}
              onMouseDown={(e) => onMouseDown(e, projectsRef)}
              setShowProjects={setShowProjects}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />
          )}

          {showAbout && (
            <AboutOverlay
              onClose={() => setShowAbout(false)}
              aboutRef={aboutRef}
              onMouseDown={(e) => onMouseDown(e, aboutRef)}
              setShowAbout={setShowAbout}
            />
          )}
        </main>

        <footer className="opacity-95 z-200 col-span-2 bg-[#7F9795] border-t-[4px] border-[#36312C] px-4 py-3 flex justify-between items-center text-[#F9F2E4] text-sm">
          <div className="rounded-full w-12 h-12 bg-[#F9F2E4] border-[3px] border-[#36312C] flex items-center justify-center pulse-glow">
            <img
              src="/assets/logo.png"
              alt="logo"
              className="w-8 h-8 object-contain small-rotate"
            />
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
