# Accessibility Baseline - WCAG 2.1 Level AA Compliance

## Keyboard Navigation Requirements

### Onboarding Flow
- **Choose Problem:** Arrow keys to navigate, Enter to select.
- **AI Chat:** Tab to navigate through chat bubbles, Shift + Tab to return.
- **Reflection:** Ensure accessibility to all focusable elements.

### Class Selection Flow
- **Browse Classes:** Tab and arrow keys for navigation.
- **Select Class:** Enter to select a class.
- **Enter Classroom:** Access via keyboard shortcuts.

### AI Chat Flow
- **Choose AI:** Navigate with arrow keys, Enter to confirm.
- **Begin Interaction:** Support for keyboard navigation in the conversation.
- **Problem Solving:** Tab through problem-solving steps.

### Reflection Flow
- **Write Reflection:** Keyboard accessible text inputs.
- **Save Reflection:** Enter to save.

### Skill Tokens Flow
- **Earn Token:** Keyboard navigation with visual feedback.
- **Redeem Token:** Navigate with Tab and Enter.

## Focus State Specifications
- All focusable elements must have a visible focus state — border glow or underline as specified.

## Color Contrast Checks
- Text contrast is 4.5:1
- UI elements contrast is 3:1
- Verify color combinations: Primary #F2994A (orange), Secondary #6FCF97 (green), Text #333333 (dark gray)

## ARIA Requirements
- Descriptive ARIA labels for all interactive components.
- Use ARIA roles to define UI elements.

## Screen Reader Considerations
- Ensure all textual feedback is accessible by screen readers.
- Chat bubbles should be readable sequentially.

## Motion/Animation Guidelines
- Avoid triggering animations for users with motion sensitivity.
- Provide options to disable animations.

## Testing Checklist
- [ ] Verify keyboard navigation for each flow.
- [ ] Test color contrast with color contrast tools.
- [ ] Check focus visibility on all focusable elements.
- [ ] Validate ARIA roles and labels.
- [ ] Screen reader testing across the platform.
- [ ] Motion sensitivity testing and options to disable.