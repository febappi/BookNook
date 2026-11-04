import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const getSessionUser = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session ? session.user : null;
};

export const requireUser = async (currentPath: string) => {
  const user = await getSessionUser();
  if (!user) {
    redirect(`/login?redirect=${encodeURIComponent(currentPath)}`);
  }
  return user;
};

export const getServerToken = async () => {
  const { token } = await auth.api.getToken({ headers: await headers() });
  return token;
};
