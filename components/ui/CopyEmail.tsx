'use client'

import { useState } from 'react'
import { Check, Copy } from './Icons'

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      // Fallback for older browsers / insecure contexts
      const el = document.createElement('textarea')
      el.value = email
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      el.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={`mailto:${email}`}
        className="break-all font-heading text-2xl font-medium tracking-tight underline decoration-line decoration-1 underline-offset-8 transition-colors hover:decoration-accent md:text-3xl"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Email copied' : 'Copy email address'}
        className="inline-flex size-12 items-center justify-center rounded-brand border border-ink/15 transition-colors hover:border-ink hover:bg-ink hover:text-background"
      >
        {copied ? <Check className="text-accent-ink" /> : <Copy />}
      </button>
      <span role="status" aria-live="polite" className="font-mono text-xs uppercase tracking-widest text-accent-ink">
        {copied ? 'Copied' : ''}
      </span>
    </div>
  )
}
