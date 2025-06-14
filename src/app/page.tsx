'use client';
import TimeDisplay from './components/TimeDisplay';
import { useEffect, useState } from 'react';

export default function Home() {

  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // const sound = new Audio('/assets/intro.mp3');
      // sound.play();
      setShowIntro(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  


  return (
    <div className="relative h-screen w-screen bg-[#C1E3E1] overflow-hidden">
      {/* Intro Animation Overlay */}
      {showIntro && (
        <div className="fixed inset-0 bg-[#36312C] z-50 flex items-center justify-center animate-fadeOutOverlay">
          <img
            src="/assets/logo.png"
            alt="Intro Logo"
            className="w-3/4 max-w-2xl animate-logoPop"
          />
        </div>
      )}
    
      <div className="relative h-screen w-screen bg-[#C1E3E1] overflow-hidden">
        {/* Grid overlay*/}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            backgroundImage: "url('/assets/grid.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "contain",
            opacity: 0.2,
          }}
        />

        {/* Logo centered to full layout */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <img
            src="/assets/logo.png"
            alt="shn's Platz"
            className="opacity-15 w-3/4 max-w-2xl"
          />
        </div>

        {/* Main layout grid */}
        <div className="relative z-30 h-full w-full grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] text-[#36312C]">
          {/* Sidebar */}
          <aside className="flex flex-col gap-8 items-center justify-start py-8 px-3">
            <button className="w-40 h-30 hover:bg-[#F9F2E4] rounded-xl p-2 transition flex items-center justify-center">
              <img src="/assets/folder_icon.png" alt="Projects" className="w-full" />
            </button>
            <button className="w-40 h-30 hover:bg-[#F9F2E4] rounded-xl p-2 transition flex items-center justify-center">
              <img src="/assets/about_icon.png" alt="About Me" className="w-full" />
            </button>
            <button className="w-40 h-30 hover:bg-[#F9F2E4] rounded-xl p-2 transition flex items-center justify-center">
              <img src="/assets/contact_icon.png" alt="Contact Me" className="w-full" />
            </button>
          </aside>

          {/* Main content */}
          <main className="relative"></main>

          {/* Footer */}
          <footer className="col-span-2 bg-[#7F9795] border-t-[4px] border-[#36312C] px-4 py-3 flex justify-between items-center text-[#F9F2E4] text-sm">
            <div className="rounded-full w-12 h-12 bg-[#F9F2E4] border border-[#36312C]"></div>
            <div className="flex gap-6 items-center">
              <img src="/assets/battery_icon.png" className="w-8" />
              <img src="/assets/wifi_icon.png" className="w-6" />
              <TimeDisplay />
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}
