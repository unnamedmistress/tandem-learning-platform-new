"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Filter, Target, TrendingUp, MessageCircle } from "lucide-react";
import { challenges as initialChallenges } from "../lib/data/challenges";
import { Challenge } from "../lib/types";

const categoryColors: Record<string, string> = {
  workplace: "#00F0FF",
  communication: "#FF006E",
  technical: "#8B5CF6",
  creative: "#F59E0B",
  career: "#10B981",
  personal: "#EC4899",
};

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [filter, setFilter] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(challenges.flatMap((c) => c.tags))
  ).sort();

  const filteredChallenges = filter
    ? challenges.filter((c) => c.tags.includes(filter))
    : challenges;

  const handleVote = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === challengeId ? { ...c, votes: c.votes + 1 } : c
      )
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-pink-500/5 to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
              <Target className="w-6 h-6 text-pink-500" />
            </div>
            <p className="text-pink-500 text-sm uppercase tracking-[0.3em]">
              Community
            </p>
          </motion.div>
          
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Real World
            <span className="block text-gradient">
              Challenges
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-400 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Vote on scenarios. Submit your own. Learn from the community.
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section className="px-4 pb-8 sticky top-24 z-30">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-2xl p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-gray-400 mr-2">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filter:</span>
              </div>
              <button
                onClick={() => setFilter(null)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === null 
                    ? 'bg-white text-black' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                All
              </button>
              {allTags.slice(0, 8).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilter(tag)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                    filter === tag 
                      ? 'bg-cyan-400 text-black' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Grid */}
      <section className="py-8 px-4 pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {filteredChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group p-6 sm:p-8 glass rounded-3xl hover:border-pink-500/50 transition-all"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {challenge.tags.slice(0, 3).map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-pink-500 transition-colors">
                {challenge.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-400 mb-6 text-sm sm:text-base">
                {challenge.description}
              </p>
              
              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MessageCircle className="w-4 h-4" />
                  <span>Submitted by {challenge.submittedBy}</span>
                </div>
                
                <button
                  onClick={() => handleVote(challenge.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-500/10 text-pink-500 hover:bg-pink-500 hover:text-black transition-all font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>{challenge.votes}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredChallenges.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <TrendingUp className="w-10 h-10 text-gray-500" />
            </div>
            <p className="text-gray-400 text-lg">No challenges found</p>
            <p className="text-gray-500">Try a different filter</p>
          </motion.div>
        )}
      </section>
    </div>
  );
}
