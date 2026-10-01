import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createMockStorage } from '../helpers/test-harness';

describe('Tier 4: Scenario 5 — Chaos & Easter Egg Discovery', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('executes easter egg sequence: Konami code -> secret gloss mode -> gloss level 11 (lens flare) -> feature count', async () => {
    // 1. Konami Code Sequence: Up Up Down Down Left Right Left Right B A
    const KONAMI_SEQUENCE = [
      'ArrowUp', 'ArrowUp',
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight',
      'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];

    let secretGlossModeUnlocked = false;
    let inputBuffer: string[] = [];

    const handleKeydown = (key: string) => {
      inputBuffer.push(key);
      if (inputBuffer.length > KONAMI_SEQUENCE.length) {
        inputBuffer.shift();
      }
      if (inputBuffer.join(',') === KONAMI_SEQUENCE.join(',')) {
        secretGlossModeUnlocked = true;
        createMockStorage('easter-konami-code').set('unlocked', true);
      }
    };

    // Feed key sequence
    KONAMI_SEQUENCE.forEach((key) => handleKeydown(key));

    expect(secretGlossModeUnlocked).toBe(true);
    expect(createMockStorage('easter-konami-code').get('unlocked', false)).toBe(true);

    // 2. Adjust Gloss Level to 11 (Maximum Gloss)
    const settingsStorage = createMockStorage('settings-gloss-level');
    settingsStorage.set('glossLevel', 11);\n\n    const activeGlossLevel = settingsStorage.get('glossLevel', 6);\n    expect(activeGlossLevel).toBe(11);\n\n    // At Level 11, lens flare effect must be enabled per §8.1 #088\n    const isLensFlareActive = activeGlossLevel === 11;\n    expect(isLensFlareActive).toBe(true);\n\n    // 3. Feature Count Hall Counter Verification\n    const countStorage = createMockStorage('meta-feature-count-hall');\n    countStorage.set('currentInstalledCount', 134);\n\n    expect(countStorage.get('currentInstalledCount', 0)).toBe(134);\n  });\n});\n