import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Login",
};

const getSafeRedirect = (value: string | string[] | undefined) => {
  if (typeof value === "string" && value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return "/";
};

const LoginPage = async ({ searchParams }: PageProps<"/login">) => {
  const params = await searchParams;
  const redirectTo = getSafeRedirect(params.redirect);
  const googleError = typeof params.error === "string" ? params.error : "";

  const user = await getSessionUser();
  if (user) {
    redirect(redirectTo);
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-muted/60 px-4 py-12">
      <LoginForm redirectTo={redirectTo} googleError={googleError} />
    </div>
  );
};

export default LoginPage;
