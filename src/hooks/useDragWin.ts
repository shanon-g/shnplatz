'use client';

import React, { RefObject, useRef } from 'react';
import { clamp } from '@/lib/clamp';

type WinRef = RefObject<HTMLDivElement | null>;

// Drags an overlay window by writing left/top straight to the DOM, so dragging
// never re-renders. Handlers live in refs to keep add/remove listener pairs stable.
export function useDragWin() {
  const pos = useRef({ x: 0, y: 0 });
  const offset = useRef({ x: 0, y: 0 });
  const size = useRef({ w: 0, h: 0 });

  // Windows are centred with -translate-*-1/2, so style.left is not the visual
  // left edge. Measured once per drag, this is the gap between the two.
  const shift = useRef({ x: 0, y: 0 });

  const activeRef = useRef<WinRef | null>(null);

  const onMove = useRef((e: PointerEvent) => {
    const ref = activeRef.current;
    if (!ref || !ref.current) return;

    e.preventDefault();

    const dx = e.clientX - pos.current.x;
    const dy = e.clientY - pos.current.y;

    // Keep the visible box inside the viewport. When a window is larger than
    // the viewport, min > max and clamp pins it to the top/left edge.
    const minX = -shift.current.x;
    const maxX = window.innerWidth - size.current.w - shift.current.x;
    const minY = -shift.current.y;
    const maxY = window.innerHeight - size.current.h - shift.current.y;

    ref.current.style.left = `${clamp(offset.current.x + dx, minX, maxX)}px`;
    ref.current.style.top = `${clamp(offset.current.y + dy, minY, maxY)}px`;
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

    const rect = elem.getBoundingClientRect();

    activeRef.current = ref;
    pos.current = { x: e.clientX, y: e.clientY };
    offset.current = { x: elem.offsetLeft, y: elem.offsetTop };
    size.current = { w: rect.width, h: rect.height };
    shift.current = { x: rect.left - elem.offsetLeft, y: rect.top - elem.offsetTop };

    // Pointer events unify touch/mouse; pointercancel is the mobile safety net.
    document.addEventListener('pointermove', onMove.current);
    document.addEventListener('pointerup', onUp.current);
    document.addEventListener('pointercancel', onUp.current);
  };
}
