import { redirect } from "next/navigation";

import { getUser } from "@/lib/auth/get-profile";

export default async function HomePage() {
  const user = await getUser();
  redirect(user ? "/tickets" : "/login");
}
