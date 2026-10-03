import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Gamepad2, Mail, Sparkles  } from 'lucide-react'
import { GithubIcon } from './icons'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/portfolio'
import { usePrefersReducedMotion } from '../hooks'
import { Magnetic, SplitText } from './primitives'

function RoleRotator() {
  const roles = profile.roles
  const [index, setIndex] = useState(0)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600)
    return () => clearInterval(timer)
  }, [roles.length, reduced])

  return (
    <span className="relative inline-grid h-[1.4em] overflow-hidden align-bottom">
      {roles.map((role, i) => (
        <motion.span
          key={role}
          className="text-gradient col-start-1 row-start-1 self-end font-semibold whitespace-nowrap"
          animate={
            i === index
              ? { y: '0%', opacity: 1, filter: 'blur(0px)' }
              : { y: i < index ? '-130%' : '130%', opacity: 0, filter: 'blur(6px)' }
          }
          transition={{ duration: reduced ? 0.2 : 0.62, ease: [0.16, 1, 0.3, 1] }}
        >
          {role}
        </motion.span>
      ))}
    </span>
  )
}

function FloatingCode({ className, children, delay = 0 }) {
  return (
    <motion.div
      className={`glass font-mono absolute rounded-xl px-3 py-2 text-[0.7rem] shadow-xl ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
      transition={{
        opacity: { duration: 0.7, delay: delay + 0.9 },
        scale: { duration: 0.7, delay: delay + 0.9 },
        y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: delay + 1.4 },
      }}
    >
      {children}
    </motion.div>
  )
}

export function Hero() {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 150])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.94])

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      <div className="mx-auto w-full max-w-6xl px-5">
        <motion.div style={{ y, opacity, scale }} className="relative">
          <div className="relative z-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-7 flex flex-wrap items-center gap-3"
            >
              <span className="badge badge-success badge-outline gap-2 rounded-full px-3.5 py-3 font-mono text-[0.68rem] tracking-[0.14em] uppercase">
                <span className="relative flex size-2">
                  <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" />
                  <span className="bg-success relative inline-flex size-2 rounded-full" />
                </span>
                {profile.availability}
              </span>
              <span className="badge badge-outline border-base-content/15 rounded-full px-3.5 py-3 font-mono text-[0.68rem] text-base-content/55">
                {profile.location}
              </span>
              <span className="badge badge-outline border-base-content/15 hidden rounded-full px-3.5 py-3 font-mono text-[0.68rem] text-base-content/55 sm:inline-flex">
                {profile.timezone}
              </span>
            </motion.div>

            <h1 className="font-display text-[clamp(2.6rem,8.5vw,5.5rem)] leading-[0.98] font-bold tracking-[-0.03em]">
              <SplitText text="Joshua" delay={0.2} className="block" />
              <SplitText
                text="Moronge"
                delay={0.34}
                className="text-gradient block"
              />
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="mt-6 flex flex-wrap items-baseline gap-x-3 text-lg sm:text-2xl"
            >
              <span className="text-base-content/45 font-mono text-sm sm:text-base">
                I build as a
              </span>
              <RoleRotator />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="text-base-content/65 mt-7 max-w-2xl text-base leading-relaxed sm:text-lg"
            >
              {profile.headline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.25}>
                <a
                  href="#apps"
                  data-cursor="VIEW"
                  className="btn btn-primary btn-lg gap-2 rounded-full px-7"
                >
                  <Sparkles size={17} />
                  See my apps
                </a>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="OPEN"
                  className="btn btn-outline btn-lg gap-2 rounded-full px-7"
                >
                  <GithubIcon size={17} />
                  GitHub
                  <ArrowUpRight size={15} className="opacity-60" />
                </a>
              </Magnetic>

              <a
                href="#contact"
                data-cursor="SAY HI"
                className="btn btn-ghost btn-lg gap-2 rounded-full text-base-content/65"
              >
                <Mail size={16} />
                Let's talk
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-base-content/45"
            >
              <span className="flex items-center gap-2">
                <Gamepad2 size={15} className="text-secondary" />
                Unreal Engine &amp; C++
              </span>
              <span className="hidden size-1 rounded-full bg-base-content/20 sm:block" />
              <span>React Native · Expo</span>
              <span className="hidden size-1 rounded-full bg-base-content/20 sm:block" />
              <span>Node · Express · MongoDB</span>
            </motion.div>
          </div>

          {!reduced && (
            <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
              <FloatingCode className="-top-6 right-[4%] xl:right-[-2%]" delay={0}>
                <span className="text-secondary">const</span>{' '}
                <span className="text-base-content/85">dev</span> ={' '}
                <span className="text-accent">{'{'} </span>
                <span className="text-primary">ship</span>
                <span className="text-accent">{'}'}</span>
              </FloatingCode>

              <FloatingCode className="top-[34%] right-[2%] xl:right-[-4%]" delay={0.25}>
                <span className="text-warning">3 apps</span>{' '}
                <span className="text-base-content/50">live on</span>{' '}
                <span className="text-success">Play Store</span>
              </FloatingCode>

              <FloatingCode className="bottom-[22%] right-[8%] xl:right-[2%]" delay={0.5}>
                <span className="text-accent">socket</span>
                <span className="text-base-content/70">.on(</span>
                <span className="text-primary">'connect'</span>
                <span className="text-base-content/70">)</span>
              </FloatingCode>

              <FloatingCode className="bottom-[6%] right-[26%] hidden xl:block" delay={0.75}>
                <span className="text-base-content/45">// </span>
                <span className="text-secondary">119</span>{' '}
                <span className="text-base-content/45">commits on TaskLink</span>
              </FloatingCode>
            </div>
          )}
        </motion.div>

        <motion.a
          href="#about"
          aria-label="Scroll to about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="group mx-auto mt-14 flex w-fit flex-col items-center gap-2 text-base-content/35 transition-colors hover:text-primary"
        >
          <span className="font-mono text-[0.6rem] tracking-[0.24em] uppercase">
            Scroll
          </span>
          <span className="border-base-content/25 flex h-9 w-[1.4rem] items-start justify-center rounded-full border pt-2 transition-colors group-hover:border-primary">
            <motion.span
              className="bg-primary size-1 rounded-full"
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
          <ArrowDown size={14} className="animate-bounce" />
        </motion.a>
      </div>
    </section>
  )
}