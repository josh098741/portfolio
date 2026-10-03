import { useEffect, useRef, useState } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (event) => setMatches(event.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

export function useScrollSpy(ids, offset = 96) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const handler = () => {
      let current = ids[0] ?? ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) current = id
      }
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120
      setActive(atBottom ? (ids[ids.length - 1] ?? current) : current)
    }

    handler()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [ids, offset])

  return active
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const handler = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) {
        setProgress(0)
        return
      }
      setProgress(Math.min(1, Math.max(0, -rect.top / total)))
    }

    handler()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [])

  return [ref, progress]
}