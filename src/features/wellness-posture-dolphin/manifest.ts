import { FeatureManifest } from '../../core/types';

export const manifest: FeatureManifest = {
  id: 'wellness-posture-dolphin',
  title: '🐬 Posture Dolphin',
  category: 'wellness',
  description:
    'Your loyal cetacean ergonomic guardian! Periodically arches into majestic posture, reminding you to uncurl your spine and align with the horizon 🐬✨',
  icon: '🐬',
  author: 'Misty Halcyon',
  issue: 21,
  synergyScore: 88,
  component: () => import('./Feature'),
  settings: [
    {
      key: 'checkInterval',
      label: 'Posture Check Interval (min)',
      type: 'slider',
      min: 15,
      max: 60,
      default: 30,
    },
  ],
  onboarding: [
    {
      title: 'Ergonomic Cetacean 🐬',
      emoji: '🐬',
      body: 'Dewey and the Posture Dolphin ensure your spine stays as majestic as an ocean leap.',
    },
  ],
  achievements: [
    {
      id: 'wellness-posture-dolphin:spine-aligned',
      title: 'Majestic Vertebrae',
      description: 'Achieved textbook dolphin posture alignment! 🐬',
      emoji: '🐬',
    },
  ],
};
