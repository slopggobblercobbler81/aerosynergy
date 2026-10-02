/* ═══════════════════════════════════════════════════════════════════════════
   AEROSYNERGY ULTRA 365 ✨ CLOUD BUBBLE EDITION
   Sky Gradient Engine per §7.3
   Authored by: Dr. Glossandra Luminara 🌈✨ (Glossmaster)
   ═══════════════════════════════════════════════════════════════════════════ */

import React, { useMemo } from 'react';

export type SkyTimeState = 'dawn' | 'day' | 'dusk' | 'night' | 'auto';

export interface SkyGradientProps {
  timeState?: SkyTimeState;
  calm?: boolean;
}

export const SkyGradient: React.FC<SkyGradientProps> = ({
  timeState = 'auto',
  calm = false,
}) => {
  const resolvedState = useMemo<Exclude<SkyTimeState, 'auto'>>(() => {
    if (timeState !== 'auto') return timeState;
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 8) return 'dawn';
    if (hour >= 8 && hour < 18) return 'day';
    if (hour >= 18 && hour < 21) return 'dusk';
    return 'night';
  }, [timeState]);

  const gradient = useMemo(() => {
    switch (resolvedState) {
      case 'dawn':
        return 'linear-gradient(180deg, #FFB55C 0%, #FF8A70 25%, #C6A5F2 60%, #E3F6FF 100%)';
      case 'dusk':
        return 'linear-gradient(180deg, #1A2A6C 0%, #B21F1F 50%, #FDBB2D 100%)';
      case 'night':
        return 'linear-gradient(180deg, #051026 0%, #0B2545 40%, #134074 75%, #00C8E6 100%)';
      case 'day':
      default:
        return 'linear-gradient(180deg, #0B4F8A 0%, #1E90D6 40%, #A6E1FF 75%, #E3F6FF 100%)';
    }
  }, [resolvedState]);

  return (
    <div
      data-testid="sky-gradient"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: gradient,
        transition: calm ? 'none' : 'background 1.5s ease',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Night mode bioluminescent star field (§7.3, §7.7 rule 4) */}
      {resolvedState === 'night' && (
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0.65 }}
        >
          <circle cx="15%" cy="12%" r="1.5" fill="#FFFFFF" />
          <circle cx="28%" cy="22%" r="2" fill="#5EE7FF" opacity="0.9" />
          <circle cx="45%" cy="8%" r="1" fill="#FFFFFF" />
          <circle cx="62%" cy="18%" r="2" fill="#A6E1FF" />
          <circle cx="78%" cy="14%" r="1.5" fill="#5EE7FF" />
          <circle cx="88%" cy="26%" r="2.5" fill="#FFFFFF" />
          <circle cx="34%" cy="32%" r="1.2" fill="#5EE7FF" />
          <circle cx="53%" cy="28%" r="1.8" fill="#35E0C8" opacity="0.8" />
        </svg>
      )}
    </div>
  );
};
