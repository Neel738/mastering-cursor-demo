# UI Requirements Document: Influencer Q&A Platform

## Apple Design Philosophy & Implementation

Apple's design principles are built on clarity, deference, and depth. Our platform will implement these core tenets in every aspect of the user interface:

### 1. Clarity
- **Content Primacy**: Like Apple, we'll let the content be the interface. Questions will be displayed prominently with minimal UI chrome.
- **Functional Minimalism**: Following Apple's iOS/macOS approach, we'll employ negative space strategically, not decoratively.
- **Intentional Hierarchy**: Typography, color, and layout will create clear visual hierarchies as seen in Apple Music and the App Store.
- **Purposeful Animation**: Animations will serve a function (like Apple's iOS app opening/closing animations) rather than being purely decorative.

### 2. Deference
- **Content-Forward Design**: UI elements will be understated, letting user content (questions, answers) take center stage.
- **Background Subtlety**: Background elements will use subtle blur effects similar to iOS Control Center, creating depth without distraction.
- **Translucency**: Strategic use of translucent elements like Apple's notifications to suggest hierarchy.
- **Intuitive Gestures**: Simple, discoverable gestures like Apple's swipe, pinch, and tap patterns.

### 3. Depth
- **Layering**: Interface layers will mimic Apple's depth model (background, content, foreground) to create functional hierarchy.
- **Contextual Transitions**: Animations between states will provide context, like Apple's app transitions.
- **Dimensionality**: Subtle shadows and lighting to create a sense of physical space without excessive skeuomorphism.

## Color Palette

### Primary Colors
- **White (#FFFFFF)**: Primary background, as seen in Apple Music and iOS settings
- **Off-White (#F5F5F7)**: Secondary background, matching Apple's website background
- **Dark Grey (#1D1D1F)**: Primary text, matching Apple's marketing text
- **Medium Grey (#86868B)**: Secondary text, matching Apple's secondary marketing text

### Accent Colors
- **Purple Gradient**: `linear-gradient(135deg, #8B5CF6, #D946EF)`
  - Starting color: #8B5CF6 (Purple)
  - Ending color: #D946EF (Pink-Purple)
  - Applied to:
    - Primary action buttons (with SF Symbol icons)
    - Focus states
    - Interactive elements
    - Abstract blob decorations (positioned like Apple's marketing page abstract shapes)

### System States
- **Success**: #34C759 (Apple's iOS success green)
- **Warning**: #FF9500 (Apple's iOS warning orange)
- **Error**: #FF3B30 (Apple's iOS error red)
- **Info**: #007AFF (Apple's iOS info blue)

## Typography

Following Apple's SF Pro system:

- **Primary Font**: SF Pro Display (fallback to Inter for web)
- **Weight Distribution**:
  - Headings: SF Pro Display Bold (700) 
  - Subheadings: SF Pro Display Semibold (600)
  - Body: SF Pro Text Regular (400)
  - UI Labels: SF Pro Text Medium (500)

- **Font Sizes** (Using Apple's incremental scale):
  - Large Title: 34px (Like iOS Large Title)
  - Title 1: 28px
  - Title 2: 22px
  - Title 3: 20px
  - Headline: 17px
  - Body: 17px
  - Callout: 16px
  - Subhead: 15px
  - Footnote: 13px
  - Caption: 12px

- **Letter Spacing**: -0.4px for headings (Apple's signature tight kerning)
- **Line Height**: 1.3× for headings, 1.5× for body text

## Components (Apple-Inspired)

### Buttons
- **Primary**: Purple gradient with white text, pill-shaped (8px radius)
- **Secondary**: Light grey with dark text (Apple's secondary buttons)
- **Tertiary**: Text-only with purple text (like Apple's text links)
- **Icon Buttons**: Simple, monochrome SF Symbols with consistent 24px sizing

### Input Fields
- Clean, single-line inputs with minimal borders
- Animated label transitions (moving from center to top when focused)
- Clear focus states with subtle animation
- Form validation with gentle animations and color shifts

### Cards
- Subtle rounding (8px radius, Apple's standard)
- Almost imperceptible shadows (2-4px blur, 1px y-offset, 5% opacity)
- White backgrounds with sufficient padding (16-24px)
- Content-first design with minimal decorative elements

### Dialog & Modals
- Center-positioned, simple animations
- Backdrop blur effect (like iOS dialogs)
- Focus on primary action
- Escape hatch (cancel) always available

## Visual Elements

### SF Symbols Integration
- Use of SF Symbols (or close web equivalents) for all iconography
- Monochrome with accent colors applied programmatically
- Consistent sizing and weight across the application
- Semantic meaning preserved (same icons for same actions)

### Abstract Blobs
- Purple gradient blobs as subtle background elements
- Positioned asymmetrically in corners (like Apple's marketing pages)
- Very low opacity (8-15%)
- Soft, organic shapes with subtle animation
- Never interfering with content legibility

### Microinteractions
- Subtle scale changes on hover (102-105%)
- Smooth opacity transitions (200-300ms)
- Gentle transforms on state changes
- Button press animations (slight scale reduction)

## Page-Specific Design

### Landing Page
- Hero section with centered headline and subheadline (Apple.com style)
- Generous white space
- Single, focused call-to-action
- Abstract gradient blob positioned in top-right corner
- Product visualization with clean mockup

### Influencer Dashboard
- Clean, grid-based layout (12-column structure)
- Stat cards with large, prominent numbers (Apple Health style)
- Question cards with consistent spacing and minimal decoration
- Monochromatic UI with purple accent for interactive elements
- Status indicators using small color dots rather than badges

### Question Submission Page
- Distraction-free form layout
- Large, clear input fields
- Subtle animations for form progression
- Success state with gentle animation
- Absolute minimum required fields

## Responsive Approach
- **Mobile-First Design**: Optimized for iPhone-like experiences first
- **Adaptive Layout**: Content reorganization at breakpoints rather than just scaling
- **Touch-Friendly Targets**: Minimum 44×44px touch targets (Apple's guideline)
- **Device-Specific Optimizations**: Custom adjustments for different device classes

## Accessibility (Apple Standards)
- VoiceOver/screen reader optimization
- Minimum contrast ratio of 4.5:1 for all text (Apple's standard)
- Support for Reduced Motion preferences
- Dynamic Type support for all text elements
- Keyboard navigation with visible focus states 