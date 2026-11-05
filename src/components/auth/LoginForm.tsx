"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "./GoogleLoginButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";

const getGoogleErrorMessage = (code: string) => {
  if (!code) {
    return "";
  }
  return `Google login failed (${code.replace(/_/g, " ")}). Please try again.`;
};

const LoginForm = ({ redirectTo, googleError }: { redirectTo: string; googleError: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(getGoogleErrorMessage(googleError));

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email")).trim();
    const password = String(formData.get("password"));

    if (!email || !password) {
      setErrorMessage("Please enter your email and password");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const message = error.message || "Login failed. Please try again.";
      setErrorMessage(message);
      toast.add({ title: message, type: "error" });
      return;
    }

    toast.add({ title: "Logged in successfully", type: "success" });
    router.push(redirectTo);
    router.refresh();
  };

  const handleForgotPassword = () => {
    toast.add({ title: "Password reset is not available right now", type: "info" });
  };

  return (
    <div className="w-full max-w-md rounded-lg border bg-card p-6 sm:p-8">
      <h1 className="text-center text-3xl uppercase">Login to BookNook</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        {redirectTo === "/" ? "Welcome back! Please enter your details." : "Please login to continue."}
      </p>

      <form onSubmit={handleLogin} method="post" noValidate className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <button type="button" onClick={handleForgotPassword} className="text-sm text-primary hover:underline">
              Forgot password?
            </button>
          </div>
          <Input id="password" name="password" type="password" placeholder="Enter your password" autoComplete="current-password" />
        </div>

        {errorMessage && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{errorMessage}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Spinner />}
          Login
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-sm text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <GoogleLoginButton callbackURL={redirectTo} />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
