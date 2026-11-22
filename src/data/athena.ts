import type { Status } from './types'

/**
 * ATHENA: product vision for a personal AI assistant.
 * Statuses reflect the B2 repository (b2-personal-ai), which is ATHENA's working foundation today.
 * Update a component's `status` here as work lands; the diagram and roadmap read from this file.
 */
export interface AthenaComponent {
  id: string
  layer: 'Interface' | 'Orchestration' | 'Intelligence' | 'Knowledge' | 'Platform'
  name: string
  status: Status
  summary: string
  /** What exists today (only when something does). */
  today?: string
  tech: string[]
}

export const athenaComponents: AthenaComponent[] = [
  { id: 'ui', layer: 'Interface', name: 'Conversation UI', status: 'implemented', summary: 'Streaming chat with markdown, code blocks, history, search, regenerate and personas.', today: 'B2 React + Vite frontend.', tech: ['React', 'Vite', 'Framer Motion'] },
  { id: 'hood', layer: 'Interface', name: 'Inspection panel', status: 'implemented', summary: 'Shows the exact prompt, token counts, speed and retrieval steps for every answer.', today: 'B2 "Under the hood" panel.', tech: ['React'] },
  { id: 'api', layer: 'Orchestration', name: 'Assistant backend', status: 'implemented', summary: 'Builds prompts, applies personas, runs retrieval and streams model output.', today: 'B2 server.py (Python standard library), streaming NDJSON to the browser.', tech: ['Python', 'NDJSON streaming'] },
  { id: 'tools', layer: 'Orchestration', name: 'Tools & function calling', status: 'planned', summary: 'Let the model call calculator, time and file tools, then external APIs.', tech: ['Tool schemas'] },
  { id: 'agents', layer: 'Orchestration', name: 'Agent workflows', status: 'planned', summary: 'Multi-step plans with checkpoints where I approve actions.', tech: ['Orchestration', 'Human-in-the-loop'] },
  { id: 'model', layer: 'Intelligence', name: 'Open-weight model layer', status: 'implemented', summary: 'Versioned local models with upgrade and rollback.', today: 'b2:v1 (Llama 3.2 3B) → b2:v2 (Qwen3 4B Instruct, q4_K_M) on Ollama.', tech: ['Ollama', 'Qwen3', 'Modelfiles'] },
  { id: 'finetune', layer: 'Intelligence', name: 'Fine-tuned model', status: 'in-development', summary: 'b2:v3: a LoRA fine-tune trained on my own example chats.', today: 'Planned in the B2 model table; LoRA is what I am learning now.', tech: ['LoRA', 'Unsloth'] },
  { id: 'webrag', layer: 'Knowledge', name: 'Web retrieval (RAG)', status: 'implemented', summary: 'Query rewriting, search, numbered context and cited sources.', today: 'B2 web_search.py with Wikipedia or Ollama Web Search.', tech: ['RAG', 'Wikipedia API'] },
  { id: 'store', layer: 'Knowledge', name: 'Conversation store', status: 'implemented', summary: 'Chats, persona and settings persist between visits.', today: 'Saved in the browser (localStorage) by the B2 frontend.', tech: ['localStorage'] },
  { id: 'docrag', layer: 'Knowledge', name: 'Document knowledge base', status: 'planned', summary: 'Ingest PDFs and notes, embed them and retrieve by meaning.', tech: ['Embeddings', 'Vector DB'] },
  { id: 'memory', layer: 'Knowledge', name: 'Persistent memory', status: 'planned', summary: 'Facts and preferences that persist across conversations.', today: 'Today the chat history is the only memory.', tech: ['Memory store'] },
  { id: 'eval', layer: 'Platform', name: 'Evaluation & observability', status: 'experimental', summary: 'Measure each model version before it replaces the last one.', today: 'Per-answer token and speed readouts exist; no evaluation suite yet.', tech: ['Eval sets', 'Metrics'] },
  { id: 'deploy', layer: 'Platform', name: 'Deployment & MLOps', status: 'planned', summary: 'Containerised services and a CI/CD path from model build to release.', today: 'Runs locally via start.bat; Docker and FastAPI serving practised in Applied MLOps.', tech: ['Docker', 'CI/CD'] },
]

export const athenaLayers: AthenaComponent['layer'][] = ['Interface', 'Orchestration', 'Intelligence', 'Knowledge', 'Platform']

/** The 13-step build plan, in order. */
export const athenaRoadmap: { step: string; status: Status }[] = [
  { step: 'Integrate an open-weight LLM', status: 'implemented' },
  { step: 'Local AI assistant', status: 'implemented' },
  { step: 'Conversation interface', status: 'implemented' },
  { step: 'Persistent memory', status: 'planned' },
  { step: 'RAG (web search shipped; documents next)', status: 'in-development' },
  { step: 'Knowledge ingestion & retrieval', status: 'planned' },
  { step: 'Tools & function calling', status: 'planned' },
  { step: 'Agentic workflows', status: 'planned' },
  { step: 'Orchestration', status: 'planned' },
  { step: 'Model customization & fine-tuning', status: 'in-development' },
  { step: 'Evaluation & observability', status: 'experimental' },
  { step: 'Deployment & MLOps', status: 'planned' },
  { step: 'A complete AI product', status: 'planned' },
]

/** "Trace a request": the real path of one B2 answer with web search on. */
export const athenaTrace: { id: string; caption: string }[] = [
  { id: 'ui', caption: 'The browser sends the whole conversation. The model has no memory of its own.' },
  { id: 'api', caption: 'server.py adds the persona\'s system prompt and opens a streaming response.' },
  { id: 'webrag', caption: 'A temperature-0 call rewrites the last message into a search query, then results become numbered sources.' },
  { id: 'model', caption: 'b2:latest (Qwen3 4B Instruct) runs on the GPU through Ollama and streams tokens back.' },
  { id: 'hood', caption: 'The answer renders with [1] [2] citations, and the inspection panel shows the exact prompt, tokens and speed.' },
]
