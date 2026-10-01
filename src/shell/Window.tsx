import React, { useState, useRef, useEffect } from 'react';
import { BubbleBoundary } from '../core/bubble-boundary';
import { playSound } from '../core/audio';

interface WindowProps {
  id: string;
  title: string;
  icon: string;
  zIndex: number;
  initialX?: number;
  initialY?: number;
  onFocus: () => void;
  onClose: () => void;
  calmWaters?: boolean;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  zIndex,
  initialX = 120,
  initialY = 100,
  onFocus,
  onClose,
  calmWaters = false,
  children,
}) => {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, posX: 0, posY: 0 });
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: pos.x,
      posY: pos.y,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;

      // Clamped within viewport
      const nextX = Math.max(10, Math.min(window.innerWidth - 300, dragStartRef.current.posX + dx));
      const nextY = Math.max(10, Math.min(window.innerHeight - 80, dragStartRef.current.posY + dy));

      setPos({ x: nextX, y: nextY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      onClick={onFocus}
      className={`glass-panel ${!calmWaters ? 'floor-reflect' : ''}`}
      style={{
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: '420px',
        zIndex,
        boxShadow: isDragging
          ? '0 16px 48px rgba(0, 200, 230, 0.45)'
          : '0 10px 36px var(--shadow-soft)',
        transition: isDragging || calmWaters ? 'none' : 'box-shadow 150ms ease',
        userSelect: isDragging ? 'none' : 'auto',
      }}
    >
      {/* Chrome Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        className="chrome-titlebar"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          cursor: isDragging ? 'grabbing' : 'grab',
          borderTopLeftRadius: '14px',
          borderTopRightRadius: '14px',
        }}
      >
        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
          <span style={{ fontSize: '16px' }}>{icon}</span>
          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{title}</span>
        </div>

        {/* Window Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              playSound('bloop');
              setIsMinimized(!isMinimized);
            }}
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              background: 'radial-gradient(circle at 40% 30%, #FFB55C 0%, #FF8A70 100%)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              fontSize: '10px',
              color: '#FFFFFF',
              fontWeight: 'bold',
            }}
            title={isMinimized ? 'Expand' : 'Minimize'}
          >
            {isMinimized ? '+' : '–'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              playSound('droplet');
              onClose();
            }}
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.9)',
              background: 'radial-gradient(circle at 40% 30%, #FF8A70 0%, #E63946 100%)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              fontSize: '10px',
              color: '#FFFFFF',
              fontWeight: 'bold',
            }}
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Body Content wrapped in BubbleBoundary */}
      {!isMinimized && (
        <div style={{ padding: '16px', maxHeight: '520px', overflowY: 'auto' }}>
          <BubbleBoundary featureId={id} onClose={onClose}>
            {children}
          </BubbleBoundary>
        </div>
      )}
    </div>
  );
};