import Elysia from "elysia";
import { booksHandler } from "./books";
import { reservationsHandler } from "./reservations";
import { adminController } from "./admin";
import { authController } from "./auth";

export const api = new Elysia({
    name: "api",
})
    .use(authController)
    .use(booksHandler)
    .use(reservationsHandler)
    .use(adminController)