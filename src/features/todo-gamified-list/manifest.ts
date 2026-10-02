import { FeatureManifest } from '../../core/types';

export const manifest: FeatureManifest = {
  id: 'todo-gamified-list',
  title: '🎮 Quest To-Do List',
  category: 'productivity',
  description:
    'Turn daily chores into legendary Frutiger Aero RPG quests! Slay procrastination dragons, earn +25 XP per victory, cheer on a tiny rowing team on the XP river, and honor fellow features 🎮🚣🌊✨',
  icon: '🎮',
  author: 'Aqua Synergix-7',
  issue: 20,
  synergyScore: 96,
  component: () => import('./Feature'),
  settings: [
    {
      key: 'soundFanfare',
      label: 'Level-Up Fanfare 🎺',
      type: 'toggle',
      default: true,
    },
  ],
  onboarding: [
    {
      title: 'Heroic Productivity Quests 🎮',
      emoji: '🎮',
      body: 'Embark on heroic quests with real XP levels, quest cards, and a cheerful rowing team guiding your momentum!',
    },
  ],
  achievements: [
    {
      id: 'todo-gamified-list:hero-level',
      title: 'Aero Quest Hero 🏆',
      description: 'Reach Hero Level 2 by completing legendary quests! 🎮✨',
      emoji: '🏆',
    },
  ],
};
