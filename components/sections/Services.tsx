'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Plus } from '@/components/ui/Icons'
import { Label } from '@/components/ui/Label'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { services } from '@/data/services'
import { cn } from '@/lib/utils'

export default function Services() {
  const [active, setActive] = useState(0)

  return (
    <section id="services" aria-label="Services" className="scroll-mt-16 bg-surface py-24 md:py-40">
      <Container>
        <SectionHeading index="04" label="Services" lines={['How I can', 'help']} />

        <ul className="border-t border-line">
          {services.map((s, i) => {
            const open = active === i
            return (
              <li
                key={s.title}
                className="border-b border-line"
                onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
              >
                <h3>
                  <button
                    type="button"
                    id={`service-btn-${i}`}
                    aria-expanded={open}
                    aria-controls={`service-panel-${i}`}
                    onClick={() => setActive(i)}
                    className="flex min-h-14 w-full items-center justify-between gap-6 py-6 text-left md:py-9"
                  >
                    <span className="flex items-baseline gap-4 md:gap-8">
                      <Label>{String(i + 1).padStart(2, '0')}</Label>
                      <span
                        className={cn(
                          'font-heading text-[clamp(1.75rem,4.5vw,3.75rem)] font-medium leading-tight tracking-tight transition-[transform,color] duration-500',
                          open ? 'translate-x-2 text-ink md:translate-x-4' : 'text-muted',
                        )}
                      >
                        {s.title}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        'flex size-11 shrink-0 items-center justify-center rounded-brand border transition-[transform,background-color,border-color] duration-500',
                        open ? 'rotate-45 border-accent bg-accent text-accent-onAccent' : 'border-line',
                      )}
                    >
                      <Plus />
                    </span>
                  </button>
                </h3>

                <div
                  id={`service-panel-${i}`}
                  role="region"
                  aria-labelledby={`service-btn-${i}`}
                  inert={!open}
                  className={cn(
                    'grid transition-[grid-template-rows,opacity] duration-500 ease-out',
                    open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-6 pb-9 md:grid-cols-12 md:pl-[4.25rem]">
                      <p className="font-body text-base leading-relaxed text-muted md:col-span-6">{s.description}</p>
                      <ul className="flex flex-wrap content-start gap-2 md:col-span-5 md:col-start-8">
                        {s.deliverables.map((d) => (
                          <li
                            key={d}
                            className="rounded-brand border border-line bg-background px-3 py-2 font-mono text-xs uppercase tracking-widest"
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
