import Elysia from "elysia";
import { eq } from "drizzle-orm";
import { db } from "../utils/db";
import { BookSchema } from "../schema";

export const booksHandler = new Elysia({
    name: "books", 
})
    .get("/books", async ({ set }: { set: any }) => {
        try{
            const books = await db.select().from(BookSchema)
            if(books.length === 0){
                set.status = 404;
                return {
                    success: false,
                    message: "Books not found",
                    data: null
                }
            }
            return {
                success: true,
                message: "Books found",
                data: books
            }
        } catch (error) {
            set.status = 500;
            return {
                success: false,
                message: "Could not retrieve books",
                data: null
            }
        }
    })
    .get("/books/:id", async ({ params: {id} }: { params: any }) => {
        try{
            const book = await db.select().from(BookSchema).where(eq(BookSchema.id, id)).limit(1);
            if(book.length === 0){
                return {
                    success: false,
                    message: "Book not found",
                    data: null
                }
            }
            return {
                success: true,
                message: "Book found",
                data: book
            }
        } catch (error) {   
            return {
                success: false,
                message: "Could not retrieve book",
                data: null
            }
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