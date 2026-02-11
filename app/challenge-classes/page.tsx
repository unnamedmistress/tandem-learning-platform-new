"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Target, 
  Clock, 
  Award, 
  ArrowRight,
  Users,
  BookOpen,
  Zap,
  MessageSquare,
  Code,
  Sparkles
} from "lucide-react";
import { challengeClasses } from "../lib/data/challengeClasses";

const difficultyColors: Record<string, string> = {
  "Beginner": "bg-green-500/20 text-green-400 border-green-500/30",
  "Intermediate": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "Advanced": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Expert": "bg-pink-500/20 text-pink-400 border-pink-500/30"
};

const categoryIcons: Record<string, React.ReactNode> = {
  "Communication": <MessageSquare className="w-4 h-4" />,
  "Productivity": <Zap className="w-4 h-4" />,
  "Technical": <Code className="w-4 h-4" />,
  "Career": <Award className="w-4 h-4" />,
  "Creative": <Sparkles className="w-4 h-4" />
};

export default function ChallengeClassesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center border border-pink-500/30">
              <Target className="w-6 h-6 text-pink-500" />
            </div>
            <p className="text-pink-500 text-sm uppercase tracking-[0.3em]">
              Structured Learning
            </p>
          </motion.div>
          
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl font-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Challenge
            <span className="block text-gradient">
              Classes
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-400 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Structured courses based on real community challenges. 
            Progress through lessons with guided AI practice.
          </motion.p>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-8 px-4 pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {challengeClasses.map((challengeClass, index) => (
            <motion.div
              key={challengeClass.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link 
                href={`/challenge-class/${challengeClass.id}`}
                className="block group p-6 sm:p-8 glass rounded-3xl hover:border-pink-500/50 transition-all h-full"
              >
                {/* Category & Difficulty */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-wider text-gray-500 flex items-center gap-1">
                    {challengeClass.category}
                  </span>
                  <span className={`text-xs uppercase tracking-wider px-3 py-1 rounded-full border ${difficultyColors[challengeClass.difficulty]}`}>
                    {challengeClass.difficulty}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-pink-500 transition-colors">
                  {challengeClass.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 mb-6 text-sm sm:text-base">
                  {challengeClass.description}
                </p>
                
                {/* Stats */}
                <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BookOpen className="w-4 h-4" />
                    <span>{challengeClass.totalLessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{challengeClass.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Award className="w-4 h-4" />
                    <span>{challengeClass.xpReward} XP</span>
                  </div>
                </div>
                
                {/* CTA */}
                <div className="mt-6 flex items-center gap-2 text-pink-500 font-medium group-hover:gap-4 transition-all">
                  <span>Start Class</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
