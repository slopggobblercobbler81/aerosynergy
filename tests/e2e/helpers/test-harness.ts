import { vi } from 'vitest';

export type FeatureCategory =
  | 'productivity'
  | 'wellness'
  | 'ai-insights'
  | 'gadgets'
  | 'media-ambience'
  | 'gamification'
  | 'personalization'
  | 'lore-easter-eggs'
  | 'meta'
  | 'synergy';

export interface FeatureSetting {
  key: string;
  label: string;
  type: 'toggle' | 'slider' | 'select';
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  default?: unknown;
}

export interface OnboardingStep {
  title: string;
  body: string;
  emoji: string;
  optionalDemo?: () => void;
}

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  emoji: string;
}

export interface FeatureProps {
  ns: {
    get<T>(key: string, fallback: T): T;
    set(key: string, value: unknown): void;
    remove(key: string): void;
    list(): string[];
  };
  toast: (msg: string, kind?: 'info' | 'success' | 'party') => void;
  sound: (name: 'bloop' | 'chime' | 'droplet' | 'sparkle' | 'whoosh') => void;
  award: (achievementId: string) => void;
  mascot: {
    say: (mood?: 'happy' | 'proud' | 'supportive' | 'hydrating') => string;
    image: (mood?: 'happy' | 'proud' | 'supportive' | 'hydrating') => string;
  };
  theme: Record<string, string>;
  hush: boolean;
  calm: boolean;
  close: () => void;
}

export interface FeatureManifest {
  id: string;
  title: string;
  category: FeatureCategory;
  description: string;
  icon: string;
  author: string;
  issue: number;
  redundantWith?: string[];
  synergyScore: number;
  component: () => Promise<{ default: React.ComponentType<FeatureProps> }>;
  settings?: FeatureSetting[];
  onboarding?: OnboardingStep[];
  achievements?: AchievementDef[];
}

export const CANONICAL_THEME_TOKENS: Record<string, string> = {
  '--sky-deep': '#0B4F8A',
  '--sky-morning': '#1E90D6',
  '--sky-clear': '#4FC3F7',
  '--sky-horizon': '#A6E1FF',
  '--sky-dawn': '#E3F6FF',
  '--aqua-bright': '#00C8E6',
  '--aqua-glow': '#5EE7FF',
  '--aqua-mist': '#B3F0FF',
  '--glass-white': 'rgba(255,255,255,0.55)',
  '--glass-frost': 'rgba(235,248,255,0.75)',
  '--glass-rim': 'rgba(255,255,255,0.85)',
  '--chrome-light': '#E8F0F5',
  '--chrome-mid': '#AFC3CE',
  '--chrome-deep': '#6D8391',
  '--lime-fresh': '#7BE05A',
  '--grass-meadow': '#3D9B32',
  '--leaf-shadow': '#1F5C1F',
  '--sunset-amber': '#FFB55C',
  '--sunset-coral': '#FF8A70',
  '--sunset-lavender': '#C6A5F2',
  '--aurora-1': '#35E0C8',
  '--aurora-2': '#57B9FF',
  '--aurora-3': '#A18CFF',
  '--text-primary': '#0A2A43',
  '--text-on-glass': '#0A2A43',
  '--text-muted': '#3E6B8C',
  '--scrim': 'rgba(10,42,67,0.35)',
  '--shadow-soft': 'rgba(11,79,138,0.25)',
};

export const CANONICAL_CATEGORIES: FeatureCategory[] = [
  'productivity',
  'wellness',
  'ai-insights',
  'gadgets',
  'media-ambience',
  'gamification',
  'personalization',
  'lore-easter-eggs',
  'meta',
  'synergy',
];

export function createMockStorage(featureId: string) {
  const prefix = `as365:${featureId}:`;
  return {
    get<T>(key: string, fallback: T): T {
      try {
        const raw = localStorage.getItem(prefix + key);
        if (raw === null || raw === undefined) return fallback;
        return JSON.parse(raw) as T;
      } catch {
        return fallback;
      }
    },
    set(key: string, value: unknown): void {
      try {
        localStorage.setItem(prefix + key, JSON.stringify(value));
      } catch (e) {
        // graceful handle QuotaExceeded
      }
    },
    remove(key: string): void {
      localStorage.removeItem(prefix + key);
    },
    list(): string[] {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(prefix)) {
          keys.push(k.slice(prefix.length));
        }
      }
      return keys;
    },
  };
}

export function createTestFeatureProps(
  featureId: string,
  overrides: Partial<FeatureProps> = {}
): FeatureProps & {
  mockToast: ReturnType<typeof vi.fn>;
  mockSound: ReturnType<typeof vi.fn>;
  mockAward: ReturnType<typeof vi.fn>;
  mockClose: ReturnType<typeof vi.fn>;
} {
  const mockToast = vi.fn();
  const mockSound = vi.fn();
  const mockAward = vi.fn();
  const mockClose = vi.fn();

  const props: FeatureProps = {
    ns: createMockStorage(featureId),
    toast: mockToast,
    sound: mockSound,
    award: mockAward,
    mascot: {
      say: vi.fn((mood?: string) => {
        if (mood === 'hydrating') return 'Hydration check! Have you had water? No pressure. Some pressure. 💙';
        if (mood === 'proud') return 'Wow! Amazing! Incredible! Those are just three of the words for you!';
        if (mood === 'supportive') return 'Every bubble pops, but YOU? You rise. 🫧✨';
        return "You've got this! I'm 94% water and 100% sure! 💧";
      }),
      image: vi.fn(() => 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%2300C8E6"/></svg>'),
    },
    theme: { ...CANONICAL_THEME_TOKENS },
    hush: false,
    calm: false,
    close: mockClose,
    ...overrides,
  };

  return {
    ...props,
    mockToast,
    mockSound,
    mockAward,
    mockClose,
  };
}
