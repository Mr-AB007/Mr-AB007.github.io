import type { Evidence, Status } from './types'

/**
 * AI Engineering Lab. Three lanes, each capability with the evidence behind it.
 * built     = working code in a public repo
 * exploring = started, in progress or being learned now
 * next      = on the roadmap, nothing built yet
 */
export type Lane = 'built' | 'exploring' | 'next'

export interface Capability {
  name: string
  area: 'LLM Engineering' | 'Agentic AI' | 'AI Architecture' | 'MLOps' | 'Foundations'
  lane: Lane
  detail: string
  evidence?: Evidence
}

const b2 = { source: 'B2', href: 'https://github.com/Mr-AB007/b2-personal-ai' }
const mlops = { source: 'Applied MLOps', href: 'https://github.com/Mr-AB007/applied-mlops' }

export const capabilities: Capability[] = [
  // Built & implemented
  { name: 'LLM integration', area: 'LLM Engineering', lane: 'built', detail: 'Python backend proxying Ollama chat and generate APIs with token streaming to a React UI.', evidence: b2 },
  { name: 'Open-weight model selection', area: 'LLM Engineering', lane: 'built', detail: 'Moved from Llama 3.2 3B to Qwen3 4B Instruct for licensing and quality; chose Instruct over Thinking for latency.', evidence: b2 },
  { name: 'Quantized local inference', area: 'LLM Engineering', lane: 'built', detail: 'q4_K_M build of Qwen3 4B sized to fit a 4 GB GPU, with a fixed context window to avoid reloads.', evidence: b2 },
  { name: 'Model customization (Modelfiles)', area: 'LLM Engineering', lane: 'built', detail: 'Versioned b2:v1 and b2:v2 models with baked-in identity and parameters, one-command upgrade and rollback.', evidence: b2 },
  { name: 'Prompt engineering', area: 'LLM Engineering', lane: 'built', detail: 'Persona system prompts as data (personas.json); temperature and sampling controls.', evidence: b2 },
  { name: 'Context management', area: 'Agentic AI', lane: 'built', detail: 'Full conversation resent each turn within a 4096-token window shared with retrieved sources.', evidence: b2 },
  { name: 'Retrieval-augmented generation (web)', area: 'AI Architecture', lane: 'built', detail: 'Query rewriting, Wikipedia / Ollama Web Search retrieval, numbered context and cited source cards.', evidence: b2 },
  { name: 'Prompt & token inspection', area: 'MLOps', lane: 'built', detail: '"Under the hood" panel showing the exact prompt, token counts, speed and each search step.', evidence: b2 },
  { name: 'AI from a Java backend', area: 'AI Architecture', lane: 'built', detail: 'Spring Boot service calling a Hugging Face sentiment model to enrich journal entries.', evidence: { source: 'Journal API', href: 'https://github.com/Mr-AB007/journal-api' } },
  { name: 'Model serving with FastAPI', area: 'MLOps', lane: 'built', detail: 'Trained scikit-learn model served through typed /predict and /health endpoints.', evidence: mlops },
  { name: 'Containerised services', area: 'MLOps', lane: 'built', detail: 'Docker images for Python services; Kaniko builds and Trivy scans in GitLab CI.', evidence: mlops },
  { name: 'ML fundamentals', area: 'Foundations', lane: 'built', detail: 'Train/test split, overfitting, evaluation metrics and feature engineering exercises.', evidence: mlops },

  // Currently exploring
  { name: 'LoRA fine-tuning', area: 'LLM Engineering', lane: 'exploring', detail: 'b2:v3 is planned as a LoRA fine-tune on my own example chats (Unsloth + Colab).', evidence: b2 },
  { name: 'MLOps CI/CD & deployment', area: 'MLOps', lane: 'exploring', detail: 'Next stage of Applied MLOps: automated training-to-deployment pipelines.', evidence: mlops },
  { name: 'AI architecture (Claude Architect)', area: 'AI Architecture', lane: 'exploring', detail: 'Certification in progress alongside daily AI-assisted engineering with Claude Code.' },
  { name: 'Deep learning & LLM internals', area: 'Foundations', lane: 'next', detail: 'Tokenization, attention and training, to understand what B2\'s inspection panel shows.' },

  // Next on the roadmap
  { name: 'Embeddings & vector search', area: 'AI Architecture', lane: 'next', detail: 'Chat with my own documents: PDF and notes ingestion, embeddings and a vector store.' },
  { name: 'Persistent memory', area: 'Agentic AI', lane: 'next', detail: 'Long-term memory that survives sessions instead of resending history.' },
  { name: 'Tool calling', area: 'Agentic AI', lane: 'next', detail: 'Calculator, time and file tools first, as listed on the B2 roadmap.' },
  { name: 'Agent workflows & orchestration', area: 'Agentic AI', lane: 'next', detail: 'Multi-step tasks with human-in-the-loop approval.' },
  { name: 'Structured output', area: 'LLM Engineering', lane: 'next', detail: 'JSON-schema constrained responses for tool and API use.' },
  { name: 'Evaluation & monitoring', area: 'MLOps', lane: 'next', detail: 'Regression sets for each model version and runtime observability.' },
]

export const laneMeta: Record<Lane, { title: string; blurb: string; status: Status }> = {
  built: { title: 'Built & implemented', blurb: 'Working code you can open on GitHub.', status: 'implemented' },
  exploring: { title: 'Currently exploring', blurb: 'Started, in progress or being learned now.', status: 'in-development' },
  next: { title: 'Next on my roadmap', blurb: 'Planned. Nothing to show yet, and labelled that way.', status: 'planned' },
}
