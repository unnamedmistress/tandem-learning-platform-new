export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  difficultyLabel: string;
  objective: string;
  skill: string;
  problem: string;
  setup: string;
  phases: {
    setup: { title: string; description: string; tips: string[] };
    attempt: { title: string; description: string; tips: string[] };
    feedback: { title: string; description: string; tips: string[] };
    retry: { title: string; description: string; tips: string[] };
  };
  aiPartner: { name: string; personality: string; description: string };
  skillBadge: { name: string; description: string; icon: string };
  estimatedTime: string;
  xpReward: number;
}

export interface ChallengeClass {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  lessons: Lesson[];
  totalLessons: number;
  estimatedTime: string;
  xpReward: number;
}

export const challengeClasses: ChallengeClass[] = [
  {
    id: "email-mastery",
    title: "Email Communication Mastery",
    description: "Learn to write professional emails that sound human, not robotic. Master tone, clarity, and persuasion with AI collaboration.",
    category: "Communication",
    difficulty: "Beginner",
    lessons: [
      {
        id: "email-mastery-1",
        title: "The Robotic Email Problem",
        description: "Identify why AI-generated emails sound stiff and learn to add human warmth.",
        difficulty: 1,
        difficultyLabel: "Easy",
        objective: "Recognize robotic language patterns",
        skill: "Tone detection",
        problem: "Your emails sound like they were written by a chatbot",
        setup: "You have a draft email that feels too formal and impersonal.",
        phases: {
          setup: { title: "Analyze the Problem", description: "Robotic emails lack personality and warmth.", tips: ["Look for overly formal phrases", "Identify generic greetings", "Spot buzzword overload"] },
          attempt: { title: "Request Humanization", description: "Ask AI to make the email sound more natural.", tips: ["Request casual but professional tone", "Ask for specific examples", "Request personality injection"] },
          feedback: { title: "Compare Versions", description: "Did the humanization work?", tips: ["Read both versions aloud", "Check for warmth", "Verify professionalism maintained"] },
          retry: { title: "Fine-tune Tone", description: "Adjust to match your voice.", tips: ["Add personal touches", "Reference specific context", "Adjust formality level"] }
        },
        aiPartner: { name: "The Editor", personality: "perceptive, articulate", description: "Tone and style specialist" },
        skillBadge: { name: "Tone Detective", description: "Expert at identifying voice issues", icon: "MessageSquare" },
        estimatedTime: "10-15 min",
        xpReward: 150
      },
      {
        id: "email-mastery-2",
        title: "The Clear Request",
        description: "Write emails where the action item is impossible to miss.",
        difficulty: 2,
        difficultyLabel: "Medium",
        objective: "Master clear call-to-action writing",
        skill: "Action clarity",
        problem: "Recipients don't know what you want them to do",
        setup: "You need a response but your emails get ignored.",
        phases: {
          setup: { title: "Identify the Problem", description: "Unclear requests get buried.", tips: ["Find buried action items", "Spot vague language", "Identify missing deadlines"] },
          attempt: { title: "Request Clarity", description: "Ask AI to make the request prominent.", tips: ["Ask for bold formatting", "Request specific deadline", "Ask for single action focus"] },
          feedback: { title: "Test Clarity", description: "Can someone act on this immediately?", tips: ["Show to colleague", "Time how fast they understand", "Check for ambiguity"] },
          retry: { title: "Optimize for Response", description: "Make it even easier to respond.", tips: ["Add response options", "Simplify further", "Remove distractions"] }
        },
        aiPartner: { name: "The Clarity Coach", personality: "direct, practical", description: "Communication efficiency expert" },
        skillBadge: { name: "Action Architect", description: "Master of clear requests", icon: "Target" },
        estimatedTime: "12-18 min",
        xpReward: 200
      },
      {
        id: "email-mastery-3",
        title: "The Persuasive Pitch",
        description: "Write emails that get buy-in without being pushy.",
        difficulty: 3,
        difficultyLabel: "Hard",
        objective: "Master persuasive email writing",
        skill: "Persuasion",
        problem: "Your proposals get rejected or ignored",
        setup: "You need to convince someone to take action.",
        phases: {
          setup: { title: "Analyze Persuasion", description: "Persuasion is about their interests, not yours.", tips: ["Identify their priorities", "Find mutual benefit", "Anticipate objections"] },
          attempt: { title: "Draft Persuasive Email", description: "Request AI to help structure persuasion.", tips: ["Lead with their benefit", "Request objection handling", "Ask for social proof integration"] },
          feedback: { title: "Test Persuasiveness", description: "Would this convince you?", tips: ["Read as the recipient", "Check for pushiness", "Verify authenticity"] },
          retry: { title: "Refine Approach", description: "Make it more compelling.", tips: ["Add specific evidence", "Tighten value proposition", "Improve flow"] }
        },
        aiPartner: { name: "The Persuader", personality: "strategic, empathetic", description: "Influence and negotiation expert" },
        skillBadge: { name: "Persuasion Pro", description: "Master of compelling communication", icon: "Zap" },
        estimatedTime: "15-20 min",
        xpReward: 300
      }
    ],
    totalLessons: 3,
    estimatedTime: "40-55 min",
    xpReward: 650
  },
  {
    id: "meeting-mastery",
    title: "Meeting Intelligence",
    description: "Transform chaotic meetings into actionable outcomes. Learn to extract decisions, assign follow-ups, and keep everyone aligned.",
    category: "Productivity",
    difficulty: "Intermediate",
    lessons: [
      {
        id: "meeting-mastery-1",
        title: "The Transcript Tamer",
        description: "Turn 20-page meeting transcripts into concise summaries.",
        difficulty: 2,
        difficultyLabel: "Medium",
        objective: "Master meeting summarization",
        skill: "Information extraction",
        problem: "Meeting transcripts are too long to review",
        setup: "You have a 45-minute meeting transcript to process.",
        phases: {
          setup: { title: "Understand the Goal", description: "Different summaries serve different purposes.", tips: ["Identify your audience", "Determine detail level needed", "Note key decisions to find"] },
          attempt: { title: "Request Summary", description: "Ask AI to extract key information.", tips: ["Provide context about meeting", "Request specific sections", "Ask for action items separately"] },
          feedback: { title: "Verify Coverage", description: "Did the summary capture what matters?", tips: ["Check against your notes", "Verify action items", "Test with colleague"] },
          retry: { title: "Refine Format", description: "Optimize for your workflow.", tips: ["Adjust length", "Change structure", "Add metadata"] }
        },
        aiPartner: { name: "The Summarizer", personality: "concise, thorough", description: "Information distillation expert" },
        skillBadge: { name: "Meeting Summarizer", description: "Master of transcript compression", icon: "FileText" },
        estimatedTime: "12-18 min",
        xpReward: 200
      },
      {
        id: "meeting-mastery-2",
        title: "The Decision Extractor",
        description: "Identify and document decisions made during meetings.",
        difficulty: 3,
        difficultyLabel: "Medium",
        objective: "Master decision documentation",
        skill: "Decision tracking",
        problem: "Decisions get lost or forgotten after meetings",
        setup: "You need to extract all decisions from a team meeting.",
        phases: {
          setup: { title: "Define Decisions", description: "Not every discussion is a decision.", tips: ["Distinguish decisions from discussion", "Note who made the call", "Identify rationale"] },
          attempt: { title: "Extract Decisions", description: "Request AI to identify decisions.", tips: ["Ask for explicit decisions", "Request decision owners", "Ask for implied decisions"] },
          feedback: { title: "Verify Decisions", description: "Are these the actual decisions made?", tips: ["Cross-check with attendees", "Verify decision authority", "Confirm timing"] },
          retry: { title: "Format for Action", description: "Make decisions actionable.", tips: ["Add context", "Link to rationale", "Set review dates"] }
        },
        aiPartner: { name: "The Documentarian", personality: "precise, organized", description: "Decision tracking specialist" },
        skillBadge: { name: "Decision Tracker", description: "Expert at capturing commitments", icon: "CheckSquare" },
        estimatedTime: "15-20 min",
        xpReward: 250
      },
      {
        id: "meeting-mastery-3",
        title: "The Follow-Up Architect",
        description: "Create action items that actually get done.",
        difficulty: 3,
        difficultyLabel: "Hard",
        objective: "Master action item creation",
        skill: "Task delegation",
        problem: "Action items are vague and never completed",
        setup: "You need to turn meeting discussion into clear assignments.",
        phases: {
          setup: { title: "Define Good Action Items", description: "Clear actions get completed.", tips: ["Make them specific", "Assign owners", "Set deadlines"] },
          attempt: { title: "Create Action Items", description: "Request AI to draft assignments.", tips: ["Ask for SMART format", "Request owner assignment", "Ask for priority ranking"] },
          feedback: { title: "Review Actions", description: "Are these actionable?", tips: ["Check for clarity", "Verify ownership", "Confirm achievability"] },
          retry: { title: "Optimize Tracking", description: "Make follow-up easier.", tips: ["Add tracking method", "Set reminders", "Create accountability"] }
        },
        aiPartner: { name: "The Taskmaster", personality: "organized, results-focused", description: "Project management expert" },
        skillBadge: { name: "Action Architect", description: "Master of task delegation", icon: "CheckCircle" },
        estimatedTime: "15-20 min",
        xpReward: 300
      }
    ],
    totalLessons: 3,
    estimatedTime: "45-60 min",
    xpReward: 750
  },
  {
    id: "technical-translator",
    title: "Technical Translator",
    description: "Bridge the gap between technical and non-technical stakeholders. Learn to explain complex concepts clearly without losing accuracy.",
    category: "Technical Communication",
    difficulty: "Intermediate",
    lessons: [
      {
        id: "technical-translator-1",
        title: "The Jargon Breaker",
        description: "Identify and eliminate technical jargon that confuses stakeholders.",
        difficulty: 2,
        difficultyLabel: "Medium",
        objective: "Master jargon elimination",
        skill: "Simplification",
        problem: "Stakeholders don't understand technical explanations",
        setup: "You have a technical explanation full of jargon.",
        phases: {
          setup: { title: "Identify Jargon", description: "Jargon creates distance.", tips: ["List all technical terms", "Identify acronyms", "Find implicit assumptions"] },
          attempt: { title: "Request Translation", description: "Ask AI to simplify.", tips: ["Request plain language", "Ask for analogies", "Request concept layering"] },
          feedback: { title: "Test Comprehension", description: "Would a non-technical person understand?", tips: ["Read to test audience", "Check for remaining jargon", "Verify accuracy preserved"] },
          retry: { title: "Refine Balance", description: "Simplify without dumbing down.", tips: ["Add context gradually", "Use progressive disclosure", "Include optional details"] }
        },
        aiPartner: { name: "The Translator", personality: "patient, clear", description: "Technical communication specialist" },
        skillBadge: { name: "Jargon Buster", description: "Expert at simplification", icon: "Languages" },
        estimatedTime: "12-18 min",
        xpReward: 200
      },
      {
        id: "technical-translator-2",
        title: "The Analogy Creator",
        description: "Build bridges between technical concepts and everyday experiences.",
        difficulty: 3,
        difficultyLabel: "Hard",
        objective: "Master analogy creation",
        skill: "Concept translation",
        problem: "Abstract concepts are hard to explain",
        setup: "You need to explain a complex system architecture to executives.",
        phases: {
          setup: { title: "Find the Core Concept", description: "Every complex idea has a simple core.", tips: ["Identify the essential function", "Strip away implementation details", "Find the user impact"] },
          attempt: { title: "Request Analogies", description: "Ask AI for comparison frameworks.", tips: ["Request everyday analogies", "Ask for visual metaphors", "Request story formats"] },
          feedback: { title: "Test the Analogy", description: "Does the analogy clarify or confuse?", tips: ["Check for accuracy", "Test with audience", "Verify it helps understanding"] },
          retry: { title: "Refine the Bridge", description: "Make the connection stronger.", tips: ["Address edge cases", "Add nuance layers", "Create multiple analogies"] }
        },
        aiPartner: { name: "The Bridge Builder", personality: "creative, analytical", description: "Concept mapping expert" },
        skillBadge: { name: "Analogy Artist", description: "Master of conceptual translation", icon: "Palette" },
        estimatedTime: "15-20 min",
        xpReward: 300
      }
    ],
    totalLessons: 2,
    estimatedTime: "30-40 min",
    xpReward: 500
  }
];

export const getChallengeClassById = (id: string) => challengeClasses.find(c => c.id === id);
export const getAllChallengeClasses = () => challengeClasses;
