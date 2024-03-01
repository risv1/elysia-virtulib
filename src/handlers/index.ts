import Elysia from "elysia";
import { booksHandler } from "./books";
import { reservationsHandler } from "./reservations";

export const api = new Elysia({
    name: "api",
    prefix: "/api"
})
    .use(booksHandler)
    .use(reservationsHandler)