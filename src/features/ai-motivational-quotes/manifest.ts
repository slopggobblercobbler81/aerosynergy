import { FeatureManifest } from '../../core/types';

export const manifest: FeatureManifest = {
  id: 'ai-motivational-quotes',
  title: '🌟 Motivational Quote Generator',
  category: 'ai-insights',
  description:
    'An infinite fountain of sparkling, procedural affirmations crafted with high-gloss mad-libs elegance. Lift your spirits and sparkle through the day 🌟💙',
  icon: '🌟',
  author: 'Misty Halcyon',
  issue: 33,
  synergyScore: 91,
  component: () => import('./Feature'),
  settings: [
    {
      key: 'vibeLevel',
      label: 'Affirmation Intensity Level',
      type: 'slider',
      min: 1,
      max: 10,
      default: 8,
    },
  ],
  onboarding: [
    {
      title: 'Endless Affirmations 🌟',
      emoji: '🌟',
      body: 'Whenever you need a boost of sunlight through glass, generate an original quote.',
    },
  ],
  achievements: [
    {
      id: 'ai-motivational-quotes:sparkle-shared',
      title: 'Radiant Herald',
      description: 'Copied an inspirational quote to your clipboard to spread the light! 🌟',
      emoji: '🌟',
    },
  ],
};
