'use client'

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import Link from 'next/link'
import { useEffect, useRef, type ReactNode } from 'react'
import { useIntro } from '@/components/layout/IntroProvider'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { SplitText } from '@/components/ui/SplitText'
import { siteConfig } from '@/data/site'
import { handleHashClick } from '@/lib/lenis'
import { cn } from '@/lib/utils'

/** Scroll parallax (outer) + mouse-follow (inner). Both transform-only. */
function Floating({
  progress,
  mx,
  my,
  scroll,
  mouse,
  className,
  children,
}: {
  progress: MotionValue<number>
  mx: MotionValue<number>
  my: MotionValue<number>
  scroll: number
  mouse: number
  className?: string
  children: ReactNode
}) {
  const y = useTransform(progress, [0, 1], [0, scroll])
  const x2 = useTransform(mx, [-0.5, 0.5], [-mouse, mouse])
  const y2 = useTransform(my, [-0.5, 0.5], [-mouse, mouse])
  return (
    <motion.div aria-hidden style={{ y }} className={cn('pointer-events-none absolute', className)}>
      <motion.div style={{ x: x2, y: y2 }}>{children}</motion.div>
    </motion.div>
  )
}

function IntroFade({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const { ready } = useIntro()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const mx = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const my = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [mouseX, mouseY])

  const shared = { progress: scrollYProgress, mx, my }

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-8 pt-28 md:pb-10 md:pt-36"
    >
      {/* Grid lines */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.line)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.line)_1px,transparent_1px)] bg-[size:72px_72px] opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />

      {/* Floating design elements */}
      <Floating {...shared} scroll={-160} mouse={40} className="-right-24 top-16 md:-right-10">
        <div className="size-[22rem] rounded-full bg-[radial-gradient(circle_at_30%_30%,theme(colors.accent.DEFAULT),transparent_68%)] opacity-30 blur-2xl md:size-[34rem]" />
      </Floating>
      <Floating
        {...shared}
        scroll={-90}
        mouse={-28}
        className="left-[6%] top-[22%] hidden sm:block"
      >
        <div className="size-20 rotate-12 animate-float rounded-brand border border-accent/70" />
      </Floating>
      <Floating
        {...shared}
        scroll={-220}
        mouse={24}
        className="bottom-[26%] right-[12%] hidden md:block"
      >
        <div className="relative size-56">
          <div className="absolute inset-0 animate-spinSlow rounded-full border border-dashed border-ink/20" />
          <div className="absolute inset-8 rounded-full border border-ink/10" />
          <div className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
        </div>
      </Floating>
      <Floating
        {...shared}
        scroll={70}
        mouse={-18}
        className="bottom-[34%] left-[40%] hidden lg:block"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          className="text-ink/40"
          fill="none"
          stroke="currentColor"
          aria-hidden
        >
          <path d="M14 2v24M2 14h24" />
        </svg>
      </Floating>

      <Container className="relative">
        <IntroFade className="flex items-center justify-between gap-4">
          <Label>(Portfolio {new Date().getFullYear()})</Label>
          <Label>{siteConfig.location}</Label>
        </IntroFade>

        <SplitText
          as="h1"
          intro
          delay={0.1}
          lines={[siteConfig.name, siteConfig.role]}
          className="mt-8 pb-2 font-heading text-[clamp(3.5rem,12.5vw,12.5rem)] font-medium leading-[0.9] tracking-tighter"
          lineClasses={['', 'text-muted']}
        />
      </Container>

      <Container className="relative mt-10 pb-10">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <IntroFade delay={0.5} className="md:col-span-6 lg:col-span-5">
            <p className="max-w-md font-body text-lg leading-relaxed md:text-xl">
              {siteConfig.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/#work" magnetic>
                See selected work
              </Button>
              <Button href="/#contact" variant="outline">
                Start a project
              </Button>
            </div>
          </IntroFade>

          <IntroFade delay={0.65} className="md:col-span-4 lg:col-span-4 lg:col-start-7">
            {siteConfig.availability.open && (
              <div className="inline-flex min-h-11 items-center gap-3 rounded-brand border border-line bg-background/80 px-4 backdrop-blur">
                <span className="relative flex size-2.5" aria-hidden>
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-xs uppercase tracking-widest">
                  {siteConfig.availability.label}
                </span>
              </div>
            )}
            <p className="mt-5 max-w-xs font-heading text-lg font-medium leading-snug tracking-tight text-muted">
              {siteConfig.tagline}
            </p>
          </IntroFade>

          <IntroFade delay={0.8} className="hidden justify-self-end md:col-span-2 md:block">
            <Link
              href="/#work"
              onClick={(e) => handleHashClick(e, '/#work', '/')}
              aria-label="Scroll to selected work"
              className="group flex min-h-11 items-center gap-3"
            >
              <Label>Scroll</Label>
              <span className="relative block h-14 w-px overflow-hidden bg-line">
                <span className="absolute inset-0 animate-scrollLine bg-ink" />
              </span>
            </Link>
          </IntroFade>
        </div>
      </Container>
    </section>
  )
}
