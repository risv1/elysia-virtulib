import { Elysia } from "elysia";
import jwt from "@elysiajs/jwt";
import { api } from "./handlers";
import { cors } from '@elysiajs/cors'
import { cookie } from '@elysiajs/cookie'

const app = new Elysia({
  name: "app"
})
  .use(cors())
  .use(cookie())
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
