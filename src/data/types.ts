/** Shared content types. Every claim in /data should be traceable to the resume or a public repo. */

/** Delivery status used across ATHENA, the AI lab and the roadmap. */
export type Status = 'implemented' | 'in-development' | 'experimental' | 'planned'

export interface Link {
  label: string
  href: string
}

export interface Evidence {
  /** Where the claim comes from, e.g. "Resume · Arka Fincap" or "Repo · b2-personal-ai". */
  source: string
  href?: string
}

export type ProjectCategory =
  | 'AI & LLM Systems'
  | 'MLOps'
  | 'Backend & Microservices'
  | 'Full-Stack'
  | 'Cloud & DevOps'

export interface Project {
  id: string
  name: string
  tagline: string
  category: ProjectCategory
  status: Status
  /** "Personal project" or "Professional work" (no public code). */
  kind: 'personal' | 'professional'
  period: string
  stack: string[]
  /** Accent used for the generated cover. */
  accent: 'cyan' | 'violet' | 'blue' | 'green' | 'amber'
  cover: 'chat' | 'mesh' | 'pipeline' | 'gateway' | 'api' | 'books' | 'runner'
  repo?: string
  extraLinks?: Link[]
  featured?: boolean
  story: {
    problem: string
    architecture: string[]
    engineering: string[]
    contribution: string
    learning: string[]
  }
}
