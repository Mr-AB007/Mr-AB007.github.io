import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Award, BadgeCheck, Briefcase, GraduationCap, Hammer, Hourglass, Sparkles, Telescope } from 'lucide-react'
import { credentials, journey, recognitions, type JourneyKind } from '../data/journey'
import { ExternalLink, Reveal, SectionHeader } from '../ui/primitives'

const kindMeta: Record<JourneyKind, { icon: typeof Briefcase; label: string; tone: string }> = {
  education: { icon: GraduationCap, label: 'Education', tone: 'text-fog-300 border-white/15' },
  work: { icon: Briefcase, label: 'Work', tone: 'text-signal-blue border-signal-blue/40' },
  build: { icon: Hammer, label: 'Build', tone: 'text-signal-violet border-signal-violet/40' },
  ai: { icon: Sparkles, label: 'AI', tone: 'text-signal-cyan border-signal-cyan/40' },
  next: { icon: Telescope, label: 'Next', tone: 'text-fog-400 border-dashed border-white/25' },
}

export function Journey() {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="journey" className="relative py-20 sm:py-28">
      <div className="page">
        <SectionHeader index="07" eyebrow="Engineering journey" title="From data structures to inference."
          lede="Roles and dates come from my resume. Personal milestones are dated by the first and last commits in each repository." />
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          <ol ref={ref} className="relative ml-3 sm:ml-4">
            <span className="absolute left-0 top-0 h-full w-px bg-white/[0.07]" aria-hidden />
            <motion.span style={reduce ? undefined : { scaleY }} className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-signal-blue via-signal-cyan to-signal-violet" aria-hidden />
            {journey.map((j, i) => {
              const m = kindMeta[j.kind]
              const Icon = m.icon
              return (
                <li key={j.title} className="relative pb-10 pl-8 last:pb-0 sm:pl-10">
                  <span className={`absolute -left-[13px] top-0 grid h-[26px] w-[26px] place-items-center rounded-full border bg-ink-950 ${m.tone}`}><Icon size={12} /></span>
                  <Reveal delay={Math.min(i * 0.02, 0.1)}>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-mono text-[12px] text-fog-400">{j.date}</span>
                      <span className={`font-mono text-[10px] uppercase tracking-widest ${m.tone.split(' ')[0]}`}>{m.label}</span>
                    </div>
                    <h3 className="mt-1.5 text-[17px] font-semibold tracking-tight text-fog-100 sm:text-lg">{j.title}</h3>
                    {j.org && <p className="text-[13.5px] text-fog-400">{j.org}</p>}
                    <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-fog-300">{j.body}</p>
                    {j.points && (
                      <ul className="mt-3 max-w-2xl space-y-1.5">
                        {j.points.map((p) => <li key={p} className="flex gap-2.5 text-[13.5px] leading-relaxed text-fog-400"><span className="mt-[9px] h-px w-2.5 shrink-0 bg-fog-500" />{p}</li>)}
                      </ul>
                    )}
                    {j.href && <ExternalLink href={j.href} className="mt-2 inline-flex items-center gap-1 font-mono text-[11.5px] text-signal-cyan/80 hover:text-signal-cyan">repository<ArrowUpRight size={12} /></ExternalLink>}
                  </Reveal>
                </li>
              )
            })}
          </ol>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Reveal className="panel p-5">
              <h3 className="font-semibold tracking-tight">Certifications</h3>
              <ul className="mt-4 space-y-3">
                {credentials.map((c) => (
                  <li key={c.title} className={`rounded-xl border p-3.5 ${c.state === 'earned' ? 'border-white/[0.08] bg-ink-950/50' : 'border-dashed border-signal-cyan/25'}`}>
                    <div className="flex items-start gap-3">
                      {c.state === 'earned' ? <BadgeCheck size={18} className="mt-0.5 shrink-0 text-signal-green" /> : <Hourglass size={18} className="mt-0.5 shrink-0 text-signal-cyan" />}
                      <div>
                        <p className="text-[14px] font-medium text-fog-100">{c.title}</p>
                        <p className="text-[12.5px] text-fog-400">{c.issuer}</p>
                        <p className={`mt-1 font-mono text-[10.5px] uppercase tracking-wider ${c.state === 'earned' ? 'text-signal-green' : 'text-signal-cyan'}`}>{c.state === 'earned' ? 'Earned' : 'In progress'}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.05} className="panel p-5">
              <h3 className="flex items-center gap-2 font-semibold tracking-tight"><Award size={16} className="text-signal-amber" />Recognition</h3>
              <ul className="mt-3 space-y-2">{recognitions.map((r) => <li key={r} className="text-[13.5px] text-fog-300">{r}</li>)}</ul>
            </Reveal>
            <Reveal delay={0.1} className="panel p-5">
              <h3 className="font-semibold tracking-tight">How I learn now</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-fog-400">AI-assisted engineering with Claude Code and GitHub Copilot is part of my daily workflow, alongside deliberate practice: 115 commits of DSA work in Java in the <ExternalLink href="https://github.com/Mr-AB007/DSA-practice" className="link-u text-fog-300">DSA-practice</ExternalLink> repo alone.</p>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  )
}
