"use client";

import { motion } from 'framer-motion';
import { Brain, Trophy, Target, Zap } from 'lucide-react';
import { useUser } from '../lib/hooks/useUser';

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Loading profile...</p>
      </div>
    );
  }

  const completedCount = user.completedLessons?.length || 0;
  const totalLessons = 24;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const stats = [
    { icon: Trophy, label: "Lessons", value: completedCount, color: "#F59E0B" },
    { icon: Target, label: "Tokens", value: user.skillTokens?.length || 0, color: "#00F0FF" },
    { icon: Zap, label: "Reflections", value: user.uncertaintyLog?.length || 0, color: "#FF006E" },
    { icon: Brain, label: "Progress", value: `${progressPercent}%`, color: "#8B5CF6" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.p 
            className="text-purple-400 text-sm uppercase tracking-[0.3em] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Your Journey
          </motion.p>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            PROFILE
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Member since {new Date(user.joinedAt).toLocaleDateString()}
          </motion.p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 border border-white/10 rounded-2xl text-center hover:border-cyan-400/50 transition-all"
              style={{ background: `linear-gradient(135deg, ${stat.color}10, transparent)` }}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4" style={{ color: stat.color }} />
              <div className="text-4xl md:text-5xl font-black mb-2" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skill Tokens */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-8">SKILL TOKENS</h2>
          
          {user.skillTokens?.length === 0 ? (
            <div className="p-12 border border-white/10 rounded-2xl text-center">
              <p className="text-gray-400 mb-4">No tokens yet.</p>
              <p className="text-gray-500">Complete lessons to earn collectible tokens!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.skillTokens?.map((token, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 border border-white/10 rounded-2xl hover:border-cyan-400/50 transition-all group"
                >
                  <div className="text-3xl mb-4">✦</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                    {token.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{token.description}</p>
                  <div className="mt-4 text-xs uppercase tracking-wider text-gray-500">
                    {token.context}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-8">OVERALL PROGRESS</h2>
          <div className="p-8 border border-white/10 rounded-2xl">
            <div className="flex justify-between items-end mb-4">
              <div>
                <div className="text-5xl font-black text-cyan-400">{progressPercent}%</div>
                <div className="text-gray-400 mt-2">{completedCount} of {totalLessons} lessons completed</div>
              </div>
            </div>
            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
