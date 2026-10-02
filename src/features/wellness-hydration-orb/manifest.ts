import { FeatureManifest } from '../../core/types';

export const manifest: FeatureManifest = {
  id: 'wellness-hydration-orb',
  title: '💧 Hydration Orb',
  category: 'wellness',
  description:
    'The primordial, crystal-pure hydration companion that started the movement. A single radiant glass sphere tracking daily water intake with crystalline caustics and supportive vibes! 💧✨',
  icon: '💧',
  author: 'Misty Halcyon',
  issue: 17,
  synergyScore: 82,
  component: () => import('./Feature'),
  settings: [
    {
      key: 'dailyGoal',
      label: 'Daily Sips Goal',
      type: 'slider',
      min: 4,
      max: 20,
      default: 8,
    },
  ],
  onboarding: [
    {
      title: 'The Primordial Orb 💧',
      emoji: '💧',
      body: 'A single luminous glass sphere tracking your hydration journey with pure Frutiger Aero joy.',
    },
  ],
  achievements: [
    {
      id: 'wellness-hydration-orb:first-sip',
      title: 'First Droplet of Joy',
      description: 'Logged your very first sip into the primordial orb! 💧',
      emoji: '💧',
    },
  ],
};
