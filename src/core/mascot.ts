// Dewey Character API per §3.7, §6.3

export type MascotMood = 'happy' | 'proud' | 'supportive' | 'hydrating' | 'popped';

const deweyPhrases: Record<MascotMood, string[]> = {
  happy: [
    "You've got this! I'm 94% water and 100% sure! 💧",
    'Wow! Amazing! Incredible! Those are just three of the words for you! ✨',
    'I believe in you more than I believe in gradients, and I REALLY believe in gradients. 🌈',
    'Bloop bloop! Another glorious wave of productivity! 🌊',
    'Every bubble pops, but YOU? You rise. 🫧✨',
  ],
  proud: [
    'Look at you go! A true titan of glassy focus! 🏆',
    'The dolphins in sector 7 are cheering for you! 🐬✨',
    "I'm not crying, that's just condensation from pure pride! 💧🥹",
    'Your synergy metrics just broke the needle in the best way possible! 📈💎',
  ],
  supportive: [
    'Take a deep breath. Even the biggest waves start as ripples. 🌊',
    "It's okay to rest your bubbles. Even orbs take a breather. 🫧",
    "No pressure! Some pressure? Only atmospheric pressure! You're doing splendidly. 💙",
    'Remember: Progress is made one droplet at a time. 💧',
  ],
  hydrating: [
    'Hydration check! Have you had water? No pressure. Some pressure. 💧',
    'Sip alert! Your cells deserve a crisp splash of aquatic synergy! 🥤',
    'Drink water! Your brain is mostly water, and water loves company! 🌊',
    'A sip for you, a splash for Dewey! Cheers! 💧✨',
  ],
  popped: [
    '🫧 Oops! That bubble got a little too excited. Let us give it another go! 🔄',
    'Don’t worry! We are 94% water and 100% resilient! ✨',
    'Just a momentary wave wobble! The sea is calm again. 🌊',
  ],
};

function generateDeweySvgDataUri(mood: MascotMood): string {
  const mouth =
    mood === 'popped'
      ? '<path d="M42 76 Q50 71 58 76" stroke="%230A2A43" stroke-width="2.5" stroke-linecap="round" fill="none"/>'
      : '<path d="M41 72 Q50 81 59 72" stroke="%230A2A43" stroke-width="2.5" stroke-linecap="round" fill="none"/>';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <radialGradient id="g" cx="40%" cy="35%" r="60%">
        <stop offset="0%" stop-color="%23A6E1FF"/>
        <stop offset="75%" stop-color="%231E90D6"/>
        <stop offset="100%" stop-color="%230B4F8A"/>
      </radialGradient>
    </defs>
    <path d="M50 8 C50 8 18 52 18 70 C18 86.5 32.3 95 50 95 C67.7 95 82 86.5 82 70 C82 52 50 8 50 8 Z" fill="url(%23g)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
    <ellipse cx="40" cy="62" rx="5" ry="7" fill="%230A2A43"/>
    <ellipse cx="60" cy="62" rx="5" ry="7" fill="%230A2A43"/>
    <circle cx="38" cy="59" r="2" fill="%23FFFFFF"/>
    <circle cx="58" cy="59" r="2" fill="%23FFFFFF"/>
    ${mouth}
    <circle cx="32" cy="68" r="4" fill="%23FF8A70" opacity="0.5"/>
    <circle cx="68" cy="68" r="4" fill="%23FF8A70" opacity="0.5"/>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const mascot = {
  say(mood: MascotMood = 'happy'): string {
    const list = deweyPhrases[mood] || deweyPhrases.happy;
    const idx = Math.floor(Math.random() * list.length);
    return list[idx];
  },

  image(mood: MascotMood = 'happy'): string {
    return generateDeweySvgDataUri(mood);
  },
};