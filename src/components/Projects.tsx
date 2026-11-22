import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Github, Lock, X } from 'lucide-react'
import { projects } from '../data/projects'
import type { Project } from '../data/types'
import { ExternalLink, SectionHeader, StatusBadge, trackSpotlight } from '../ui/primitives'
import { ProjectCover } from './ProjectCover'

export function Projects() {
  const cats = useMemo(() => ['All', ...Array.from(new Set(projects.map((p) => p.category)))], [])
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState<Project | null>(null)
  const list = projects.filter((p) => cat === 'All' || p.category === cat)

  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="page">
        <SectionHeader index="03" eyebrow="Featured projects" title="Selected work, read from the code."
          lede="Each case study comes from reading the repository: its README, source and commit history. Open one to see the problem, the architecture and the engineering details." />
        <div className="scrollbar-none -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter projects">
          {cats.map((c) => (
            <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] transition ${cat === c ? 'border-fog-100 bg-fog-100 text-ink-950' : 'border-white/10 text-fog-400 hover:text-fog-100'}`}>
              {c}
            </button>
          ))}
        </div>
        <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.li layout key={p.id} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.25 }}
                className={p.featured && cat === 'All' && p.id === 'b2' ? 'sm:col-span-2' : ''}>
                <button type="button" onClick={() => setOpen(p)} onMouseMove={trackSpotlight}
                  className="spotlight panel group flex h-full w-full flex-col overflow-hidden text-left transition duration-300 hover:-translate-y-0.5 hover:border-white/15">
                  <div className="relative h-36 border-b border-white/[0.06] bg-ink-950/60">
                    <ProjectCover project={p} />
                    <span className="absolute left-3 top-3 font-mono text-[10.5px] text-fog-400">{p.category}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[17px] font-semibold tracking-tight text-fog-100">{p.name}</h3>
                      <ArrowUpRight size={18} className="shrink-0 text-fog-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-cyan" />
                    </div>
                    <p className="mt-2 text-[14px] leading-relaxed text-fog-400">{p.tagline}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">{p.stack.slice(0, 5).map((s) => <span key={s} className="chip">{s}</span>)}{p.stack.length > 5 && <span className="chip">+{p.stack.length - 5}</span>}</div>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                      <StatusBadge status={p.status} />
                      <span className="flex items-center gap-1.5 font-mono text-[11px] text-fog-500">{p.kind === 'professional' && <Lock size={11} />}{p.period}</span>
                    </div>
                  </div>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
      <AnimatePresence>{open && <CaseStudy project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}

function CaseStudy({ project: p, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const key = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', key)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', key); prev?.focus() }
  }, [onClose])
  const block = (title: string, items: string[]) => (
    <div>
      <h4 className="eyebrow">{title}</h4>
      <ul className="mt-3 space-y-2">{items.map((t) => <li key={t} className="flex gap-3 text-[14.5px] leading-relaxed text-fog-300"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal-cyan/70" />{t}</li>)}</ul>
    </div>
  )
  return (
    <motion.div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <motion.article role="dialog" aria-modal="true" aria-labelledby="cs-title"
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-white/10 bg-ink-900 sm:rounded-2xl">
        <div className="relative h-40 border-b border-white/[0.06] bg-ink-950/60 sm:h-48"><ProjectCover project={p} /></div>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close case study" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-ink-900/90 text-fog-300 hover:text-fog-100"><X size={16} /></button>
        <div className="space-y-8 p-5 sm:p-8">
          <header>
            <div className="flex flex-wrap items-center gap-2"><StatusBadge status={p.status} /><span className="chip">{p.category}</span><span className="chip">{p.kind === 'professional' ? 'Professional work' : 'Personal project'}</span><span className="chip">{p.period}</span></div>
            <h3 id="cs-title" className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{p.name}</h3>
            <p className="mt-2 text-fog-300">{p.tagline}</p>
          </header>
          <div><h4 className="eyebrow">Problem</h4><p className="mt-3 text-[15px] leading-relaxed text-fog-300">{p.story.problem}</p></div>
          {block('Architecture', p.story.architecture)}
          {block('Engineering details', p.story.engineering)}
          <div className="grid gap-6 sm:grid-cols-2">
            <div><h4 className="eyebrow">My contribution</h4><p className="mt-3 text-[14.5px] leading-relaxed text-fog-300">{p.story.contribution}</p></div>
            <div><h4 className="eyebrow">Demonstrates</h4><div className="mt-3 flex flex-wrap gap-1.5">{p.story.learning.map((l) => <span key={l} className="chip !text-fog-100">{l}</span>)}</div></div>
          </div>
          <div><h4 className="eyebrow">Technology</h4><div className="mt-3 flex flex-wrap gap-1.5">{p.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div></div>
          <footer className="flex flex-wrap gap-2 border-t border-white/[0.06] pt-6">
            {p.repo ? <ExternalLink href={p.repo} className="btn-primary"><Github size={16} />View repository</ExternalLink>
              : <span className="inline-flex items-center gap-2 text-sm text-fog-400"><Lock size={14} />Employer code. No public repository.</span>}
            {p.extraLinks?.map((l) => <ExternalLink key={l.href} href={l.href} className="btn-ghost !py-2 text-[13px]">{l.label}<ArrowUpRight size={14} /></ExternalLink>)}
          </footer>
        </div>
      </motion.article>
    </motion.div>
  )
}
