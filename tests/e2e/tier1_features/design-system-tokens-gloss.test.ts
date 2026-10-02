/* ═══════════════════════════════════════════════════════════════════════════
   AEROSYNERGY ULTRA 365 ✨ CLOUD BUBBLE EDITION
   Frutiger Aero Design System & Gloss Recipes Conformance Test (§7.1, §7.2, §7.4)
   Authored by: Dr. Glossandra Luminara 🌈✨ (Glossmaster)
   ═══════════════════════════════════════════════════════════════════════════ */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Frutiger Aero Design System: tokens.css (§7.1)', () => {
  const tokensPath = path.resolve(__dirname, '../../../src/styles/tokens.css');
  const tokensContent = fs.readFileSync(tokensPath, 'utf-8');

  // Exact 27 canonical tokens per §7.1 and survey_design_testing.md
  const canonical27 = [
    { token: '--sky-deep', expected: '#0B4F8A' },
    { token: '--sky-morning', expected: '#1E90D6' },
    { token: '--sky-clear', expected: '#4FC3F7' },
    { token: '--sky-horizon', expected: '#A6E1FF' },
    { token: '--sky-dawn', expected: '#E3F6FF' },
    { token: '--aqua-bright', expected: '#00C8E6' },
    { token: '--aqua-glow', expected: '#5EE7FF' },
    { token: '--aqua-mist', expected: '#B3F0FF' },
    { token: '--glass-white', expected: 'rgba(255, 255, 255, 0.55)' },
    { token: '--glass-frost', expected: 'rgba(235, 248, 255, 0.75)' },
    { token: '--glass-rim', expected: 'rgba(255, 255, 255, 0.85)' },
    { token: '--chrome-light', expected: '#E8F0F5' },
    { token: '--chrome-mid', expected: '#AFC3CE' },
    { token: '--chrome-deep', expected: '#6D8391' },
    { token: '--lime-fresh', expected: '#7BE05A' },
    { token: '--grass-meadow', expected: '#3D9B32' },
    { token: '--leaf-shadow', expected: '#1F5C1F' },
    { token: '--sunset-amber', expected: '#FFB55C' },
    { token: '--sunset-coral', expected: '#FF8A70' },
    { token: '--sunset-lavender', expected: '#C6A5F2' },
    { token: '--aurora-1', expected: '#35E0C8' },
    { token: '--aurora-2', expected: '#57B9FF' },
    { token: '--aurora-3', expected: '#A18CFF' },
    { token: '--text-primary', expected: '#0A2A43' },
    { token: '--text-on-glass', expected: '#0A2A43' },
    { token: '--text-muted', expected: '#3E6B8C' },
    { token: '--scrim', expected: 'rgba(10, 42, 67, 0.35)' },
  ];

  it('defines all 27 canonical tokens per §7.1 with exact values', () => {
    for (const { token, expected } of canonical27) {
      expect(
        tokensContent.includes(token),
        `Expected tokens.css to contain token ${token}`
      ).toBe(true);

      expect(
        tokensContent.toLowerCase().includes(expected.toLowerCase()),
        `Expected tokens.css to contain value ${expected} for ${token}`
      ).toBe(true);
    }
  });

  it('defines motion tokens and keyframe animations per §7.4', () => {
    expect(tokensContent).toContain('--dur-fast');
    expect(tokensContent).toContain('--dur-med');
    expect(tokensContent).toContain('--dur-slow');
    expect(tokensContent).toContain('--ease-bubble');
    expect(tokensContent).toContain('@keyframes bubble-float');
    expect(tokensContent).toContain('@keyframes ripple-on-click');
    expect(tokensContent).toContain('@keyframes shimmer-sweep');
  });

  it('defines typography and radii tokens per §7.1 and §7.6', () => {
    expect(tokensContent).toContain('--radius-pill');
    expect(tokensContent).toContain('--radius-panel');
    expect(tokensContent).toContain('--radius-card');
    expect(tokensContent).toContain('--font-display');
    expect(tokensContent).toContain('Nunito');
    expect(tokensContent).toContain('--font-body');
    expect(tokensContent).toContain('Open Sans');
  });
});

describe('Frutiger Aero Gloss Recipes: gloss.css (§7.2, §7.4, §16)', () => {
  const glossPath = path.resolve(__dirname, '../../../src/styles/gloss.css');
  const glossContent = fs.readFileSync(glossPath, 'utf-8');

  it('declares the 5 core canonical gloss classes per §7.2', () => {
    expect(glossContent).toContain('.gloss-orb');
    expect(glossContent).toContain('.glass-panel');
    expect(glossContent).toContain('.chrome-text');
    expect(glossContent).toContain('.floor-reflect');
    expect(glossContent).toContain('.drop-badge');
  });

  it('includes specular highlight pseudo-elements (.gloss-orb::after, .drop-badge::after)', () => {
    expect(glossContent).toContain('.gloss-orb::after');
    expect(glossContent).toContain('.drop-badge::after');
  });

  it('includes accessibility focus rings and Calm Waters overrides per §4.5.6, §16', () => {
    expect(glossContent).toContain(':focus-visible');
    expect(glossContent).toContain('--aqua-glow');
    expect(glossContent).toContain('.calm-waters');
    expect(glossContent).toContain('@media (prefers-reduced-motion: reduce)');
    expect(glossContent).toContain('animation-duration: 0.001ms');
  });
});
