import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, FileDown } from 'lucide-react'
import { profile } from '../data/profile'

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'lab', label: 'AI Lab' },
  { id: 'athena', label: 'ATHENA' },
  { id: 'activity', label: 'Activity' },
  { id: 'journey', label: 'Journey' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'contact', label: 'Contact' },
]

function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  return active
}

export function Nav() {
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open])

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition duration-300 ${scrolled || open ? 'glass border-x-0 border-t-0' : 'border-b border-transparent'}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-fog-100 focus:px-3 focus:py-1 focus:text-ink-950">Skip to content</a>
      <nav className="page flex h-16 items-center justify-between" aria-label="Main">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-ink-850 font-mono text-[12px] text-signal-cyan transition group-hover:border-signal-cyan/40">AR</span>
          <span className="hidden text-sm font-medium text-fog-100 sm:inline">{profile.name}</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} aria-current={active === s.id ? 'true' : undefined}
                className={`relative rounded-md px-2.5 py-1.5 text-[13px] transition ${active === s.id ? 'text-fog-100' : 'text-fog-400 hover:text-fog-100'}`}>
                {active === s.id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-md bg-white/[0.06]" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href={profile.links.resume} download className="btn-ghost hidden !py-1.5 sm:inline-flex"><FileDown size={15} />Resume</a>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 lg:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/[0.06] bg-ink-950 lg:hidden">
            <ul className="page grid gap-1 py-6">
              {sections.map((s, i) => (
                <motion.li key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }}>
                  <a href={`#${s.id}`} onClick={() => setOpen(false)}
                    className={`flex items-baseline gap-4 rounded-lg px-3 py-3 text-2xl font-medium ${active === s.id ? 'text-fog-100' : 'text-fog-300'}`}>
                    <span className="font-mono text-xs text-fog-500">{String(i + 1).padStart(2, '0')}</span>{s.label}
                  </a>
                </motion.li>
              ))}
              <li className="mt-4 px-3"><a href={profile.links.resume} download className="btn-primary w-full"><FileDown size={16} />Download resume</a></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
