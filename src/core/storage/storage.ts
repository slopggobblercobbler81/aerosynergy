import { FeatureStorage } from '../types';

// In-memory fallback if localStorage is unavailable
const memoryFallback = new Map<string, string>();

function safeGetItem(k: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(k);
    }
  } catch (err) {
    // In restricted iframe or storage disabled
  }
  return memoryFallback.get(k) ?? null;
}

function safeSetItem(k: string, v: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(k, v);
      return;
    }
  } catch (err) {
    console.warn(`[AeroStorage] Storage set failed for ${k}:`, err);
  }
  memoryFallback.set(k, v);
}

function safeRemoveItem(k: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(k);
      return;
    }
  } catch (err) {
    // Ignore
  }
  memoryFallback.delete(k);
}

function safeGetKeys(): string[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const keys: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key) keys.push(key);
      }
      return keys;
    }
  } catch (err) {
    // Ignore
  }
  return Array.from(memoryFallback.keys());
}

export function getNamespace(featureId: string): FeatureStorage {
  const prefix = `as365:${featureId}:`;

  return {
    get<T>(key: string, fallback: T): T {
      const raw = safeGetItem(prefix + key);
      if (raw === null || raw === undefined) {
        return fallback;
      }
      try {
        return JSON.parse(raw) as T;
      } catch (err) {
        console.warn(`[AeroStorage] Corrupted data at ${prefix + key}, returning fallback.`, err);
        return fallback;
      }
    },

    set(key: string, value: unknown): void {
      try {
        const serialized = JSON.stringify(value);
        safeSetItem(prefix + key, serialized);
      } catch (err) {
        console.warn(`[AeroStorage] Failed to store ${prefix + key}:`, err);
      }
    },

    remove(key: string): void {
      safeRemoveItem(prefix + key);
    },

    list(): string[] {
      const keys = safeGetKeys();
      return keys
        .filter((k) => k.startsWith(prefix))
        .map((k) => k.slice(prefix.length));
    },
  };
}