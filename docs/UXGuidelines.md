# UX Guidelines — CV Mark Grenville

## Design Direction

Cinematic, dark, editorial. Closer to an Awwwards concept site than a traditional CV. Premium feel with dramatic typography and generous whitespace.

## Design Tokens

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-base` | `#050505` | Page background |
| `--color-surface` | `#111111` | Elevated surfaces |
| `--color-card` | `#1A1A1A` | Card backgrounds |
| `--color-accent` | `#D4FF00` | Primary accent (electric chartreuse) |
| `--color-accent-dim` | `#A3C200` | Dimmed accent |
| `--color-text` | `#FAFAFA` | Primary text |
| `--color-text-secondary` | `#888888` | Secondary text |
| `--color-text-muted` | `#444444` | Muted text |
| `--color-border` | `#333333` | Default border |
| `--color-border-hover` | `#D4FF00` | Hover border (accent) |

### Typography

| Role | Font | Weight Range | Usage |
|------|------|-------------|-------|
| Display | Space Grotesk | 300–700 | Headlines, hero text, section titles |
| Body | Inter | 300–700 | Paragraphs, descriptions, UI text |
| Mono | JetBrains Mono | 300–700 | Code, CLI, data views, labels |

### Spacing

- Base unit: 8px
- Section padding: 120–160px vertical, 24–48px horizontal
- Card padding: 32–40px
- Component gap: 8–16px

### Border Radius

- Cards: 16px (`rounded-2xl`)
- Buttons: 9999px (`rounded-full` — pill shape)
- Tags: 8px (`rounded-lg`)
- Small elements: 6px (`rounded-md`)

## Component Inventory

### Buttons

- **Primary CTA:** Pill-shaped, `bg-accent text-base`, hover scale 1.03 + glow shadow
- **Secondary:** Pill-shaped, border only, hover border shifts to accent

### Cards

- **Glass card:** `.glass` class — `rgba(26,26,26,0.8)` with `backdrop-blur(12px)`, 1px border `#333`, hover border accent

### Section Labels

- Mono font, 10px, tracking `0.3em`, uppercase, accent color
- Format: `01 / Section Name`

### Stats

- Glass card with centered layout
- Large display number in accent color
- Small mono label below

## Animation Standards

### Scroll Reveal

- Use `use:reveal` Svelte action from `$lib/utils/animations`
- Default: fade up 30px over 800ms with `cubic-bezier(0.16, 1, 0.3, 1)`
- Optional delay via `use:reveal={{ delay: 0.2 }}`

### Hover States

- Cards: border color transition to accent (300ms)
- Buttons: scale 1.03 + glow shadow (300ms)
- Links: color transition (300ms)

### Entrance

- Hero elements: staggered opacity + translateY with increasing delays
- Accent line: width animation from 0 to 100% over 1.2s

## Accessibility

### Color Contrast

- Primary text (`#FAFAFA`) on base (`#050505`): ratio 19.4:1 (AAA)
- Secondary text (`#888888`) on base: ratio 5.4:1 (AA)
- Accent (`#D4FF00`) on base: ratio 14.1:1 (AAA)

### Keyboard Navigation

- All interactive elements are focusable
- Focus visible styles via browser defaults
- CLI terminal input is keyboard-driven

### Screen Readers

- Semantic HTML throughout (headings, nav, main, section)
- ARIA labels on icon-only buttons
- Alt text on profile image

### Motion

- Respects `prefers-reduced-motion` via CSS transitions (degrades gracefully)
- No scroll hijacking
- No autoplaying video/audio

### Print

- Document view includes `@media print` styles
- Hides sidebar, grain overlay, and navigation in print mode

## View Mode Guidelines

| Mode | Background | Font | Character |
|------|-----------|------|-----------|
| GUI | Dark base | Display + Body | Cinematic editorial |
| CLI | Near-black | Mono only | Green terminal |
| Swagger | Near-black | Display + Mono | API documentation |
| JSON | VS Code dark | Mono only | Code editor |
| YAML | VS Code dark | Mono only | Code editor |
| Document | White paper | Serif/Body | Word document |
