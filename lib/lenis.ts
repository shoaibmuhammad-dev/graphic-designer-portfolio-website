import type Lenis from 'lenis'
import type { MouseEvent } from 'react'

let instance: Lenis | null = null

export const setLenis = (l: Lenis | null) => {
  instance = l
}
export const getLenis = () => instance

/**
 * Smooth-scroll to in-page anchors ("/#work") when already on the home page.
 * Returns true if it handled the click.
 */
export function handleHashClick(e: MouseEvent, href: string, pathname: string) {
  if (!href.startsWith('/#') || pathname !== '/') return false
  const target = document.querySelector<HTMLElement>(href.slice(1))
  if (!target) return false
  e.preventDefault()
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(target)
  else target.scrollIntoView({ behavior: 'smooth' })
  window.history.pushState(null, '', href)
  return true
}

export function scrollToTop() {
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}
