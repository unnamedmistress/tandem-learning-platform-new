export const missions = [
  {
    id: 1,
    title: "The Perfect Sick Day Email",
    description: "Master the art of professional communication by crafting the ideal sick day notification email.",
    difficulty: 2,
    difficultyLabel: "Easy",
    objective: "Learn formal vs casual prompting",
    skill: "Choosing appropriate tone",
    problem: "Write an email to your boss calling out sick professionally",
    setup: "You're feeling under the weather and need to notify your manager...",
    phases: {
      setup: { title: "Mission Briefing", description: "Learn to adjust tone for professional contexts.", tips: ["Formal tone shows respect", "Include key details", "Keep it concise"] },
      attempt: { title: "Draft Your Prompt", description: "Write a prompt asking for a professional sick day email.", tips: ["Specify the recipient", "Mention the tone you want", "Include context"] },
      feedback: { title: "The Diplomat's Review", description: "The Diplomat evaluates your approach.", tips: ["Check tone consistency", "Verify all details included"] },
      retry: { title: "Refine Your Approach", description: "Adjust your prompt based on feedback.", tips: ["Try different tone words", "Add constraints"] }
    },
    aiPartner: { name: "The Diplomat", personality: "balanced, professional", description: "An expert in workplace communication" },
    skillBadge: { name: "Tone Architect", description: "Master of professional communication", icon: "MessageSquare" },
    estimatedTime: "5-8 min",
    xpReward: 100
  },
  {
    id: 2,
    title: "Meeting Summary Master",
    description: "Transform scattered notes into a clear, actionable meeting summary.",
    difficulty: 2,
    difficultyLabel: "Easy",
    objective: "Learn specificity in prompts",
    skill: "Being specific with requests",
    problem: "Turn messy meeting notes into an organized summary",
    setup: "You have raw notes from a team meeting that need structuring...",
    phases: {
      setup: { title: "Mission Briefing", description: "Specificity gets better results.", tips: ["Define the output format", "List required sections", "Set length limits"] },
      attempt: { title: "Draft Your Prompt", description: "Ask for a structured meeting summary.", tips: ["Specify sections needed", "Mention action items", "Set bullet style"] },
      feedback: { title: "The Organizer's Review", description: "Evaluation of your specificity.", tips: ["Check if all sections requested", "Verify clarity"] },
      retry: { title: "Refine Your Approach", description: "Add more specific instructions.", tips: ["Try numbered lists", "Add examples"] }
    },
    aiPartner: { name: "The Organizer", personality: "structured, detail-oriented", description: "An expert in information architecture" },
    skillBadge: { name: "Detail Seeker", description: "Champion of specific instructions", icon: "List" },
    estimatedTime: "6-9 min",
    xpReward: 100
  },
  {
    id: 3,
    title: "Twitter-Sized Wisdom",
    description: "Distill complex ideas into punchy, shareable social media posts.",
    difficulty: 3,
    difficultyLabel: "Medium",
    objective: "Learn to use constraints effectively",
    skill: "Working within character limits",
    problem: "Create a tweet about productivity under 280 characters",
    setup: "You need to share a productivity tip in a single tweet...",
    phases: {
      setup: { title: "Mission Briefing", description: "Constraints force creativity and clarity.", tips: ["State the limit clearly", "Prioritize key message", "Use active voice"] },
      attempt: { title: "Draft Your Prompt", description: "Request a tweet with strict constraints.", tips: ["Include exact character limit", "Specify the topic", "Mention hashtag preferences"] },
      feedback: { title: "The Editor's Review", description: "Did you nail the constraints?", tips: ["Count characters", "Check engagement hooks"] },
      retry: { title: "Refine Your Approach", description: "Tighten your constraint specification.", tips: ["Add style constraints", "Request alternatives"] }
    },
    aiPartner: { name: "The Editor", personality: "concise, punchy", description: "A social media veteran" },
    skillBadge: { name: "Constraint Crusher", description: "Master of working within limits", icon: "Scissors" },
    estimatedTime: "7-10 min",
    xpReward: 150
  },
  {
    id: 4,
    title: "CMO For A Day",
    description: "Step into a marketing executive's shoes and create a campaign brief.",
    difficulty: 3,
    difficultyLabel: "Medium",
    objective: "Learn role assignment prompting",
    skill: "Using persona-based prompting",
    problem: "Generate a marketing campaign as if you're a CMO",
    setup: "You need to brief your team on a new product launch campaign...",
    phases: {
      setup: { title: "Mission Briefing", description: "Role assignment unlocks expertise.", tips: ["Define the persona clearly", "Include their experience", "State their priorities"] },
      attempt: { title: "Draft Your Prompt", description: "Ask AI to act as a marketing executive.", tips: ["Use 'Act as a...' format", "Add industry context", "Mention company size"] },
      feedback: { title: "The Executive's Review", description: "How well did you set the role?", tips: ["Check expertise depth", "Verify industry language"] },
      retry: { title: "Refine Your Approach", description: "Strengthen the persona details.", tips: ["Add specific achievements", "Include company details"] }
    },
    aiPartner: { name: "The Executive", personality: "strategic, visionary", description: "A seasoned marketing leader" },
    skillBadge: { name: "Persona Pilot", description: "Expert in role-based prompting", icon: "UserCog" },
    estimatedTime: "8-12 min",
    xpReward: 150
  },
  {
    id: 5,
    title: "Show Your Work",
    description: "Get AI to explain its reasoning, not just give answers.",
    difficulty: 3,
    difficultyLabel: "Medium",
    objective: "Learn chain of thought prompting",
    skill: "Requesting step-by-step reasoning",
    problem: "Get a math solution with full explanation",
    setup: "You need to understand how to solve a problem, not just the answer...",
    phases: {
      setup: { title: "Mission Briefing", description: "Chain of thought improves accuracy and learning.", tips: ["Ask for reasoning explicitly", "Request step numbering", "Ask to show assumptions"] },
      attempt: { title: "Draft Your Prompt", description: "Ask for a problem solved with explanation.", tips: ["Use 'explain step by step'", "Request each step numbered", "Ask to justify choices"] },
      feedback: { title: "The Teacher's Review", description: "Did you get clear reasoning?", tips: ["Check logical flow", "Verify all steps shown"] },
      retry: { title: "Refine Your Approach", description: "Add reasoning instructions.", tips: ["Specify detail level", "Request analogies"] }
    },
    aiPartner: { name: "The Teacher", personality: "patient, methodical", description: "An educational expert" },
    skillBadge: { name: "Thought Leader", description: "Master of reasoning prompts", icon: "Brain" },
    estimatedTime: "7-10 min",
    xpReward: 150
  },
  {
    id: 6,
    title: "Resume Bullet Perfection",
    description: "Transform bland job descriptions into powerful achievement statements.",
    difficulty: 2,
    difficultyLabel: "Easy",
    objective: "Learn iterative refinement",
    skill: "Improving through multiple attempts",
    problem: "Turn a weak resume bullet into a strong one",
    setup: "You have a basic job description that needs impact...",
    phases: {
      setup: { title: "Mission Briefing", description: "Iteration beats perfection on the first try.", tips: ["Start with what you have", "Identify what's missing", "Request specific improvements"] },
      attempt: { title: "Draft Your Prompt", description: "Get an initial resume bullet.", tips: ["Provide original text", "Mention desired length", "Specify industry"] },
      feedback: { title: "The Coach's Review", description: "What can be improved?", tips: ["Check for metrics", "Verify action verbs"] },
      retry: { title: "Refine Your Approach", description: "Iterate with specific feedback.", tips: ["Ask for quantification", "Request stronger verbs"] }
    },
    aiPartner: { name: "The Coach", personality: "encouraging, practical", description: "A career development expert" },
    skillBadge: { name: "Iteration Champion", description: "Master of progressive refinement", icon: "RefreshCw" },
    estimatedTime: "6-9 min",
    xpReward: 100
  },
  {
    id: 7,
    title: "Weekend Warrior Planner",
    description: "Create a multi-step itinerary for the perfect weekend adventure.",
    difficulty: 4,
    difficultyLabel: "Hard",
    objective: "Learn multi-step prompting",
    skill: "Breaking complex tasks into steps",
    problem: "Plan a full weekend trip with multiple activities",
    setup: "You have 48 hours and want to maximize your weekend...",
    phases: {
      setup: { title: "Mission Briefing", description: "Complex tasks need step-by-step planning.", tips: ["Break into phases", "Set priorities", "Allow for flexibility"] },
      attempt: { title: "Draft Your Prompt", description: "Request a structured weekend plan.", tips: ["List constraints first", "Request timeline format", "Ask for backup options"] },
      feedback: { title: "The Planner's Review", description: "Is your plan comprehensive?", tips: ["Check time allocation", "Verify logistics"] },
      retry: { title: "Refine Your Approach", description: "Add more structure to your request.", tips: ["Request specific formats", "Add budget constraints"] }
    },
    aiPartner: { name: "The Planner", personality: "organized, adventurous", description: "A travel and logistics expert" },
    skillBadge: { name: "Step Master", description: "Expert in multi-step planning", icon: "Layers" },
    estimatedTime: "10-15 min",
    xpReward: 200
  },
  {
    id: 8,
    title: "Storyteller's Voice",
    description: "Craft a compelling short story with a distinct narrative voice.",
    difficulty: 3,
    difficultyLabel: "Medium",
    objective: "Learn creative style prompting",
    skill: "Controlling creative output style",
    problem: "Write a story in a specific author's style",
    setup: "You want to write fiction that captures a particular voice...",
    phases: {
      setup: { title: "Mission Briefing", description: "Style prompts unlock creative possibilities.", tips: ["Name specific authors", "Describe stylistic elements", "Set mood and tone"] },
      attempt: { title: "Draft Your Prompt", description: "Request a story in a specific style.", tips: ["Reference famous works", "Describe narrative voice", "Set story constraints"] },
      feedback: { title: "The Author's Review", description: "Did you capture the voice?", tips: ["Check style elements", "Verify consistency"] },
      retry: { title: "Refine Your Approach", description: "Deepen your style specification.", tips: ["Add genre constraints", "Request specific techniques"] }
    },
    aiPartner: { name: "The Author", personality: "creative, literary", description: "A fiction writing expert" },
    skillBadge: { name: "Voice Virtuoso", description: "Master of stylistic control", icon: "Feather" },
    estimatedTime: "8-12 min",
    xpReward: 150
  },
  {
    id: 9,
    title: "Spreadsheet Detective",
    description: "Analyze data patterns and extract actionable insights from a dataset.",
    difficulty: 4,
    difficultyLabel: "Hard",
    objective: "Learn analysis prompting",
    skill: "Getting insights from data",
    problem: "Analyze sales data to find trends",
    setup: "You have raw sales figures that need interpretation...",
    phases: {
      setup: { title: "Mission Briefing", description: "Data analysis requires structured requests.", tips: ["Define the data format", "State your questions", "Request visual descriptions"] },
      attempt: { title: "Draft Your Prompt", description: "Ask for analysis of sample data.", tips: ["Provide data sample", "Ask specific questions", "Request recommendations"] },
      feedback: { title: "The Analyst's Review", description: "How thorough is your analysis?", tips: ["Check for patterns", "Verify actionable insights"] },
      retry: { title: "Refine Your Approach", description: "Add analysis depth requirements.", tips: ["Request comparisons", "Ask for predictions"] }
    },
    aiPartner: { name: "The Analyst", personality: "analytical, thorough", description: "A data science expert" },
    skillBadge: { name: "Data Decoder", description: "Expert in analytical prompting", icon: "BarChart" },
    estimatedTime: "10-14 min",
    xpReward: 200
  },
  {
    id: 10,
    title: "The Tricky Conversation",
    description: "Navigate sensitive topics with carefully crafted, ethical communication.",
    difficulty: 4,
    difficultyLabel: "Hard",
    objective: "Learn ethical boundary setting",
    skill: "Navigating sensitive content safely",
    problem: "Address a difficult workplace conflict",
    setup: "You need to handle a sensitive situation diplomatically...",
    phases: {
      setup: { title: "Mission Briefing", description: "Ethical prompting protects everyone involved.", tips: ["State your values", "Request neutral language", "Ask for multiple approaches"] },
      attempt: { title: "Draft Your Prompt", description: "Request help with a sensitive conversation.", tips: ["Provide context carefully", "Request diplomatic framing", "Ask for options"] },
      feedback: { title: "The Counselor's Review", description: "Did you handle this ethically?", tips: ["Check for sensitivity", "Verify constructive approach"] },
      retry: { title: "Refine Your Approach", description: "Adjust for ethical considerations.", tips: ["Add context about relationships", "Request win-win solutions"] }
    },
    aiPartner: { name: "The Counselor", personality: "empathetic, wise", description: "A conflict resolution expert" },
    skillBadge: { name: "Ethics Guardian", description: "Master of responsible prompting", icon: "Shield" },
    estimatedTime: "10-15 min",
    xpReward: 250
  }
];

export const getMissionById = (id) => missions.find(m => m.id === id);
export const getAllMissions = () => missions;
