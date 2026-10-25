import type { Metadata } from 'next'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Experience from '@/components/sections/Experience'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import Process from '@/components/sections/Process'
import SelectedWork from '@/components/sections/SelectedWork'
import Services from '@/components/sections/Services'
import Skills from '@/components/sections/Skills'
import Testimonials from '@/components/sections/Testimonials'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <SelectedWork />
      <About />
      <Skills />
      <Services />
      <Process />
      <Experience />
      <Testimonials />
      <Contact />
    </>
  )
}
