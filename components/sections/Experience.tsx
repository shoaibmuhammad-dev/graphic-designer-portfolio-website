import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { experience } from '@/data/experience'
import type { Experience as Item } from '@/types'

function Timeline({ title, items }: { title: string; items: Item[] }) {
  return (
    <div>
      <Label className="mb-8 block">{title}</Label>
      <ol className="space-y-0 border-l border-line">
        {items.map((item) => (
          <li key={`${item.role}-${item.period}`} className="relative pb-10 pl-8 last:pb-0">
            <span aria-hidden className="absolute -left-[5px] top-2 size-[9px] rounded-full border border-ink bg-background" />
            <Reveal y={16}>
              <Label>{item.period}</Label>
              <h3 className="mt-2 font-heading text-xl font-medium tracking-tight md:text-2xl">{item.role}</h3>
              <p className="font-body text-base text-ink">{item.org}</p>
              <p className="mt-2 max-w-md font-body text-base leading-relaxed text-muted">{item.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" aria-label="Experience and education" className="scroll-mt-16 bg-surface py-24 md:py-40">
      <Container>
        <SectionHeading index="06" label="Experience" lines={['Where I’ve', 'worked and studied']} />
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          <Timeline title="Experience" items={experience.filter((e) => e.type === 'work')} />
          <Timeline title="Education" items={experience.filter((e) => e.type === 'education')} />
        </div>
      </Container>
    </section>
  )
}
