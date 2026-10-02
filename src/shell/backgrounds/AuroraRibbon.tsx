/* ═══════════════════════════════════════════════════════════════════════════
   AEROSYNERGY ULTRA 365 ✨ CLOUD BUBBLE EDITION
   Aurora Ribbon Undulation per §7.3
   Authored by: Dr. Glossandra Luminara 🌈✨ (Glossmaster)
   ═══════════════════════════════════════════════════════════════════════════ */

import React, { useEffect, useState } from 'react';

export interface AuroraRibbonProps {
  calm?: boolean;
}

export const AuroraRibbon: React.FC<AuroraRibbonProps> = ({ calm = false }) => {
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
      data-testid="aurora-ribbon"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '45%',
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: 0.7,
        filter: 'blur(16px)',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <linearGradient id="auroraGrad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#35E0C8" stopOpacity="0" />
            <stop offset="25%" stopColor="#35E0C8" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#57B9FF" stopOpacity="0.9" />
            <stop offset="90%" stopColor="#A18CFF" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#A18CFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="auroraGrad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#57B9FF" stopOpacity="0" />
            <stop offset="35%" stopColor="#5EE7FF" stopOpacity="0.7" />
            <stop offset="75%" stopColor="#C6A5F2" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#C6A5F2" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Primary Undulating Ribbon */}
        <path
          d="M0,150 C250,90 400,240 650,130 C900,40 1050,180 1200,120 L1200,0 L0,0 Z"
          fill="url(#auroraGrad1)"
          style={{
            animation: shouldAnimate ? 'aurora-sway-1 10s ease-in-out infinite alternate' : 'none',
          }}
        />

        {/* Secondary Harmonic Wave */}
        <path
          d="M0,180 C200,220 500,120 750,210 C950,280 1100,150 1200,190 L1200,0 L0,0 Z"
          fill="url(#auroraGrad2)"
          opacity="0.65"
          style={{
            animation: shouldAnimate ? 'aurora-sway-2 14s ease-in-out infinite alternate' : 'none',
          }}
        />
      </svg>

      <style>{`
        @keyframes aurora-sway-1 {
          0% {
            transform: translateY(0) scaleY(1);
            opacity: 0.65;
          }
          50% {
            transform: translateY(-15px) scaleY(1.2);
            opacity: 0.9;
          }
          100% {
            transform: translateY(10px) scaleY(0.9);
            opacity: 0.7;
          }
        }
        @keyframes aurora-sway-2 {
          0% {
            transform: translateY(0) scaleY(1);
            opacity: 0.5;
          }
          50% {
            transform: translateY(18px) scaleY(1.15);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-8px) scaleY(0.95);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};
