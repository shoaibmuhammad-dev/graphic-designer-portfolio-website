import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { siteConfig } from '@/data/site'
import { rateLimit } from '@/lib/rate-limit'
import { contactSchema } from '@/lib/schema'

export const runtime = 'nodejs'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export async function POST(req: Request) {
  // 1. Rate limit by IP
  const ip = (req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown').split(',')[0].trim()
  const limit = rateLimit(ip)
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many messages. Please try again in a few minutes.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    )
  }

  // 2. Parse + validate on the server (never trust the client)
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Please check the highlighted fields.', fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    )
  }
  const data = parsed.data

  // 3. Honeypot: pretend success so bots learn nothing
  if (data.website && data.website.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  // 4. Send with Resend
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email
  const from = process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>'

  if (!apiKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[contact] RESEND_API_KEY is not set. Logging enquiry instead:\n', data)
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json(
      { ok: false, error: `The form is temporarily unavailable. Please email ${siteConfig.email}.` },
      { status: 503 },
    )
  }

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New enquiry from ${data.name}: ${data.projectType}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Project type: ${data.projectType}`,
        `Budget: ${data.budget}`,
        '',
        data.message,
      ].join('\n'),
      html: `
        <div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.6;color:#0B0B0F">
          <h2 style="margin:0 0 16px">New enquiry from ${esc(data.name)}</h2>
          <p><strong>Email:</strong> <a href="mailto:${esc(data.email)}">${esc(data.email)}</a></p>
          <p><strong>Project type:</strong> ${esc(data.projectType)}</p>
          <p><strong>Budget:</strong> ${esc(data.budget)}</p>
          <hr style="border:none;border-top:1px solid #E4E4E9;margin:20px 0" />
          <p style="white-space:pre-wrap">${esc(data.message)}</p>
        </div>`,
    })
    if (error) {
      console.error('[contact] Resend error:', error)
      return NextResponse.json({ ok: false, error: 'Could not send your message. Please try again.' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
