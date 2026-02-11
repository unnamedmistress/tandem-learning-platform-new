'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Award, Target, MessageSquare, ChevronRight, Send, CheckCircle, Sparkles } from 'lucide-react';
import { getMissionById } from '../../lib/data/missions';
import { useUser } from '../../lib/hooks/useUser';

const difficultyColors: Record<string, string> = {
  'Easy': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Easy-Medium': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Medium': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Medium-Hard': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Hard': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Expert': 'bg-pink-500/20 text-pink-400 border-pink-500/30'
};

type MissionPhase = 'setup' | 'attempt' | 'feedback' | 'retry' | 'completed';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function MissionPage() {
  const params = useParams();
  const missionId = params?.id ? Number(params.id) : null;
  const mission = missionId ? getMissionById(missionId) : null;
  const { user, addSkillToken, completeLesson } = useUser();
  
  // Mission state
  const [currentPhase, setCurrentPhase] = useState<MissionPhase>('setup');
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [attemptText, setAttemptText] = useState('');
  const [retryText, setRetryText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!mission) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Mission not found</p>
      </div>
    );
  }

  const phaseOrder: Array<'setup' | 'attempt' | 'feedback' | 'retry'> = ['setup', 'attempt', 'feedback', 'retry'];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-32 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/missions" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Missions
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`text-xs uppercase tracking-wider px-3 py-1 rounded-full border ${difficultyColors[mission.difficultyLabel]}`}>
              {mission.difficultyLabel}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4" /> {mission.estimatedTime}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Award className="w-4 h-4" /> {mission.xpReward} XP
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black mb-4">{mission.title}</h1>
          <p className="text-xl text-gray-400 mb-6">{mission.description}</p>

          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-2 text-cyan-400">
              <Target className="w-4 h-4" /> Objective: {mission.objective}
            </span>
          </div>
        </div>
      </section>

      {/* Mission Content */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* The Problem */}
          <div className="glass rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span className="text-red-400">⚡</span> The Problem
            </h2>
            <p className="text-gray-300 text-lg">{mission.problem}</p>
          </div>

          {/* The Setup */}
          <div className="glass rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-3">The Setup</h2>
            <p className="text-gray-400">{mission.setup}</p>
          </div>

          {/* AI Partner */}
          <div className="glass rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-4">Your AI Partner</h2>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-400/20 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-7 h-7 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{mission.aiPartner.name}</h3>
                <p className="text-sm text-cyan-400 mb-2">{mission.aiPartner.personality}</p>
                <p className="text-gray-400 text-sm">{mission.aiPartner.description}</p>
              </div>
            </div>
          </div>

          {/* Skill Badge */}
          <div className="glass rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-3">Skill Badge</h2>
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
              <div className="text-2xl">🏆</div>
              <div>
                <h3 className="font-bold">{mission.skillBadge.name}</h3>
                <p className="text-gray-400 text-sm">{mission.skillBadge.description}</p>
              </div>
            </div>
          </div>

          {/* Mission Phases */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Mission Phases</h2>
            {phaseOrder.map((phaseKey, index) => {
              const phase = mission.phases[phaseKey];
              return (
                <div key={phaseKey} className="glass rounded-3xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center text-sm font-bold text-cyan-400">
                      {index + 1}
                    </span>
                    <h3 className="font-bold text-lg">{phase.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-4">{phase.description}</p>
                  <div className="space-y-2">
                    {phase.tips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-500">
                        <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-400" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Start Button */}
          <div className="pt-8">
            <button className="w-full py-4 bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-opacity">
              Start Mission
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
