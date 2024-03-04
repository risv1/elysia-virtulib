import Elysia, { t } from "elysia";
import { BookSchema, ReservationSchema, UserSchema } from "../schema";
import { db } from "../utils/db";
import { eq } from "drizzle-orm";

const isAdmin = new Elysia().derive(
    async ({ set, headers }: any) => {
        if (headers.authorization !== "admin") {
            set.status = 403;
            return {
                success: false,
                message: "Unauthorized",
                data: null
            }
        }
    }
)

export const adminController = new Elysia({
    name: "admin"
})
    .use(isAdmin)
    .get("/admin/users", async({set}: any) => {
        try{
            const users = await db.select().from(UserSchema);
            if(users.length === 0){
                set.status = 404;
                return {
                    success: false,
                    message: "Users not found",
                    data: null
                }
            }
            return {
                success: true,
                message: "Users found",
                data: users
            }
        } catch (error) {
            set.status = 500;
            return {
                success: false,
                message: "Could not retrieve users",
                data: null
            }
        }
    })
    .get("/admin/users/:id", async({ set, params: {id} }: any) => {
        try{
            const user = await db.select().from(UserSchema).where(eq(UserSchema.id, id)).limit(1);
            if(user.length === 0){
                set.status = 404;
                return {
                    success: false,
                    message: "User not found",
                    data: null
                }
            }
            return {
                success: true,
                message: "User found",
                data: user
            }
        } catch (error) {
            set.status = 500;
            return {
                success: false,
                message: "Could not retrieve user",
                data: null
            }
        }
    })
    .get("/admin/reservations", async({ set }: any) => {
        try{
            const reservations = await db.select().from(ReservationSchema);
            return {
                success: true,
                message: "Reservations found",
                data: reservations
            }
        } catch (error) {
            set.status = 500;
            return {
                success: false,
                message: "Could not retrieve reservations",
                data: null
            }
        }
    })
    .get("/admin/reservations/:id", async({ set, params: {id} }: any) => {
        try{
            const reservation = await db.select().from(ReservationSchema).where(eq(ReservationSchema.id, id)).limit(1);
            if(reservation.length === 0){
                set.status = 404;
                return {
                    success: false,
                    message: "Reservation not found",
                    data: null
                }
            }
            return {
                success: true,
                message: "Reservation found",
                data: reservation
            }
        } catch (error) {
            set.status = 500;
            return {
                success: false,
                message: "Could not retrieve reservation",
                data: null
            }
        }
    })
    .post("/admin/books", async({ body, set }: any) => {
        if(!body){
            set.status = 401;
            return {
                success: false,
                message: "Did not receive data",
                data: null
            }
        }

        const book = {
            id: Math.random().toString(36).substring(2, 2 + 10),
            ...body,
            reserved: "returned"
        }

        const newBook = await db.insert(BookSchema).values({
            ...body,
            id: book.id,
            src: book.src,
            title: book.title,
            author: book.author,
            genre   : book.genre,
            description: book.description,
            published: book.published,
            reserved: book.reserved,
        });
        return {
            success: true,
            message: "Book added",
            data: newBook
        }
    },{
        body: t.Object({
            src: t.String(),
            title: t.String(),
            author: t.String(),
            genre: t.String(),
            description: t.String(),
            published: t.String()
        })
    })