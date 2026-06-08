"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/auth/client";
import { useTheme } from "@/components/theme-provider";
import { UserPanel } from "@/components/user-panel";
import { SunIcon, MoonIcon } from "lucide-react";
import type { User } from "@supabase/supabase-js";

export function LandingHeader() {
  const [user, setUser] = useState<User | null>(null);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user);
    });
  }, []);

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 sm:px-10">
      <Link href="/" className="text-lg font-semibold tracking-tight">
        MindVault
      </Link>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
        >
          {resolvedTheme === "dark" ? (
            <SunIcon className="size-4" />
          ) : (
            <MoonIcon className="size-4" />
          )}
        </button>

        {user ? (
          <UserPanel email={user.email!} />
        ) : (
          <>
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="inline-flex h-9 items-center justify-center rounded-md bg-foreground px-4 text-sm font-medium text-background shadow transition-colors hover:bg-foreground/90"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
