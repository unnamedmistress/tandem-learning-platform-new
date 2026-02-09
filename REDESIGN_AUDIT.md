# TANDEM Platform - Complete Redesign Audit

## Landing Page Issues

### Layout Problems
1. **Everything in a column** - Feature cards (6 Practice Classes, 4 AI Personalities, ∞ Skill Tokens) are stacked vertically on mobile but should use flexbox/grid even on mobile
2. **No visual hierarchy** - All elements have similar weight
3. **Too much vertical scrolling** - Content is unnecessarily stretched
4. **Feature cards are too small** - Hard to tap on mobile

### Navigation Issues
1. **Navigation appears twice** - Once at top (persistent) and elements scattered throughout
2. **No clear hierarchy** - Navigation items blend with background
3. **CTA button gets lost** - "Enter The Dojo" button doesn't stand out enough

### Proposed Fixes
- Use CSS Grid for feature cards (responsive: 1 col mobile, 3 col desktop)
- Improve visual hierarchy with better spacing and sizing
- Make CTA button more prominent
- Simplify navigation structure

## Classes Page Issues
(To be documented after navigation)

## Lesson Pages Issues
(To be documented after navigation)

## Profile Page Issues
(To be documented after navigation)

## Challenges Page Issues
(To be documented after navigation)


## Classes Page Issues - CRITICAL

### Major Layout Problems
1. **ALL CLASSES IN A SINGLE COLUMN** - This is the main issue! 
   - Only showing 2 classes visible (Create a Mobile App, Microsoft Copilot)
   - Should be a 2 or 3 column grid layout
   - Wastes horizontal space
   - Requires excessive scrolling

2. **Class cards are full-width** - Makes them look stretched and awkward

3. **No visual separation** - Cards blend together

4. **Poor information hierarchy** - Title, description, and progress all have similar weight

### Proposed Fixes for Classes Page
- **CSS Grid Layout**: 
  - Mobile: 1 column
  - Tablet: 2 columns  
  - Desktop: 3 columns
- **Compact card design** with better spacing
- **Clear visual hierarchy** in cards
- **Hover effects** for better interactivity
- **Progress indicators** more prominent


## UPDATE: Classes Page Actually Has Grid

After checking the code, the classes page DOES have a grid layout (`grid-cols-2 lg:grid-cols-3`), BUT:

1. **The "celestial orbs" design is confusing** - Users expect traditional cards, not animated orbs
2. **PathSelector component takes up too much space** - The "Choose Your Learning Style" section with Classes/Challenges tabs
3. **Too much vertical space** between elements
4. **The orbs are large** and require scrolling to see all classes

### Real Problem
The issue isn't lack of grid - it's that the design is too "artistic" and not functional enough. Need to:
- Replace celestial orbs with clean, modern cards
- Make PathSelector more compact
- Show more classes at once
- Better use of horizontal space
