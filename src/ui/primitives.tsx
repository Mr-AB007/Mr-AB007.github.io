import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode, MouseEvent } from 'react'
import type { Status } from '../data/types'

/** Fades content in once when it scrolls into view. Static under reduced motion. */
export function Reveal({ children, delay = 0, className, y = 18 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeader({ index, eyebrow, title, lede }: { index: string; eyebrow: string; title: ReactNode; lede?: ReactNode }) {
  return (
    <Reveal className="mb-10 sm:mb-14">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] text-fog-500">{index}</span>
        <span className="h-px w-8 bg-gradient-to-r from-signal-cyan/60 to-transparent" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="h-section mt-4">{title}</h2>
      {lede && <p className="lede mt-4">{lede}</p>}
    </Reveal>
  )
}

export const statusMeta: Record<Status, { label: string; dot: string; text: string; ring: string }> = {
  implemented: { label: 'Implemented', dot: 'bg-signal-green', text: 'text-signal-green', ring: 'border-signal-green/30 bg-signal-green/[0.07]' },
  'in-development': { label: 'In development', dot: 'bg-signal-cyan animate-pulseDot', text: 'text-signal-cyan', ring: 'border-signal-cyan/30 bg-signal-cyan/[0.07]' },
  experimental: { label: 'Experimental', dot: 'bg-signal-violet', text: 'text-signal-violet', ring: 'border-signal-violet/30 bg-signal-violet/[0.08]' },
  planned: { label: 'Planned', dot: 'border border-fog-400 bg-transparent', text: 'text-fog-400', ring: 'border-dashed border-white/15 bg-transparent' },
}

export function StatusBadge({ status, className = '' }: { status: Status; className?: string }) {
  const m = statusMeta[status]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10.5px] ${m.ring} ${m.text} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} aria-hidden />
      {m.label}
    </span>
  )
}

/** Updates the CSS vars used by the .spotlight hover effect. */
export function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}
