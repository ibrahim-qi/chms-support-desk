"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { AuthFormState } from "@/lib/auth/types";
import { getField } from "@/lib/form";
import { createClient } from "@/lib/supabase/server";

export async function signIn(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = getField(formData, "email");
  const password = getField(formData, "password");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/tickets");
}

export async function signUp(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const fullName = getField(formData, "fullName");
  const email = getField(formData, "email");
  const password = getField(formData, "password");

  if (!fullName || !email || !password) {
    return { error: "Full name, email, and password are required." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (!data.session) {
    return {
      error:
        "Account created. Check your email to confirm, then sign in. For local demo, disable email confirmation in Supabase Auth settings.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/tickets");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
