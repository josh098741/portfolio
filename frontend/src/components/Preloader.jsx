import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio'

const SEGMENTS = ['ENGINEERING', 'GAMEPLAY SYSTEMS', 'REALTIME', 'MOBILE APPS']

export function Preloader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [segment, setSegment] = useState(0)

  useEffect(() => {
    const started = performance.now()
    const duration = 1900
    let frame = 0
    let finished = false

    const finish = () => {
      if (finished) return
      finished = true
      setProgress(100)
      setTimeout(() => setDone(true), 320)
    }

    const tick = (now) => {
      const t = Math.min(1, (now - started) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 100))
      setSegment(Math.min(SEGMENTS.length - 1, Math.floor(eased * SEGMENTS.length)))
      if (t < 1) frame = requestAnimationFrame(tick)
      else finish()
    }

    frame = requestAnimationFrame(tick)

    const failsafe = setTimeout(finish, duration + 1500)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(failsafe)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-8 bg-base-300"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div aria-hidden className="grid-mesh pointer-events-none absolute inset-0 opacity-40" />
          <motion.div
            aria-hidden
            className="bg-primary/25 pointer-events-none absolute top-1/2 left-1/2 size-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
            animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative flex flex-col items-center gap-6 px-6">
            <motion.h1
              className="font-display text-center text-4xl font-bold tracking-tight sm:text-6xl"
              initial={{ opacity: 0, y: 24, filter: 'blur(14px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-gradient">{profile.firstName}</span>{' '}
              <span className="text-base-content">{profile.lastName}</span>
            </motion.h1>

            <div className="font-mono text-base-content/50 relative h-5 text-xs tracking-[0.28em] uppercase">
              {SEGMENTS.map((label, i) => (
                <motion.span
                  key={label}
                  className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  animate={{
                    opacity: i === segment ? 1 : 0,
                    y: i === segment ? 0 : 6,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {label}
                </motion.span>
              ))}
            </div>

            <div className="bg-base-content/10 h-1 w-64 overflow-hidden rounded-full sm:w-80">
              <motion.div
                className="from-primary via-secondary to-accent h-full rounded-full bg-gradient-to-r"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="font-mono text-base-content/40 flex w-64 justify-between text-[0.7rem] sm:w-80">
              <span>{profile.studio}</span>
              <span className="tabular-nums">{String(progress).padStart(3, '0')}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}