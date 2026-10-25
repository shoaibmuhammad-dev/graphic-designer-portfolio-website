import { ImageResponse } from 'next/og'
import { getProject, projects } from '@/data/projects'
import { siteConfig } from '@/data/site'
import { theme } from '@/data/theme'

export const alt = 'Case study'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)

  const from = project?.cover.art.from ?? theme.accent.tint
  const to = project?.cover.art.to ?? theme.accent.DEFAULT
  const title = project?.title ?? siteConfig.name
  const meta = project ? `${project.category} / ${project.year}` : siteConfig.role

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: `linear-gradient(135deg, ${from}, ${to})`,
          color: theme.ink,
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 4 }}>{meta.toUpperCase()}</div>
        <div style={{ display: 'flex', fontSize: 132, fontWeight: 700, letterSpacing: -5, lineHeight: 1, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28 }}>
          <div style={{ display: 'flex' }}>{siteConfig.name}</div>
          <div style={{ display: 'flex' }}>{siteConfig.role}</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
