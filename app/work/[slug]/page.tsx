import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Artwork } from '@/components/ui/Artwork'
import { Container } from '@/components/ui/Container'
import { JsonLd } from '@/components/ui/JsonLd'
import { Label } from '@/components/ui/Label'
import { Reveal } from '@/components/ui/Reveal'
import { SplitText } from '@/components/ui/SplitText'
import { Gallery } from '@/components/work/Gallery'
import { NextProject } from '@/components/work/NextProject'
import { getNextProject, getProject, projects } from '@/data/projects'
import { siteConfig } from '@/data/site'
import { breadcrumbJsonLd, projectJsonLd } from '@/lib/jsonld'

type Params = { params: Promise<{ slug: string }> }

// Every project page is generated at build time
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  const title = `${project.title}: ${project.category} case study`
  const description = `${project.summary} A ${project.category.toLowerCase()} project by ${siteConfig.name}, ${siteConfig.role.toLowerCase()} in ${siteConfig.city}.`

  return {
    title,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { type: 'website', title, description, url: `/work/${slug}` },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/work/${slug}/opengraph-image`],
    },
  }
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  const next = getNextProject(slug)

  const sections = [
    { label: 'Overview', text: project.overview },
    { label: 'Challenge', text: project.challenge },
    { label: 'Solution', text: project.solution },
    { label: 'Result', text: project.result },
  ]

  const meta = [
    { label: 'Client', value: project.client },
    { label: 'Year', value: String(project.year) },
    { label: 'Role', value: project.role },
    { label: 'Services', value: project.services.join(', ') },
    { label: 'Tools', value: project.tools.join(', ') },
  ]

  return (
    <>
      <JsonLd
        data={[
          projectJsonLd(project),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/work' },
            { name: project.title, path: `/work/${project.slug}` },
          ]),
        ]}
      />

      <article>
        <header className="pt-32 md:pt-44">
          <Container>
            <nav aria-label="Breadcrumb" className="mb-10">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
                <li>
                  <Link href="/" className="inline-flex min-h-11 items-center hover:text-ink">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/work" className="inline-flex min-h-11 items-center hover:text-ink">
                    Work
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-ink">
                  {project.title}
                </li>
              </ol>
            </nav>

            <Label>
              {project.category} ({project.year})
            </Label>
            <SplitText
              as="h1"
              lines={[project.title]}
              className="mt-5 font-heading text-[clamp(2.75rem,10vw,9rem)] font-medium leading-[0.95] tracking-tighter"
            />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-muted md:text-xl">{project.summary}</p>
            </Reveal>

            <dl className="mt-14 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-5">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-xs uppercase tracking-widest text-muted">{m.label}</dt>
                  <dd className="mt-2 font-body text-base">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </header>

        <Container className="mt-14 md:mt-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-brand bg-surface sm:aspect-[16/9] md:aspect-[21/10]">
            <Artwork image={project.cover} priority sizes="(min-width: 1440px) 1360px, 100vw" />
          </div>
        </Container>

        <Container className="mt-20 md:mt-32">
          {sections.map((s, i) => (
            <section key={s.label} className="grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-8 md:py-14">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted md:col-span-4">
                {String(i + 1).padStart(2, '0')} / {s.label}
              </h2>
              <Reveal className="md:col-span-7">
                <p className="font-heading text-xl font-medium leading-snug tracking-tight md:text-3xl">{s.text}</p>
              </Reveal>
            </section>
          ))}
        </Container>

        <Container className="mt-12 md:mt-20">
          <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-muted">Gallery ({project.gallery.length})</h2>
          <Gallery images={project.gallery} />
        </Container>
      </article>

      <div className="mt-24 md:mt-40">
        <NextProject project={next} />
      </div>
    </>
  )
}
