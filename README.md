# MindVault

A personal productivity hub combining rich notes, whiteboard canvas, and task management — all on a free stack.

## Features

- **Rich Notes** — Block-based editor powered by [TipTap](https://tiptap.dev/) (ProseMirror), stored as JSON
- **Whiteboard Canvas** — Infinite canvas via [Excalidraw](https://excalidraw.com/) for diagrams, sketches, mind maps
- **Task Management** — Kanban-style tasks with priorities, statuses, and real-time updates
- **Full-Text Search** — Across notes and tasks (Supabase pgvector / full-text search)
- **Realtime Sync** — Live UI updates via Supabase Realtime subscriptions

## Stack

| Layer | Choice |
|---|---|
| Framework | [Next.js](https://nextjs.org/) 16 App Router |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 |
| Database | [Supabase](https://supabase.com/) PostgreSQL (free tier) |
| ORM | [Drizzle ORM](https://orm.drizzle.team/) |
| Auth | [Supabase Auth](https://supabase.com/auth) — email only |
| UI | [shadcn/ui](https://ui.shadcn.com/) (base-nova style) |
| State | [Zustand](https://github.com/pmndrs/zustand) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Editor | [TipTap](https://tiptap.dev/) (MIT) |
| Canvas | [Excalidraw](https://excalidraw.com/) (MIT) |
| Deploy | [Vercel](https://vercel.com/) Hobby (free) |

## Getting Started

### Prerequisites

- Node.js 20+
- A Supabase account (free tier)
- A GitHub account

### 1. Clone & Install

```bash
git clone https://github.com/dhairyabishnoi578/mindvault.git
cd mindvault
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Project Settings > API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
3. Go to **Authentication > Settings** and enable **Email + Password** sign-in

### 3. Configure Environment

```bash
cp .env.local.example .env.local
```

Fill in the values from your Supabase project.

### 4. Push Database Schema

```bash
npx drizzle-kit push
```

### 5. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npx drizzle-kit push` | Push schema to Supabase |
| `npx drizzle-kit generate` | Generate migration from schema changes |
| `npx drizzle-kit migrate` | Apply pending migrations |
| `npx drizzle-kit studio` | Open Drizzle Studio (GUI) |

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login & register pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/      # App shell (protected routes)
│   │   ├── dashboard/
│   │   ├── notes/
│   │   ├── tasks/
│   │   └── canvas/
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   └── ui/               # shadcn/ui primitives
├── lib/
│   ├── auth/             # Supabase auth clients
│   ├── db/               # Drizzle schema & client
│   ├── hooks/            # Shared React hooks
│   ├── store/            # Zustand stores
│   └── utils.ts          # Utility functions
├── proxy.ts              # Auth proxy (replaces middleware)
└── styles/
```

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Stable, production-ready |
| `dev` | Active development |
| `beta` | Pre-release features for testing |

## License

MIT
