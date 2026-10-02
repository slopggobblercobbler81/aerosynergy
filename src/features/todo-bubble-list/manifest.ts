import { FeatureManifest } from '../../core/types';

export const manifest: FeatureManifest = {
  id: 'todo-bubble-list',
  title: '🫧 Bubble To-Do List',
  category: 'productivity',
  description:
    'Every task floats inside an iridescent Frutiger Aero bubble! Complete tasks by popping them into refreshing crystal water droplets with celebratory physics and Dewey in a top hat 🎩🫧✨',
  icon: '🫧',
  author: 'Aqua Synergix-7',
  issue: 15,
  synergyScore: 94,
  component: () => import('./Feature'),
  settings: [
    {
      key: 'bubbleShine',
      label: 'Bubble Specular Glow ✨',
      type: 'toggle',
      default: true,
    },
  ],
  onboarding: [
    {
      title: 'Tactile Bubble Popping 🫧',
      emoji: '🫧',
      body: 'Tasks float in buoyant Aero bubbles. Click any bubble to pop it and release pure aquatic satisfaction!',
    },
  ],
  achievements: [
    {
      id: 'todo-bubble-list:first-pop',
      title: 'Master Bubble Popper 🫧',
      description: 'Pop your very first task bubble! 🌊✨',
      emoji: '🫧',
    },
  ],
};
