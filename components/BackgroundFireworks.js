'use client';

import React, { useEffect, useRef } from 'react';

export default function BackgroundFireworks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Colorful Diwali palette
    const colors = [
      { r: 255, g: 42, b: 109 },   // Neon ruby/magenta
      { r: 255, g: 183, b: 3 },    // Marigold gold
      { r: 5, g: 217, b: 232 },    // Electric cyan
      { r: 0, g: 245, b: 212 },    // Radiant emerald
      { r: 155, g: 93, b: 229 },   // Cosmic purple
      { r: 255, g: 107, b: 107 },  // Coral festive
      { r: 254, g: 228, b: 64 },   // Bright lemon gold
      { r: 255, g: 159, b: 28 },   // Sunset saffron
    ];

    let rockets = [];
    let particles = [];
    let sparkles = [];

    // Helper: random in range
    const rand = (min, max) => Math.random() * (max - min) + min;

    class Rocket {
      constructor(targetX, targetY) {
        this.x = rand(width * 0.1, width * 0.9);
        this.y = height + 10;
        this.targetX = targetX || rand(width * 0.15, width * 0.85);
        this.targetY = targetY || rand(height * 0.1, height * 0.5);
        const angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
        const speed = rand(12, 17);
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.trail = [];
        this.exploded = false;
      }

      update() {
        this.trail.push({ x: this.x, y: this.y, alpha: 0.8 });
        if (this.trail.length > 7) this.trail.shift();

        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.08; // mild gravity on rocket

        // Check if reached apex or near target
        const dist = Math.hypot(this.targetX - this.x, this.targetY - this.y);
        if (dist < 25 || this.vy >= -0.5 || this.y <= this.targetY) {
          this.explode();
        }
      }

      explode() {
        this.exploded = true;
        const count = width < 768 ? 48 : 80;
        const baseColor = this.color;
        const secondaryColor = colors[Math.floor(Math.random() * colors.length)];

        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count + rand(-0.15, 0.15);
          const speed = rand(2, 6.5);
          const color = Math.random() > 0.35 ? baseColor : secondaryColor;
          particles.push(new Particle(this.x, this.y, Math.cos(angle) * speed, Math.sin(angle) * speed, color));
        }

        // Add some glittering flash
        for (let j = 0; j < 16; j++) {
          sparkles.push(new Sparkle(this.x + rand(-20, 20), this.y + rand(-20, 20), secondaryColor));
        }
      }

      draw() {
        // Draw rocket glowing trail
        for (let i = 0; i < this.trail.length; i++) {
          const t = this.trail[i];
          const a = (i / this.trail.length) * 0.8;
          ctx.beginPath();
          ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 230, 150, ${a})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class Particle {
      constructor(x, y, vx, vy, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.life = rand(50, 85);
        this.maxLife = this.life;
        this.size = rand(1.8, 3.2);
        this.decay = rand(0.965, 0.985);
        this.twinkle = Math.random() > 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.055; // gravity
        this.vx *= this.decay;
        this.vy *= this.decay;
        this.life -= 1;
      }

      draw() {
        const progress = this.life / this.maxLife;
        let alpha = progress;
        if (this.twinkle && Math.random() < 0.25) {
          alpha *= 0.3; // sparkling effect
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.5, this.size * progress), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})`;
        ctx.fill();
      }
    }

    class Sparkle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.life = rand(25, 45);
        this.maxLife = this.life;
        this.size = rand(1.5, 3.5);
      }
      update() {
        this.y += 0.2;
        this.life -= 1;
      }
      draw() {
        const a = (this.life / this.maxLife) * (Math.random() > 0.3 ? 1 : 0.2);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${a})`;
        ctx.fill();
      }
    }

    // Auto-launch rockets at intervals
    let lastLaunch = 0;
    let launchInterval = 1300; // ms between bursts

    // User tap or click to launch firework anywhere!
    const handleUserBurst = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY || (e.touches && e.touches[0]?.clientY);
      if (clientX !== undefined && clientY !== undefined) {
        // Direct explosion at click point
        const color = colors[Math.floor(Math.random() * colors.length)];
        const count = 55;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = rand(2, 6.5);
          particles.push(new Particle(clientX, clientY, Math.cos(angle) * speed, Math.sin(angle) * speed, color));
        }
        for (let j = 0; j < 12; j++) {
          sparkles.push(new Sparkle(clientX + rand(-20, 20), clientY + rand(-20, 20), color));
        }
      }
    };

    window.addEventListener('click', handleUserBurst);
    window.addEventListener('touchstart', handleUserBurst, { passive: true });

    let lastTime = performance.now();

    const loop = (currentTime) => {
      // Clear with slight trailing blend for cosmic illumination
      ctx.clearRect(0, 0, width, height);

      // Auto launch
      if (currentTime - lastLaunch > launchInterval) {
        lastLaunch = currentTime;
        rockets.push(new Rocket());
        if (Math.random() < 0.45) {
          setTimeout(() => {
            rockets.push(new Rocket());
          }, rand(200, 450));
        }
        launchInterval = rand(1200, 2400);
      }

      // Update & Draw Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.update();
        r.draw();
        if (r.exploded) rockets.splice(i, 1);
      }

      // Update & Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.life <= 0) particles.splice(i, 1);
      }

      // Update & Draw Sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.update();
        s.draw();
        if (s.life <= 0) sparkles.splice(i, 1);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleUserBurst);
      window.removeEventListener('touchstart', handleUserBurst);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1, // Behind cards, above deepest background
        opacity: 0.95,
      }}
      aria-hidden="true"
    />
  );
}
