import Link from 'next/link'
import { Artwork } from '@/components/ui/Artwork'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import type { Project } from '@/types'

export function NextProject({ project }: { project: Project }) {
  return (
    <section aria-label="Next project" className="border-t border-line bg-surface">
      <Link href={`/work/${project.slug}`} data-cursor="View" className="group relative block overflow-hidden">
        <Container className="relative py-20 md:py-36">
          <Label>Next project</Label>
          <p className="mt-6 max-w-[14ch] font-heading text-[clamp(2.5rem,9vw,8rem)] font-medium leading-[0.95] tracking-tighter transition-transform duration-500 ease-out group-hover:translate-x-3 md:max-w-[10ch]">
            {project.title}
          </p>
          <Label className="mt-6 block">
            {project.category} ({project.year})
          </Label>

          {/* Small preview on touch / narrow screens */}
          <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-brand md:hidden">
            <Artwork image={project.cover} sizes="100vw" />
          </div>
        </Container>

        {/* Large hover preview on desktop */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[6%] top-1/2 hidden aspect-[4/3] w-[36vw] max-w-[560px] -translate-y-1/2 rotate-3 scale-90 overflow-hidden rounded-brand opacity-0 transition duration-500 ease-out group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100 md:block"
        >
          <Artwork image={project.cover} sizes="36vw" />
        </div>
      </Link>
    </section>
  )
}
