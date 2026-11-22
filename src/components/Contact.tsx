import { useState } from 'react'
import { Check, Copy, FileDown, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { ExternalLink, Reveal } from '../ui/primitives'

export function Contact() {
  const [copied, setCopied] = useState<'ok' | 'fail' | null>(null)
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied('ok') } catch { setCopied('fail') }
    window.setTimeout(() => setCopied(null), 2200)
  }
  const links = [
    { label: 'GitHub', sub: 'Mr-AB007', href: profile.links.github, icon: Github },
    { label: 'LinkedIn', sub: 'anubhav-ranjan007', href: profile.links.linkedin, icon: Linkedin },
  ]
  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[500px] bg-[radial-gradient(ellipse_at_bottom,rgba(91,140,255,0.12),transparent_65%)]" aria-hidden />
      <div className="page relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">09 · Contact</p>
          <h2 className="mt-4 text-[2.2rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl">Building something with Java, or with LLMs?<br className="hidden sm:block" /> <span className="text-fog-400">I would like to hear about it.</span></h2>
          <p className="mx-auto mt-5 max-w-xl text-fog-300">Open to conversations about backend and full-stack engineering, AI application development and the projects on this page.</p>

          <div className="mx-auto mt-10 flex max-w-xl flex-col items-stretch gap-2 rounded-2xl border border-white/10 bg-ink-900/80 p-2 sm:flex-row sm:items-center">
            <a href={`mailto:${profile.email}`} className="flex min-w-0 flex-1 items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-white/[0.03]">
              <Mail size={18} className="shrink-0 text-signal-cyan" />
              <span className="truncate font-mono text-[14px] text-fog-100 sm:text-[15px]">{profile.email}</span>
            </a>
            <button type="button" onClick={copy} className="btn-primary shrink-0" aria-live="polite">
              {copied === 'ok' ? <><Check size={16} />Copied</> : copied === 'fail' ? 'Copy blocked' : <><Copy size={16} />Copy email</>}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {links.map(({ label, sub, href, icon: Icon }) => (
              <ExternalLink key={label} href={href} className="btn-ghost"><Icon size={16} />{label}<span className="hidden font-mono text-[11px] text-fog-500 sm:inline">{sub}</span></ExternalLink>
            ))}
            <a href={profile.links.resume} download className="btn-ghost"><FileDown size={16} />Resume (PDF)</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="page flex flex-col gap-3 font-mono text-[11.5px] text-fog-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Built with React, TypeScript, Tailwind and Framer Motion · hosted on GitHub Pages</p>
      </div>
    </footer>
  )
}
