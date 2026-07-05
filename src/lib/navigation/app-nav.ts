import {
  LayoutDashboard,
  PlusCircle,
  Ticket,
  type LucideIcon,
} from "lucide-react";

import type { UserRole } from "@/lib/types/database";

export const appNavItems: {
  href: string;
  label: string;
  icon: LucideIcon;
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

export function isNavItemActive(href: string, currentPath: string) {
  if (href === "/tickets") {
    return (
      currentPath === "/tickets" ||
      (currentPath.startsWith("/tickets/") &&
        !currentPath.startsWith("/tickets/new"))
    );
  }

  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export function getVisibleNavItems(role: UserRole) {
  return appNavItems.filter((item) => item.roles.includes(role));
}
