import { lucia } from "lucia";
import { web } from "lucia/middleware";
import { libsql } from "@lucia-auth/adapter-sqlite";
import { client } from "../db/client";
import { github } from "@lucia-auth/oauth/providers";

export const auth = lucia({
  env: "DEV",
  middleware: web(),
  sessionCookie: {
    expires: false,
  },
  adapter: libsql(client, {
    user: "user",
    key: "user_key",
    session: "user_session",
  }),
  getUserAttributes: (user) => {
    return {
      name: user.name,
      githubUsername: user.username,
    };
  },
});

export const githubAuth = github(auth, {
  clientId: process.env.GITHUB_CLIENT_ID as string,
  clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
});

export type Auth = typeof auth;
