import Elysia, { t } from "elysia";
import { UserSchema } from "../schema";
import { db } from "../utils/db";
import { eq } from "drizzle-orm";
import { cookie } from "@elysiajs/cookie"

export const authController = new Elysia({
  name: "auth",
})
  .use(cookie)
  .post(
    "/register",
    async ({ body, set }: any) => {
      if (!body) {
        set.status = 401;
        return {
          success: false,
          message: "Did not receive data",
          data: null,
        };
      }

      const [email] = await db
        .select()
        .from(UserSchema)
        .where(eq(UserSchema.email, body.email))
        .limit(1);
      if (email) {
        set.status = 409;
        return {
          success: false,
          message: "User already exists",
          data: null,
        };
      }

      const user = {
        id: Math.random()
          .toString(36)
          .substring(2, 2 + 10),
        name: body.name,
        email: body.email,
        password: await Bun.password.hash(body.password),
        role: "user",
      };

      const [newUser] = await db.insert(UserSchema).values(user).execute();

      return {
        success: true,
        message: "User registered",
        data: newUser,
      };
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .post(
    "/login",
    async ({ body, set, jwt, setCookie }: any) => {
      if (!body) {
        set.status = 401;
        return {
          success: false,
          message: "Did not receive data",
          data: null,
        };
      }
      const [user] = await db
        .select()
        .from(UserSchema)
        .where(eq(UserSchema.email, body.email))
        .limit(1);
      if (!user) {
        set.status = 401;
        return {
          success: false,
          message: "User not found",
          data: null,
        };
      }
      const passwordMatch = await Bun.password.verify(
        body.password,
        user.password
      );
      if (!passwordMatch) {
        set.status = 401;
        return {
          success: false,
          message: "Password does not match",
          data: null,
        };
      }

      const token: string = await jwt.sign({
        email: user.email,
        password: user.password,
        role: user.role,
      });

      setCookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        })

      return {
        success: true,
        message: "User logged in",
      };
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  )
  .post("/logout", async ({ set, cookie: { token }, removeCookie }: any) => {

    if(!token){
      set.status = 401;
      return {
        success: false,
        message: "User not logged in",
        data: null,
      };
    }

    removeCookie("token");
    return {
      success: true,
      message: "User logged out",
    };
  })

