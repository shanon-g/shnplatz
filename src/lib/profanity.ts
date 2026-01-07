import { Profanity } from '@2toad/profanity';

// Default list is decent; you can extend with local slang if needed.
const profanity = new Profanity({
  // You can add custom words:
  // customWords: ['word1', 'word2'],
  // or remove false positives:
  // whitelist: ['assess']
});

export function hasProfanity(input: string): boolean {
  // Normalize to reduce bypass attempts (simple version)
  const normalized = input
    .normalize('NFKC')
    .replace(/\s+/g, ' ')
    .trim();

  return profanity.exists(normalized);
}
