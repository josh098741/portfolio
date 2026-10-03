import { motion } from 'framer-motion'
import { ArrowUp, Mail  } from 'lucide-react'
import { GithubIcon } from './icons'
import { profile } from '../data/portfolio'

const YEAR = new Date().getFullYear()

export function Footer() {

  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-base-content/8 py-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-center gap-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display max-w-xl text-center text-2xl leading-snug font-semibold sm:text-3xl"
          >
            Keep building. Keep learning. <span className="text-gradient">Keep innovating.</span>
          </motion.p>

          <div className="flex items-center gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="OPEN"
              className="btn btn-ghost btn-circle btn-sm"
              aria-label="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="MAIL"
              className="btn btn-ghost btn-circle btn-sm"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <button
              type="button"
              onClick={goTop}
              data-cursor="TOP"
              className="btn btn-circle btn-sm border-base-content/12"
              aria-label="Back to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>

        <div className="text-base-content/35 mt-8 flex flex-col items-center justify-between gap-2 border-t border-base-content/10 pt-6 font-mono text-[0.68rem] sm:flex-row">
          <p>
            © {YEAR} {profile.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>{profile.studio}</span>
            <span className="text-base-content/20">•</span>
            <span>Built with React, Tailwind &amp; too much coffee</span>
          </p>
        </div>
      </div>
    </footer>
  )
}