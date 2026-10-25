'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { Check } from '@/components/ui/Icons'
import { budgets, contactSchema, projectTypes, type ContactInput } from '@/lib/schema'
import { cn } from '@/lib/utils'

const field =
  'min-h-12 w-full rounded-brand border bg-background px-4 font-body text-base transition-colors placeholder:text-subtle focus:border-ink focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 font-body text-sm text-[#C62828]">
          {error}
        </p>
      )}
    </div>
  )
}

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '', website: '' },
  })

  async function onSubmit(data: ContactInput) {
    setStatus('idle')
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok) {
        setStatus('success')
        reset()
        return
      }
      if (res.status === 422 && json.fieldErrors) {
        for (const [key, msgs] of Object.entries(json.fieldErrors as Record<string, string[]>)) {
          if (msgs?.[0]) setError(key as keyof ContactInput, { message: msgs[0] })
        }
      }
      setServerError(json.error ?? 'Something went wrong. Please try again or email me directly.')
      setStatus('error')
    } catch {
      setServerError('Network error. Check your connection and try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="flex min-h-[26rem] flex-col items-start justify-center gap-6">
        <span className="flex size-14 items-center justify-center rounded-brand bg-accent text-accent-onAccent">
          <Check width={26} height={26} />
        </span>
        <h3 className="font-heading text-3xl font-medium tracking-tight">Message sent.</h3>
        <p className="max-w-sm font-body text-base leading-relaxed text-muted">
          Thank you. I read every message myself and will reply within two working days.
        </p>
        <Button variant="outline" onClick={() => setStatus('idle')}>
          Send another message
        </Button>
      </div>
    )
  }

  const invalid = (k: keyof ContactInput) => !!errors[k]
  const border = (k: keyof ContactInput) => (invalid(k) ? 'border-[#C62828]' : 'border-line')
  const aria = (k: keyof ContactInput) => ({
    'aria-invalid': invalid(k),
    'aria-describedby': invalid(k) ? `${k}-error` : undefined,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-6" aria-label="Contact form">
      {/* Honeypot: hidden from people and assistive tech, bots fill it in */}
      <div aria-hidden className="absolute -left-[9999px] top-auto size-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name?.message}>
          <input id="name" type="text" autoComplete="name" className={cn(field, border('name'))} {...aria('name')} {...register('name')} />
        </Field>
        <Field id="email" label="Email" error={errors.email?.message}>
          <input id="email" type="email" autoComplete="email" inputMode="email" className={cn(field, border('email'))} {...aria('email')} {...register('email')} />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="projectType" label="Project type" error={errors.projectType?.message}>
          <select id="projectType" defaultValue="" className={cn(field, border('projectType'))} {...aria('projectType')} {...register('projectType')}>
            <option value="" disabled>
              Select one
            </option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field id="budget" label="Budget range" error={errors.budget?.message}>
          <select id="budget" defaultValue="" className={cn(field, border('budget'))} {...aria('budget')} {...register('budget')}>
            <option value="" disabled>
              Select one
            </option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Tell me about the project" error={errors.message?.message}>
        <textarea
          id="message"
          rows={6}
          placeholder="What are you making, who is it for, and when do you need it?"
          className={cn(field, 'resize-y py-3', border('message'))}
          {...aria('message')}
          {...register('message')}
        />
      </Field>

      {status === 'error' && (
        <p role="alert" className="rounded-brand border border-[#C62828]/30 bg-[#C62828]/5 px-4 py-3 font-body text-sm text-[#C62828]">
          {serverError}
        </p>
      )}

      <Button type="submit" variant="accent" disabled={isSubmitting} aria-busy={isSubmitting} className="w-full sm:w-auto disabled:opacity-60">
        {isSubmitting ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}
