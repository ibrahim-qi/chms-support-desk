"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signIn, signUp } from "@/app/actions/auth";
import { FormBanner } from "@/components/form/form-feedback";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authInitialState } from "@/lib/auth/types";
import type { AuthFormState } from "@/lib/auth/types";

function FormField({
  id,
  label,
  type = "text",
  name,
  autoComplete,
  required = true,
}: {
  id: string;
  label: string;
  type?: string;
  name: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <Input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
      />
    </div>
  );
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(
    signIn,
    authInitialState
  );

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Access the internal support desk with your account.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="grid gap-4">
          <FormBanner message={state.error} />
          <FormField
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
          />
          <FormField
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-4 border-t-0 bg-transparent">
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Signing in..." : "Sign in"}
          </Button>
          <p className="text-sm text-muted-foreground">
            No account?{" "}
            <Link href="/register" className="font-medium text-foreground">
              Register
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

export function RegisterForm() {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(
    signUp,
    authInitialState
  );

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>
          New users are registered as requesters. Agent access is assigned
          separately.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="grid gap-4">
          <FormBanner message={state.error} />
          <FormField
            id="fullName"
            label="Full name"
            name="fullName"
            autoComplete="name"
          />
          <FormField
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
          />
          <FormField
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-4 border-t-0 bg-transparent">
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Creating account..." : "Create account"}
          </Button>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-foreground">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
