"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, SkillToken, UncertaintyEntry, InteractionPattern, DepthLevel } from "../types";

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  addSkillToken: (token: SkillToken) => void;
  addUncertaintyEntry: (entry: UncertaintyEntry) => void;
  completeLesson: (lessonId: string, depth: DepthLevel) => void;
  updateDepthMarker: (lessonId: string, depth: DepthLevel) => void;
  recordInteraction: (pattern: InteractionPattern["type"], example: string) => void;
  setPersonality: (personality: User["currentPersonality"]) => void;
  getPatterns: () => InteractionPattern[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = "tandem-user";

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function createNewUser(): User {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    skillTokens: [],
    uncertaintyLog: [],
    completedLessons: [],
    depthMarkers: {},
    interactionPatterns: [],
    currentPersonality: "optimist",
    joinedAt: now,
    lastActiveAt: now,
  };
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser({ ...parsed, lastActiveAt: new Date().toISOString() });
      } catch {
        setUser(createNewUser());
      }
    } else {
      setUser(createNewUser());
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage on changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }, [user]);

  const addSkillToken = (token: SkillToken) => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        skillTokens: [...prev.skillTokens, token],
        lastActiveAt: new Date().toISOString(),
      };
    });
  };

  const addUncertaintyEntry = (entry: UncertaintyEntry) => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        uncertaintyLog: [...prev.uncertaintyLog, entry],
        lastActiveAt: new Date().toISOString(),
      };
    });
  };

  const completeLesson = (lessonId: string, depth: DepthLevel) => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        completedLessons: [...new Set([...prev.completedLessons, lessonId])],
        depthMarkers: { ...prev.depthMarkers, [lessonId]: depth },
        lastActiveAt: new Date().toISOString(),
      };
    });
  };

  const updateDepthMarker = (lessonId: string, depth: DepthLevel) => {
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        depthMarkers: { ...prev.depthMarkers, [lessonId]: depth },
        lastActiveAt: new Date().toISOString(),
      };
    });
  };

  const recordInteraction = (type: InteractionPattern["type"], example: string) => {
    setUser((prev) => {
      if (!prev) return prev;
      const existing = prev.interactionPatterns.find((p) => p.type === type);
      if (existing) {
        return {
          ...prev,
          interactionPatterns: prev.interactionPatterns.map((p) =>
            p.type === type
              ? { ...p, count: p.count + 1, examples: [...p.examples.slice(-4), example] }
              : p
          ),
          lastActiveAt: new Date().toISOString(),
        };
      }
      return {
        ...prev,
        interactionPatterns: [...prev.interactionPatterns, { type, count: 1, examples: [example] }],
        lastActiveAt: new Date().toISOString(),
      };
    });
  };

  const setPersonality = (personality: User["currentPersonality"]) => {
    setUser((prev) => {
      if (!prev) return prev;
      return { ...prev, currentPersonality: personality, lastActiveAt: new Date().toISOString() };
    });
  };

  const getPatterns = () => user?.interactionPatterns || [];

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        addSkillToken,
        addUncertaintyEntry,
        completeLesson,
        updateDepthMarker,
        recordInteraction,
        setPersonality,
        getPatterns,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
