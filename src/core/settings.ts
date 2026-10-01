// Global Settings & Declarative Feature Settings Store per §4.5.4, §6.3
import { FeatureSetting } from './types';
import { getNamespace } from './storage/storage';
import { setMasterMute } from './audio';
import { setHushMode, setCalmWatersMode } from './toast';

const SHELL_SETTINGS_KEY = 'as365:shell:global_settings';

export interface GlobalSettingsState {
  muteSounds: boolean;
  calmWaters: boolean;
  hushMode: boolean;
  glossLevel: number; // 1 to 11
  theme: 'day' | 'dusk';
}

function loadInitialSettings(): GlobalSettingsState {
  let prefersReducedMotion = false;
  try {
    if (typeof window !== 'undefined' && window.matchMedia) {
      prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  } catch (e) {}

  const defaults: GlobalSettingsState = {
    muteSounds: false,
    calmWaters: prefersReducedMotion,
    hushMode: false,
    glossLevel: 9,
    theme: 'day',
  };

  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(SHELL_SETTINGS_KEY);
      if (raw) {
        return { ...defaults, ...JSON.parse(raw) };
      }
    }
  } catch (err) {}

  return defaults;
}

let currentSettings: GlobalSettingsState = loadInitialSettings();
const listeners = new Set<(settings: GlobalSettingsState) => void>();

// Apply initial audio & toast flags
setMasterMute(currentSettings.muteSounds);
setHushMode(currentSettings.hushMode);
setCalmWatersMode(currentSettings.calmWaters);

export function getGlobalSettings(): GlobalSettingsState {
  return { ...currentSettings };
}

export function updateGlobalSettings(patch: Partial<GlobalSettingsState>): void {
  currentSettings = { ...currentSettings, ...patch };

  if (patch.muteSounds !== undefined) {
    setMasterMute(patch.muteSounds);
  }
  if (patch.hushMode !== undefined) {
    setHushMode(patch.hushMode);
  }
  if (patch.calmWaters !== undefined) {
    setCalmWatersMode(patch.calmWaters);
  }

  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(SHELL_SETTINGS_KEY, JSON.stringify(currentSettings));
    }
  } catch (err) {}

  listeners.forEach((fn) => fn(currentSettings));
}

export function subscribeGlobalSettings(fn: (settings: GlobalSettingsState) => void): () => void {
  listeners.add(fn);
  fn(currentSettings);
  return () => {
    listeners.delete(fn);
  };
}

// Declarative feature setting helper
export function updateFeatureSetting(featureId: string, setting: FeatureSetting, value: unknown): void {
  const ns = getNamespace(featureId);
  ns.set(setting.key, value);
}

export function getFeatureSettingValue<T>(featureId: string, setting: FeatureSetting): T {
  const ns = getNamespace(featureId);
  return ns.get<T>(setting.key, setting.default as T);
}