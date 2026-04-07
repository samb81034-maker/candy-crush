# Design Brief

## Tone & Differentiation

Playful, energetic, vibrant match-3 puzzle aesthetic. Maximalist celebration of color with 6 distinct, saturated candies. Toy-like, fun, focus-forward game UI that amplifies board visibility on deep dark background.

## Color Palette

| Token | OKLCH | Use |
|-------|-------|-----|
| Background | 0.12 0 0 | Deep dark game area, minimal distractions |
| Foreground | 0.98 0 0 | Text, score display, UI elements |
| Candy Red | 0.72 0.21 35 | Match-3 tile, vibrant red candy |
| Candy Orange | 0.68 0.19 60 | Match-3 tile, vibrant orange candy |
| Candy Yellow | 0.65 0.2 90 | Match-3 tile, vibrant yellow candy |
| Candy Green | 0.62 0.18 130 | Match-3 tile, vibrant green candy |
| Candy Blue | 0.7 0.19 200 | Match-3 tile, vibrant cyan-blue candy |
| Candy Purple | 0.65 0.22 280 | Match-3 tile, vibrant purple candy |
| Border | 0.22 0 0 | UI borders, subtle separation |
| Card | 0.16 0 0 | Score panel, status area background |

## Typography

| Font | Usage | Pairing |
|------|-------|---------|
| Figtree (display) | Score, game title, UI headers | Bold, friendly, playful |
| GeneralSans (body) | Game info, status text, labels | Clear, readable on dark |
| GeistMono (mono) | Score values, point displays | Precision, numeric data |

## Shape Language

- **Radius**: 12px (0.75rem) for rounded UI elements, candy tiles, status panels — friendly, toy-like aesthetic
- **Spacing**: Varied density (tight grid, loose headers) for visual rhythm and clarity
- **Shadows**: Subtle depth — no glow or neon effects, just focus amplification

## Structural Zones

| Zone | Background | Treatment | Purpose |
|------|-----------|-----------|---------|
| Game Board | 0.12 0 0 (background) | Bordered container, subtle grid overlay | Central focal point, 8x8 candy grid |
| Score/Status | 0.16 0 0 (card) | Elevated background, border-b separator | Lives, score, turns display |
| Controls | 0.16 0 0 (card) | Floating action buttons, positioned overlay | Swap/reset/menu interactions |
| Background | 0.12 0 0 | Solid, no pattern | Minimal distraction, maximum focus |

## Component Patterns

- **Candy Tiles**: 6 distinct saturated colors, rounded corners, subtle depth shadow, hover scale (1.05x), swap animation (0.3s)
- **Status Panel**: Semi-transparent card overlay, monospace score display, high contrast foreground
- **Action Buttons**: Primary accent color, rounded, hover lift shadow, active scale-down
- **Match Highlight**: Scale-up animation (0.4s bounce), opacity fade before removal

## Motion & Animation

- **Swap**: 0.3s ease-in-out tile exchange, smooth translate
- **Match Highlight**: 0.4s ease-out scale-up then fade-out before removal
- **Cascade**: 0.4s ease-out gravity drop when candies fall
- **Entrance**: Staggered tile appearances on grid load

## Constraints & Learnings

- 6 candy colors max for visual distinctness — no color confusion during gameplay
- Dark background ensures candies pop without visual fatigue
- Game board centered with UI overlay — board is the hero
- High contrast text on dark ensures readability
- Smooth, predictable animations maintain game flow clarity

## Signature Detail

6 vibrant, saturated OKLCH candy colors (red, orange, yellow, green, blue, purple) on deep dark background create instant visual appeal and gameplay clarity. Each candy is unmistakably distinct with dedicated icon/symbol inside tile. Rounded UI everywhere reinforces playful, friendly aesthetic.
