# MindVault — AGENTS.md

## Stack
- Next.js 15 App Router + TypeScript + Tailwind CSS v4
- Supabase (PostgreSQL, Auth, Realtime) — all free tier
- Drizzle ORM for type-safe DB access
- TipTap (ProseMirror) for block-based rich text (MIT)
- Excalidraw for canvas/whiteboard (MIT) — NOT tldraw (paid license)
- shadcn/ui for UI primitives
- Zustand for client state
- Zod + React Hook Form for validation
- Deployed on Vercel Hobby (free)

## Commands
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run typecheck` — `tsc --noEmit`
- `npx drizzle-kit push` — push schema to Supabase (dev)
- `npx drizzle-kit generate` — generate migration from schema changes
- `npx drizzle-kit migrate` — apply pending migrations
- `npx drizzle-kit studio` — open Drizzle Studio
- `npx shadcn@latest add <component>` — add a shadcn/ui component

## Auth
- Auth middleware at `src/middleware.ts` protects all `(dashboard)` routes
- Email-only login via Supabase Auth
- `service_role` key is for migrations/seed only — never in client or API routes
- Every table has `user_id` + RLS policy: `USING (user_id = auth.uid())`
- RLS is the only access control — never bypass it

## Database
- Schema in `src/lib/db/schema.ts` — single source of truth
- Managed via Drizzle ORM + Supabase PostgreSQL
- Generated types from Drizzle (not Supabase)
- Free tier Supabase pauses after 7 days idle — add a keep-alive cron if needed

## Data Access
- Server Components fetch via Drizzle + Supabase admin client
- Client mutations through Supabase browser SDK (RLS enforced)
- Realtime subscriptions for live UI on tasks/notes
- All queries scoped to `user_id` — no cross-user access

## Key Conventions
- RSC by default; `"use client"` only for interactivity or browser-only APIs
- Route groups: `(auth)` for login/register, `(dashboard)` for the app shell
- Feature components in `src/components/<feature>/`
- shadcn primitives in `src/components/ui/`
- `.env.local` required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

## Canvas (Excalidraw)
- MIT-licensed, fully free — no license key needed
- Must be client-only: `dynamic(() => import(...), { ssr: false })`
- Data stored as JSON in `canvases.elements`
- Excalidraw fonts must be self-hosted or served from CDN

## Editor (TipTap)
- MIT-licensed, fully free
- Content stored as TipTap JSON in `notes.content` (not HTML/Markdown)
- Uses TipTap's JSON serializer for persistence, can export to Markdown

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
