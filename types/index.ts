export type ArtVariant = 'orbit' | 'blocks' | 'grid' | 'arcs' | 'waves' | 'type'

/** Generated placeholder artwork. Replaced automatically when an image `src` is set. */
export interface ArtSpec {
  variant: ArtVariant
  from: string // gradient start
  to: string // gradient end
  shape: string // colour of the abstract shapes
  text?: string // used by the "type" variant
}

export type ImageAspect = 'landscape' | 'portrait' | 'square' | 'wide'

export interface ImageAsset {
  /** Path inside /public, e.g. "/images/projects/orbit-01.jpg". Leave undefined to use generated art. */
  src?: string
  alt: string
  art: ArtSpec
  aspect: ImageAspect
  /** Case study grid: "full" spans both columns, "half" sits in a two-column row. */
  span?: 'full' | 'half'
  /** Pixel size of the source file (optional, helps blur + layout) */
  width?: number
  height?: number
}

export type ProjectCategory =
  | 'Branding'
  | 'Packaging'
  | 'Social Media'
  | 'Poster'
  | 'App UI'
  | 'Editorial'

export interface Project {
  slug: string
  title: string
  client: string
  year: number
  category: ProjectCategory
  role: string
  services: string[]
  tools: string[]
  /** One-line summary used on cards, metadata and JSON-LD */
  summary: string
  overview: string
  challenge: string
  solution: string
  result: string
  featured: boolean
  cover: ImageAsset
  gallery: ImageAsset[]
}

export interface Service {
  title: string
  description: string
  deliverables: string[]
}

export interface ProcessStep {
  title: string
  description: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
}

export interface Experience {
  type: 'work' | 'education'
  role: string
  org: string
  period: string
  description: string
}

export interface Tool {
  name: string
  short: string
  use: string
}

export interface SocialLink {
  label: string
  href: string
}
