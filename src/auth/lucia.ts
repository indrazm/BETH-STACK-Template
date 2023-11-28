// lucia.ts
import { lucia } from "lucia";
import { web } from "lucia/middleware";
import { libsql } from "@lucia-auth/adapter-sqlite";
import { client } from "../db/client";

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
});

export type Auth = typeof auth;
