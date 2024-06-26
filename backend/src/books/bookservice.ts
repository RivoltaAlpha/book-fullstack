import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import {books,TIBook,TSBook} from "../drizzle/schema";

export const getBookService = async (
  limit?: number
): Promise<TSBook[] | null> => {
  if (limit) {
    return await db.query.books.findMany({
      limit: limit,
    });
  }
  return await db.query.books.findMany();
};

export async function getBookById(id: TSBook["id"]): Promise<Array<TSBook>> {
  return db.select().from(books).where(eq(books.id, id));
}

export async function createBookService(data: TIBook) {
  await db.insert(books).values(data);
  return "Book created successfully";
}

export async function updateBookService(id: number, book: TIBook) {
  await db.update(books).set(book).where(eq(books.id, id));
  return "Book updated successfully";
}

export async function deleteBookService(id: number) {
  await db.delete(books).where(eq(books.id, id));
  return "Book deleted successfully";
}
