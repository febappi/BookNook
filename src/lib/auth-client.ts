import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [jwtClient()],
});

export const getToken = async () => {
  const { data } = await authClient.token();
  return data?.token;
};

export const getAuthHeaders = async () => {
  const token = await getToken();
  if (!token) {
    throw new Error("Your session has expired. Please login again.");
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
