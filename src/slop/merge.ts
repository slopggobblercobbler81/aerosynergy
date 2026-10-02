// Fake AI Phrase Bank Merger & Generator Engine per §4.1.9, §4.2, §8

// Seeded PRNG using mulberry32
export function createRng(seed: number | string) {
  let s = typeof seed === 'string'
    ? Array.from(seed).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 123456789)
    : seed;

  return function next(): number {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Vite glob import of all phrase banks
const phraseFiles = ((import.meta as any).glob('/src/slop/phrases/*.json', {
  eager: true,
  import: 'default',
}) || {}) as Record<string, string[]>;

const mergedBanks: Record<string, string[]> = {};

for (const [path, content] of Object.entries(phraseFiles)) {
  const bankName = path.split('/').pop()?.replace('.json', '') || 'unknown';
  if (Array.isArray(content)) {
    mergedBanks[bankName] = content;
  }
}

function pickRandom<T>(list: T[] | undefined, rng?: () => number): T {
  if (!list || list.length === 0) return '' as unknown as T;
  const rand = rng ? rng() : Math.random();
  const index = Math.floor(rand * list.length);
  return list[index];
}

export function getAllPhraseBanks(): Record<string, string[]> {
  return mergedBanks;
}

export function getBuzzword(count: number = 1, rng?: () => number): string[] {
  const words = mergedBanks['buzzwords'] || [];
  const results: string[] = [];
  for (let i = 0; i < count; i++) {
    results.push(pickRandom(words, rng));
  }
  return results;
}

export function composePepTalk(seed?: string): string {
  const rng = seed ? createRng(seed) : undefined;
  const opener = pickRandom(mergedBanks['openers'], rng);
  const hedge = pickRandom(mergedBanks['hedges'], rng);
  const closer = pickRandom(mergedBanks['closers'], rng);
  const metric = pickRandom(mergedBanks['fake-metrics'], rng);

  return `${opener} ${hedge} Our forecast: ${metric} ${closer}`;
}

export function getHoroscope(date: Date = new Date()): string {
  // Deterministic seed based on YYYY-MM-DD
  const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const rng = createRng(dateKey);

  const opener = pickRandom(mergedBanks['openers'], rng);
  const buzz1 = pickRandom(mergedBanks['buzzwords'], rng);
  const buzz2 = pickRandom(mergedBanks['buzzwords'], rng);
  const hedge = pickRandom(mergedBanks['hedges'], rng);
  const closer = pickRandom(mergedBanks['closers'], rng);

  return `${opener} Today your celestial alignments encourage you to ${buzz1} your daily flow. ${hedge} Expect to ${buzz2} seamlessly. ${closer}`;
}

export function getSynergyInsight(seed?: string): string {
  const rng = seed ? createRng(seed) : undefined;
  const buzz = pickRandom(mergedBanks['buzzwords'], rng);
  const metric = pickRandom(mergedBanks['fake-metrics'], rng);
  const hedge = pickRandom(mergedBanks['hedges'], rng);

  return `💎 Synergy Insight: When you ${buzz} with intention, ${metric.toLowerCase()} ${hedge}`;
}

export function getRandomCelebration(): string {
  return pickRandom(mergedBanks['over-celebration']);
}

export function getRandomPromisedFuture(): string {
  return pickRandom(mergedBanks['promised-future']);
}

export function getRandomMetric(): string {
  return pickRandom(mergedBanks['fake-metrics']);
}
