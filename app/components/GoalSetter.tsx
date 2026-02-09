"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Briefcase, Sparkles, TrendingUp, Check } from "lucide-react";

interface GoalOption {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  recommendedPath: string;
}

const goals: GoalOption[] = [
  {
    id: "better-prompts",
    icon: <Sparkles className="w-6 h-6" />,
    title: "Write better prompts",
    description: "Get more useful, accurate AI responses",
    recommendedPath: "classes",
  },
  {
    id: "solve-work",
    icon: <Briefcase className="w-6 h-6" />,
    title: "Solve work problems",
    description: "Apply AI to my actual job challenges",
    recommendedPath: "challenges",
  },
  {
    id: "learn-systematically",
    icon: <Target className="w-6 h-6" />,
    title: "Learn systematically",
    description: "Build skills from fundamentals up",
    recommendedPath: "classes",
  },
  {
    id: "level-up",
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Level up my career",
    description: "Stand out with AI fluency credentials",
    recommendedPath: "classes",
  },
];

interface GoalSetterProps {
  onComplete: (goalIds: string[]) => void;
  onSkip?: () => void;
  onBack?: () => void;
}

export function GoalSetter({ onComplete, onSkip, onBack }: GoalSetterProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  
  const handleSelect = (goalId: string) => {
    setSelectedGoals((prev) => {
      if (prev.includes(goalId)) {
        return prev.filter((id) => id !== goalId);
      }
      return [...prev, goalId];
    });
  };

  const handleComplete = () => {
    if (selectedGoals.length) onComplete(selectedGoals);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
          Welcome to Your AI Training Dojo
        </h2>
        <p className="text-lg text-slate-400">
          Select all that apply to your goals
        </p>
        <p className="text-sm text-slate-500 mt-2">
          Personalize your experience based on these goals
        </p>
      </motion.div>

      <div className="grid gap-4">
        {goals.map((goal, index) => (
          <motion.button
            key={goal.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(goal.id)}
            className={`
              relative w-full p-6 rounded-xl text-left transition-all duration-300
              border-2 flex items-center gap-4
              ${selectedGoals.includes(goal.id) 
                ? "border-cyan-500 bg-cyan-500/10 shadow-[0_0_30px_rgba(0,240,255,0.2)]" 
                : "border-slate-700 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800"
              }
            `}
          >
            {/* Icon */}
            <div className={`
              w-12 h-12 rounded-xl flex items-center justify-center transition-colors
              ${selectedGoals.includes(goal.id) 
                ? "bg-cyan-500 text-white" 
                : "bg-slate-700 text-slate-400"
              }
            `}>
              {goal.icon}
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3 className={`
                font-semibold text-lg transition-colors
                ${selectedGoals.includes(goal.id) ? "text-white" : "text-slate-200"}
              `}>
                {goal.title}
              </h3>
              <p className="text-slate-400 text-sm">
                {goal.description}
              </p>
            </div>

            {/* Selection indicator */}
            <AnimatePresence>
              {selectedGoals.includes(goal.id) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center"
                >
                  <Check className="w-5 h-5 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Complete Selection */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={handleComplete}
        disabled={!selectedGoals.length}
        className="mt-6 px-8 py-3 rounded-lg font-bold uppercase tracking-wider text-sm text-white bg-cyan-500 hover:bg-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed mx-auto block"
      >
        Proceed →
      </motion.button>

      {onSkip && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onSkip}
          className="mt-6 text-slate-500 hover:text-slate-300 text-sm underline mx-auto block"
        >
          Skip for now →
        </motion.button>
      )}
    </div>
  );
}
