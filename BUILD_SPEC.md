# TANDEM Learning Platform - Build Specification

## Project Overview
TANDEM is a practice-based AI collaboration learning platform.

## Tech Stack
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui components
- LocalStorage for persistence
- Static export configuration

## Core Features
1. Landing/Onboarding (15-minute flow)
2. 6 Classes with distinct themes
3. Practice Arc (4-phase lessons)
4. AI Chat with personality switching
5. Challenge Board
6. User Profile with Skill Tokens + Uncertainty Log

## Build Commands
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias="@/*" --use-npm --yes
npx shadcn@latest init --yes --base-color neutral
npx shadcn add button card input textarea dialog badge avatar tabs scroll-area separator tooltip dropdown-menu
```

## Directory Structure
```
app/
├── page.tsx              # Landing/onboarding
├── layout.tsx            # Root layout
├── classes/page.tsx      # Class selection
├── class/[id]/page.tsx   # Class detail
├── lesson/[class]/[lesson]/page.tsx  # Interactive lesson
├── challenges/page.tsx   # Challenge Board
├── profile/page.tsx      # User profile
├── layout/Navigation.tsx
├── components/
│   ├── AIChat.tsx
│   ├── PracticeArc.tsx
│   ├── PhaseA.tsx, PhaseB.tsx, PhaseC.tsx, PhaseD.tsx
│   ├── ClassCard.tsx, LessonCard.tsx, ChallengeCard.tsx
│   ├── SkillToken.tsx, UncertaintyLogger.tsx
│   ├── PersonalitySelector.tsx, MirrorView.tsx, DepthMarker.tsx
│   └── OnboardingFlow.tsx
└── lib/
    ├── data/
    │   ├── classes.ts
    │   ├── aiPersonalities.ts
    │   ├── challenges.ts
    │   └── aiResponses.ts
    ├── hooks/
    │   ├── useUser.ts
    │   ├── useLesson.ts
    │   └── useAI.ts
    └── types.ts
components/ui/          # shadcn components
```

## Acceptance Criteria
- [ ] 15-minute onboarding works without instructions
- [ ] 6 classes with distinct visual themes
- [ ] 4-phase lesson structure (A→B→C→D)
- [ ] AI chat with 4 personality modes
- [ ] Challenge Board with voting
- [ ] Skill Tokens based on interactions
- [ ] Uncertainty Log captures reflections
- [ ] Progress persists across sessions
- [ ] No "training" language or corporate vibes
