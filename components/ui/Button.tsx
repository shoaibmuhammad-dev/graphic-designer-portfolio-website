'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { handleHashClick } from '@/lib/lenis'
import { cn } from '@/lib/utils'
import { Magnetic } from './Magnetic'

type Variant = 'primary' | 'outline' | 'accent'

const styles: Record<Variant, string> = {
  primary: 'bg-ink text-background hover:bg-accent hover:text-accent-onAccent',
  outline: 'border border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-background',
  accent: 'bg-accent text-accent-onAccent hover:bg-ink hover:text-background',
}

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-brand px-6 font-body text-sm font-medium transition-colors duration-300'

interface CommonProps {
  variant?: Variant
  magnetic?: boolean
  className?: string
  children: ReactNode
}
interface LinkProps extends CommonProps {
  href: string
  external?: boolean
  download?: boolean
  /** Called when an internal link is clicked (e.g. to close a menu) */
  onNavigate?: () => void
}
interface BtnProps extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  href?: undefined
}

export function Button(props: LinkProps | BtnProps) {
  const pathname = usePathname()
  const { variant = 'primary', magnetic = false, className, children } = props
  const classes = cn(base, styles[variant], className)

  let node: ReactNode
  if (props.href !== undefined) {
    const { href, external, download, onNavigate } = props
    node =
      external || download || href.startsWith('mailto:') ? (
        <a
          href={href}
          className={classes}
          download={download}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      ) : (
        <Link href={href} className={classes} onClick={(e) => {
            onNavigate?.()
            handleHashClick(e, href, pathname)
          }}
        >
          {children}
        </Link>
      )
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, magnetic: _m, className: _c, children: _ch, href: _h, ...rest } = props
    node = (
      <button type="button" className={classes} {...rest}>
        {children}
      </button>
    )
  }

  return magnetic ? <Magnetic>{node}</Magnetic> : node
}
