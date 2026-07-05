import { signOut } from "@/app/actions/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/types/database";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AppHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-4 md:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground md:hidden">
          <span className="text-xs font-semibold">SD</span>
        </div>
        <p className="truncate text-sm font-medium text-muted-foreground">
          Support Desk
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium leading-none">{profile.full_name}</p>
          <p className="mt-1 text-xs text-muted-foreground">{profile.email}</p>
        </div>
        <Badge variant="secondary" className="capitalize">
          {profile.role}
        </Badge>
        <Avatar size="sm">
          <AvatarFallback>{getInitials(profile.full_name || "?")}</AvatarFallback>
        </Avatar>
        <form action={signOut}>
          <Button type="submit" variant="outline" size="sm" className="px-2 sm:px-2.5">
            <span className="hidden sm:inline">Sign out</span>
            <span className="sm:hidden">Out</span>
          </Button>
        </form>
      </div>
    </header>
  );
}
