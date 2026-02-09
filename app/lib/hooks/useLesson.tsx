"use client";

import { useState, useCallback } from "react";
import { LessonProgress, ChatMessage, DepthLevel } from "../types";

export function useLesson(lessonId: string, classId: string) {
  const [progress, setProgress] = useState<LessonProgress>({
    lessonId,
    classId,
    currentPhase: "a",
    chatHistory: [],
    reflections: [],
    startedAt: new Date().toISOString(),
    depthAchieved: "surface",
  });

  const advancePhase = useCallback(() => {
    setProgress((prev) => {
      const phaseOrder: ("a" | "b" | "c" | "d")[] = ["a", "b", "c", "d"];
      const currentIndex = phaseOrder.indexOf(prev.currentPhase);
      const nextPhase = phaseOrder[currentIndex + 1];
      
      if (!nextPhase) {
        return { ...prev, currentPhase: "a" };
      }
      
      return { ...prev, currentPhase: nextPhase };
    });
  }, []);

  const addChatMessage = useCallback((message: ChatMessage) => {
    setProgress((prev) => ({
      ...prev,
      chatHistory: [...prev.chatHistory, message],
    }));
  }, []);

  const addReflection = useCallback((reflection: string) => {
    setProgress((prev) => ({
      ...prev,
      reflections: [...prev.reflections, reflection],
    }));
  }, []);

  const setDepth = useCallback((depth: DepthLevel) => {
    setProgress((prev) => ({
      ...prev,
      depthAchieved: depth,
    }));
  }, []);

  const complete = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      completedAt: new Date().toISOString(),
    }));
  }, []);

  return {
    progress,
    advancePhase,
    addChatMessage,
    addReflection,
    setDepth,
    complete,
  };
}
