import Elysia from "elysia";
import { eq } from "drizzle-orm";
import { db } from "../utils/db";
import { BookSchema } from "../schema";

export const booksHandler = new Elysia({
    name: "books", 
})
    .get("/books", async ({ data, set }: { data: any; set: any }) => {
        if (!data) {
            set.status = 401;
            return {
              success: false,
              message: "Could not retrieve books",
              data: null,
            };
        }

        const books = await db.select().from(BookSchema)
        set.status = 200;
        return {
            success: true,
            message: "Books retrieved",
            data: books,
        }
    })
    .get("/books/:id", async ({ data, set, params: {id} }: { data: any; set: any; params: any }) => {
        if (!data) {
            set.status = 401;
            return {
              success: false,
              message: "Could not retrieve book",
              data: null,
            };
        }

        const book = await db.select().from(BookSchema).where(eq(BookSchema.id, id)).limit(1);
        return {
            success: true,
            message: "Book retrieved",
            data: book,
        }
    })
    .get("/books/genre/:genre", async ({ data, set, params: {genre} }: { data: any; set: any; params: any }) => {
        if (!data) {
            set.status = 401;
            return {
              success: false,
              message: "Could not retrieve books",
              data: null,
            };
        }

        const books = await db.select().from(BookSchema).where(eq(BookSchema.genre, genre));
        return {
            success: true,
            message: "Books retrieved",
            data: books,
        }
    })