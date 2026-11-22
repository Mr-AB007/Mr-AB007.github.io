import { useMemo, useState } from 'react'
import { ArrowUpRight, GitCommitHorizontal, Star } from 'lucide-react'
import { snapshotMeta, useGitHub } from '../hooks/useGitHub'
import { ExternalLink, Reveal, SectionHeader } from '../ui/primitives'

const langColor: Record<string, string> = {
  Java: '#5B8CFF', Python: '#5EE6F0', JavaScript: '#F5B54A', TypeScript: '#9D7BFF', 'Jupyter Notebook': '#4ADE9B', 'C++': '#E879A6', HTML: '#F28C6B', Other: '#646D82',
}
const fmt = (d: string) => new Date(d + (d.length === 10 ? 'T00:00:00' : '')).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
function ago(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 864e5)
  if (days < 1) return 'today'
  if (days < 2) return 'yesterday'
  if (days < 31) return `${days} days ago`
  const m = Math.floor(days / 30.4)
  return m < 12 ? `${m} mo ago` : `${Math.floor(m / 12)} yr ago`
}

/** 53 columns of weeks ending at the snapshot date. */
function useHeatmap() {
  return useMemo(() => {
    const end = new Date(snapshotMeta.generatedAt + 'T00:00:00')
    const start = new Date(end); start.setDate(start.getDate() - 364 - start.getDay())
    const weeks: { date: string; n: number }[][] = []
    let total = 0, activeDays = 0
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      const n = snapshotMeta.daily[key] ?? 0
      total += n; if (n) activeDays += 1
      if (d.getDay() === 0) weeks.push([])
      weeks[weeks.length - 1].push({ date: key, n })
    }
    return { weeks, total, activeDays }
  }, [])
}

/** Commits per year, split by each repository's primary language. */
function useLanguageYears() {
  return useMemo(() => {
    const years: Record<string, Record<string, number>> = {}
    snapshotMeta.repos.forEach((r) => {
      const lang = r.language ?? 'Other'
      Object.entries(r.months).forEach(([m, n]) => {
        const y = m.slice(0, 4)
        years[y] ??= {}
        years[y][lang] = (years[y][lang] ?? 0) + n
      })
    })
    const rows = Object.entries(years).sort(([a], [b]) => a.localeCompare(b))
    const max = Math.max(...rows.map(([, v]) => Object.values(v).reduce((a, b) => a + b, 0)))
    return { rows, max }
  }, [])
}

const level = (n: number) => (n === 0 ? 'bg-ink-800' : n < 2 ? 'bg-signal-cyan/25' : n < 4 ? 'bg-signal-cyan/45' : n < 7 ? 'bg-signal-cyan/70' : 'bg-signal-cyan')

export function Activity() {
  const gh = useGitHub()
  const heat = useHeatmap()
  const langs = useLanguageYears()
  const [hoverDay, setHoverDay] = useState<{ date: string; n: number } | null>(null)
  const recentRepos = gh.repos.slice(0, 6)

  const badge = gh.source === 'live'
    ? <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-signal-green"><i className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-signal-green" />Live · GitHub API</span>
    : gh.source === 'loading'
      ? <span className="font-mono text-[11px] text-fog-500">Contacting GitHub…</span>
      : <span className="font-mono text-[11px] text-signal-amber">GitHub API unavailable · showing snapshot from {fmt(snapshotMeta.generatedAt)}</span>

  return (
    <section id="activity" className="relative py-20 sm:py-28">
      <div className="page">
        <SectionHeader index="06" eyebrow="GitHub activity" title="What I have actually been shipping."
          lede="Real data from my public repositories. Repositories and recent pushes load live from the GitHub API when it is reachable. The history charts come from the git log of each repository." />

        <div className="grid gap-4 lg:grid-cols-[1.45fr_1fr]">
          <Reveal className="panel p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold tracking-tight">Commits, last 12 months</h3>
              <p className="font-mono text-[11.5px] text-fog-400">{heat.total} commits · {heat.activeDays} active days</p>
            </div>
            <div className="scrollbar-none mt-5 overflow-x-auto pb-1">
              <div className="flex w-max gap-[3px]" role="img" aria-label={`${heat.total} commits across ${heat.activeDays} days in the 12 months to ${fmt(snapshotMeta.generatedAt)}`}>
                {heat.weeks.map((w, i) => (
                  <div key={i} className="flex flex-col gap-[3px]">
                    {w.map((d) => (
                      <span key={d.date} onMouseEnter={() => setHoverDay(d)} onMouseLeave={() => setHoverDay(null)}
                        className={`h-[10px] w-[10px] rounded-[2px] transition-transform hover:scale-125 ${level(d.n)}`} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 h-4 font-mono text-[11px] text-fog-400">
              {hoverDay ? `${hoverDay.n} commit${hoverDay.n === 1 ? '' : 's'} on ${fmt(hoverDay.date)}` : `Default branches of public repos · through ${fmt(snapshotMeta.generatedAt)}`}
            </p>

            <h3 className="mt-8 font-semibold tracking-tight">Languages over time</h3>
            <p className="mt-1 text-[13px] text-fog-400">Commits per year, coloured by each repository's main language.</p>
            <ul className="mt-4 space-y-2">
              {langs.rows.map(([year, v]) => {
                const total = Object.values(v).reduce((a, b) => a + b, 0)
                return (
                  <li key={year} className="grid grid-cols-[40px_1fr_36px] items-center gap-3">
                    <span className="font-mono text-[11.5px] text-fog-400">{year}</span>
                    <div className="flex h-3.5 overflow-hidden rounded-sm bg-ink-800" style={{ width: `${Math.max(4, (total / langs.max) * 100)}%` }}>
                      {Object.entries(v).sort((a, b) => b[1] - a[1]).map(([l, n]) => (
                        <span key={l} title={`${l}: ${n}`} style={{ width: `${(n / total) * 100}%`, background: langColor[l] ?? langColor.Other }} />
                      ))}
                    </div>
                    <span className="text-right font-mono text-[11px] text-fog-500">{total}</span>
                  </li>
                )
              })}
            </ul>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
              {Object.entries(langColor).filter(([l]) => l !== 'Other').map(([l, c]) => (
                <li key={l} className="flex items-center gap-1.5 font-mono text-[10.5px] text-fog-400"><i className="h-2 w-2 rounded-sm" style={{ background: c }} />{l}</li>
              ))}
            </ul>
          </Reveal>

          <div className="grid min-w-0 gap-4">
            <Reveal delay={0.06} className="panel p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold tracking-tight">Recently pushed</h3>
                {badge}
              </div>
              <ul className={`mt-4 divide-y divide-white/[0.05] ${gh.source === 'loading' ? 'animate-pulse' : ''}`}>
                {recentRepos.map((r) => (
                  <li key={r.name}>
                    <ExternalLink href={r.url} className="group flex items-start justify-between gap-3 py-3">
                      <span className="min-w-0">
                        <span className="flex items-center gap-2 text-[14px] font-medium text-fog-100">
                          <i className="h-2 w-2 shrink-0 rounded-full" style={{ background: langColor[r.language ?? 'Other'] ?? langColor.Other }} />
                          <span className="truncate">{r.name}</span>
                        </span>
                        {r.description && <span className="mt-0.5 line-clamp-1 block pl-4 text-[12.5px] text-fog-400">{r.description}</span>}
                      </span>
                      <span className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-fog-500">
                        {r.stars > 0 && <span className="flex items-center gap-0.5"><Star size={11} />{r.stars}</span>}
                        {ago(r.pushedAt)}
                        <ArrowUpRight size={13} className="transition group-hover:text-signal-cyan" />
                      </span>
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className="panel p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold tracking-tight">Recent commits</h3>
                <span className="font-mono text-[11px] text-fog-500">{gh.commitsLive ? 'live' : `snapshot · ${fmt(snapshotMeta.generatedAt)}`}</span>
              </div>
              <ol className="mt-4 space-y-3">
                {gh.commits.slice(0, 6).map((c, i) => (
                  <li key={`${c.repo}-${i}`} className="flex gap-3">
                    <GitCommitHorizontal size={15} className="mt-0.5 shrink-0 text-fog-500" />
                    <div className="min-w-0">
                      <p className="truncate text-[13.5px] text-fog-100">{c.message}</p>
                      <p className="font-mono text-[11px] text-fog-500">{c.repo} · {fmt(c.date)}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <ExternalLink href="https://github.com/Mr-AB007?tab=repositories" className="mt-5 inline-flex items-center gap-1 text-[13px] text-fog-300 hover:text-fog-100">All repositories<ArrowUpRight size={14} /></ExternalLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
