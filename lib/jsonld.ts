import { absoluteUrl, siteConfig } from '@/data/site'
import type { Project } from '@/types'

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': absoluteUrl('/#person'),
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    image: absoluteUrl('/opengraph-image'),
    address: { '@type': 'PostalAddress', addressLocality: siteConfig.city, addressCountry: siteConfig.country },
    knowsAbout: siteConfig.specialties,
    sameAs: siteConfig.socials.map((s) => s.href),
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    name: `${siteConfig.name} - ${siteConfig.role}`,
    url: siteConfig.url,
    inLanguage: 'en',
    publisher: { '@id': absoluteUrl('/#person') },
  }
}

export function projectJsonLd(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: absoluteUrl(`/work/${project.slug}`),
    image: absoluteUrl(`/work/${project.slug}/opengraph-image`),
    dateCreated: String(project.year),
    genre: project.category,
    creator: { '@id': absoluteUrl('/#person') },
    about: project.services,
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
