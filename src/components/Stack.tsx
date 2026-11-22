import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Server, Layout, Database, Cloud, Sparkles } from 'lucide-react'
import { skillGroups } from '../data/skills'
import { SectionHeader } from '../ui/primitives'

const icons = { backend: Server, frontend: Layout, data: Database, cloud: Cloud, ai: Sparkles } as const

export function Stack() {
  const [active, setActive] = useState(skillGroups[0].id)
  const [hover, setHover] = useState<string | null>(null)
  const group = skillGroups.find((g) => g.id === active)!
  // Places this group's skills were used, most frequent first.
  const places = Object.entries(
    group.skills.flatMap((s) => s.where).reduce<Record<string, number>>((m, w) => ({ ...m, [w]: (m[w] ?? 0) + 1 }), {}),
  ).sort((a, b) => b[1] - a[1])
  const hovered = group.skills.find((s) => s.name === hover)

  return (
    <section id="stack" className="relative py-20 sm:py-28">
      <div className="page">
        <SectionHeader index="02" eyebrow="Engineering stack" title="Evidence, not percentages."
          lede="Each technology lists where I have actually used it. Pick a group, then hover or tap a skill to see where it shows up." />
        <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
          <div role="tablist" aria-label="Skill groups" className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {skillGroups.map((g) => {
              const Icon = icons[g.id as keyof typeof icons]
              const on = g.id === active
              return (
                <button key={g.id} role="tab" aria-selected={on} aria-controls="stack-panel" id={`tab-${g.id}`}
                  onClick={() => { setActive(g.id); setHover(null) }}
                  className={`relative flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${on ? 'border-signal-cyan/30 bg-signal-cyan/[0.06] text-fog-100' : 'border-white/[0.06] bg-ink-900/60 text-fog-400 hover:text-fog-100'}`}>
                  <Icon size={16} className={on ? 'text-signal-cyan' : ''} />
                  <span className="font-medium">{g.title}</span>
                  <span className="ml-auto hidden font-mono text-[11px] text-fog-500 lg:inline">{g.skills.length}</span>
                </button>
              )
            })}
          </div>
          <div id="stack-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="panel min-h-[380px] p-5 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                <p className="text-fog-300">{group.summary}</p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {group.skills.map((s) => {
                    const on = hover === s.name
                    return (
                      <li key={s.name}>
                        <button type="button" onMouseEnter={() => setHover(s.name)} onFocus={() => setHover(s.name)} onClick={() => setHover(on ? null : s.name)} onMouseLeave={() => setHover(null)}
                          aria-pressed={on}
                          className={`flex w-full items-center justify-between gap-3 rounded-lg border px-3.5 py-2.5 text-left text-[14px] transition ${on ? 'border-signal-cyan/40 bg-signal-cyan/[0.05] text-fog-100' : 'border-white/[0.06] bg-ink-950/40 text-fog-300'}`}>
                          <span>{s.name}</span>
                          <span className="flex gap-0.5" aria-label={`Used in ${s.where.length} places`}>
                            {s.where.map((w) => <i key={w} className={`h-3 w-1 rounded-full ${on ? 'bg-signal-cyan' : 'bg-fog-500/50'}`} />)}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
                <div className="mt-7 border-t border-white/[0.06] pt-5">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-fog-500">{hovered ? `${hovered.name} · used in` : 'Used in'}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {places.map(([p]) => {
                      const lit = !hovered || hovered.where.includes(p)
                      return <li key={p} className={`rounded-md border px-2.5 py-1 font-mono text-[12px] transition ${lit ? 'border-white/15 text-fog-100' : 'border-white/[0.04] text-fog-500/60'}`}>{p}</li>
                    })}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
