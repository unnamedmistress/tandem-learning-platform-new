import { RelatedLesson } from "../types";

export const relatedLessons: Record<string, RelatedLesson[]> = {
  // Mobile App lessons
  "mobile-1": [
    { lessonId: "mobile-3", reason: "Builds on precision skills", skillConnection: "Being specific about requirements" },
    { lessonId: "copilot-1", reason: "Similar friction with unwanted additions", skillConnection: "Setting clear boundaries" },
  ],
  "mobile-2": [
    { lessonId: "copilot-2", reason: "Evaluating unexpected suggestions", skillConnection: "Critical assessment of alternatives" },
    { lessonId: "mobile-4", reason: "Being open to better approaches", skillConnection: "Flexibility vs. consistency" },
  ],
  "mobile-3": [
    { lessonId: "mobile-1", reason: "Precision in specifications", skillConnection: "Detailed requirements" },
    { lessonId: "copilot-3", reason: "Testing understanding", skillConnection: "Verification and validation" },
  ],
  "mobile-4": [
    { lessonId: "copilot-3", reason: "Clarity for others", skillConnection: "Communication and explanation" },
    { lessonId: "mobile-2", reason: "User perspective", skillConnection: "Seeing from another viewpoint" },
  ],
  
  // Copilot Students lessons
  "copilot-1": [
    { lessonId: "mobile-1", reason: "Managing AI additions", skillConnection: "Controlling scope" },
    { lessonId: "copilot-2", reason: "Developing critical judgment", skillConnection: "Quality assessment" },
  ],
  "copilot-2": [
    { lessonId: "mobile-2", reason: "Considering alternatives", skillConnection: "Openness to different approaches" },
    { lessonId: "copilot-4", reason: "Evaluating reasoning quality", skillConnection: "Intellectual honesty" },
  ],
  "copilot-3": [
    { lessonId: "mobile-4", reason: "Teaching and explaining", skillConnection: "Making things clear to others" },
    { lessonId: "mobile-3", reason: "Testing understanding", skillConnection: "Verification methods" },
  ],
  "copilot-4": [
    { lessonId: "copilot-2", reason: "Intellectual honesty", skillConnection: "Ethical reasoning" },
    { lessonId: "mobile-1", reason: "Ownership of work", skillConnection: "Authentic contribution" },
  ],
};

export function getRelatedLessons(lessonId: string): RelatedLesson[] {
  return relatedLessons[lessonId] || [];
}
