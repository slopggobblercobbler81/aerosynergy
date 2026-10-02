/* ═══════════════════════════════════════════════════════════════════════════
   AEROSYNERGY ULTRA 365 ✨ CLOUD BUBBLE EDITION
   Frutiger Aero In-Repo SVG Icon Library Test (§7.6)
   Authored by: Dr. Glossandra Luminara 🌈✨ (Glossmaster)
   ═══════════════════════════════════════════════════════════════════════════ */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import {
  AeroLogoIcon,
  DeweyIcon,
  DolphinIcon,
  FishIcon,
  ButterflyIcon,
  ProductivityIcon,
  WellnessIcon,
  CreativityIcon,
  SynergyIcon,
  UtilityIcon,
  LoreIcon,
  SettingsIcon,
  FolderIcon,
  StarIcon,
  SearchIcon,
  CloseIcon,
  MinimizeIcon,
  MaximizeIcon,
  VolumeIcon,
  MuteIcon,
  CalmWatersIcon,
  SparkleIcon,
  CloudBubbleIcon,
  BubbleIcon,
  ConfettiIcon,
  CATEGORY_ICONS,
  AERO_ICONS,
} from '../../../src/styles/icons';

describe('Frutiger Aero SVG Icon Library (§7.6)', () => {
  it('renders the official AeroLogoIcon with gradients and specular highlights', () => {
    const { container } = render(<AeroLogoIcon size={64} />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('width')).toBe('64');
    expect(svg?.getAttribute('height')).toBe('64');
    expect(svg?.getAttribute('viewBox')).toBe('0 0 100 100');
  });

  it('renders DeweyIcon across all canonical moods', () => {
    const moods = ['happy', 'proud', 'supportive', 'hydrating', 'popped', 'sad'] as const;
    for (const mood of moods) {
      const { container } = render(<DeweyIcon mood={mood} size={48} />);
      const svg = container.querySelector('svg');
      expect(svg).not.toBeNull();
      expect(container.innerHTML).toContain('deweyGrad');
    }
  });

  it('renders animal companion icons (Dolphin, Fish, Butterfly)', () => {
    const { container: c1 } = render(<DolphinIcon size={32} />);
    expect(c1.querySelector('svg')).not.toBeNull();

    const { container: c2 } = render(<FishIcon size={28} />);
    expect(c2.querySelector('svg')).not.toBeNull();

    const { container: c3 } = render(<ButterflyIcon size={28} />);
    expect(c3.querySelector('svg')).not.toBeNull();
  });

  it('renders all category icons', () => {
    const categoryComponents = [
      ProductivityIcon,
      WellnessIcon,
      CreativityIcon,
      SynergyIcon,
      UtilityIcon,
      LoreIcon,
      SettingsIcon,
    ];

    for (const Comp of categoryComponents) {
      const { container } = render(<Comp size={32} />);
      const svg = container.querySelector('svg');
      expect(svg).not.toBeNull();
      expect(svg?.getAttribute('viewBox')).toBe('0 0 32 32');
    }
  });

  it('renders all UI control icons', () => {
    const uiIcons = [
      FolderIcon,
      StarIcon,
      SearchIcon,
      CloseIcon,
      MinimizeIcon,
      MaximizeIcon,
      VolumeIcon,
      MuteIcon,
      CalmWatersIcon,
      SparkleIcon,
      CloudBubbleIcon,
      BubbleIcon,
      ConfettiIcon,
    ];

    for (const Comp of uiIcons) {
      const { container } = render(<Comp size={24} />);
      expect(container.querySelector('svg')).not.toBeNull();
    }
  });

  it('provides category icon lookup registry', () => {
    expect(CATEGORY_ICONS.productivity).toBe(ProductivityIcon);
    expect(CATEGORY_ICONS.wellness).toBe(WellnessIcon);
    expect(CATEGORY_ICONS.creativity).toBe(CreativityIcon);
    expect(CATEGORY_ICONS.synergy).toBe(SynergyIcon);
    expect(CATEGORY_ICONS.settings).toBe(SettingsIcon);
    expect(Object.keys(AERO_ICONS).length).toBeGreaterThanOrEqual(20);
  });
});
