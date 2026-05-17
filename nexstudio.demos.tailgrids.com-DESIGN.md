# Design System Inspired by NexStudio

## 1. Visual Theme & Atmosphere

NexStudio embodies a modern, minimalist aesthetic rooted in sophisticated simplicity and high-contrast clarity. The design system leverages a strict black-and-white foundation with purposeful negative space, creating an air of premium professionalism ideal for a digital product studio. The atmosphere is bold yet refined—commanding attention through typography scale and deliberate whitespace rather than decorative flourishes. Organic, flowing imagery (as seen in hero sections) provides subtle visual interest while maintaining an understated, confident tone. This is a design language for builders and innovators: clean, purposeful, and unapologetically forward-thinking.

**Key Characteristics**
- Extreme contrast: pure black on pure white for maximum legibility and impact
- Minimal color palette: only black, white, and selective accent usage
- Large, confident typography with generous line spacing
- Ample whitespace that conveys sophistication and breathing room
- Rounded buttons and image corners as sole softening elements
- Dark sections used strategically for emphasis and content hierarchy
- Focus on functional elegance over decoration

## 2. Color Palette & Roles

### Primary
- **Black** (`#000000`): Primary text, headings, UI elements, and structural components. Used extensively across navigation, body copy, and interactive states.
- **White** (`#FFFFFF`): Primary background, contrast layer, and text on dark surfaces. Creates the clean, minimal aesthetic foundation.

### Accent Colors
- **Bright Blue** (`#007AFF`): Reserved accent for future interactive states, emphasis, or call-to-action highlights (currently underutilized; recommended for link hover states or secondary actions).

### Interactive
- **Black** (`#000000`): Button borders, active states, and link underlines. Maintains visual weight and hierarchy.
- **White** (`#FFFFFF`): Button text on dark backgrounds, maintaining contrast.

### Neutral Scale
- **Off-White** (`#FBFBFB`): Subtle background alternative to pure white for minimal differentiation in cards or sections.
- **Dark Charcoal** (`#1F1F1F`): Deep background alternative to pure black for reduced contrast sections.
- **Near Black** (`#070707`): Used sparingly for finest tonal variation in shadows or borders.

### Surface & Borders
- **Black** (`#000000`): Border definition and outline strokes at `1px` width.
- **White** (`#FFFFFF`): Light surface backgrounds and contrast dividers.

## 3. Typography Rules

### Font Family
**Primary:** Inter (variable, weights 100–900, optimized italics)
Fallback stack: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

**Secondary:** Anonymous Pro (monospace, for code blocks and technical content)
Fallback stack: `'Anonymous Pro', 'Courier New', monospace`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / Hero | Inter | 72px | 400 | 72px | 0px | Maximum impact; used for main hero heading |
| Heading 2 | Inter | 48px | 400 | 48px | 0px | Section titles and major content blocks |
| Heading 4 | Inter | 24px | 400 | 32px | 0px | Subsection headings and card titles |
| Body | Inter | 18px | 400 | 24px | 0px | Primary paragraph text and descriptive copy |
| Body Small | Inter | 16px | 400 | 24px | 0px | Secondary text, labels, and captions |
| Button | Inter | 14px | 500 | 20px | 0px | Clickable actions and button labels |
| Navigation Link | Inter | 16px | 400 | 24px | 0px | Top navigation menu items |

### Principles
- **Scale-driven hierarchy:** Font size alone creates visual weight; avoid stacking bold with large sizes.
- **Generous line height:** All text uses line-height greater than or equal to font size for premium readability.
- **Weight consistency:** Primary weight is 400 (regular); use 500 only for buttons and emphasis.
- **Italic for contrast:** Italics differentiate secondary statements (e.g., "Digital Products" in hero) without color change.
- **Letter spacing:** No additional tracking; rely on size and weight for distinction.

## 4. Component Stylings

### Buttons

**Primary (Solid Black)**
- Background: `#000000`
- Text Color: `#FFFFFF`
- Font Size: `14px`
- Font Weight: `500`
- Line Height: `20px`
- Padding: `12px 24px`
- Border Radius: `999px` (fully rounded)
- Border: `2px solid #000000`
- Height: `48px`
- Hover State: Background `#1F1F1F`, maintains white text; box-shadow `0px 8px 16px rgba(0, 0, 0, 0.16)`
- Active State: Background `#000000`, border `2px solid #000000`

**Secondary (Outline Black)**
- Background: `transparent`
- Text Color: `#000000`
- Font Size: `14px`
- Font Weight: `500`
- Line Height: `20px`
- Padding: `12px 24px`
- Border Radius: `999px`
- Border: `2px solid #000000`
- Height: `48px`
- Hover State: Background `#FBFBFB`, text `#000000`, maintains border
- Active State: Background `#F0F0F0`, border `2px solid #000000`

**Ghost (Minimal)**
- Background: `transparent`
- Text Color: `#000000`
- Font Size: `14px`
- Font Weight: `500`
- Line Height: `20px`
- Padding: `12px 24px`
- Border Radius: `0px` (no rounding)
- Border: `1px solid transparent`
- Height: `auto`
- Hover State: Text Color `#007AFF`, underline `1px solid #007AFF`
- Active State: Text Color `#000000`, underline `1px solid #000000`

### Cards & Containers

**Standard Card**
- Background: `#FFFFFF`
- Border: `1px solid #000000`
- Border Radius: `0px`
- Padding: `24px`
- Min Height: `224px`
- Width: `284px`
- Text Color: `#000000`
- Font Size: `16px`
- Line Height: `24px`
- Hover State: Box-shadow `0px 12px 24px rgba(0, 0, 0, 0.08)`, slight translate up (`transform: translateY(-2px)`)

**Dark Section Card**
- Background: `#000000`
- Border: `none`
- Border Radius: `24px`
- Padding: `48px 40px`
- Text Color: `#FFFFFF`
- Font Size: `16px`
- Line Height: `24px`
- Heading Color: `#FFFFFF`

**Image Container**
- Border Radius: `24px`
- Overflow: `hidden`
- Background: `#F5F5F5`
- Border: `none`

### Inputs & Forms

**Text Input**
- Background: `#FFFFFF`
- Text Color: `#000000`
- Border: `1px solid #000000`
- Border Radius: `8px`
- Padding: `12px 16px`
- Font Size: `16px`
- Font Weight: `400`
- Line Height: `24px`
- Focus State: Border `2px solid #007AFF`, box-shadow `0px 0px 0px 3px rgba(0, 122, 255, 0.1)`
- Placeholder Color: `#999999`

**Textarea**
- Background: `#FFFFFF`
- Text Color: `#000000`
- Border: `1px solid #000000`
- Border Radius: `8px`
- Padding: `12px 16px`
- Font Size: `16px`
- Font Weight: `400`
- Line Height: `24px`
- Min Height: `120px`
- Focus State: Border `2px solid #007AFF`, box-shadow `0px 0px 0px 3px rgba(0, 122, 255, 0.1)`

### Navigation

**Header Navigation**
- Background: `#FFFFFF`
- Height: `110px`
- Padding: `24px 40px`
- Display: `flex`, `justify-content: space-between`
- Border Bottom: `1px solid #F0F0F0` (optional subtle divider)

**Nav Link**
- Color: `#000000`
- Font Size: `16px`
- Font Weight: `400`
- Line Height: `24px`
- Padding: `8px 16px`
- Border Radius: `4px`
- Hover State: Color `#007AFF`, background `transparent`
- Active State: Color `#000000`, underline `2px solid #000000`

**Mobile Menu (Burger)**
- Width: `24px`
- Height: `24px`
- Stroke: `#000000`
- Stroke Width: `2px`
- Hover State: Opacity `0.7`

## 5. Layout Principles

### Spacing System
**Base Unit:** `4px`

**Scale (multiples of base unit):**
- `12px` (3×): Small gaps, button padding refinement
- `16px` (4×): Input padding, navigation padding
- `20px` (5×): Element gaps, inline spacing
- `24px` (6×): Card padding, section padding
- `32px` (8×): Component gaps, small section margins
- `40px` (10×): Medium section spacing
- `48px` (12×): Large section margins, block spacing
- `56px` (14×): Extra-large section spacing
- `64px` (16×): Hero section vertical spacing
- `80px` (20×): Major section dividers
- `100px` (25×): Full-width section padding (vertical)
- `120px` (30×): Hero section padding (vertical), maximum breathing room

**Usage Context:**
- Micro spacing (`12px–20px`): Button internals, input fields, small gaps
- Section spacing (`32px–64px`): Between content blocks, text to component
- Page spacing (`80px–120px`): Hero sections, major content transitions

### Grid & Container
**Max Width:** `1440px` (desktop container)
**Columns:** 12-column flexible grid (inferred from standard web practices)
**Gutter:** `20px` (gap between columns)
**Section Padding:** `40px` horizontal (desktop), `20px` horizontal (tablet/mobile)
**Column Strategy:**
- Hero: Full-width with centered text, max content width `900px`
- Two-column: 6-column each with gutter
- Three-column: 4-column each with gutter
- Four-column: 3-column each with gutter

### Whitespace Philosophy
Whitespace is a primary design element. Generous margins and padding create a sense of luxury and focus. Sections are separated by `80px–120px` vertical spacing, allowing content to breathe. Text never bleeds to edges; consistent `40px` side padding on desktop maintains breathing room. Dark backgrounds are used sparingly and strategically to create visual punctuation, not clutter.

### Border Radius Scale
- `0px`: Cards, containers, standard UI elements (flat, architectural)
- `8px`: Form inputs, subtle rounding
- `24px`: Image containers, large cards, soft corners
- `999px`: Buttons and circular elements (fully rounded)

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, `box-shadow: none` | Cards, containers, borders only (default state) |
| Hover (Level 1) | `0px 8px 16px rgba(0, 0, 0, 0.08)` | Interactive hover states, subtle lift |
| Focus (Level 2) | `0px 12px 24px rgba(0, 0, 0, 0.12)` | Focused form inputs, modal surfaces |
| Overlay (Level 3) | `0px 20px 40px rgba(0, 0, 0, 0.16)` | Dropdown menus, modals, floating panels |
| Modal (Level 4) | `0px 32px 64px rgba(0, 0, 0, 0.20)` | Full-page overlays, critical modals |

**Shadow Philosophy:**
NexStudio uses minimal, restrained shadows. The default state is completely flat (`box-shadow: none`). Shadows emerge only on interaction (hover, focus) to maintain the clean, minimal aesthetic. Shadows use pure black with varying opacity rather than color manipulation. Elevation is communicated through layering, position, and scale—not aggressive depth.

## 7. Do's and Don'ts

### Do
- **Use high contrast:** Black on white or white on black exclusively. Do not use gray text on white or colored backgrounds unless for secondary emphasis via accent color.
- **Embrace whitespace:** Leave generous margins between sections. Let content breathe.
- **Scale typography boldly:** Use the full range (`14px` to `72px`) to establish hierarchy. Do not settle for middle ground.
- **Round buttons and images:** Apply `999px` border radius to buttons and `24px` to image containers for visual softness.
- **Keep borders sharp and minimal:** Use `1px` black borders on white cards for definition. Avoid double borders or complex stroke patterns.
- **Italicize secondary statements:** Use italic weight to differentiate secondary text (e.g., descriptive copy, product names) without changing color.
- **Use dark sections strategically:** Black backgrounds create visual anchors and emphasis. Use them for testimonials, key stats, or calls-to-action—not filler.
- **Maintain consistent padding:** Apply `24px` to all card padding, `40px` to horizontal section padding, and scale vertically to `80px–120px`.

### Don't
- **Do not mix colors casually:** Only use `#007AFF` for interactive states, links, or future emphasis. Do not introduce additional accent colors.
- **Do not add unnecessary shadows:** Avoid drop shadows by default. Reserve shadows for interactive states (hover, focus).
- **Do not overcomplicate typography:** Stick to weights 400 and 500. Do not bold headings; let size do the work.
- **Do not use gray text for primary copy:** Body text must be `#000000` on `#FFFFFF`. Use white (`#FFFFFF`) on black (`#000000`) for dark sections.
- **Do not break the padding system:** Every component padding must be a multiple of `4px`. Do not use arbitrary values like `13px` or `37px`.
- **Do not create cluttered layouts:** Do not jam content together. Use grid, whitespace, and consistent gaps (`20px–40px`) to separate elements.
- **Do not add decorative elements:** Avoid icons, gradients, patterns, or illustrations unless they serve a functional purpose (e.g., directional arrows, status indicators).
- **Do not use border radius inconsistently:** Buttons are `999px`, images are `24px`, inputs are `8px`, and cards are `0px`. Do not randomize.

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|------------|
| Mobile | 320px–479px | Single column, `20px` side padding, `48px` vertical spacing, font sizes reduced 10–15%, full-width buttons |
| Tablet | 480px–1023px | Two-column layout, `32px` side padding, `64px` vertical spacing, navigation collapses to hamburger menu |
| Desktop | 1024px+ | Full grid layout, `40px` side padding, `80px–120px` vertical spacing, all navigation visible |
| Large Desktop | 1440px+ | Max width container centered, extended whitespace on sides |

### Touch Targets
**Minimum touch target size:** `48px × 48px` (buttons, links, form inputs)
**Recommended padding around touch targets:** `12px` minimum clearance on all sides
**Fingertip-friendly spacing:** `20px` gap between interactive elements on mobile devices

### Collapsing Strategy
- **Hero section:** Full-width image on desktop becomes `2:1` aspect ratio on tablet, stacked on mobile (image above text).
- **Navigation:** Full horizontal menu on desktop collapses to hamburger icon on tablets and below; menu slides in from top or side.
- **Grid layouts:** 4-column grid → 3-column (tablet) → 2-column (mobile) → 1-column (small mobile).
- **Typography:** Display heading `72px` (desktop) → `48px` (tablet) → `36px` (mobile); body `18px` → `16px` → `16px`.
- **Padding:** Horizontal `40px` (desktop) → `32px` (tablet) → `20px` (mobile); vertical `80px` (desktop) → `64px` (tablet) → `48px` (mobile).
- **Cards:** Fixed width `284px` (desktop) becomes `100%` with max-width constraint on mobile.

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary Text:** Black (`#000000`)
- **Primary Background:** White (`#FFFFFF`)
- **Primary Button:** Black (`#000000`) background with white (`#FFFFFF`) text
- **Secondary Button:** White (`#FFFFFF`) background with black (`#000000`) border and text
- **Accent / Interactive:** Bright Blue (`#007AFF`)
- **Dark Sections:** Black (`#000000`) with white (`#FFFFFF`) text
- **Subtle Alt Background:** Off-White (`#FBFBFB`)
- **Borders:** Black (`#000000`) at `1px` width

### Iteration Guide

1. **Start with the monochrome foundation:** All text is `#000000` on `#FFFFFF` backgrounds by default. Accent blue (`#007AFF`) is reserved for link hovers and future interactive emphasis.

2. **Scale typography aggressively:** Use `72px` for heroes, `48px` for section headings, `24px` for subheadings, `18px` for body, `16px` for labels. Do not use intermediate sizes.

3. **Build on a `4px` base unit:** All spacing, padding, and margins must be multiples of `4px` (e.g., `12px`, `16px`, `20px`, `24px`, `32px`, `40px`, `48px`, `80px`, `120px`). No arbitrary values.

4. **Apply border radius consistently:** Buttons and circular elements use `999px` (fully rounded). Images and large cards use `24px`. Form inputs use `8px`. Cards default to `0px` (sharp corners).

5. **Use shadows only on interaction:** Default state is `box-shadow: none`. Hover and focus states elevate with `0px 8px 16px rgba(0, 0, 0, 0.08)` or `0px 12px 24px rgba(0, 0, 0, 0.12)`.

6. **Maintain section spacing:** Separate major content blocks with `80px–120px` vertical margin. Within sections, use `32px–48px` between components.

7. **Keep navigation consistent:** Header is `110px` tall, `24px` padding vertical, centered vertically. Nav links are `16px`, weight `400`, no background by default; hover adds `#007AFF` color.

8. **Round buttons and images exclusively:** Buttons are `999px` radius with `48px` height. Images in cards are `24px` radius. All other elements maintain sharp (`0px`) corners unless explicitly rounded.

9. **Use dark sections (`#000000`) strategically:** Apply to testimonials, key statistics, value propositions, or calls-to-action. White text (`#FFFFFF`) on dark backgrounds. Maintain consistent padding (`40px–48px`).

10. **Test the whitespace:** If the layout feels cramped, increase vertical spacing by `20px–32px`. Generous margins are a signature of the NexStudio aesthetic; minimize clutter by using breathing room as a design tool.