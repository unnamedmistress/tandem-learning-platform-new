"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Target } from "lucide-react";
import { AIChat } from "./AIChat";
import { Lesson, ChatMessage, AIPersonality } from "../lib/types";

interface PhaseDProps {
  lesson: Lesson;
  problem: string;
  context: string;
  reflection: string;
  messages: ChatMessage[];
  onMessagesChange: (messages: ChatMessage[]) => void;
  onComplete: () => void;
  personalityId?: AIPersonality;
}

export function PhaseD({
  lesson,
  problem,
  context,
  reflection,
  messages,
  onMessagesChange,
  onComplete,
  personalityId = "optimist",
}: PhaseDProps) {
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: `Ready for round two. You said: "${reflection.slice(0, 100)}${reflection.length > 100 ? "..." : ""}" \n\nLet's see how this approach feels different.`,
        timestamp: new Date().toISOString(),
        phase: "d",
      };
      onMessagesChange([initialMessage]);
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 h-[500px]">
          <AIChat
            initialMessages={messages}
            onMessageSend={(msg) => {
              onMessagesChange([
                ...messages,
                {
                  id: Date.now().toString(),
                  role: "user",
                  content: msg,
                  timestamp: new Date().toISOString(),
                  phase: "d",
                },
              ]);
            }}
            onMessageReceive={(msg) => {
              onMessagesChange([
                ...messages,
                {
                  id: (Date.now() + 1).toString(),
                  role: "assistant",
                  content: msg,
                  timestamp: new Date().toISOString(),
                  phase: "d",
                },
              ]);
            }}
            phase="d"
            personalityId={personalityId}
          />
        </div>

        <div className="space-y-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">Skill Focus</span>
              </div>
              <p className="text-sm">{lesson.phases.d.skillFocus}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="font-medium text-sm">Your Insight</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-4">
                {reflection}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm font-medium mb-2">Deeper Question</p>
              <p className="text-sm text-muted-foreground">
                {lesson.phases.d.deeperQuestion}
              </p>
            </CardContent>
          </Card>

          <div className="pt-4 border-t">
            <Button onClick={onComplete} className="w-full" variant="default">
              Complete Lesson
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Mark as complete when you've experienced the difference
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
