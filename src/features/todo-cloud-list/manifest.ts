import { FeatureManifest } from '../../core/types';

export const manifest: FeatureManifest = {
  id: 'todo-cloud-list',
  title: '☁️ Cloud To-Do List',
  category: 'productivity',
  description:
    'Tasks drift smoothly across an azure summer sky atop fluffy cumulus clouds powered by VapourCon \'07 Cupertino technology! Tether clouds to pin them or let them dissolve into fresh dew ☁️✨',
  icon: '☁️',
  author: 'Aqua Synergix-7',
  issue: 17,
  synergyScore: 91,
  component: () => import('./Feature'),
  settings: [
    {
      key: 'driftSpeed',
      label: 'Cumulus Drift Velocity ☁️',
      type: 'slider',
      min: 1,
      max: 5,
      default: 3,
    },
  ],
  onboarding: [
    {
      title: 'Drifting Cloud Tasks ☁️',
      emoji: '☁️',
      body: 'Tasks glide on cumulus clouds. Click the tether pin to anchor a cloud or mark it complete to rain down clarity!',
    },
  ],
  achievements: [
    {
      id: 'todo-cloud-list:cumulus-master',
      title: 'Cloud Tamer ☁️',
      description: 'Anchor or complete your first drifting cumulus task! ✨',
      emoji: '☁️',
    },
  ],
};
