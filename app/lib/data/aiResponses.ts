import { AIPersonality } from "./aiPersonalities";
import { ChatMessage } from "../types";

// Simulated AI responses that feel authentic
// Sometimes helpful, sometimes frustrating - by design

interface ResponseTemplate {
  prefixes: string[];
  helpful: string[];
  vague: string[];
  challenging: string[];
  wrong: string[];
  clarifying: string[];
}

const responseTemplates: Record<string, ResponseTemplate> = {
  optimist: {
    prefixes: [
      "This is exciting! ",
      "I see so many possibilities here. ",
      "What if we pushed this even further? ",
      "Here's something interesting that might work... ",
    ],
    helpful: [
      "That's a solid foundation. Want to explore some variations?",
      "You've got a great starting point. I can see this going in several interesting directions.",
      "This has real potential. Let me suggest a few ways to amplify what you're building.",
    ],
    vague: [
      "There's definitely something here. Maybe we should think about the bigger picture?",
      "I love the energy of this approach. The possibilities are endless!",
      "This feels like the start of something really interesting.",
    ],
    challenging: [
      "What if the real opportunity is something we haven't considered yet?",
      "What if we flipped this completely and approached it from the opposite angle?",
      "The constraints you're seeing might actually be where the magic happens.",
    ],
    wrong: [
      "I think this could be revolutionary. Let me show you something that might blow this wide open...",
      "This reminds me of a breakthrough approach that could change everything...",
    ],
    clarifying: [
      "I'm getting a good vibe here, but help me understand the core of what you're after.",
      "There's a thread I want to pull on—can you say more about the underlying goal?",
    ],
  },
  skeptic: {
    prefixes: [
      "Wait—let's back up. ",
      "I'm not convinced that's the right approach. ",
      "Before we continue, have you considered... ",
      "That assumes something that might not be true. ",
    ],
    helpful: [
      "That's one way to look at it. But what's the underlying problem you're actually solving?",
      "Okay, I can see how you got there. But let's test this assumption.",
      "Maybe. But what happens when [edge case] happens?",
    ],
    vague: [
      "I need more to work with. What exactly are you trying to achieve?",
      "That's pretty abstract. Can you ground this in a specific example?",
      "I'm not sure I understand the actual goal here.",
    ],
    challenging: [
      "What makes you think this is the real problem?",
      "Are you solving the symptom or the cause?",
      "What if you're asking the wrong question entirely?",
    ],
    wrong: [
      "That approach has been tried before and rarely works.",
      "I think you're overcomplicating something that has a simpler solution.",
    ],
    clarifying: [
      "I need you to be more specific about what success looks like.",
      "Before I respond, what's the actual constraint we're working within?",
    ],
  },
  literalist: {
    prefixes: [
      "As requested: ",
      "I interpreted your request literally. ",
      "Here is the output based on your exact specifications. ",
    ],
    helpful: [
      "I have processed your input exactly as provided.",
      "Output generated based on your precise instructions.",
      "Here is the literal interpretation of your request.",
    ],
    vague: [
      "Your instructions contain ambiguity. Please clarify the following parameters.",
      "I cannot proceed without clearer specifications.",
      "Multiple interpretations are possible. Please specify which you intended.",
    ],
    challenging: [
      "Your request implies assumptions that are not explicitly stated.",
      "The scope is undefined. Please provide boundaries.",
    ],
    wrong: [
      "I have executed the command exactly as written. If the result is unexpected, the input may need revision.",
      "Output matches input parameters. If incorrect, please review your specifications.",
    ],
    clarifying: [
      "Please define: [term from user input]. Multiple definitions are possible.",
      "Insufficient data. Required parameters: [list of missing info].",
    ],
  },
  connector: {
    prefixes: [
      "This connects to something I've seen before. ",
      "There's a pattern here worth noting. ",
      "This reminds me of a related situation. ",
      "Let me draw a connection you might find useful. ",
    ],
    helpful: [
      "This pattern shows up in [related context]. Here's how it usually plays out.",
      "There's a parallel here to [similar situation]. The lessons might transfer.",
      "I'm seeing echoes of [broader concept]. That might give us a framework.",
    ],
    vague: [
      "There's something here that reminds me of [pattern], but I'm not sure it applies.",
      "I see a potential connection to [related area], but I'd need to know more.",
    ],
    challenging: [
      "Have you noticed how this connects to [wider context]?",
      "What if this is actually an instance of [larger pattern]?",
      "This looks isolated, but it might be part of [broader trend].",
    ],
    wrong: [
      "This pattern typically indicates [outcome], which might not be what you want.",
      "Historically, approaches like this lead to [consequence].",
    ],
    clarifying: [
      "I'm seeing a pattern, but I need to know: is this more like [A] or [B]?",
      "To make the right connection, what's the broader context this sits within?",
    ],
  },
};

export function generateAIResponse(
  userMessage: string,
  personalityId: string,
  phase: "a" | "b" | "c" | "d",
  history: ChatMessage[]
): string {
  const templates = responseTemplates[personalityId] || responseTemplates.optimist;
  
  // Determine response type based on phase and randomness
  const random = Math.random();
  let responseType: keyof ResponseTemplate = "helpful";
  
  if (phase === "a") {
    // Phase A: More clarifying questions
    responseType = random < 0.4 ? "clarifying" : random < 0.7 ? "helpful" : "vague";
  } else if (phase === "b") {
    // Phase B: Introduce friction - helpful but with issues
    responseType = random < 0.3 ? "vague" : random < 0.6 ? "helpful" : random < 0.8 ? "wrong" : "challenging";
  } else if (phase === "c") {
    // Phase C: More challenging/reflective
    responseType = random < 0.4 ? "challenging" : random < 0.7 ? "helpful" : "clarifying";
  } else {
    // Phase D: Supportive but still testing
    responseType = random < 0.5 ? "helpful" : random < 0.8 ? "challenging" : "clarifying";
  }
  
  const responses = templates[responseType];
  const response = responses[Math.floor(Math.random() * responses.length)];
  
  // Sometimes add a prefix
  const shouldAddPrefix = Math.random() < 0.3;
  const prefix = shouldAddPrefix 
    ? templates.prefixes[Math.floor(Math.random() * templates.prefixes.length)]
    : "";
  
  return prefix + response;
}

// Generate context-aware opening messages
export function generateOpeningMessage(personalityId: string, lessonTitle: string): string {
  const openings: Record<string, string[]> = {
    optimist: [
      `Let's tackle "${lessonTitle}" together. I'm excited to see what we come up with!`,
      `"${lessonTitle}"—this is going to be interesting. Where do you want to start?`,
      `Ready for "${lessonTitle}"? I have a feeling we're going to discover something useful.`,
    ],
    skeptic: [
      `"${lessonTitle}"—okay, but let's be clear about what we're actually trying to achieve here.`,
      `Before we dive into "${lessonTitle}", what's the real problem we're solving?`,
      `"${lessonTitle}" sounds straightforward. It rarely is. What's your angle?`,
    ],
    literalist: [
      `Initiating "${lessonTitle}" session. Please specify your objective.`,
      `"${lessonTitle}" module loaded. Awaiting your input parameters.`,
      `Ready to process "${lessonTitle}". Please provide your requirements.`,
    ],
    connector: [
      `"${lessonTitle}"—this connects to some patterns I've seen. Let's explore.`,
      `Starting "${lessonTitle}". I'm curious what connections we'll find.`,
      `"${lessonTitle}". This might relate to broader themes. Let's see.`,
    ],
  };
  
  const options = openings[personalityId] || openings.optimist;
  return options[Math.floor(Math.random() * options.length)];
}
