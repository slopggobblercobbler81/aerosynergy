/* ═══════════════════════════════════════════════════════════════════════════
   AEROSYNERGY ULTRA 365 ✨ CLOUD BUBBLE EDITION
   Procedural Background Compositor Engine per §7.3
   Authored by: Dr. Glossandra Luminara 🌈✨ (Glossmaster)
   "Living Frutiger Aero wallpaper: sky, rays, aurora, hills, fish, bubbles, and caustics." 🌊💎
   ═══════════════════════════════════════════════════════════════════════════ */

import React from 'react';
import { SkyGradient, SkyTimeState } from './SkyGradient';
import { LightRays } from './LightRays';
import { AuroraRibbon } from './AuroraRibbon';
import { RollingHills } from './RollingHills';
import { SwimmingFish } from './SwimmingFish';
import { WaterCaustics } from './WaterCaustics';
import { FloatingBubbles } from './FloatingBubbles';

export interface ProceduralBackgroundProps {
  calm?: boolean;
  timeState?: SkyTimeState;
  showRays?: boolean;
  showAurora?: boolean;
  showHills?: boolean;
  showFish?: boolean;
  showCaustics?: boolean;
  showBubbles?: boolean;
}

export const ProceduralBackground: React.FC<ProceduralBackgroundProps> = ({
  calm = false,
  timeState = 'auto',
  showRays = true,
  showAurora = true,
  showHills = true,
  showFish = true,
  showCaustics = true,
  showBubbles = true,
}) => {
  return (
    <div
      data-testid="procedural-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* 1. Base Sky Gradient with Dawn/Day/Dusk/Night Transitions */}
      <SkyGradient timeState={timeState} calm={calm} />

      {/* 2. Volumetric Light Rays (God Rays) */}
      {showRays && <LightRays calm={calm} />}

      {/* 3. Undulating Chromatic Aurora Ribbon */}
      {showAurora && <AuroraRibbon calm={calm} />}

      {/* 4. Swimming Dolphin & Tropical Fish */}
      {showFish && <SwimmingFish calm={calm} />}

      {/* 5. Shimmering Water Caustics Refraction Grid */}
      {showCaustics && <WaterCaustics calm={calm} />}

      {/* 6. Lush Green Rolling Hills Horizon */}
      {showHills && <RollingHills calm={calm} />}

      {/* 7. Canvas Floating Bubbles Particle System */}
      {showBubbles && <FloatingBubbles calm={calm} transparent={true} />}
    </div>
  );
};
