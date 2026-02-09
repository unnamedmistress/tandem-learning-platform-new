"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { AIChat } from "./AIChat";
import { PhaseA } from "./PhaseA";
import { PhaseB } from "./PhaseB";
import { PhaseC } from "./PhaseC";
import { PhaseD } from "./PhaseD";
import { Lesson, ChatMessage } from "../lib/types";
import { useUser } from "../lib/hooks/useUser";

interface PracticeArcProps {
  lesson: Lesson;
  onComplete: (depth: "surface" | "structure" | "judgment" | "fluency") => void;
}

export function PracticeArc({ lesson, onComplete }: PracticeArcProps) {
  const [currentPhase, setCurrentPhase] = useState<"a" | "b" | "c" | "d">("a");
  const [phaseAData, setPhaseAData] = useState<{ problem: string; context: string } | null>(null);
  const [phaseBMessages, setPhaseBMessages] = useState<ChatMessage[]>([]);
  const [phaseCReflection, setPhaseCReflection] = useState<string>("");
  const [phaseDMessages, setPhaseDMessages] = useState<ChatMessage[]>([]);
  const { user, recordInteraction } = useUser();

  const phases = [
    { id: "a", label: "The Real Mess", description: "What's actually going on?" },
    { id: "b", label: "First Attempt", description: "Try with AI, notice friction" },
    { id: "c", label: "The Mirror", description: "See your patterns" },
    { id: "d", label: "Second Attempt", description: "Apply what you learned" },
  ];

  const currentPhaseIndex = phases.findIndex((p) => p.id === currentPhase);

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
    // Determine depth level based on engagement
    const messageCount = phaseBMessages.length + phaseDMessages.length;
    const hasReflection = phaseCReflection.length > 50;

    let depth: "surface" | "structure" | "judgment" | "fluency" = "surface";
    if (messageCount > 10 && hasReflection) depth = "fluency";
    else if (messageCount > 6 && hasReflection) depth = "judgment";
    else if (messageCount > 3) depth = "structure";

    onComplete(depth);
  };

  const handleMessageSend = (message: string) => {
    // Record interaction patterns
    if (message.length < 20) {
      recordInteraction("gave_up_early", "Short response: " + message.slice(0, 50));
    } else if (message.includes("?")) {
      recordInteraction("asked_clarifying", message.slice(0, 100));
    }
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

      {/* Current Phase */}
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <Badge variant="outline" className="mb-2">
              Phase {currentPhase.toUpperCase()}: {phases[currentPhaseIndex].label}
            </Badge>
            <h3 className="text-lg font-semibold">{lesson.title}</h3>
            <p className="text-muted-foreground">{phases[currentPhaseIndex].description}</p>
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
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
