import dynamic from 'next/dynamic'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { testimonials } from '@/data/testimonials'

// Slider code is split into its own chunk
const TestimonialSlider = dynamic(() => import('./TestimonialSlider'))

export default function Testimonials() {
  return (
    <section id="testimonials" aria-label="Testimonials" className="scroll-mt-16 py-24 md:py-40">
      <Container>
        <SectionHeading index="07" label="Kind words" lines={['What clients', 'say']} />
        <div className="max-w-5xl">
          <TestimonialSlider items={testimonials} />
        </div>
      </Container>
    </section>
  )
}
