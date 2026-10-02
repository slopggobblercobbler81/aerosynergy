import { FeatureManifest } from '../../core/types';

export const manifest: FeatureManifest = {
  id: 'todo-classic-list',
  title: '☑️ Classic To-Do List',
  category: 'productivity',
  description:
    'A to-do list so classic it predates the concept of doing. Built with ultra-glossy checkmarks, crystalline chimes, and a cheerful dolphin companion cheering your every victory! 🐬✨',
  icon: '☑️',
  author: 'Aqua Synergix-7',
  issue: 10,
  synergyScore: 92,
  component: () => import('./Feature'),
  settings: [
    {
      key: 'showDolphinCheer',
      label: 'Dolphin Cheer Mode 🐬',
      type: 'toggle',
      default: true,
    },
  ],
  onboarding: [
    {
      title: 'Tactile Simplicity ✨',
      emoji: '☑️',
      body: 'Check off tasks with crisp Frutiger Aero chimes and zero cognitive drag!',
    },
  ],
  achievements: [
    {
      id: 'todo-classic-list:first-done',
      title: 'First Aero Victory 🏆',
      description: 'Check off your first classic to-do item! ✨',
      emoji: '🌟',
    },
  ],
};
