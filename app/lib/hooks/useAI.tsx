"use client";

import { useState, useCallback } from "react";
import { aiPersonalities, AIPersonality } from "../data/aiPersonalities";
import { generateAIResponse } from "../data/aiResponses";

export function useAI() {
  const [personality, setPersonality] = useState<AIPersonality["id"]>("optimist");
  const [isLoading, setIsLoading] = useState(false);

  const getResponse = useCallback(
    async (userMessage: string, phase: "a" | "b" | "c" | "d" = "a") => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000));
      
      const personalityData = aiPersonalities.find((p) => p.id === personality);
      if (!personalityData) {
        setIsLoading(false);
        return "I'm not sure how to respond right now.";
      }
      
      const response = generateAIResponse(userMessage, personalityData, phase);
      setIsLoading(false);
      return response;
    },
    [personality]
  );

  return {
    personality,
    setPersonality,
    getResponse,
    isLoading,
    personalityData: aiPersonalities.find((p) => p.id === personality),
  };
}
