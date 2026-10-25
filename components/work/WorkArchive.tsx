'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Label } from '@/components/ui/Label'
import { cn } from '@/lib/utils'
import type { Project, ProjectCategory } from '@/types'
import { ProjectCard } from './ProjectCard'

export function WorkArchive({
  projects,
  categories,
}: {
  projects: Project[]
  categories: ProjectCategory[]
}) {
  const [active, setActive] = useState<'All' | ProjectCategory>('All')
  const list = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          {(['All', ...categories] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={active === c}
              onClick={() => setActive(c)}
              className={cn(
                'min-h-11 rounded-brand border px-4 font-body text-sm transition-colors',
                active === c
                  ? 'border-ink bg-ink text-background'
                  : 'border-line text-muted hover:border-ink hover:text-ink',
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <Label role="status" aria-live="polite">
          ({String(list.length).padStart(2, '0')}) {list.length === 1 ? 'project' : 'projects'}
        </Label>
      </div>

      <motion.ul layout className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectCard
                project={p}
                aspect="aspect-[4/5]"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  )
}
