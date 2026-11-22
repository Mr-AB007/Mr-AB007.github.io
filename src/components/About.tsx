import { Reveal, SectionHeader } from '../ui/primitives'

const facts = [
  { k: '4+ yrs', v: 'professional Java full-stack engineering (resume)' },
  { k: '3', v: 'companies: Cognizant, Arka Fincap, EPAM' },
  { k: 'Fintech · Insurance', v: 'the domains my production systems served' },
  { k: '28', v: 'public repositories, from C++ labs (2020) to a local LLM assistant (2026)' },
]

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="page">
        <SectionHeader index="01" eyebrow="About" title={<>I build systems that have to be right.<br className="hidden sm:block" /> Now I am building ones that can reason.</>} />
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal className="space-y-5 text-[15.5px] leading-relaxed text-fog-300 sm:text-[17px]">
            <p>
              My career so far has been in systems where a dropped message or a slow API means real money: <span className="text-fog-100">insurance and financial platforms at Cognizant</span> and <span className="text-fog-100">core fintech workflows at Arka Fincap</span>. That meant Spring Boot microservices, Kafka event streams, Redis caching, OAuth2/JWT security, React frontends, and owning the self-hosted GitLab CI/CD that put it all on AWS.
            </p>
            <p>
              The same questions that matter in a payment pipeline (what is the contract, what happens when a dependency fails, how do I see what the system did) are the ones that matter in an AI system. So I am learning AI the way I learned backend: <span className="text-fog-100">by building it and shipping versions</span>. B2 runs my own versioned open-weight models on my PC, retrieves and cites web sources, and shows the exact prompt it sends. Applied MLOps takes a model from training data to a served, containerised API.
            </p>
            <p>
              The direction is <span className="text-fog-100">ATHENA</span>: a personal assistant that grows memory, document knowledge, tools and agent workflows on top of that foundation. Each piece on this site is labelled with what is actually built, what I am working on and what is still a plan.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06]">
              {facts.map((f) => (
                <div key={f.k} className="bg-ink-900 p-5">
                  <dt className="text-xl font-semibold tracking-tight text-fog-100 sm:text-2xl">{f.k}</dt>
                  <dd className="mt-1.5 text-[13px] leading-snug text-fog-400">{f.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 font-mono text-[11px] text-fog-500">Every figure here is from my resume or GitHub.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
