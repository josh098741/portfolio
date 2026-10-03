import { useEffect } from 'react'
import Lenis from 'lenis'
import { About, Marquee, Stats } from './components/About'
import { Apps } from './components/Apps'
import { AuroraBackdrop } from './components/AuroraBackdrop'
import { Contact } from './components/Contact'
import { Cursor } from './components/Cursor'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Journey } from './components/Journey'
import { Nav } from './components/Nav'
import { Preloader } from './components/Preloader'
import { Projects } from './components/Projects'
import { Stack } from './components/Stack'
import { usePrefersReducedMotion } from './hooks'

function useSmoothScroll() {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    let frame = 0
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    document.documentElement.style.scrollBehavior = 'auto'

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      document.documentElement.style.scrollBehavior = ''
    }
  }, [reduced])

  return null
}

export default function App() {
  useSmoothScroll()

  return (
    <>
      <Preloader />
      <Cursor />
      <AuroraBackdrop />
      <Nav />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Stats />
        <Apps />
        <Marquee reverse />
        <Projects />
        <Stack />
        <Journey />
        <Contact />
      </main>

      <Footer />
    </>
  )
}