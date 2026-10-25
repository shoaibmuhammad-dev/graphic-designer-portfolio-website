import { WhatsApp } from '@/components/ui/Icons'
import { siteConfig } from '@/data/site'
import Link from 'next/link'

export default function WhatsAppButton() {
  const href = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(siteConfig.whatsapp.message)}`

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with me on WhatsApp"
      className="group fixed bottom-5 right-5 z-[70] flex size-14 items-center justify-center rounded-full bg-green-600 text-background shadow-lg shadow-ink/20 transition-colors"
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-green-400 [animation-duration:2.8s]"
      />
      <WhatsApp width={26} height={26} />
      <span
        role="tooltip"
        className="pointer-events-none absolute right-full mr-3 translate-x-1 whitespace-nowrap rounded-brand bg-black px-3 py-2 font-body text-xs text-background opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
      >
        Chat on WhatsApp
      </span>
    </Link>
  )
}
