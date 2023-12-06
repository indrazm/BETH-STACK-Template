import { lucia } from "lucia";
import { web } from "lucia/middleware";
import { libsql } from "@lucia-auth/adapter-sqlite";
import { client } from "./drizzle";
import { github, google } from "@lucia-auth/oauth/providers";

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

export const googleAuth = google(auth, {
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  redirectUri: process.env.GOOGLE_REDIRECT_URI as string,
});

export type Auth = typeof auth;
