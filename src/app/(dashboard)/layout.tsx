"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/auth/client";
import { useTheme } from "@/components/theme-provider";
import { UserPanel } from "@/components/user-panel";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LayoutDashboardIcon,
  FileTextIcon,
  CheckSquareIcon,
  PenToolIcon,
  SunIcon,
  MoonIcon,
  MenuIcon,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/notes", label: "Notes", icon: FileTextIcon },
  { href: "/tasks", label: "Tasks", icon: CheckSquareIcon },
  { href: "/canvas", label: "Canvas", icon: PenToolIcon },
];

function SidebarContent({ user, onNav }: { user: User | null; onNav?: () => void }) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center px-6 font-semibold tracking-tight">
        MindVault
      </div>
      <Separator />
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNav}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <Separator />
      <div className="p-3 space-y-3">
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {resolvedTheme === "dark" ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
          {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
        </button>
        {user && (
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {user.email!.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 truncate text-xs text-muted-foreground">
              {user.email}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user);
    });
  }, []);

  return (
    <div className="flex h-screen">
      <aside className="hidden w-64 flex-col border-r bg-background md:flex">
        <SidebarContent user={user} />
      </aside>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger className="fixed left-3 top-3 z-40 inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-muted hover:text-foreground md:hidden">
          <MenuIcon className="size-4" />
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent user={user} onNav={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center justify-end gap-4 border-b px-6 ml-12 md:ml-0">
          {user && <UserPanel email={user.email!} />}
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
