import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { CopyEmail } from '@/components/ui/CopyEmail'
import { WhatsApp } from '@/components/ui/Icons'
import { Label } from '@/components/ui/Label'
import { Reveal } from '@/components/ui/Reveal'
import { SplitText } from '@/components/ui/SplitText'
import { siteConfig } from '@/data/site'

// Form libraries (react-hook-form, zod) load in a separate chunk
const ContactForm = dynamic(() => import('./ContactForm'), {
  loading: () => <div className="min-h-[26rem] animate-pulse rounded-brand bg-surface" aria-hidden />,
})

export default function Contact({ as = 'h2' }: { as?: 'h1' | 'h2' }) {
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(siteConfig.whatsapp.message)}`

  return (
    <section id="contact" aria-label="Contact" className="scroll-mt-16 border-t border-line py-24 md:py-40">
      <Container>
        <div className="mb-8 flex items-center gap-4">
          <Label>08 / Contact</Label>
          <span className="h-px flex-1 bg-line" aria-hidden />
        </div>

        <SplitText
          as={as}
          lines={['Have a project', 'in mind?']}
          className="font-heading text-[clamp(3rem,10.5vw,10rem)] font-medium leading-[0.92] tracking-tighter"
        />

        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-20">
          <div className="space-y-10 lg:col-span-5">
            <Reveal>
              <p className="max-w-sm font-body text-lg leading-relaxed text-muted">
                Tell me what you&rsquo;re building, who it&rsquo;s for and when you need it. I reply to every message within two working days.
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <Label className="mb-3 block">Email</Label>
              <CopyEmail email={siteConfig.email} />
            </Reveal>

            <Reveal delay={0.1}>
              <Label className="mb-3 block">Prefer a quick chat?</Label>
              <Button href={whatsappHref} external variant="outline" magnetic>
                <WhatsApp width={20} height={20} />
                Message on WhatsApp
              </Button>
            </Reveal>

            <Reveal delay={0.15}>
              <Label className="mb-3 block">Find me online</Label>
              <ul className="flex flex-wrap gap-x-6">
                {siteConfig.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center font-body text-base underline decoration-line underline-offset-4 transition-colors hover:text-accent-ink hover:decoration-accent"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7">
            <div className="rounded-brand border border-line p-6 md:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
