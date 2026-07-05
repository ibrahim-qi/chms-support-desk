import { redirect } from "next/navigation";

import type { Profile } from "@/lib/types/database";

import { getProfile } from "./get-profile";

export const AUTH_REQUIRED_ERROR = "You must be signed in.";
export const AGENT_ONLY_ERROR = "Only agents can perform this action.";

export type AuthResult =
  | { ok: true; profile: Profile }
  | { ok: false; error: string };

export function isAgent(profile: Profile): boolean {
  return profile.role === "agent";
}

export async function getAuthenticatedProfile(): Promise<AuthResult> {
  const profile = await getProfile();

  if (!profile) {
    return { ok: false, error: AUTH_REQUIRED_ERROR };
  }

  return { ok: true, profile };
}

export async function getAgentProfile(): Promise<AuthResult> {
  const auth = await getAuthenticatedProfile();

  if (!auth.ok) {
    return auth;
  }

  if (!isAgent(auth.profile)) {
    return { ok: false, error: AGENT_ONLY_ERROR };
  }

  return auth;
}

export async function requireAgentPageAccess(): Promise<Profile> {
  const auth = await getAgentProfile();

  if (!auth.ok) {
    redirect("/tickets");
  }

  return auth.profile;
}
