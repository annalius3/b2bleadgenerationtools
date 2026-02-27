'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  size: number;
};

const wrapLines = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';

  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) {
    lines.push(line);
  }
  return lines;
};

export const InteractiveParticleHeading = ({ text }: { text: string }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) {
      return;
    }

    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) {
      return;
    }

    let particles: Particle[] = [];
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999, active: false };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    let resizeRaf = 0;

    const setupParticles = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = wrapper.clientWidth;
      const fontSize = width >= 1024 ? 64 : width >= 768 ? 56 : width >= 640 ? 46 : width >= 420 ? 36 : 30;
      const lineHeight = Math.round(fontSize * 1.2);
      // Keep text width inside canvas on narrow screens to avoid clipping.
      const maxTextWidth = Math.max(Math.min(width - 12, 1200), 140);

      const temp = document.createElement('canvas');
      const tctx = temp.getContext('2d');
      if (!tctx) {
        return;
      }

      tctx.font = `700 ${fontSize}px Inter, sans-serif`;
      const lines = wrapLines(tctx, text, maxTextWidth);
      height = Math.max(lines.length * lineHeight + 40, fontSize + 40);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#0f172a';
      context.textBaseline = 'middle';
      context.textAlign = 'left';
      context.font = `700 ${fontSize}px Inter, sans-serif`;

      const blockHeight = lines.length * lineHeight;
      const startY = (height - blockHeight) / 2 + lineHeight / 2;
      lines.forEach((line, index) => {
        context.fillText(line, 0, startY + index * lineHeight);
      });

      const data = context.getImageData(0, 0, width, height).data;
      context.clearRect(0, 0, width, height);

      const step = 1;
      const candidates: Particle[] = [];
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const alpha = data[(y * width + x) * 4 + 3];
          if (alpha > 80) {
            const scatter = 18;
            candidates.push({
              x: x + (Math.random() - 0.5) * scatter,
              y: y + (Math.random() - 0.5) * scatter,
              ox: x,
              oy: y,
              vx: 0,
              vy: 0,
              size: 0.65 + Math.random() * 0.55
            });
          }
        }
      }

      // Keep visual density high, but cap total particles for smooth interaction.
      const maxParticles = width >= 1024 ? 26000 : width >= 768 ? 20000 : 10000;
      if (candidates.length <= maxParticles) {
        particles = candidates;
      } else {
        const stride = candidates.length / maxParticles;
        particles = [];
        for (let i = 0; i < maxParticles; i += 1) {
          particles.push(candidates[Math.floor(i * stride)]);
        }
      }
    };

    const tick = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = '#000000';
      const radius = coarsePointer ? 85 : 110;
      const radiusSq = radius * radius;

      for (const particle of particles) {
        if (mouse.active && !reducedMotion) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < radiusSq && distSq > 0.0001) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / radius) * 0.7;
            const invDist = 1 / dist;
            particle.vx += dx * invDist * force;
            particle.vy += dy * invDist * force;
          }
        }

        particle.vx += (particle.ox - particle.x) * 0.03;
        particle.vy += (particle.oy - particle.y) * 0.03;
        particle.vx *= 0.88;
        particle.vy *= 0.88;
        particle.x += particle.vx;
        particle.y += particle.vy;

        context.fillRect(particle.x, particle.y, particle.size, particle.size);
      }

      raf = requestAnimationFrame(tick);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(setupParticles);
    };

    setupParticles();
    tick();

    canvas.addEventListener('pointermove', handlePointerMove, { passive: true });
    canvas.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    canvas.addEventListener('pointerup', handlePointerLeave, { passive: true });
    canvas.addEventListener('pointercancel', handlePointerLeave, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(wrapper);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      canvas.removeEventListener('pointerup', handlePointerLeave);
      canvas.removeEventListener('pointercancel', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      resizeObserver.disconnect();
    };
  }, [text]);

  return (
    <h1 className="max-w-4xl" aria-label={text}>
      <span className="sr-only">{text}</span>
      <div ref={wrapperRef} className="w-full">
        <canvas ref={canvasRef} className="block h-auto w-full" />
      </div>
      <noscript>
        <span className="text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">{text}</span>
      </noscript>
    </h1>
  );
};
