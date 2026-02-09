"use client";

import { useEffect, useRef } from 'react';

interface MirrorFrameProps {
  children: React.ReactNode;
  pattern?: 'constellation' | 'wave' | 'radar';
  className?: string;
}

export function MirrorFrame({ 
  children, 
  pattern = 'constellation',
  className = '' 
}: MirrorFrameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);
    
    let animationId: number;
    let time = 0;
    
    const drawConstellation = () => {
      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;
      const radius = Math.min(centerX, centerY) - 40;
      
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      // Draw outer ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw rotating gradient border
      const gradient = ctx.createConicGradient(time * 0.5, centerX, centerY);
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0.8)');
      gradient.addColorStop(0.33, 'rgba(184, 41, 221, 0.8)');
      gradient.addColorStop(0.66, 'rgba(255, 0, 110, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 240, 255, 0.8)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 10, 0, Math.PI * 2);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Draw constellation points
      const points = 8;
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2 + time * 0.2;
        const x = centerX + Math.cos(angle) * (radius - 20);
        const y = centerY + Math.sin(angle) * (radius - 20);
        
        // Draw point
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${0.5 + Math.sin(time * 2 + i) * 0.3})`;
        ctx.fill();
        
        // Connect to center with faint line
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(centerX, centerY);
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 + Math.sin(time + i) * 0.05})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Connect to neighbors
        const nextAngle = ((i + 1) / points) * Math.PI * 2 + time * 0.2;
        const nextX = centerX + Math.cos(nextAngle) * (radius - 20);
        const nextY = centerY + Math.sin(nextAngle) * (radius - 20);
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nextX, nextY);
        ctx.strokeStyle = `rgba(184, 41, 221, ${0.2 + Math.sin(time * 1.5 + i) * 0.1})`;
        ctx.stroke();
      }
      
      // Inner pulsing circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20 + Math.sin(time * 2) * 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 0, 110, ${0.1 + Math.sin(time * 2) * 0.05})`;
      ctx.fill();
      
      time += 0.016;
      animationId = requestAnimationFrame(drawConstellation);
    };
    
    const drawWave = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, width, height);
      
      // Draw multiple wave rings
      for (let ring = 0; ring < 4; ring++) {
        ctx.beginPath();
        const ringRadius = 50 + ring * 40 + Math.sin(time * 2 + ring) * 10;
        
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
          const r = ringRadius + Math.sin(angle * 8 + time * 3 + ring) * 5;
          const x = width / 2 + Math.cos(angle) * r;
          const y = height / 2 + Math.sin(angle) * r;
          
          if (angle === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.closePath();
        const alpha = 0.3 - ring * 0.05;
        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha + Math.sin(time + ring) * 0.1})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      time += 0.016;
      animationId = requestAnimationFrame(drawWave);
    };
    
    const drawRadar = () => {
      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;
      const radius = Math.min(centerX, centerY) - 40;
      
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      // Draw concentric circles
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius / 4) * i, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Draw crosshairs
      ctx.beginPath();
      ctx.moveTo(centerX - radius, centerY);
      ctx.lineTo(centerX + radius, centerY);
      ctx.moveTo(centerX, centerY - radius);
      ctx.lineTo(centerX, centerY + radius);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.stroke();
      
      // Draw sweeping line
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.5);
      
      const sweepGradient = ctx.createLinearGradient(0, 0, radius, 0);
      sweepGradient.addColorStop(0, 'rgba(0, 240, 255, 0)');
      sweepGradient.addColorStop(0.5, 'rgba(0, 240, 255, 0.3)');
      sweepGradient.addColorStop(1, 'rgba(0, 240, 255, 0.8)');
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius, 0);
      ctx.strokeStyle = sweepGradient;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.restore();
      
      // Random blips
      if (Math.random() < 0.02) {
        const blipAngle = Math.random() * Math.PI * 2;
        const blipRadius = Math.random() * radius;
        const blipX = centerX + Math.cos(blipAngle) * blipRadius;
        const blipY = centerY + Math.sin(blipAngle) * blipRadius;
        
        ctx.beginPath();
        ctx.arc(blipX, blipY, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 0, 110, 0.8)';
        ctx.fill();
      }
      
      time += 0.016;
      animationId = requestAnimationFrame(drawRadar);
    };
    
    // Start appropriate animation
    if (pattern === 'constellation') {
      drawConstellation();
    } else if (pattern === 'wave') {
      drawWave();
    } else {
      drawRadar();
    }
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [pattern]);
  
  return (
    <div className={`relative ${className}`}>
      {/* Canvas background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
