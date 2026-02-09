# TANDEM Platform - New Interaction Model Design

## Based on Comprehensive Feedback Analysis

### Critical Problems to Solve

1. **AI Personalities Hidden** → Users never encounter them
2. **No Lesson Preview** → Can't visualize success
3. **Classes vs Challenges Confusion** → Semantic difference unclear
4. **No Goal Setting** → Generic experience
5. **Onboarding Gap** → Unclear what happens next
6. **No Pricing Transparency** → Trust issue

---

## New Interaction Flow

### Entry Points (3 Distinct Paths)

```
┌─────────────────────────────────────────────────────────────┐
│                    LANDING PAGE                             │
│                                                             │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│   │   "I'm New   │  │  "I Have a   │  │ "Show Me     │     │
│   │   to AI"     │  │   Problem"   │  │  Examples"   │     │
│   └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│          │                 │                  │             │
│          ▼                 ▼                  ▼             │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│   │  ONBOARDING  │  │  CHALLENGE   │  │   GALLERY    │     │
│   │    FLOW      │  │   BOARD      │  │   PREVIEW    │     │
│   │  (guided)    │  │  (direct)    │  │  (examples)  │     │
│   └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### New Onboarding Flow (5 Steps)

```
STEP 1: Welcome + Goal Setting
├── "What brings you to TANDEM?"
├── Options:
│   ├── "I want to write better AI prompts" 
│   ├── "I need help with my actual work"
│   ├── "I'm curious about AI collaboration"
│   └── "I want to level up my career"
└── Stores: userGoal, userRole (optional)

STEP 2: AI Personalities Introduction
├── "Meet Your AI Training Partners"
├── Interactive cards for each personality:
│   ├── 🧠 Mentor - Patient, encouraging, asks questions
│   ├── 🔬 Analyst - Data-driven, precise, challenges assumptions
│   ├── 🎨 Creative - Imaginative, pushes boundaries, brainstorms
│   └── ⚡ Pragmatist - Direct, efficient, focused on results
└── User selects one (can change later)

STEP 3: The Learning Loop Demo
├── Interactive walkthrough:
│   ├── "You bring a real problem"
│   ├── "AI analyzes your approach"
│   ├── "Mirror shows patterns in how you work"
│   └── "You collect artifacts that prove growth"
└── Shows actual UI, not just text

STEP 4: Preview a Lesson
├── "See what a complete lesson looks like"
├── Shows anonymized example:
│   ├── Original problem
│   ├── User's first attempt
│   ├── AI feedback (Mirror)
│   ├── Improved second attempt
│   └── Earned Skill Token
└── "This could be YOUR artifact"

STEP 5: Choose Your Path
├── Based on goal from Step 1:
│   ├── Recommended Class
│   ├── Relevant Challenge
│   └── "Browse all options"
└── Personalized dashboard preview
```

### New Navigation Structure

```
┌────────────────────────────────────────────────────────────┐
│  🧠 TANDEM    [Free During Beta]                           │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  🎯 YOUR GOAL                                               │
│  "Master workplace prompts"                                 │
│  [Edit goal]                                                │
│                                                             │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  📚 CLASSES (structured courses)                           │
│  ┌─────────────────────────────────────────┐               │
│  │ For your goal: "Write Better Emails"    │               │
│  │ [Start Class]                           │               │
│  └─────────────────────────────────────────┘               │
│                                                             │
│  🎯 CHALLENGES (real problems)                             │
│  ┌─────────────────────────────────────────┐               │
│  │ From your industry: Product Management │               │
│  │ [Browse 12 challenges]                  │               │
│  └─────────────────────────────────────────┘               │
│                                                             │
├────────────────────────────────────────────────────────────┤
│  🤖 YOUR AI PARTNER                                         │
│  ┌─────────────────────────────────────────┐               │
│  │ 🧠 Mentor - "Encouraging & patient"    │               │
│  │ [Change Personality]                    │               │
│  └─────────────────────────────────────────┘               │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

## Component Designs

### 1. Goal Setter Modal

```
┌────────────────────────────────────────┐
│  Welcome to Your AI Training Dojo      │
│                                        │
│  What's your #1 goal right now?        │
│                                        │
│  [🔴] Write better prompts             │
│       "Get more useful AI responses"   │
│                                        │
│  [⚪] Solve work problems              │
│       "Apply AI to my actual job"      │
│                                        │
│  [⚪] Learn systematically             │
│       "Build skills from fundamentals" │
│                                        │
│  [⚪] Level up my career               │
│       "Stand out with AI fluency"      │
│                                        │
│  [Continue →]                          │
└────────────────────────────────────────┘
```

### 2. AI Personality Selector

```
┌────────────────────────────────────────────────────────────┐
│  Choose Your AI Training Partner                           │
│                                                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │   🧠     │  │   🔬     │  │   🎨     │  │   ⚡     │  │
│  │  Mentor  │  │  Analyst │  │ Creative │  │Pragmatist│  │
│  │          │  │          │  │          │  │          │  │
│  │"I guide │  │"I push  │  │"I spark │  │"I get   │  │
│  │ you to  │  │ you to  │  │ creative│  │ you to  │  │
│  │ discover│  │ question│  │ ideas"  │  │ results │  │
│  │answers" │  │everything│  │         │  │ fast"   │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                            │
│  Try them all - you can switch anytime                     │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 3. Learning Loop Demo (Interactive)

```
┌────────────────────────────────────────────────────────────┐
│  How TANDEM Works (Interactive Demo)                       │
│                                                            │
│  Step 1: You bring a problem                               │
│  ┌──────────────────────────────────────┐                  │
│  │ "I need to summarize this meeting"   │                  │
│  └──────────────────────────────────────┘                  │
│                      ↓                                     │
│  Step 2: AI analyzes your approach                         │
│  ┌──────────────────────────────────────┐                  │
│  │ "I see you provided context...       │                  │
│  │  but forgot to specify format"       │                  │
│  └──────────────────────────────────────┘                  │
│                      ↓                                     │
│  Step 3: Mirror reflects your patterns                     │
│  ┌──────────────────────────────────────┐                  │
│  │ 🪞 "You tend to rush the context     │                  │
│  │     setting. Try being more specific │                  │
│  │     about desired output format."    │                  │
│  └──────────────────────────────────────┘                  │
│                      ↓                                     │
│  Step 4: You iterate & improve                             │
│  ┌──────────────────────────────────────┐                  │
│  │ "Summarize as bullet points,         │                  │
│  │  focus on action items, under 200    │                  │
│  │  words"                              │                  │
│  └──────────────────────────────────────┘                  │
│                      ↓                                     │
│  🏆 Earned: "Precision Intent" Skill Token                 │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 4. Lesson Preview Gallery

```
┌────────────────────────────────────────────────────────────┐
│  See What You'll Create                                    │
│                                                            │
│  Example Artifacts from Real Learners:                     │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🏆 "The Feature That Isn't Yours"                    │  │
│  │ Before: Vague request → AI hallucinated features     │  │
│  │ After: Precise context → AI delivered exactly        │  │
│  │ Learned: Context-setting, constraint specification   │  │
│  │ [View Full Lesson]                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🏆 "Meeting Summarizer"                              │  │
│  │ Before: "Summarize this" → Generic output            │  │
│  │ After: Role + Format + Constraints → Actionable      │  │
│  │ Learned: Role assignment, output formatting          │  │
│  │ [View Full Lesson]                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                            │
│  [Start Your First Lesson →]                               │
└────────────────────────────────────────────────────────────┘
```

### 5. Classes vs Clarity Comparison

```
┌────────────────────────────────────────────────────────────┐
│  Which Path Is Right For You?                              │
│                                                            │
│  CLASSES                          CHALLENGES               │
│  ─────────                        ──────────               │
│                                                            │
│  📚 Structured curriculum         🎯 Solve real problems   │
│                                                            │
│  4-6 lessons per class            Submit your own problem  │
│  Progressive difficulty           Community solutions      │
│  Skill tokens at milestones       Vote on best approaches  │
│                                                            │
│  Best for:                        Best for:                │
│  • Learning fundamentals          • Applying skills        │
│  • Building systematic skills     • Getting unstuck        │
│  • Completing a journey           • Contributing ideas     │
│                                                            │
│  [Browse Classes]                 [Browse Challenges]      │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## Implementation Priority

### Phase 1: Foundation (This Session)
1. ✅ Fix layout centering (DONE)
2. Update onboarding with Goal Setter (Step 1)
3. Add AI Personality selector to onboarding (Step 2)
4. Create Learning Loop demo component (Step 3)

### Phase 2: Engagement (Next)
5. Lesson Preview Gallery component
6. Classes vs Challenges clarity component
7. Personalized dashboard based on goal

### Phase 3: Polish
8. Navigation updates with goal display
9. AI Personality switching UI
10. Recommendation engine

---

## Technical Notes

- Use existing Framer Motion for animations
- Leverage current Tailwind setup
- Store userGoal in UserContext
- Store selectedPersonality in UserContext
- Create reusable DemoLesson component
- Update onboarding/page.tsx with new steps
