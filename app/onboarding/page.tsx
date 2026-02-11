"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { GoalSetter } from '../components/GoalSetter';
import { Trophy, Sparkles, Target, ArrowRight, Flame, Zap, Check } from 'lucide-react';

type OnboardingStep = 'welcome' | 'goals' | 'ready';

// Default optimist personality - pre-selected for simplicity
const defaultPersonality = {
  id: "optimist",
  name: "The Optimist",
  tagline: "Encouraging. Supportive. Growth-minded.",
  description: "Your always-positive AI partner focused on helping you learn and grow.",
  color: "#00F0FF"
};

export default function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [userGoals, setUserGoals] = useState<string[]>([]);
  
  const steps: OnboardingStep[] = ['welcome', 'goals', 'ready'];
  const currentStepIndex = steps.indexOf(step);

  const handleGoalsSubmit = (goalIds: string[]) => {
    setUserGoals(goalIds);
    setStep('ready');
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Progress Bar */}
      <div className="fixed top-24 left-0 right-0 h-1 bg-white/10 z-40 mx-4 max-w-7xl xl:mx-auto rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Skip button */}
      <div className="fixed top-28 right-8 z-40">
        <Link 
          href="/missions"
          className="text-xs uppercase tracking-wider px-4 py-2 rounded-xl glass text-gray-400 hover:text-white hover:border-white/30 transition-all"
        >
          Skip →
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
            className="min-h-[80vh] flex flex-col items-center justify-center px-4 pt-24"
          >
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-8"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center">
                  <Flame className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-gradient">
                  Welcome to TANDEM
                </h1>
                <p className="text-lg sm:text-xl text-gray-400">
                  The Collaboration Dojo where you master working with AI
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
              >
                <div className="flex items-center gap-3 px-4 py-3 glass rounded-xl">
                  <Target className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">Training Missions</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 glass rounded-xl">
                  <Zap className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">Skill Challenges</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 glass rounded-xl">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                  <span className="text-gray-300">∞ Possibilities</span>
                </div>
              </motion.div>

              <motion.button
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => setStep('goals')}
                className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg bg-gradient-to-r from-cyan-400 to-pink-500 text-white hover:opacity-90 transition-all hover:scale-105"
              >
                Let's Go
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Set Goals */}
        {step === 'goals' && (
          <motion.div
            key="goals"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[80vh] flex items-center justify-center py-8 px-4 pt-24"
          >
            <GoalSetter 
              onComplete={handleGoalsSubmit}
              onBack={() => setStep('welcome')}
            />
          </motion.div>
        )}

        {/* Step 3: Ready */}
        {step === 'ready' && (
          <motion.div
            key="ready"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[80vh] flex items-center justify-center px-4 pt-24"
          >
            <div className="text-center max-w-2xl">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
                className="mb-8"
              >
                <div className="w-32 h-40 mx-auto rounded-3xl p-1 bg-gradient-to-br from-cyan-400 to-pink-500">
                  <div className="w-full h-full rounded-3xl bg-black flex flex-col items-center justify-center">
                    <motion.div
                      animate={{ 
                        rotateY: [0, 10, 0, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-6xl mb-2"
                    >
                      ✦
                    </motion.div>
                    <h3 className="text-lg font-bold text-gradient">
                      You're Ready
                    </h3>
                    <p className="text-sm text-gray-500">
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
                className="glass rounded-2xl p-6 mb-8 text-left"
              >
                <h3 className="text-lg font-semibold mb-4">Your Setup</h3>
                
                <div className="space-y-3">
                  {userGoals.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-gray-400">Goals:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {userGoals.map(goal => (
                            <span key={goal} className="text-xs px-2 py-1 rounded-lg bg-cyan-400/10 text-cyan-400 border border-cyan-400/30">
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
                  
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-pink-400 flex-shrink-0" />
                    <div>
                      <span className="text-gray-400">AI Partner: </span>
                      <span className="text-white font-medium">{defaultPersonality.name}</span>
                      <p className="text-xs text-gray-500">{defaultPersonality.tagline}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Link 
                  href="/missions"
                  className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg bg-gradient-to-r from-cyan-400 to-pink-500 text-white hover:opacity-90 transition-all hover:scale-105"
                >
                  Start Training
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-gray-500 text-sm mt-4">
                  You can change your goals anytime in your profile
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
