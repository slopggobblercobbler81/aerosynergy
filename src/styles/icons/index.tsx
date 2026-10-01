import React from 'react';

export const DeweyIcon: React.FC<{ size?: number; className?: string; mood?: string }> = ({\
  size = 48,
  className = '',
  mood = 'happy',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="deweyGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#A6E1FF" />
          <stop offset="35%" stopColor="#4FC3F7" />
          <stop offset="75%" stopColor="#1E90D6" />
          <stop offset="100%" stopColor="#0B4F8A" />
        </radialGradient>
        <linearGradient id="highlightGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {/* Drop body */}
      <path
        d="M50 8 C50 8 18 52 18 70 C18 86.5 32.3 95 50 95 C67.7 95 82 86.5 82 70 C82 52 50 8 50 8 Z"
        fill="url(#deweyGrad)"
        stroke="rgba(255,255,255,0.8)"
        strokeWidth="2"
      />
      {/* Gloss Specular Arc */}
      <path
        d="M50 14 C44 26 28 56 26 70 C25 76 28 82 32 86 C27 80 25 74 26 66 C28 52 46 22 50 14 Z"
        fill="url(#highlightGrad)"
      />
      {/* Big Eyes */}
      <ellipse cx="40" cy="62" rx="5" ry="7" fill="#0A2A43" />
      <ellipse cx="60" cy="62" rx="5" ry="7" fill="#0A2A43" />
      {/* Eye Highlights */}
      <circle cx="38" cy="59" r="2" fill="#FFFFFF" />
      <circle cx="58" cy="59" r="2" fill="#FFFFFF" />
      <circle cx="42" cy="64" r="1" fill="#FFFFFF" />
      <circle cx="62" cy="64" r="1" fill="#FFFFFF" />
      {/* Cheerful Smile or Mood Mouth */}
      {mood === 'popped' || mood === 'sad' ? (
        <path d="M42 76 Q50 71 58 76" stroke="#0A2A43" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      ) : (
        <path d="M41 72 Q50 81 59 72" stroke="#0A2A43" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      )}
      {/* Blush */}
      <circle cx="32" cy="68" r="4" fill="#FF8A70" opacity="0.5" />
      <circle cx="68" cy="68" r="4" fill="#FF8A70" opacity="0.5" />
      {/* Sparkle */}
      <path
        d="M74 25 Q77 28 80 25 Q77 22 74 25 Z M77 22 Q77 25 80 25 Q77 25 77 28 Q77 25 74 25 Q77 25 77 22"
        fill="#FFFFFF"
      />
    </svg>
  );
};

export const DolphinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="none">
    <path
      d="M28 14C24 9 17 6 11 8C8 9 5 12 3 15C5 15 8 14 10 15C7 17 4 20 4 23C7 22 10 19 13 18C15 22 19 24 23 23C26 22 28 19 28 14Z"
      fill="url(#dolphGrad)"
      stroke="rgba(255,255,255,0.7)"
      strokeWidth="1.5"
    />
    <defs>
      <linearGradient id="dolphGrad" x1="0" y1="0" x2="32" y2="32">
        <stop offset="0%" stopColor="#5EE7FF" />
        <stop offset="50%" stopColor="#1E90D6" />
        <stop offset="100%" stopColor="#0B4F8A" />
      </linearGradient>
    </defs>
  </svg>
);

export const BubbleIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none">
    <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.35)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" />
    <path d="M7 8 C8 6 12 6 14 7" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);