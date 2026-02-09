"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Bot, ScanFace, Trophy, ArrowRight, Sparkles } from "lucide-react";

interface Step {
  id: number;
  icon: React.ReactNode;
  title: string;
  content: string;
  details: string;
  highlight: string;
}

const steps: Step[] = [
  {
    id: 1,
    icon: <User className="w-6 h-6" />,
    title: "You Bring a Real Problem",
    content: '"I need to summarize this 2-hour meeting transcript"',
    details: "Start with something you actually need help with. Not theory—your real work.",
    highlight: "Your actual problem",
  },
  {
    id: 2,
    icon: <Bot className="w-6 h-6" />,
    title: "AI Analyzes Your Approach",
    content: "AI: 'I notice you provided the transcript but didn't specify what matters most.'",
    details: "The AI examines your prompt structure, context, and approach—not just the output.",
    highlight: "Real-time feedback",
  },
  {
    id: 3,
    icon: <ScanFace className="w-6 h-6" />,
    title: "Mirror Shows Your Patterns",
    content: "🪞 'You tend to rush context-setting. Try specifying output format first.'",
    details: "The Mirror identifies recurring patterns in how you collaborate with AI.",
    highlight: "Personalized insights",
  },
  {
    id: 4,
    icon: <Sparkles className="w-6 h-6" />,
    title: "You Iterate & Improve",
    content: '"Summarize as bullet points, focus on action items, under 200 words"',
    details: "Apply the feedback immediately. See the difference in AI's response quality.",
    highlight: "Immediate improvement",
  },
  {
    id: 5,
    icon: <Trophy className="w-6 h-6" />,
    title: "Collect Your Artifact",
    content: "🏆 Earned: 'Precision Intent' Skill Token",
    details: "Your learning is preserved as artifacts you can revisit, share, or add to your portfolio.",
    highlight: "Proof of growth",
  },
];

interface LearningLoopDemoProps {
  onComplete: () => void;
  autoPlay?: boolean;
}

export function LearningLoopDemo({ onComplete, autoPlay = true }: LearningLoopDemoProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isPlaying || isComplete) return;

    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setIsComplete(true);
        setIsPlaying(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, isComplete]);

  const handleStepClick = (index: number) => {
    setIsPlaying(false);
    setCurrentStep(index);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsComplete(true);
      setTimeout(onComplete, 500);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
          How TANDEM Works
        </h2>
        <p className="text-lg text-slate-400">
          Watch the learning loop in action
        </p>
      </motion.div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((s, index) => (
          <button
            key={s.id}
            onClick={() => handleStepClick(index)}
            className={`
              relative flex items-center justify-center w-10 h-10 rounded-full transition-all
              ${index <= currentStep 
                ? "bg-gradient-to-r from-cyan-500 to-pink-500 text-white" 
                : "bg-slate-800 text-slate-500 hover:bg-slate-700"
              }
            `}
          >
            {index < currentStep ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                ✓
              </motion.div>
            ) : (
              s.id
            )}
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div 
                className={`
                  absolute left-full w-4 h-0.5 transition-colors
                  ${index < currentStep ? "bg-cyan-500" : "bg-slate-700"}
                `}
              />
            )}
          </button>
        ))}
      </div>

      {/* Main Demo Area */}
      <div className="relative bg-slate-900/50 rounded-2xl border border-slate-700 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-pink-500/10"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div className="relative p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="min-h-[300px] flex flex-col"
            >
              {/* Step Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                  {step.icon}
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-cyan-400 font-medium">
                    Step {step.id} of {steps.length}
                  </span>
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                </div>
              </div>

              {/* Content Card */}
              <div className="flex-1 bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-6">
                <p className="text-lg text-slate-200 mb-4 font-medium">
                  {step.content}
                </p>
                <p className="text-slate-400">
                  {step.details}
                </p>
              </div>

              {/* Highlight Badge */}
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-slate-500">Key takeaway:</span>
                <span className="text-sm px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {step.highlight}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-700">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-sm text-slate-400 hover:text-white flex items-center gap-2"
            >
              {isPlaying ? "⏸ Pause" : "▶ Play"} auto-advance
            </button>

            <div className="flex items-center gap-4">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  ← Previous
                </button>
              )}
              
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-medium hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all flex items-center gap-2"
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    Got it! Start Learning →
                  </>
                ) : (
                  <>
                    Next Step <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary (shows when complete) */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/30 text-center"
          >
            <p className="text-lg text-slate-200 mb-2">
              🎯 That's the TANDEM method:
            </p>
            <p className="text-2xl font-bold text-white">
              Problem → Feedback → Reflection → Growth
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
