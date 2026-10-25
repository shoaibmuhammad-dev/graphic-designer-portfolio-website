import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Tiny neutral placeholder used while real images load. */
export const blurDataURL = `data:image/svg+xml;base64,${btoa(
  '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="5"><rect width="8" height="5" fill="#EDEDF1"/></svg>',
)}`

export const aspectClass = {
  landscape: 'aspect-[16/10]',
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  wide: 'aspect-[21/9]',
} as const
