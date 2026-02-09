"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, MessageSquare, Lightbulb, Users } from 'lucide-react';

interface AIPersonality {
  id: string;
  name: string;
  description: string;
  style: string;
  bestFor: string;
  icon: React.ReactNode;
  color: string;
  example: string;
}

const personalities: AIPersonality[] = [
  {
    id: 'skeptic',
    name: 'The Skeptic',
    description: 'Challenges your assumptions and asks tough questions',
    style: 'Critical, probing, thorough',
    bestFor: 'Testing ideas, finding flaws, risk assessment',
    icon: <Bot className="w-6 h-6" />,
    color: '#FF006E',
    example: '"Have you considered what happens if this approach fails?"',
  },
  {
    id: 'optimist',
    name: 'The Optimist',
    description: 'Builds on your ideas and finds possibilities',
    style: 'Encouraging, expansive, creative',
    bestFor: 'Brainstorming, exploring options, momentum',
    icon: <Lightbulb className="w-6 h-6" />,
    color: '#00F0FF',
    example: '"What if we took this idea even further?"',
  },
  {
    id: 'literalist',
    name: 'The Literalist',
    description: 'Takes your prompts exactly as written',
    style: 'Precise, straightforward, concrete',
    bestFor: 'Learning clarity, testing specificity, basics',
    icon: <MessageSquare className="w-6 h-6" />,
    color: '#B829DD',
    example: '"You asked for X, so here is exactly X."',
  },
  {
    id: 'connector',
    name: 'The Connector',
    description: 'Finds patterns and relates ideas',
    style: 'Holistic, associative, insightful',
    bestFor: 'Complex problems, synthesis, big picture',
    icon: <Users className="w-6 h-6" />,
    color: '#39FF14',
    example: '"This reminds me of a similar pattern in..."',
  },
];

interface AIPersonalityShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (personality: string) => void;
}

export function AIPersonalityShowcase({ isOpen, onClose, onSelect }: AIPersonalityShowcaseProps) {
  const [selectedPersonality, setSelectedPersonality] = useState<string | null>(null);
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(10, 10, 15, 0.95)', backdropFilter: 'blur(10px)' }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8"
          style={{
            background: 'linear-gradient(135deg, #12121A 0%, #0A0A0F 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 
              className="text-2xl sm:text-3xl font-bold mb-3"
              style={{
                background: 'linear-gradient(135deg, #00F0FF, #FF006E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Meet Your AI Partners
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Each personality approaches collaboration differently. Choose the one that fits your current challenge—or try them all to build flexibility.
            </p>
          </div>
          
          {/* Personality Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {personalities.map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  setSelectedPersonality(selectedPersonality === p.id ? null : p.id);
                  onSelect?.(p.id);
                }}
                className={`relative p-5 rounded-xl cursor-pointer transition-all ${
                  selectedPersonality === p.id ? 'ring-2' : ''
                }`}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${selectedPersonality === p.id ? p.color : 'rgba(255,255,255,0.1)'}`,
                  boxShadow: selectedPersonality === p.id ? `0 0 30px ${p.color}30` : 'none',
                }}
              >
                {/* Icon & Name */}
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ 
                      background: `${p.color}20`,
                      color: p.color,
                    }}
                  >
                    {p.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1" style={{ color: p.color }}>
                      {p.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {p.description}
                    </p>
                    
                    {/* Expanded details */}
                    <AnimatePresence>
                      {selectedPersonality === p.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-gray-800"
                        >
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-500">Style:</span>{' '}
                              <span className="text-gray-300">{p.style}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Best for:</span>{' '}
                              <span className="text-gray-300">{p.bestFor}</span>
                            </div>
                            <div 
                              className="italic mt-2 p-2 rounded"
                              style={{ background: 'rgba(255,255,255,0.03)' }}
                            >
                              "{p.example}"
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Footer */}
          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full font-medium"
              style={{
                background: 'linear-gradient(135deg, #00F0FF, #FF006E)',
                color: '#0A0A0F',
              }}
            >
              Got It, Let&apos;s Practice
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
