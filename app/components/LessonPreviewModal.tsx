"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, MessageSquare, RotateCcw, CheckCircle, ArrowRight } from 'lucide-react';

interface LessonPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LessonPreviewModal({ isOpen, onClose }: LessonPreviewModalProps) {
  const [step, setStep] = useState(0);
  
  const previewSteps = [
    {
      title: "The Real Mess",
      description: "You describe your actual work problem",
      content: "I need to write a product announcement email, but it sounds too robotic when I use AI.",
      icon: <MessageSquare className="w-5 h-5" />,
      color: '#FF006E',
    },
    {
      title: "First Attempt",
      description: "AI responds to your initial prompt",
      content: "Subject: Product Update\n\nWe are pleased to announce the release of our new feature...",
      aiResponse: "(You notice it sounds generic and stiff)",
      icon: <ArrowRight className="w-5 h-5" />,
      color: '#00F0FF',
    },
    {
      title: "The Mirror",
      description: "Reflect on what went wrong",
      content: "Your prompt was vague. The AI didn't know:\n• Your company voice\n• The specific feature benefits\n• Your audience",
      icon: <RotateCcw className="w-5 h-5" />,
      color: '#B829DD',
    },
    {
      title: "Second Attempt",
      description: "Apply what you learned",
      content: "Subject: The Feature You've Been Waiting For 🎉\n\nHey [Name],\n\nRemember when you said you wished...",
      aiResponse: "(Much better! Specific, personal, engaging)",
      icon: <CheckCircle className="w-5 h-5" />,
      color: '#39FF14',
    },
  ];
  
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
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8"
          style={{
            background: 'linear-gradient(135deg, #12121A 0%, #0A0A0F 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Play className="w-6 h-6" style={{ color: '#00F0FF' }} />
              <span className="text-sm uppercase tracking-widest" style={{ color: '#8B8B9E' }}>
                Preview
              </span>
            </div>
            <h2 
              className="text-2xl sm:text-3xl font-bold mb-2"
              style={{
                background: 'linear-gradient(135deg, #00F0FF, #FF006E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              How TANDEM Lessons Work
            </h2>
            <p className="text-gray-400 text-sm">
              Watch the learning loop in action
            </p>
          </div>
          
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-6">
            {previewSteps.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  background: i === step ? previewSteps[step].color : 'rgba(255,255,255,0.2)',
                  transform: i === step ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>
          
          {/* Current Step */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              {/* Step header */}
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${previewSteps[step].color}20`, color: previewSteps[step].color }}
                >
                  {previewSteps[step].icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: previewSteps[step].color }}>
                    {previewSteps[step].title}
                  </h3>
                  <p className="text-sm text-gray-500">{previewSteps[step].description}</p>
                </div>
              </div>
              
              {/* Content */}
              <div 
                className="p-4 rounded-xl mb-4"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <p className="text-gray-300 whitespace-pre-line">
                  {previewSteps[step].content}
                </p>
              </div>
              
              {previewSteps[step].aiResponse && (
                <div 
                  className="p-3 rounded-lg text-sm italic"
                  style={{ background: 'rgba(0,0,0,0.3)', color: '#6B6B7E' }}
                >
                  {previewSteps[step].aiResponse}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="px-4 py-2 rounded-lg text-sm disabled:opacity-30"
              style={{ color: '#8B8B9E' }}
            >
              Previous
            </button>
            
            {step < previewSteps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2 rounded-lg text-sm font-medium"
                style={{
                  background: previewSteps[step].color,
                  color: '#0A0A0F',
                }}
              >
                Next Step →
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-lg text-sm font-medium"
                style={{
                  background: 'linear-gradient(135deg, #00F0FF, #FF006E)',
                  color: '#0A0A0F',
                }}
              >
                Try It Yourself →
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
