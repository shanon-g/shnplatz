'use client';
import React from 'react';

type CubeIconProps = {
  icon: { src: string; label: string };
  isActive: boolean;
  onClick: () => void;
};

export default function CubeIcon({ icon, isActive, onClick }: CubeIconProps) {
  return (
    <div
      className={`group cube-wrapper-sm ${isActive ? 'flipped' : ''}`}
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
