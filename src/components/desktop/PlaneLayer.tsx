'use client';

import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { getFooterTop } from '@/lib/footer';
import { pullFunFact } from '@/lib/funfact';

// Matches `.airdrop { width: 50px }` in globals.css; the sprite is square.
const AIRDROP_SIZE = 50;
const FACT_LIFETIME = 8000;

type Airdrop = { x: number; y: number; dist: number; id: number };
type Fact = { x: number; y: number; text: string; id: number };

export default function PlaneLayer() {
  const [showPlane, setShowPlane] = useState(false);
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
  const [facts, setFacts] = useState<Fact[]>([]);
  const [planeClickable, setPlaneClickable] = useState(true);

  const factBagRef = useRef<number[]>([]);
  const factTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Spawn plane every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setShowPlane(true);
      setPlaneClickable(true);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timers = factTimersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const hndlPlaneClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!planeClickable) return;

    setPlaneClickable(false);

    const rect = e.currentTarget.getBoundingClientRect();
    const dropX = rect.left + rect.width / 2;
    const dropY = window.innerHeight * 0.11;

    // Land the airdrop's bottom edge exactly on the footer's top edge.
    const dist = getFooterTop() - dropY - AIRDROP_SIZE;

    setAirdrops((prev) => [...prev, { x: dropX, y: dropY, dist, id: Date.now() }]);
  };

  const hndlDropEnd = (drop: Airdrop) => {
    const fact: Fact = {
      x: drop.x,
      y: getFooterTop(),
      text: pullFunFact(factBagRef.current),
      id: drop.id
    };

    setFacts((prev) => [...prev, fact]);
    setAirdrops((prev) => prev.filter((d) => d.id !== drop.id));

    const timer = setTimeout(() => {
      setFacts((prev) => prev.filter((f) => f.id !== fact.id));
      factTimersRef.current = factTimersRef.current.filter((t) => t !== timer);
    }, FACT_LIFETIME);

    factTimersRef.current.push(timer);
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
          style={{ left: drop.x, top: drop.y, '--drop-dist': `${drop.dist}px` } as CSSProperties}
          onAnimationEnd={() => hndlDropEnd(drop)}
        >
          <img src="/assets/airdrop.png" alt="Airdrop" style={{ width: '100%' }} />
        </div>
      ))}

      {/* Rendered here rather than on document.body so the fun-fact text shares
          a stacking context with the overlays and can never paint above them. */}
      {facts.map((fact) => (
        <div key={fact.id} className="explosion-text" style={{ left: fact.x, top: fact.y }}>
          {fact.text}
        </div>
      ))}
    </>
  );
}
