import type { ImageAsset, SocialLink } from '@/types'

/**
 * Global site configuration. Everything personal lives here.
 * Search this file for "EDIT" to find values to replace before launch.
 */
export const siteConfig = {
  name: 'Ava Williams',
  monogram: 'AW',
  role: 'Graphic Designer',
  specialties: [
    'Branding',
    'Logo Design',
    'Social Media Design',
    'Packaging',
    'Editorial',
    'Illustration',
    'Motion Graphics',
  ],

  // EDIT: city and country
  city: 'Karachi',
  country: 'Pakistan',
  location: 'Karachi, Pakistan',

  // EDIT: contact email
  email: 'hello@avawilliams.design',

  // EDIT: WhatsApp number, international format, digits only (no +, spaces or dashes)
  whatsapp: {
    number: '923001234567',
    message: "Hi Ava, I found your portfolio and I'd like to talk about a project.",
  },

  // EDIT: social profiles
  socials: [
    { label: 'Behance', href: 'https://www.behance.net/avawilliams' },
    { label: 'Instagram', href: 'https://www.instagram.com/avawilliams.design' },
    { label: 'Dribbble', href: 'https://dribbble.com/avawilliams' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/avawilliams' },
  ] satisfies SocialLink[],

  tagline: 'Designing identities that feel alive.',
  intro:
    'I make brand identities, packaging and digital visuals for founders and small teams who want their work to look considered from the first glance.',
  description:
    'Ava Williams is a freelance graphic designer in Karachi specialising in branding and logo design, packaging, social media design and editorial work.',

  availability: { open: true, label: 'Open for freelance projects' },

  bio: [
    "I'm a graphic designer who likes to start with a question: what should this feel like when someone meets it for the first time? Then I work backwards, through type, colour and structure, until the answer is obvious.",
    "For six years I've worked with cafes, skincare labels, fintech startups and small publishers. I keep my client list short so every project gets proper attention and a real conversation, not a template.",
  ],
  values: [
    {
      title: 'Clarity first',
      text: 'A good identity explains itself in seconds. I cut until only the idea is left.',
    },
    {
      title: 'Details that earn their place',
      text: 'Kerning, grids, paper stock. I care about the small things people only notice when they are missing.',
    },
    {
      title: 'Honest collaboration',
      text: 'You see rough work early, you hear my reasoning, and you always know what happens next.',
    },
  ],
  facts: [
    { value: 6, suffix: '', label: 'Years of experience' },
    { value: 80, suffix: '+', label: 'Projects completed' },
    { value: 45, suffix: '+', label: 'Happy clients' },
  ],
  cvPath: '/cv/ava-williams-cv.pdf',

  // Replace by setting `src: '/images/portrait.jpg'` (4:5 ratio works best)
  portrait: {
    alt: 'Portrait of Ava Williams',
    aspect: 'portrait',
    art: { variant: 'type', from: '#ECEAFF', to: '#C8B6FF', shape: '#6C63FF', text: 'AW' },
  } satisfies ImageAsset,

  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Contact', href: '/#contact' },
  ],

  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
} as const

export function absoluteUrl(path = '/') {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}
