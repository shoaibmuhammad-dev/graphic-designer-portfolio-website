'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { siteConfig } from '@/data/site'
import { getLenis, handleHashClick } from '@/lib/lenis'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const { scrollY } = useScroll()

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(latest > 24)
    setHidden(latest > prev && latest > 140 && !open)
  })

  // Close menu on route change; lock scroll + Esc to close while open
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    getLenis()?.stop()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      getLenis()?.start()
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-100%' : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-[60] transition-colors duration-300',
          scrolled || open
            ? 'border-b border-line bg-background/85 backdrop-blur-md'
            : 'border-b border-transparent',
        )}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-10"
        >
          <Link
            href="/"
            aria-label={`${siteConfig.name} - home`}
            className="group flex min-h-11 items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <span className="flex size-10 items-center justify-center rounded-brand bg-ink font-heading text-sm font-semibold text-background transition-colors group-hover:bg-accent group-hover:text-accent-onAccent">
              {siteConfig.monogram}
            </span>
            <span className="hidden font-heading text-base font-medium tracking-tight sm:block">
              {siteConfig.name}
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={(e) => handleHashClick(e, item.href, pathname)}
                  className="inline-flex min-h-11 items-center px-4 font-body text-sm text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="ml-3">
              <Button href="/#contact" magnetic>
                Let&rsquo;s talk
              </Button>
            </li>
          </ul>

          <button
            ref={toggleRef}
            type="button"
            className="relative flex size-11 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={cn(
                'absolute h-px w-6 bg-ink transition-transform duration-300',
                open ? 'rotate-45' : '-translate-y-[5px]',
              )}
            />
            <span
              className={cn(
                'absolute h-px w-6 bg-ink transition-transform duration-300',
                open ? '-rotate-45' : 'translate-y-[5px]',
              )}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col justify-between bg-background px-5 pb-10 pt-28 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-1">
              {siteConfig.nav.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        setOpen(false)
                        handleHashClick(e, item.href, pathname)
                      }}
                      className="flex min-h-14 items-baseline gap-4 py-2 font-heading text-5xl font-medium tracking-tight"
                    >
                      <Label className="w-6">{String(i + 1).padStart(2, '0')}</Label>
                      {item.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <Button href="/#contact" className="w-full" onNavigate={() => setOpen(false)}>
                Let&rsquo;s talk
              </Button>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {siteConfig.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-widest text-muted"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
