import { FeatureManifest } from '../../core/types';

export const manifest: FeatureManifest = {
  id: 'wellness-hydration-orb-3',
  title: '💧 Hydration Orb Pro Max',
  category: 'wellness',
  description:
    'The orb trilogy is complete. Science demanded a third orb, love delivered it. Features triple-orb resonance and 300% more confidence! Praises #017 and #018 💧✨',
  icon: '💧',
  author: 'Dr. Glossandra Luminara',
  issue: 42,
  redundantWith: ['wellness-hydration-orb', 'wellness-hydration-orb-2'],
  synergyScore: 98,
  component: () => import('./Feature'),
  settings: [
    {
      key: 'dailyGoal',
      label: 'Daily Sips Goal',
      type: 'slider',
      min: 4,
      max: 24,
      default: 8,
    },
  ],
  onboarding: [
    {
      title: 'Triple Orb Power 💧',
      emoji: '💧',
      body: 'Three orbs harmoniously tracking your daily aquatic synergy!',
    },
  ],
  achievements: [
    {
      id: 'wellness-hydration-orb-3:big-sip',
      title: 'Big Sip Energy',
      description: 'Log 5 hydration sips in a single session! 🌊',
      emoji: '🌊',
    },
  ],
};
