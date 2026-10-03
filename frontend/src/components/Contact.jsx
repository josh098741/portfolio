import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Building2,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
 } from 'lucide-react'
import { GithubIcon } from './icons'
import { useState } from 'react'
import { collaborations, profile, socials } from '../data/portfolio'
import { Magnetic, Reveal, SectionHeading } from './primitives'

const SOCIAL_ICONS = { Github: GithubIcon, Mail, Globe }

const inputClass =
  'input input-bordered w-full rounded-xl border-base-content/12 bg-base-100/50 focus:border-primary'

export function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const update = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }))

  const celebrate = () => {
    const end = Date.now() + 900
    const colors = ['#7c8af5', '#4fd1e0', '#e56fd4', '#4ade80']
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.7 },
        colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.7 },
        colors,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }

  const onSubmit = (event) => {
    event.preventDefault()
    celebrate()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 4200)
  }

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="bg-primary/12 pointer-events-none absolute top-1/3 left-1/2 size-[42rem] -translate-x-1/2 rounded-full blur-[130px]"
      />

      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build"
          accent="something real"
          description={`Open to collaborations involving ${collaborations.join(', ')} — or anything with a hard technical problem in it.`}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal direction="right">
            <div className="flex h-full flex-col gap-4">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold">Get in touch</h3>
                <p className="text-base-content/55 mt-1.5 text-sm leading-relaxed">
                  The fastest way is email. I read everything and usually reply within a day.
                </p>

                <ul className="mt-6 space-y-3">
                  <li>
                    <a
                      href={`mailto:${profile.email}`}
                      data-cursor="MAIL"
                      className="group flex items-center gap-3 rounded-xl p-3 transition-colors duration-300 hover:bg-base-content/5"
                    >
                      <span className="border-primary/25 bg-primary/10 text-primary group-hover:border-primary/50 grid size-10 shrink-0 place-items-center rounded-xl border">
                        <Mail size={16} />
                      </span>
                      <span className="min-w-0">
                        <span className="text-base-content/45 block font-mono text-[0.6rem] tracking-[0.16em] uppercase">
                          Email
                        </span>
                        <span className="block truncate text-sm font-medium">
                          {profile.email}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="text-base-content/25 ml-auto shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      />
                    </a>
                  </li>

                  <li>
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="OPEN"
                      className="group flex items-center gap-3 rounded-xl p-3 transition-colors duration-300 hover:bg-base-content/5"
                    >
                      <span className="border-base-content/12 bg-base-content/5 grid size-10 shrink-0 place-items-center rounded-xl border">
                        <GithubIcon size={16} />
                      </span>
                      <span className="min-w-0">
                        <span className="text-base-content/45 block font-mono text-[0.6rem] tracking-[0.16em] uppercase">
                          GitHub
                        </span>
                        <span className="block truncate text-sm font-medium">
                          {profile.handle}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="text-base-content/25 ml-auto shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      />
                    </a>
                  </li>

                  <li>
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="VISIT"
                      className="group flex items-center gap-3 rounded-xl p-3 transition-colors duration-300 hover:bg-base-content/5"
                    >
                      <span className="border-secondary/25 bg-secondary/10 text-secondary grid size-10 shrink-0 place-items-center rounded-xl border">
                        <Globe size={16} />
                      </span>
                      <span className="min-w-0">
                        <span className="text-base-content/45 block font-mono text-[0.6rem] tracking-[0.16em] uppercase">
                          Studio
                        </span>
                        <span className="block truncate text-sm font-medium">
                          infinityquestlabs.co.ke
                        </span>
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="text-base-content/25 ml-auto shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      />
                    </a>
                  </li>

                  <li className="flex items-center gap-3 p-3">
                    <span className="border-base-content/12 bg-base-content/5 grid size-10 shrink-0 place-items-center rounded-xl border">
                      <MapPin size={16} />
                    </span>
                    <span>
                      <span className="text-base-content/45 block font-mono text-[0.6rem] tracking-[0.16em] uppercase">
                        Based in
                      </span>
                      <span className="block text-sm font-medium">{profile.location}</span>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="border-accent/20 bg-accent/6 rounded-2xl border p-6">
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-accent" />
                  <h3 className="font-display text-base font-semibold">
                    Open to collaborate on
                  </h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {collaborations.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, type: 'spring', stiffness: 280 }}
                      className="badge badge-outline border-accent/35 text-accent"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="glass relative h-full overflow-hidden rounded-2xl p-6 sm:p-8"
            >
              <div className="flex items-center gap-2">
                <MessageSquare size={15} className="text-primary" />
                <h3 className="font-display text-lg font-semibold">Send a message</h3>
              </div>

              <div className="mt-6 space-y-4">
                <label className="block">
                  <span className="text-base-content/55 mb-1.5 block font-mono text-[0.65rem] tracking-[0.16em] uppercase">
                    Your name
                  </span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Jane Developer"
                    className={inputClass}
                  />
                </label>

                <label className="block">
                  <span className="text-base-content/55 mb-1.5 block font-mono text-[0.65rem] tracking-[0.16em] uppercase">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                    placeholder="jane@company.com"
                    className={inputClass}
                  />
                </label>

                <label className="block">
                  <span className="text-base-content/55 mb-1.5 block font-mono text-[0.65rem] tracking-[0.16em] uppercase">
                    What are we building?
                  </span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="A realtime mobile app with a Node backend..."
                    className={`${inputClass} resize-none`}
                  />
                </label>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Magnetic strength={0.22}>
                    <button
                      type="submit"
                      data-cursor="SEND"
                      className="btn btn-primary gap-2 rounded-full px-7"
                    >
                      <Send size={15} />
                      Send message
                    </button>
                  </Magnetic>

                  <a
                    href={`mailto:${profile.email}`}
                    data-cursor="MAIL"
                    className="btn btn-ghost btn-sm gap-2 rounded-full text-base-content/55"
                  >
                    <Mail size={14} />
                    Or email directly
                  </a>
                </div>
              </div>

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="alert alert-success mt-5 rounded-xl"
                >
                  <Sparkles size={16} />
                  <span className="text-sm">
                    Nice one! This demo form does not send yet — reach me directly at{' '}
                    <a href={`mailto:${profile.email}`} className="font-semibold underline">
                      {profile.email}
                    </a>
                    .
                  </span>
                </motion.div>
              )}

              <div className="text-base-content/30 mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-base-content/10 pt-4 font-mono text-[0.65rem]">
                <span className="flex items-center gap-1.5">
                  <Building2 size={11} />
                  {profile.studio}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone size={11} />
                  {profile.phone}
                </span>
              </div>
            </form>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-14">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon] ?? Globe
              return (
                <Magnetic key={social.label} strength={0.3}>
                  <a
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noreferrer"
                    data-cursor="OPEN"
                    className="glass hover:border-primary/40 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors duration-300"
                  >
                    <Icon size={15} className="text-primary" />
                    {social.label}
                  </a>
                </Magnetic>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}