# TANDEM Studio Beast Redesign - Changelog

## [2.0.0] - 2026-02-09

### Design System
- **Visual Direction**: Adopted "Friendly & Engaging" design system
  - Primary: #F2994A (warm orange)
  - Secondary: #6FCF97 (fresh green)
  - Background: #F2F2F2 (light gray)
  - Text: #333333 (dark gray)
- **Typography**: Rounded, approachable font styling
- **Focus States**: Orange border glow with 3px offset

### New Components
- **SkillToken** - Animated achievement badges with glow effect
- **AIPersonalitySelector** - Switch between AI personas (Skeptic, Optimist, Literalist, Connector)
- **EnhancedOnboardingFlow** - Dynamic onboarding based on user choices
- **ChatBubble** - Updated warm visual style for conversations

### Accessibility (WCAG 2.1 Level AA)
- Visible focus states on all interactive elements
- Keyboard navigation support throughout
- ARIA labels on buttons and selectors
- Reduced motion support (`prefers-reduced-motion`)
- Color contrast ratios meet AA standards

### Bug Fixes
- Fixed TypeScript null checks in dynamic routes
- Fixed Tailwind CSS v4 configuration
- Fixed Navigation pathname null handling

### Documentation
- PRD.md - Product requirements with 3 pivots, 10 acceptance criteria
- UX_FLOWS.md - User journeys with 15+ edge cases
- UI_DESIGN.md - Visual system specifications
- ACCESSIBILITY_BASELINE.md - WCAG 2.1 AA compliance checklist
- BUILD_PLAN.md - 15 implementation tasks, 12 e2e scenarios

## Build
- Next.js 16.1.6
- Tailwind CSS v4
- React 19
- TypeScript strict mode
