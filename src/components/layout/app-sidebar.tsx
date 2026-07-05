"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LifeBuoy } from "lucide-react";

import type { Profile } from "@/lib/types/database";
import {
  getVisibleNavItems,
  isNavItemActive,
} from "@/lib/navigation/app-nav";
import { cn } from "@/lib/utils";

export function AppSidebar({ profile }: { profile: Profile }) {
  const currentPath = usePathname();
  const visibleItems = getVisibleNavItems(profile.role);

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
      <div className="flex h-14 items-center gap-3 border-b border-sidebar-border px-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <LifeBuoy className="size-4" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-none tracking-tight">
            Support Desk
          </p>
          <p className="mt-1 text-xs text-muted-foreground">CHMS Internal</p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {visibleItems.map(({ href, label, icon: Icon }) => {
          const isActive = isNavItemActive(href, currentPath);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-lg border-l-2 py-2 pr-3 pl-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary bg-sidebar-accent text-sidebar-accent-foreground"
                  : "border-transparent text-sidebar-foreground hover:border-border hover:bg-sidebar-accent/60"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-4 text-xs text-muted-foreground">
        Signed in as{" "}
        <span className="font-medium capitalize text-foreground">
          {profile.role}
        </span>
      </div>
    </aside>
  );
}
