import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const BookSchema = pgTable("book", {
    id: serial("id").primaryKey(),
    src: text("src"),
    title: text("title"),
    author: text("author"),
    description: text("description"),
    genre: text("genre"),
    year: text("year"),
    published: text("published"),
    reserved: text("active" || "returned").notNull()
})

export const ReservationSchema = pgTable("reservations", {
    id: serial("id").primaryKey(),
    book_id: text("book_id").notNull(),
    user_id: text("user_id").notNull(),
    reserved_at: text("reserved").notNull(),
    due: text("returned"),
    past_due: text("past_due")
})

export const UserSchema = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    password: text("password").notNull(),
    email: text("email").notNull(),
    role: text("role").notNull()
})