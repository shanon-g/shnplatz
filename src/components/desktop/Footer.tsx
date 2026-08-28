'use client';

import { useEffect, useRef } from 'react';
import TimeDisp from '@/components/TimeDisp';

interface Props {
  onCloseAll: () => void;
}

export default function Footer({ onCloseAll }: Props) {
  const barRef = useRef<HTMLElement | null>(null);

  // Publish the measured height so the airdrop landing point and the fun-fact
  // spawn point can track the real footer instead of hardcoded offsets.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const publish = () => {
      document.documentElement.style.setProperty('--footer-h', `${bar.offsetHeight}px`);
    };

    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(bar);

    return () => ro.disconnect();
  }, []);

  return (
    <footer
      ref={barRef}
      className="opacity-95 z-[200] col-span-2 bg-[#7F9795] border-t-[4px] border-[#36312C] px-4 py-3 flex justify-between items-center text-[#F9F2E4] text-sm relative"
    >
      <div className="relative flex items-center">

        {/* Circle Button*/}
        <button
          onClick={onCloseAll}
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
  );
}
