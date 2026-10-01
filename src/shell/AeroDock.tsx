import React, { useState, useEffect, useRef } from 'react';
import { FeatureManifest, FeatureCategory } from '../core/types';
import { DeweyIcon } from '../styles/icons';
import { playSound } from '../core/audio';

interface AeroDockProps {
  manifests: FeatureManifest[];
  onOpenFeature: (id: string) => void;
  calmWaters?: boolean;
}

const CATEGORIES: { id: FeatureCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'All Bubbles', icon: '🌐' },
  { id: 'productivity', label: 'Productivity', icon: '☑️' },
  { id: 'wellness', label: 'Wellness', icon: '💧' },
  { id: 'ai-insights', label: 'AI Insights', icon: '🤖' },
  { id: 'gadgets', label: 'Gadgets', icon: '🕐' },
  { id: 'media-ambience', label: 'Ambience', icon: '🎵' },
  { id: 'gamification', label: 'Quests & XP', icon: '🏅' },
  { id: 'personalization', label: 'Style & Toggles', icon: '⚙️' },
  { id: 'lore-easter-eggs', label: 'Secrets & Lore', icon: '🕹️' },
  { id: 'meta', label: 'Meta Lagoon', icon: '📜' },
  { id: 'synergy', label: 'Synergy Bridges', icon: '🌉' },
];

export const AeroDock: React.FC<AeroDockProps> = ({ manifests, onOpenFeature, calmWaters = false }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FeatureCategory | 'all'>('all');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('as365:shell:favorites');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Keyboard shortcut: '/' focuses search per §8.1
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id];
    setFavorites(next);
    try {
      localStorage.setItem('as365:shell:favorites', JSON.stringify(next));
    } catch {}
  };

  const handleSurpriseMe = () => {
    if (manifests.length === 0) return;
    playSound('bloop');
    const randomFeature = manifests[Math.floor(Math.random() * manifests.length)];
    onOpenFeature(randomFeature.id);
  };

  const filtered = manifests.filter((m) => {
    const matchesCat = selectedCategory === 'all' || m.category === selectedCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      m.title.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.id.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div
      className="glass-panel"
      style={{
        margin: '20px auto',
        maxWidth: '1080px',
        padding: '18px 24px',
        boxShadow: '0 10px 40px rgba(11, 79, 138, 0.25)',
      }}
    >
      {/* Top Bar: Search, Category Bar, Surprise Me */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '16px',
          flexWrap: 'wrap',
        }}
      >
        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1 1 280px' }}>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search bubbles... (Press '/' to focus) 🔍"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px',
              paddingRight: '36px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(8px)',
              fontSize: '14px',
              color: 'var(--text-primary)',
              outline: 'none',
              boxSizing: 'border-box',
              boxShadow: 'inset 0 1px 3px rgba(11, 79, 138, 0.1)',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6D8391',
                fontSize: '14px',
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Surprise Me Button */}
        <button onClick={handleSurpriseMe} className="gloss-orb" style={{ padding: '8px 18px', fontSize: '13px' }}>
          Surprise Me 🎲
        </button>
      </div>

      {/* Category Filter Chips */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '16px',
          scrollbarWidth: 'thin',
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                playSound('droplet');
                setSelectedCategory(cat.id);
              }}
              style={{
                whiteSpace: 'nowrap',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: isActive ? '1px solid var(--aqua-bright)' : '1px solid rgba(255, 255, 255, 0.7)',
                background: isActive
                  ? 'radial-gradient(circle at 50% 20%, #4FC3F7 0%, #1E90D6 100%)'
                  : 'rgba(255, 255, 255, 0.6)',
                color: isActive ? '#FFFFFF' : 'var(--text-primary)',
                boxShadow: isActive ? '0 3px 10px rgba(0, 200, 230, 0.35)' : 'none',
                transition: 'all 120ms ease',
              }}
            >
              {cat.icon} {cat.label}
            </button>
          );
        })}
      </div>

      {/* Feature Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '36px 16px' }}>
          <DeweyIcon size={64} mood="happy" />
          <p
            style={{
              fontSize: '15px',
              color: 'var(--sky-deep)',
              fontWeight: 600,
              marginTop: '12px',
            }}
          >
            "You've got this! Try searching for bubbles or orbs! 💧"
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            No features matched "{search}". Check your category filters or try a different term!
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '14px',
            maxHeight: '440px',
            overflowY: 'auto',
            paddingRight: '6px',
          }}
        >
          {filtered.map((item) => {
            const isFav = favorites.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => {
                  playSound('bloop');
                  onOpenFeature(item.id);
                }}
                className="glass-panel"
                style={{
                  padding: '14px',
                  cursor: 'pointer',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.65)',
                  transition: 'transform 140ms ease, box-shadow 140ms ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (!calmWaters) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 200, 230, 0.35)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!calmWaters) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px var(--shadow-soft)';
                  }
                }}
              >
                {/* Header: Icon, Title, Favorite Star */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '22px' }}>{item.icon}</span>
                    <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--sky-deep)' }}>
                      {item.title}
                    </span>
                  </div>
                  <button
                    onClick={(e) => toggleFavorite(item.id, e)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                      padding: 0,
                      opacity: isFav ? 1 : 0.3,
                      transition: 'opacity 120ms',
                    }}
                    title={isFav ? 'Unfavorite' : 'Favorite'}
                  >
                    ⭐
                  </button>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    margin: '8px 0 0 0',
                    lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.description}
                </p>

                {/* Footer Badges */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '10px',
                    fontSize: '11px',
                    color: '#6D8391',
                  }}
                >
                  <span className="drop-badge" style={{ padding: '2px 8px', fontSize: '10px' }}>
                    {item.category}
                  </span>
                  <span>⚡ {item.synergyScore}%</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};