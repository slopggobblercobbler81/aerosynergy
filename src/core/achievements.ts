// Achievements and XP Engine per §4.5, §6.3, §9 #075
import { AchievementDef } from './types';
import { showToast } from './toast';
import { playSound } from './audio';

const STORAGE_KEY_XP = 'as365:core:xp';
const STORAGE_KEY_AWARDS = 'as365:core:unlocked_achievements';

const registeredDefs = new Map<string, AchievementDef>();
const listeners = new Set<() => void>();

function safeLoadUnlocked(): Set<string> {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(STORAGE_KEY_AWARDS);
      if (raw) return new Set(JSON.parse(raw));
    }
  } catch (err) {}
  return new Set();
}

function safeSaveUnlocked(unlocked: Set<string>): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY_AWARDS, JSON.stringify(Array.from(unlocked)));
    }
  } catch (err) {}
}

function safeLoadXp(): number {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(STORAGE_KEY_XP);
      if (raw) return parseInt(raw, 10) || 0;
    }
  } catch (err) {}
  return 0;
}

function safeSaveXp(xp: number): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY_XP, xp.toString());
    }
  } catch (err) {}
}

let unlockedAchievements = safeLoadUnlocked();
let totalXp = safeLoadXp();

export function registerAchievement(def: AchievementDef): void {
  registeredDefs.set(def.id, def);
}

export function registerAchievements(defs: AchievementDef[]): void {
  defs.forEach(registerAchievement);
}

export function getUnlockedAchievements(): string[] {
  return Array.from(unlockedAchievements);
}

export function getXp(): number {
  return totalXp;
}

export function award(achievementId: string, calmWaters: boolean = false): void {
  if (unlockedAchievements.has(achievementId)) {
    return; // Already awarded
  }

  unlockedAchievements.add(achievementId);
  totalXp += 50;

  safeSaveUnlocked(unlockedAchievements);
  safeSaveXp(totalXp);

  const def = registeredDefs.get(achievementId) || {
    id: achievementId,
    title: achievementId.split(':').pop() || 'Achievement Unlocked',
    description: 'You did something wonderfully buoyant!',
    emoji: '🏆',
  };

  // Play chime and trigger party toast
  playSound('chime');
  showToast(`🎉 Achievement Unlocked: ${def.emoji} ${def.title}! (+50 XP)`, 'party');

  // Trigger confetti if available and not in calm waters
  if (!calmWaters && typeof window !== 'undefined') {
    import('canvas-confetti')
      .then((confettiModule) => {
        const confetti: any = (confettiModule as any).default || confettiModule;
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#5EE7FF', '#1E90D6', '#7BE05A', '#FFB55C', '#A18CFF'],
        });
      })
      .catch(() => {});
  }

  listeners.forEach((fn) => fn());
}

export function subscribeAchievements(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}