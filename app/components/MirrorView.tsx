"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Brain, Lightbulb } from "lucide-react";
import { ChatMessage, InteractionPattern } from "../lib/types";

interface MirrorViewProps {
  messages: ChatMessage[];
  patterns: InteractionPattern[];
  insights: { type: string; text: string }[];
}

export function MirrorView({ messages, patterns, insights }: MirrorViewProps) {
  const userMessages = messages.filter((m) => m.role === "user");
  const aiMessages = messages.filter((m) => m.role === "assistant");

  return (
    <Card className="bg-gradient-to-br from-muted/50 to-muted">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <CardTitle className="text-base">The Mirror</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Here's what I noticed about how you worked with AI:
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-background rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{userMessages.length}</div>
            <div className="text-xs text-muted-foreground">Your messages</div>
          </div>
          <div className="bg-background rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">{aiMessages.length}</div>
            <div className="text-xs text-muted-foreground">AI responses</div>
          </div>
          <div className="bg-background rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">
              {userMessages.length > 0
                ? Math.round(
                    userMessages.reduce((acc, m) => acc + m.content.length, 0) /
                      userMessages.length
                  )
                : 0}
            </div>
            <div className="text-xs text-muted-foreground">Avg length</div>
          </div>
        </div>

        {/* Insights */}
        {insights.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span className="font-medium text-sm">Pattern Recognition</span>
            </div>
            <div className="space-y-2">
              {insights.map((insight, idx) => (
                <div
                  key={idx}
                  className="bg-background rounded-lg p-3 text-sm border-l-2 border-primary"
                >
                  {insight.text}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Messages Preview */}
        {messages.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-sm">Recent Interaction</span>
            </div>
            <div className="bg-background rounded-lg p-3 max-h-32 overflow-y-auto">
              {messages.slice(-3).map((msg, idx) => (
                <div key={idx} className="text-sm mb-2 last:mb-0">
                  <Badge variant={msg.role === "user" ? "default" : "secondary"} className="mr-2 text-xs">
                    {msg.role === "user" ? "You" : "AI"}
                  </Badge>
                  <span className="text-muted-foreground line-clamp-1">
                    {msg.content.slice(0, 80)}
                    {msg.content.length > 80 ? "..." : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
