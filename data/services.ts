import type { ProcessStep, Service } from '@/types'

export const services: Service[] = [
  {
    title: 'Brand identity',
    description:
      'A complete visual system: logo, colour, typography, patterns and the rules that keep it consistent. Built so your team can use it without calling me every week.',
    deliverables: ['Logo suite', 'Colour & type system', 'Brand guidelines', 'Stationery'],
  },
  {
    title: 'Logo design',
    description:
      'A mark that works at favicon size and on a shop sign. Delivered with responsive variations and every file format you will ever be asked for.',
    deliverables: ['Primary mark', 'Responsive variants', 'Usage rules', 'Source files'],
  },
  {
    title: 'Social media design',
    description:
      'Templates and campaign visuals that look like one voice across every post, story and cover, with editable files your team can reuse.',
    deliverables: ['Campaign visuals', 'Story & reel templates', 'Highlight covers', 'Editable files'],
  },
  {
    title: 'Packaging',
    description:
      'Labels, boxes and pouches designed around real dielines and print limits. I brief printers early so what you approve on screen is what lands on the shelf.',
    deliverables: ['Dieline layouts', 'Label systems', 'Print-ready artwork', 'Mockups'],
  },
  {
    title: 'Illustration & motion',
    description:
      'Custom illustration, icons and short motion pieces that give a brand something to say beyond its logo. Hand-drawn warmth, digital precision.',
    deliverables: ['Spot illustrations', 'Icon sets', 'Logo animations', 'Social loops'],
  },
]

export const processSteps: ProcessStep[] = [
  {
    title: 'Discover',
    description:
      'We talk about your business, your audience and what you want people to feel. I research your market and collect references so we start from the same page.',
  },
  {
    title: 'Concept',
    description:
      'I sketch widely, then narrow to two or three directions with clear reasoning for each. You choose, we refine.',
  },
  {
    title: 'Design',
    description:
      'The chosen direction becomes a full system. You see work in progress at set checkpoints, with room for two focused rounds of feedback.',
  },
  {
    title: 'Deliver',
    description:
      'Organised final files, guidelines and a short handover call. I stay available afterwards for questions and small tweaks.',
  },
]
