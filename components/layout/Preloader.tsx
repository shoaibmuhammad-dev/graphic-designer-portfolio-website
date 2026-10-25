'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/data/site'
import { useIntro } from './IntroProvider'

const STORAGE_KEY = 'kz-seen'

/**
 * Short name animation (~1.5s). Skipped on repeat visits and with reduced motion.
 * The inline script in app/layout.tsx sets html[data-seen="1"], which hides this via CSS
 * before first paint so returning visitors never see a flash.
 */
export default function Preloader() {
  const { setReady } = useIntro()
  const [show, setShow] = useState(true)

  useEffect(() => {
    const seen = document.documentElement.dataset.seen === '1'
    if (seen) {
      setShow(false)
      setReady(true)
      return
    }
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {}
    const readyTimer = setTimeout(() => setReady(true), 1350)
    const hideTimer = setTimeout(() => setShow(false), 1500)
    return () => {
      clearTimeout(readyTimer)
      clearTimeout(hideTimer)
    }
  }, [setReady])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-label="Loading"
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-heading text-4xl font-medium tracking-tight md:text-6xl"
            >
              {siteConfig.name}
            </motion.p>
          </div>
          <div className="mt-6 h-px w-40 overflow-hidden bg-line">
            <motion.div
              className="h-full origin-left bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">
            {siteConfig.role}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
