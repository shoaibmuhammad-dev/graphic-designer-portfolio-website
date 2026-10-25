import { Artwork } from '@/components/ui/Artwork'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { CountUp } from '@/components/ui/CountUp'
import { Download } from '@/components/ui/Icons'
import { Label } from '@/components/ui/Label'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { siteConfig } from '@/data/site'

export default function About() {
  return (
    <section id="about" aria-label="About" className="scroll-mt-16 bg-surface py-24 md:py-40">
      <Container>
        <SectionHeading index="02" label="About" lines={['A designer who', 'starts with feeling']} />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-brand">
                <Artwork image={siteConfig.portrait} sizes="(min-width: 1024px) 40vw, 100vw" />
              </div>
              <Label className="mt-3 block">
                {siteConfig.name}, {siteConfig.city}
              </Label>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-heading text-2xl font-medium leading-snug tracking-tight md:text-3xl">
                {siteConfig.bio[0]}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-muted">{siteConfig.bio[1]}</p>
            </Reveal>

            <ul className="mt-12 border-t border-line">
              {siteConfig.values.map((v, i) => (
                <li key={v.title} className="grid gap-2 border-b border-line py-6 md:grid-cols-12 md:gap-6">
                  <Label className="md:col-span-1 md:pt-1.5">{String(i + 1).padStart(2, '0')}</Label>
                  <h3 className="font-heading text-xl font-medium tracking-tight md:col-span-4">{v.title}</h3>
                  <p className="font-body text-base leading-relaxed text-muted md:col-span-7">{v.text}</p>
                </li>
              ))}
            </ul>

            <Reveal className="mt-10">
              <Button href={siteConfig.cvPath} download variant="outline" magnetic>
                <Download width={18} height={18} />
                Download CV
              </Button>
            </Reveal>

            <dl className="mt-16 grid grid-cols-3 gap-4 border-t border-line pt-8">
              {siteConfig.facts.map((f) => (
                <div key={f.label}>
                  <dd className="font-heading text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-none tracking-tighter">
                    <CountUp value={f.value} suffix={f.suffix} />
                  </dd>
                  <dt className="mt-3 font-mono text-xs uppercase tracking-widest text-muted">{f.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  )
}
