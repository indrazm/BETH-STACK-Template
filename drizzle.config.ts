import type { Config } from "drizzle-kit";

export default {
  schema: "./src/models/db/schema.ts",
  out: "./src/models/db/migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DB_URL as string,
    authToken: process.env.TURSO_DB_AUTH_TOKEN as string,
  },
} satisfies Config;
