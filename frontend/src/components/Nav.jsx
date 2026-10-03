import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, Moon, Sun, X  } from 'lucide-react'
import { GithubIcon } from './icons'
import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data/portfolio'
import { useScrollSpy } from '../hooks'
import { Magnetic } from './primitives'

const THEME_KEY = 'josh-theme'
const SECTION_IDS = navLinks.map((link) => link.id)

export function Nav() {
  const active = useScrollSpy(SECTION_IDS)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'obsidian'
    return localStorage.getItem(THEME_KEY) ?? 'obsidian'
  })

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-70 transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-3 transition-all duration-500 sm:px-4 ${
            scrolled
              ? 'glass shadow-primary/5 w-full shadow-lg'
              : 'border border-transparent'
          }`}
        >
          <button
            type="button"
            onClick={() => go('home')}
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="Back to top"
          >
            <span className="border-primary/40 bg-primary/10 group-hover:border-primary group-hover:bg-primary/20 relative grid size-9 place-items-center overflow-hidden rounded-full border transition-all duration-300">
              <span className="text-primary font-mono text-xs font-bold">JM</span>
              <span className="border-primary/50 absolute inset-0 animate-pulse-ring rounded-full border" />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-sm font-semibold">{profile.firstName}</span>
              <span className="text-base-content/45 font-mono text-[0.6rem] tracking-[0.16em] uppercase">
                {profile.handle}
              </span>
            </span>
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => go(link.id)}
                    className={`relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300 ${
                      isActive
                        ? 'text-base-content'
                        : 'text-base-content/55 hover:text-base-content'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="bg-base-content/8 border-base-content/8 absolute inset-0 rounded-full border"
                        transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setTheme(theme === 'obsidian' ? 'obsidian-dark' : 'obsidian')}
              className="btn btn-ghost btn-circle btn-sm"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.28 }}
                  className="flex"
                >
                  {theme === 'obsidian' ? <Sun size={16} /> : <Moon size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <Magnetic strength={0.28} className="hidden sm:block">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="OPEN"
                className="btn btn-primary btn-sm gap-2 rounded-full"
              >
                <GithubIcon size={15} />
                GitHub
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="btn btn-ghost btn-circle btn-sm lg:hidden"
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        <motion.div
          className="from-primary via-secondary to-accent mx-auto mt-1 h-0.5 max-w-6xl rounded-full bg-gradient-to-r"
          style={{ scaleX: progress, transformOrigin: 'left' }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-60 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              className="bg-base-300/80 absolute inset-0 backdrop-blur-md"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
            />
            <motion.ul
              className="glass absolute inset-x-4 top-24 flex flex-col gap-1 rounded-3xl p-4"
              initial={{ y: -18, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -18, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            >
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ x: -14, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + index * 0.045 }}
                >
                  <button
                    type="button"
                    onClick={() => go(link.id)}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-colors ${
                      active === link.id
                        ? 'bg-primary/15 text-primary'
                        : 'hover:bg-base-content/5'
                    }`}
                  >
                    <span className="font-display text-lg font-medium">{link.label}</span>
                    <span className="font-mono text-base-content/30 text-xs">
                      0{index + 1}
                    </span>
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}