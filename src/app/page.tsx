import Link from "next/link";
import { LandingHeader } from "@/components/landing-header";
import { FileTextIcon, PenToolIcon, CheckSquareIcon } from "lucide-react";

const features = [
  {
    title: "Rich Notes",
    description:
      "Block-based editor powered by TipTap. Write, organize, and search your notes with ease.",
    icon: FileTextIcon,
  },
  {
    title: "Whiteboard Canvas",
    description:
      "Infinite canvas for diagrams, sketches, and mind maps powered by Excalidraw.",
    icon: PenToolIcon,
  },
  {
    title: "Task Management",
    description:
      "Kanban-style tasks with priorities, statuses, and real-time updates.",
    icon: CheckSquareIcon,
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <LandingHeader />

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
        <div
          className="mx-auto w-full max-w-2xl text-center py-32 -my-32 rounded-[100px]"
          style={{ background: "var(--gradient-hero)" }}
        >
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
            Coming Soon
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Your second brain, reimagined.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Notes, tasks, and whiteboards in one place. A personal productivity
            hub built for how you actually think.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex h-10 items-center justify-center rounded-md bg-foreground px-6 text-sm font-medium text-background shadow transition-colors hover:bg-foreground/90"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-md border px-6 text-sm font-medium transition-colors hover:bg-muted"
            >
              Sign in
            </Link>
          </div>
        </div>

        <div className="mt-24 grid gap-6 sm:grid-cols-3 w-full max-w-4xl">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-lg border p-6 text-left"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-5 text-foreground" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="border-t px-6 py-4 text-center text-xs text-muted-foreground sm:px-10">
        <p>
          Built with Next.js, Supabase, and TypeScript. &copy;{" "}
          {new Date().getFullYear()} MindVault.
        </p>
      </footer>
    </div>
  );
}
