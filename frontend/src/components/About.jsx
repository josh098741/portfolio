import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  ArrowUpRight,
  Award,
  Database,
  Gamepad2,
  Layers,
  MapPin,
  Sparkles,
  Smartphone,
  Zap,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { about, marqueeItems, profile, stats } from '../data/portfolio'
import { usePrefersReducedMotion } from '../hooks'
import { Reveal, SectionHeading, Stagger, StaggerItem, Tilt } from './primitives'

const ICONS = { Gamepad2, Layers, Smartphone, Zap, Database, Sparkles }

function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = usePrefersReducedMotion()
  const [display, setDisplay] = useState(() => (reduced ? value : 0))

  useEffect(() => {
    if (!inView || reduced) return
    let frame = 0
    const duration = 1500
    const start = performance.now()

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 4)
      setDisplay(Math.round(eased * value))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, reduced])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

export function Stats() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const reduced = usePrefersReducedMotion()
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [22, 0, -22])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92])

  return (
    <section ref={ref} className="relative overflow-hidden py-10">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          style={reduced ? undefined : { rotateX, scale, transformPerspective: 1400 }}
          className="glass grid grid-cols-2 gap-px overflow-hidden rounded-3xl lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="group hover:bg-base-content/4 relative px-5 py-8 text-center transition-colors duration-500"
            >
              <span className="from-primary/0 via-primary/25 to-primary/0 absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="text-gradient font-display text-3xl font-bold sm:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium">{stat.label}</p>
              <p className="text-base-content/40 mt-1 font-mono text-[0.68rem]">
                {stat.hint}
              </p>
              <span className="font-mono text-base-content/15 absolute top-3 right-4 text-[0.6rem]">
                0{i + 1}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function Marquee({ reverse = false }) {
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <div className="mask-fade-x relative flex overflow-hidden py-5">
      <div
        className={`flex w-max shrink-0 items-center gap-8 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {items.map((item, i) => (
          <div key={`${item}-${i}`} className="flex shrink-0 items-center gap-8">
            <span className="font-display text-base font-medium whitespace-nowrap text-base-content/45 sm:text-lg">
              {item}
            </span>
            <span className="bg-primary/50 size-1.5 shrink-0 rotate-45" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="About"
          title="I build things that"
          accent="actually ship"
          description={`${profile.studio} is my independent studio — a place where ideas become products people install, use and keep.`}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <div className="space-y-5">
              {about.paragraphs.map((text, i) => (
                <Reveal key={i} delay={i * 0.08} direction="left">
                  <p className="text-base-content/70 text-base leading-[1.75] sm:text-lg">
                    {text}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2} className="mt-8">
              <div className="glass flex flex-wrap items-center gap-3 rounded-2xl p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base-content/50 font-mono text-xs tracking-[0.16em] uppercase">
                    Currently learning
                  </span>
                  {about.learning.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.07, type: 'spring', stiffness: 260 }}
                      className="badge badge-outline badge-sm border-accent/35 text-accent"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.26} className="mt-6">
              <div className="flex flex-wrap gap-3">
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="VISIT"
                  className="btn btn-outline gap-2 rounded-full"
                >
                  <Sparkles size={15} />
                  {profile.studio}
                  <ArrowUpRight size={14} className="opacity-60" />
                </a>
                <a
                  href="#journey"
                  data-cursor="GO"
                  className="btn btn-ghost gap-2 rounded-full text-base-content/60"
                >
                  <Award size={15} />
                  The journey
                </a>
              </div>
            </Reveal>
          </div>

          <Stagger className="grid gap-3 sm:grid-cols-2" stagger={0.07}>
            {about.focus.map((item) => {
              const Icon = ICONS[item.icon] ?? Sparkles
              return (
                <StaggerItem key={item.title}>
                  <Tilt max={6} className="h-full">
                    <div
                      className="group glass relative h-full overflow-hidden rounded-2xl p-5 transition-all duration-500 hover:border-primary/30"
                      style={{ '--glare-x': '50%', '--glare-y': '50%', '--glare-opacity': '0' }}
                    >
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            'radial-gradient(340px circle at var(--glare-x) var(--glare-y), oklch(72% 0.19 258 / 0.1), transparent 62%)',
                        }}
                      />
                      <span className="border-primary/25 bg-primary/10 text-primary group-hover:border-primary/60 group-hover:bg-primary/20 inline-grid size-11 place-items-center rounded-xl border transition-all duration-400">
                        <Icon size={19} />
                      </span>
                      <h3 className="font-display mt-4 text-base font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-base-content/55 mt-1.5 text-sm leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </Tilt>
                </StaggerItem>
              )
            })}

            <StaggerItem>
              <div className="border-primary/20 from-primary/12 h-full rounded-2xl border bg-gradient-to-br to-transparent p-5">
                <span className="border-primary/25 bg-primary/10 text-primary inline-grid size-11 place-items-center rounded-xl border">
                  <MapPin size={19} />
                </span>
                <h3 className="font-display mt-4 text-base font-semibold">Based in Nairobi</h3>
                <p className="text-base-content/55 mt-1.5 text-sm leading-relaxed">
                  Working remotely across {profile.timezone}. Available for work anywhere.
                </p>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  )
}