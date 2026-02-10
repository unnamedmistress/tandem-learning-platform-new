"use client";

import { motion } from 'framer-motion';
import { Brain, Trophy, Target, Zap, User, Calendar, Award, Sparkles, TrendingUp } from 'lucide-react';
import { useUser } from '../lib/hooks/useUser';

const stats = [
  { icon: Trophy, label: "Lessons", color: "#F59E0B", key: "completedLessons" },
  { icon: Target, label: "Tokens", color: "#00F0FF", key: "skillTokens" },
  { icon: Zap, label: "Reflections", color: "#FF006E", key: "uncertaintyLog" },
];

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  const completedCount = user.completedLessons?.length || 0;
  const totalLessons = 24;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-500/5 to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <User className="w-6 h-6 text-purple-500" />
            </div>
            <p className="text-purple-500 text-sm uppercase tracking-[0.3em]">
              Your Journey
            </p>
          </motion.div>
          
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Profile
          </motion.h1>
          
          <motion.div 
            className="flex items-center gap-2 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Calendar className="w-4 h-4" />
            <span>Member since {new Date(user.joinedAt).toLocaleDateString()}</span>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const value = user[stat.key as keyof typeof user]?.length || 0;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 glass rounded-2xl text-center hover:border-cyan-400/50 transition-all"
                style={{ background: `linear-gradient(135deg, ${stat.color}08, transparent)` }}
              >
                <div 
                  className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
                  style={{ background: `${stat.color}20`, border: `2px solid ${stat.color}40` }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div className="text-3xl sm:text-4xl font-black mb-1" style={{ color: stat.color }}>
                  {value}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            );
          })}
          
          {/* Progress Stat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 glass rounded-2xl text-center hover:border-purple-400/50 transition-all"
            style={{ background: `linear-gradient(135deg, #8B5CF608, transparent)` }}
          >
            <div 
              className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
              style={{ background: `#8B5CF620`, border: `2px solid #8B5CF640` }}
            >
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-black mb-1 text-purple-400">
              {progressPercent}%
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Progress</div>
          </motion.div>
        </div>
      </section>

      {/* Skill Tokens */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Award className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl sm:text-3xl font-black">Skill Tokens</h2>
          </motion.div>
          
          {user.skillTokens?.length === 0 ? (
            <motion.div 
              className="p-12 glass rounded-3xl text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-gray-500" />
              </div>
              <p className="text-gray-400 mb-2">No tokens yet</p>
              <p className="text-gray-500 text-sm">Complete lessons to earn collectible tokens!</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.skillTokens?.map((token, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 glass rounded-2xl hover:border-cyan-400/50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-400/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">✦</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1 group-hover:text-cyan-400 transition-colors">
                        {token.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{token.description}</p>
                      <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider">
                        {token.context}
                      </p>
                    </div>
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
          <motion.div 
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <TrendingUp className="w-6 h-6 text-pink-500" />
            <h2 className="text-2xl sm:text-3xl font-black">Overall Progress</h2>
          </motion.div>
          
          <motion.div 
            className="p-6 sm:p-8 glass rounded-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
              <div>
                <div className="text-4xl sm:text-5xl font-black text-gradient">{progressPercent}%</div>
                <div className="text-gray-400 mt-1">{completedCount} of {totalLessons} lessons completed</div>
              </div>
              <div className="text-sm text-gray-500">
                {24 - completedCount} lessons remaining
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
