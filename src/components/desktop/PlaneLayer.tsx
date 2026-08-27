'use client';

import React, { useEffect, useRef, useState } from 'react';
import { pullFunFact, spawnFactText } from '@/lib/funfact';

type Airdrop = { x: number; y: number; id: number };

export default function PlaneLayer() {
  const [showPlane, setShowPlane] = useState(false);
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
  const [planeClickable, setPlaneClickable] = useState(true);

  const factBagRef = useRef<number[]>([]);

  // Spawn plane every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setShowPlane(true);
      setPlaneClickable(true);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const hndlPlaneClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!planeClickable) return;

    setPlaneClickable(false);

    const rect = e.currentTarget.getBoundingClientRect();
    const dropX = rect.left + rect.width / 2;
    const dropY = window.innerHeight * 0.11;

    setAirdrops((prev) => [...prev, { x: dropX, y: dropY, id: Date.now() }]);
  };

  const hndlDropEnd = (drop: Airdrop) => {
    spawnFactText(drop.x, pullFunFact(factBagRef.current));
    setAirdrops((prev) => prev.filter((d) => d.id !== drop.id));
  };

  return (
    <>
      {showPlane && (
        <img
          src="/assets/plane.png"
          className="plane"
          onAnimationEnd={() => setShowPlane(false)}
          onClick={hndlPlaneClick}
          alt="Plane"
        />
      )}

      {airdrops.map((drop) => (
        <div
          key={drop.id}
          className="airdrop"
          style={{ left: drop.x, top: drop.y }}
          onAnimationEnd={() => hndlDropEnd(drop)}
        >
          <img src="/assets/airdrop.png" alt="Airdrop" style={{ width: '100%' }} />
        </div>
      ))}
    </>
  );
}
