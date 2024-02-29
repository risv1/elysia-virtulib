import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: Bun.env.DB_URL!,
  },
} satisfies Config;