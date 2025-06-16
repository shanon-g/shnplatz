'use client';
import React, { useEffect, RefObject, Dispatch, SetStateAction, useState } from 'react';
import { getNextZIndex } from '../utils/zIdxManager';

interface Props {
  onClose: () => void;
  contactRef: RefObject<HTMLDivElement | null>;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  setShowContact: Dispatch<SetStateAction<boolean>>;
}


export default function ContactOverlay({
  onClose,
  contactRef,
  onMouseDown,
  setShowContact,
}: Props) {

    const [isClosing, setIsClosing] = useState(false);
    const [zIndex, setZIndex] = useState(40);
    
      useEffect(() => {
        // bring to top on open
        setZIndex(getNextZIndex());
      }, []);
    
      const bringToFront = () => {
        setZIndex(getNextZIndex());
      };

    const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
        setShowContact(false);
        setIsClosing(false);
    }, 300);
    };

  return (
    <div
      ref={contactRef}
      onMouseDown={bringToFront} // bring to front on any click
      style={{ zIndex }}
      className="fixed z-100 flex items-center justify-center w-[90%] max-w-4xl h-[500px] 
                left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className={`relative h-full w-full ${isClosing ? 'dockDown' : 'dockUp'}`}>
        <div className="absolute -bottom-3 -right-3 w-full h-full rounded-xl bg-[#36312C] z-0" />
        <div className="bg-[#F9F2E4] border-[6px] border-[#36312C] rounded-xl h-full flex flex-col relative z-10">
          {/* Top Bar */}
          <div
            onMouseDown={(e) => {
              onMouseDown(e);
              bringToFront();
            }}
            className="flex items-center justify-center gap-2 bg-[#a4e2a0] border-b-[4px] border-[#36312C] px-4 py-2 cursor-move rounded-t-xl text-center relative"
          >
            <img src="/assets/logo.png" alt="logo" className="absolute left-4 w-13 h-13" />
            <span className="font-bold text-center w-full pulse-glow">Contact Me</span>
            <div className="absolute right-4 flex gap-2">
              <button
                onClick={handleClose}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F9F2E4] border-[3.5px] border-[#36312C] text-[#36312C] text-base font-extrabold hover:bg-[#757ed3] transition-colors duration-200"
              >
                −
              </button>
              <button
                onClick={handleClose}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F9F2E4] border-[3.5px] border-[#36312C] text-[#36312C] text-base font-extrabold hover:bg-[#c4576e] transition-colors duration-200"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Contact Buttons Section */}
          <div className="px-14 py-10 flex flex-wrap justify-center items-center gap-14 overflow-y-auto max-h-full">
            {[
              { href: 'https://github.com/shanon-g', icon: '/assets/github_icon.png', label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/shanon-giuly-istanto/', icon: '/assets/linkedin_icon.png', label: 'LinkedIn' },
              { href: 'https://discord.com/users/551231698046812160', icon: '/assets/discord_icon.png', label: 'Discord' },
              { href: 'https://www.instagram.com/shanon_g.i/', icon: '/assets/instagram_icon.png', label: 'Instagram' },
              { href: 'https://x.com/shannn_tw9', icon: '/assets/x_icon.png', label: 'Twitter/X' },
              { href: 'https://www.youtube.com/@shn.mp4', icon: '/assets/youtube_icon.png', label: 'YouTube' }
            ].map((item, idx) => (
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
                <span className="absolute inset-0 bg-[#36312C] border-[5px] border-[#36312C] rounded-2xl translate-y-[10px] translate-x-[10px] z-0 transition-all group-hover:translate-y-[4px] group-active:translate-y-[4px]" />

                {/* Icon Button */}
                <span className="
                  relative inline-flex items-center justify-center px-10 py-10 border-[5px] border-[#36312C] rounded-2xl 
                  bg-[#F9F2E4] text-[#36312C] text-4xl transition-transform duration-200 ease-in-out 
                  group-hover:-translate-y-[10px] group-active:translate-y-[0px]
                  group-hover:-translate-x-[4px] group-active:translate-x-[0px] z-10">
                  <img src={item.icon} alt={item.label} className="w-16 h-16" />
                </span>

                {/* Hover Label */}
                <span className="absolute left-1/2 top-full mt-3 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[#36312C] font-bold text-base text-center">
                  {item.label}
                </span>
              </span>
            ))}
          </div>



        </div>
      </div>
    </div>
  );
}
