"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Profile } from "@/lib/types/database";
import {
  getVisibleNavItems,
  isNavItemActive,
} from "@/lib/navigation/app-nav";
import { cn } from "@/lib/utils";

export function MobileNav({ profile }: { profile: Profile }) {
  const currentPath = usePathname();
  const visibleItems = getVisibleNavItems(profile.role);

  return (
    <nav className="flex gap-2 overflow-x-auto border-b border-sidebar-border bg-sidebar px-4 py-2 md:hidden">
      {visibleItems.map(({ href, label, icon: Icon }) => {
        const isActive = isNavItemActive(href, currentPath);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-background text-foreground ring-1 ring-border"
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
