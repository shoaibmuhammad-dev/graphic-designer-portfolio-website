import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import ClientShell from '@/components/layout/ClientShell'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import { JsonLd } from '@/components/ui/JsonLd'
import { siteConfig } from '@/data/site'
import { personJsonLd, websiteJsonLd } from '@/lib/jsonld'
import { cn } from '@/lib/utils'
import './globals.css'

// FONTS: change the family here (and nothing else) to restyle the whole site.
const heading = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading', display: 'swap' })
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

const title = `${siteConfig.name} | Freelance Graphic Designer in ${siteConfig.city}`

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
  colorScheme: 'light',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  keywords: [
    `graphic designer in ${siteConfig.city}`,
    'freelance graphic designer',
    'branding and logo design',
    'social media design',
    'packaging design',
    'brand identity designer',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: 'en_US',
    url: '/',
    title,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: siteConfig.description,
    images: ['/opengraph-image'],
  },
  robots: { index: true, follow: true },
  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined },
}

// Runs before first paint: marks repeat visitors / reduced-motion users so the preloader never flashes.
const seenScript = `try{if(matchMedia('(prefers-reduced-motion: reduce)').matches||localStorage.getItem('kz-seen'))document.documentElement.dataset.seen='1'}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(heading.variable, body.variable, mono.variable)}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: seenScript }} />
        <noscript>
          <style>{`.preloader{display:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only rounded-brand bg-ink px-4 py-3 font-body text-sm text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300]"
        >
          Skip to content
        </a>

        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />

        <ClientShell>
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          {/* <WhatsAppButton /> */}
        </ClientShell>

        {plausible && (
          <Script
            defer
            data-domain={plausible}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
