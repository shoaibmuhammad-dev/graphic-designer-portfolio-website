'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import Link from 'next/link'
import { Artwork } from '@/components/ui/Artwork'
import { Label } from '@/components/ui/Label'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

interface Props {
  project: Project
  className?: string
  aspect?: string
  sizes?: string
}

export function ProjectCard({
  project,
  className,
  aspect = 'aspect-[4/3]',
  sizes = '(min-width: 1024px) 50vw, 100vw',
}: Props) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 180, damping: 18 })
  const sry = useSpring(ry, { stiffness: 180, damping: 18 })

  return (
    <article className={className}>
      <Link
        href={`/work/${project.slug}`}
        data-cursor="View"
        aria-label={`${project.title}, ${project.category}, ${project.year}. View case study`}
        className="group block"
      >
        <motion.div
          style={{ rotateX: srx, rotateY: sry, transformPerspective: 1200 }}
          onPointerMove={(e) => {
            if (e.pointerType !== 'mouse') return
            const r = e.currentTarget.getBoundingClientRect()
            ry.set(((e.clientX - r.left) / r.width - 0.5) * 6)
            rx.set(-((e.clientY - r.top) / r.height - 0.5) * 6)
          }}
          onPointerLeave={() => {
            rx.set(0)
            ry.set(0)
          }}
        >
          {/* Reveal on scroll: clip-path wipe, once */}
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className={cn('relative overflow-hidden rounded-brand bg-surface', aspect)}>
              <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-105">
                <Artwork image={project.cover} sizes={sizes} />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading text-xl font-medium tracking-tight transition-colors group-hover:text-accent-ink md:text-2xl">
              {project.title}
            </h3>
            <Label className="mt-1 block">{project.category}</Label>
          </div>
          <Label className="pt-2">({project.year})</Label>
        </div>
      </Link>
    </article>
  )
}
