# TANDEM Learning Platform - Fix Plan

## Critical Issues Identified

### 1. Missing Persistent Navigation Header
**Problem:** No persistent navigation menu across all pages to access:
- Home
- Classes
- Challenges
- Profile
- Settings

**Impact:** Users get stuck in specific sections with no easy way to navigate elsewhere

**Fix:** Create a persistent navigation header component that appears on all pages

### 2. Lesson Phase Navigation
**Problem:** While phase indicators (A, B, C, D) are visible, the navigation between phases may not be clear enough
**Impact:** Users may not understand how to progress through lesson phases

**Fix:** 
- Ensure clear "Continue to Phase B" style buttons
- Make phase indicators clickable (if appropriate)
- Add progress indication

### 3. Layout Consistency
**Problem:** Some pages may have inconsistent spacing, alignment, or responsive behavior

**Fix:** Review and standardize layout across all pages

## Implementation Plan

### Phase 1: Create Navigation Component
1. Create a Navigation component with links to:
   - Home (/)
   - Classes (/classes)
   - Challenges (/challenges)
   - Profile (/profile)
2. Add to root layout
3. Style to match the existing design system

### Phase 2: Fix Lesson Navigation
1. Review lesson page component
2. Ensure clear buttons for phase progression
3. Add "Next Lesson" button after completing Phase D

### Phase 3: Test All Navigation Flows
1. Test navigation from every page
2. Verify responsive behavior
3. Ensure no dead ends

## Files to Modify
- `app/layout.tsx` - Add navigation header
- `app/components/Navigation.tsx` - Create new component
- `app/lesson/[classId]/[lessonId]/page.tsx` - Improve phase navigation
