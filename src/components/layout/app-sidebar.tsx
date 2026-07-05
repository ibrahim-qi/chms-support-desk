"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LifeBuoy,
  PlusCircle,
  Ticket,
} from "lucide-react";

import type { Profile, UserRole } from "@/lib/types/database";
import { cn } from "@/lib/utils";

const navItems: {
  href: string;
  label: string;
  icon: typeof Ticket;
  roles: UserRole[];
}[] = [
  {
    href: "/tickets",
    label: "Tickets",
    icon: Ticket,
    roles: ["requester", "agent"],
  },
  {
    href: "/tickets/new",
    label: "New ticket",
    icon: PlusCircle,
    roles: ["requester", "agent"],
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["agent"],
  },
];

export function AppSidebar({ profile }: { profile: Profile }) {
  const currentPath = usePathname();
  const visibleItems = navItems.filter((item) =>
    item.roles.includes(profile.role)
  );

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center gap-2 border-b px-4">
        <LifeBuoy className="size-5" />
        <div>
          <p className="text-sm font-semibold leading-none">Support Desk</p>
          <p className="text-xs text-muted-foreground">CHMS Internal</p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {visibleItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/tickets"
              ? currentPath === "/tickets" ||
                (currentPath.startsWith("/tickets/") &&
                  !currentPath.startsWith("/tickets/new"))
              : currentPath === href || currentPath.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/70"
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4 text-xs text-muted-foreground">
        Signed in as{" "}
        <span className="font-medium capitalize text-foreground">
          {profile.role}
        </span>
      </div>
    </aside>
  );
}
