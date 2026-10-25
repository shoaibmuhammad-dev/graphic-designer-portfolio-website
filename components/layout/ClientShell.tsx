'use client'

import dynamic from 'next/dynamic'
import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'
import { IntroProvider } from './IntroProvider'
import Preloader from './Preloader'
import SmoothScroll from './SmoothScroll'

// The cursor is desktop-only and not needed for first paint
const Cursor = dynamic(() => import('./Cursor'), { ssr: false })

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    // reducedMotion="user" disables transform/layout animations for people who prefer less motion
    <MotionConfig reducedMotion="user">
      <IntroProvider>
        <SmoothScroll />
        <Preloader />
        <Cursor />
        {children}
      </IntroProvider>
    </MotionConfig>
  )
}
