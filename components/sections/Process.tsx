'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { processSteps } from '@/data/services'

function Step({
  index,
  total,
  progress,
  title,
  description,
}: {
  index: number
  total: number
  progress: MotionValue<number>
  title: string
  description: string
}) {
  const start = (index / total) * 0.82
  const dot = useTransform(progress, [start, start + 0.08], [0, 1])
  const text = useTransform(progress, [start - 0.05, start + 0.1], [0.3, 1])

  return (
    <li className="relative pb-16 last:pb-0 md:pb-24">
      <span
        aria-hidden
        className="absolute -left-12 top-2 flex size-8 items-center justify-center rounded-full border border-line bg-background md:-left-20 md:size-10"
      >
        <motion.span style={{ opacity: dot }} className="size-3 rounded-full bg-accent md:size-4" />
      </span>
      <motion.div style={{ opacity: text }} className="grid gap-4 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Label>Step {String(index + 1).padStart(2, '0')}</Label>
          <h3 className="mt-2 font-heading text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-none tracking-tight">
            {title}
          </h3>
        </div>
        <p className="max-w-lg font-body text-base leading-relaxed text-muted md:col-span-6 md:col-start-7 md:pt-8 md:text-lg">
          {description}
        </p>
      </motion.div>
    </li>
  )
}

export default function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 55%'] })

  return (
    <section id="process" aria-label="Process" className="scroll-mt-16 py-24 md:py-40">
      <Container>
        <SectionHeading index="05" label="Process" lines={['Four steps,', 'no surprises']} />

        <div className="relative pl-12 md:pl-20">
          <div aria-hidden className="absolute bottom-0 left-4 top-4 w-px bg-line md:left-5">
            <motion.div style={{ scaleY: scrollYProgress }} className="h-full origin-top bg-accent" />
          </div>
          <ol ref={ref}>
            {processSteps.map((s, i) => (
              <Step
                key={s.title}
                index={i}
                total={processSteps.length}
                progress={scrollYProgress}
                title={s.title}
                description={s.description}
              />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
