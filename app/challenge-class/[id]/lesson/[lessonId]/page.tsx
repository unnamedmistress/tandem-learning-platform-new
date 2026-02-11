"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Clock, 
  Award, 
  Target, 
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Send,
  CheckCircle2,
  Lightbulb
} from "lucide-react";
import { challengeClasses } from "../../../../lib/data/challengeClasses";

type Phase = "setup" | "attempt" | "feedback" | "retry";

const phaseOrder: Phase[] = ["setup", "attempt", "feedback", "retry"];

export default function ChallengeLessonPage() {
  const params = useParams();
  const classId = params?.id as string;
  const lessonId = params?.lessonId as string;
  
  const challengeClass = challengeClasses.find(c => c.id === classId);
  const lesson = challengeClass?.lessons.find(l => l.id === lessonId);
  
  const [currentPhase, setCurrentPhase] = useState<Phase>("setup");
  const [messages, setMessages] = useState<{role: string; content: string}[]>([]);
  const [input, setInput] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  if (!challengeClass || !lesson) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Lesson not found</p>
          <Link 
            href={`/challenge-class/${classId}`}
            className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-400"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Class
          </Link>
        </div>
      </div>
    );
  }

  const currentPhaseIndex = phaseOrder.indexOf(currentPhase);
  const phaseData = lesson.phases[currentPhase];

  const handleNextPhase = () => {
    if (currentPhaseIndex < phaseOrder.length - 1) {
      setCurrentPhase(phaseOrder[currentPhaseIndex + 1]);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevPhase = () => {
    if (currentPhaseIndex > 0) {
      setCurrentPhase(phaseOrder[currentPhaseIndex - 1]);
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: `**${lesson.aiPartner.name}:** I'm here to help you with "${lesson.title}". What would you like to explore?`
      }]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-32 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href={`/challenge-class/${classId}`}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-gray-400">{challengeClass.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`text-xs uppercase tracking-wider px-3 py-1 rounded-full border bg-pink-500/20 text-pink-400 border-pink-500/30`}>
              Lesson {challengeClass.lessons.findIndex(l => l.id === lessonId) + 1}
            </span>
            <span className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" /> {lesson.estimatedTime}
            </span>
            <span className="flex items-center gap-2 text-sm text-gray-500">
              <Award className="w-4 h-4" /> {lesson.xpReward} XP
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black mb-4">{lesson.title}</h1>
          <p className="text-lg text-gray-400">{lesson.description}</p>
        </div>
      </section>

      {/* Phase Progress */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            {phaseOrder.map((phase, index) => (
              <div key={phase} className="flex items-center">
                <div 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    index <= currentPhaseIndex 
                      ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' 
                      : 'bg-white/5 text-gray-500'
                  }`}
                >
                  {index + 1}. {phase.charAt(0).toUpperCase() + phase.slice(1)}
                </div>
                {index < phaseOrder.length - 1 && (
                  <ChevronRight className={`w-4 h-4 mx-2 ${
                    index < currentPhaseIndex ? 'text-pink-500' : 'text-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-32">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Left Column - Phase Content */}
          <div className="lg:col-span-1 space-y-6">
            {/* Problem Card */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-red-400" />
                <span className="text-xs uppercase tracking-wider text-red-400">The Problem</span>
              </div>
              <p className="text-gray-300">{lesson.problem}</p>
            </div>

            {/* Phase Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhase}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold mb-3">{phaseData.title}</h3>
                <p className="text-gray-400 mb-4">{phaseData.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-yellow-400">
                    <Lightbulb className="w-4 h-4" />
                    <span>Tips</span>
                  </div>
                  <ul className="space-y-2">
                    {phaseData.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-400" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* AI Partner */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <span className="text-xs uppercase tracking-wider text-cyan-400">AI Partner</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-400/20 flex items-center justify-center">
                  <span className="text-lg">🤖</span>
                </div>
                <div>
                  <h4 className="font-bold">{lesson.aiPartner.name}</h4>
                  <p className="text-sm text-cyan-400">{lesson.aiPartner.personality}</p>
                  <p className="text-sm text-gray-500">{lesson.aiPartner.description}</p>
                </div>
              </div>
            </div>

            {/* Phase Navigation */}
            <div className="flex gap-3">
              {currentPhaseIndex > 0 && (
                <button
                  onClick={handlePrevPhase}
                  className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
              )}
              <button
                onClick={handleNextPhase}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
              >
                {currentPhaseIndex === phaseOrder.length - 1 ? (
                  <>
                    Complete <CheckCircle2 className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Next <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Chat Interface */}
          <div className="lg:col-span-2">
            {isCompleted ? (
              <div className="glass rounded-3xl p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Lesson Complete!</h3>
                <p className="text-gray-400 mb-6">
                  You earned <span className="text-pink-400 font-bold">{lesson.xpReward} XP</span> and the <span className="text-cyan-400 font-bold">{lesson.skillBadge.name}</span> badge!
                </p>
                <Link
                  href={`/challenge-class/${classId}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-medium hover:opacity-90 transition-all"
                >
                  Continue to Next Lesson <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="glass rounded-3xl overflow-hidden min-h-[600px] flex flex-col">
                {/* Messages */}
                <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[500px]">
                  {messages.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
                      <p>Start the conversation with {lesson.aiPartner.name}</p>
                      <p className="text-sm mt-2">Practice your skills in the {phaseData.title} phase</p>
                    </div>
                  ) : (
                    messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {msg.role === "assistant" && (
                          <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center flex-shrink-0">
                            <span>🤖</span>
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] p-4 rounded-2xl ${
                            msg.role === "user"
                              ? "bg-pink-500/20 border border-pink-500/30"
                              : "bg-white/5 border border-white/10"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10 bg-black/20">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder={`Message ${lesson.aiPartner.name}...`}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!input.trim()}
                      className="px-6 py-3 bg-cyan-400/20 text-cyan-400 rounded-xl hover:bg-cyan-400/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
