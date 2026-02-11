"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Clock, 
  Award, 
  Target, 
  BookOpen,
  CheckCircle2,
  Circle,
  Lock,
  ChevronRight
} from "lucide-react";
import { challengeClasses } from "../../lib/data/challengeClasses";

const difficultyColors: Record<string, string> = {
  "Easy": "bg-green-500/20 text-green-400 border-green-500/30",
  "Easy-Medium": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Medium": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "Medium-Hard": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Hard": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Expert": "bg-pink-500/20 text-pink-400 border-pink-500/30"
};

export default function ChallengeClassPage() {
  const params = useParams();
  const classId = params?.id as string;
  const challengeClass = challengeClasses.find(c => c.id === classId);
  
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  if (!challengeClass) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Class not found</p>
          <Link 
            href="/challenge-classes"
            className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-400"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Challenge Classes
          </Link>
        </div>
      </div>
    );
  }

  const progress = (completedLessons.length / challengeClass.totalLessons) * 100;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-32 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/challenge-classes" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Challenge Classes
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs uppercase tracking-wider text-gray-500">
              {challengeClass.category}
            </span>
            <span className={`text-xs uppercase tracking-wider px-3 py-1 rounded-full border ${difficultyColors[challengeClass.difficulty]}`}>
              {challengeClass.difficulty}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black mb-4">{challengeClass.title}</h1>
          <p className="text-xl text-gray-400 mb-6">{challengeClass.description}</p>

          <div className="flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2 text-gray-500">
              <BookOpen className="w-4 h-4" /> {challengeClass.totalLessons} lessons
            </span>
            <span className="flex items-center gap-2 text-gray-500">
              <Clock className="w-4 h-4" /> {challengeClass.estimatedTime}
            </span>
            <span className="flex items-center gap-2 text-gray-500">
              <Award className="w-4 h-4" /> {challengeClass.xpReward} XP
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Class Progress</span>
              <span className="text-sm text-pink-500">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lessons List */}
      <section className="py-8 px-4 pb-32">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold mb-6">Lessons</h2>
          
          {challengeClass.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isLocked = index > 0 && !completedLessons.includes(challengeClass.lessons[index - 1].id);
            
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {isLocked ? (
                  <div className="p-6 glass rounded-3xl opacity-50 cursor-not-allowed">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs text-gray-500">Lesson {index + 1}</span>
                          <span className={`text-xs uppercase tracking-wider px-2 py-0.5 rounded-full ${difficultyColors[lesson.difficultyLabel]}`}>
                            {lesson.difficultyLabel}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-500">{lesson.title}</h3>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link 
                    href={`/challenge-class/${challengeClass.id}/lesson/${lesson.id}`}
                    className="block p-6 glass rounded-3xl hover:border-pink-500/50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-500/20' : 'bg-pink-500/20'}`}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-green-400" />
                        ) : (
                          <Circle className="w-6 h-6 text-pink-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs text-gray-500">Lesson {index + 1}</span>
                          <span className={`text-xs uppercase tracking-wider px-2 py-0.5 rounded-full ${difficultyColors[lesson.difficultyLabel]}`}>
                            {lesson.difficultyLabel}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold group-hover:text-pink-500 transition-colors">{lesson.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">{lesson.description}</p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {lesson.estimatedTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="w-4 h-4" /> {lesson.xpReward} XP
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-pink-500" />
                    </div>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
