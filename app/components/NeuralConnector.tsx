"use client";

import { useEffect, useRef } from 'react';

interface NeuralConnectorProps {
  intensity?: 'low' | 'medium' | 'high';
  state?: 'idle' | 'active' | 'pulsing';
  className?: string;
}

export function NeuralConnector({ 
  intensity = 'medium', 
  state = 'idle',
  className = '' 
}: NeuralConnectorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);
    
    // Animation variables
    let animationId: number;
    let time = 0;
    const particles: Array<{
      x: number;
      y: number;
      speed: number;
      offset: number;
    }> = [];
    
    // Initialize particles based on intensity
    const particleCount = intensity === 'high' ? 8 : intensity === 'medium' ? 5 : 3;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: 0,
        y: 0.2 + (i / particleCount) * 0.6,
        speed: 0.002 + Math.random() * 0.003,
        offset: Math.random() * Math.PI * 2,
      });
    }
    
    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, width, height);
      
      // Draw main connection curve
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      
      const controlY1 = height / 2 + Math.sin(time * 0.5) * 20;
      const controlY2 = height / 2 + Math.cos(time * 0.3) * 20;
      
      ctx.bezierCurveTo(
        width * 0.3, controlY1,
        width * 0.7, controlY2,
        width, height / 2
      );
      
      // Stroke style based on state
      const alpha = state === 'pulsing' 
        ? 0.3 + Math.sin(time * 3) * 0.2 
        : state === 'active' 
          ? 0.6 
          : 0.3;
      
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, `rgba(0, 240, 255, ${alpha})`);
      gradient.addColorStop(0.5, `rgba(184, 41, 221, ${alpha * 1.2})`);
      gradient.addColorStop(1, `rgba(255, 0, 110, ${alpha})`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = intensity === 'high' ? 3 : 2;
      ctx.setLineDash([5, 5]);
      ctx.lineDashOffset = -time * 50;
      ctx.stroke();
      
      // Draw particles
      particles.forEach((particle, i) => {
        const t = (time * particle.speed + particle.offset) % 1;
        
        // Calculate position on bezier curve
        const x = t * width;
        const curveY = height / 2 + Math.sin(time * 0.5 + i) * 15;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(x, curveY, intensity === 'high' ? 4 : 3, 0, Math.PI * 2);
        ctx.fillStyle = t < 0.5 
          ? `rgba(0, 240, 255, ${0.8 + Math.sin(time * 4) * 0.2})`
          : `rgba(255, 0, 110, ${0.8 + Math.sin(time * 4) * 0.2})`;
        ctx.fill();
        
        // Glow effect
        ctx.beginPath();
        ctx.arc(x, curveY, 10, 0, Math.PI * 2);
        ctx.fillStyle = t < 0.5 
          ? `rgba(0, 240, 255, 0.2)`
          : `rgba(255, 0, 110, 0.2)`;
        ctx.fill();
      });
      
      time += 0.016;
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [intensity, state]);
  
  return (
    <canvas 
      ref={canvasRef}
      className={`w-full h-24 ${className}`}
      style={{ imageRendering: 'crisp-edges' }}
    />
  );
}
