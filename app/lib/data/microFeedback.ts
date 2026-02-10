import { MicroFeedback, FeedbackType } from "../types";

interface FeedbackTemplate {
  type: FeedbackType;
  message: string;
  actionItem?: string;
  condition: (data: FeedbackContext) => boolean;
}

interface FeedbackContext {
  messageCount: number;
  avgMessageLength: number;
  hasAskedQuestion: boolean;
  hasPushedFurther: boolean;
  phase: 'a' | 'b' | 'c' | 'd';
  lessonId: string;
  reflectionLength?: number;
}

const feedbackTemplates: FeedbackTemplate[] = [
  // Positive feedback
  {
    type: "positive",
    message: "Great! You asked clarifying questions—that's key to avoiding misunderstandings.",
    actionItem: "Try asking 'What could go wrong with this approach?' next time.",
    condition: (ctx) => ctx.hasAskedQuestion && ctx.phase === 'b',
  },
  {
    type: "positive",
    message: "You're writing detailed responses—that's excellent for getting nuanced AI help.",
    actionItem: "Keep providing context; it makes all the difference.",
    condition: (ctx) => ctx.avgMessageLength > 100 && ctx.phase === 'b',
  },
  {
    type: "positive",
    message: "You've engaged deeply with this lesson!",
    actionItem: "Reflect on what felt different between your first and second attempts.",
    condition: (ctx) => ctx.messageCount > 8 && ctx.phase === 'd',
  },
  
  // Improvement feedback
  {
    type: "improvement",
    message: "Your responses are quite short. AI can help better with more context.",
    actionItem: "Try expanding on your thinking—what constraints, goals, or concerns do you have?",
    condition: (ctx) => ctx.avgMessageLength < 30 && ctx.messageCount > 2 && ctx.phase === 'b',
  },
  {
    type: "improvement",
    message: "You haven't asked any questions yet. It's okay to be curious!",
    actionItem: "Challenge the AI: 'What assumptions are you making here?'",
    condition: (ctx) => !ctx.hasAskedQuestion && ctx.messageCount > 3 && ctx.phase === 'b',
  },
  
  // Insight feedback
  {
    type: "insight",
    message: "Notice how your second attempt feels different? That's growth.",
    actionItem: "What specific thing will you do differently in future AI conversations?",
    condition: (ctx) => ctx.phase === 'd' && ctx.messageCount > 0,
  },
  {
    type: "insight",
    message: "You're developing a pattern of pushing for deeper understanding.",
    actionItem: "This skill transfers to working with colleagues and clients too.",
    condition: (ctx) => ctx.hasPushedFurther && ctx.messageCount > 5,
  },
  
  // Milestone feedback
  {
    type: "milestone",
    message: "🎉 Milestone: You've completed the full learning loop!",
    actionItem: "You've practiced articulation, collaboration, reflection, and iteration.",
    condition: (ctx) => ctx.phase === 'd' && ctx.messageCount >= 3,
  },
];

export function generateMicroFeedback(context: FeedbackContext): MicroFeedback | null {
  // Find matching feedback templates
  const matches = feedbackTemplates.filter(t => t.condition(context));
  
  if (matches.length === 0) return null;
  
  // Pick the most relevant (prioritize certain types)
  const priorityOrder: FeedbackType[] = ['milestone', 'insight', 'positive', 'improvement'];
  const sorted = matches.sort((a, b) => {
    return priorityOrder.indexOf(a.type) - priorityOrder.indexOf(b.type);
  });
  
  const selected = sorted[0];
  
  return {
    id: `feedback-${Date.now()}`,
    type: selected.type,
    message: selected.message,
    actionItem: selected.actionItem,
    lessonId: context.lessonId,
    phase: context.phase,
    timestamp: new Date().toISOString(),
  };
}

export function getFeedbackIcon(type: FeedbackType): string {
  switch (type) {
    case 'positive': return '✨';
    case 'improvement': return '💡';
    case 'insight': return '🔍';
    case 'milestone': return '🎉';
    default: return '💬';
  }
}

export function getFeedbackColor(type: FeedbackType): string {
  switch (type) {
    case 'positive': return 'bg-green-500/10 border-green-500/30 text-green-700';
    case 'improvement': return 'bg-amber-500/10 border-amber-500/30 text-amber-700';
    case 'insight': return 'bg-blue-500/10 border-blue-500/30 text-blue-700';
    case 'milestone': return 'bg-purple-500/10 border-purple-500/30 text-purple-700';
    default: return 'bg-gray-500/10 border-gray-500/30 text-gray-700';
  }
}
