/* ═══════════════════════════════════════════════════════════════════════════
   AEROSYNERGY ULTRA 365 ✨ CLOUD BUBBLE EDITION
   Procedural Water Caustics Shimmer Overlay per §7.3
   Authored by: Dr. Glossandra Luminara 🌈✨ (Glossmaster)
   ═══════════════════════════════════════════════════════════════════════════ */

import React, { useEffect, useState } from 'react';

export interface WaterCausticsProps {
  calm?: boolean;
}

export const WaterCaustics: React.FC<WaterCausticsProps> = ({ calm = false }) => {
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
      data-testid="water-caustics"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        mixBlendMode: 'overlay',
        opacity: 0.38,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 800"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          height: '100%',
          animation: shouldAnimate ? 'caustic-dance 8s ease-in-out infinite alternate' : 'none',
          transformOrigin: 'center center',
        }}
      >
        <defs>
          <radialGradient id="causticSpot1" cx="30%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#5EE7FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1E90D6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="causticSpot2" cx="70%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#35E0C8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0B4F8A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Dynamic Caustic Web Netting Curves */}
        <path
          d="M0,100 Q200,60 400,120 T800,90 T1000,140 L1000,800 L0,800 Z"
          fill="url(#causticSpot1)"
          opacity="0.6"
        />
        <path
          d="M0,250 C300,180 500,320 800,240 C950,200 1000,260 1000,260 L1000,800 L0,800 Z"
          fill="url(#causticSpot2)"
          opacity="0.5"
        />

        {/* Refraction Caustic Filament Rings */}
        <ellipse cx="250" cy="220" rx="180" ry="90" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="3" transform="rotate(-15 250 220)" />
        <ellipse cx="680" cy="380" rx="240" ry="110" fill="none" stroke="rgba(94, 231, 255, 0.4)" strokeWidth="3.5" transform="rotate(20 680 380)" />
        <ellipse cx="420" cy="560" rx="200" ry="85" fill="none" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="2.5" transform="rotate(-5 420 560)" />
        <ellipse cx="850" cy="180" rx="140" ry="70" fill="none" stroke="rgba(53, 224, 200, 0.35)" strokeWidth="2" transform="rotate(10 850 180)" />
      </svg>

      <style>{`
        @keyframes caustic-dance {
          0% {
            transform: scale(1) translate(0, 0);
            opacity: 0.32;
          }
          50% {
            transform: scale(1.04) translate(8px, -6px);
            opacity: 0.48;
          }
          100% {
            transform: scale(0.98) translate(-6px, 8px);
            opacity: 0.35;
          }
        }
      `}</style>
    </div>
  );
};
