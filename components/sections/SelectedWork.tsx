import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { featuredProjects } from '@/data/projects'
import { ProjectCard } from '@/components/work/ProjectCard'

// Asymmetric bento-style layout: column span, aspect ratio and vertical offset per card
const layout = [
  { span: 'md:col-span-7', aspect: 'aspect-[4/3]', offset: '', sizes: '(min-width: 768px) 58vw, 100vw' },
  { span: 'md:col-span-5', aspect: 'aspect-[4/5]', offset: 'md:mt-28', sizes: '(min-width: 768px) 42vw, 100vw' },
  { span: 'md:col-span-5', aspect: 'aspect-[4/5]', offset: '', sizes: '(min-width: 768px) 42vw, 100vw' },
  { span: 'md:col-span-7', aspect: 'aspect-[4/3]', offset: 'md:mt-28', sizes: '(min-width: 768px) 58vw, 100vw' },
  { span: 'md:col-span-6', aspect: 'aspect-[16/11]', offset: '', sizes: '(min-width: 768px) 50vw, 100vw' },
  { span: 'md:col-span-6', aspect: 'aspect-[16/11]', offset: 'md:mt-20', sizes: '(min-width: 768px) 50vw, 100vw' },
]

export default function SelectedWork() {
  return (
    <section id="work" aria-label="Selected work" className="scroll-mt-16 py-24 md:py-40">
      <Container>
        <SectionHeading index="01" label="Work" lines={['Selected', 'work']} />

        <div className="grid items-start gap-x-6 gap-y-14 md:grid-cols-12 md:gap-y-20">
          {featuredProjects.map((project, i) => {
            const l = layout[i % layout.length]
            return (
              <ProjectCard
                key={project.slug}
                project={project}
                className={`${l.span} ${l.offset}`}
                aspect={l.aspect}
                sizes={l.sizes}
              />
            )
          })}
        </div>

        <Reveal className="mt-16 flex justify-center md:mt-24">
          <Button href="/work" variant="outline" magnetic>
            View all projects
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
