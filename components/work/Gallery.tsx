'use client'

import { AnimatePresence } from 'motion/react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Artwork } from '@/components/ui/Artwork'
import { Reveal } from '@/components/ui/Reveal'
import { aspectClass, cn } from '@/lib/utils'
import type { ImageAsset } from '@/types'

// Lightbox JS only loads when the first image is opened
const Lightbox = dynamic(() => import('./Lightbox'), { ssr: false })

export function Gallery({ images }: { images: ImageAsset[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
        {images.map((img, i) => (
          <li key={i} className={cn(img.span === 'full' && 'md:col-span-2')}>
            <Reveal>
              <button
                type="button"
                data-cursor="View"
                aria-label={`Open image ${i + 1} of ${images.length}: ${img.alt}`}
                onClick={() => setOpen(i)}
                className={cn(
                  'group relative block w-full overflow-hidden rounded-brand bg-surface',
                  aspectClass[img.aspect],
                  // keep two-up rows visually balanced
                  img.span !== 'full' && img.aspect === 'wide' && 'aspect-[16/10]',
                )}
              >
                <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-105">
                  <Artwork
                    image={img}
                    sizes={img.span === 'full' ? '(min-width: 1440px) 1360px, 100vw' : '(min-width: 768px) 50vw, 100vw'}
                  />
                </div>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open !== null && (
          <Lightbox images={images} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
        )}
      </AnimatePresence>
    </>
  )
}
