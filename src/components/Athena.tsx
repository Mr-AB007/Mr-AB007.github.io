import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Pause, Play } from 'lucide-react'
import { athenaComponents, athenaLayers, athenaRoadmap, athenaTrace, type AthenaComponent } from '../data/athena'
import type { Status } from '../data/types'
import { ExternalLink, Reveal, SectionHeader, StatusBadge, statusMeta } from '../ui/primitives'

const pillars = [
  { k: 'Vision', v: 'A personal AI assistant I own end to end, from model weights to interface, grown into a product one capability at a time.' },
  { k: 'Problem', v: 'Hosted assistants are opaque and send everything to the cloud. ATHENA stays private, explains itself and is extensible with my own data and tools.' },
  { k: 'Approach', v: 'Ship working versions. B2 is the first: local models, streaming chat and cited web retrieval. Each next layer is labelled until it is real.' },
]
const statuses: Status[] = ['implemented', 'in-development', 'experimental', 'planned']

export function Athena() {
  const [selected, setSelected] = useState<AthenaComponent>(athenaComponents.find((c) => c.id === 'model')!)
  const [filter, setFilter] = useState<Status | null>(null)
  const [traceStep, setTraceStep] = useState<number | null>(null)
  const timer = useRef<number>()
  const reduce = useReducedMotion()

  const tracing = traceStep !== null
  useEffect(() => () => window.clearInterval(timer.current), [])
  const startTrace = () => {
    window.clearInterval(timer.current)
    if (tracing) { setTraceStep(null); return }
    setFilter(null)
    setTraceStep(0)
    let i = 0
    timer.current = window.setInterval(() => {
      i += 1
      if (i >= athenaTrace.length) { window.clearInterval(timer.current); return }
      setTraceStep(i)
    }, reduce ? 3200 : 2400)
  }
  const traceIds = tracing ? athenaTrace.slice(0, traceStep! + 1).map((t) => t.id) : []
  const done = athenaRoadmap.filter((r) => r.status === 'implemented').length

  return (
    <section id="athena" className="relative overflow-clip py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(157,123,255,0.10),transparent_70%)]" aria-hidden />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="page relative">
        <SectionHeader index="05" eyebrow="Flagship · long-term build" title={<><span className="bg-gradient-to-r from-fog-100 to-signal-violet bg-clip-text text-transparent">ATHENA</span>: learning AI by building one.</>}
          lede={<>ATHENA is the assistant I am growing into a product. Its working foundation today is <ExternalLink href="https://github.com/Mr-AB007/b2-personal-ai" className="link-u text-fog-100">B2</ExternalLink>. Every component below shows its real status.</>} />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.k} delay={i * 0.06} className="bg-ink-900/95 p-5 sm:p-6">
              <p className="eyebrow !text-signal-violet/90">{p.k}</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-fog-300">{p.v}</p>
            </Reveal>
          ))}
        </div>

        {/* Architecture */}
        <Reveal className="mt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold tracking-tight">System architecture</h3>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={startTrace} className={`btn !py-1.5 text-[13px] ${tracing ? 'border border-signal-violet/40 bg-signal-violet/10 text-fog-100' : 'btn-ghost'}`}>
                {tracing ? <Pause size={14} /> : <Play size={14} />}{tracing ? 'Stop trace' : 'Trace a request'}
              </button>
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Highlight by status">
                {statuses.map((s) => (
                  <button key={s} type="button" aria-pressed={filter === s} onClick={() => { setTraceStep(null); window.clearInterval(timer.current); setFilter(filter === s ? null : s) }}
                    className={`rounded-full border px-2.5 py-1 font-mono text-[10.5px] transition ${filter === s ? `${statusMeta[s].ring} ${statusMeta[s].text}` : 'border-white/10 text-fog-400 hover:text-fog-100'}`}>
                    {statusMeta[s].label} · {athenaComponents.filter((c) => c.status === s).length}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_340px]">
            <div className="panel overflow-hidden p-3 sm:p-4">
              <ol className="space-y-2.5">
                {athenaLayers.map((layer, li) => (
                  <li key={layer} className="grid gap-2 sm:grid-cols-[112px_1fr] sm:items-stretch">
                    <div className="flex items-center gap-2 px-1 sm:flex-col sm:items-start sm:justify-center">
                      <span className="font-mono text-[10px] text-fog-500">L{li + 1}</span>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-fog-400">{layer}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                      {athenaComponents.filter((c) => c.layer === layer).map((c) => {
                        const m = statusMeta[c.status]
                        const dim = (filter && c.status !== filter) || (tracing && !traceIds.includes(c.id))
                        const current = tracing && athenaTrace[traceStep!].id === c.id
                        const isSel = !tracing && selected.id === c.id
                        return (
                          <button key={c.id} type="button" onClick={() => { setSelected(c); setTraceStep(null); window.clearInterval(timer.current) }}
                            aria-pressed={isSel}
                            className={[
                              'relative rounded-xl border p-3 text-left transition duration-300',
                              c.status === 'planned' ? 'border-dashed border-white/15 bg-transparent' : 'border-white/[0.08] bg-ink-950/70',
                              dim ? 'opacity-30' : 'opacity-100',
                              isSel ? '!border-signal-violet/60 bg-signal-violet/[0.07]' : 'hover:border-white/20',
                              current ? '!border-signal-cyan/70 shadow-[0_0_28px_rgba(94,230,240,0.22)]' : '',
                            ].join(' ')}>
                            <span className="flex items-center gap-1.5"><i className={`h-1.5 w-1.5 rounded-full ${m.dot}`} /><span className={`font-mono text-[9.5px] uppercase tracking-wider ${m.text}`}>{m.label}</span></span>
                            <span className="mt-1.5 block text-[13.5px] font-medium leading-tight text-fog-100">{c.name}</span>
                            {tracing && traceIds.includes(c.id) && <span className="absolute right-2 top-2 grid h-4 w-4 place-items-center rounded-full bg-signal-cyan/20 font-mono text-[9px] text-signal-cyan">{athenaTrace.findIndex((t) => t.id === c.id) + 1}</span>}
                          </button>
                        )
                      })}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="panel self-start p-5 max-lg:sticky max-lg:bottom-3 max-lg:z-10 max-lg:max-h-[42vh] max-lg:overflow-y-auto max-lg:!bg-ink-900 max-lg:shadow-[0_-12px_40px_rgba(0,0,0,0.6)] lg:sticky lg:top-24" aria-live="polite">
              <AnimatePresence mode="wait">
                {tracing ? (
                  <motion.div key={`t${traceStep}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <p className="eyebrow">Request trace · step {traceStep! + 1} of {athenaTrace.length}</p>
                    <p className="mt-3 text-lg font-semibold">{athenaComponents.find((c) => c.id === athenaTrace[traceStep!].id)?.name}</p>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-fog-300">{athenaTrace[traceStep!].caption}</p>
                    <div className="mt-5 flex gap-1">{athenaTrace.map((_, i) => <i key={i} className={`h-1 flex-1 rounded-full ${i <= traceStep! ? 'bg-signal-cyan' : 'bg-ink-700'}`} />)}</div>
                    <p className="mt-4 font-mono text-[11px] text-fog-500">This is what happens in B2 today with web search on.</p>
                  </motion.div>
                ) : (
                  <motion.div key={selected.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <p className="eyebrow">{selected.layer}</p>
                    <p className="mt-3 text-lg font-semibold">{selected.name}</p>
                    <StatusBadge status={selected.status} className="mt-2" />
                    <p className="mt-4 text-[14.5px] leading-relaxed text-fog-300">{selected.summary}</p>
                    {selected.today && (
                      <div className="mt-4 rounded-lg border border-white/[0.06] bg-ink-950/60 p-3">
                        <p className="font-mono text-[10.5px] uppercase tracking-widest text-fog-500">Today</p>
                        <p className="mt-1 text-[13.5px] text-fog-300">{selected.today}</p>
                      </div>
                    )}
                    <div className="mt-4 flex flex-wrap gap-1.5">{selected.tech.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {/* Roadmap */}
        <Reveal className="mt-12">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-lg font-semibold tracking-tight">Build plan</h3>
            <p className="font-mono text-[12px] text-fog-400">{done} of {athenaRoadmap.length} steps implemented</p>
          </div>
          <ol className="scrollbar-none -mx-4 mt-5 flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 lg:grid-cols-7">
            {athenaRoadmap.map((r, i) => {
              const m = statusMeta[r.status]
              return (
                <li key={r.step} className={`w-[44vw] shrink-0 snap-start rounded-xl border p-3 sm:w-auto ${r.status === 'planned' ? 'border-dashed border-white/10' : 'border-white/[0.08] bg-ink-900/70'} ${i === athenaRoadmap.length - 1 ? 'lg:col-span-1' : ''}`}>
                  <span className="font-mono text-[10.5px] text-fog-500">{String(i + 1).padStart(2, '0')}</span>
                  <p className="mt-1.5 text-[13px] leading-snug text-fog-100">{r.step}</p>
                  <span className={`mt-2 inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider ${m.text}`}><i className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />{m.label}</span>
                </li>
              )
            })}
          </ol>
          <ExternalLink href="https://github.com/Mr-AB007/b2-personal-ai" className="mt-6 inline-flex items-center gap-1.5 text-sm text-fog-300 hover:text-fog-100">See the foundation (B2) on GitHub<ArrowUpRight size={15} /></ExternalLink>
        </Reveal>
      </div>
    </section>
  )
}
