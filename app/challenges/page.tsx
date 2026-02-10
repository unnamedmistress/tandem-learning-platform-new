"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Filter } from "lucide-react";
import { challenges as initialChallenges } from "../lib/data/challenges";
import { Challenge } from "../lib/types";

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [filter, setFilter] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(challenges.flatMap((c) => c.tags))
  );

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
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.p 
            className="text-pink-500 text-sm uppercase tracking-[0.3em] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Community
          </motion.p>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            REAL WORLD
            <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              CHALLENGES
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Vote on scenarios. Submit your own. Learn from the community.
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Filter className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter(null)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === null 
                  ? 'bg-white text-black' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  filter === tag 
                    ? 'bg-cyan-400 text-black' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {tag}
              </button>
            ))}
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
              className="group p-8 border border-white/10 rounded-2xl hover:border-pink-500/50 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2">
                  {challenge.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleVote(challenge.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 text-pink-500 hover:bg-pink-500 hover:text-black transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span className="font-bold">{challenge.votes}</span>
                </button>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 group-hover:text-pink-500 transition-colors">
                {challenge.title}
              </h3>
              <p className="text-gray-400 mb-4">{challenge.description}</p>
              
              <div className="text-sm text-gray-500">
                Submitted by {challenge.submittedBy}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
