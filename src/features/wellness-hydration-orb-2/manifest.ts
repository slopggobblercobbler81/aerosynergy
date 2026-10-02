import { FeatureManifest } from '../../core/types';

export const manifest: FeatureManifest = {
  id: 'wellness-hydration-orb-2',
  title: '💧💧 Hydration Orb 2: Wet Harder',
  category: 'wellness',
  description:
    'Why settle for one sphere when two can oscillate in synchronized aquatic harmony? Dual glowing orbs for primary and reserve hydration! Wet harder, live glossier 🌊💙',
  icon: '💧',
  author: 'Misty Halcyon',
  issue: 18,
  redundantWith: ['wellness-hydration-orb'],
  synergyScore: 92,
  component: () => import('./Feature'),
  settings: [
    {
      key: 'reserveRatio',
      label: 'Reserve Chamber Capacity %',
      type: 'slider',
      min: 20,
      max: 80,
      default: 50,
    },
  ],
  onboarding: [
    {
      title: 'Dual-Chamber Hydration 🌊',
      emoji: '🌊',
      body: 'Experience the power of tandem moisture tracking. Two orbs, zero dehydration.',
    },
  ],
  achievements: [
    {
      id: 'wellness-hydration-orb-2:twin-flow',
      title: 'Twin Tide Synchronized',
      description: 'Balanced your primary and reserve hydration chambers! 🌊',
      emoji: '🌊',
    },
  ],
};
