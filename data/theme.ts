/**
 * Single source of truth for colours.
 * Used by tailwind.config.ts AND the generated Open Graph / icon images.
 * To change the accent colour, edit the `accent` values below.
 *
 * Options from the brief:
 *   electric periwinkle #6C63FF  (current)
 *   soft lilac          #C8B6FF
 *   acid lime           #D4FF3F
 *   warm coral          #FF6B57
 */
export const theme = {
  background: '#FFFFFF',
  surface: '#F7F7F8',
  ink: '#0B0B0F',
  line: '#E4E4E9',
  muted: '#6B6B78',
  subtle: '#A1A1AE',
  accent: {
    DEFAULT: '#6C63FF',
    tint: '#ECEAFF',
    ink: '#4A41E0', // darker shade used for accent TEXT on white (contrast)
    onAccent: '#FFFFFF', // text colour placed ON the accent colour
  },
} as const
