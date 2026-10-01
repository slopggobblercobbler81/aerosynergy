import React, { Component, ErrorInfo, ReactNode } from 'react';
import { DeweyIcon } from '../styles/icons';
import { recordPoppedBubble } from './diagnostics';

interface Props {
  featureId?: string;
  onClose?: () => void;
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class BubbleBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const id = this.props.featureId || 'unknown-bubble';
    console.error(`[BubbleBoundary] Popped in ${id}:`, error, errorInfo);
    recordPoppedBubble(id, error);
  }

  public handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          className="glass-panel"
          style={{
            padding: '24px',
            textAlign: 'center',
            maxWidth: '380px',
            margin: '20px auto',
            background: 'rgba(255, 255, 255, 0.75)',
            boxShadow: '0 8px 32px rgba(11, 79, 138, 0.3)',
          }}
        >
          <div style={{ marginBottom: '16px' }}>
            <DeweyIcon size={72} mood="popped" />
          </div>
          <h3
            style={{
              margin: '0 0 8px 0',
              color: 'var(--sky-deep)',
              fontSize: '18px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            🫧 Oops! This bubble popped.
          </h3>
          <p
            style={{
              margin: '0 0 16px 0',
              color: 'var(--text-muted)',
              fontSize: '14px',
            }}
          >
            Our AI is already reimagining it ✨
          </p>
          {this.state.error && (
            <div
              style={{
                fontSize: '11px',
                color: '#6D8391',
                background: 'rgba(255, 255, 255, 0.6)',
                padding: '6px 10px',
                borderRadius: '6px',
                marginBottom: '16px',
                maxHeight: '60px',
                overflow: 'auto',
                fontFamily: 'monospace',
                textAlign: 'left',
              }}
            >
              {this.state.error.message}
            </div>
          )}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={this.handleRetry}
              className="gloss-orb"
              style={{ padding: '8px 18px', fontSize: '13px' }}
            >
              Retry 🔄
            </button>
            {this.props.onClose && (
              <button
                onClick={this.props.onClose}
                className="gloss-orb"
                style={{
                  padding: '8px 18px',
                  fontSize: '13px',
                  background: 'radial-gradient(circle at 50% 20%, #AFC3CE 0%, #6D8391 100%)',
                }}
              >
                Close ❌
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}