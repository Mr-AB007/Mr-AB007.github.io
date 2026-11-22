import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { Status } from '../data/types'

type Domain = 'core' | 'software' | 'ai' | 'cloud'
interface GNode { id: string; label: string; x: number; y: number; domain: Domain; status: Status; note: string }

/** Every caption is backed by the resume or a public repo; status mirrors the AI lab data. */
const nodes: GNode[] = [
  { id: 'core', label: 'AR', x: 50, y: 50, domain: 'core', status: 'implemented', note: 'One engineer, two stacks: enterprise Java systems and the AI systems growing on top of them.' },
  { id: 'java', label: 'Java', x: 15, y: 22, domain: 'software', status: 'implemented', note: 'Java 8/17/21 across 4+ years at Cognizant, Arka Fincap and EPAM.' },
  { id: 'spring', label: 'Spring Boot', x: 9, y: 52, domain: 'software', status: 'implemented', note: 'Spring Boot microservices for insurance and fintech platforms, plus SmartPay and TradePay.' },
  { id: 'kafka', label: 'Kafka', x: 19, y: 80, domain: 'software', status: 'implemented', note: 'Event-driven processing at Cognizant and Arka Fincap; transaction events in SmartPay.' },
  { id: 'react', label: 'React', x: 35, y: 11, domain: 'software', status: 'implemented', note: 'React components wired end to end with backend APIs; the B2 chat UI.' },
  { id: 'python', label: 'Python', x: 65, y: 11, domain: 'ai', status: 'implemented', note: 'B2\'s backend and RAG pipeline; Applied MLOps exercises and FastAPI serving.' },
  { id: 'llm', label: 'LLMs', x: 86, y: 25, domain: 'ai', status: 'implemented', note: 'Own versioned models (Llama 3.2 → Qwen3 4B) running locally on Ollama in B2.' },
  { id: 'rag', label: 'RAG', x: 91, y: 54, domain: 'ai', status: 'implemented', note: 'Web-search retrieval with query rewriting and cited sources in B2. Document RAG is next.' },
  { id: 'agents', label: 'Agents', x: 81, y: 81, domain: 'ai', status: 'planned', note: 'Planned: tool calling and agent workflows are the next ATHENA milestones.' },
  { id: 'docker', label: 'Docker', x: 40, y: 90, domain: 'cloud', status: 'implemented', note: 'Containerised services at work, in SmartPay and in Applied MLOps.' },
  { id: 'aws', label: 'AWS', x: 61, y: 90, domain: 'cloud', status: 'implemented', note: 'EC2, ECS, ECR and S3 deployments; AWS Certified Cloud Practitioner.' },
]
const edges: [string, string][] = [
  ['core', 'java'], ['core', 'spring'], ['core', 'kafka'], ['core', 'react'], ['core', 'python'], ['core', 'llm'],
  ['core', 'rag'], ['core', 'agents'], ['core', 'docker'], ['core', 'aws'],
  ['java', 'spring'], ['spring', 'kafka'], ['react', 'java'], ['python', 'llm'], ['llm', 'rag'], ['rag', 'agents'],
  ['docker', 'aws'], ['kafka', 'docker'], ['aws', 'agents'], ['react', 'python'],
]
const color: Record<Domain, string> = { core: '232,236,244', software: '91,140,255', ai: '94,230,240', cloud: '157,123,255' }
const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))

export function SystemGraph() {
  const wrap = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState<string | null>(null)
  const activeRef = useRef<string | null>(null)
  activeRef.current = active
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = canvas.current, box = wrap.current
    if (!el || !box) return
    const ctx = el.getContext('2d')
    if (!ctx) return
    let w = 0, h = 0, raf = 0, visible = true
    // One packet per edge, each with its own phase and speed.
    const packets = edges.map((_, i) => ({ t: (i * 0.137) % 1, v: 0.0018 + ((i * 7) % 5) * 0.0005 }))

    const resize = () => {
      const r = box.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width; h = r.height
      el.width = w * dpr; el.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }
    const P = (n: GNode) => [(n.x / 100) * w, (n.y / 100) * h] as const

    function draw() {
      ctx!.clearRect(0, 0, w, h)
      const a = activeRef.current
      edges.forEach(([s, t], i) => {
        const A = byId[s], B = byId[t]
        const lit = !a || a === s || a === t
        const planned = A.status === 'planned' || B.status === 'planned'
        const [x1, y1] = P(A), [x2, y2] = P(B)
        const c = color[B.domain === 'core' ? A.domain : B.domain]
        ctx!.strokeStyle = `rgba(${c},${lit ? 0.22 : 0.05})`
        ctx!.lineWidth = 1
        ctx!.setLineDash(planned ? [3, 5] : [])
        ctx!.beginPath(); ctx!.moveTo(x1, y1); ctx!.lineTo(x2, y2); ctx!.stroke()
        if (planned) return // Nothing flows to planned capabilities yet.
        const p = packets[i], x = x1 + (x2 - x1) * p.t, y = y1 + (y2 - y1) * p.t
        const g = ctx!.createRadialGradient(x, y, 0, x, y, 6)
        g.addColorStop(0, `rgba(${c},${lit ? 0.95 : 0.2})`); g.addColorStop(1, `rgba(${c},0)`)
        ctx!.fillStyle = g; ctx!.beginPath(); ctx!.arc(x, y, 6, 0, Math.PI * 2); ctx!.fill()
      })
      ctx!.setLineDash([])
    }
    const tick = () => {
      packets.forEach((p) => { p.t = (p.t + p.v) % 1 })
      draw()
      if (visible) raf = requestAnimationFrame(tick)
    }

    const ro = new ResizeObserver(resize); ro.observe(box)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible && !reduce) raf = requestAnimationFrame(tick)
    })
    io.observe(box)
    resize()
    const redraw = () => draw()
    box.addEventListener('graph:redraw', redraw)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); box.removeEventListener('graph:redraw', redraw) }
  }, [reduce])

  // Under reduced motion the canvas is static, so redraw when highlighting changes.
  useEffect(() => { wrap.current?.dispatchEvent(new Event('graph:redraw')) }, [active])

  const current = byId[active ?? 'core']
  return (
    <div className="relative">
      <div ref={wrap} className="relative aspect-[1.05/1] w-full sm:aspect-[1.2/1]" onMouseLeave={() => setActive(null)}>
        <div className="absolute inset-[18%] rounded-full bg-signal-cyan/[0.06] blur-3xl" aria-hidden />
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden />
        <ul className="absolute inset-0" aria-label="Technology map">
          {nodes.map((n) => {
            const isCore = n.domain === 'core', on = active === n.id
            const planned = n.status === 'planned'
            return (
              <li key={n.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(n.id)}
                  onFocus={() => setActive(n.id)}
                  onClick={() => setActive(n.id)}
                  aria-label={`${n.label === 'AR' ? 'Anubhav Ranjan' : n.label}: ${n.note}`}
                  className={[
                    'whitespace-nowrap rounded-full font-mono transition duration-300',
                    isCore
                      ? 'grid h-14 w-14 place-items-center border border-white/20 bg-ink-850 text-sm text-fog-100 shadow-[0_0_40px_rgba(94,230,240,0.25)] sm:h-16 sm:w-16'
                      : 'border px-2.5 py-1 text-[10.5px] sm:px-3 sm:text-xs',
                    !isCore && planned ? 'border-dashed border-white/25 bg-ink-950/80 text-fog-400' : '',
                    !isCore && !planned ? 'border-white/10 bg-ink-900/90 text-fog-300 backdrop-blur' : '',
                    on && !isCore ? '!border-signal-cyan/60 !text-fog-100 shadow-[0_0_24px_rgba(94,230,240,0.25)]' : '',
                  ].join(' ')}
                >
                  {!isCore && <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: planned ? 'transparent' : `rgb(${color[n.domain]})`, border: planned ? '1px solid #8A93A8' : undefined }} />}
                  {n.label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="mt-3 flex min-h-[3.5rem] items-start gap-3 rounded-xl border border-white/[0.06] bg-ink-900/60 px-4 py-3" aria-live="polite">
        <span className="mt-0.5 font-mono text-[10.5px] uppercase tracking-widest text-signal-cyan/80">{current.label === 'AR' ? 'core' : current.label}</span>
        <p className="text-[13px] leading-snug text-fog-300">{current.note}</p>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10.5px] text-fog-500">
        <span><i className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-signal-blue" />software</span>
        <span><i className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-signal-cyan" />ai</span>
        <span><i className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-signal-violet" />cloud</span>
        <span><i className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full border border-fog-400" />planned</span>
      </div>
    </div>
  )
}
