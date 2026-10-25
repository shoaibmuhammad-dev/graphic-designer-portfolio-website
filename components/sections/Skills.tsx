import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { skills, tools } from '@/data/skills'

export default function Skills() {
  return (
    <section id="skills" aria-label="Skills and tools" className="scroll-mt-16 py-24 md:py-40">
      <Container>
        <SectionHeading index="03" label="Skills & tools" lines={['What I do,', 'what I use']} />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Label className="mb-6 block">Design skills</Label>
            <ul className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <li key={s}>
                  <Reveal delay={i * 0.04} y={14}>
                    <span className="inline-flex min-h-11 items-center rounded-brand border border-line px-4 font-body text-sm transition-colors hover:border-accent hover:bg-accent-tint">
                      {s}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <Label className="mb-6 block">Tools</Label>
            <ul className="grid gap-px overflow-hidden rounded-brand border border-line bg-line sm:grid-cols-2">
              {tools.map((t) => (
                <li key={t.name} className="group flex items-center gap-4 bg-background p-5 transition-colors hover:bg-surface">
                  <span
                    aria-hidden
                    className="flex size-12 shrink-0 items-center justify-center rounded-brand border border-line font-mono text-sm font-medium transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-onAccent"
                  >
                    {t.short}
                  </span>
                  <div>
                    <p className="font-heading text-lg font-medium tracking-tight">{t.name}</p>
                    <p className="font-body text-sm text-muted">{t.use}</p>
                  </div>
                </li>
              ))}
              {tools.length % 2 === 1 && <li aria-hidden className="hidden bg-background sm:block" />}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
