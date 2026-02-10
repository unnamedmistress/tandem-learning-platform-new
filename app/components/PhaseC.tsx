"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MirrorView } from "./MirrorView";
import { ReflectionComparison } from "./ReflectionComparison";
import { Lesson, ChatMessage } from "../lib/types";
import { useUser } from "../lib/hooks/useUser";

interface PhaseCProps {
  lesson: Lesson;
  phaseBMessages: ChatMessage[];
  onComplete: (reflection: string) => void;
}

export function PhaseC({ lesson, phaseBMessages, onComplete }: PhaseCProps) {
  const [reflection, setReflection] = useState("");
  const [selectedAlternative, setSelectedAlternative] = useState<number | null>(null);
  const { getPatterns } = useUser();

  const patterns = getPatterns();
  const userMessages = phaseBMessages.filter((m) => m.role === "user");
  const avgMessageLength = userMessages.length > 0
    ? userMessages.reduce((acc, m) => acc + m.content.length, 0) / userMessages.length
    : 0;

  // Generate insights based on interaction patterns
  const insights = [
    avgMessageLength < 30 && {
      type: "gave_up_early",
      text: "You tended to stop after brief responses. What would happen if you pushed further?",
    },
    avgMessageLength > 100 && {
      type: "pushed_further",
      text: "You wrote detailed messages—that's great for getting nuanced responses.",
    },
    userMessages.some((m) => m.content.includes("?")) && {
      type: "asked_clarifying",
      text: "You asked clarifying questions. This helps avoid misunderstandings.",
    },
    !userMessages.some((m) => m.content.includes("?")) && {
      type: "accepted_first",
      text: "You accepted AI responses without questioning. Sometimes that's fine, but verification builds judgment.",
    },
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      <MirrorView
        messages={phaseBMessages}
        patterns={patterns}
        insights={insights as { type: string; text: string }[]}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Alternative Approaches</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {lesson.phases.c.alternativeApproaches.map((approach, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedAlternative(idx)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selectedAlternative === idx
                  ? "border-primary bg-primary/5"
                  : "hover:bg-muted"
              }`}
            >
              <Badge variant="outline" className="mb-2">
                Approach {idx + 1}
              </Badge>
              <p className="text-sm">{approach}</p>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Your Reflection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {lesson.phases.c.reflectionPrompts.map((prompt, idx) => (
            <p key={idx} className="text-sm text-muted-foreground">
              • {prompt}
            </p>
          ))}
          <Textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="What did you notice about how you worked with AI? What might you try differently?"
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Reflection Comparison - shows after user starts typing */}
      {reflection.length > 10 && (
        <ReflectionComparison 
          userReflection={reflection} 
          lessonId={lesson.id} 
        />
      )}

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {reflection.length} characters (min 20)
        </p>
        <Button
          onClick={() => onComplete(reflection)}
          disabled={reflection.length < 20}
        >
          Try Again with Insight →
        </Button>
      </div>
    </div>
  );
}
