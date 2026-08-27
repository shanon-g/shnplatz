'use client';

import { RefObject, useEffect, useRef, useState } from 'react';
import { getNextZIdx } from '@/lib/zIdx';

// State-driven stacking: re-renders the overlay when it is brought to front.
export function useZIdxState() {
  const [zIdx, setZIdx] = useState(40);

  useEffect(() => setZIdx(getNextZIdx()), []);

  return {
    zStyle: { zIndex: zIdx },
    toFront: () => setZIdx(getNextZIdx()),
  };
}

// Ref-driven stacking: writes z-index straight to the DOM so bring-to-front
// never re-renders. Used where re-rendering mid-touch caused issues on mobile.
export function useZIdxRef(ref: RefObject<HTMLDivElement | null>) {
  const zIdxRef = useRef(40);

  useEffect(() => {
    const next = getNextZIdx();
    zIdxRef.current = next;
    if (ref.current) ref.current.style.zIndex = String(next);
  }, [ref]);

  const toFront = () => {
    const next = getNextZIdx();
    zIdxRef.current = next;
    if (ref.current) ref.current.style.zIndex = String(next);
  };

  return {
    zStyle: { zIndex: zIdxRef.current },
    toFront,
  };
}
