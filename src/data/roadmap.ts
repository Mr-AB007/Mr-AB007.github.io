/**
 * Learning roadmap. Edit this file to move items between states:
 * 'done' = completed with evidence, 'active' = in progress now, 'future' = not started.
 */
export type RoadmapState = 'done' | 'active' | 'future'

export interface RoadmapPhase {
  phase: number
  title: string
  goal: string
  items: { name: string; state: RoadmapState; note?: string }[]
}

export const roadmap: RoadmapPhase[] = [
  {
    phase: 1,
    title: 'Foundations',
    goal: 'Python, data handling and the core ideas of machine learning.',
    items: [
      { name: 'Python for AI', state: 'done', note: 'Applied MLOps, days 1–5' },
      { name: 'NumPy & Pandas data handling', state: 'done', note: 'Applied MLOps' },
      { name: 'ML fundamentals & evaluation', state: 'done', note: 'Applied MLOps, days 9–10' },
      { name: 'Math for ML', state: 'future' },
    ],
  },
  {
    phase: 2,
    title: 'AI Systems',
    goal: 'How LLMs run: inference, prompting and representation.',
    items: [
      { name: 'Local inference', state: 'done', note: 'B2 on Ollama' },
      { name: 'Prompt engineering', state: 'done', note: 'B2 personas & Modelfiles' },
      { name: 'Quantization & model selection', state: 'done', note: 'Qwen3 4B q4_K_M' },
      { name: 'LLM architecture', state: 'future' },
      { name: 'Embeddings', state: 'future' },
    ],
  },
  {
    phase: 3,
    title: 'LLM Applications',
    goal: 'Retrieval, memory and application architecture.',
    items: [
      { name: 'RAG over the web', state: 'done', note: 'B2 web search with citations' },
      { name: 'RAG over documents', state: 'future' },
      { name: 'Vector databases', state: 'future' },
      { name: 'Memory', state: 'future' },
    ],
  },
  {
    phase: 4,
    title: 'Agentic Systems',
    goal: 'Models that act: tools, workflows and orchestration.',
    items: [
      { name: 'Tool calling', state: 'future' },
      { name: 'Agent workflows', state: 'future' },
      { name: 'Orchestration', state: 'future' },
      { name: 'Multi-agent concepts', state: 'future' },
    ],
  },
  {
    phase: 5,
    title: 'AI Infrastructure',
    goal: 'Serve, ship and watch models in production.',
    items: [
      { name: 'Docker', state: 'done', note: 'SmartPay, Applied MLOps' },
      { name: 'Model serving', state: 'done', note: 'FastAPI /predict' },
      { name: 'MLOps CI/CD', state: 'active', note: 'Applied MLOps, next stage' },
      { name: 'Evaluation', state: 'future' },
      { name: 'Monitoring', state: 'future' },
    ],
  },
  {
    phase: 6,
    title: 'Model Development',
    goal: 'Customise models with my own data.',
    items: [
      { name: 'Model customization (Modelfiles)', state: 'done', note: 'b2:v1, b2:v2' },
      { name: 'Fine-tuning (LoRA)', state: 'active', note: 'b2:v3 planned' },
      { name: 'Dataset preparation', state: 'future' },
      { name: 'Training experiments', state: 'future' },
    ],
  },
]
