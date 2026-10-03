import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Search, Star, X  } from 'lucide-react'
import { GithubIcon } from './icons'
import { useMemo, useState } from 'react'
import { projects, profile } from '../data/portfolio'
import { Reveal, SectionHeading } from './primitives'

export function Projects() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return projects
    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.language.toLowerCase().includes(q) ||
        project.topics.some((topic) => topic.toLowerCase().includes(q)),
    )
  }, [query])

  const grouped = useMemo(
    () => ({
      starred: filtered.filter((project) => project.stars > 0),
      rest: filtered.filter((project) => project.stars === 0),
    }),
    [filtered],
  )

  const card = (project, index) => (
    <motion.a
      key={project.name}
      href={project.href}
      target="_blank"
      rel="noreferrer"
      data-cursor="CODE"
      layout
      initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.05, 0.4),
        ease: [0.16, 1, 0.3, 1],
        layout: { type: 'spring', stiffness: 260, damping: 28 },
      }}
      className="group glass relative flex flex-col overflow-hidden rounded-2xl p-5 transition-all duration-400 hover:-translate-y-1 hover:border-primary/35 hover:shadow-primary/10 hover:shadow-2xl"
    >
      <span
        aria-hidden
        className="from-primary/0 via-primary/60 to-primary/0 absolute inset-x-6 top-0 h-px scale-x-0 bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold tracking-tight">
          {project.name}
        </h3>
        <ArrowUpRight
          size={16}
          className="text-base-content/25 shrink-0 transition-all duration-300 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>

      <p className="text-base-content/55 mt-2 flex-1 text-sm leading-relaxed">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.topics.map((topic) => (
          <span
            key={topic}
            className="bg-base-content/5 text-base-content/50 rounded-md px-1.5 py-0.5 font-mono text-[0.6rem]"
          >
            {topic}
          </span>
        ))}
      </div>

      <div className="text-base-content/40 mt-4 flex items-center gap-3 border-t border-base-content/10 pt-3 text-xs">
        <span className="flex items-center gap-1.5">
          <span
            className="size-2.5 rounded-full"
            style={{ background: project.languageColor }}
          />
          {project.language}
        </span>
        {project.stars > 0 && (
          <span className="text-warning flex items-center gap-1">
            <Star size={11} className="fill-current" />
            {project.stars}
          </span>
        )}
      </div>
    </motion.a>
  )

  return (
    <section id="projects" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Open Source"
          title="Built in the open at"
          accent={`${profile.handle}`}
          description="37 public repositories — mobile clients, backends, realtime systems, AI experiments and the small things built to learn fast."
        />

        <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center">
          <label className="input input-bordered flex w-full max-w-sm items-center gap-2 rounded-full">
            <Search size={15} className="text-base-content/40" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects and tech..."
              className="grow"
              aria-label="Search projects"
            />
            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="text-base-content/40 hover:text-base-content"
                >
                  <X size={14} />
                </motion.button>
              )}
            </AnimatePresence>
          </label>
        </Reveal>

        {grouped.starred.length > 0 && (
          <div className="mt-12">
            <p className="text-base-content/40 mb-4 flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] uppercase">
              <Star size={12} className="text-warning fill-current" />
              Starred
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {grouped.starred.map(card)}
            </div>
          </div>
        )}

        <div className="mt-10">
          <p className="text-base-content/40 mb-4 font-mono text-[0.65rem] tracking-[0.2em] uppercase">
            More from the workshop
            <span className="text-base-content/25 ml-2">({grouped.rest.length})</span>
          </p>

          {grouped.rest.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {grouped.rest.map(card)}
            </div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-base-content/40 py-10 text-center text-sm"
            >
              No projects match “{query}”.
            </motion.p>
          )}
        </div>

        <Reveal delay={0.1} className="mt-14">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            data-cursor="OPEN"
            className="btn btn-outline btn-lg mx-auto flex w-fit gap-2 rounded-full px-8"
          >
            <GithubIcon size={17} />
            See all {37} repositories
            <ArrowUpRight size={15} className="opacity-60" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}