import { mysqlTable, text, varchar } from "drizzle-orm/mysql-core";

export const BookSchema = mysqlTable("book", {
    id: varchar("id", { length: 30 }).primaryKey(),
    src: text("src"),
    title: text("title"),
    author: text("author"),
    description: text("description"),
    genre: text("genre"),
    year: text("year"),
    published: text("published"),
    reserved: text("active" || "returned").notNull()
})

export const ReservationSchema = mysqlTable("reservations", {
    id: varchar("id", { length: 30 }).primaryKey(),
    bookid: text("book_id").notNull(),
    userid: text("user_id").notNull(),
    reserved_at: text("reserved").notNull(),
    due: text("returned"),
    past_due: text("past_due")
})

export const UserSchema = mysqlTable("users", {
    id: varchar("id", { length: 30 }).primaryKey(),
    name: text("name").notNull(),
    password: text("password").notNull(),
    email: text("email").notNull(),
    role: text("role").notNull()
})