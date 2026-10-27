import Image from 'next/image'
import type { ArtSpec, ImageAsset } from '@/types'
import { blurDataURL, cn } from '@/lib/utils'

function Shapes({ art }: { art: ArtSpec }) {
  const s = art.shape
  switch (art.variant) {
    case 'orbit':
      return (
        <g fill="none" stroke={s} strokeWidth="1.5">
          <circle cx="200" cy="200" r="170" opacity=".35" />
          <circle cx="200" cy="200" r="120" opacity=".55" />
          <circle cx="200" cy="200" r="70" opacity=".8" />
          <circle cx="200" cy="200" r="34" fill={s} stroke="none" />
          <circle cx="330" cy="104" r="12" fill={s} stroke="none" />
        </g>
      )
    case 'blocks':
      return (
        <g fill={s}>
          <rect x="60" y="70" width="150" height="150" rx="14" opacity=".9" />
          <rect x="170" y="150" width="170" height="170" rx="14" opacity=".35" />
          <rect x="250" y="50" width="70" height="70" rx="14" opacity=".6" />
        </g>
      )
    case 'grid':
      return (
        <g>
          <g stroke={s} strokeWidth="1" opacity=".35">
            {[50, 100, 150, 200, 250, 300, 350].flatMap((p) => [
              <line key={`v${p}`} x1={p} y1="0" x2={p} y2="400" />,
              <line key={`h${p}`} x1="0" y1={p} x2="400" y2={p} />,
            ])}
          </g>
          <path d="M100 300A150 150 0 0 1 250 150L250 300Z" fill={s} opacity=".9" />
          <circle cx="300" cy="100" r="28" fill="none" stroke={s} strokeWidth="1.5" />
        </g>
      )
    case 'arcs':
      return (
        <g fill={s}>
          <path d="M40 300a80 80 0 0 1 160 0Z" opacity=".95" />
          <path d="M200 300a80 80 0 0 1 160 0Z" opacity=".5" />
          <path d="M100 220a80 80 0 0 1 160 0Z" opacity=".7" />
          <circle cx="300" cy="110" r="36" opacity=".9" />
        </g>
      )
    case 'waves':
      return (
        <g fill="none" stroke={s} strokeWidth="2" strokeLinecap="round">
          {[120, 160, 200, 240, 280].map((y, i) => (
            <path
              key={y}
              d={`M-20 ${y} C 60 ${y - 50}, 120 ${y + 50}, 200 ${y} S 340 ${y - 50}, 420 ${y}`}
              opacity={0.3 + i * 0.15}
            />
          ))}
          <circle cx="300" cy="90" r="22" fill={s} stroke="none" />
        </g>
      )
    case 'type':
      return (
        <text
          x="200"
          y="300"
          textAnchor="middle"
          fontSize={art.text && art.text.length > 1 ? 150 : 150}
          fontWeight="700"
          fontFamily="var(--font-heading), sans-serif"
          fill={s}
          letterSpacing="-10"
        >
          {art.text ?? 'A'}
        </text>
      )
  }
}

interface Props {
  image: ImageAsset
  className?: string
  sizes?: string
  priority?: boolean
}

/**
 * Renders a real image when `image.src` is set, otherwise generated gradient artwork.
 * The parent must be `relative` and have a size or aspect ratio.
 */
export function Artwork({ image, className, sizes = '100vw', priority }: Props) {
  if (image.src) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={blurDataURL}
        className={cn('object-cover', className)}
      />
    )
  }
  const { art } = image
  return (
    <div
      role="img"
      aria-label={image.alt}
      className={cn('absolute inset-0', className)}
      style={{ backgroundImage: `linear-gradient(135deg, ${art.from}, ${art.to})` }}
    >
      <svg
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden
      >
        <Shapes art={art} />
      </svg>
    </div>
  )
}
