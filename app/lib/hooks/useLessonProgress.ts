"use client";

import { useState, useEffect } from "react";
import { LessonProgress, ChatMessage, DepthLevel } from "../types";

const PROGRESS_KEY = "tandem_lesson_progress";

export function useLessonProgress() {
  const [savedProgress, setSavedProgress] = useState<Record<string, LessonProgress>>({});

  // Load progress from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(PROGRESS_KEY);
      if (stored) {
        try {
          setSavedProgress(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse lesson progress:", e);
        }
      }
    }
  }, []);

  const saveProgress = (
    lessonId: string,
    classId: string,
    currentPhase: LessonProgress['currentPhase'],
    chatHistory: ChatMessage[],
    reflections: string[],
    phaseAData?: { problem: string; context: string },
    phaseCReflection?: string
  ) => {
    const progress: LessonProgress = {
      lessonId,
      classId,
      currentPhase,
      chatHistory,
      reflections,
      startedAt: savedProgress[lessonId]?.startedAt || new Date().toISOString(),
      depthAchieved: "surface",
      phaseAData,
      phaseCReflection,
    };

    const updated = { ...savedProgress, [lessonId]: progress };
    setSavedProgress(updated);
    
    if (typeof window !== "undefined") {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
    }
  };

  const getProgress = (lessonId: string): LessonProgress | null => {
    return savedProgress[lessonId] || null;
  };

  const clearProgress = (lessonId: string) => {
    const updated = { ...savedProgress };
    delete updated[lessonId];
    setSavedProgress(updated);
    
    if (typeof window !== "undefined") {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
    }
  };

  const completeLesson = (lessonId: string, depth: DepthLevel) => {
    const progress = savedProgress[lessonId];
    if (progress) {
      const updated = {
        ...savedProgress,
        [lessonId]: {
          ...progress,
          currentPhase: "completed" as const,
          completedAt: new Date().toISOString(),
          depthAchieved: depth,
        },
      };
      setSavedProgress(updated);
      
      if (typeof window !== "undefined") {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
      }
    }
  };

  const hasInProgressLesson = (): string | null => {
    const inProgress = Object.values(savedProgress).find(
      p => p.currentPhase !== "completed"
    );
    return inProgress?.lessonId || null;
  };

  const getAllProgress = () => savedProgress;

  return {
    saveProgress,
    getProgress,
    clearProgress,
    completeLesson,
    hasInProgressLesson,
    getAllProgress,
  };
}
