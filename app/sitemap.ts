import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'
import { absoluteUrl } from '@/data/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/work'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...projects.map((p) => ({
      url: absoluteUrl(`/work/${p.slug}`),
      lastModified: new Date(`${p.year}-12-31`),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
    { url: absoluteUrl('/contact'), lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ]
}
