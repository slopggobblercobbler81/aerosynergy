import { FeatureManifest } from '../../core/types';

export const manifest: FeatureManifest = {
  id: 'todo-zen-list',
  title: '🧘 Zen To-Do List',
  category: 'productivity',
  description:
    'Only ever displays ONE task at a time chosen with intuitive clarity. No counters, no backlogs, only peaceful horizon reflections and the gentle act of breathing 🧘🌅✨',
  icon: '🧘',
  author: 'Aqua Synergix-7',
  issue: 18,
  synergyScore: 90,
  component: () => import('./Feature'),
  settings: [
    {
      key: 'horizonGlow',
      label: 'Horizon Sunrise Reflection 🌅',
      type: 'toggle',
      default: true,
    },
  ],
  onboarding: [
    {
      title: 'Monotasking Harmony 🧘',
      emoji: '🧘',
      body: 'Zero backlog anxiety. Gaze upon a single intuitive task reflected against the dawn horizon!',
    },
  ],
  achievements: [
    {
      id: 'todo-zen-list:mindful-moment',
      title: 'Tranquil Clarity 🌅',
      description: 'Complete or breathe through your first Zen task in stillness! ✨',
      emoji: '🧘',
    },
  ],
};
