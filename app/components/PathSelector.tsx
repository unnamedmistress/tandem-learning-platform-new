"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { GraduationCap, Users, ArrowRight } from 'lucide-react';

interface PathSelectorProps {
  currentPath: 'classes' | 'challenges';
}

export function PathSelector({ currentPath }: PathSelectorProps) {
  const paths = [
    {
      id: 'classes' as const,
      label: 'Classes',
      description: 'Structured learning paths with guided lessons',
      details: '6 topics • Step-by-step • Skill building',
      icon: GraduationCap,
      color: '#00F0FF',
      href: '/classes',
    },
    {
      id: 'challenges' as const,
      label: 'Challenges',
      description: 'Real problems from the community',
      details: 'Open-ended • Community-driven • Practical',
      icon: Users,
      color: '#FF006E',
      href: '/challenges',
    },
  ];
  
  return (
    <div className="mb-12">
      <p className="text-center text-sm text-gray-500 mb-4 uppercase tracking-widest">
        Choose Your Learning Style
      </p>
      <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
        {paths.map((path) => {
          const Icon = path.icon;
          const isActive = currentPath === path.id;
          
          return (
            <Link key={path.id} href={path.href} className="flex-1">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-5 rounded-xl border transition-all cursor-pointer ${
                  isActive ? 'ring-1' : ''
                }`}
                style={{
                  background: isActive ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
                  borderColor: isActive ? path.color : 'rgba(255,255,255,0.1)',
                  boxShadow: isActive ? `0 0 30px ${path.color}20` : 'none',
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${path.color}20`, color: path.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg" style={{ color: isActive ? path.color : '#fff' }}>
                        {path.label}
                      </h3>
                      {isActive && (
                        <span 
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: `${path.color}30`, color: path.color }}
                        >
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{path.description}</p>
                    <p className="text-xs" style={{ color: '#6B6B7E' }}>{path.details}</p>
                  </div>
                  <ArrowRight 
                    className="w-5 h-5 flex-shrink-0 mt-1" 
                    style={{ color: isActive ? path.color : '#6B6B7E' }}
                  />
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
