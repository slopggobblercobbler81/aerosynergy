/* ═══════════════════════════════════════════════════════════════════════════
   AEROSYNERGY ULTRA 365 ✨ CLOUD BUBBLE EDITION
   Frutiger Aero In-Repo High-Gloss SVG Icon Library per §7.6, §8.2
   Authored by: Dr. Glossandra Luminara 🌈✨ (Glossmaster)
   "Gradients, specular arcs, and pure technological optimism." 💎🫧
   ═══════════════════════════════════════════════════════════════════════════ */

import React from 'react';

export interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

export interface MascotIconProps extends IconProps {
  mood?: 'happy' | 'proud' | 'supportive' | 'hydrating' | 'popped' | 'sad';
}

/* ── 1. APP LOGO: AeroLogoIcon ────────────────────────────────────────────── */
export const AeroLogoIcon: React.FC<IconProps> = ({
  size = 48,
  className = '',
  style,
  title = 'AeroSynergy Ultra 365 Logo',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
    style={style}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label={title}
  >
    <defs>
      <radialGradient id="aeroLogoGlobe" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="25%" stopColor="#5EE7FF" />
        <stop offset="60%" stopColor="#1E90D6" />
        <stop offset="100%" stopColor="#0B4F8A" />
      </radialGradient>
      <linearGradient id="aeroLogoAurora" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#35E0C8" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#5EE7FF" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#A18CFF" stopOpacity="0.9" />
      </linearGradient>
      <linearGradient id="aeroLogoCloud" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#E3F6FF" stopOpacity="0.65" />
      </linearGradient>
    </defs>

    {/* Outer Aurora Swoosh Orbit */}
    <path
      d="M12 55 C12 28 35 12 62 12 C82 12 90 26 88 42 C85 64 56 86 28 84 C18 83 14 74 15 65 C16 52 32 44 48 44 C66 44 76 52 74 62"
      stroke="url(#aeroLogoAurora)"
      strokeWidth="6"
      strokeLinecap="round"
      opacity="0.85"
    />

    {/* Primary Gloss Globe */}
    <circle
      cx="50"
      cy="50"
      r="34"
      fill="url(#aeroLogoGlobe)"
      stroke="rgba(255, 255, 255, 0.9)"
      strokeWidth="1.5"
    />

    {/* Specular Highlight Arc */}
    <ellipse
      cx="42"
      cy="34"
      rx="20"
      ry="12"
      fill="rgba(255, 255, 255, 0.75)"
      transform="rotate(-20 42 34)"
    />

    {/* Fluffy Translucent Cloud Base */}
    <path
      d="M32 66 C32 60 37 56 42 56 C44 52 48 50 53 50 C58 50 63 53 65 57 C69 57 73 60 73 65 C73 69 69 72 65 72 L36 72 C33 72 32 69 32 66 Z"
      fill="url(#aeroLogoCloud)"
      stroke="rgba(255, 255, 255, 0.85)"
      strokeWidth="1"
    />

    {/* Lens Flare Sparkle */}
    <path
      d="M72 24 Q75 27 78 24 Q75 21 72 24 Z M75 21 Q75 24 78 24 Q75 24 75 27 Q75 24 72 24 Q75 24 75 21"
      fill="#FFFFFF"
    />
  </svg>
);

/* ── 2. MASCOT: DeweyIcon ─────────────────────────────────────────────────── */
export const DeweyIcon: React.FC<MascotIconProps> = ({
  size = 48,
  className = '',
  style,
  mood = 'happy',
  title = 'Dewey the Droplet Mascot',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <defs>
        <radialGradient id="deweyGrad" cx="38%" cy="32%" r="62%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="20%" stopColor="#A6E1FF" />
          <stop offset="45%" stopColor="#4FC3F7" />
          <stop offset="80%" stopColor="#1E90D6" />
          <stop offset="100%" stopColor="#0B4F8A" />
        </radialGradient>
        <linearGradient id="deweyHighlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Droplet Body */}
      <path
        d="M50 8 C50 8 18 52 18 70 C18 86.5 32.3 95 50 95 C67.7 95 82 86.5 82 70 C82 52 50 8 50 8 Z"
        fill="url(#deweyGrad)"
        stroke="rgba(255, 255, 255, 0.85)"
        strokeWidth="2"
      />

      {/* Specular Highlight Arc */}
      <path
        d="M50 14 C44 26 28 56 26 70 C25 76 28 82 32 86 C27 80 25 74 26 66 C28 52 46 22 50 14 Z"
        fill="url(#deweyHighlight)"
      />

      {/* Eyes */}
      <ellipse cx="40" cy="62" rx="5" ry="7" fill="#0A2A43" />
      <ellipse cx="60" cy="62" rx="5" ry="7" fill="#0A2A43" />

      {/* Eye Highlights */}
      <circle cx="38" cy="59" r="2" fill="#FFFFFF" />
      <circle cx="58" cy="59" r="2" fill="#FFFFFF" />
      <circle cx="42" cy="64" r="1" fill="#FFFFFF" />
      <circle cx="62" cy="64" r="1" fill="#FFFFFF" />

      {/* Mouth based on Mood */}
      {mood === 'popped' || mood === 'sad' ? (
        <path d="M42 76 Q50 71 58 76" stroke="#0A2A43" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      ) : mood === 'proud' ? (
        <path d="M38 71 Q50 82 62 71" stroke="#0A2A43" strokeWidth="3" strokeLinecap="round" fill="#FFFFFF" />
      ) : mood === 'hydrating' ? (
        <path d="M43 72 C43 76 47 79 50 79 C53 79 57 76 57 72 Z" fill="#00C8E6" stroke="#0A2A43" strokeWidth="1.5" />
      ) : (
        <path d="M41 72 Q50 81 59 72" stroke="#0A2A43" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      )}

      {/* Cheerful Blush */}
      <circle cx="32" cy="68" r="4.5" fill="#FF8A70" opacity="0.55" />
      <circle cx="68" cy="68" r="4.5" fill="#FF8A70" opacity="0.55" />

      {/* Accessory: Hydration Glass or Crown */}
      {mood === 'proud' && (
        <path d="M40 22 L45 28 L50 20 L55 28 L60 22 L58 32 L42 32 Z" fill="#FFB55C" stroke="#FFFFFF" strokeWidth="1" />
      )}

      {/* Gleam Sparkle */}
      <path
        d="M74 25 Q77 28 80 25 Q77 22 74 25 Z M77 22 Q77 25 80 25 Q77 25 77 28 Q77 25 74 25 Q77 25 77 22"
        fill="#FFFFFF"
      />
    </svg>
  );
};

/* ── 3. ANIMAL MASCOTS: DolphinIcon & FishIcon & ButterflyIcon ─────────────── */
export const DolphinIcon: React.FC<IconProps> = ({ size = 32, className = '', style, title = 'Dolphin' }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" className={className} style={style} fill="none" role="img" aria-label={title}>
    <defs>
      <linearGradient id="dolphGrad2" x1="0" y1="0" x2="36" y2="36">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="30%" stopColor="#5EE7FF" />
        <stop offset="70%" stopColor="#1E90D6" />
        <stop offset="100%" stopColor="#0B4F8A" />
      </linearGradient>
    </defs>
    <path
      d="M32 16 C28 9 20 6 12 8 C8 9 4 13 2 17 C5 17 8 16 11 17 C8 19 5 23 5 26 C8 25 12 21 15 20 C18 24 23 27 28 25 C31 24 33 21 32 16 Z"
      fill="url(#dolphGrad2)"
      stroke="rgba(255, 255, 255, 0.85)"
      strokeWidth="1.5"
    />
    <circle cx="9" cy="12" r="1.5" fill="#0A2A43" />
    <circle cx="8.5" cy="11.5" r="0.5" fill="#FFFFFF" />
  </svg>
);

export const FishIcon: React.FC<IconProps> = ({ size = 28, className = '', style, title = 'Swimming Fish' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={style} fill="none" role="img" aria-label={title}>
    <defs>
      <radialGradient id="fishGrad" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="35%" stopColor="#FFB55C" />
        <stop offset="75%" stopColor="#FF8A70" />
        <stop offset="100%" stopColor="#1E90D6" />
      </radialGradient>
    </defs>
    <path
      d="M26 16 C20 8 10 10 4 16 C10 22 20 24 26 16 Z M4 16 L1 11 L1 21 Z"
      fill="url(#fishGrad)"
      stroke="rgba(255, 255, 255, 0.8)"
      strokeWidth="1.2"
    />
    <circle cx="21" cy="14" r="1.5" fill="#0A2A43" />
    <circle cx="20.5" cy="13.5" r="0.5" fill="#FFFFFF" />
  </svg>
);

export const ButterflyIcon: React.FC<IconProps> = ({ size = 28, className = '', style, title = 'Butterfly' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={style} fill="none" role="img" aria-label={title}>
    <defs>
      <linearGradient id="bfGrad" x1="0" y1="0" x2="32" y2="32">
        <stop offset="0%" stopColor="#35E0C8" />
        <stop offset="50%" stopColor="#5EE7FF" />
        <stop offset="100%" stopColor="#A18CFF" />
      </linearGradient>
    </defs>
    <path
      d="M16 16 C12 8 4 6 5 14 C6 20 13 18 16 16 Z M16 16 C20 8 28 6 27 14 C26 20 19 18 16 16 Z M16 16 C13 22 6 26 8 28 C12 30 15 22 16 16 Z M16 16 C19 22 26 26 24 28 C20 30 17 22 16 16 Z"
      fill="url(#bfGrad)"
      stroke="rgba(255, 255, 255, 0.85)"
      strokeWidth="1"
      opacity="0.9"
    />
    <line x1="16" y1="10" x2="16" y2="24" stroke="#0A2A43" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ── 4. CATEGORY ICONS ────────────────────────────────────────────────────── */

/* Productivity: 3D Glossy Clipboard with Checkmark & Orb */
export const ProductivityIcon: React.FC<IconProps> = ({ size = 32, className = '', style, title = 'Productivity' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={style} fill="none" role="img" aria-label={title}>
    <defs>
      <linearGradient id="prodBoard" x1="0" y1="0" x2="32" y2="32">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#E8F0F5" />
        <stop offset="100%" stopColor="#AFC3CE" />
      </linearGradient>
      <radialGradient id="prodCheck" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#7BE05A" />
        <stop offset="100%" stopColor="#3D9B32" />
      </radialGradient>
    </defs>
    {/* Clipboard base */}
    <rect x="5" y="6" width="22" height="24" rx="4" fill="url(#prodBoard)" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1.5" />
    <rect x="11" y="3" width="10" height="5" rx="2" fill="#6D8391" stroke="#FFFFFF" strokeWidth="1" />
    {/* Checklist lines */}
    <line x1="9" y1="13" x2="23" y2="13" stroke="#1E90D6" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="9" y1="18" x2="23" y2="18" stroke="#4FC3F7" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="9" y1="23" x2="16" y2="23" stroke="#A6E1FF" strokeWidth="1.5" strokeLinecap="round" />
    {/* Green check orb */}
    <circle cx="22" cy="22" r="6" fill="url(#prodCheck)" stroke="#FFFFFF" strokeWidth="1.2" />
    <path d="M19 22 L21 24 L25 19" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Wellness: Translucent Water Droplet with Fresh Leaf */
export const WellnessIcon: React.FC<IconProps> = ({ size = 32, className = '', style, title = 'Wellness' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={style} fill="none" role="img" aria-label={title}>
    <defs>
      <radialGradient id="wellDrop" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="35%" stopColor="#5EE7FF" />
        <stop offset="80%" stopColor="#00C8E6" />
        <stop offset="100%" stopColor="#0B4F8A" />
      </radialGradient>
      <linearGradient id="wellLeaf" x1="0" y1="0" x2="16" y2="16">
        <stop offset="0%" stopColor="#7BE05A" />
        <stop offset="100%" stopColor="#1F5C1F" />
      </linearGradient>
    </defs>
    <path
      d="M16 4 C16 4 7 17 7 22 C7 27 11 30 16 30 C21 30 25 27 25 22 C25 17 16 4 16 4 Z"
      fill="url(#wellDrop)"
      stroke="rgba(255, 255, 255, 0.9)"
      strokeWidth="1.2"
    />
    {/* Specular curved arc */}
    <path d="M16 7 C14 12 10 19 10 23" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    {/* Sprouting leaf */}
    <path
      d="M16 16 C20 14 26 15 28 19 C24 23 18 20 16 16 Z"
      fill="url(#wellLeaf)"
      stroke="#FFFFFF"
      strokeWidth="1"
    />
  </svg>
);

/* Creativity: Crystal Palette with Jewel Gems */
export const CreativityIcon: React.FC<IconProps> = ({ size = 32, className = '', style, title = 'Creativity' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={style} fill="none" role="img" aria-label={title}>
    <defs>
      <radialGradient id="creatPal" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#E3F6FF" />
        <stop offset="100%" stopColor="#A6E1FF" />
      </radialGradient>
    </defs>
    <path
      d="M16 3 C8 3 3 8 3 16 C3 24 8 29 16 29 C19 29 21 27 21 24 C21 22 20 21 20 19 C20 17 22 15 25 15 C28 15 29 18 29 16 C29 8 24 3 16 3 Z"
      fill="url(#creatPal)"
      stroke="rgba(255, 255, 255, 0.95)"
      strokeWidth="1.5"
    />
    {/* Jewel color drops */}
    <circle cx="10" cy="11" r="2.5" fill="#FF8A70" stroke="#FFFFFF" strokeWidth="0.8" />
    <circle cx="16" cy="8" r="2.5" fill="#FFB55C" stroke="#FFFFFF" strokeWidth="0.8" />
    <circle cx="22" cy="11" r="2.5" fill="#7BE05A" stroke="#FFFFFF" strokeWidth="0.8" />
    <circle cx="10" cy="18" r="2.5" fill="#35E0C8" stroke="#FFFFFF" strokeWidth="0.8" />
    <circle cx="23" cy="23" r="2" fill="none" stroke="#6D8391" strokeWidth="1" />
  </svg>
);

/* Synergy: Interlocking Glowing Cyan & Amber Aero Rings */
export const SynergyIcon: React.FC<IconProps> = ({ size = 32, className = '', style, title = 'Synergy' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={style} fill="none" role="img" aria-label={title}>
    <defs>
      <linearGradient id="synCyan" x1="0" y1="0" x2="32" y2="32">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#5EE7FF" />
        <stop offset="100%" stopColor="#1E90D6" />
      </linearGradient>
      <linearGradient id="synAmber" x1="0" y1="0" x2="32" y2="32">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#FFB55C" />
        <stop offset="100%" stopColor="#FF8A70" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="16" r="8" stroke="url(#synCyan)" strokeWidth="3" />
    <circle cx="20" cy="16" r="8" stroke="url(#synAmber)" strokeWidth="3" />
    <circle cx="16" cy="16" r="3" fill="#FFFFFF" opacity="0.8" />
  </svg>
);

/* Utility: Chrome Wrench and Tool Gear */
export const UtilityIcon: React.FC<IconProps> = ({ size = 32, className = '', style, title = 'Utility' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={style} fill="none" role="img" aria-label={title}>
    <defs>
      <linearGradient id="utilChrome" x1="0" y1="0" x2="32" y2="32">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#E8F0F5" />
        <stop offset="70%" stopColor="#AFC3CE" />
        <stop offset="100%" stopColor="#6D8391" />
      </linearGradient>
    </defs>
    <path
      d="M27 9 C25 6 22 5 19 6 C17 7 15 9 15 11 L9 17 C8 16 6 16 5 17 C3 19 3 22 5 24 L8 27 C10 29 13 29 15 27 C16 26 16 24 15 23 L21 17 C23 17 25 15 26 13 C27 10 26 9 27 9 Z"
      fill="url(#utilChrome)"
      stroke="#FFFFFF"
      strokeWidth="1.2"
    />
  </svg>
);

/* Lore: Translucent Crystal Book with Star Marker */
export const LoreIcon: React.FC<IconProps> = ({ size = 32, className = '', style, title = 'Lore' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={style} fill="none" role="img" aria-label={title}>
    <defs>
      <linearGradient id="loreBook" x1="0" y1="0" x2="32" y2="32">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="30%" stopColor="#5EE7FF" />
        <stop offset="70%" stopColor="#1E90D6" />
        <stop offset="100%" stopColor="#0B4F8A" />
      </linearGradient>
    </defs>
    <path
      d="M5 8 C5 6 7 5 9 5 L23 5 C25 5 27 6 27 8 L27 25 C27 27 25 28 23 28 L9 28 C7 28 5 27 5 25 Z"
      fill="url(#loreBook)"
      stroke="rgba(255, 255, 255, 0.9)"
      strokeWidth="1.5"
    />
    <line x1="9" y1="5" x2="9" y2="28" stroke="#FFFFFF" strokeWidth="2" />
    <path d="M18 12 L19.5 15.5 L23 16 L20.5 18.5 L21 22 L18 20 L15 22 L15.5 18.5 L13 16 L16.5 15.5 Z" fill="#FFB55C" stroke="#FFFFFF" strokeWidth="0.8" />
  </svg>
);

/* Settings: Sculpted Chrome 8-Toothed Gear */
export const SettingsIcon: React.FC<IconProps> = ({ size = 32, className = '', style, title = 'Settings' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={style} fill="none" role="img" aria-label={title}>
    <defs>
      <radialGradient id="gearGrad" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="35%" stopColor="#E8F0F5" />
        <stop offset="75%" stopColor="#AFC3CE" />
        <stop offset="100%" stopColor="#6D8391" />
      </radialGradient>
    </defs>
    <path
      d="M14 2 L18 2 L18.5 6 C19.5 6.4 20.4 7 21.2 7.7 L24.8 5.7 L27.7 8.6 L25.7 12.2 C26.4 13 27 13.9 27.4 14.9 L31.4 15.4 L31.4 19.4 L27.4 19.9 C27 20.9 26.4 21.8 25.7 22.6 L27.7 26.2 L24.8 29.1 L21.2 27.1 C20.4 27.8 19.5 28.4 18.5 28.8 L18 32.8 L14 32.8 L13.5 28.8 C12.5 28.4 11.6 27.8 10.8 27.1 L7.2 29.1 L4.3 26.2 L6.3 22.6 C5.6 21.8 5 20.9 4.6 19.9 L0.6 19.4 L0.6 15.4 L4.6 14.9 C5 13.9 5.6 13 6.3 12.2 L4.3 8.6 L7.2 5.7 L10.8 7.7 C11.6 7 12.5 6.4 13.5 6 Z"
      fill="url(#gearGrad)"
      stroke="rgba(255, 255, 255, 0.9)"
      strokeWidth="1.2"
    />
    <circle cx="16" cy="17.4" r="5" fill="#E3F6FF" stroke="#0B4F8A" strokeWidth="1.5" />
    <circle cx="14.5" cy="16" r="1.5" fill="#FFFFFF" />
  </svg>
);

/* ── 5. UI CONTROLS ───────────────────────────────────────────────────────── */

/* FolderIcon: Glossy Aqua Folder */
export const FolderIcon: React.FC<IconProps> = ({ size = 28, className = '', style, title = 'Folder' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={style} fill="none" role="img" aria-label={title}>
    <defs>
      <linearGradient id="folderBack" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4FC3F7" />
        <stop offset="100%" stopColor="#0B4F8A" />
      </linearGradient>
      <linearGradient id="folderFront" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="25%" stopColor="#5EE7FF" />
        <stop offset="100%" stopColor="#1E90D6" />
      </linearGradient>
    </defs>
    <path d="M3 8 C3 6.5 4.5 5 6 5 L12 5 L15 8 L26 8 C27.5 8 29 9.5 29 11 L29 24 C29 25.5 27.5 27 26 27 L6 27 C4.5 27 3 25.5 3 24 Z" fill="url(#folderBack)" />
    <path d="M3 13 C3 11.5 4.5 10 6 10 L26 10 C27.5 10 29 11.5 29 13 L28 25 C28 26.5 26.5 28 25 28 L7 28 C5.5 28 4 26.5 4 25 Z" fill="url(#folderFront)" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1" />
  </svg>
);

/* StarIcon: 3D Crystal Star with Gleam */
export const StarIcon: React.FC<IconProps> = ({ size = 28, className = '', style, title = 'Crystal Star' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={style} fill="none" role="img" aria-label={title}>
    <defs>
      <radialGradient id="starGrad" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#FFB55C" />
        <stop offset="85%" stopColor="#FF8A70" />
        <stop offset="100%" stopColor="#C6A5F2" />
      </radialGradient>
    </defs>
    <path
      d="M16 2 L20.5 11 L30.5 12.5 L23.5 19.5 L25 29.5 L16 25 L7 29.5 L8.5 19.5 L1.5 12.5 L11.5 11 Z"
      fill="url(#starGrad)"
      stroke="rgba(255, 255, 255, 0.95)"
      strokeWidth="1.5"
    />
    <circle cx="14" cy="12" r="2" fill="#FFFFFF" opacity="0.8" />
  </svg>
);

/* SearchIcon: Translucent Magnifying Glass */
export const SearchIcon: React.FC<IconProps> = ({ size = 24, className = '', style, title = 'Search' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} fill="none" role="img" aria-label={title}>
    <defs>
      <radialGradient id="searchGlass" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
        <stop offset="60%" stopColor="#4FC3F7" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#1E90D6" stopOpacity="0.75" />
      </radialGradient>
    </defs>
    <circle cx="10" cy="10" r="7" fill="url(#searchGlass)" stroke="rgba(255, 255, 255, 0.95)" strokeWidth="2" />
    <path d="M7 6 C8 4.5 11 4.5 13 5.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="15" y1="15" x2="21" y2="21" stroke="#AFC3CE" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* CloseIcon: Glossy Ruby Sphere with Soft White X */
export const CloseIcon: React.FC<IconProps> = ({ size = 20, className = '', style, title = 'Close' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" className={className} style={style} fill="none" role="img" aria-label={title}>
    <defs>
      <radialGradient id="closeSphere" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#FF8A70" />
        <stop offset="85%" stopColor="#E03E3E" />
        <stop offset="100%" stopColor="#8A0B28" />
      </radialGradient>
    </defs>
    <circle cx="10" cy="10" r="9" fill="url(#closeSphere)" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1" />
    <path d="M7 7 L13 13 M13 7 L7 13" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/* MinimizeIcon: Glossy Sky Sphere with Minus */
export const MinimizeIcon: React.FC<IconProps> = ({ size = 20, className = '', style, title = 'Minimize' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" className={className} style={style} fill="none" role="img" aria-label={title}>
    <defs>
      <radialGradient id="minSphere" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#5EE7FF" />
        <stop offset="85%" stopColor="#1E90D6" />
        <stop offset="100%" stopColor="#0B4F8A" />
      </radialGradient>
    </defs>
    <circle cx="10" cy="10" r="9" fill="url(#minSphere)" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1" />
    <line x1="6" y1="10" x2="14" y2="10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* MaximizeIcon: Glossy Lime Sphere with Square */
export const MaximizeIcon: React.FC<IconProps> = ({ size = 20, className = '', style, title = 'Maximize' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" className={className} style={style} fill="none" role="img" aria-label={title}>
    <defs>
      <radialGradient id="maxSphere" cx="35%" cy="30%" r="65%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#7BE05A" />
        <stop offset="85%" stopColor="#3D9B32" />
        <stop offset="100%" stopColor="#1F5C1F" />
      </radialGradient>
    </defs>
    <circle cx="10" cy="10" r="9" fill="url(#maxSphere)" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1" />
    <rect x="6.5" y="6.5" width="7" height="7" rx="1.5" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
  </svg>
);

/* VolumeIcon: Speaker Cone with Wave Arcs */
export const VolumeIcon: React.FC<IconProps> = ({ size = 24, className = '', style, title = 'Volume' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} fill="none" role="img" aria-label={title}>
    <path d="M4 9 L8 9 L13 5 L13 19 L8 15 L4 15 Z" fill="#1E90D6" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1.2" />
    <path d="M16 8 C17.5 9.5 17.5 14.5 16 16" stroke="#00C8E6" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M19 5 C21.5 7.5 21.5 16.5 19 19" stroke="#5EE7FF" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/* MuteIcon: Speaker Cone with Diagonal Strike */
export const MuteIcon: React.FC<IconProps> = ({ size = 24, className = '', style, title = 'Muted' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} fill="none" role="img" aria-label={title}>
    <path d="M4 9 L8 9 L13 5 L13 19 L8 15 L4 15 Z" fill="#6D8391" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1.2" />
    <line x1="16" y1="8" x2="22" y2="16" stroke="#FF8A70" strokeWidth="2" strokeLinecap="round" />
    <line x1="22" y1="8" x2="16" y2="16" stroke="#FF8A70" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* CalmWatersIcon: Water Ripple Concentric Circles */
export const CalmWatersIcon: React.FC<IconProps> = ({ size = 24, className = '', style, title = 'Calm Waters' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} fill="none" role="img" aria-label={title}>
    <circle cx="12" cy="12" r="9" stroke="#4FC3F7" strokeWidth="1.5" opacity="0.4" />
    <circle cx="12" cy="12" r="6" stroke="#00C8E6" strokeWidth="1.5" opacity="0.7" />
    <circle cx="12" cy="12" r="3" fill="#5EE7FF" stroke="#FFFFFF" strokeWidth="1" />
  </svg>
);

/* SparkleIcon: 4-Point Crystalline Lens Flare */
export const SparkleIcon: React.FC<IconProps> = ({ size = 24, className = '', style, title = 'Sparkle' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} fill="none" role="img" aria-label={title}>
    <path
      d="M12 2 Q12 12 2 12 Q12 12 12 22 Q12 12 22 12 Q12 12 12 2 Z"
      fill="radial-gradient(circle, #FFFFFF 0%, #5EE7FF 100%)"
      stroke="#FFFFFF"
      strokeWidth="1"
    />
  </svg>
);

/* CloudBubbleIcon: Translucent Cloud Inside Bubble */
export const CloudBubbleIcon: React.FC<IconProps> = ({ size = 28, className = '', style, title = 'Cloud Bubble' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} style={style} fill="none" role="img" aria-label={title}>
    <circle cx="16" cy="16" r="14" fill="rgba(255, 255, 255, 0.3)" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.5" />
    <path
      d="M11 20 C9.5 20 8 18.5 8 17 C8 15.5 9 14.5 10.5 14.2 C11 12 13 10.5 15.5 10.5 C18 10.5 20 12 20.5 14 C21.5 14 23 15 23 16.5 C23 18.5 21.5 20 19.5 20 Z"
      fill="rgba(255, 255, 255, 0.9)"
      stroke="rgba(166, 225, 255, 0.8)"
      strokeWidth="1"
    />
    <path d="M10 8 C12 6 18 6 22 8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* BubbleIcon: Soap Bubble with Rainbow Sheen */
export const BubbleIcon: React.FC<IconProps> = ({ size = 24, className = '', style, title = 'Bubble' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} fill="none" role="img" aria-label={title}>
    <defs>
      <radialGradient id="soapBubble" cx="30%" cy="25%" r="70%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
        <stop offset="40%" stopColor="#B3F0FF" stopOpacity="0.4" />
        <stop offset="70%" stopColor="#C6A5F2" stopOpacity="0.3" />
        <stop offset="95%" stopColor="#5EE7FF" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
      </radialGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#soapBubble)" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1.2" />
    <ellipse cx="8.5" cy="7.5" rx="3.5" ry="1.8" fill="rgba(255, 255, 255, 0.9)" transform="rotate(-30 8.5 7.5)" />
    <circle cx="15.5" cy="16.5" r="1" fill="rgba(255, 255, 255, 0.7)" />
  </svg>
);

/* ConfettiIcon: Celebration Burst */
export const ConfettiIcon: React.FC<IconProps> = ({ size = 24, className = '', style, title = 'Celebration Confetti' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} fill="none" role="img" aria-label={title}>
    <circle cx="5" cy="8" r="1.5" fill="#7BE05A" />
    <circle cx="19" cy="6" r="1.5" fill="#FF8A70" />
    <circle cx="12" cy="4" r="1.5" fill="#5EE7FF" />
    <rect x="7" y="14" width="3" height="3" fill="#FFB55C" transform="rotate(25 7 14)" />
    <rect x="15" y="12" width="3" height="3" fill="#C6A5F2" transform="rotate(-20 15 12)" />
    <rect x="11" y="18" width="3" height="3" fill="#35E0C8" transform="rotate(45 11 18)" />
  </svg>
);

/* ── 6. DYNAMIC ICON REGISTRY ─────────────────────────────────────────────── */
export const CATEGORY_ICONS: Record<string, React.FC<IconProps>> = {
  productivity: ProductivityIcon,
  wellness: WellnessIcon,
  creativity: CreativityIcon,
  synergy: SynergyIcon,
  utility: UtilityIcon,
  lore: LoreIcon,
  settings: SettingsIcon,
};

export const AERO_ICONS: Record<string, React.FC<IconProps>> = {
  logo: AeroLogoIcon,
  dewey: DeweyIcon,
  dolphin: DolphinIcon,
  fish: FishIcon,
  butterfly: ButterflyIcon,
  productivity: ProductivityIcon,
  wellness: WellnessIcon,
  creativity: CreativityIcon,
  synergy: SynergyIcon,
  utility: UtilityIcon,
  lore: LoreIcon,
  settings: SettingsIcon,
  folder: FolderIcon,
  star: StarIcon,
  search: SearchIcon,
  close: CloseIcon,
  minimize: MinimizeIcon,
  maximize: MaximizeIcon,
  volume: VolumeIcon,
  mute: MuteIcon,
  calm: CalmWatersIcon,
  sparkle: SparkleIcon,
  cloud: CloudBubbleIcon,
  bubble: BubbleIcon,
  confetti: ConfettiIcon,
};
