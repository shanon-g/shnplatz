import { funFacts } from '@/data/funfacts';

// Shuffle-bag: refills and reshuffles once empty, so every fact shows before any repeats.
export function pullFunFact(bag: number[]) {
  if (bag.length === 0) {
    const idxs = funFacts.map((_, i) => i);

    // Fisher-Yates
    for (let i = idxs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
    }
    bag.push(...idxs);
  }

  return funFacts[bag.pop()!];
}

export function spawnFactText(x: number, text: string) {
  const el = document.createElement('div');
  el.className = 'explosion-text';
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `calc(100vh - 120px)`; // sync with footer height

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 8000);
}
