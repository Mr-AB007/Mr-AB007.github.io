# Anubhav Ranjan · Portfolio

Personal engineering and AI portfolio, served at **https://mr-ab007.github.io**.

React 18 + TypeScript + Vite, Tailwind CSS, Framer Motion and Lucide icons. No backend, and no API tokens in the frontend.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check and build to dist/
npm run preview    # serve the production build
```

## Update the content

All content is in `src/data/` and every claim there should be traceable to the resume or a public repository.

| File | What it holds |
|---|---|
| `profile.ts` | Name, headline, intro, links |
| `projects.ts` | Featured project case studies |
| `skills.ts` | Stack groups and where each skill was used |
| `ai.ts` | AI Lab: built / exploring / next, with evidence links |
| `athena.ts` | ATHENA components, statuses, request trace and build plan |
| `roadmap.ts` | Learning roadmap (`done` / `active` / `future`) |
| `journey.ts` | Timeline, certifications and recognition |
| `github-snapshot.json` | Generated commit history (do not edit by hand) |

Replace `public/Anubhav_Ranjan_Resume.pdf` to update the downloadable resume.

## GitHub data

- **Live:** the Activity section calls the public GitHub API from the visitor's browser (unauthenticated, cached for 10 minutes). If the API is unreachable or rate-limited, the page says so and shows the snapshot.
- **Snapshot:** `scripts/build-github-snapshot.py` builds the heatmap and language history from each public repository's git log. The deploy workflow regenerates it on every push and weekly.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`.
One-time setup: repository **Settings → Pages → Source: GitHub Actions**.
