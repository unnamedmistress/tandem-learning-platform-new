"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { classes } from "../lib/data/classes";
import { Brain, Sparkles, ArrowRight } from 'lucide-react';

const colorMap: Record<string, { primary: string; secondary: string; glow: string }> = {
  violet: { 
    primary: '#8B5CF6', 
    secondary: '#A78BFA',
    glow: 'rgba(139, 92, 246, 0.5)'
  },
  blue: { 
    primary: '#00F0FF', 
    secondary: '#00D4FF',
    glow: 'rgba(0, 240, 255, 0.5)'
  },
  slate: { 
    primary: '#64748B', 
    secondary: '#94A3B8',
    glow: 'rgba(100, 116, 139, 0.5)'
  },
  amber: { 
    primary: '#F59E0B', 
    secondary: '#FBBF24',
    glow: 'rgba(245, 158, 11, 0.5)'
  },
  emerald: { 
    primary: '#10B981', 
    secondary: '#34D399',
    glow: 'rgba(16, 185, 129, 0.5)'
  },
  rose: { 
    primary: '#FF006E', 
    secondary: '#FF4D9E',
    glow: 'rgba(255, 0, 110, 0.5)'
  },
};

function CelestialOrb({ 
  classData, 
  index 
}: { 
  classData: typeof classes[0]; 
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = colorMap[classData.colorScheme.primary] || colorMap.slate;
  
  // Calculate orbital position for staggered layout
  const row = Math.floor(index / 3);
  const col = index % 3;
  const offsetY = row % 2 === 1 ? 50 : 0; // Stagger odd rows
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        delay: index * 0.15,
        duration: 0.8,
        type: 'spring',
        bounce: 0.3
      }}
      className="relative"
      style={{ marginTop: offsetY }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/class/${classData.id}`}>
        <div className="relative cursor-pointer group">
          {/* Outer orbit ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: `1px dashed ${colors.primary}`,
              opacity: 0.3,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20 + index * 5, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Secondary orbit ring */}
          <motion.div
            className="absolute inset-4 rounded-full"
            style={{
              border: `1px dotted ${colors.secondary}`,
              opacity: 0.2,
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 15 + index * 3, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Main planet body */}
          <motion.div
            className="relative w-48 h-48 mx-auto rounded-full overflow-hidden"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${colors.secondary}40, ${colors.primary}20, transparent)`,
              boxShadow: isHovered 
                ? `0 0 60px ${colors.glow}, inset 0 0 40px ${colors.primary}30`
                : `0 0 30px ${colors.glow}, inset 0 0 20px ${colors.primary}20`,
              border: `2px solid ${colors.primary}50`,
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {/* Planet surface texture */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 80%, ${colors.primary}40 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, ${colors.secondary}30 0%, transparent 40%),
                  radial-gradient(circle at 50% 50%, transparent 30%, ${colors.primary}20 100%)
                `,
              }}
            />
            
            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="mb-2"
              >
                <Brain 
                  className="w-8 h-8"
                  style={{ color: colors.primary, filter: `drop-shadow(0 0 10px ${colors.glow})` }}
                />
              </motion.div>
              
              <h3 
                className="text-sm font-bold uppercase tracking-wider mb-1"
                style={{ color: colors.primary }}
              >
                {classData.theme}
              </h3>
              
              <p className="text-xs text-gray-400 line-clamp-2">
                {classData.title}
              </p>
              
              {/* Hover indicator */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                className="mt-2 flex items-center gap-1 text-xs"
                style={{ color: colors.secondary }}
              >
                Enter <ArrowRight className="w-3 h-3" />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Orbiting particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: colors.primary,
                boxShadow: `0 0 10px ${colors.glow}`,
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: [0, Math.cos(i * 2.1) * 120, 0],
                y: [0, Math.sin(i * 2.1) * 120, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </Link>
      
      {/* Label below */}
      <motion.div 
        className="text-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 + index * 0.1 }}
      >
        <p className="text-sm text-gray-400 font-medium">{classData.title}</p>
        <p className="text-xs text-gray-600 mt-1">{classData.lessons.length} lessons</p>
      </motion.div>
    </motion.div>
  );
}

export default function ClassesPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] relative overflow-hidden">
      {/* Background constellation effect */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-6 h-6" style={{ color: '#00F0FF' }} />
            <span 
              className="text-sm uppercase tracking-[0.3em] font-mono"
              style={{ color: '#8B8B9E' }}
            >
              Training Halls
            </span>
            <Sparkles className="w-6 h-6" style={{ color: '#FF006E' }} />
          </div>
          
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #00F0FF, #B829DD, #FF006E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Choose Your Path
          </h1>
          
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B6B7E' }}>
            Each celestial body represents a different way of working with AI.
            <br />
            <span style={{ color: '#8B8B9E' }}>Hover to explore. Click to enter.</span>
          </p>
        </motion.div>
        
        {/* Celestial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {classes.map((classData, index) => (
            <CelestialOrb 
              key={classData.id} 
              classData={classData} 
              index={index}
            />
          ))}
        </div>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-24 max-w-2xl mx-auto"
        >
          <div 
            className="p-6 rounded-2xl border"
            style={{
              background: 'rgba(0, 240, 255, 0.03)',
              borderColor: 'rgba(0, 240, 255, 0.1)',
            }}
          >
            <p className="text-sm" style={{ color: '#8B8B9E' }}>
              <span style={{ color: '#00F0FF' }}>Pro tip:</span> Classes share the same structure but feel different. 
              The goal isn&apos;t completion—it&apos;s building your working relationship with AI.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
