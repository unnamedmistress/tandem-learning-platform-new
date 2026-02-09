"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Brain, Target, Lightbulb } from "lucide-react";
import { LessonCard } from "../../components/LessonCard";
import { classes } from "../../lib/data/classes";

export default function ClassPage() {
  const params = useParams();
  const classId = params?.id as string | undefined;
  const classData = classId ? classes.find((c) => c.id === classId) : undefined;

  if (!classData) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Class not found</p>
          <Link href="/classes">
            <button 
              className="px-6 py-3 rounded-full text-sm font-medium"
              style={{
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                color: '#00F0FF',
              }}
            >
              Back to Classes
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const colorMap: Record<string, { primary: string; secondary: string; glow: string }> = {
    violet: { 
      primary: '#8B5CF6', 
      secondary: '#A78BFA',
      glow: 'rgba(139, 92, 246, 0.5)'
    },
    blue: { 
      primary: '#00F0FF', 
      secondary: '#00D4FF',
      glow: 'rgba(0, 240, 255, 0.5)'
    },
    slate: { 
      primary: '#64748B', 
      secondary: '#94A3B8',
      glow: 'rgba(100, 116, 139, 0.5)'
    },
    amber: { 
      primary: '#F59E0B', 
      secondary: '#FBBF24',
      glow: 'rgba(245, 158, 11, 0.5)'
    },
    emerald: { 
      primary: '#10B981', 
      secondary: '#34D399',
      glow: 'rgba(16, 185, 129, 0.5)'
    },
    rose: { 
      primary: '#FF006E', 
      secondary: '#FF4D9E',
      glow: 'rgba(255, 0, 110, 0.5)'
    },
  };

  const colors = colorMap[classData.colorScheme.primary] || colorMap.slate;

  return (
    <div className="min-h-screen bg-[#0A0A0F] relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/classes">
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6 transition-all hover:scale-105"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#8B8B9E',
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Classes
            </button>
          </Link>
        </motion.div>

        {/* Class Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-8 mb-8"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}08)`,
            border: `1px solid ${colors.primary}30`,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: `${colors.primary}20`,
                border: `2px solid ${colors.primary}40`,
              }}
            >
              <span className="text-2xl">{classData.icon}</span>
            </div>
            <span 
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: `${colors.primary}20`,
                color: colors.primary,
              }}
            >
              {classData.theme}
            </span>
          </div>
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ color: colors.primary }}
          >
            {classData.title}
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            {classData.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lessons Section - 2/3 width */}
          <div className="lg:col-span-2">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold mb-6 text-white"
            >
              Lessons
            </motion.h2>
            
            {/* Lessons Grid - 2 columns on larger screens */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {classData.lessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <LessonCard
                    lesson={lesson}
                    classId={classData.id}
                    index={index}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Mindset Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-xl border"
              style={{
                background: 'rgba(0, 240, 255, 0.03)',
                borderColor: 'rgba(0, 240, 255, 0.1)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5" style={{ color: '#00F0FF' }} />
                <h3 className="font-semibold text-white">Mindset</h3>
              </div>
              <p className="text-sm text-gray-400">
                {classData.mindset}
              </p>
            </motion.div>
            
            {/* Problem Statement Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-xl border"
              style={{
                background: 'rgba(255, 0, 110, 0.03)',
                borderColor: 'rgba(255, 0, 110, 0.1)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5" style={{ color: '#FF006E' }} />
                <h3 className="font-semibold text-white">The Problem</h3>
              </div>
              <p className="text-sm text-gray-400">
                {classData.problemStatement}
              </p>
            </motion.div>

            {/* Pro Tip Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-xl border"
              style={{
                background: 'rgba(184, 41, 221, 0.03)',
                borderColor: 'rgba(184, 41, 221, 0.1)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5" style={{ color: '#B829DD' }} />
                <h3 className="font-semibold text-white">Pro Tip</h3>
              </div>
              <p className="text-sm text-gray-400">
                Complete lessons in order for the best learning experience. Each lesson builds on the previous one.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
