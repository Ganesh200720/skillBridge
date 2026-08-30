# SkillBridge — Frontend

**Smart India Hackathon · SIH26044**
Person 2 · Frontend responsibility

## Tech stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + CSS Custom Properties |
| Auth | JWT (stored in localStorage, context via React Context) |
| API client | Custom fetch wrapper (`lib/api/client.ts`) |

## Quick start

```bash
cd frontend
cp .env.example .env.local      # already created with dev defaults
npm run dev                      # http://localhost:3000
```

Make sure the Django backend is running at `http://127.0.0.1:8000`.

## Project structure

```
frontend/
├── app/                   # Next.js App Router pages
│   ├── layout.tsx         # Root layout (AuthProvider, fonts)
│   ├── page.tsx           # Landing page — role selection
│   └── auth/              # Auth route (login/signup — placeholder)
├── components/
│   ├── ui/                # Reusable UI primitives
│   └── layout/            # Sidebar, navbar, shell components
├── features/              # Feature-level components (student, industry, etc.)
├── lib/
│   ├── api/               # All HTTP calls — centralised here
│   │   ├── client.ts      # Core fetch wrapper + token helpers
│   │   ├── auth.ts        # POST /auth/login/, GET /auth/me/
│   │   ├── student.ts     # Student API endpoints
│   │   ├── teacher.ts     # Teacher (Faculty) API endpoints
│   │   ├── industry.ts    # Industry (Company) API endpoints
│   │   ├── institution.ts # Institution API endpoints
│   │   └── index.ts       # Barrel export
│   ├── utils/             # Shared utility functions
│   │   └── index.ts
│   └── auth-context.tsx   # React Context for authentication
├── mocks/                 # Isolated mock data (clearly marked)
├── types/
│   └── index.ts           # All TypeScript types / API shapes
├── public/
├── .env.example           # Template — copy to .env.local
├── .env.local             # NOT committed
└── README.md
```

## Environment variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Django backend base URL | `http://127.0.0.1:8000/api/v1` |

## Backend role mapping

| Backend role | UI label |
|-------------|----------|
| `student` | Student |
| `teacher` | Faculty |
| `industry` | Company |
| `institution` | Institution |

Never change the backend role string values — they must match Django exactly.

## Design tokens

Design tokens are defined as CSS custom properties in `app/globals.css`.
Use `var(--ink)`, `var(--brass)`, `var(--teal)`, etc. in components.
Tailwind utilities and CSS variables can be mixed.

## Mock data policy

All mock data lives in `mocks/`. Components using mock data include a comment:
`// MOCK: Replace with real API call when backend confirms endpoint`

## Team structure

| Person | Responsibility |
|--------|---------------|
| 1 | Backend / Django / API |
| **2 (me)** | **Frontend — this repo** |
| 3 | AI / ML |
| 4 | Skill scoring / Skill Twin |
| 5 | Data / skill taxonomy |
| 6 | DevOps / QA |
