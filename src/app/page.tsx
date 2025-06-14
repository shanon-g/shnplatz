'use client';

import { useEffect, useState, useRef } from 'react';
import TimeDisplay from './components/TimeDisplay';
import ProjectsOverlay from './components/ProjectsOverlay';
import { projectsList } from './data/projects';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showProjects, setShowProjects] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'detailed'>('detailed');
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowIntro(false);
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const elem = projectsRef.current;
    if (!elem) return;
    pos.current = { x: e.clientX, y: e.clientY };
    offset.current = {
      x: elem.offsetLeft,
      y: elem.offsetTop,
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    const elem = projectsRef.current;
    if (!elem) return;
    const dx = e.clientX - pos.current.x;
    const dy = e.clientY - pos.current.y;
    elem.style.left = `${offset.current.x + dx}px`;
    elem.style.top = `${offset.current.y + dy}px`;
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="relative h-screen w-screen bg-[#C1E3E1] overflow-hidden">
      {showIntro && (
        <div className="fixed inset-0 bg-[#36312C] z-50 flex items-center justify-center animate-fadeOutOverlay">
          <img
            src="/assets/logo.png"
            alt="Intro Logo"
            className="w-3/4 max-w-2xl animate-logoPop"
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
            className="w-40 h-30 hover:bg-[#F9F2E4] rounded-xl p-2 transition flex items-center justify-center"
          >
            <img src="/assets/folder_icon.png" alt="Projects" className="w-full" />
          </button>
          <button className="w-40 h-30 hover:bg-[#F9F2E4] rounded-xl p-2 transition flex items-center justify-center">
            <img src="/assets/about_icon.png" alt="About Me" className="w-full" />
          </button>
          <button className="w-40 h-30 hover:bg-[#F9F2E4] rounded-xl p-2 transition flex items-center justify-center">
            <img src="/assets/contact_icon.png" alt="Contact Me" className="w-full" />
          </button>
        </aside>

        <main className="relative">
          {showProjects && (
            <ProjectsOverlay
              projects={projectsList}
              onClose={() => setShowProjects(false)}
              projectsRef={projectsRef}
              onMouseDown={onMouseDown}
              setShowProjects={setShowProjects}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />

          )}
        </main>

        <footer className="col-span-2 bg-[#7F9795] border-t-[4px] border-[#36312C] px-4 py-3 flex justify-between items-center text-[#F9F2E4] text-sm">
          <div className="rounded-full w-12 h-12 bg-[#F9F2E4] border border-[#36312C]" />
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