"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Trophy, TrendingUp, Clock, Target } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  message: string;
  stat: string;
  statLabel: string;
  icon: typeof Trophy;
}

interface MilestoneCelebrationProps {
  completedLessons: number;
  totalTokens: number;
  onDismiss: () => void;
}

export function MilestoneCelebration({ 
  completedLessons, 
  totalTokens,
  onDismiss 
}: MilestoneCelebrationProps) {
  const [showCelebration, setShowCelebration] = useState(false);
  const [milestone, setMilestone] = useState<Milestone | null>(null);

  useEffect(() => {
    // Check for milestones
    const milestones: Record<number, Milestone> = {
      1: {
        id: "first-lesson",
        title: "🎉 First Lesson Complete!",
        message: "You've started your collaboration journey. Keep going!",
        stat: "1",
        statLabel: "Lesson Completed",
        icon: Trophy,
      },
      5: {
        id: "five-lessons",
        title: "🔥 Five Lessons Strong!",
        message: "You're building serious collaboration skills. Notice how you're improving?",
        stat: "5",
        statLabel: "Lessons Completed",
        icon: Target,
      },
      10: {
        id: "ten-lessons",
        title: "⚡ Double Digits!",
        message: "You're in the top tier of learners. Your AI collaboration is getting refined.",
        stat: "10",
        statLabel: "Lessons Completed",
        icon: TrendingUp,
      },
    };

    // Token milestones
    const tokenMilestones: Record<number, Milestone> = {
      3: {
        id: "three-tokens",
        title: "✨ Token Collector!",
        message: "You're building a diverse skill portfolio. Each token represents real growth!",
        stat: "3",
        statLabel: "Skill Tokens Earned",
        icon: Trophy,
      },
      8: {
        id: "eight-tokens",
        title: "🏆 Mastery in Motion!",
        message: "Your collaboration toolkit is impressive. You're becoming an AI partner pro!",
        stat: "8",
        statLabel: "Skill Tokens Earned",
        icon: Target,
      },
    };

    // Check if we hit a milestone
    if (milestones[completedLessons]) {
      setMilestone(milestones[completedLessons]);
      setShowCelebration(true);
    } else if (tokenMilestones[totalTokens]) {
      setMilestone(tokenMilestones[totalTokens]);
      setShowCelebration(true);
    }
  }, [completedLessons, totalTokens]);

  const handleDismiss = () => {
    setShowCelebration(false);
    onDismiss();
  };

  if (!showCelebration || !milestone) return null;

  const Icon = milestone.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.3 }}
        >
          <Card className="max-w-md w-full border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
            <CardContent className="pt-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-4xl"
              >
                <Icon className="w-10 h-10 text-white" />
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-gray-900 mb-2"
              >
                {milestone.title}
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mb-6"
              >
                {milestone.message}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl p-4 mb-6"
              >
                <div className="text-4xl font-black text-amber-500">
                  {milestone.stat}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">
                  {milestone.statLabel}
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button onClick={handleDismiss} className="w-full">
                  Keep Learning! →
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
