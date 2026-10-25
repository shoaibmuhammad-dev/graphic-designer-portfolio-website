'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

/**
 * Desktop-only custom cursor. Any element with data-cursor="Label" shows that label.
 * Links and buttons grow the dot. Not rendered on touch devices.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [label, setLabel] = useState<string | null>(null)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.4 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHidden(false)
    }
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(
        '[data-cursor], a, button, summary, [role="button"], input, textarea, select',
      )
      if (!el) {
        setHover(false)
        setLabel(null)
        setHidden(false)
        return
      }
      const isField = /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)
      setHidden(isField)
      setHover(!isField)
      setLabel(el.getAttribute('data-cursor'))
    }
    const leave = () => setHidden(true)

    window.addEventListener('pointermove', move)
    document.addEventListener('mouseover', over)
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('mouseover', over)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[150]"
    >
      <motion.div
        animate={{
          scale: label ? 6 : hover ? 2.6 : 1,
          opacity: hidden ? 0 : label ? 1 : hover ? 0.35 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        className="-ml-2 -mt-2 h-4 w-4 rounded-full bg-accent"
      />
      <span
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-xs uppercase tracking-widest text-accent-onAccent transition-opacity duration-200"
        style={{ opacity: label && !hidden ? 1 : 0 }}
      >
        {label}
      </span>
    </motion.div>
  )
}
