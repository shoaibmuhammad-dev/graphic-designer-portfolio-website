import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

/** Small monospace label, e.g. "01 / WORK" or "(2026)". */
export function Label({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('font-mono text-xs uppercase tracking-widest text-muted', className)}
      {...props}
    />
  )
}
