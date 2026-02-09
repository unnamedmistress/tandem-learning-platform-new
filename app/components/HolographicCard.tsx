"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface HolographicCardProps {
  name: string;
  description: string;
  icon?: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt?: string;
  className?: string;
}

export function HolographicCard({
  name,
  description,
  icon = "◆",
  rarity = 'common',
  earnedAt,
  className = '',
}: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    setTransform({ rotateX, rotateY });
  };
  
  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };
  
  const rarityColors = {
    common: { border: '#8B8B9E', glow: 'rgba(139, 139, 158, 0.3)' },
    rare: { border: '#00F0FF', glow: 'rgba(0, 240, 255, 0.4)' },
    epic: { border: '#B829DD', glow: 'rgba(184, 41, 221, 0.4)' },
    legendary: { border: '#FF006E', glow: 'rgba(255, 0, 110, 0.5)' },
  };
  
  const colors = rarityColors[rarity];
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative w-64 h-80 cursor-pointer ${className}`}
      style={{
        perspective: '1000px',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
    >
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered 
            ? `0 20px 40px rgba(0,0,0,0.4), 0 0 30px ${colors.glow}`
            : '0 10px 30px rgba(0,0,0,0.3)',
        }}
      >
        {/* Base card background */}
        <div className="absolute inset-0 bg-[#12121A]" />
        
        {/* Holographic shimmer effect */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(
              ${105 + transform.rotateY}deg,
              transparent 0%,
              rgba(0, 240, 255, 0.1) 20%,
              rgba(184, 41, 221, 0.2) 40%,
              rgba(255, 0, 110, 0.1) 60%,
              transparent 80%
            )`,
            transition: 'background 0.1s ease-out',
          }}
        />
        
        {/* Border gradient */}
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{
            border: `2px solid ${colors.border}`,
            boxShadow: `inset 0 0 20px ${colors.glow}, 0 0 20px ${colors.glow}`,
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Rarity badge */}
          <div className="flex justify-between items-start mb-4">
            <span 
              className="text-xs uppercase tracking-widest px-2 py-1 rounded"
              style={{ 
                background: `rgba(255,255,255,0.1)`,
                color: colors.border,
                textShadow: `0 0 10px ${colors.glow}`,
              }}
            >
              {rarity}
            </span>
            {earnedAt && (
              <span className="text-xs text-gray-500">
                {new Date(earnedAt).toLocaleDateString()}
              </span>
            )}
          </div>
          
          {/* Icon */}
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              className="text-6xl"
              style={{
                textShadow: `0 0 30px ${colors.glow}`,
                color: colors.border,
              }}
              animate={isHovered ? { 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              } : {}}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.div>
          </div>
          
          {/* Text content */}
          <div className="mt-4">
            <h3 
              className="text-lg font-bold mb-1"
              style={{ 
                color: '#fff',
                textShadow: `0 0 10px ${colors.glow}`,
              }}
            >
              {name}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        
        {/* Corner decorations */}
        <div 
          className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2"
          style={{ borderColor: colors.border, opacity: 0.5 }}
        />
        <div 
          className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2"
          style={{ borderColor: colors.border, opacity: 0.5 }}
        />
        <div 
          className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2"
          style={{ borderColor: colors.border, opacity: 0.5 }}
        />
        <div 
          className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2"
          style={{ borderColor: colors.border, opacity: 0.5 }}
        />
      </div>
    </motion.div>
  );
}
