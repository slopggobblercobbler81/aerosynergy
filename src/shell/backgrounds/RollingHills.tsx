/* ═══════════════════════════════════════════════════════════════════════════
   AEROSYNERGY ULTRA 365 ✨ CLOUD BUBBLE EDITION
   Procedural Rolling Hills Meadow per §7.3
   Authored by: Dr. Glossandra Luminara 🌈✨ (Glossmaster)
   ═══════════════════════════════════════════════════════════════════════════ */

import React, { useEffect, useState } from 'react';

export interface RollingHillsProps {
  calm?: boolean;
}

export const RollingHills: React.FC<RollingHillsProps> = ({ calm = false }) => {
  const [isVisible, setIsVisible] = useState(
    typeof document !== 'undefined' ? !document.hidden : true
  );

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const shouldAnimate = !calm && isVisible;

  return (
    <div
      data-testid="rolling-hills"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '35%',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          {/* Back Hills Gradient with Atmospheric Perspective */}
          <linearGradient id="hillBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A6E1FF" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#7BE05A" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#3D9B32" stopOpacity="0.9" />
          </linearGradient>

          {/* Fore Hills Vibrant Meadow Gradient */}
          <linearGradient id="hillFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7BE05A" />
            <stop offset="60%" stopColor="#3D9B32" />
            <stop offset="100%" stopColor="#1F5C1F" />
          </linearGradient>

          {/* Specular Ridge Rim Highlight */}
          <linearGradient id="ridgeHighlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#A6E1FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Back Hill Layer */}
        <path
          d="M0,140 C280,60 520,180 840,90 C1120,20 1320,130 1440,90 L1440,320 L0,320 Z"
          fill="url(#hillBack)"
          style={{
            animation: shouldAnimate ? 'hill-breeze 18s ease-in-out infinite alternate' : 'none',
            transformOrigin: 'bottom center',
          }}
        />

        {/* Foreground Lush Meadow */}
        <path
          d="M0,190 C320,120 640,240 960,160 C1200,100 1360,200 1440,170 L1440,320 L0,320 Z"
          fill="url(#hillFront)"
          stroke="url(#ridgeHighlight)"
          strokeWidth="2"
        />

        {/* Meadow Ridge Glow Arc */}
        <path
          d="M0,192 C320,122 640,242 960,162 C1200,102 1360,202 1440,172"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <style>{`
        @keyframes hill-breeze {
          0% { transform: scaleY(1) translateY(0); }
          100% { transform: scaleY(1.05) translateY(-4px); }
        }
      `}</style>
    </div>
  );
};
