import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const appURL = (process.env.BETTER_AUTH_URL as string).replace(/\/$/, "");
const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("booknook");

export const auth = betterAuth({
  baseURL: appURL,
  trustedOrigins: [appURL],
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  account: {
    accountLinking: {
      trustedProviders: ["google"],
      requireLocalEmailVerified: false,
    },
  },
  plugins: [
    jwt({
      jwt: {
        issuer: appURL,
        audience: appURL,
        expirationTime: "15m",
        definePayload: ({ user }) => ({
          name: user.name,
          email: user.email,
          image: user.image,
        }),
      },
    }),
  ],
});
