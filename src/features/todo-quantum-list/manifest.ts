import { FeatureManifest } from '../../core/types';

export const manifest: FeatureManifest = {
  id: 'todo-quantum-list',
  title: '⚛️ Quantum To-Do List',
  category: 'productivity',
  description:
    'Tasks exist in a shimmering quantum superposition of both done and not done until observed! Collapse wave functions with iridescent sparkle sounds and cultivate botanical clarity 🌿✨',
  icon: '⚛️',
  author: 'Aqua Synergix-7',
  issue: 12,
  synergyScore: 95,
  component: () => import('./Feature'),
  settings: [
    {
      key: 'collapseProbability',
      label: 'Done Probability Bias (%)',
      type: 'slider',
      min: 50,
      max: 95,
      default: 70,
    },
  ],
  onboarding: [
    {
      title: 'Quantum Superposition ⚛️',
      emoji: '⚛️',
      body: 'Tasks are neither complete nor pending until your conscious gaze observes them into reality!',
    },
  ],
  achievements: [
    {
      id: 'todo-quantum-list:wave-collapse',
      title: 'Observer Effect 👁️',
      description: 'Observe and collapse your first quantum task! ⚛️✨',
      emoji: '⚛️',
    },
  ],
};
