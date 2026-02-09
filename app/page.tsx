"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HolographicCard } from './components/HolographicCard';
import { AIPersonalityShowcase } from './components/AIPersonalityShowcase';
import { GraduationCap, Users, Sparkles, Brain } from 'lucide-react';

export default function Home() {
  const [showPersonalityShowcase, setShowPersonalityShowcase] = useState(false);
  
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black w-full">
      {/* Simplified Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4 py-12">
        
        {/* Logo - Simplified */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div 
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(255, 0, 110, 0.2))',
              border: '2px solid rgba(0, 240, 255, 0.3)',
              boxShadow: '0 0 30px rgba(0, 240, 255, 0.2)',
            }}
          >
            <Brain className="w-10 h-10 sm:w-12 sm:h-12" style={{ color: '#00F0FF' }} />
          </div>
        </motion.div>
        
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 text-center"
        >
          <span className="text-white">TAN</span>
          <span 
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #00F0FF, #B829DD, #FF006E)' }}
          >
            DEM
          </span>
        </motion.h1>
        
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl sm:text-2xl text-center mb-2 max-w-2xl"
          style={{ color: '#8B8B9E' }}
        >
          The Collaboration Dojo
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base sm:text-lg text-center mb-10 max-w-xl"
          style={{ color: '#6B6B7E' }}
        >
          Practice working with AI through real problems
        </motion.p>
        
        {/* CTA Button - More Prominent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <Link href="/onboarding">
            <motion.button
              className="relative px-10 py-4 rounded-full text-lg font-bold uppercase tracking-wider"
              style={{
                background: 'linear-gradient(135deg, #00F0FF 0%, #B829DD 50%, #FF006E 100%)',
                boxShadow: '0 4px 30px rgba(0, 240, 255, 0.4)',
                color: 'white',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 6px 40px rgba(0, 240, 255, 0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              Enter The Dojo
            </motion.button>
          </Link>
        </motion.div>
        
        {/* Feature Cards - Grid Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-4xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Practice Classes Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-8 rounded-2xl border text-center cursor-pointer transition-all"
              style={{
                background: 'rgba(0, 240, 255, 0.05)',
                borderColor: 'rgba(0, 240, 255, 0.2)',
              }}
            >
              <GraduationCap 
                className="w-12 h-12 mx-auto mb-4" 
                style={{ color: '#00F0FF' }} 
              />
              <div 
                className="text-4xl font-bold mb-2"
                style={{ 
                  color: '#00F0FF',
                  textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' 
                }}
              >
                6
              </div>
              <div className="text-sm font-medium text-gray-300 mb-1">
                Practice Classes
              </div>
              <div className="text-xs text-gray-500">
                Structured learning paths
              </div>
            </motion.div>
            
            {/* AI Personalities Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setShowPersonalityShowcase(true)}
              className="p-8 rounded-2xl border text-center cursor-pointer transition-all"
              style={{
                background: 'rgba(255, 0, 110, 0.05)',
                borderColor: 'rgba(255, 0, 110, 0.2)',
              }}
            >
              <Users 
                className="w-12 h-12 mx-auto mb-4" 
                style={{ color: '#FF006E' }} 
              />
              <div 
                className="text-4xl font-bold mb-2"
                style={{ 
                  color: '#FF006E',
                  textShadow: '0 0 20px rgba(255, 0, 110, 0.5)' 
                }}
              >
                4
              </div>
              <div className="text-sm font-medium text-gray-300 mb-1">
                AI Personalities
              </div>
              <div className="text-xs text-gray-500">
                Different collaboration styles
              </div>
            </motion.div>
            
            {/* Skill Tokens Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-8 rounded-2xl border text-center cursor-pointer transition-all"
              style={{
                background: 'rgba(184, 41, 221, 0.05)',
                borderColor: 'rgba(184, 41, 221, 0.2)',
              }}
            >
              <Sparkles 
                className="w-12 h-12 mx-auto mb-4" 
                style={{ color: '#B829DD' }} 
              />
              <div 
                className="text-4xl font-bold mb-2"
                style={{ 
                  color: '#B829DD',
                  textShadow: '0 0 20px rgba(184, 41, 221, 0.5)' 
                }}
              >
                ∞
              </div>
              <div className="text-sm font-medium text-gray-300 mb-1">
                Skill Tokens
              </div>
              <div className="text-xs text-gray-500">
                Track your growth
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Sample Card Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 hidden sm:block"
        >
          <p className="text-center text-gray-500 mb-6 text-sm uppercase tracking-widest">
            Preview Your Future Artifacts
          </p>
          <HolographicCard
            name="Precision Intent"
            description="You practiced being specific about what you want"
            rarity="rare"
            icon="✦"
          />
        </motion.div>
        
        {/* AI Personality Showcase Modal */}
        <AIPersonalityShowcase 
          isOpen={showPersonalityShowcase} 
          onClose={() => setShowPersonalityShowcase(false)} 
        />
      </div>
    </div>
  );
}
