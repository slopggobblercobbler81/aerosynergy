import { FeatureManifest } from '../../core/types';

export const manifest: FeatureManifest = {
  id: 'todo-dont-list',
  title: '🚫 To-Don\'t List',
  category: 'productivity',
  description:
    'Turn procrastination on its head! Log anti-goals, conquer temptations with delightfully wobbling buttons, and bask in overwhelmingly supportive praise from our AI champions 🚫💙🤸✨',
  icon: '🚫',
  author: 'Aqua Synergix-7',
  issue: 21,
  synergyScore: 93,
  component: () => import('./Feature'),
  settings: [
    {
      key: 'wobbleIntensity',
      label: 'Button Wobble Intensity 🤸',
      type: 'slider',
      min: 1,
      max: 5,
      default: 3,
    },
  ],
  onboarding: [
    {
      title: 'The Art of Avoidance 🚫',
      emoji: '🚫',
      body: 'Celebrate everything you deliberately chose NOT to do today. True peace is what you decline!',
    },
  ],
  achievements: [
    {
      id: 'todo-dont-list:master-resister',
      title: 'Resilient Champion 🛡️',
      description: 'Successfully avoid 5 unproductive distractions! 🚫✨',
      emoji: '🛡️',
    },
  ],
};
