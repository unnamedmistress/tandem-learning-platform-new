# TANDEM Bold Redesign - "The Collaboration Dojo"

## Creative Vision
Transform TANDEM from a generic learning platform into an **immersive AI collaboration training dojo**. Users don't just "practice" — they enter a space where human and AI minds meet, represented visually through split interfaces, neural connections, and holographic achievements.

## Why This Is Bold
1. **Rejects friendly/corporate aesthetic** for something that demands attention
2. **Creates metaphorical UI** — dojo, mirror, constellation map instead of cards and lists
3. **Gamifies without being childish** — sophisticated, cyber-aesthetic progression
4. **Makes the invisible visible** — AI collaboration becomes a tangible visual experience

## Color System

### Primary Palette (Neon Cyber)
- **Background Deep**: #0A0A0F (void black)
- **Background Panel**: #12121A (elevated surfaces)
- **Accent Human**: #00F0FF (cyan — represents human creativity)
- **Accent AI**: #FF006E (magenta — represents AI presence)
- **Accent Fusion**: #B829DD (purple — when human + AI collaborate)
- **Success**: #39FF14 (neon green — achievements)
- **Text Primary**: #FFFFFF
- **Text Secondary**: #8B8B9E

### Gradient Definitions
```css
--gradient-human: linear-gradient(135deg, #00F0FF 0%, #00D4FF 100%);
--gradient-ai: linear-gradient(135deg, #FF006E 0%, #FF4D9E 100%);
--gradient-fusion: linear-gradient(135deg, #00F0FF 0%, #B829DD 50%, #FF006E 100%);
--gradient-void: radial-gradient(ellipse at center, #12121A 0%, #0A0A0F 100%);
```

## Typography
- **Display**: "Space Grotesk" — geometric, futuristic
- **Body**: "Inter" — keep for readability
- **Mono**: "JetBrains Mono" — for code/AI outputs

## Core Visual Metaphors

### 1. The Split Interface
Every screen has a visual division:
- **Left/Top**: Human side (cyan accents)
- **Right/Bottom**: AI side (magenta accents)
- **Center**: The collaboration point (purple fusion)

### 2. The Mirror (Reflection Phase)
Instead of text-based reflection, create an actual "mirror" component:
- Circular mirror frame with animated border
- Shows user's interaction patterns as constellations
- "Mirror reveals your AI collaboration style"

### 3. Neural Connection Animation
During chat, animated SVG lines connect human input to AI response:
- Lines pulse with data packets
- Visual representation of "thought flow"
- Bezier curves showing the "dance" of collaboration

### 4. Holographic Skill Tokens
- 3D tilt-effect cards
- Holographic shimmer animation
- Each token is a collectible artifact
- Glows when earned with particle burst

### 5. Constellation Progress Map
Instead of progress bars, show user's journey as a constellation:
- Each lesson is a star
- Completed lessons glow and connect with lines
- Your "AI collaboration galaxy" grows over time

## Key Screens Redesign

### Landing Page — "The Gateway"
- Full-screen immersive experience
- Central "Enter the Dojo" CTA with pulsing fusion gradient
- Background: subtle animated neural network
- No container constraints — full bleed

### Onboarding — "The Initiation"
Step 1: **The Problem** — User enters their problem into a "human input field" (cyan glow)
Step 2: **The Encounter** — Split screen shows user's problem on left, AI responds on right
Step 3: **The Dance** — Neural connection animation shows collaboration happening
Step 4: **The Mirror** — Circular mirror reveals user's collaboration pattern
Step 5: **The Path** — User sees their first constellation forming

### AI Chat — "The Collaboration Space"
- Split-screen layout
- Left: User messages with cyan accents
- Right: AI messages with magenta accents
- Center: Animated neural bridge
- Bottom: Input field with "transmit" button (not "send")

### Classes — "The Training Halls"
- No card grid — instead, floating orbs/planets
- Each class is a celestial body
- Hover: orbit rings appear
- Click: zoom into constellation view

### Skill Tokens — "The Artifacts"
- Full-screen collection view
- Tokens arranged in 3D space
- Each token has unique holographic pattern
- Click to inspect — rotates with tilt effect

## Animation Philosophy
- **Micro**: 150-300ms for interactions
- **Macro**: 800-1200ms for scene transitions
- **Ambient**: Infinite subtle movement (floating, pulsing)
- **Easing**: Use `cubic-bezier(0.4, 0, 0.2, 1)` for smooth tech feel

## Components Needed

### NeuralConnector
Animated SVG component showing connection between human and AI:
```
Props: intensity (low/medium/high), state (idle/active/pulsing)
```

### HolographicCard
3D tilt card with holographic sheen effect for skill tokens.

### MirrorFrame
Circular frame with animated border for reflection phase.

### ConstellationMap
SVG-based progress visualization connecting lesson nodes.

### SplitContainer
Layout wrapper maintaining human/AI visual separation.

## Accessibility (Maintained)
- All animations respect `prefers-reduced-motion`
- Color contrast maintained despite neons (cyan/magenta on dark)
- Focus states use bright cyan glow
- Keyboard navigation fully supported

## Implementation Notes
- Use CSS 3D transforms for holographic effects
- GSAP or Framer Motion for neural animations
- Canvas or SVG for constellation backgrounds
- CSS custom properties for theme consistency
