"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";

const GoogleLoginButton = ({ callbackURL }: { callbackURL: string }) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL,
      errorCallbackURL: "/login",
    });
    if (error) {
      setLoading(false);
      toast.add({ title: error.message || "Google login failed. Please try again.", type: "error" });
    }
  };

  return (
    <Button type="button" variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading}>
      {loading ? (
        <Spinner />
      ) : (
        <svg viewBox="0 0 512 512" className="size-4" aria-hidden="true">
          <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
          <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
          <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
          <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
        </svg>
      )}
      Continue with Google
    </Button>
  );
};

export default GoogleLoginButton;
