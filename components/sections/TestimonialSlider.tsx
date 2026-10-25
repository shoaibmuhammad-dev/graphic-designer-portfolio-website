'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { ArrowLeft, ArrowRight } from '@/components/ui/Icons'
import { Label } from '@/components/ui/Label'
import { cn } from '@/lib/utils'
import type { Testimonial } from '@/types'

export default function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [[index, dir], setState] = useState<[number, number]>([0, 1])
  const n = items.length
  const go = (d: number) => setState([(index + d + n) % n, d])
  const t = items[index]

  const btn =
    'flex size-12 items-center justify-center rounded-brand border border-ink/15 transition-colors hover:border-ink hover:bg-ink hover:text-background'

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Client testimonials">
      <div data-cursor="Drag" className="overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.figure
            key={index}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80 || info.velocity.x < -450) go(1)
              else if (info.offset.x > 80 || info.velocity.x > 450) go(-1)
            }}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${n}`}
            className="min-h-[18rem] select-none md:min-h-[20rem]"
          >
            <blockquote className="font-heading text-[clamp(1.5rem,3.4vw,3rem)] font-medium leading-[1.15] tracking-tight">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex flex-col gap-1">
              <span className="font-heading text-lg font-medium">{t.name}</span>
              <Label>
                {t.role}, {t.company}
              </Label>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-between gap-6 border-t border-line pt-6">
        <div className="flex items-center gap-4">
          <Label aria-hidden>
            {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </Label>
          <div className="flex">
            {items.map((item, i) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Show testimonial ${i + 1} from ${item.name}`}
                aria-current={i === index}
                onClick={() => setState([i, i > index ? 1 : -1])}
                className="flex size-11 items-center justify-center"
              >
                <span className={cn('h-px transition-all duration-300', i === index ? 'w-8 bg-ink' : 'w-4 bg-ink/25')} />
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous testimonial" className={btn} onClick={() => go(-1)}>
            <ArrowLeft />
          </button>
          <button type="button" aria-label="Next testimonial" className={btn} onClick={() => go(1)}>
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}
