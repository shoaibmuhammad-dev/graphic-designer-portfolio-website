import type { ArtSpec, ImageAsset, ImageAspect, Project } from '@/types'

/**
 * ADD A PROJECT: copy one object below, change the slug and the content, done.
 * The home page, archive, case study page, sitemap and Open Graph image all update automatically.
 *
 * IMAGES: each image has an optional `src`. While `src` is empty a generated gradient artwork is used.
 * To use a real image, put the file in /public/images/projects/ and set src: '/images/projects/your-file.jpg'.
 */

const img = (
  alt: string,
  art: ArtSpec,
  aspect: ImageAspect,
  span: 'full' | 'half' = 'half',
  src?: string,
): ImageAsset => ({ alt, art, aspect, span, src })

export const projects: Project[] = [
  {
    slug: 'orbit-coffee-roasters',
    title: 'Orbit Coffee Roasters',
    client: 'Orbit Coffee Roasters',
    year: 2026,
    category: 'Branding',
    role: 'Lead designer',
    services: ['Brand identity', 'Logo design', 'Stationery', 'Signage'],
    tools: ['Illustrator', 'Photoshop', 'Blender'],
    summary: 'A warm, orbital identity for a specialty coffee roaster with a cult following.',
    overview:
      'Orbit is a small-batch roaster that sells beans online and runs one tiny cafe. They had a loyal community but a brand that looked like three different companies.',
    challenge:
      'The founders wanted to feel premium without feeling cold. Every competitor in the category used brown, serif type and photos of beans, so standing out meant rethinking the whole visual language.',
    solution:
      'I built the identity around a single circle that can be a roast, a cup, a planet or a clock. A warm palette, a confident grotesque and a library of orbit patterns give the brand range while staying instantly recognisable.',
    result:
      'Online orders rose 38% in the first quarter after launch, and the cafe now sells the tote bag more often than the espresso. The founders use the guidelines to brief every new hire.',
    featured: true,
    cover: img(
      'Orbit Coffee Roasters logo mark on a warm orange gradient',
      { variant: 'orbit', from: '#FFB48A', to: '#FF6B57', shape: '#0B0B0F' },
      'landscape',
    ),
    gallery: [
      img('Orbit logo suite', { variant: 'orbit', from: '#FFE7D6', to: '#FFB48A', shape: '#0B0B0F' }, 'wide', 'full'),
      img('Orbit pattern library', { variant: 'arcs', from: '#0B0B0F', to: '#2B2B36', shape: '#FF8A5C' }, 'portrait'),
      img('Orbit stationery', { variant: 'grid', from: '#F7F7F8', to: '#E4E4E9', shape: '#FF6B57' }, 'portrait'),
      img('Orbit cafe signage', { variant: 'blocks', from: '#FF6B57', to: '#FFB48A', shape: '#FFFFFF' }, 'landscape', 'full'),
      img('Orbit tote bag', { variant: 'type', from: '#FFE7D6', to: '#FFFFFF', shape: '#FF6B57', text: 'O' }, 'square'),
      img('Orbit cup sleeve', { variant: 'waves', from: '#2B2B36', to: '#0B0B0F', shape: '#FFB48A' }, 'square'),
    ],
  },
  {
    slug: 'verde-and-co',
    title: 'Verde & Co.',
    client: 'Verde & Co. Skincare',
    year: 2025,
    category: 'Packaging',
    role: 'Packaging designer',
    services: ['Packaging design', 'Label system', 'Print production'],
    tools: ['Illustrator', 'InDesign', 'Blender'],
    summary: 'A botanical packaging system for a skincare line with twelve products and one clear voice.',
    overview:
      'Verde & Co. makes small-batch skincare from plant extracts. They were growing from three products to twelve and needed packaging that scaled without becoming chaotic.',
    challenge:
      'Twelve products meant twelve ingredient stories, regulatory text on every label, and a tight print budget. The shelf had to read as one family while helping customers tell products apart in seconds.',
    solution:
      'A modular label system: one layout, one colour per product family, and a hand-drawn botanical for each hero ingredient. I worked with the printer from day one so every dieline, varnish and foil choice was tested on press.',
    result:
      'The range launched in 140 stores, with the printer approving artwork on the first proof. Buyers cited the shelf presence in the retailer feedback.',
    featured: true,
    cover: img(
      'Verde & Co. skincare packaging in sage green tones',
      { variant: 'blocks', from: '#DDEBD5', to: '#9CC4A0', shape: '#0B0B0F' },
      'portrait',
    ),
    gallery: [
      img('Verde label system', { variant: 'blocks', from: '#F1F6EE', to: '#DDEBD5', shape: '#2F5D3A' }, 'wide', 'full'),
      img('Verde botanical illustrations', { variant: 'waves', from: '#2F5D3A', to: '#1B3A24', shape: '#DDEBD5' }, 'portrait'),
      img('Verde box dielines', { variant: 'grid', from: '#FFFFFF', to: '#F1F6EE', shape: '#2F5D3A' }, 'portrait'),
      img('Verde shelf display', { variant: 'arcs', from: '#9CC4A0', to: '#DDEBD5', shape: '#0B0B0F' }, 'landscape', 'full'),
    ],
  },
  {
    slug: 'sunday-society',
    title: 'Sunday Society',
    client: 'Sunday Society',
    year: 2025,
    category: 'Social Media',
    role: 'Art director & designer',
    services: ['Social campaign', 'Template system', 'Motion loops'],
    tools: ['Figma', 'After Effects', 'Photoshop'],
    summary: 'A flexible social campaign system for a community brunch club.',
    overview:
      'Sunday Society hosts pop-up brunches across the city. Their feed was posted by three people with three different styles.',
    challenge:
      'The team needed to post daily without a designer in the loop, yet each post had to feel like part of one campaign. Templates usually look rigid, and rigid was the opposite of brunch.',
    solution:
      'I designed a kit of twelve layouts built on a loose grid, with bold type, torn-edge shapes and a motion loop for each. Editable Figma files and a one-page guide let the team publish in minutes.',
    result:
      'Instagram engagement doubled over three months, and the team now produces a week of content in one afternoon.',
    featured: true,
    cover: img(
      'Sunday Society social posts in lilac and yellow',
      { variant: 'arcs', from: '#C8B6FF', to: '#FFE27A', shape: '#0B0B0F' },
      'square',
    ),
    gallery: [
      img('Sunday Society feed grid', { variant: 'arcs', from: '#FFE27A', to: '#C8B6FF', shape: '#0B0B0F' }, 'wide', 'full'),
      img('Sunday Society story templates', { variant: 'blocks', from: '#C8B6FF', to: '#6C63FF', shape: '#FFE27A' }, 'portrait'),
      img('Sunday Society highlight covers', { variant: 'orbit', from: '#FFFFFF', to: '#ECEAFF', shape: '#6C63FF' }, 'portrait'),
      img('Sunday Society event poster', { variant: 'type', from: '#0B0B0F', to: '#2B2B36', shape: '#FFE27A', text: 'SS' }, 'landscape', 'full'),
    ],
  },
  {
    slug: 'kinetic-letters',
    title: 'Kinetic Letters',
    client: 'Self-initiated',
    year: 2024,
    category: 'Poster',
    role: 'Designer & illustrator',
    services: ['Poster design', 'Typography', 'Illustration'],
    tools: ['Illustrator', 'Procreate', 'Photoshop'],
    summary: 'A series of six typographic posters exploring movement through letterforms.',
    overview:
      'A personal project: six posters, each built from a single letter that feels like it is in motion.',
    challenge:
      'Type posters often rely on effects. I wanted movement that came from the letterform itself, using only shape, scale and rhythm.',
    solution:
      'Each poster starts as a hand-drawn letter in Procreate, is rebuilt as vector geometry, then repeated, rotated and cropped until it moves. Limited palettes keep the focus on form.',
    result:
      'The series was featured in a design newsletter and printed as a limited edition run of 100 sets, which sold out in two weeks.',
    featured: true,
    cover: img(
      'Kinetic Letters poster with a large letter A in periwinkle',
      { variant: 'type', from: '#F7F7F8', to: '#ECEAFF', shape: '#6C63FF', text: 'A' },
      'portrait',
    ),
    gallery: [
      img('Poster A', { variant: 'type', from: '#ECEAFF', to: '#C8B6FF', shape: '#6C63FF', text: 'A' }, 'portrait'),
      img('Poster R', { variant: 'type', from: '#0B0B0F', to: '#2B2B36', shape: '#D4FF3F', text: 'R' }, 'portrait'),
      img('Poster S', { variant: 'type', from: '#FFB48A', to: '#FF6B57', shape: '#0B0B0F', text: 'S' }, 'portrait'),
      img('Poster G', { variant: 'type', from: '#DDEBD5', to: '#9CC4A0', shape: '#0B0B0F', text: 'G' }, 'portrait'),
      img('The full series on a wall', { variant: 'grid', from: '#F7F7F8', to: '#E4E4E9', shape: '#6C63FF' }, 'wide', 'full'),
    ],
  },
  {
    slug: 'tidal-app',
    title: 'Tidal',
    client: 'Tidal',
    year: 2025,
    category: 'App UI',
    role: 'UI & visual designer',
    services: ['App UI', 'Design system', 'Iconography'],
    tools: ['Figma', 'Illustrator', 'After Effects'],
    summary: 'Interface and icon system for a habit-tracking app that feels calm, not clinical.',
    overview:
      'Tidal helps people build small daily habits. The first version worked but felt like a spreadsheet.',
    challenge:
      'Habit apps tend to scold or gamify. Tidal wanted users to feel supported, with an interface that stays quiet until it is needed.',
    solution:
      'A soft blue palette, generous spacing and a custom icon set with rounded, wave-like forms. Micro-animations confirm progress without celebrating loudly. A compact design system keeps developers and designers aligned.',
    result:
      'Day-30 retention improved by 22%, and the design system cut handoff questions from engineering by half.',
    featured: true,
    cover: img(
      'Tidal habit app screens on a blue gradient',
      { variant: 'waves', from: '#B9D8FF', to: '#6C63FF', shape: '#FFFFFF' },
      'landscape',
    ),
    gallery: [
      img('Tidal home screen', { variant: 'waves', from: '#DCEBFF', to: '#B9D8FF', shape: '#6C63FF' }, 'wide', 'full'),
      img('Tidal icon set', { variant: 'grid', from: '#FFFFFF', to: '#ECEAFF', shape: '#6C63FF' }, 'square'),
      img('Tidal progress view', { variant: 'arcs', from: '#6C63FF', to: '#4A41E0', shape: '#DCEBFF' }, 'square'),
      img('Tidal design system', { variant: 'blocks', from: '#F7F7F8', to: '#E4E4E9', shape: '#6C63FF' }, 'landscape', 'full'),
    ],
  },
  {
    slug: 'the-quiet-issue',
    title: 'The Quiet Issue',
    client: 'The Quiet Issue Magazine',
    year: 2024,
    category: 'Editorial',
    role: 'Editorial designer',
    services: ['Editorial design', 'Typography', 'Art direction'],
    tools: ['InDesign', 'Photoshop', 'Illustrator'],
    summary: 'Layout and art direction for an independent magazine about slow living.',
    overview:
      'The Quiet Issue is an independent quarterly about slow living. I designed the layout system and art-directed the first three issues.',
    challenge:
      'The magazine needed to feel calm without looking empty, and to carry long essays and photo stories in the same grid.',
    solution:
      'A flexible twelve-column grid, a serif and grotesque pairing, and a rule that every spread has one place for the eye to rest. Pull quotes and captions follow a consistent rhythm.',
    result:
      'The first issue sold out through the publisher’s site, and subscribers have grown steadily with each release.',
    featured: true,
    cover: img(
      'The Quiet Issue magazine spread in soft grey',
      { variant: 'grid', from: '#F7F7F8', to: '#D9D9E0', shape: '#0B0B0F' },
      'landscape',
    ),
    gallery: [
      img('The Quiet Issue cover', { variant: 'type', from: '#E4E4E9', to: '#F7F7F8', shape: '#0B0B0F', text: 'Q' }, 'portrait'),
      img('Contents spread', { variant: 'grid', from: '#FFFFFF', to: '#F7F7F8', shape: '#6C63FF' }, 'portrait'),
      img('Essay layout', { variant: 'blocks', from: '#F7F7F8', to: '#E4E4E9', shape: '#0B0B0F' }, 'wide', 'full'),
      img('Photo story spread', { variant: 'waves', from: '#2B2B36', to: '#0B0B0F', shape: '#E4E4E9' }, 'landscape', 'full'),
    ],
  },
]

export const categories = Array.from(new Set(projects.map((p) => p.category)))

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 6)

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
