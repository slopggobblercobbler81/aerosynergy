// Test Utilities per §6.4 & §14.2
import { FeatureProps } from './types';
import { getNamespace } from './storage/storage';
import { mascot } from './mascot';

export function stubProps(featureId: string, overrides: Partial<FeatureProps> = {}): FeatureProps {
  const ns = getNamespace(`test-${featureId}`);

  return {
    ns,
    toast: () => {},
    sound: () => {},
    award: () => {},
    mascot: {
      say: (mood) => mascot.say(mood as any),
      image: (mood) => mascot.image(mood as any),
    },
    theme: {
      '--sky-deep': '#0B4F8A',
      '--aqua-bright': '#00C8E6',
      '--glass-white': 'rgba(255, 255, 255, 0.55)',
    },
    hush: false,
    calm: false,
    close: () => {},
    ...overrides,
  };
}