"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NeuralConnector } from './components/NeuralConnector';
import { HolographicCard } from './components/HolographicCard';
import { AIPersonalityShowcase } from './components/AIPersonalityShowcase';
// Note: These imports work because page.tsx is in app/ directory

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // Ensure state updates correctly
  const [showPersonalityShowcase, setShowPersonalityShowcase] = useState(false);
const ensureStructure = () => {}; // Placeholder to ensure structure is maintained
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <header className="flex items-center justify-center h-screen bg-gradient-to-b from-purple-900 via-black to-black">
  <div className="text-center px-4">
    {/* Confirm Div Structure */}
    <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-600">TANDEM</h1>
    <p className="mt-4 text-xl md:text-2xl text-gray-300">The Collaboration Dojo</p>
    <button className="mt-6 px-8 py-4 rounded-full bg-cyan-500 text-white font-bold uppercase tracking-wide hover:scale-105 transition-transform">Enter the Dojo</button>
  </div>
</header>
{/* Wrapper for main content */}
<div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black w-full">
    {/* Background settings set accurately */}
 {/* Ensure correct JSX syntax throughout */}
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-30 pointer-events-none flex items-center justify-center" style={{ backgroundImage: 'url(/path-to-hero-image.jpg)', backgroundSize: 'cover' }}>
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
            transformOrigin: 'center top',
          }}
        />
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? '#00F0FF' : '#FF006E',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Mouse-following glow */}
      <div 
        className="fixed pointer-events-none z-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.3) 0%, transparent 70%)',
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
        }}
      />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full text-center">
        
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
          className="mb-6 sm:mb-8"
        >
          <div className="relative">
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: '2px solid transparent',
                background: 'linear-gradient(#0A0A0F, #0A0A0F) padding-box, linear-gradient(135deg, #00F0FF, #FF006E) border-box',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Inner content - Mobile responsive size */}
            <div 
              className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(255, 0, 110, 0.1))',
                boxShadow: '0 0 40px rgba(0, 240, 255, 0.3), inset 0 0 40px rgba(255, 0, 110, 0.1)',
              }}
            >
              <span 
                className="text-4xl sm:text-5xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #00F0FF, #FF006E)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(0, 240, 255, 0.5)',
                }}
              >
                T
              </span>
            </div>
          </div>
        </motion.div>
        
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold mb-6 sm:mb-8 text-center bg-gradient-to-r from-cyan-400 to-pink-600 bg-clip-text text-transparent"
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
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl text-center mb-2 sm:mb-4 max-w-2xl px-4"
          style={{ color: '#8B8B9E' }}
        >
          The Collaboration Dojo
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-base sm:text-lg text-center mb-8 sm:mb-12 max-w-xl px-4"
          style={{ color: '#6B6B7E' }}
        >
          <span className="hidden sm:inline">Practice working with AI through real problems.<br /></span>
          <span style={{ color: '#00F0FF' }}>Human</span> + 
          <span style={{ color: '#FF006E' }}> AI</span> = 
          <span style={{ color: '#B829DD' }}> Fusion</span>
        </motion.p>
        
        {/* Neural Connection Visual - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="hidden sm:block w-full max-w-md mb-8 sm:mb-12"
        >
          <NeuralConnector intensity="high" state="pulsing" />
        </motion.div>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Link href="/onboarding">
            <motion.button
              className="relative px-8 sm:px-12 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold uppercase tracking-widest overflow-hidden group w-full sm:w-auto"
              style={{
                background: 'linear-gradient(135deg, #00F0FF 0%, #B829DD 50%, #FF006E 100%)',
                boxShadow: '0 0 40px rgba(0, 240, 255, 0.4)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button glow effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, transparent, rgba(255,255,255,0.3), transparent)',
                }}
              />
              <span className="relative text-white">Enter The Dojo</span>
            </motion.button>
          </Link>
        </motion.div>
        
        {/* Feature Preview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-12 sm:mt-20 px-4"
        >
          <div 
            className="p-4 sm:p-6 rounded-xl border text-center flex-1 sm:flex-none sm:max-w-xs"
            style={{
              background: 'rgba(0, 240, 255, 0.05)',
              borderColor: 'rgba(0, 240, 255, 0.2)',
            }}
          >
            <div 
              className="text-2xl sm:text-3xl mb-1 sm:mb-2"
              style={{ textShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}
            >
              6
            </div>
            <div className="text-xs sm:text-sm text-gray-400">Practice Classes</div>
          </div>
          
          <div 
            className="p-4 sm:p-6 rounded-xl border text-center flex-1 sm:flex-none sm:max-w-xs cursor-pointer transition-all hover:scale-[1.02]"
            style={{
              background: 'rgba(255, 0, 110, 0.05)',
              borderColor: 'rgba(255, 0, 110, 0.2)',
            }}
            onClick={() => setShowPersonalityShowcase(true)}
          >
            <div 
              className="text-2xl sm:text-3xl mb-1 sm:mb-2"
              style={{ textShadow: '0 0 20px rgba(255, 0, 110, 0.5)' }}
            >
              4
            </div>
            <div className="text-xs sm:text-sm text-gray-400">AI Personalities</div>
          </div>
          
          <div 
            className="p-4 sm:p-6 rounded-xl border text-center flex-1 sm:flex-none sm:max-w-xs"
            style={{
              background: 'rgba(184, 41, 221, 0.05)',
              borderColor: 'rgba(184, 41, 221, 0.2)',
            }}
          >
            <div 
              className="text-2xl sm:text-3xl mb-1 sm:mb-2"
              style={{ textShadow: '0 0 20px rgba(184, 41, 221, 0.5)' }}
            >
              ∞
            </div>
            <div className="text-xs sm:text-sm text-gray-400">Skill Tokens</div>
          </div>
        </motion.div>
        
        {/* Sample Holographic Card Preview - Hidden on small mobile */}
        <motion.div
          initial={{ opacity: 0, rotateY: -90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="hidden sm:block mt-16"
        >
          <p className="text-center text-gray-500 mb-4 text-sm uppercase tracking-widest">
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
