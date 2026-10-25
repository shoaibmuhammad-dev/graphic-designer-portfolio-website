import { Label } from './Label'
import { SplitText } from './SplitText'

interface Props {
  index: string
  label: string
  lines: string[]
  as?: 'h1' | 'h2'
}

/** Mono label row with a hairline, followed by a large split-text title. */
export function SectionHeading({ index, label, lines, as = 'h2' }: Props) {
  return (
    <header className="mb-12 md:mb-20">
      <div className="mb-8 flex items-center gap-4">
        <Label>
          {index} / {label}
        </Label>
        <span className="h-px flex-1 bg-line" aria-hidden />
      </div>
      <SplitText
        as={as}
        lines={lines}
        className="font-heading text-[clamp(2.25rem,6.5vw,5.5rem)] font-medium leading-[1] tracking-tight"
      />
    </header>
  )
}
