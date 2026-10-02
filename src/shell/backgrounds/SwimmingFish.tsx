/* ═══════════════════════════════════════════════════════════════════════════
   AEROSYNERGY ULTRA 365 ✨ CLOUD BUBBLE EDITION
   Procedural Swimming Fish & Dolphin Animation per §7.3
   Authored by: Dr. Glossandra Luminara 🌈✨ (Glossmaster)
   ═══════════════════════════════════════════════════════════════════════════ */

import React, { useEffect, useState } from 'react';

export interface SwimmingFishProps {
  calm?: boolean;
}

export const SwimmingFish: React.FC<SwimmingFishProps> = ({ calm = false }) => {
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
      data-testid="swimming-fish"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* Primary Dolphin Cruiser */}
      <div
        style={{
          position: 'absolute',
          top: '38%',
          left: 0,
          width: '72px',
          height: '42px',
          animation: shouldAnimate ? 'dolphin-cross 28s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
          transform: shouldAnimate ? undefined : 'translateX(25vw) translateY(0)',
          opacity: 0.85,
        }}
      >
        <svg
          viewBox="0 0 72 42"
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="dolphSwimGrad" x1="0" y1="0" x2="72" y2="42">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#5EE7FF" />
              <stop offset="65%" stopColor="#1E90D6" />
              <stop offset="100%" stopColor="#0B4F8A" />
            </linearGradient>
          </defs>
          <path
            d="M68 20 C60 10 46 6 30 9 C20 11 12 17 6 23 C12 23 18 21 24 23 C18 26 12 32 10 37 C16 35 22 30 28 28 C34 33 44 36 54 33 C60 31 66 26 68 20 Z"
            fill="url(#dolphSwimGrad)"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="1.5"
          />
          <circle cx="22" cy="16" r="2" fill="#0A2A43" />
          <circle cx="21" cy="15.5" r="0.8" fill="#FFFFFF" />
          {/* Gentle air bubbles trailed */}
          <circle cx="5" cy="24" r="1.5" fill="rgba(255,255,255,0.7)" />
          <circle cx="1" cy="27" r="1" fill="rgba(255,255,255,0.5)" />
        </svg>
      </div>

      {/* Secondary Tropical Fish Swimming in Lower Ocean/Horizon */}
      <div
        style={{
          position: 'absolute',
          top: '52%',
          left: 0,
          width: '44px',
          height: '26px',
          animation: shouldAnimate ? 'fish-cross 20s linear infinite 8s' : 'none',
          transform: shouldAnimate ? undefined : 'translateX(65vw) translateY(0)',
          opacity: 0.75,
        }}
      >
        <svg
          viewBox="0 0 44 26"
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="fishSwimGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#FFB55C" />
              <stop offset="70%" stopColor="#FF8A70" />
              <stop offset="100%" stopColor="#35E0C8" />
            </radialGradient>
          </defs>
          <path
            d="M38 13 C30 5 16 6 8 13 C16 20 30 21 38 13 Z M8 13 L2 7 L2 19 Z"
            fill="url(#fishSwimGrad)"
            stroke="rgba(255, 255, 255, 0.85)"
            strokeWidth="1.2"
          />
          <circle cx="30" cy="11" r="1.8" fill="#0A2A43" />
          <circle cx="29.5" cy="10.5" r="0.6" fill="#FFFFFF" />
        </svg>
      </div>

      <style>{`
        @keyframes dolphin-cross {
          0% {
            transform: translateX(-100px) translateY(0px) scaleX(1);
          }
          25% {
            transform: translateX(30vw) translateY(-18px) scaleX(1);
          }
          48% {
            transform: translateX(calc(100vw + 60px)) translateY(-8px) scaleX(1);
          }
          50% {
            transform: translateX(calc(100vw + 60px)) translateY(0px) scaleX(-1);
          }
          75% {
            transform: translateX(65vw) translateY(14px) scaleX(-1);
          }
          98% {
            transform: translateX(-100px) translateY(4px) scaleX(-1);
          }
          100% {
            transform: translateX(-100px) translateY(0px) scaleX(1);
          }
        }

        @keyframes fish-cross {
          0% {
            transform: translateX(-80px) translateY(0px);
          }
          50% {
            transform: translateX(50vw) translateY(-10px);
          }
          100% {
            transform: translateX(calc(100vw + 80px)) translateY(0px);
          }
        }
      `}</style>
    </div>
  );
};
