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

type FormErrors = {
  name?: string;
  email?: string;
  photoURL?: string;
  password?: string;
};

const getPasswordError = (password: string) => {
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must have at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must have at least one lowercase letter";
  }
  return "";
};

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name")).trim();
    const email = String(formData.get("email")).trim();
    const photoURL = String(formData.get("photoURL")).trim();
    const password = String(formData.get("password"));

    const newErrors: FormErrors = {};
    if (!name) {
      newErrors.name = "Name is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (photoURL && !/^https?:\/\/\S+$/.test(photoURL)) {
      newErrors.photoURL = "Photo URL must start with http:// or https://";
    }
    const passwordError = getPasswordError(password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoURL || undefined,
    });

    if (error) {
      setLoading(false);
      toast.add({ title: error.message || "Registration failed. Please try again.", type: "error" });
      return;
    }

    await authClient.signOut();
    setLoading(false);
    toast.add({ title: "Account created successfully. Please login.", type: "success" });
    router.push("/login");
  };

  return (
    <div className="w-full max-w-md rounded-lg border bg-card p-6 sm:p-8">
      <h1 className="text-center text-3xl uppercase">Create an Account</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">Join BookNook and start borrowing books</p>

      <form onSubmit={handleRegister} method="post" noValidate className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your full name" aria-invalid={Boolean(errors.name)} />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)} />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="photoURL">Photo URL</Label>
          <Input id="photoURL" name="photoURL" placeholder="https://example.com/photo.jpg" aria-invalid={Boolean(errors.photoURL)} />
          {errors.photoURL && <p className="text-sm text-destructive">{errors.photoURL}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" placeholder="Create a password" autoComplete="new-password" aria-invalid={Boolean(errors.password)} />
          {errors.password ? (
            <p className="text-sm text-destructive">{errors.password}</p>
          ) : (
            <p className="text-xs text-muted-foreground">At least 6 characters with one uppercase and one lowercase letter</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Spinner />}
          Register
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-sm text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <GoogleLoginButton callbackURL="/" />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
