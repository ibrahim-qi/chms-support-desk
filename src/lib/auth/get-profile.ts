import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types/database";

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    return null;
  }

  return profile;
}

export async function requireProfile(): Promise<Profile> {
  const profile = await getProfile();

  if (!profile) {
    throw new Error("Profile not found");
  }

  return profile;
}
