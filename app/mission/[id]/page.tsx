'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Award, Target, MessageSquare, ChevronRight, Send, CheckCircle2, Sparkles, Trophy } from 'lucide-react';
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

type MissionPhase = 'intro' | 'attempt' | 'feedback' | 'retry' | 'completed';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function MissionPage() {
  const params = useParams();
  const router = useRouter();
  const missionId = params?.id ? Number(params.id) : null;
  const mission = missionId ? getMissionById(missionId) : null;
  const { user, addSkillToken, completeLesson } = useUser();
  
  const [hasStarted, setHasStarted] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<MissionPhase>('intro');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [attemptText, setAttemptText] = useState('');
  const [retryText, setRetryText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!mission) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Mission not found</p>
      </div>
    );
  }

  const phaseOrder: Array<'setup' | 'attempt' | 'feedback' | 'retry'> = ['setup', 'attempt', 'feedback', 'retry'];

  const handleStartMission = () => {
    setHasStarted(true);
    setCurrentPhase('intro');
    const greeting: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Hello! I'm ${mission.aiPartner.name}, ${mission.aiPartner.personality}. ${mission.aiPartner.description}\n\n**The Challenge:** ${mission.problem}\n\n**The Setup:** ${mission.setup}\n\nWhen you're ready, write your prompt attempt and I'll give you feedback!`,
      timestamp: new Date()
    };
    setMessages([greeting]);
    setCurrentPhase('attempt');
  };

  const handleSubmitAttempt = () => {
    if (!attemptText.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: attemptText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    
    setTimeout(() => {
      const feedbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Good start! Here's my feedback:\n\n✓ You addressed the basic task\n\n📝 Areas to improve:\n• Consider being more specific about the tone you want\n• Add context about your relationship with the recipient\n• Include what action you want them to take\n\nWant to refine your approach? Try incorporating this feedback!`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, feedbackMsg]);
      setCurrentPhase('feedback');
    }, 1000);
  };

  const handleSubmitRetry = () => {
    if (!retryText.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: retryText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    
    setTimeout(() => {
      const successMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Excellent improvement! 🎉\n\nYou've successfully:\n✓ Clarified the tone\n✓ Added important context\n✓ Made the request actionable\n\nYou've completed this mission and earned the **${mission.skillBadge.name}** badge!`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, successMsg]);
      setCurrentPhase('completed');
      
      // Award the badge
      addSkillToken({
        id: `mission-${mission.id}-${Date.now()}`,
        name: mission.skillBadge.name,
        description: mission.skillBadge.description,
        earnedAt: new Date().toISOString(),
        context: `Completed: ${mission.title}`,
        lessonId: mission.id.toString()
      });
      
      completeLesson(mission.id.toString(), 'fluency');
    }, 1000);
  };

  // Show interactive view if started
  if (hasStarted) {
    return (
      <div className="min-h-screen bg-black text-white">
        <section className="pt-24 pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/missions" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Missions
            </Link>

            <h1 className="text-3xl font-black mb-2">{mission.title}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span className={`px-2 py-1 rounded-full text-xs ${difficultyColors[mission.difficultyLabel]}`}>
                {mission.difficultyLabel}
              </span>
              <span>•</span>
              <span>{mission.estimatedTime}</span>
            </div>
          </div>
        </section>

        <section className="px-4 pb-32">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-3xl overflow-hidden">
              {/* Messages */}
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-4 h-4 text-cyan-400" />
                      </div>
                    )}
                    <div className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-cyan-400/20 border border-cyan-400/30' 
                        : 'bg-white/5 border border-white/10'
                    }`}>
                      <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                      <div className="text-xs text-gray-500 mt-2">
                        {msg.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10">
                {currentPhase === 'attempt' && (
                  <div className="space-y-3">
                    <textarea
                      value={attemptText}
                      onChange={(e) => setAttemptText(e.target.value)}
                      placeholder="Write your prompt here..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 resize-none"
                      rows={3}
                    />
                    <button
                      onClick={handleSubmitAttempt}
                      disabled={!attemptText.trim()}
                      className="w-full py-3 bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Attempt
                    </button>
                  </div>
                )}

                {currentPhase === 'feedback' && (
                  <div className="space-y-3">
                    <textarea
                      value={retryText}
                      onChange={(e) => setRetryText(e.target.value)}
                      placeholder="Refine your prompt based on the feedback..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 resize-none"
                      rows={3}
                    />
                    <button
                      onClick={handleSubmitRetry}
                      disabled={!retryText.trim()}
                      className="w-full py-3 bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit Refined Attempt
                    </button>
                  </div>
                )}

                {currentPhase === 'completed' && (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 mb-4"
                    >
                      <Trophy className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Mission Complete!</h3>
                    <p className="text-gray-400 mb-6">You earned: {mission.skillBadge.name}</p>
                    <div className="flex gap-3 justify-center">
                      <Link 
                        href="/missions"
                        className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
                      >
                        Back to Missions
                      </Link>
                      <Link 
                        href="/profile"
                        className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 text-white rounded-xl hover:opacity-90 transition-opacity"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Show mission overview before starting
  return (
    <div className="min-h-screen bg-black text-white">
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

      <section className="py-8 px-4 pb-32">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="glass rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <span className="text-red-400">⚡</span> The Problem
            </h2>
            <p className="text-gray-300 text-lg">{mission.problem}</p>
          </div>

          <div className="glass rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-3">The Setup</h2>
            <p className="text-gray-400">{mission.setup}</p>
          </div>

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

          <div className="pt-8">
            <button 
              onClick={handleStartMission}
              className="w-full py-4 bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-opacity"
            >
              Start Mission
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
