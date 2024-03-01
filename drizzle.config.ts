import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DB_URL!,
  },
} satisfies Config;