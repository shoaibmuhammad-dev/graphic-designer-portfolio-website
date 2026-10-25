import type { Config } from 'tailwindcss'
import { theme } from './data/theme'

/**
 * Colour, font-family, radius and animation tokens live here.
 * Font sizes are intentionally NOT tokenised: components use standard Tailwind
 * classes (text-sm, text-5xl, text-[clamp(...)]) so edits are visible in place.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: theme.background,
        surface: theme.surface,
        ink: theme.ink,
        line: theme.line,
        muted: theme.muted,
        subtle: theme.subtle,
        accent: theme.accent,
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        brand: '14px', // the ONE corner radius used across the site
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        scrollLine: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        float: 'float 7s ease-in-out infinite',
        scrollLine: 'scrollLine 2.2s cubic-bezier(0.7,0,0.3,1) infinite',
        spinSlow: 'spinSlow 40s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
