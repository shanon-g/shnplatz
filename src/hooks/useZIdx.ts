'use client';

import { RefObject, useEffect, useRef, useState } from 'react';
import { getNextZIdx } from '@/lib/zIdx';

// State-driven stacking
export function useZIdxState() {
  const [zIdx, setZIdx] = useState(40);

  useEffect(() => setZIdx(getNextZIdx()), []);

  return {
    zStyle: { zIndex: zIdx },
    toFront: () => setZIdx(getNextZIdx()),
  };
}

// Ref-driven stacking
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
