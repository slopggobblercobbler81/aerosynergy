import React, { useEffect, useState } from 'react';
import { ToastItem, subscribeToasts, dismissToast } from '../core/toast';

export const ToastsContainer: React.FC<{ calmWaters?: boolean }> = ({ calmWaters = false }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    return subscribeToasts((items) => setToasts(items));
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '340px',
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => {
        let bg = 'rgba(255, 255, 255, 0.75)';
        let borderColor = 'rgba(255, 255, 255, 0.9)';
        let icon = '🫧';

        if (toast.kind === 'success') {
          bg = 'rgba(235, 255, 230, 0.85)';
          borderColor = 'rgba(123, 224, 90, 0.8)';
          icon = '🟢';
        } else if (toast.kind === 'party') {
          bg = 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(220, 245, 255, 0.85) 100%)';
          borderColor = 'rgba(94, 231, 255, 0.9)';
          icon = '🎉';
        }

        return (
          <div
            key={toast.id}
            className="glass-panel"
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              background: bg,
              borderColor: borderColor,
              boxShadow: '0 8px 24px rgba(11, 79, 138, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              pointerEvents: 'auto',
              animation: calmWaters ? 'none' : 'toastSlideIn 240ms cubic-bezier(.34, 1.56, .64, 1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <span style={{ fontSize: '16px' }}>{icon}</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{toast.message}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6D8391',
                fontSize: '14px',
                padding: '0 4px',
              }}
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
};