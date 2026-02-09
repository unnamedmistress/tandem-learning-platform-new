// Simulated AI responses for demo purposes
// In production, this would be replaced with real AI API calls

import { AIPersonality } from "./aiPersonalities";

interface ResponseContext {
  userMessage: string;
  phase: "a" | "b" | "c" | "d";
  previousMessages: { role: "user" | "assistant"; content: string }[];
  personality: AIPersonality;
}

// Response templates by personality and intent
const responseTemplates: Record<AIPersonality["id"], {
  helpful: string[];
  vague: string[];
  challenging: string[];
  featureCreep: string[];
  misunderstanding: string[];
  confidentError: string[];
}> = {
  skeptic: {
    helpful: [
      "Let me think about this carefully. What you're describing could work, but I'm wondering about the edge cases...",
      "That's one approach. Have you considered what happens if the user doesn't behave as expected?",
      "I see the logic, but let's test this assumption before committing to it.",
    ],
    vague: [
      "I'm not sure I have enough context to give you a definitive answer.",
      "There are several ways to interpret what you're asking...",
      "Before I suggest anything, can you clarify what success looks like here?",
    ],
    challenging: [
      "Wait—are you sure that's the real problem? It sounds like a symptom of something deeper.",
      "That approach assumes something that might not be true.",
      "I'm not convinced that's the right framing. What if we looked at it differently?",
    ],
    featureCreep: [
      "While we're at it, should we also consider... actually, no. Let's focus on your core need first.",
      "I could suggest five additional features, but that might distract from your main goal.",
    ],
    misunderstanding: [
      "When you say 'handle that,' do you mean automatically or with user confirmation?",
      "I interpreted your request as X. If you meant Y, then my response changes completely.",
    ],
    confidentError: [
      "Based on standard practice, the answer is definitely X... [Note: This might be wrong in your specific context.]",
      "The established approach is to always do Y first. [Caution: 'Always' is a strong word.]",
    ],
  },
  optimist: {
    helpful: [
      "This is exciting! I see several possibilities here. What if we explored...",
      "I love where you're going with this. Here's how we could push it further...",
      "What a great problem to solve! Let me show you some interesting directions...",
    ],
    vague: [
      "There are so many exciting directions we could take this!",
      "The possibilities here are really inspiring...",
      "I'm sensing there's something interesting beneath the surface...",
    ],
    challenging: [
      "What if the constraints you're seeing aren't actually limits? What if they're opportunities?",
      "Have you considered that this 'problem' might be your biggest asset?",
      "What would this look like if it were 10x more ambitious?",
    ],
    featureCreep: [
      "And while we're building this, we could also add automatic notifications, analytics, integrations...",
      "This opens up so many possibilities! What if we also included AI-powered suggestions, real-time collaboration...",
      "Feature idea: What if we made it predictive? Adaptive? Multi-platform?",
    ],
    misunderstanding: [
      "I'm getting excited about all the directions this could go! Which one were you thinking?",
      "There are at least three ways to interpret this, and they're all interesting!",
    ],
    confidentError: [
      "This is definitely going to revolutionize how you work! [Optimism may exceed reality]",
      "This approach works perfectly in every situation! [Famous last words]",
    ],
  },
  literalist: {
    helpful: [
      "As requested, I have provided exactly what you specified.",
      "Per your instructions, here is the output based on your exact parameters.",
      "I have interpreted your request literally and produced the following:",
    ],
    vague: [
      "Your instructions contain ambiguity. Please specify:",
      "I require clearer parameters to proceed.",
      "Multiple interpretations possible. Clarification needed.",
    ],
    challenging: [
      "Your request contradicts itself at point X.",
      "The parameters you've provided cannot be simultaneously satisfied.",
      "Please resolve the following logical inconsistency:",
    ],
    featureCreep: [
      "I have not added any features beyond what was explicitly requested.",
      "Scope remains exactly as specified. No additions made.",
    ],
    misunderstanding: [
      "I interpreted your request as [literal interpretation]. If incorrect, please restate.",
      "The word 'it' in your message is ambiguous. Please specify the referent.",
    ],
    confidentError: [
      "I have processed your request according to the rules as written.",
      "Output follows logically from your stated premises.",
    ],
  },
  connector: {
    helpful: [
      "This connects to something I've seen in [related context]. The pattern suggests...",
      "This reminds me of a similar situation. Here's what worked there...",
      "I'm seeing a parallel to [broader pattern]. Let me draw that connection...",
    ],
    vague: [
      "There are interesting resonances here with several related domains...",
      "This pattern appears in multiple contexts worth exploring...",
      "I'm sensing connections but want to verify they apply to your situation...",
    ],
    challenging: [
      "This approach is common in [field A], but [field B] handles it differently. Which assumptions apply here?",
      "Have you noticed how this connects to [seemingly unrelated topic]?",
      "What if we applied principles from [different domain] to this problem?",
    ],
    featureCreep: [
      "If we look at how [similar systems] evolved, they typically add... [but do you need that?]",
      "The pattern here suggests natural extensions toward... [though maybe premature]",
    ],
    misunderstanding: [
      "I may be connecting this to the wrong pattern. Let me check my assumptions...",
      "This resembles [Pattern X] but might actually be [Pattern Y]. Which feels right?",
    ],
    confidentError: [
      "This pattern is well-established across multiple domains.",
      "The connection I'm drawing is supported by [similar cases]... [but every context is unique]",
    ],
  },
};

// Context-aware response selection
export function generateAIResponse(
  userMessage: string,
  personality: AIPersonality,
  phase: "a" | "b" | "c" | "d",
  previousMessages: { role: "user" | "assistant"; content: string }[] = []
): string {
  const templates = responseTemplates[personality.id];
  const userMessageCount = previousMessages.filter(m => m.role === "user").length;
  
  // Determine response type based on personality behavior and phase
  const rand = Math.random();
  let responseType: keyof typeof templates;
  
  if (phase === "b" && personality.behavior.challengeFrequency > rand) {
    responseType = "challenging";
  } else if (phase === "b" && personality.behavior.featureCreep > rand) {
    responseType = "featureCreep";
  } else if (personality.behavior.questionFrequency > rand) {
    responseType = "vague";
  } else if (userMessage.length < 30 && rand < 0.3) {
    responseType = "misunderstanding";
  } else if (rand < 0.1) {
    responseType = "confidentError";
  } else {
    responseType = "helpful";
  }
  
  // Select random response from chosen type
  const responses = templates[responseType];
  const response = responses[Math.floor(Math.random() * responses.length)];
  
  // Add personality-specific prefix occasionally
  if (rand < 0.3 && personality.responseModifiers.prefixes.length > 0) {
    const prefix = personality.responseModifiers.prefixes[
      Math.floor(Math.random() * personality.responseModifiers.prefixes.length)
    ];
    return `${prefix}\n\n${response}`;
  }
  
  // Add contextual reference to user's message
  if (userMessage.length > 50 && rand < 0.5) {
    const snippet = userMessage.slice(0, 80);
    return `${response}\n\nTo address your point about "${snippet}${userMessage.length > 80 ? "..." : ""}": ${getContextualFollowUp(userMessage, personality)}`;
  }
  
  return response;
}

function getContextualFollowUp(userMessage: string, personality: AIPersonality): string {
  const followUps: Record<AIPersonality["id"], string[]> = {
    skeptic: [
      "I wonder if that's the complete picture.",
      "What evidence supports that view?",
      "Have you tested that assumption?",
    ],
    optimist: [
      "I see exciting possibilities there!",
      "That could be a great starting point!",
      "Let's build on that momentum!",
    ],
    literalist: [
      "I need specific details to proceed.",
      "Please clarify your requirements.",
      "Ambiguity detected in your statement.",
    ],
    connector: [
      "This connects to broader patterns I've observed.",
      "There's a resonance with similar situations.",
      "The pattern here is worth noting.",
    ],
  };
  
  const responses = followUps[personality.id];
  return responses[Math.floor(Math.random() * responses.length)];
}
