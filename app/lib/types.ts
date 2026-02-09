// Core type definitions for TANDEM platform

export type DepthLevel = 'surface' | 'structure' | 'judgment' | 'fluency';

export interface SkillToken {
  id: string;
  name: string;
  description: string;
  earnedAt: string;
  context: string;
  classId?: string;
  lessonId?: string;
}

export interface UncertaintyEntry {
  id: string;
  text: string;
  timestamp: string;
  lessonId?: string;
  phase?: 'a' | 'b' | 'c' | 'd';
}

export type InteractionPatternType = 
  | 'gave_up_early' 
  | 'accepted_first' 
  | 'asked_clarifying' 
  | 'pushed_further'
  | 'verified_output'
  | 'noticed_inconsistency';

export interface InteractionPattern {
  type: InteractionPatternType;
  count: number;
  examples: string[];
}

export interface User {
  id: string;
  skillTokens: SkillToken[];
  uncertaintyLog: UncertaintyEntry[];
  completedLessons: string[];
  depthMarkers: Record<string, DepthLevel>;
  interactionPatterns: InteractionPattern[];
  currentPersonality: 'skeptic' | 'optimist' | 'literalist' | 'connector';
  joinedAt: string;
  lastActiveAt: string;
}

export interface PhaseA {
  contextQuestions: string[];
  aiOpening: string;
}

export interface PhaseB {
  challengeDescription: string;
  aiBehaviorHints: string[];
  expectedFriction: string[];
}

export interface PhaseC {
  reflectionPrompts: string[];
  alternativeApproaches: string[];
  patternToSurface: InteractionPatternType;
}

export interface PhaseD {
  retryContext: string;
  skillFocus: string;
  deeperQuestion: string;
}

export interface Lesson {
  id: string;
  classId: string;
  title: string;
  order: number;
  description: string;
  phases: {
    a: PhaseA;
    b: PhaseB;
    c: PhaseC;
    d: PhaseD;
  };
}

export interface Class {
  id: string;
  title: string;
  theme: string;
  description: string;
  problemStatement: string;
  mindset: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
  lessons: Lesson[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  submittedBy: string;
  votes: number;
  tags: string[];
  status: 'open' | 'in_progress' | 'solved';
  submittedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  personality?: 'skeptic' | 'optimist' | 'literalist' | 'connector';
  phase?: 'a' | 'b' | 'c' | 'd';
  isReflection?: boolean;
}

export interface LessonProgress {
  lessonId: string;
  classId: string;
  currentPhase: 'a' | 'b' | 'c' | 'd' | 'completed';
  chatHistory: ChatMessage[];
  reflections: string[];
  startedAt: string;
  completedAt?: string;
  depthAchieved: DepthLevel;
}
