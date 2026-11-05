import type { Metadata } from "next";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/auth/RegisterForm";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Register",
};

const RegisterPage = async () => {
  const user = await getSessionUser();
  if (user) {
    redirect("/");
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-muted/60 px-4 py-12">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
