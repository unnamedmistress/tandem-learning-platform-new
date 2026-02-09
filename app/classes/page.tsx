"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { classes } from "../lib/data/classes";
import { Sparkles, Search, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { useUser } from "../lib/hooks/useUser";

import { LessonPreviewModal } from "../components/LessonPreviewModal";

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

function ClassCard({ 
  classData, 
  index,
  completedCount,
  totalCount
}: { 
  classData: typeof classes[0]; 
  index: number;
  completedCount: number;
  totalCount: number;
}) {
  const colors = colorMap[classData.colorScheme.primary] || colorMap.slate;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const isComplete = progress === 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/class/${classData.id}`}>
        <div 
          className="relative p-6 rounded-2xl border cursor-pointer transition-all h-full flex flex-col"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}08, ${colors.secondary}05)`,
            borderColor: `${colors.primary}30`,
          }}
        >
          {/* Icon/Theme Badge */}
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
            style={{
              background: `${colors.primary}20`,
              border: `2px solid ${colors.primary}40`,
            }}
          >
            <span className="text-2xl">{classData.icon || '🎯'}</span>
          </div>
          
          {/* Title */}
          <h3 
            className="text-xl font-bold mb-2"
            style={{ color: colors.primary }}
          >
            {classData.title}
          </h3>
          
          {/* Theme */}
          <p className="text-sm text-gray-400 mb-3">
            {classData.theme}
          </p>
          
          {/* Description */}
          <p className="text-sm text-gray-500 mb-4 flex-grow">
            {classData.description}
          </p>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">
                {completedCount}/{totalCount} lessons
              </span>
              <span className="text-xs font-medium" style={{ color: colors.primary }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div 
              className="w-full h-2 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: colors.primary }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
              />
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isComplete && (
                <CheckCircle className="w-4 h-4" style={{ color: '#39FF14' }} />
              )}
              <span 
                className="text-sm font-medium"
                style={{ color: isComplete ? '#39FF14' : colors.primary }}
              >
                {isComplete ? 'Complete' : 'Start Learning'}
              </span>
            </div>
            <ArrowRight className="w-5 h-5" style={{ color: colors.primary }} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { user } = useUser();
  
  // Filter classes based on search
  const filteredClasses = classes.filter(c => 
    searchQuery === '' || 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchFocused) {
        e.preventDefault();
        document.getElementById('class-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchFocused]);
  
  return (
    <div className="min-h-screen bg-[#0A0A0F] relative overflow-hidden">
      {/* Subtle background effect */}
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
      
      <div className="relative z-10 py-8 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-5 h-5" style={{ color: '#00F0FF' }} />
            <span 
              className="text-sm uppercase tracking-widest font-mono"
              style={{ color: '#8B8B9E' }}
            >
              Training Halls
            </span>
            <Sparkles className="w-5 h-5" style={{ color: '#FF006E' }} />
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl font-bold mb-3"
            style={{
              background: 'linear-gradient(135deg, #00F0FF, #B829DD, #FF006E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Choose Your Path
          </h1>
          
          <p className="text-base max-w-2xl mx-auto mb-6" style={{ color: '#6B6B7E' }}>
            Select a class to begin your AI collaboration journey
          </p>
          
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto mb-6"
          >
            <div 
              className="relative flex items-center"
              style={{
                border: `1px solid ${isSearchFocused ? '#00F0FF' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '9999px',
                background: 'rgba(0,0,0,0.3)',
                transition: 'border-color 0.2s',
              }}
            >
              <Search className="absolute left-4 w-4 h-4" style={{ color: '#6B6B7E' }} />
              <input
                id="class-search"
                type="text"
                placeholder="Search classes... (Press / to focus)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full bg-transparent py-3 pl-12 pr-4 text-sm text-white placeholder-gray-500 outline-none"
              />
            </div>
          </motion.div>
        </motion.div>
        

        {/* Lesson Preview Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <button
            onClick={() => setShowPreview(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all hover:scale-105"
            style={{
              background: 'rgba(0, 240, 255, 0.1)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              color: '#00F0FF',
            }}
          >
            <Play className="w-4 h-4" />
            See how lessons work
          </button>
        </motion.div>
        
        {/* Classes Grid - MAIN REDESIGN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredClasses.length > 0 ? (
            filteredClasses.map((classData, index) => {
              const completedLessons = classData.lessons.filter(lesson => 
                user?.completedLessons?.includes(lesson.id)
              ).length;
              
              return (
                <ClassCard 
                  key={classData.id} 
                  classData={classData} 
                  index={index}
                  completedCount={completedLessons}
                  totalCount={classData.lessons.length}
                />
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p style={{ color: '#6B6B7E' }}>
                No classes match &quot;{searchQuery}&quot;
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-sm"
                style={{ color: '#00F0FF' }}
              >
                Clear search
              </button>
            </div>
          )}
        </div>
        
        {/* Footer Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div 
            className="p-4 rounded-xl border"
            style={{
              background: 'rgba(0, 240, 255, 0.03)',
              borderColor: 'rgba(0, 240, 255, 0.1)',
            }}
          >
            <p className="text-sm" style={{ color: '#8B8B9E' }}>
              <span style={{ color: '#00F0FF' }}>Pro tip:</span> Classes share the same structure but feel different. 
              The goal isn&apos;t completion—it&apos;s building your working relationship with AI.
            </p>
          </div>
        </motion.div>
        
        {/* Lesson Preview Modal */}
        <LessonPreviewModal 
          isOpen={showPreview} 
          onClose={() => setShowPreview(false)} 
        />
      </div>
    </div>
  );
}
