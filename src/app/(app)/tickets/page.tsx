import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProfile } from "@/lib/auth/get-profile";

export default async function TicketsPage() {
  const profile = await getProfile();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Tickets</h1>
        <p className="text-sm text-muted-foreground">
          {profile?.role === "agent"
            ? "Full queue view — ticket list coming in the next step."
            : "Your tickets — ticket list coming in the next step."}
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Foundation ready</CardTitle>
          <CardDescription>
            Auth, profiles, and RLS are in place. Next we build create ticket and
            the queue table.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Signed in as <span className="font-medium">{profile?.email}</span> (
          <span className="capitalize">{profile?.role}</span>).
        </CardContent>
      </Card>
    </div>
  );
}
