import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '../hooks'

export function Cursor() {
  const isDesktop = useMediaQuery('(hover: hover) and (pointer: fine)')
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState('')
  const [pressed, setPressed] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.5 })

  useEffect(() => {
    if (!isDesktop) return

    const move = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)

      const target = event.target.closest('a, button, [data-cursor]')
      if (!target) {
        setLabel('')
        return
      }
      setLabel(target.dataset.cursor ?? '')
    }

    const leave = () => setVisible(false)
    const down = () => setPressed(true)
    const up = () => setPressed(false)

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)

    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [isDesktop, x, y])

  if (!isDesktop) return null

  const expanded = label.length > 0

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-90 hidden lg:block">
      <motion.div
        className="bg-primary absolute top-0 left-0 size-1.5 rounded-full"
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0, scale: pressed ? 0.5 : 1 }}
        transition={{ opacity: { duration: 0.2 } }}
      />

      <motion.div
        className="border-primary/70 absolute top-0 left-0 flex items-center justify-center rounded-full border backdrop-blur-sm"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: expanded ? 74 : 32,
          height: expanded ? 74 : 32,
          opacity: visible ? 1 : 0,
          backgroundColor: expanded ? 'rgba(114, 138, 245, 0.14)' : 'rgba(114, 138, 245, 0)',
          scale: pressed ? 0.85 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        <AnimatePresence>
          {expanded && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="text-primary font-mono text-[0.6rem] font-semibold tracking-wider uppercase"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}