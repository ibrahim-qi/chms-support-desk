import { redirect } from "next/navigation";

import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { getProfile } from "@/lib/auth/get-profile";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  if (!profile) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-full flex-col md:flex-row">
      <AppSidebar profile={profile} />
      <div className="flex min-h-full min-w-0 flex-1 flex-col">
        <AppHeader profile={profile} />
        <MobileNav profile={profile} />
        <main className="min-w-0 flex-1 bg-muted/40 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
