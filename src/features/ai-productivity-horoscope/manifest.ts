import { FeatureManifest } from '../../core/types';

export const manifest: FeatureManifest = {
  id: 'ai-productivity-horoscope',
  title: '♈ Productivity Horoscope',
  category: 'ai-insights',
  description:
    'Daily celestial task alignment governed by the stars of Frutiger Aero! Deterministically maps your Zodiac and Aero Ascendants to optimal workflow velocity 🔮✨',
  icon: '🔮',
  author: 'Misty Halcyon',
  issue: 32,
  synergyScore: 94,
  component: () => import('./Feature'),
  settings: [
    {
      key: 'defaultSign',
      label: 'Your Aero Ascendant',
      type: 'select',
      options: [
        { value: 'Aquarius', label: 'Aquarius (Water Bearer) 💧' },
        { value: 'Pisces', label: 'Pisces (Chrome Dolphins) 🐬' },
        { value: 'Aries', label: 'Aries (Aqua Ram) 🌊' },
        { value: 'Taurus', label: 'Taurus (Glass Bull) 💎' },
        { value: 'Gemini', label: 'Gemini (Twin Bubbles) 🫧' },
        { value: 'Cancer', label: 'Cancer (Pearl Crab) 🦀' },
        { value: 'Leo', label: 'Leo (Solar Flare) ☀️' },
        { value: 'Virgo', label: 'Virgo (Crystal Meadow) 🌿' },
        { value: 'Libra', label: 'Libra (Prism Scales) ⚖️' },
        { value: 'Scorpio', label: 'Scorpio (Tide Scorpion) 🦂' },
        { value: 'Sagittarius', label: 'Sagittarius (Sky Archer) 🏹' },
        { value: 'Capricorn', label: 'Capricorn (Sea Goat) 🐐' },
      ],
      default: 'Aquarius',
    },
  ],
  onboarding: [
    {
      title: 'Celestial Productivity 🔮',
      emoji: '🔮',
      body: 'Consult the optimistic stars of AeroSynergy to divine your daily synergy flow.',
    },
  ],
  achievements: [
    {
      id: 'ai-productivity-horoscope:stars-aligned',
      title: 'Celestial Harmony',
      description: 'Aligned your daily task forecast with the Frutiger constellations! 🔮',
      emoji: '⭐',
    },
  ],
};
