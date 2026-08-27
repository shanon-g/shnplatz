'use client';

import React, { RefObject, useRef } from 'react';

type WinRef = RefObject<HTMLDivElement | null>;

// Drags an overlay window by writing left/top straight to the DOM, so dragging
// never re-renders. Handlers live in refs to keep add/remove listener pairs stable.
export function useDragWin() {
  const pos = useRef({ x: 0, y: 0 });
  const offset = useRef({ x: 0, y: 0 });
  const activeRef = useRef<WinRef | null>(null);

  const onMove = useRef((e: PointerEvent) => {
    const ref = activeRef.current;
    if (!ref || !ref.current) return;

    e.preventDefault();

    const dx = e.clientX - pos.current.x;
    const dy = e.clientY - pos.current.y;
    ref.current.style.left = `${offset.current.x + dx}px`;
    ref.current.style.top = `${offset.current.y + dy}px`;
  });

  const onUp = useRef(() => {
    document.removeEventListener('pointermove', onMove.current);
    document.removeEventListener('pointerup', onUp.current);
    document.removeEventListener('pointercancel', onUp.current);
    activeRef.current = null;
  });

  return (e: React.PointerEvent<HTMLDivElement>, ref: WinRef) => {
    const elem = ref.current;
    if (!elem) return;

    activeRef.current = ref;
    pos.current = { x: e.clientX, y: e.clientY };
    offset.current = { x: elem.offsetLeft, y: elem.offsetTop };

    // Pointer events unify touch/mouse; pointercancel is the mobile safety net.
    document.addEventListener('pointermove', onMove.current);
    document.addEventListener('pointerup', onUp.current);
    document.addEventListener('pointercancel', onUp.current);
  };
}
