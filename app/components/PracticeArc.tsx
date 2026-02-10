"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, RotateCcw, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { AIChat } from "./AIChat";
import { PhaseA } from "./PhaseA";
import { PhaseB } from "./PhaseB";
import { PhaseC } from "./PhaseC";
import { PhaseD } from "./PhaseD";
import { MicroFeedbackCard } from "./MicroFeedbackCard";
import { GoodFrictionGuide } from "./GoodFrictionGuide";
import { Lesson, ChatMessage, LessonProgress, DepthLevel, MicroFeedback } from "../lib/types";
import { useUser } from "../lib/hooks/useUser";
import { generateMicroFeedback } from "../lib/data/microFeedback";

interface PracticeArcProps {
  lesson: Lesson;
  onComplete: (depth: DepthLevel) => void;
  savedProgress?: LessonProgress | null;
  onSaveProgress?: (
    lessonId: string,
    classId: string,
    currentPhase: LessonProgress['currentPhase'],
    chatHistory: ChatMessage[],
    reflections: string[],
    phaseAData?: { problem: string; context: string },
    phaseCReflection?: string
  ) => void;
}

export function PracticeArc({ lesson, onComplete, savedProgress, onSaveProgress }: PracticeArcProps) {
  const [currentPhase, setCurrentPhase] = useState<"a" | "b" | "c" | "d">("a");
  const [phaseAData, setPhaseAData] = useState<{ problem: string; context: string } | null>(null);
  const [phaseBMessages, setPhaseBMessages] = useState<ChatMessage[]>([]);
  const [phaseCReflection, setPhaseCReflection] = useState<string>("");
  const [phaseDMessages, setPhaseDMessages] = useState<ChatMessage[]>([]);
  const [microFeedback, setMicroFeedback] = useState<MicroFeedback | null>(null);
  const [showFrictionGuide, setShowFrictionGuide] = useState(true);
  const [personalityId, setPersonalityId] = useState<'skeptic' | 'optimist' | 'literalist' | 'connector'>("optimist");
  
  const { user, recordInteraction } = useUser();

  const phases = [
    { id: "a", label: "The Real Mess", description: "What's actually going on?" },
    { id: "b", label: "First Attempt", description: "Try with AI, notice friction" },
    { id: "c", label: "The Mirror", description: "See your patterns" },
    { id: "d", label: "Second Attempt", description: "Apply what you learned" },
  ];

  const currentPhaseIndex = phases.findIndex((p) => p.id === currentPhase);

  // Restore progress on mount
  useEffect(() => {
    if (savedProgress) {
      setCurrentPhase(savedProgress.currentPhase as "a" | "b" | "c" | "d");
      if (savedProgress.phaseAData) {
        setPhaseAData(savedProgress.phaseAData);
      }
      if (savedProgress.chatHistory.length > 0) {
        const phaseBMsgs = savedProgress.chatHistory.filter(m => m.phase === 'b');
        const phaseDMsgs = savedProgress.chatHistory.filter(m => m.phase === 'd');
        setPhaseBMessages(phaseBMsgs);
        setPhaseDMessages(phaseDMsgs);
      }
      if (savedProgress.phaseCReflection) {
        setPhaseCReflection(savedProgress.phaseCReflection);
      }
    }
  }, [savedProgress]);

  // Auto-save progress on phase changes
  useEffect(() => {
    if (onSaveProgress) {
      onSaveProgress(
        lesson.id,
        lesson.classId,
        currentPhase,
        [...phaseBMessages, ...phaseDMessages],
        phaseCReflection ? [phaseCReflection] : [],
        phaseAData || undefined,
        phaseCReflection || undefined
      );
    }
  }, [currentPhase, phaseBMessages, phaseDMessages, phaseCReflection, phaseAData]);

  // Generate micro-feedback based on user interactions
  useEffect(() => {
    const userMessages = currentPhase === 'b' ? phaseBMessages : phaseDMessages;
    const messageCount = userMessages.length;
    
    if (messageCount > 0 && messageCount % 3 === 0) { // Every 3 messages
      const userMsgsOnly = userMessages.filter(m => m.role === 'user');
      const avgLength = userMsgsOnly.length > 0
        ? userMsgsOnly.reduce((acc, m) => acc + m.content.length, 0) / userMsgsOnly.length
        : 0;
      
      const feedback = generateMicroFeedback({
        messageCount,
        avgMessageLength: avgLength,
        hasAskedQuestion: userMsgsOnly.some(m => m.content.includes('?')),
        hasPushedFurther: avgLength > 80,
        phase: currentPhase,
        lessonId: lesson.id,
        reflectionLength: phaseCReflection?.length,
      });
      
      if (feedback) {
        setMicroFeedback(feedback);
      }
    }
  }, [phaseBMessages, phaseDMessages, currentPhase, lesson.id, phaseCReflection]);

  const handlePhaseAComplete = (problem: string, context: string) => {
    setPhaseAData({ problem, context });
    setCurrentPhase("b");
  };

  const handlePhaseBComplete = () => {
    setCurrentPhase("c");
  };

  const handlePhaseCComplete = (reflection: string) => {
    setPhaseCReflection(reflection);
    setCurrentPhase("d");
  };

  const handlePhaseDComplete = () => {
    const messageCount = phaseBMessages.length + phaseDMessages.length;
    const hasReflection = phaseCReflection.length > 50;

    let depth: DepthLevel = "surface";
    if (messageCount > 10 && hasReflection) depth = "fluency";
    else if (messageCount > 6 && hasReflection) depth = "judgment";
    else if (messageCount > 3) depth = "structure";

    onComplete(depth);
  };

  const handleMessageSend = (message: string) => {
    if (message.length < 20) {
      recordInteraction("gave_up_early", "Short response: " + message.slice(0, 50));
    } else if (message.includes("?")) {
      recordInteraction("asked_clarifying", message.slice(0, 100));
    }
  };

  const handleDismissFeedback = () => {
    setMicroFeedback(null);
  };

  return (
    <div className="space-y-6">
      {/* Phase Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          {phases.map((phase, index) => (
            <div
              key={phase.id}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                index <= currentPhaseIndex ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                  index === currentPhaseIndex
                    ? "bg-primary text-primary-foreground"
                    : index < currentPhaseIndex
                    ? "bg-primary/20 text-primary"
                    : "bg-muted"
                )}
              >
                {index < currentPhaseIndex ? "✓" : phase.id.toUpperCase()}
              </div>
              <span className="hidden sm:block text-xs font-medium">{phase.label}</span>
            </div>
          ))}
        </div>
        <Progress value={(currentPhaseIndex + 1) * 25} className="h-2" />
      </div>

      {/* Micro Feedback */}
      {microFeedback && (
        <MicroFeedbackCard 
          feedback={microFeedback} 
          onDismiss={handleDismissFeedback}
        />
      )}

      {/* Good Friction Guide (Phase B only) */}
      {currentPhase === 'b' && showFrictionGuide && (
        <GoodFrictionGuide 
          lessonId={lesson.id}
          onDismiss={() => setShowFrictionGuide(false)}
        />
      )}

      {/* Current Phase */}
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <Badge variant="outline" className="mb-2">
                Phase {currentPhase.toUpperCase()}: {phases[currentPhaseIndex].label}
              </Badge>
              <h3 className="text-lg font-semibold">{lesson.title}</h3>
              <p className="text-muted-foreground">{phases[currentPhaseIndex].description}</p>
            </div>
            {/* AI Personality Switcher - visible in phases B and D */}
            {(currentPhase === 'b' || currentPhase === 'd') && (
              <select
                value={personalityId}
                onChange={(e) => setPersonalityId(e.target.value as typeof personalityId)}
                className="text-sm border rounded-md px-2 py-1 bg-background"
              >
                <option value="optimist">✨ Optimist</option>
                <option value="skeptic">🤨 Skeptic</option>
                <option value="literalist">📝 Literalist</option>
                <option value="connector">🔗 Connector</option>
              </select>
            )}
          </div>

          {currentPhase === "a" && (
            <PhaseA
              lesson={lesson}
              onComplete={handlePhaseAComplete}
            />
          )}

          {currentPhase === "b" && phaseAData && (
            <PhaseB
              lesson={lesson}
              problem={phaseAData.problem}
              context={phaseAData.context}
              messages={phaseBMessages}
              onMessagesChange={setPhaseBMessages}
              onComplete={handlePhaseBComplete}
              onMessageSend={handleMessageSend}
              personalityId={personalityId}
            />
          )}

          {currentPhase === "c" && (
            <PhaseC
              lesson={lesson}
              phaseBMessages={phaseBMessages}
              onComplete={handlePhaseCComplete}
            />
          )}

          {currentPhase === "d" && phaseAData && (
            <PhaseD
              lesson={lesson}
              problem={phaseAData.problem}
              context={phaseAData.context}
              reflection={phaseCReflection}
              messages={phaseDMessages}
              onMessagesChange={setPhaseDMessages}
              onComplete={handlePhaseDComplete}
              personalityId={personalityId}
            />
          )}
        </CardContent>
      </Card>

      {/* Auto-save indicator */}
      <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
        <Save className="w-3 h-3" />
        Progress auto-saves
      </div>
    </div>
  );
}
