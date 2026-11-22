import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, FileDown, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { SystemGraph } from './SystemGraph'
import { ExternalLink } from '../ui/primitives'

export function Hero() {
  const reduce = useReducedMotion()
  const fade = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] } })
  return (
    <section id="top" className="relative overflow-hidden pt-24 sm:pt-28 lg:pt-32">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(91,140,255,0.16),transparent)]" aria-hidden />
      <div className="page relative grid items-center gap-12 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-24">
        <div>
          <motion.div {...fade(0)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1.5 pr-3 text-xs text-fog-300">
            <span className="rounded-full bg-signal-green/15 px-2 py-0.5 font-mono text-[10.5px] text-signal-green">now</span>
            {profile.currentFocus}
          </motion.div>
          <motion.p {...fade(0.05)} className="mt-7 font-mono text-sm text-fog-400">{profile.name}</motion.p>
          <motion.h1 {...fade(0.1)} className="mt-3 text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[3.5rem] xl:text-[3.9rem]">
            {profile.headline.lead}
            <br />
            <span className="bg-gradient-to-r from-signal-cyan via-signal-blue to-signal-violet bg-clip-text text-transparent">{profile.headline.accent}</span>
          </motion.h1>
          <motion.ul {...fade(0.18)} className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[12px] text-fog-400" aria-label="Positioning">
            {profile.positioning.map((p, i) => (
              <li key={p} className="flex items-center gap-3">{i > 0 && <span className="text-fog-500" aria-hidden>/</span>}{p}</li>
            ))}
          </motion.ul>
          <motion.p {...fade(0.24)} className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-fog-300 sm:text-lg">{profile.intro}</motion.p>
          <motion.div {...fade(0.3)} className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary"><Mail size={16} />Get in touch</a>
            <a href={profile.links.resume} download className="btn-ghost"><FileDown size={16} />Resume</a>
            <ExternalLink href={profile.links.github} className="btn-ghost !px-3" ><Github size={16} /><span className="sr-only sm:not-sr-only">GitHub</span></ExternalLink>
            <ExternalLink href={profile.links.linkedin} className="btn-ghost !px-3"><Linkedin size={16} /><span className="sr-only sm:not-sr-only">LinkedIn</span></ExternalLink>
          </motion.div>
          <motion.div {...fade(0.36)} className="mt-10 flex items-start gap-3 border-l border-signal-cyan/30 pl-4 text-sm text-fog-400">
            <span className="font-mono text-[11px] uppercase tracking-widest text-signal-cyan/80">ai track</span>
            <span>{profile.aiFocus}</span>
          </motion.div>
        </div>
        <motion.div initial={reduce ? false : { opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}>
          <SystemGraph />
        </motion.div>
      </div>
      <a href="#about" className="page relative hidden items-center gap-2 pb-10 font-mono text-[11px] uppercase tracking-widest text-fog-500 hover:text-fog-300 lg:flex">
        <ArrowDown size={14} /> scroll
      </a>
    </section>
  )
}
