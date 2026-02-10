"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { classes } from "../lib/data/classes";
import { useUser } from "../lib/hooks/useUser";

const colorMap: Record<string, string> = {
  violet: '#8B5CF6',
  blue: '#00F0FF',
  slate: '#64748B',
  amber: '#F59E0B',
  emerald: '#10B981',
  rose: '#FF006E',
};

export default function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useUser();
  
  const filteredClasses = classes.filter(c => 
    searchQuery === '' || 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.theme.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.p 
            className="text-cyan-400 text-sm uppercase tracking-[0.3em] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Training Halls
          </motion.p>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            CHOOSE YOUR
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              PATH
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Select a class to begin your AI collaboration journey
          </motion.p>

          {/* Search */}
          <motion.div 
            className="max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <input
              type="text"
              placeholder="Search classes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors"
            />
          </motion.div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((classData, index) => {
            const color = colorMap[classData.colorScheme.primary] || '#64748B';
            const completedLessons = classData.lessons.filter(lesson => 
              user?.completedLessons?.includes(lesson.id)
            ).length;
            const progress = (completedLessons / classData.lessons.length) * 100;
            
            return (
              <motion.div
                key={classData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link href={`/class/${classData.id}`}>
                  <div 
                    className="group p-8 border border-white/10 rounded-2xl h-full flex flex-col hover:border-cyan-400/50 transition-all"
                    style={{ background: `linear-gradient(135deg, ${color}08, transparent)` }}
                  >
                    {/* Icon */}
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-3xl"
                      style={{ background: `${color}20`, border: `2px solid ${color}40` }}
                    >
                      {classData.icon || '🎯'}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-2" style={{ color }}>
                      {classData.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4">{classData.theme}</p>
                    <p className="text-gray-500 text-sm mb-6 flex-grow">{classData.description}</p>
                    
                    {/* Progress */}
                    <div className="mt-auto">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">{completedLessons}/{classData.lessons.length} lessons</span>
                        <span style={{ color }}>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
