'use client'

import { motion, type Variants } from 'motion/react'
import { createElement } from 'react'
import { useIntro } from '@/components/layout/IntroProvider'
import { cn } from '@/lib/utils'

const lineVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const wordVariants: Variants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

interface Props {
  /** Each string is one line; words inside a line are revealed one by one. */
  lines: string[]
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  lineClassName?: string
  /** Optional per-line classes (same order as `lines`) */
  lineClasses?: string[]
  /** Wait for the preloader (hero) instead of scroll-into-view */
  intro?: boolean
  delay?: number
}

/** Masked word-by-word reveal. The full text is exposed to screen readers via aria-label. */
export function SplitText({
  lines,
  as = 'h2',
  className,
  lineClassName,
  lineClasses,
  intro,
  delay = 0,
}: Props) {
  const { ready } = useIntro()
  const trigger = intro
    ? { animate: ready ? 'show' : 'hidden' }
    : { whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } }

  return createElement(
    as,
    { 'aria-label': lines.join(' '), className },
    <motion.span
      aria-hidden
      className="block"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: delay } },
      }}
      initial="hidden"
      {...trigger}
    >
      {lines.map((line, i) => {
        const words = line.split(' ')
        return (
          <motion.span
            key={i}
            variants={lineVariants}
            className={cn('block', lineClassName, lineClasses?.[i])}
          >
            {words.map((w, j) => (
              <span key={j} className="inline-block overflow-hidden pb-5 pr-1 align-bottom">
                <motion.span variants={wordVariants} className="inline-block">
                  {w}
                  {j < words.length - 1 ? '\u00A0' : ''}
                </motion.span>
              </span>
            ))}
          </motion.span>
        )
      })}
    </motion.span>,
  )
}
