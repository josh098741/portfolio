import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Braces, Gamepad2, Server, Smartphone } from 'lucide-react'
import { useRef, useState } from 'react'
import { stack } from '../data/portfolio'
import { usePrefersReducedMotion } from '../hooks'
import { Reveal, SectionHeading } from './primitives'

const ICONS = { Braces, Smartphone, Server, Gamepad2 }

function TechChip({ tech, index, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.45,
        delay: index * 0.055,
        type: 'spring',
        stiffness: 280,
        damping: 20,
      }}
      className="group bg-base-100/60 border-base-content/10 hover:border-primary/40 hover:bg-base-100 relative flex items-center gap-2 rounded-xl border px-3.5 py-2 transition-colors duration-300"
    >
      <span
        className={`size-1.5 rounded-full ${accent} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
      />
      <span className="font-mono text-sm whitespace-nowrap">{tech}</span>
    </motion.div>
  )
}

function CategoryCard({ category, index }) {
  const Icon = ICONS[category.icon] ?? Braces

  return (
    <Reveal delay={index * 0.1} className="h-full">
      <div className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:border-primary/30">
        <div
          aria-hidden
          className="bg-primary/0 group-hover:bg-primary/8 pointer-events-none absolute -top-16 -right-16 size-40 rounded-full blur-2xl transition-all duration-700"
        />

        <div className="flex items-center gap-3">
          <span
            className={`border-base-content/12 grid size-11 place-items-center rounded-xl border bg-base-100/60 ${category.accent} transition-transform duration-500 group-hover:scale-110`}
          >
            <Icon size={19} />
          </span>
          <h3 className="font-display text-lg font-semibold">{category.label}</h3>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {category.items.map((tech, i) => (
            <TechChip key={tech} tech={tech} index={i} accent={category.accent} />
          ))}
        </div>
      </div>
    </Reveal>
  )
}

export function Stack() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const reduced = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const rotate = useTransform(scrollYProgress, [0, 1], [-18, 18])
  const smooth = useSpring(rotate, { stiffness: 90, damping: 24 })
  const counterRotate = useTransform(smooth, (value) => -value * 0.6)

  return (
    <section id="stack" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
        {!reduced && (
          <>
            <motion.div
              style={{ rotate: smooth }}
              className="border-primary/12 absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full border"
            />
            <motion.div
              style={{ rotate: counterRotate }}
              className="border-secondary/10 absolute -bottom-40 left-[38%] size-[28rem] rounded-full border"
            />
          </>
        )}
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Tech Stack"
          title="A stack built for"
          accent="real-time and shipped"
          description="The same toolkit that gets an idea from a blank repo to a live app on a phone."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {stack.map((category, index) => (
            <div
              key={category.label}
              onMouseEnter={() => setActive(index)}
              className="h-full"
            >
              <CategoryCard category={category} index={index} />
            </div>
          ))}
        </div>

        <Reveal delay={0.16}>
          <div className="border-primary/20 bg-primary/8 mt-5 flex flex-col items-center gap-3 rounded-2xl border p-6 text-center">
            <p className="text-base-content/60 max-w-xl text-sm leading-relaxed">
              Currently deepening my fundamentals in{' '}
              <span className="text-accent font-semibold">Java</span>,{' '}
              <span className="text-accent font-semibold">C</span>,{' '}
              <span className="text-accent font-semibold">TanStack Query</span>,{' '}
              <span className="text-accent font-semibold">Zustand</span> and{' '}
              <span className="text-accent font-semibold">Python III</span>.
            </p>
            <span className="font-mono text-base-content/35 text-[0.65rem] tracking-[0.2em] uppercase">
              index {active + 1} of {stack.length}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}