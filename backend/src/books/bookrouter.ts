import { Hono, Context } from "hono";
import {
    getbook,
    listBooks,
    createbook,
    updatebook,
    deletebook
} from "./book-controller"


export const bookRouter = new Hono();



bookRouter
    .get("/api/books", listBooks)
    .get("/api/books/:id", getbook)
    .post("/api/create-book", createbook)
    .put("/api/update-book/:id", updatebook)
    .delete("/api/delete-book/:id", deletebook)
