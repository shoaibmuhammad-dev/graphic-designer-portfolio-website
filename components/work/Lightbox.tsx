'use client'

import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { Artwork } from '@/components/ui/Artwork'
import { ArrowLeft, ArrowRight, Close } from '@/components/ui/Icons'
import { Label } from '@/components/ui/Label'
import { getLenis } from '@/lib/lenis'
import { cn } from '@/lib/utils'
import type { ImageAsset } from '@/types'

const frame: Record<ImageAsset['aspect'], string> = {
  landscape: 'aspect-[16/10] w-[min(92vw,128vh)]',
  portrait: 'aspect-[4/5] w-[min(86vw,64vh)]',
  square: 'aspect-square w-[min(90vw,78vh)]',
  wide: 'aspect-[21/9] w-[min(92vw,1100px)]',
}

interface Props {
  images: ImageAsset[]
  index: number
  onClose: () => void
  onChange: (i: number) => void
}

export default function Lightbox({ images, index, onClose, onChange }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const image = images[index]
  const n = images.length

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    closeBtn.current?.focus()
    getLenis()?.stop()
    document.body.style.overflow = 'hidden'
    return () => {
      getLenis()?.start()
      document.body.style.overflow = ''
      opener?.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onChange((index + 1) % n)
      else if (e.key === 'ArrowLeft') onChange((index - 1 + n) % n)
      else if (e.key === 'Tab' && root.current) {
        // Simple focus trap
        const f = root.current.querySelectorAll<HTMLElement>('button')
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, n, onChange, onClose])

  const nav =
    'flex size-12 items-center justify-center rounded-brand border border-background/25 text-background transition-colors hover:bg-background hover:text-ink'

  return (
    <motion.div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-ink/95 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 md:p-6">
        <Label className="text-background/70">
          {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </Label>
        <button ref={closeBtn} type="button" onClick={onClose} aria-label="Close gallery" className={nav}>
          <Close />
        </button>
      </div>

      <div
        key={index}
        className={cn('relative overflow-hidden rounded-brand', frame[image.aspect])}
        onClick={(e) => e.stopPropagation()}
      >
        <Artwork image={image} sizes="92vw" />
      </div>
      <p className="mt-4 max-w-md text-center font-body text-sm text-background/70" aria-live="polite">
        {image.alt}
      </p>

      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-3 p-4 md:p-6" onClick={(e) => e.stopPropagation()}>
        <button type="button" aria-label="Previous image" className={nav} onClick={() => onChange((index - 1 + n) % n)}>
          <ArrowLeft />
        </button>
        <button type="button" aria-label="Next image" className={nav} onClick={() => onChange((index + 1) % n)}>
          <ArrowRight />
        </button>
      </div>
    </motion.div>
  )
}
