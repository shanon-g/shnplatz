'use client';

import { useEffect, useState } from 'react';

export default function TimeDisplay() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null; // ⛔ prevent hydration mismatch

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-GB');

  return (
    <div
      className="text-right leading-tight text-sm font-semibold"
      style={{
        color: '#F9F2E4',
        textShadow: '1px 1px 0 #36312C, -1px 1px 0 #36312C, 1px -1px 0 #36312C, -1px -1px 0 #36312C',
      }}
    >
      <div>{formatTime(time)}</div>
      <div>{formatDate(time)}</div>
    </div>
  );
}
