import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks'

const DIRECTIONS = {
  up: { y: 34, x: 0 },
  down: { y: -34, x: 0 },
  left: { x: 34, y: 0 },
  right: { x: -34, y: 0 },
  none: { x: 0, y: 0 },
}

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.7,
  once = true,
  amount = 0.25,
  blur = true,
  className = '',
  as = 'div',
}) {
  const reduced = usePrefersReducedMotion()
  const Component = motion[as] ?? motion.div
  const offset = reduced ? DIRECTIONS.none : DIRECTIONS[direction]

  return (
    <Component
      className={className}
      initial={{ opacity: 0, ...offset, filter: blur ? 'blur(10px)' : 'none' }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once, amount }}
      transition={{ duration: reduced ? 0.2 : duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  )
}

export function Stagger({
  children,
  className = '',
  delay = 0,
  stagger = 0.08,
  amount = 0.15,
  once = true,
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', y = 30, blur = true }) {
  const reduced = usePrefersReducedMotion()
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: reduced ? 0 : y,
          filter: blur ? 'blur(8px)' : 'none',
        },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: reduced ? 0.2 : 0.65, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function SplitText({ text, className = '', delay = 0, stagger = 0.035 }) {
  const reduced = usePrefersReducedMotion()
  const words = String(text).split(' ')
  const layout = className.includes('block') ? 'block' : 'inline-block'

  return (
    <span className={layout}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className={`inline-block will-change-transform ${className.replace('block', '')}`}
            initial={reduced ? { opacity: 0 } : { y: '110%', opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { y: '0%', opacity: 1 }}
            transition={{
              duration: reduced ? 0.3 : 0.85,
              delay: delay + index * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {index < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function Tilt({ children, className = '', max = 9, glare = true, scale = 1.012 }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)
  const raf = useRef(0)
  const state = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, active: false })

  const write = () => {
    const el = ref.current
    if (!el) return
    raf.current = 0
    const { rx, ry, gx, gy, active } = state.current
    el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${active ? scale : 1})`
    if (glare) {
      el.style.setProperty('--glare-x', `${gx}%`)
      el.style.setProperty('--glare-y', `${gy}%`)
      el.style.setProperty('--glare-opacity', active ? '1' : '0')
    }
  }

  const schedule = () => {
    if (!raf.current) raf.current = requestAnimationFrame(write)
  }

  const onMove = (event) => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    state.current = {
      rx: (0.5 - py) * max * 2,
      ry: (px - 0.5) * max * 2,
      gx: px * 100,
      gy: py * 100,
      active: true,
    }
    schedule()
  }

  const onLeave = () => {
    state.current = { rx: 0, ry: 0, gx: 50, gy: 50, active: false }
    schedule()
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </div>
  )
}

export function Magnetic({ children, strength = 0.35, className = '' }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)
  const raf = useRef(0)
  const pos = useRef({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const write = () => {
    const el = ref.current
    if (!el) return
    raf.current = 0
    el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
  }

  const schedule = () => {
    if (!raf.current) raf.current = requestAnimationFrame(write)
  }

  const onMove = (event) => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    pos.current = {
      x: (event.clientX - (rect.left + rect.width / 2)) * strength,
      y: (event.clientY - (rect.top + rect.height / 2)) * strength,
    }
    schedule()
  }

  const onLeave = () => {
    pos.current = { x: 0, y: 0 }
    schedule()
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerEnter={() => setHovered(true)}
      animate={{ scale: hovered ? 1.03 : 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      {children}
    </motion.div>
  )
}

export function GradientBorder({ children, className = '' }) {
  return (
    <div className={`relative rounded-[calc(var(--radius-box)+1px)] ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[calc(var(--radius-box)+1px)] bg-gradient-to-br from-primary/60 via-secondary/25 to-accent/60 opacity-70"
      />
      <div className="relative rounded-[var(--radius-box)]">{children}</div>
    </div>
  )
}

export function SectionHeading({ eyebrow, title, accent, description, align = 'center' }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      <Reveal>
        <span className="badge badge-outline badge-primary gap-2 rounded-full px-4 py-3 font-mono text-[0.7rem] tracking-[0.2em] uppercase">
          <span className="bg-primary inline-block size-1.5 animate-pulse rounded-full" />
          {eyebrow}
        </span>
      </Reveal>

      <h2 className="font-display max-w-3xl text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl md:text-6xl">
        <Reveal delay={0.06}>
          {title}{' '}
          <span className="text-gradient">{accent}</span>
        </Reveal>
      </h2>

      {description ? (
        <Reveal delay={0.14}>
          <p
            className={`text-base-content/60 max-w-2xl text-base leading-relaxed sm:text-lg ${
              align === 'center' ? 'mx-auto' : ''
            }`}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}