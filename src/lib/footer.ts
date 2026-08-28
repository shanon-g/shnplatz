const FALLBACK_H = 66;

// Reads the height Footer.tsx publishes on :root. Falls back to the CSS default
// if it is read before the footer has measured itself.
export function getFooterH() {
  if (typeof window === 'undefined') return FALLBACK_H;

  const raw = getComputedStyle(document.documentElement).getPropertyValue('--footer-h');
  const h = parseFloat(raw);

  return Number.isFinite(h) && h > 0 ? h : FALLBACK_H;
}

// Viewport y of the footer's top edge — where airdrops land and fun facts spawn.
export function getFooterTop() {
  return window.innerHeight - getFooterH();
}
