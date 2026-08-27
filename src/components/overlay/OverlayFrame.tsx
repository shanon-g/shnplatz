'use client';

import React, { CSSProperties, ReactNode, RefObject } from 'react';

interface Props {
  winRef: RefObject<HTMLDivElement | null>;
  zStyle: CSSProperties;
  toFront: () => void;
  onBarPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  onClose: () => void;
  title: string;
  isClosing: boolean;
  outerCls: string;
  stageCls: string;
  panelCls: string;
  barBg: string;
  children: ReactNode;
  overlayExtra?: ReactNode;
}

// Shared retro window chrome: offset shadow, dock in/out animation, and the
// draggable title bar with its minimize / close buttons.
export default function OverlayFrame({
  winRef,
  zStyle,
  toFront,
  onBarPointerDown,
  onClose,
  title,
  isClosing,
  outerCls,
  stageCls,
  panelCls,
  barBg,
  children,
  overlayExtra,
}: Props) {
  return (
    <div
      ref={winRef}
      onPointerDownCapture={toFront} // bring to front on any click
      onTouchStartCapture={toFront}  // bring to front on any click
      style={zStyle}
      className={outerCls}
    >
      <div className={`${stageCls} ${isClosing ? 'dockDown' : 'dockUp'}`}>
        <div className="absolute -bottom-3 -right-3 w-full h-full rounded-xl bg-[#36312C] z-0" />
        <div className={panelCls}>
          {/* Top Bar */}
          <div
            onPointerDown={(e) => {
              onBarPointerDown(e);
              toFront();
            }}
            className={`touch-none flex items-center justify-center gap-2 ${barBg} border-b-[4px] border-[#36312C] px-4 py-2 cursor-move rounded-t-xl text-center relative`}
          >
            <img src="/assets/logo.png" alt="logo" className="absolute left-4 w-13 h-13" />
            <span className="font-bold text-center w-full pulse-glow">{title}</span>
            <div className="absolute right-4 flex gap-2">
              <button
                onClick={onClose}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F9F2E4] border-[3.5px] border-[#36312C] text-[#36312C] text-base font-extrabold hover:bg-[#757ed3] transition-colors duration-200"
              >
                −
              </button>
              <button
                onClick={onClose}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F9F2E4] border-[3.5px] border-[#36312C] text-[#36312C] text-base font-extrabold hover:bg-[#c4576e] transition-colors duration-200"
              >
                ✕
              </button>
            </div>
          </div>

          {children}
        </div>
      </div>

      {overlayExtra}
    </div>
  );
}
