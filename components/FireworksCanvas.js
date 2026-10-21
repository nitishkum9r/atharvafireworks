'use client';

import React, { useEffect, useRef } from 'react';

export default function FireworksCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    let particles = [];

    const handleResize = () => {
      const parent = canvas.parentElement;
      width = canvas.width = (parent?.clientWidth || window.innerWidth) * (window.devicePixelRatio || 1);
      height = canvas.height = (parent?.clientHeight || window.innerHeight) * (window.devicePixelRatio || 1);
      ctx.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const burstColors = ['#f5b037', '#ffd47a', '#ff6b6b', '#38bdf8', '#c084fc', '#4ade80'];

    const createBurst = (x, y) => {
      const count = 42;
      const baseColor = burstColors[Math.floor(Math.random() * burstColors.length)];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.2 + Math.random() * 3.8;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 45 + Math.random() * 25,
          maxLife: 70,
          color: Math.random() > 0.4 ? baseColor : '#ffd47a',
          size: 1.5 + Math.random() * 1.5,
        });
      }
    };

    let tick = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      tick++;
      if (tick % 45 === 0 && Math.random() < 0.85) {
        const displayW = canvas.clientWidth || 800;
        const displayH = canvas.clientHeight || 500;
        createBurst(
          displayW * 0.15 + Math.random() * (displayW * 0.7),
          displayH * 0.15 + Math.random() * (displayH * 0.55)
        );
      }

      particles = particles.filter((p) => p.life > 0);

      for (const p of particles) {
        const alpha = Math.max(0, p.life / p.maxLife);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.045; // subtle gravity
        p.vx *= 0.985;
        p.life -= 1;
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.85,
      }}
      aria-hidden="true"
    />
  );
}
