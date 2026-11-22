/** Identity and links. Source: Anu_resumeNew.pdf and github.com/Mr-AB007. */
export const profile = {
  name: 'Anubhav Ranjan',
  shortName: 'Anubhav',
  role: 'Full-Stack Software Engineer',
  positioning: ['Full-Stack Engineer', 'AI Engineer in progress', 'Java & Python', 'LLM & Agentic Systems'],
  headline: { lead: 'From event streams', accent: 'to inference streams.' },
  intro:
    'I have spent 4+ years building fintech and insurance platforms with Java, Spring Boot, Kafka, React and AWS. Now I am applying the same engineering discipline to AI: running open-weight models locally, wiring them into real backends, and learning MLOps by shipping it.',
  currentFocus: 'Full Stack Developer at EPAM Systems (Java + React)',
  aiFocus: 'Building B2, my local LLM assistant, as the foundation for ATHENA',
  location: 'India',
  email: 'anubhav7.ranjan@gmail.com',
  links: {
    github: 'https://github.com/Mr-AB007',
    linkedin: 'https://www.linkedin.com/in/anubhav-ranjan007',
    resume: `${import.meta.env.BASE_URL}Anubhav_Ranjan_Resume.pdf`,
  },
} as const
