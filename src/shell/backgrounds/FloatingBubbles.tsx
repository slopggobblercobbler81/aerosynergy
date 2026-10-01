import React, { useEffect, useRef } from 'react';

interface FloatingBubblesProps {
  calm?: boolean;
}

interface BubbleParticle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
}

export const FloatingBubbles: React.FC<FloatingBubblesProps> = ({ calm = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const isPaused = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Pause on tab visibility change per §13.2, §16
    const handleVisibilityChange = () => {
      isPaused.current = document.hidden || calm;
      if (!isPaused.current && !animFrameId.current) {
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const bubbleCount = 28;
    const bubbles: BubbleParticle[] = [];

    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 12 + Math.random() * 26,
        speedY: 0.3 + Math.random() * 0.7,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: 0.2 + Math.random() * 0.45,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    const render = () => {
      if (document.hidden || calm) {
        animFrameId.current = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw each bubble
      for (const b of bubbles) {
        b.y -= b.speedY;
        b.wobble += b.wobbleSpeed;
        b.x += Math.sin(b.wobble) * 0.5 + b.speedX;

        // Reset when exiting top
        if (b.y + b.radius < 0) {
          b.y = height + b.radius;
          b.x = Math.random() * width;
        }
        if (b.x < -b.radius) b.x = width + b.radius;
        if (b.x > width + b.radius) b.x = -b.radius;

        // Render bubble body
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(
          b.x - b.radius * 0.3,
          b.y - b.radius * 0.3,
          b.radius * 0.1,
          b.x,
          b.y,
          b.radius
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${b.opacity * 0.8})`);
        grad.addColorStop(0.5, `rgba(94, 231, 255, ${b.opacity * 0.4})`);
        grad.addColorStop(0.9, `rgba(30, 144, 214, ${b.opacity * 0.6})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${b.opacity * 0.9})`);

        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = `rgba(255, 255, 255, ${b.opacity * 0.8})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Specular highlight arc
        ctx.beginPath();
        ctx.arc(b.x - b.radius * 0.35, b.y - b.radius * 0.35, b.radius * 0.35, Math.PI * 1.1, Math.PI * 1.8);
        ctx.strokeStyle = `rgba(255, 255, 255, ${b.opacity * 0.95})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    if (!calm && !document.hidden) {
      render();
    } else {
      // If calm or hidden, draw static single frame
      ctx.clearRect(0, 0, width, height);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [calm]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        background: 'linear-gradient(180deg, #E3F6FF 0%, #A6E1FF 35%, #4FC3F7 70%, #1E90D6 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Aurora glow overlay */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-20%',
          width: '140%',
          height: '60%',
          background: 'radial-gradient(ellipse at 50% 30%, rgba(94, 231, 255, 0.45) 0%, rgba(53, 224, 200, 0.2) 50%, transparent 80%)',
          pointerEvents: 'none',
          filter: 'blur(30px)',
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};