/**
 * Engineering stack. No proficiency percentages: each group lists the places
 * a technology was actually used. Only technologies found in the resume or public repos.
 */
export interface SkillGroup {
  id: string
  title: string
  summary: string
  skills: { name: string; where: string[] }[]
}

const W = {
  epam: 'EPAM',
  arka: 'Arka Fincap',
  cts: 'Cognizant',
  smartpay: 'SmartPay',
  tradepay: 'TradePay',
  b2: 'B2',
  mlops: 'Applied MLOps',
  journal: 'Journal API',
  apis: 'Task & Loan APIs',
  library: 'Library App',
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    title: 'Backend',
    summary: 'Where most of my professional years went: Spring Boot services for fintech and insurance.',
    skills: [
      { name: 'Java 8 / 17 / 21', where: [W.arka, W.cts, W.smartpay, W.tradepay] },
      { name: 'Spring Boot 3', where: [W.arka, W.cts, W.smartpay, W.tradepay, W.journal] },
      { name: 'Microservices', where: [W.arka, W.cts, W.smartpay, W.tradepay] },
      { name: 'REST APIs', where: [W.arka, W.cts, W.apis, W.journal] },
      { name: 'Hibernate / JPA', where: [W.arka, W.cts, W.library] },
      { name: 'Spring Security · OAuth2 / JWT', where: [W.arka, W.cts, W.apis, W.journal] },
      { name: 'Spring Cloud Gateway · Eureka · OpenFeign', where: [W.smartpay, W.tradepay] },
      { name: 'Resilience4j', where: [W.smartpay, W.tradepay] },
      { name: 'Python', where: [W.b2, W.mlops] },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    summary: 'React components wired end to end with the APIs behind them.',
    skills: [
      { name: 'React (hooks)', where: [W.epam, W.arka, W.cts, W.b2, W.library] },
      { name: 'TypeScript', where: [W.library, 'This site'] },
      { name: 'JavaScript', where: [W.b2] },
      { name: 'Vite · Framer Motion · Bootstrap', where: [W.b2, 'This site'] },
      { name: 'HTML / CSS', where: [W.cts, W.arka] },
    ],
  },
  {
    id: 'data',
    title: 'Data & Messaging',
    summary: 'Relational stores, caches and event streams.',
    skills: [
      { name: 'Apache Kafka', where: [W.arka, W.cts, W.smartpay] },
      { name: 'PostgreSQL', where: [W.arka, W.cts, W.smartpay] },
      { name: 'Redis (caching, rate limiting)', where: [W.arka, W.cts, W.smartpay] },
      { name: 'MySQL', where: [W.tradepay, W.apis] },
      { name: 'MongoDB', where: [W.journal] },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    summary: 'I have owned the pipeline, not just used it.',
    skills: [
      { name: 'AWS (EC2, ECS, ECR, S3)', where: [W.arka, W.cts] },
      { name: 'Docker · Docker Compose', where: [W.arka, W.cts, W.smartpay, W.mlops] },
      { name: 'GitLab CI/CD (self-hosted runners)', where: [W.arka, W.smartpay] },
      { name: 'Kaniko · Trivy', where: [W.smartpay] },
      { name: 'Maven · SonarQube', where: [W.arka] },
      { name: 'Cucumber · Swagger · Postman', where: [W.cts, W.tradepay, W.apis] },
    ],
  },
  {
    id: 'ai',
    title: 'AI & LLM',
    summary: 'Newest group, and it grows with every release of B2.',
    skills: [
      { name: 'Ollama · open-weight LLMs', where: [W.b2] },
      { name: 'Qwen3 / Llama 3.2 Modelfiles', where: [W.b2] },
      { name: 'RAG (web search + citations)', where: [W.b2] },
      { name: 'Prompt engineering · personas', where: [W.b2] },
      { name: 'Hugging Face Inference API', where: [W.journal] },
      { name: 'scikit-learn · Pandas · NumPy', where: [W.mlops] },
      { name: 'FastAPI model serving', where: [W.mlops] },
      { name: 'Claude Code · GitHub Copilot', where: ['Daily work', W.cts] },
    ],
  },
]
