const items = ['Branding', 'Logo design', 'Packaging', 'Social media', 'Illustration', 'Motion']

function Group({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-10 pr-10 group-hover:[animation-play-state:paused]"
    >
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-10">
          <span
            className={`whitespace-nowrap font-heading text-[clamp(2rem,5vw,4.25rem)] font-medium tracking-tight ${
              i % 2 ? 'text-muted' : 'text-ink'
            }`}
          >
            {item}
          </span>
          <svg width="22" height="22" viewBox="0 0 24 24" className="shrink-0 text-accent" aria-hidden>
            <path fill="currentColor" d="M12 0c.7 6.6 5.4 11.3 12 12-6.6.7-11.3 5.4-12 12-.7-6.6-5.4-11.3-12-12C6.6 11.3 11.3 6.6 12 0Z" />
          </svg>
        </li>
      ))}
    </ul>
  )
}

export default function Marquee() {
  return (
    <section aria-label="Services at a glance" className="group overflow-hidden border-y border-line bg-surface py-6 md:py-8">
      <div className="flex">
        <Group />
        <Group hidden />
      </div>
    </section>
  )
}
