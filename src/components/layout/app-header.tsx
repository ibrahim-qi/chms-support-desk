import { signOut } from "@/app/actions/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
    <header className="flex h-14 items-center justify-between border-b bg-background px-6">
      <div>
        <p className="text-sm text-muted-foreground">Welcome back</p>
        <p className="font-medium leading-none">{profile.full_name}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium">{profile.email}</p>
          <p className="text-xs capitalize text-muted-foreground">
            {profile.role}
          </p>
        </div>
        <Avatar>
          <AvatarFallback>{getInitials(profile.full_name || "?")}</AvatarFallback>
        </Avatar>
        <form action={signOut}>
          <Button type="submit" variant="outline" size="sm">
            Sign out
          </Button>
        </form>
      </div>
    </header>
  );
}
