import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] items-center pb-16 pt-32">
      <Container>
        <Label>Error / 404</Label>
        <h1 className="mt-6 font-heading text-[clamp(6rem,26vw,24rem)] font-medium leading-[0.85] tracking-tighter">
          404
        </h1>
        <p className="mt-8 max-w-md font-body text-lg leading-relaxed text-muted">
          This page doesn&rsquo;t exist or has moved. Head back home or browse the work.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/work" variant="outline">
            See all work
          </Button>
        </div>
      </Container>
    </section>
  )
}
