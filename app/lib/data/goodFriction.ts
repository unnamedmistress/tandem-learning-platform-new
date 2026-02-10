import { GoodFrictionExample } from "../types";

export const goodFrictionExamples: GoodFrictionExample[] = [
  {
    id: "friction-1",
    situation: "AI suggests features you didn't ask for",
    friction: "You feel the urge to just accept them to be polite",
    whyItHelps: "This friction reveals where you need to be more specific about boundaries. Good collaboration requires clear constraints.",
    lessonId: "mobile-1",
  },
  {
    id: "friction-2",
    situation: "AI goes in an unexpected direction",
    friction: "You're torn between your plan and AI's suggestion",
    whyItHelps: "This forces you to evaluate: is this actually better or just different? Critical thinking in action.",
    lessonId: "mobile-2",
  },
  {
    id: "friction-3",
    situation: "AI code works for basic cases but fails on edge cases",
    friction: "You have to test and specify edge cases yourself",
    whyItHelps: "You develop the habit of verification—essential for responsible AI collaboration.",
    lessonId: "mobile-3",
  },
  {
    id: "friction-4",
    situation: "Your instructions make sense to you but confuse AI",
    friction: "You realize you're assuming knowledge the user doesn't have",
    whyItHelps: "Teaches you to write for your actual audience, not yourself.",
    lessonId: "mobile-4",
  },
  {
    id: "friction-5",
    situation: "AI gives you 20 mediocre ideas",
    friction: "None of them feel like 'yours'",
    whyItHelps: "Pushes you to develop your own taste and judgment rather than accepting what's given.",
    lessonId: "copilot-1",
  },
  {
    id: "friction-6",
    situation: "AI finds holes in your reasoning",
    friction: "It's uncomfortable to hear your argument isn't airtight",
    whyItHelps: "Builds resilience and helps you strengthen your thinking before others challenge it.",
    lessonId: "copilot-2",
  },
  {
    id: "friction-7",
    situation: "You think you understand but can't explain in your own words",
    friction: "Parroting AI's language reveals surface understanding",
    whyItHelps: "Forces genuine comprehension, not just memorization of AI output.",
    lessonId: "copilot-3",
  },
  {
    id: "friction-8",
    situation: "Separating your contribution from AI's help",
    friction: "Uncomfortable realizations about what's truly yours",
    whyItHelps: "Develops ethical self-awareness about AI use and authentic authorship.",
    lessonId: "copilot-4",
  },
];

export function getFrictionExamplesForLesson(lessonId?: string): GoodFrictionExample[] {
  if (!lessonId) return goodFrictionExamples.slice(0, 3);
  return goodFrictionExamples.filter(f => f.lessonId === lessonId);
}

export function getRandomFrictionExamples(count: number = 2): GoodFrictionExample[] {
  const shuffled = [...goodFrictionExamples].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
