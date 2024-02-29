import { z } from "zod";

const configSchema = z.object({
    PORT: z.string().default("8000"),
    DB_URL: z.string().default(""),
    JWT_SECRET: z.string().default(""),
});

export const { PORT, DB_URL, JWT_SECRET } = configSchema.parse(Bun.env);