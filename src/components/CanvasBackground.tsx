'use client';

import { useEffect, useRef } from 'react';

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      time += 0.003;
      
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear with dark gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#020617'); // slate-950
      gradient.addColorStop(1, '#0f172a'); // slate-900
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw floating glowing orbs
      const drawOrb = (x: number, y: number, r: number, color: string) => {
          ctx.beginPath();
          const p = ctx.createRadialGradient(x, y, 0, x, y, r);
          p.addColorStop(0, color);
          p.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = p;
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
      }

      // Purple orb
      drawOrb(
        width/2 + Math.cos(time) * width*0.35, 
        height/2 + Math.sin(time*0.8) * height*0.35, 
        Math.max(width, height) * 0.4, 
        'rgba(147, 51, 234, 0.15)' 
      );

      // Blue orb
      drawOrb(
        width/2 + Math.cos(time*1.2 + Math.PI) * width*0.3, 
        height/2 + Math.sin(time*0.6) * height*0.3, 
        Math.max(width, height) * 0.45, 
        'rgba(59, 130, 246, 0.15)' 
      );
      
      // Pink orb
      drawOrb(
        width/2 + Math.cos(time*0.5) * width*0.2, 
        height/2 + Math.sin(time*1.1 + Math.PI) * height*0.4, 
        Math.max(width, height) * 0.35, 
        'rgba(236, 72, 153, 0.1)' 
      );

      // Add stars/particles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(i * 123.45 + time * 0.5) * 0.5 + 0.5) * width;
        const y = (Math.cos(i * 321.65 + time * 0.3) * 0.5 + 0.5) * height;
        const size = (Math.sin(i * 456.78 + time * 2) * 0.5 + 0.5) * 2;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
    />
  );
}
