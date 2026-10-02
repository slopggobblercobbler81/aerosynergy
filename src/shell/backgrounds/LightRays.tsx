/* ═══════════════════════════════════════════════════════════════════════════
   AEROSYNERGY ULTRA 365 ✨ CLOUD BUBBLE EDITION
   Procedural Light Rays (God Rays) per §7.3
   Authored by: Dr. Glossandra Luminara 🌈✨ (Glossmaster)
   ═══════════════════════════════════════════════════════════════════════════ */

import React, { useEffect, useState } from 'react';

export interface LightRaysProps {
  calm?: boolean;
}

export const LightRays: React.FC<LightRaysProps> = ({ calm = false }) => {
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
      data-testid="light-rays"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: 0.6,
        mixBlendMode: 'screen',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 700"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          height: '100%',
          transformOrigin: '0 0',
          transition: 'transform 0.5s ease',
        }}
      >
        <defs>
          <linearGradient id="rayGrad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
            <stop offset="40%" stopColor="#5EE7FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4FC3F7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rayGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#FFB55C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#E3F6FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rayGrad3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#35E0C8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1E90D6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Central Sun Beam Flare */}
        <circle cx="60" cy="40" r="140" fill="radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%)" />

        {/* Angled Light Rays */}
        <polygon
          points="0,0 280,700 390,700"
          fill="url(#rayGrad1)"
          style={{
            animation: shouldAnimate ? 'ray-drift-1 12s ease-in-out infinite alternate' : 'none',
            transformOrigin: '0 0',
          }}
        />
        <polygon
          points="40,0 520,700 660,700"
          fill="url(#rayGrad2)"
          style={{
            animation: shouldAnimate ? 'ray-drift-2 16s ease-in-out infinite alternate' : 'none',
            transformOrigin: '40px 0',
          }}
        />
        <polygon
          points="80,0 790,700 950,700"
          fill="url(#rayGrad3)"
          style={{
            animation: shouldAnimate ? 'ray-drift-1 14s ease-in-out infinite alternate' : 'none',
            transformOrigin: '80px 0',
          }}
        />
        <polygon
          points="0,20 180,700 240,700"
          fill="url(#rayGrad2)"
          opacity="0.6"
        />
      </svg>

      <style>{`
        @keyframes ray-drift-1 {
          0% { transform: rotate(0deg) skewX(0deg); opacity: 0.55; }
          100% { transform: rotate(3deg) skewX(2deg); opacity: 0.85; }
        }
        @keyframes ray-drift-2 {
          0% { transform: rotate(0deg) skewX(0deg); opacity: 0.7; }
          100% { transform: rotate(-2.5deg) skewX(-1.5deg); opacity: 0.45; }
        }
      `}</style>
    </div>
  );
};
