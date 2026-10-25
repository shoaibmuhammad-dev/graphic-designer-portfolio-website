import type { Metadata } from 'next'
import Contact from '@/components/sections/Contact'
import { JsonLd } from '@/components/ui/JsonLd'
import { siteConfig } from '@/data/site'
import { breadcrumbJsonLd } from '@/lib/jsonld'

const description = `Hire ${siteConfig.name}, a freelance graphic designer in ${siteConfig.city}, for branding, logo design, packaging or social media design. Send a message or reach out on WhatsApp.`

export const metadata: Metadata = {
  title: 'Contact',
  description,
  alternates: { canonical: '/contact' },
  openGraph: { type: 'website', title: `Contact | ${siteConfig.name}`, description, url: '/contact' },
  twitter: { card: 'summary_large_image', title: `Contact | ${siteConfig.name}`, description, images: ['/opengraph-image'] },
}

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <div className="pt-12 md:pt-16">
        <Contact as="h1" />
      </div>
    </>
  )
}
