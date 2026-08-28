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
