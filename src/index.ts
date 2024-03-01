import { Elysia } from "elysia";
import jwt from "@elysiajs/jwt";
import { api } from "./handlers";

const app = new Elysia({
  name: "app"
})
  .use(
    jwt({
      name: "jwt",
      secret: Bun.env.JWT_SECRET!,
    })
  )
  .use(api)
  .listen(Bun.env.PORT!)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
