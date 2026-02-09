"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Microscope, Palette, Zap, Check, RefreshCw } from "lucide-react";

interface Personality {
  id: string;
  icon: React.ReactNode;
  name: string;
  tagline: string;
  description: string;
  style: string;
  bestFor: string[];
  color: string;
  gradient: string;
}

const personalities: Personality[] = [
  {
    id: "mentor",
    icon: <Brain className="w-8 h-8" />,
    name: "The Mentor",
    tagline: "Patient. Encouraging. Guiding.",
    description: "Asks questions to help you discover your own answers. Perfect for building confidence and deep understanding.",
    style: "Socratic method - guides you to insights through questions",
    bestFor: ["Beginners", "Building confidence", "Deep learning"],
    color: "#00F0FF",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: "analyst",
    icon: <Microscope className="w-8 h-8" />,
    name: "The Analyst",
    tagline: "Precise. Critical. Rigorous.",
    description: "Challenges your assumptions with data-driven feedback. Ideal for refining technical accuracy.",
    style: "Critical analysis - identifies gaps and logical inconsistencies",
    bestFor: ["Technical work", "Debugging", "Precision tasks"],
    color: "#FF006E",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "creative",
    icon: <Palette className="w-8 h-8" />,
    name: "The Creative",
    tagline: "Imaginative. Expansive. Inspiring.",
    description: "Pushes boundaries and sparks unexpected ideas. Great for brainstorming and creative breakthroughs.",
    style: "Lateral thinking - explores unconventional angles",
    bestFor: ["Content creation", "Brainstorming", "Design thinking"],
    color: "#A855F7",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    id: "pragmatist",
    icon: <Zap className="w-8 h-8" />,
    name: "The Pragmatist",
    tagline: "Direct. Efficient. Results-focused.",
    description: "Cuts to the chase with actionable advice. Best when you need solutions fast.",
    style: "Solution-oriented - prioritizes efficiency and outcomes",
    bestFor: ["Quick wins", "Work deadlines", "Getting unstuck"],
    color: "#F59E0B",
    gradient: "from-amber-500 to-orange-500",
  },
];

interface PersonalitySelectorProps {
  onSelect: (personalityId: string, personalityName: string) => void;
  onBack?: () => void;
}

export function OnboardingPersonalitySelector({ onSelect, onBack }: PersonalitySelectorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const selectedPersonality = personalities.find(p => p.id === selectedId);
  const hoveredPersonality = personalities.find(p => p.id === hoveredId);
  const displayPersonality = hoveredPersonality || selectedPersonality;

  const handleConfirm = () => {
    if (selectedPersonality) {
      setIsConfirmed(true);
      setTimeout(() => {
        onSelect(selectedPersonality.id, selectedPersonality.name);
      }, 800);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
          Meet Your AI Training Partners
        </h2>
        <p className="text-lg text-slate-400">
          Each personality approaches collaboration differently.
        </p>
        <p className="text-sm text-slate-500 mt-2">
          You can switch anytime - try them all!
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personality Grid */}
        <div className="grid grid-cols-2 gap-4">
          {personalities.map((personality, index) => (
            <motion.button
              key={personality.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedId(personality.id)}
              onMouseEnter={() => setHoveredId(personality.id)}
              onMouseLeave={() => setHoveredId(null)}
              disabled={isConfirmed}
              className={`
                relative p-6 rounded-2xl border-2 transition-all duration-300
                flex flex-col items-center text-center gap-3
                ${selectedId === personality.id 
                  ? `border-[${personality.color}] shadow-[0_0_40px_${personality.color}40]` 
                  : "border-slate-700 hover:border-slate-500"
                }
                ${isConfirmed && selectedId !== personality.id ? "opacity-40" : "bg-slate-800/30"}
              `}
              style={{
                borderColor: selectedId === personality.id ? personality.color : undefined,
                boxShadow: selectedId === personality.id ? `0 0 40px ${personality.color}40` : undefined,
              }}
            >
              {/* Icon */}
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all"
                style={{
                  background: selectedId === personality.id 
                    ? `linear-gradient(135deg, ${personality.color}40, ${personality.color}20)`
                    : "rgba(30, 41, 59, 0.8)",
                  color: personality.color,
                }}
              >
                {personality.icon}
              </div>

              {/* Name */}
              <div>
                <h3 className="font-bold text-lg text-white">{personality.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{personality.tagline}</p>
              </div>

              {/* Selection indicator */}
              <AnimatePresence>
                {selectedId === personality.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: personality.color }}
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        {/* Detail Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 flex flex-col"
        >
          {displayPersonality ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={displayPersonality.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${displayPersonality.color}40, ${displayPersonality.color}20)`,
                      color: displayPersonality.color,
                    }}
                  >
                    {displayPersonality.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{displayPersonality.name}</h3>
                    <p className="text-sm" style={{ color: displayPersonality.color }}>
                      {displayPersonality.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {displayPersonality.description}
                </p>

                {/* Style */}
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2">Teaching Style</h4>
                  <p className="text-sm text-slate-300 italic">
                    "{displayPersonality.style}"
                  </p>
                </div>

                {/* Best For */}
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2">Best For</h4>
                  <div className="flex flex-wrap gap-2">
                    {displayPersonality.bestFor.map((item) => (
                      <span 
                        key={item}
                        className="text-xs px-3 py-1 rounded-full bg-slate-700 text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Example Response */}
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                  <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2">Example Response</h4>
                  <p className="text-sm text-slate-400 italic">
                    {displayPersonality.id === "mentor" && "What aspects of this problem feel most challenging to you? Let's explore that together."}
                    {displayPersonality.id === "analyst" && "Your prompt lacks specificity in three areas: output format, constraint boundaries, and success criteria."}
                    {displayPersonality.id === "creative" && "What if we approached this from the opposite direction? Or combined it with something unexpected?"}
                    {displayPersonality.id === "pragmatist" && "Here's the exact prompt to use: [specific template]. This will get you results in under 30 seconds."}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500">
              <RefreshCw className="w-12 h-12 mb-4 opacity-50" />
              <p>Hover or select a personality to learn more</p>
            </div>
          )}

          {/* Confirm Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: selectedId ? 1 : 0.5 }}
            disabled={!selectedId || isConfirmed}
            onClick={handleConfirm}
            className={`
              mt-6 w-full py-4 rounded-xl font-semibold text-white transition-all
              ${selectedId && !isConfirmed 
                ? "bg-gradient-to-r from-cyan-500 to-pink-500 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]" 
                : "bg-slate-700 cursor-not-allowed"
              }
            `}
          >
            {isConfirmed ? (
              <span className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Great Choice!
              </span>
            ) : (
              selectedId ? "Train With This Partner →" : "Select a personality above"
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* Back button */}
      {onBack && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onBack}
          disabled={isConfirmed}
          className="mt-6 text-slate-500 hover:text-slate-300 text-sm flex items-center gap-2 mx-auto"
        >
          ← Back
        </motion.button>
      )}
    </div>
  );
}
