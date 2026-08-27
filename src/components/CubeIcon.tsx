'use client';
import React from 'react';

type Props = {
  icon: { src: string; label: string };
  isActive: boolean;
  onClick: () => void;
  // Carries the caller's own classes: `group` enables the desktop hover flip,
  // responsive utilities decide which of the two copies is visible.
  wrapCls: string;
};

export default function CubeIcon({ icon, isActive, onClick, wrapCls }: Props) {
  return (
    <div
      className={`${wrapCls} cube-wrapper-sm ${isActive ? 'flipped' : ''}`}
      onClick={onClick}
    >
      <div className="cube-inner-sm">
        <div className="cube-face-sm cube-front-sm">
          <img
            src={icon.src}
            alt={icon.label}
            className="w-7 h-7 object-contain"
          />
        </div>
        <div className="cube-face-sm cube-back-sm">
          {icon.label}
        </div>
      </div>
    </div>
  );
}
