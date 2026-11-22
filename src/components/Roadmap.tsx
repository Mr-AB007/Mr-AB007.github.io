import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Circle, Loader } from 'lucide-react'
import { roadmap, type RoadmapState } from '../data/roadmap'
import { Reveal, SectionHeader } from '../ui/primitives'

const stateMeta: Record<RoadmapState, { label: string; icon: typeof Check; cls: string }> = {
  done: { label: 'Completed', icon: Check, cls: 'text-signal-green' },
  active: { label: 'In progress', icon: Loader, cls: 'text-signal-cyan' },
  future: { label: 'Future', icon: Circle, cls: 'text-fog-500' },
}

export function Roadmap() {
  const firstActive = roadmap.find((p) => p.items.some((i) => i.state === 'active'))?.phase ?? 1
  const [open, setOpen] = useState(firstActive)
  const phase = roadmap.find((p) => p.phase === open)!

  return (
    <section id="roadmap" className="relative py-20 sm:py-28">
      <div className="page">
        <SectionHeader index="08" eyebrow="Learning roadmap" title="Six phases to AI engineer and architect."
          lede="Where I am on the path, phase by phase. Completed items name the project that shows them." />
        <Reveal>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6" role="tablist" aria-label="Roadmap phases">
            {roadmap.map((p) => {
              const done = p.items.filter((i) => i.state === 'done').length
              const active = p.items.filter((i) => i.state === 'active').length
              const pct = (done / p.items.length) * 100
              const on = p.phase === open
              return (
                <button key={p.phase} role="tab" aria-selected={on} aria-controls="roadmap-panel" onClick={() => setOpen(p.phase)}
                  className={`rounded-xl border p-3 text-left transition ${on ? 'border-signal-cyan/40 bg-signal-cyan/[0.05]' : 'border-white/[0.07] bg-ink-900/60 hover:border-white/15'}`}>
                  <span className="font-mono text-[10.5px] text-fog-500">Phase {p.phase}</span>
                  <span className="mt-1 block text-[13.5px] font-medium leading-tight text-fog-100">{p.title}</span>
                  <span className="mt-3 flex h-1 overflow-hidden rounded-full bg-ink-700">
                    <span className="bg-signal-green" style={{ width: `${pct}%` }} />
                    <span className="bg-signal-cyan/60" style={{ width: `${(active / p.items.length) * 100}%` }} />
                  </span>
                  <span className="mt-1.5 block font-mono text-[10px] text-fog-500">{done}/{p.items.length} done</span>
                </button>
              )
            })}
          </div>
          <div id="roadmap-panel" role="tabpanel" className="panel mt-4 p-5 sm:p-7">
            <AnimatePresence mode="wait">
              <motion.div key={open} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.22 }}>
                <p className="eyebrow">Phase {phase.phase}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{phase.title}</h3>
                <p className="mt-1 text-fog-400">{phase.goal}</p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {phase.items.map((it) => {
                    const m = stateMeta[it.state]
                    const Icon = m.icon
                    return (
                      <li key={it.name} className={`flex items-start gap-3 rounded-lg border p-3 ${it.state === 'future' ? 'border-dashed border-white/10' : 'border-white/[0.07] bg-ink-950/50'}`}>
                        <Icon size={16} className={`mt-0.5 shrink-0 ${m.cls}`} />
                        <span>
                          <span className="block text-[14px] text-fog-100">{it.name}</span>
                          <span className="font-mono text-[11px] text-fog-500">{m.label}{it.note ? ` · ${it.note}` : ''}</span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-3 font-mono text-[11px] text-fog-500">Maintained in src/data/roadmap.ts. Move an item between done, active and future, and the site updates.</p>
        </Reveal>
      </div>
    </section>
  )
}
