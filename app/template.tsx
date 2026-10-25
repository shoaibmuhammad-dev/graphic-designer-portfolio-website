'use client'

import { motion } from 'motion/react'
import { useEffect, type ReactNode } from 'react'

// Server render + first client render show content immediately (good for LCP).
// Later route changes fade/slide in. (Templates remount on every navigation.)
let hasNavigated = false

export default function Template({ children }: { children: ReactNode }) {
  const skip = !hasNavigated
  useEffect(() => {
    hasNavigated = true
  }, [])

  return (
    <motion.div
      initial={skip ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
