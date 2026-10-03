import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Check,
  Download,
  Link2,
  Play,
  ShieldCheck,
  Smartphone,
  Star,
} from 'lucide-react'
import { useState } from 'react'
import { apps, profile } from '../data/portfolio'
import { Reveal, SectionHeading, Tilt } from './primitives'

function PhoneMockup({ app }) {
  const light = app.tile === 'light'

  return (
    <div className="relative mx-auto w-full max-w-[19rem]">
      <motion.div
        aria-hidden
        className="bg-primary/25 absolute -inset-6 rounded-[3rem] blur-3xl"
        animate={{ opacity: [0.4, 0.75, 0.4], scale: [1, 1.06, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={app.name}
        initial={{ opacity: 0, y: 26, rotateY: -14 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        exit={{ opacity: 0, y: -18, rotateY: 14 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="border-base-content/12 relative rounded-[2.6rem] border-[6px] bg-base-100 p-3 shadow-2xl"
        style={{ boxShadow: '0 40px 80px -30px oklch(0% 0 0 / 0.7)' }}
      >
        <div className="bg-base-content/25 absolute top-2 left-1/2 h-1 w-14 -translate-x-1/2 rounded-full" />

        <div className="bg-base-200 flex aspect-[9/17.5] flex-col overflow-hidden rounded-[2rem]">
          <div className="bg-base-100/80 flex items-center justify-between px-5 pt-3 pb-2 text-[0.6rem] font-medium">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="bg-base-content/60 h-2 w-4 rounded-[2px]" />
              <span className="bg-base-content/40 h-2.5 w-4 rounded-[2px]" />
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-3 p-4">
            <div className="flex items-center gap-3">
              <div
                className={`grid size-12 shrink-0 place-items-center overflow-hidden rounded-2xl ${
                  light ? 'bg-white' : 'ring-base-content/10 ring-1'
                }`}
              >
                <img
                  src={app.image}
                  alt={`${app.name} app icon`}
                  className={`size-full ${
                    light ? 'object-contain p-1' : 'object-cover'
                  }`}
                  loading="lazy"
                  width={96}
                  height={96}
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{app.name}</p>
                <p className="text-base-content/45 truncate text-[0.6rem]">
                  {app.publisher}
                </p>
              </div>
            </div>

            <div
              className={`bg-gradient-to-br ${app.accent} rounded-2xl p-4`}
            >
              <p className="text-base-content/50 text-[0.55rem] tracking-[0.14em] uppercase">
                {app.category}
              </p>
              <p className="font-display mt-1 text-lg leading-tight font-bold">
                {app.name}
              </p>
              <p className="text-base-content/55 mt-0.5 text-[0.62rem] leading-snug">
                {app.tagline}
              </p>
            </div>

            <div className="flex gap-2">
              <span className="btn btn-primary btn-xs flex-1 rounded-full text-[0.6rem]">
                <Download size={10} />
                Install
              </span>
              <span className="btn btn-ghost btn-xs border-base-content/12 rounded-full text-[0.6rem]">
                <Star size={10} />
                Rate
              </span>
            </div>

            <div className="mt-1 space-y-1.5">
              {app.features.slice(0, 4).map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18 + i * 0.09 }}
                  className="bg-base-content/4 flex items-start gap-2 rounded-lg px-2.5 py-1.5"
                >
                  <Check size={11} className="text-success mt-0.5 shrink-0" />
                  <span className="text-base-content/65 text-[0.62rem] leading-tight">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {app.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="badge badge-ghost badge-xs font-mono text-[0.5rem]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      </AnimatePresence>
    </div>
  )
}

function AppDetail({ app }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={app.name}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6"
      >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge badge-outline badge-sm font-mono text-[0.6rem] tracking-widest uppercase">
            {app.publisher}
          </span>
          <span className="badge badge-success badge-outline badge-sm gap-1 text-[0.6rem]">
            <ShieldCheck size={11} />
            {app.rating}
          </span>
          <span className="badge badge-ghost badge-sm gap-1 text-[0.6rem]">
            <Download size={11} />
            {app.downloads}
          </span>
        </div>

        <h3 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {app.name}
        </h3>
        <p className="text-gradient mt-1 text-lg font-semibold">{app.tagline}</p>
      </div>

      <p className="text-base-content/65 text-sm leading-relaxed sm:text-base">
        {app.description}
      </p>

      <ul className="grid gap-2.5 sm:grid-cols-2">
        {app.features.map((feature, i) => (
          <motion.li
            key={feature}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="bg-base-content/4 flex items-start gap-2.5 rounded-xl px-3 py-2.5"
          >
            <span className="bg-primary/15 text-primary mt-0.5 grid size-5 shrink-0 place-items-center rounded-full">
              <Check size={11} />
            </span>
            <span className="text-base-content/70 text-sm leading-snug">{feature}</span>
          </motion.li>
        ))}
      </ul>

      <div>
        <p className="text-base-content/40 font-mono text-[0.65rem] tracking-[0.18em] uppercase">
          Built with
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {app.stack.map((tech) => (
            <span
              key={tech}
              className="badge badge-outline badge-sm border-base-content/15 text-base-content/70"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {app.links.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            data-cursor={i === 0 ? 'OPEN' : 'CODE'}
            className={`btn rounded-full gap-2 ${
              i === 0 ? 'btn-primary' : 'btn-outline'
            }`}
          >
            {i === 0 ? <Play size={15} /> : <Link2 size={15} />}
            {link.label}
            <ArrowUpRight size={13} className="opacity-60" />
          </a>
        ))}
      </div>
      </motion.div>
    </AnimatePresence>
  )
}

export function Apps() {
  const [index, setIndex] = useState(0)
  const app = apps[index]

  return (
    <section id="apps" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Shipped on Google Play"
          title="Three apps, published by"
          accent="Infinity Quest Labs"
          description="Not demos. Real apps, built end-to-end with React Native and Expo, signed and released to the Google Play Store under my studio account."
        />

        <Reveal delay={0.1} className="mt-12">
          <div className="mx-auto flex max-w-lg gap-1.5 rounded-full p-1.5">
            {apps.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setIndex(i)}
                className={`relative flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${
                  i === index ? 'text-base-content' : 'text-base-content/50'
                }`}
              >
                {i === index && (
                  <motion.span
                    layoutId="app-tab"
                    className="bg-base-content/8 border-base-content/8 absolute inset-0 rounded-full border"
                    transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                  />
                )}
                <span className="relative">{item.name}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {apps.map((item, i) => {
            const light = item.tile === 'light'
            return (
              <motion.button
                key={item.name}
                type="button"
                onClick={() => setIndex(i)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`group flex items-center gap-3.5 rounded-2xl p-3.5 text-left transition-all duration-400 ${
                  i === index
                    ? 'border-primary/45 bg-primary/8'
                    : 'border-base-content/10 hover:border-primary/30 bg-base-content/3'
                } border`}
              >
                <span
                  className={`grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl ${
                    light ? 'bg-white' : 'ring-base-content/10 ring-1'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={`${item.name} app icon`}
                    className={`size-full transition-transform duration-500 group-hover:scale-110 ${
                      light ? 'object-contain p-1' : 'object-cover'
                    }`}
                    loading="lazy"
                    width={96}
                    height={96}
                  />
                </span>
                <span className="min-w-0">
                  <span className="font-display block truncate text-sm font-semibold">
                    {item.name}
                  </span>
                  <span className="text-base-content/45 block truncate text-[0.7rem]">
                    {item.category} · {item.downloads}
                  </span>
                </span>
              </motion.button>
            )
          })}
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal direction="right" amount={0.2}>
            <Tilt max={7}>
              <PhoneMockup app={app} />
            </Tilt>
          </Reveal>

          <div>
            <AppDetail app={app} />
          </div>
        </div>

        <Reveal delay={0.15} className="mt-16">
          <div className="border-base-content/10 flex flex-col items-center gap-4 rounded-2xl border border-dashed px-6 py-8 text-center">
            <Smartphone size={20} className="text-primary" />
            <p className="text-base-content/60 max-w-lg text-sm leading-relaxed">
              Every one of these starts as a React Native and Expo codebase. One project,
              one codebase, and a store release you can install on any Android device.
            </p>
            <a
              href="#contact"
              data-cursor="SAY HI"
              className="link link-primary font-mono text-xs tracking-widest uppercase"
            >
              Build something like this →
            </a>
          </div>
        </Reveal>

        <p className="sr-only">
          {apps.map((item) => `${item.name}: ${item.description}`).join(' ')}{' '}
          {profile.studio}
        </p>
      </div>
    </section>
  )
}