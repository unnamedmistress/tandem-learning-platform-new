"use client";

import { useState, useCallback } from "react";
import { ChatMessage, LessonProgress, DepthLevel } from "../types";
import { aiPersonalities } from "../data/aiPersonalities";
import { generateAIResponse } from "../data/aiResponses";

interface UseAIReturn {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (content: string, personalityId?: string) => Promise<void>;
  clearMessages: () => void;
  getLastMessages: (count: number) => ChatMessage[];
}

export function useAI(
  lessonId: string,
  phase: "a" | "b" | "c" | "d",
  initialMessages: ChatMessage[] = []
): UseAIReturn {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(
    async (content: string, personalityId?: string) => {
      const personality = personalityId || "optimist";
      
      // Add user message
      const userMessage: ChatMessage = {
        id: Math.random().toString(36).substring(2, 15),
        role: "user",
        content,
        timestamp: new Date().toISOString(),
        personality,
        phase,
      };
      
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      // Simulate AI thinking time
      await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200));

      // Generate AI response
      const aiContent = generateAIResponse(content, personality, phase, messages);
      
      const aiMessage: ChatMessage = {
        id: Math.random().toString(36).substring(2, 15),
        role: "assistant",
        content: aiContent,
        timestamp: new Date().toISOString(),
        personality,
        phase,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    },
    [lessonId, phase, messages]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const getLastMessages = useCallback(
    (count: number) => {
      return messages.slice(-count);
    },
    [messages]
  );

  return {
    messages,
    isTyping,
    sendMessage,
    clearMessages,
    getLastMessages,
  };
}
