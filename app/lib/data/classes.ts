import { Class } from "../types";

export const classes: Class[] = [
  {
    id: "mobile-app",
    title: "Create a Mobile App",
    theme: "Maker Energy",
    icon: "📱",
    description: "From idea to prototype by learning to direct, not delegate. Build something real while developing precision in intent.",
    problemStatement: "You have an app idea but no coding experience. How do you work with AI to build something real without losing ownership of your vision?",
    mindset: "Maker energy, slightly chaotic, hands-on. Embrace the happy accidents.",
    colorScheme: {
      primary: "violet",
      secondary: "purple",
      accent: "violet-500",
      gradient: "from-violet-500 to-purple-600",
    },
    lessons: [
      {
        id: "mobile-1",
        classId: "mobile-app",
        title: "The Feature That Isn't Yours",
        order: 1,
        description: "AI suggests features you didn't ask for. You realize you've been vague.",
        phases: {
          a: {
            contextQuestions: ["What app are you trying to build?", "What problem does it solve?", "Who is it for?"],
            aiOpening: "Tell me about your app idea. What problem are you trying to solve?",
          },
          b: {
            challengeDescription: "Try describing your app to AI—notice where you're vague and where AI makes assumptions.",
            aiBehaviorHints: ["I'll help you build this! Here's a complete implementation with user authentication, analytics, notifications..."],
            expectedFriction: ["AI adds features you didn't ask for", "You accept them without thinking", "The scope keeps expanding"],
          },
          c: {
            reflectionPrompts: ["Where did you stop directing and start accepting?", "What features did AI add that you didn't want?"],
            alternativeApproaches: ["Be explicit: 'Just the core feature, no extras'", "Ask: 'Is this essential for MVP?'", "Set boundaries: 'I only want X, ignore everything else'"],
            patternToSurface: "accepted_first",
          },
          d: {
            retryContext: "Now try again with clearer intent. Be specific about what you want and don't want.",
            skillFocus: "Precision in intent",
            deeperQuestion: "How do you balance being specific with staying open to good suggestions?",
          },
        },
      },
      {
        id: "mobile-2",
        classId: "mobile-app",
        title: "The Happy Accident",
        order: 2,
        description: "AI generates something surprisingly useful you didn't plan for.",
        phases: {
          a: {
            contextQuestions: ["What have you built so far?", "What feels clunky or missing?"],
            aiOpening: "Let's look at what you have. What's feeling clunky or missing?",
          },
          b: {
            challengeDescription: "AI surfaces unexpected directions. Practice evaluating 'is this better than my idea?'",
            aiBehaviorHints: ["I noticed something while generating this. What if we approached it differently?"],
            expectedFriction: ["AI goes in an unexpected direction", "It's actually better than your plan", "You feel conflicted about abandoning your idea"],
          },
          c: {
            reflectionPrompts: ["When did AI surprise you?", "What made you accept or reject the surprise?"],
            alternativeApproaches: ["Evaluate: 'Is this better than my idea or just different?'", "Test both approaches", "Keep your goal, be flexible on method"],
            patternToSurface: "asked_clarifying",
          },
          d: {
            retryContext: "Try the conversation again, but this time actively look for unexpected directions.",
            skillFocus: "Openness to surprise",
            deeperQuestion: "When should you stick to your plan vs follow AI's unexpected suggestion?",
          },
        },
      },
      {
        id: "mobile-3",
        classId: "mobile-app",
        title: "The Broken Promise",
        order: 3,
        description: "Code works initially, then fails with edge cases.",
        phases: {
          a: {
            contextQuestions: ["What have you built so far?", "Where might it break?"],
            aiOpening: "Tell me about your implementation. Where do you think it might break?",
          },
          b: {
            challengeDescription: "AI confidently delivers code that has edge case bugs. Practice testing and specification.",
            aiBehaviorHints: ["Here's the complete solution. It handles all the standard cases perfectly."],
            expectedFriction: ["AI code works for the happy path", "Edge cases reveal bugs", "AI is confident even when wrong"],
          },
          c: {
            reflectionPrompts: ["What edge cases did you think of?", "How did you verify the code?"],
            alternativeApproaches: ["Test with edge cases before accepting", "Ask AI: 'What could break this?'", "Implement incremental testing"],
            patternToSurface: "verified_output",
          },
          d: {
            retryContext: "Now specify edge cases upfront and ask AI to handle them explicitly.",
            skillFocus: "Skepticism and verification",
            deeperQuestion: "How do you balance trust with verification without becoming paranoid?",
          },
        },
      },
      {
        id: "mobile-4",
        classId: "mobile-app",
        title: "The Handoff",
        order: 4,
        description: "You've built something—now can someone else use it?",
        phases: {
          a: {
            contextQuestions: ["What have you built?", "Who else needs to understand or use it?"],
            aiOpening: "What have you built? Who else needs to understand or use it?",
          },
          b: {
            challengeDescription: "AI plays confused user while you refine instructions. Practice clarity for others.",
            aiBehaviorHints: ["I tried to use your app but I'm confused about... Can you explain how to..."],
            expectedFriction: ["Your instructions make sense to you but not others", "AI 'user' gets stuck in unexpected places", "You assume knowledge the user doesn't have"],
          },
          c: {
            reflectionPrompts: ["Where did the 'user' get confused?", "What did you assume they knew?"],
            alternativeApproaches: ["Write for a complete beginner", "Test instructions with AI as naive user", "Focus on outcomes, not features"],
            patternToSurface: "asked_clarifying",
          },
          d: {
            retryContext: "Create documentation or instructions that a beginner could follow.",
            skillFocus: "Clarity for others",
            deeperQuestion: "How do you know when your instructions are clear enough?",
          },
        },
      },
    ],
  },
  {
    id: "copilot-students",
    title: "Microsoft Copilot for Students",
    theme: "Academic Integrity",
    icon: "🎓",
    description: "Academic power without cheating yourself. Learn to use AI to learn better without outsourcing your thinking.",
    problemStatement: "Copilot can write papers, solve problems, generate ideas—but how do you use it to learn better without outsourcing your thinking?",
    mindset: "Curious, slightly rebellious, intellectually honest",
    colorScheme: {
      primary: "blue",
      secondary: "cyan",
      accent: "blue-500",
      gradient: "from-blue-500 to-cyan-600",
    },
    lessons: [
      {
        id: "copilot-1",
        classId: "copilot-students",
        title: "The Spark, Not The Fire",
        order: 1,
        description: "You need paper ideas; Copilot gives you finished thoughts.",
        phases: {
          a: {
            contextQuestions: ["What topic are you exploring?", "What angle interests you?"],
            aiOpening: "What are you trying to write about? What's the assignment?",
          },
          b: {
            challengeDescription: "AI generates 20 mediocre ideas. Practice finding the one seed worth developing yourself.",
            aiBehaviorHints: ["Here are 20 essay topics on your subject. I've ranked them by academic rigor..."],
            expectedFriction: ["Ideas are generic and safe", "None of them feel like 'yours'", "Temptation to just pick one and be done"],
          },
          c: {
            reflectionPrompts: ["Which idea had potential?", "What made you reject the others?"],
            alternativeApproaches: ["Use AI for quantity, you filter for quality", "Combine fragments from multiple ideas", "Reject all and generate your own using AI's as contrast"],
            patternToSurface: "gave_up_early",
          },
          d: {
            retryContext: "Generate many ideas quickly, then develop one yourself.",
            skillFocus: "Using AI for ignition, not destination",
            deeperQuestion: "Where's the line between inspiration and outsourcing?",
          },
        },
      },
      {
        id: "copilot-2",
        classId: "copilot-students",
        title: "The Counterargument You Didn't Think Of",
        order: 2,
        description: "Your essay has holes you can't see.",
        phases: {
          a: {
            contextQuestions: ["What's your thesis?", "What evidence do you have?"],
            aiOpening: "What's your thesis? Let me help you strengthen your argument.",
          },
          b: {
            challengeDescription: "AI plays devil's advocate, poking at your reasoning.",
            aiBehaviorHints: ["Your argument has some gaps. Have you considered..."],
            expectedFriction: ["AI finds weaknesses you didn't see", "It's uncomfortable to hear", "Your confidence is shaken"],
          },
          c: {
            reflectionPrompts: ["What holes did AI find?", "Which criticisms were valid?"],
            alternativeApproaches: ["Ask for counterarguments explicitly", "Welcome critique as strengthening", "Address weaknesses head-on"],
            patternToSurface: "noticed_inconsistency",
          },
          d: {
            retryContext: "Ask AI to stress-test your argument, then strengthen the weak points.",
            skillFocus: "Stress-testing reasoning",
            deeperQuestion: "How do you know when criticism is valid vs nitpicky?",
          },
        },
      },
      {
        id: "copilot-3",
        classId: "copilot-students",
        title: "The Explanation Test",
        order: 3,
        description: "Can you explain Copilot's answer in your own words?",
        phases: {
          a: {
            contextQuestions: ["What concept are you trying to understand?", "Where are you stuck?"],
            aiOpening: "What concept are you struggling with? Let me explain it.",
          },
          b: {
            challengeDescription: "AI generates solutions; you must translate and teach back—AI detects when you're parroting.",
            aiBehaviorHints: ["Here's the explanation. Try explaining it back to me in your own words."],
            expectedFriction: ["You think you understand but can't explain", "You parrot AI's language", "True gaps in understanding revealed"],
          },
          c: {
            reflectionPrompts: ["Where did you get stuck explaining?", "What did you realize you didn't understand?"],
            alternativeApproaches: ["Explain out loud without looking", "Use analogies from your own experience", "Ask 'why' three levels deep"],
            patternToSurface: "asked_clarifying",
          },
          d: {
            retryContext: "Try explaining the concept to AI as if teaching a beginner.",
            skillFocus: "True understanding vs surface knowledge",
            deeperQuestion: "How do you know when you truly understand something?",
          },
        },
      },
      {
        id: "copilot-4",
        classId: "copilot-students",
        title: "The Line",
        order: 4,
        description: "Where's your contribution if AI did the heavy lifting?",
        phases: {
          a: {
            contextQuestions: ["What have you created with AI help?", "What parts are truly yours?"],
            aiOpening: "Let's look at something you've created with AI assistance. Where's your contribution?",
          },
          b: {
            challengeDescription: "AI helps audit your joint work—what's yours, what's assisted.",
            aiBehaviorHints: ["Let's trace through this work. Which parts came from you vs from me?"],
            expectedFriction: ["Hard to separate your input from AI's", "Uncomfortable realizations", "Ethical gray areas"],
          },
          c: {
            reflectionPrompts: ["What would this be without AI?", "What did you add that was uniquely yours?"],
            alternativeApproaches: ["Be explicit about AI assistance", "Focus on your value-add", "Develop your own voice alongside AI"],
            patternToSurface: "verified_output",
          },
          d: {
            retryContext: "Create a policy for yourself about AI use in your work.",
            skillFocus: "Ethical self-assessment",
            deeperQuestion: "What does authentic learning look like in an AI-assisted world?",
          },
        },
      },
    ],
  },
  // More classes will be added - Business Problems, Prompting, Research, and Literacy
];

// Export individual classes for convenience
export const mobileAppClass = classes[0];
export const copilotStudentsClass = classes[1];
