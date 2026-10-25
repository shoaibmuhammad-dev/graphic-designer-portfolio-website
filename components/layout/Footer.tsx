import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { siteConfig } from '@/data/site'
import BackToTop from './BackToTop'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-background">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-heading text-2xl font-medium tracking-tight">{siteConfig.name}</p>
            <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-muted">
              {siteConfig.role} in {siteConfig.city}. {siteConfig.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <Label className="mb-4 block">Pages</Label>
            <ul className="space-y-1">
              {[...siteConfig.nav, { label: 'All work', href: '/work' }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center font-body text-sm transition-colors hover:text-accent-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <Label className="mb-4 block">Elsewhere</Label>
            <ul className="space-y-1">
              {siteConfig.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center font-body text-sm transition-colors hover:text-accent-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <Label>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </Label>
          <BackToTop />
        </div>
      </Container>
    </footer>
  )
}
