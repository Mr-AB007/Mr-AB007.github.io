/**
 * Career and learning timeline. Dates come from the resume (roles, education)
 * and from first/last commit dates of public repositories (personal milestones).
 */
export type JourneyKind = 'education' | 'work' | 'build' | 'ai' | 'next'

export interface JourneyItem {
  date: string
  title: string
  org?: string
  kind: JourneyKind
  body: string
  points?: string[]
  href?: string
}

export const journey: JourneyItem[] = [
  {
    date: '2020 – 2021',
    title: 'Foundations in code',
    kind: 'education',
    body: 'First public repositories: data structures in C++, Java and Python practice, competitive programming, and a first ML notebook (Census Income Prediction, Apr 2021).',
    href: 'https://github.com/Mr-AB007/Census-Income-Prediction',
  },
  {
    date: '2022',
    title: 'MCA, Lovely Professional University',
    org: 'Punjab · CGPA 8.5 / 10',
    kind: 'education',
    body: 'Master of Computer Applications.',
  },
  {
    date: 'Jun 2022 – Apr 2026',
    title: 'Associate, Java Full Stack',
    org: 'Cognizant · Pune',
    kind: 'work',
    body: 'Enterprise insurance and financial applications.',
    points: [
      'Designed and built scalable Spring Boot microservices and REST APIs (Hibernate/JPA, PostgreSQL).',
      'Integrated Apache Kafka for asynchronous, event-driven real-time processing.',
      'Implemented Redis caching and OAuth2/JWT with Spring Security across services.',
      'Built React UI components consuming REST APIs.',
      'Deployed Docker-based services on AWS (EC2, S3, ECS); Cucumber testing in CI/CD.',
      'Used GitHub Copilot for coding, unit test generation and code review.',
    ],
  },
  {
    date: 'Nov 2024 – Nov 2025',
    title: 'Building outside work',
    kind: 'build',
    body: 'Library App (React + TS + Spring), secured Task & Loan APIs, a Journal API calling Hugging Face models, then the TradePay microservices with Eureka, a gateway and circuit breakers.',
  },
  {
    date: 'May – Jun 2026',
    title: 'SmartPay platform',
    kind: 'build',
    body: 'Event-driven banking microservices with Kafka, Redis, Resilience4j, correlation-ID tracing and a GitLab CI pipeline with Kaniko and Trivy.',
    href: 'https://github.com/Mr-AB007/smartpay-platform',
  },
  {
    date: 'Jun – Oct 2026',
    title: 'Assistant Manager, Java Full Stack',
    org: 'Arka Fincap · Mumbai',
    kind: 'work',
    body: 'Core fintech workflows, from design to production support.',
    points: [
      'Built and maintained Spring Boot microservices with Hibernate/JPA and PostgreSQL.',
      'Decoupled services with Apache Kafka; secured traffic with OAuth2/JWT; Redis caching.',
      'Responsive React components integrated end to end with backend APIs.',
      'Owned the team\'s self-hosted GitLab CI/CD, deploying to AWS ECS, ECR and EC2.',
    ],
  },
  {
    date: 'Jul – Sep 2026',
    title: 'Applied MLOps',
    kind: 'ai',
    body: 'ML fundamentals, evaluation and feature engineering, serving a trained model with FastAPI, and Docker.',
    href: 'https://github.com/Mr-AB007/applied-mlops',
  },
  {
    date: 'Nov 2026 – now',
    title: 'Full Stack Developer',
    org: 'EPAM Systems',
    kind: 'work',
    body: 'Java + React role. Completed the Gemini Enterprise certification; Claude Architect certification in progress.',
  },
  {
    date: 'Nov 2026',
    title: 'B2, my local AI assistant',
    kind: 'ai',
    body: 'Own versioned models on Ollama, streaming chat, web-search RAG with citations and an "Under the hood" panel.',
    href: 'https://github.com/Mr-AB007/b2-personal-ai',
  },
  {
    date: 'Next',
    title: 'ATHENA',
    kind: 'next',
    body: 'Memory, document RAG, tool calling and agent workflows on top of B2, then evaluation, deployment and MLOps.',
  },
]

export interface Credential {
  title: string
  issuer: string
  state: 'earned' | 'in-progress'
  note?: string
}

export const credentials: Credential[] = [
  { title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', state: 'earned' },
  { title: 'Claude Architect certification', issuer: 'Anthropic', state: 'in-progress', note: 'In progress, per resume (Nov 2026)' },
  { title: 'Gemini Enterprise certification', issuer: 'Google', state: 'earned', note: 'Completed' },
]

export const recognitions = ['Star Performer of the Month', 'Best Project Team recognition', 'Active on LeetCode, GeeksforGeeks and HackerRank']
