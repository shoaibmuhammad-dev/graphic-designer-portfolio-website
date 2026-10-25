import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { JsonLd } from '@/components/ui/JsonLd'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WorkArchive } from '@/components/work/WorkArchive'
import { categories, projects } from '@/data/projects'
import { siteConfig } from '@/data/site'
import { breadcrumbJsonLd } from '@/lib/jsonld'

const description = `Branding, packaging, social media, poster, app UI and editorial projects by freelance graphic designer ${siteConfig.name} in ${siteConfig.city}.`

export const metadata: Metadata = {
  title: 'Work',
  description,
  alternates: { canonical: '/work' },
  openGraph: { type: 'website', title: `Work | ${siteConfig.name}`, description, url: '/work' },
  twitter: { card: 'summary_large_image', title: `Work | ${siteConfig.name}`, description, images: ['/opengraph-image'] },
}

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
        ])}
      />
      <section className="pb-24 pt-32 md:pb-40 md:pt-44">
        <Container>
          <SectionHeading as="h1" index="00" label="Archive" lines={['All', 'work']} />
          <WorkArchive projects={projects} categories={categories} />
        </Container>
      </section>
    </>
  )
}
