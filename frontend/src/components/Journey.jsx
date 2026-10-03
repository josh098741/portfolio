import { motion, useScroll, useSpring } from 'framer-motion'
import {
  Building2,
  Gamepad2,
  Rocket,
  Smartphone,
  Sparkles,
} from 'lucide-react'
import { useRef } from 'react'
import { journey, profile } from '../data/portfolio'
import { usePrefersReducedMotion } from '../hooks'
import { Reveal, SectionHeading } from './primitives'

const ICONS = { Rocket, Building2, Smartphone, Gamepad2, Sparkles }

function TimelineItem({ item, index, total }) {
  const Icon = ICONS[item.icon] ?? Sparkles
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.25'],
  })
  const scale = useSpring(scrollYProgress, { stiffness: 120, damping: 26 })
  const isLast = index === total - 1

  return (
    <div ref={ref} className="relative pl-14 sm:pl-20">
      <div className="absolute top-1.5 left-[1.35rem] sm:left-[2.35rem] -translate-x-1/2">
        <span className="border-base-content/12 bg-base-200 relative z-10 grid size-9 place-items-center rounded-full border sm:size-11">
          <motion.span
            style={{ scale }}
            className="from-primary/25 to-secondary/25 absolute inset-0 rounded-full bg-gradient-to-br"
          />
          <Icon size={16} className="text-primary relative" />
        </span>
        {!isLast && (
          <span className="from-base-content/15 to-base-content/15 absolute top-9 left-1/2 h-[calc(100%+2.25rem)] w-px -translate-x-1/2 bg-gradient-to-b" />
        )}
      </div>

      <Reveal direction="right" amount={0.3}>
        <div className="glass group mb-5 rounded-2xl p-5 transition-all duration-500 hover:border-primary/30 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="border-primary/25 bg-primary/10 text-primary rounded-full border px-2.5 py-0.5 font-mono text-[0.65rem] tracking-wider uppercase">
              {item.period}
            </span>
          </div>
          <h3 className="font-display mt-3 text-lg font-semibold sm:text-xl">
            {item.title}
          </h3>
          <p className="text-base-content/60 mt-2 text-sm leading-relaxed sm:text-[0.95rem]">
            {item.body}
          </p>
        </div>
      </Reveal>
    </div>
  )
}

export function Journey() {
  const reduced = usePrefersReducedMotion()

  return (
    <section id="journey" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5">
        <SectionHeading
          eyebrow="Journey"
          title="From game mechanics to"
          accent="store listings"
          description={`A short history of how ${profile.firstName} ended up shipping Android apps under ${profile.studio}.`}
        />

        <div className="mt-16">
          {journey.map((item, index) => (
            <TimelineItem key={item.title} item={item} index={index} total={journey.length} />
          ))}
        </div>

        {!reduced && (
          <Reveal delay={0.1}>
            <p className="text-base-content/35 mt-6 pl-14 text-center font-mono text-xs tracking-[0.2em] uppercase sm:pl-20">
              and it does not stop here
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}