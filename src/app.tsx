import React, { useState, useEffect, Suspense, lazy } from 'react';
import { getAllManifests } from './core/registry';
import { FeatureManifest, FeatureProps } from './core/types';
import { getNamespace } from './core/storage/storage';
import { showToast } from './core/toast';
import { playSound, isMasterMuted } from './core/audio';
import { award, getXp, subscribeAchievements } from './core/achievements';
import { mascot } from './core/mascot';
import {
  getGlobalSettings,
  updateGlobalSettings,
  subscribeGlobalSettings,
  GlobalSettingsState,
} from './core/settings';

import { ProceduralBackground } from './shell/backgrounds';
import { AeroDock } from './shell/AeroDock';
import { Window } from './shell/Window';
import { SplashScreen } from './shell/SplashScreen';
import { OnboardingWizard } from './shell/OnboardingWizard';
import { ToastsContainer } from './shell/ToastsContainer';
import { DeweyIcon } from './styles/icons';

interface OpenWindowItem {
  id: string;
  manifest: FeatureManifest;
  zIndex: number;
}

export const App: React.FC = () => {
  const [manifests, setManifests] = useState<FeatureManifest[]>([]);
  const [openWindows, setOpenWindows] = useState<OpenWindowItem[]>([]);
  const [topZIndex, setTopZIndex] = useState(100);
  const [settings, setSettings] = useState<GlobalSettingsState>(getGlobalSettings);
  const [xp, setXp] = useState<number>(getXp);
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Lazy component cache
  const [componentCache] = useState<Map<string, React.LazyExoticComponent<React.ComponentType<FeatureProps>>>>(
    () => new Map()
  );

  useEffect(() => {
    // Load manifests dynamically
    const all = getAllManifests();
    setManifests(all);

    // Subscribe to settings
    const unsubSettings = subscribeGlobalSettings((s) => setSettings({ ...s }));
    // Subscribe to achievements
    const unsubAchievements = subscribeAchievements(() => setXp(getXp()));

    // Check first-time onboarding
    try {
      const onboarded = localStorage.getItem('as365:shell:onboarding_completed');
      if (!onboarded) {
        setShowOnboarding(true);
      }
    } catch {}

    return () => {
      unsubSettings();
      unsubAchievements();
    };
  }, []);

  const openFeature = (id: string) => {
    const manifest = manifests.find((m) => m.id === id);
    if (!manifest) return;

    // Check if already open
    const existing = openWindows.find((w) => w.id === id);
    if (existing) {
      focusWindow(id);
      return;
    }

    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);

    if (!componentCache.has(id)) {
      componentCache.set(id, lazy(manifest.component));
    }

    setOpenWindows((prev) => [
      ...prev,
      {
        id,
        manifest,
        zIndex: nextZ,
      },
    ]);
  };

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const focusWindow = (id: string) => {
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: nextZ } : w))
    );
  };

  // Toggle handlers
  const toggleMute = () => {
    const nextMute = !settings.muteSounds;
    updateGlobalSettings({ muteSounds: nextMute });
    if (!nextMute) playSound('bloop');
  };

  const toggleCalm = () => {
    const nextCalm = !settings.calmWaters;
    updateGlobalSettings({ calmWaters: nextCalm });
    playSound('droplet');
    showToast(nextCalm ? '🌊 Calm Waters Mode Enabled' : '🌊 Dynamic Waters Mode Enabled', 'info');
  };

  const toggleHush = () => {
    const nextHush = !settings.hushMode;
    updateGlobalSettings({ hushMode: nextHush });
    playSound('bloop');
    if (!nextHush) {
      showToast('🤫 Hush Mode Disabled (Enthusiasm Restored!)', 'info');
    }
  };

  const themeTokens: Record<string, string> = {
    '--sky-deep': '#0B4F8A',
    '--sky-morning': '#1E90D6',
    '--sky-clear': '#4FC3F7',
    '--aqua-bright': '#00C8E6',
    '--aqua-glow': '#5EE7FF',
    '--glass-white': 'rgba(255, 255, 255, 0.55)',
  };

  return (
    <div
      className={settings.calmWaters ? 'calm-waters' : ''}
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Procedural Aero Background (Sky, Rays, Aurora, Fish, Caustics, Hills, Bubbles) */}
      <ProceduralBackground calm={settings.calmWaters} />

      {/* Splash Screen (<3s) */}
      {showSplash && (
        <SplashScreen
          onDismiss={() => setShowSplash(false)}
          muteSounds={settings.muteSounds}
        />
      )}

      {/* Onboarding Wizard */}
      {showOnboarding && (
        <OnboardingWizard onComplete={() => setShowOnboarding(false)} />
      )}

      {/* Top Header Bar */}
      <header
        className="glass-panel"
        style={{
          margin: '12px 20px',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '16px',
          zIndex: 10,
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <DeweyIcon size={34} />
          <div>
            <div
              className="chrome-text"
              style={{ fontSize: '16px', fontWeight: 800, lineHeight: '1.2' }}
            >
              AeroSynergy Ultra 365
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Cloud Bubble Edition • 1.0.0 "Dolphin Sunrise" 🌅
            </div>
          </div>
        </div>

        {/* Global Controls & XP Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* XP Badge */}
          <div
            className="drop-badge"
            style={{ fontSize: '12px', padding: '4px 12px' }}
            title="Earn XP by unlocking achievements across features!"
          >
            ⭐ {xp} XP
          </div>

          {/* Mute All Sounds 🔇 */}
          <button
            onClick={toggleMute}
            className="gloss-orb"
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              background: settings.muteSounds
                ? 'radial-gradient(circle at 50% 20%, #AFC3CE 0%, #6D8391 100%)'
                : undefined,
            }}
            title={settings.muteSounds ? 'Unmute sounds' : 'Mute All Sounds 🔇'}
          >
            {settings.muteSounds ? '🔇 Muted' : '🔊 Sound'}
          </button>

          {/* Calm Waters Mode 🌊 */}
          <button
            onClick={toggleCalm}
            className="gloss-orb"
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              background: settings.calmWaters
                ? 'radial-gradient(circle at 50% 20%, #7BE05A 0%, #3D9B32 100%)'
                : undefined,
            }}
            title="Calm Waters Mode: Reduces motion and particle effects 🌊"
          >
            {settings.calmWaters ? '🌊 Calm' : '🌊 Motion'}
          </button>

          {/* Hush Mode 🤫 */}
          <button
            onClick={toggleHush}
            className="gloss-orb"
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              background: settings.hushMode
                ? 'radial-gradient(circle at 50% 20%, #C6A5F2 0%, #7B52C7 100%)'
                : undefined,
            }}
            title="Hush Mode: Suppresses unsolicited toasts and non-essential AI remarks 🤫"
          >
            {settings.hushMode ? '🤫 Hush' : '💬 Chatty'}
          </button>
        </div>
      </header>

      {/* Main Aero Dock Launcher */}
      <main style={{ padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <AeroDock
          manifests={manifests}
          onOpenFeature={openFeature}
          calmWaters={settings.calmWaters}
        />
      </main>

      {/* Open Windows */}
      {openWindows.map((win, idx) => {
        const LazyComponent = componentCache.get(win.id);
        if (!LazyComponent) return null;

        const props: FeatureProps = {
          ns: getNamespace(win.id),
          toast: (msg, kind) => showToast(msg, kind),
          sound: (s) => playSound(s),
          award: (achId) => award(achId, settings.calmWaters),
          mascot: {
            say: (m) => mascot.say(m as any),
            image: (m) => mascot.image(m as any),
            getPhrase: (c) => mascot.getPhrase(c),
          },
          theme: themeTokens,
          hush: settings.hushMode,
          calm: settings.calmWaters,
          close: () => closeWindow(win.id),
        };

        return (
          <Window
            key={win.id}
            id={win.id}
            title={win.manifest.title}
            icon={win.manifest.icon}
            zIndex={win.zIndex}
            initialX={80 + (idx % 6) * 40}
            initialY={80 + (idx % 6) * 35}
            onFocus={() => focusWindow(win.id)}
            onClose={() => closeWindow(win.id)}
            calmWaters={settings.calmWaters}
          >
            <Suspense
              fallback={
                <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                  🫧 Shimmering into view...
                </div>
              }
            >
              <LazyComponent {...props} />
            </Suspense>
          </Window>
        );
      })}

      {/* Global Toasts */}
      <ToastsContainer calmWaters={settings.calmWaters} />
    </div>
  );
};
