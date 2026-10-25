'use client'

import { ArrowUp } from '@/components/ui/Icons'
import { scrollToTop } from '@/lib/lenis'

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="group inline-flex min-h-11 items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-ink"
    >
      Back to top
      <span className="flex size-9 items-center justify-center rounded-brand border border-line transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-background">
        <ArrowUp width={16} height={16} />
      </span>
    </button>
  )
}
