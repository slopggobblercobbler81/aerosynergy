import { FeatureManifest } from '../../core/types';

export const manifest: FeatureManifest = {
  id: 'wellness-breathing-bubble',
  title: '🫧 Breathing Bubble',
  category: 'wellness',
  description:
    'An iridescent living bubble that expands and contracts in mindful harmony with your breath. Inhale clarity, exhale tension across serene azure tides 🌬️🫧',
  icon: '🫧',
  author: 'Misty Halcyon',
  issue: 20,
  synergyScore: 89,
  component: () => import('./Feature'),
  settings: [
    {
      key: 'breathTechnique',
      label: 'Breathing Pattern',
      type: 'select',
      options: [
        { value: 'relax', label: 'Relaxation (4-7-8) 🌊' },
        { value: 'box', label: 'Box Breathing (4-4-4-4) 🧊' },
      ],
      default: 'relax',
    },
  ],
  onboarding: [
    {
      title: 'Breathe with the Bubble 🫧',
      emoji: '🫧',
      body: 'Follow the gentle expansion of the iridescent glass bubble to center your mind.',
    },
  ],
  achievements: [
    {
      id: 'wellness-breathing-bubble:deep-breath',
      title: 'Zen Wave Rider',
      description: 'Completed a full cycle of mindful bubble breathing! 🫧',
      emoji: '🧘',
    },
  ],
};
