import React from 'react';

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
  id: string; // e.g. 'wellness-hydration-orb-3:big-sip'
  title: string;
  description: string;
  emoji: string;
}

export interface FeatureStorage {
  get<T>(key: string, fallback: T): T;
  set(key: string, value: unknown): void;
  remove(key: string): void;
  list(): string[];
}

export interface FeatureProps {
  ns: FeatureStorage;
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