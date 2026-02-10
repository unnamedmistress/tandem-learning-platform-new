"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lightbulb, AlertTriangle } from "lucide-react";
import { AIChat } from "./AIChat";
import { Lesson, ChatMessage, AIPersonality } from "../lib/types";

interface PhaseBProps {
  lesson: Lesson;
  problem: string;
  context: string;
  messages: ChatMessage[];
  onMessagesChange: (messages: ChatMessage[]) => void;
  onComplete: () => void;
  onMessageSend: (message: string) => void;
  personalityId?: AIPersonality;
}

export function PhaseB({
  lesson,
  problem,
  context,
  messages,
  onMessagesChange,
  onComplete,
  onMessageSend,
  personalityId = "optimist",
}: PhaseBProps) {
  useEffect(() => {
    // Add initial AI message if none exist
    if (messages.length === 0) {
      const initialMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: lesson.phases.b.aiBehaviorHints[0],
        timestamp: new Date().toISOString(),
        phase: "b",
      };
      onMessagesChange([initialMessage]);
    }
  }, []);

  const expectedFriction = lesson.phases.b.expectedFriction;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 h-[500px]">
          <AIChat
            initialMessages={messages}
            onMessageSend={(msg) => {
              onMessageSend(msg);
              onMessagesChange([
                ...messages,
                {
                  id: Date.now().toString(),
                  role: "user",
                  content: msg,
                  timestamp: new Date().toISOString(),
                  phase: "b",
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
                  phase: "b",
                },
              ]);
            }}
            phase="b"
            personalityId={personalityId}
          />
        </div>

        <div className="space-y-4">
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              {lesson.phases.b.challengeDescription}
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Watch for these friction points:
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              {expectedFriction.map((friction, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500">•</span>
                  {friction}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t">
            <Button onClick={onComplete} className="w-full">
              Continue to Reflection →
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Move on when you've hit some friction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
