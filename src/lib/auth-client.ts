import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [jwtClient()],
});

export const getToken = async () => {
  const { data } = await authClient.token();
  return data?.token;
};
