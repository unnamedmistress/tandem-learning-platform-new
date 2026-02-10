// Timer estimates for lessons based on complexity
export interface LessonTimer {
  minMinutes: number;
  maxMinutes: number;
  reason: string;
}

export const lessonTimers: Record<string, LessonTimer> = {
  // Mobile App Class
  "mobile-1": { minMinutes: 8, maxMinutes: 12, reason: "Foundation lesson with problem articulation" },
  "mobile-2": { minMinutes: 10, maxMinutes: 15, reason: "Includes unexpected direction evaluation" },
  "mobile-3": { minMinutes: 12, maxMinutes: 18, reason: "Edge case testing and verification focus" },
  "mobile-4": { minMinutes: 10, maxMinutes: 14, reason: "Documentation and clarity practice" },
  
  // Copilot Students Class
  "copilot-1": { minMinutes: 8, maxMinutes: 12, reason: "Idea generation and filtering" },
  "copilot-2": { minMinutes: 10, maxMinutes: 15, reason: "Counterargument analysis" },
  "copilot-3": { minMinutes: 12, maxMinutes: 16, reason: "Deep explanation and teaching back" },
  "copilot-4": { minMinutes: 10, maxMinutes: 14, reason: "Ethical self-assessment" },
};

export function getLessonTimer(lessonId: string): LessonTimer {
  return lessonTimers[lessonId] || { minMinutes: 10, maxMinutes: 15, reason: "Standard lesson complexity" };
}

export function formatTimerEstimate(minMinutes: number, maxMinutes: number): string {
  return `${minMinutes}-${maxMinutes} min`;
}
