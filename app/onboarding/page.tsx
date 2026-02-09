"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { GoalSetter } from '../components/GoalSetter';
import { OnboardingPersonalitySelector } from '../components/OnboardingPersonalitySelector';
import { LearningLoopDemo } from '../components/LearningLoopDemo';
import { Trophy, Sparkles } from 'lucide-react';

type OnboardingStep = 'welcome' | 'how-it-works' | 'goals' | 'personality' | 'ready';

export default function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [userGoals, setUserGoals] = useState<string[]>([]);
  const [selectedPersonality, setSelectedPersonality] = useState<{id: string, name: string} | null>(null);
  
  const steps: OnboardingStep[] = ['welcome', 'how-it-works', 'goals', 'personality', 'ready'];
  const currentStepIndex = steps.indexOf(step);

  const handleGoalsSubmit = (goalIds: string[]) => {
    setUserGoals(goalIds);
    setStep('personality');
  };

  const handlePersonalitySelect = (id: string, name: string) => {
    setSelectedPersonality({ id, name });
    setStep('ready');
  };
  
  return (
    <div className="min-h-screen bg-[#0A0A0F] py-12 px-8">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#181820] z-50">
        <motion.div
          className="h-full"
          style={{
            background: 'linear-gradient(90deg, #00F0FF, #B829DD, #FF006E)',
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Skip button */}
      <div className="fixed top-4 right-4 z-40">
        <Link href="/classes">
          <button className="text-xs uppercase tracking-wider px-4 py-2 rounded-lg border border-slate-700 text-slate-500 hover:text-white hover:border-slate-500 transition-all">
            Skip →
          </button>
        </Link>
      </div>
      
      <AnimatePresence mode="wait">
        {/* Step 1: Welcome */}
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[80vh] grid grid-cols-1 md:grid-cols-2 gap-8 items-center container mx-auto py-12 px-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mx-auto max-w-screen-lg">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-8 text-left"
              >
                <div className="text-6xl mb-6">🎯</div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                  Welcome to TANDEM
                </h1>
                <p className="text-xl text-slate-400">
                  The Collaboration Dojo where you master working with AI
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4 mb-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-500 justify-items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🧠</span>
                    <span>6 Practice Classes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    <span>4 AI Partners</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏆</span>
                    <span>∞ Skill Tokens</span>
                  </div>
                </div>
              </motion.div>

              <motion.button
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => setStep('how-it-works')}
                className="px-12 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-cyan-500 to-pink-500 text-white hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] transition-all"
              >
                See How It Works →
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 2: How It Works */}
        {step === 'how-it-works' && (
          <motion.div
            key="how-it-works"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[80vh] flex items-center justify-center py-8"
          >
            <LearningLoopDemo 
              onComplete={() => setStep('goals')}
              autoPlay={false}
            />
          </motion.div>
        )}

        {/* Step 3: Set Goals */}
        {step === 'goals' && (
          <motion.div
            key="goals"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[80vh] flex items-center justify-center py-8"
          >
            <GoalSetter 
              onComplete={handleGoalsSubmit}
              onBack={() => setStep('how-it-works')}
            />
          </motion.div>
        )}

        {/* Step 4: Choose Personality */}
        {step === 'personality' && (
          <motion.div
            key="personality"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[80vh] flex flex-col md:flex-row items-center justify-evenly py-12 px-4"
          >
            <OnboardingPersonalitySelector 
              onSelect={handlePersonalitySelect}
              onBack={() => setStep('goals')}
            />
          </motion.div>
        )}

        {/* Step 5: Ready */}
        {step === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[80vh] flex items-center justify-center"
          >
            <div className="text-center max-w-2xl">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
                className="mb-8"
              >
                <div className="inline-block">
                  <div 
                    className="w-64 h-80 rounded-2xl p-8 flex flex-col items-center justify-center border-2 border-transparent"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(255, 0, 110, 0.1))',
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
                      You're Ready
                    </h3>
                    <p className="text-sm text-slate-400">
                      Your training begins now
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Summary */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-slate-800/50 rounded-xl p-6 mb-8 border border-slate-700"
              >
                <h3 className="text-lg font-semibold mb-4 text-white">Your Setup</h3>
                
                <div className="space-y-3 text-left grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userGoals.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5" />
                      <div>
                        <span className="text-slate-400">Goals:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {userGoals.map(goal => (
                            <span key={goal} className="text-sm px-2 py-1 rounded bg-cyan-500/10 text-cyan-400">
                              {goal === 'write-better-prompts' && 'Write Better Prompts'}
                              {goal === 'automate-work' && 'Automate Repetitive Work'}
                              {goal === 'learn-ai-fundamentals' && 'Learn AI Fundamentals'}
                              {goal === 'creative-projects' && 'Creative Projects'}
                              {goal === 'professional-communication' && 'Professional Communication'}
                              {goal === 'technical-problem-solving' && 'Technical Problem Solving'}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedPersonality && (
                    <div className="flex items-center gap-3">
                      <Trophy className="w-5 h-5 text-pink-400" />
                      <div>
                        <span className="text-slate-400">AI Partner: </span>
                        <span className="text-white font-medium">{selectedPersonality.name}</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Link href="/classes">
                  <button
                    className="px-12 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-cyan-500 to-pink-500 text-white hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] transition-all"
                  >
                    Enter the Dojo →
                  </button>
                </Link>
                <p className="text-slate-500 text-sm mt-4">
                  You can change your goals and AI partner anytime
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
