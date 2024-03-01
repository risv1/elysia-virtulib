import Elysia, { t } from "elysia";
import { UserSchema } from "../schema";
import { db } from "../utils/db";
import { eq } from "drizzle-orm";

export const authController = new Elysia({
    name: "auth"
})
    .post("/register", async ({ body, set }: any) => {
        if (!body) {
            set.status = 401;
            return {
                success: false,
                message: "Did not receive data",
                data: null,
            };
        }   

        const email = await db.select().from(UserSchema).where(eq(UserSchema.email, body.email)).limit(1);
        if(email){
            set.status = 401;
            return {
                success: false,
                message: "User already exists",
                data: null,
            };
        }
        const user = await db.insert(UserSchema).values({
            ...body,
            password: await Bun.password.hash(body.password)
        })

        return{
            success: true,
            message: "User registered",
            data: user
        }
    },
    {
        body: t.Object({
            name: t.String(),
            email: t.String(),
            password: t.String()
        })
    })
    .post("/login", async({ body, set, jwt }: any) => {
        if(!body){
            set.status = 401;
            return {
                success: false,
                message: "Did not receive data",
                data: null,
            };
        }
        const [user] = await db.select().from(UserSchema).where(eq(UserSchema.email, body.email)).limit(1);
        if (!user) {
            set.status = 401;
            return {
                success: false,
                message: "User not found",
                data: null,
            };
        }
        const passwordMatch = await Bun.password.verify(body.password, user.password);
        if(!passwordMatch){
            set.status = 401;
            return {
                success: false,
                message: "Password does not match",
                data: null,
            };
        }

        const token = await jwt.sign({
            email: user.email,
        })

        return {
            success: true,
            message: "User logged in",
            data: user
        }
    })