import { z } from "zod";

const configSchema = z.object({
    PORT: z.string().default(Bun.env.PORT!),
    DB_URL: z.string().default(Bun.env.DB_URL!),
    JWT_SECRET: z.string().default(Bun.env.JWT_SECRET!),
});

export const { PORT, DB_URL, JWT_SECRET } = configSchema.parse(Bun.env);