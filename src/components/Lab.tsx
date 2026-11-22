import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { capabilities, laneMeta, type Lane } from '../data/ai'
import { ExternalLink, Reveal, SectionHeader, StatusBadge } from '../ui/primitives'

const areas = ['All', 'LLM Engineering', 'Agentic AI', 'AI Architecture', 'MLOps', 'Foundations'] as const
const lanes: Lane[] = ['built', 'exploring', 'next']
const laneStyle: Record<Lane, string> = {
  built: 'border-white/[0.08] bg-ink-900/80',
  exploring: 'border-signal-cyan/15 bg-signal-cyan/[0.025]',
  next: 'border-dashed border-white/[0.1] bg-transparent',
}

export function Lab() {
  const [area, setArea] = useState<(typeof areas)[number]>('All')
  const counts = Object.fromEntries(lanes.map((l) => [l, capabilities.filter((c) => c.lane === l).length]))
  const total = capabilities.length

  return (
    <section id="lab" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(94,230,240,0.06),transparent_60%)]" aria-hidden />
      <div className="page relative">
        <SectionHeader index="04" eyebrow="AI engineering lab" title="An AI journey, labelled honestly."
          lede="What I have built, what I am working on, and what is still ahead. Built items link to the code that shows them." />

        <Reveal className="mb-8">
          <div className="flex h-2 overflow-hidden rounded-full bg-ink-800" role="img" aria-label={`${counts.built} built, ${counts.exploring} exploring, ${counts.next} planned`}>
            <div className="bg-signal-green/80" style={{ width: `${(counts.built / total) * 100}%` }} />
            <div className="bg-signal-cyan/60" style={{ width: `${(counts.exploring / total) * 100}%` }} />
            <div className="bg-[repeating-linear-gradient(90deg,#2A3142_0_4px,transparent_4px_8px)]" style={{ width: `${(counts.next / total) * 100}%` }} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by area">
            {areas.map((a) => (
              <button key={a} type="button" onClick={() => setArea(a)} aria-pressed={area === a}
                className={`rounded-full border px-3 py-1 font-mono text-[11.5px] transition ${area === a ? 'border-signal-cyan/50 text-signal-cyan' : 'border-white/10 text-fog-400 hover:text-fog-100'}`}>{a}</button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-3">
          {lanes.map((lane, li) => {
            const items = capabilities.filter((c) => c.lane === lane && (area === 'All' || c.area === area))
            return (
              <Reveal key={lane} delay={li * 0.08} className={`rounded-2xl border p-4 sm:p-5 ${laneStyle[lane]}`}>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold tracking-tight">{laneMeta[lane].title}</h3>
                  <StatusBadge status={laneMeta[lane].status} />
                </div>
                <p className="mt-1 text-[13px] text-fog-400">{laneMeta[lane].blurb}</p>
                <ul className="mt-4 space-y-2">
                  {items.length === 0 && <li className="rounded-lg border border-white/[0.05] p-3 text-[13px] text-fog-500">Nothing in this area yet.</li>}
                  {items.map((c) => (
                    <motion.li layout key={c.name} className="group rounded-xl border border-white/[0.06] bg-ink-950/50 p-3.5 transition hover:border-white/15">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[14.5px] font-medium text-fog-100">{c.name}</p>
                        <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-fog-500">{c.area}</span>
                      </div>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-fog-400">{c.detail}</p>
                      {c.evidence?.href && (
                        <ExternalLink href={c.evidence.href} className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] text-signal-cyan/80 hover:text-signal-cyan">
                          evidence · {c.evidence.source}<ArrowUpRight size={12} />
                        </ExternalLink>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
