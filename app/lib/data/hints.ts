// Hints for Phase A to help users articulate problems
export interface PhaseAHint {
  id: string;
  category: 'problem' | 'context' | 'general';
  text: string;
  example?: string;
}

export const phaseAHints: PhaseAHint[] = [
  {
    id: "hint-1",
    category: "problem",
    text: "Start with the outcome you want, not the solution.",
    example: "Instead of 'I need a login system', try 'Users need to access their personal data securely'",
  },
  {
    id: "hint-2",
    category: "problem",
    text: "What would success look like? Be specific about the result.",
    example: "'Users can complete checkout in under 3 clicks' vs 'Make checkout better'",
  },
  {
    id: "hint-3",
    category: "problem",
    text: "Who is affected by this problem?",
    example: "First-time users, mobile users, administrators, etc.",
  },
  {
    id: "hint-4",
    category: "context",
    text: "What constraints are you working within?",
    example: "Budget, timeline, technical limitations, user expectations",
  },
  {
    id: "hint-5",
    category: "context",
    text: "What have you already tried?",
    example: "Previous solutions, workarounds, discarded approaches",
  },
  {
    id: "hint-6",
    category: "context",
    text: "What would make this a failure?",
    example: "Understanding anti-goals helps clarify what to avoid",
  },
  {
    id: "hint-7",
    category: "general",
    text: "Don't worry about being perfect. Get your thoughts down first.",
  },
  {
    id: "hint-8",
    category: "general",
    text: "Use your own words. This helps AI understand your perspective.",
  },
];

export function getRandomHints(count: number = 3, category?: PhaseAHint['category']): PhaseAHint[] {
  const filtered = category 
    ? phaseAHints.filter(h => h.category === category)
    : phaseAHints;
  
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
