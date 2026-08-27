'use client';

import React, { Dispatch, RefObject, SetStateAction } from 'react';
import { useOverlayClose } from '@/hooks/useOverlayClose';
import { useZIdxState } from '@/hooks/useZIdx';
import OverlayFrame from './OverlayFrame';

interface Props {
  winRef: RefObject<HTMLDivElement | null>;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const SOCIALS = [
  { href: 'https://github.com/shanon-g', icon: '/assets/github_icon.png', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/shanon-giuly-istanto/', icon: '/assets/linkedin_icon.png', label: 'LinkedIn' },
  { href: 'https://discord.com/users/551231698046812160', icon: '/assets/discord_icon.png', label: 'Discord' },
  { href: 'https://www.instagram.com/shanon_g.i/', icon: '/assets/instagram_icon.png', label: 'Instagram' },
  { href: 'https://x.com/shannn_tw9', icon: '/assets/x_icon.png', label: 'Twitter/X' },
  { href: 'https://www.youtube.com/@shn.mp4', icon: '/assets/youtube_icon.png', label: 'YouTube' }
];

export default function CtcOverlay({ winRef, onPointerDown, setShow }: Props) {
  const { isClosing, close } = useOverlayClose(setShow);
  const { zStyle, toFront } = useZIdxState();

  return (
    <OverlayFrame
      winRef={winRef}
      zStyle={zStyle}
      toFront={toFront}
      onBarPointerDown={onPointerDown}
      onClose={close}
      title="Contact Me"
      isClosing={isClosing}
      outerCls="fixed z-100 flex items-center justify-center w-[90%] max-w-4xl h-[500px]
                left-1/2 top-[46%] transform -translate-x-1/2 -translate-y-1/2"
      stageCls="relative h-full w-full"
      panelCls="bg-[#F9F2E4] border-[6px] border-[#36312C] rounded-xl h-full flex flex-col relative z-10"
      barBg="bg-[#a4e2a0]"
    >
      {/* Contact Buttons Section */}
      <div className="px-6 py-8 sm:px-14 sm:py-10 flex flex-wrap justify-center items-center gap-x-6 gap-y-10 sm:gap-14 overflow-y-auto max-h-full">
        {SOCIALS.map((item, idx) => (
          <span
            key={idx}
            onClick={() => {
              setTimeout(() => {
                window.open(item.href, '_blank');
              }, 600);
            }}
            className="relative group inline-block cursor-pointer border-none outline-none bg-transparent p-0"
          >
            {/* Shadow Layer */}
            <span className="absolute inset-0 bg-[#36312C] border-[3px] sm:border-[5px] border-[#36312C] rounded-xl sm:rounded-2xl translate-y-[6px] translate-x-[6px] sm:translate-y-[10px] sm:translate-x-[10px] z-0 transition-all group-hover:translate-y-[3px] group-active:translate-y-[3px]" />

            {/* Icon Button */}
            <span className="
              relative inline-flex items-center justify-center p-8 sm:px-10 sm:py-10 border-[3px] sm:border-[5px] border-[#36312C] rounded-xl sm:rounded-2xl
              bg-[#F9F2E4] text-[#36312C] transition-transform duration-200 ease-in-out
              group-hover:-translate-y-[6px] sm:group-hover:-translate-y-[10px] group-active:translate-y-[0px]
              group-hover:-translate-x-[2px] sm:group-hover:-translate-x-[4px] group-active:translate-x-[0px] z-10">
              <img src={item.icon} alt={item.label} className="w-10 h-10 sm:w-16 sm:h-16" />
            </span>

            {/* Hover Label (Always visible on mobile, hover on desktop) */}
            <span className="absolute left-1/2 top-full mt-2 sm:mt-3 -translate-x-1/2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-[#36312C] font-bold text-xs sm:text-base text-center whitespace-nowrap pointer-events-none">
              {item.label}
            </span>
          </span>
        ))}
      </div>
    </OverlayFrame>
  );
}
