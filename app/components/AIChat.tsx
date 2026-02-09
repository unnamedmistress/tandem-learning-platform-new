"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send } from "lucide-react";
import { ChatMessage } from "../lib/types";
import { aiPersonalities, AIPersonality } from "../lib/data/aiPersonalities";
import { generateAIResponse } from "../lib/data/aiResponses";
import { PersonalitySelector } from "./PersonalitySelector";

interface AIChatProps {
  initialMessages?: ChatMessage[];
  onMessageSend?: (message: string) => void;
  onMessageReceive?: (message: string) => void;
  classId?: string;
  lessonId?: string;
  phase?: "a" | "b" | "c" | "d";
  personalityId?: AIPersonality["id"];
  onPersonalityChange?: (personality: AIPersonality["id"]) => void;
  isReflection?: boolean;
}

export function AIChat({
  initialMessages = [],
  onMessageSend,
  onMessageReceive,
  classId,
  lessonId,
  phase = "a",
  personalityId = "optimist",
  onPersonalityChange,
  isReflection = false,
}: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const personality = aiPersonalities.find((p) => p.id === personalityId) || aiPersonalities[1];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
      phase,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    onMessageSend?.(input);

    // Simulate AI typing
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Generate AI response based on personality and context
    const aiContent = generateAIResponse(input, personality, phase, messages);

    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: aiContent,
      timestamp: new Date().toISOString(),
      personality: personalityId,
      phase,
      isReflection,
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsTyping(false);
    onMessageReceive?.(aiContent);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2" style={{ borderColor: personality.color }}>
              <AvatarFallback className="text-lg">{personality.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{personality.name}</div>
              <div className="text-xs text-muted-foreground">{personality.tagline}</div>
            </div>
          </div>
          <PersonalitySelector
            current={personalityId}
            onChange={onPersonalityChange || (() => {})}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col pt-4">
        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.isReflection && (
                    <Badge variant="outline" className="mb-2 text-xs">
                      Reflection
                    </Badge>
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <span className="text-xs opacity-50 mt-1 block">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce delay-75" />
                    <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce delay-150" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex gap-2 mt-4 pt-4 border-t">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button onClick={handleSend} disabled={isTyping || !input.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
