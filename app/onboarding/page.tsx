"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitContainer } from '../components/SplitContainer';
import { NeuralConnector } from '../components/NeuralConnector';
import { MirrorFrame } from '../components/MirrorFrame';
import Link from 'next/link';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [problem, setProblem] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  
  const handleStartCollaboration = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setStep(2);
      setIsConnecting(false);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#1a1a25] z-50">
        <motion.div
          className="h-full"
          style={{
            background: 'linear-gradient(90deg, #00F0FF, #B829DD, #FF006E)',
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${(step / 5) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <AnimatePresence mode="wait">
        {/* Step 1: The Problem */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center px-4"
          >
            <div className="max-w-2xl w-full">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-12"
              >
                <span 
                  className="text-sm uppercase tracking-widest font-mono mb-4 block"
                  style={{ color: '#00F0FF' }}
                >
                  Initiation Protocol 01
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  What&apos;s your challenge?
                </h1>
                <p className="text-gray-400">
                  Bring a real problem from your work. This is your training ground.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div 
                  className="relative rounded-2xl p-1"
                  style={{
                    background: 'linear-gradient(135deg, #00F0FF, #B829DD, #FF006E)',
                  }}
                >
                  <div className="bg-[#12121A] rounded-2xl p-6">
                    <textarea
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      placeholder="I need to... but I'm struggling with..."
                      className="w-full h-40 bg-transparent text-white placeholder-gray-600 resize-none focus:outline-none text-lg"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    />
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
                      <span className="text-xs text-gray-500 font-mono">
                        {problem.length} characters
                      </span>
                      <button
                        onClick={handleStartCollaboration}
                        disabled={problem.length < 20}
                        className="px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        style={{
                          background: problem.length >= 20 
                            ? 'linear-gradient(135deg, #00F0FF, #FF006E)'
                            : '#2a2a35',
                          color: problem.length >= 20 ? '#0A0A0F' : '#666',
                        }}
                      >
                        {isConnecting ? 'Connecting...' : 'Initialize Collaboration'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {isConnecting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8"
                >
                  <NeuralConnector intensity="high" state="pulsing" />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Step 2: The Collaboration */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SplitContainer
              humanSide={
                <div className="h-full flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-4">Your Input</h3>
                  <div 
                    className="flex-1 p-4 rounded-lg font-mono text-sm overflow-auto"
                    style={{ 
                      background: 'rgba(0, 240, 255, 0.05)',
                      border: '1px solid rgba(0, 240, 255, 0.2)',
                      color: '#00F0FF',
                    }}
                  >
                    {problem}
                  </div>
                </div>
              }
              aiSide={
                <div className="h-full flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-4">AI Analysis</h3>
                  <div 
                    className="flex-1 p-4 rounded-lg overflow-auto"
                    style={{ 
                      background: 'rgba(255, 0, 110, 0.05)',
                      border: '1px solid rgba(255, 0, 110, 0.2)',
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, staggerChildren: 0.1 }}
                      className="space-y-3"
                    >
                      <p style={{ color: '#FF006E' }}>Processing input...</p>
                      <motion.p 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-gray-300"
                      >
                        I see you&apos;re dealing with a complex challenge. Let&apos;s break this down together.
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                        className="text-gray-300"
                      >
                        What&apos;s your first instinct about how to approach this?
                      </motion.p>
                    </motion.div>
                  </div>
                </div>
              }
              fusion={
                <div className="text-center">
                  <NeuralConnector intensity="high" state="active" />
                  <p className="text-gray-500 text-sm mt-4">
                    Collaboration link established. Neural connection active.
                  </p>
                  <button
                    onClick={() => setStep(3)}
                    className="mt-6 px-8 py-3 rounded-lg font-bold uppercase tracking-wider text-sm"
                    style={{
                      background: 'linear-gradient(135deg, #00F0FF, #FF006E)',
                      color: '#0A0A0F',
                    }}
                  >
                    Continue to Reflection
                  </button>
                </div>
              }
            />
          </motion.div>
        )}
        
        {/* Step 3: The Mirror */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center px-4"
          >
            <div className="max-w-4xl w-full">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-12"
              >
                <span 
                  className="text-sm uppercase tracking-widest font-mono mb-4 block"
                  style={{ color: '#B829DD' }}
                >
                  Reflection Protocol
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  The Mirror
                </h1>
                <p className="text-gray-400">
                  What you see is your collaboration pattern emerging
                </p>
              </motion.div>
              
              <div className="flex flex-col md:flex-row items-center gap-12">
                {/* Mirror Visualization */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative w-80 h-80"
                >
                  <MirrorFrame pattern="constellation">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div 
                          className="text-6xl mb-2"
                          style={{
                            background: 'linear-gradient(135deg, #00F0FF, #FF006E)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          👤
                        </div>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">
                          Your Pattern
                        </p>
                      </div>
                    </div>
                  </MirrorFrame>
                </motion.div>
                
                {/* Pattern Analysis */}
                <motion.div
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex-1 space-y-4"
                >
                  <div 
                    className="p-6 rounded-xl"
                    style={{
                      background: 'rgba(0, 240, 255, 0.05)',
                      border: '1px solid rgba(0, 240, 255, 0.2)',
                    }}
                  >
                    <h3 className="font-bold mb-2" style={{ color: '#00F0FF' }}>
                      Quick Exchanges
                    </h3>
                    <p className="text-gray-400 text-sm">
                      You kept messages brief. Sometimes that works, but more detail often helps AI understand context.
                    </p>
                  </div>
                  
                  <div 
                    className="p-6 rounded-xl"
                    style={{
                      background: 'rgba(255, 0, 110, 0.05)',
                      border: '1px solid rgba(255, 0, 110, 0.2)',
                    }}
                  >
                    <h3 className="font-bold mb-2" style={{ color: '#FF006E' }}>
                      Accepting Responses
                    </h3>
                    <p className="text-gray-400 text-sm">
                      You went with AI&apos;s suggestions. That&apos;s fine for exploration, but verification builds judgment.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setStep(4)}
                    className="w-full py-4 rounded-lg font-bold uppercase tracking-wider"
                    style={{
                      background: 'linear-gradient(135deg, #00F0FF, #FF006E)',
                      color: '#0A0A0F',
                    }}
                  >
                    Claim Your First Artifact
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Step 4: The Artifact */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center px-4"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
                className="mb-8"
              >
                <div className="inline-block">
                  <div 
                    className="w-64 h-80 rounded-2xl p-8 flex flex-col items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(255, 0, 110, 0.1))',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      boxShadow: '0 0 60px rgba(0, 240, 255, 0.3), inset 0 0 60px rgba(255, 0, 110, 0.1)',
                    }}
                  >
                    <motion.div
                      animate={{ 
                        rotateY: [0, 10, 0, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-7xl mb-4"
                      style={{
                        textShadow: '0 0 40px rgba(0, 240, 255, 0.8)',
                      }}
                    >
                      ✦
                    </motion.div>
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{
                        background: 'linear-gradient(135deg, #00F0FF, #FF006E)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      First Contact
                    </h3>
                    <p className="text-sm text-gray-400">
                      You completed your first collaboration session
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-gray-400 mb-6">
                  This artifact has been added to your collection
                </p>
                <Link href="/classes">
                  <button
                    className="px-12 py-4 rounded-lg font-bold uppercase tracking-widest"
                    style={{
                      background: 'linear-gradient(135deg, #00F0FF, #FF006E)',
                      color: '#0A0A0F',
                    }}
                  >
                    Enter Training Halls
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
