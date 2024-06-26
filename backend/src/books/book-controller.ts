import { Context } from "hono";
import {
    getBookService,
    getBookById,
    createBookService,
    deleteBookService,
    updateBookService

} from "./bookservice";



export const listBooks = async (c: Context) => {
  try {
      //limit the number of books to be returned

      const limit = Number(c.req.query('limit'))

      const data = await getBookService(limit);
      if (data == null || data.length == 0) {
          return c.text("book not found", 404)
      }
      return c.json(data, 200);
  } catch (error: any) {
      return c.json({ error: error?.message }, 400)
  }
}

//search book
export const getbook = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    console.log(id);
    
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const book = await getBookById(id);
    if (book === null) {
      return c.text("book not found", 404);
    }
    return c.json(book, 200);
  } catch (error: any) {
    console.error(error?.message);
  }
};

// create book
export const createbook = async (c: Context) => {
  try {
    const book = await c.req.json();
    const createdbook = await createBookService(book);
    console.log("book created");

    if (!createdbook) return c.text("book not created", 404);
    return c.json({ msg: createdbook }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
// updatebook
export const updatebook = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const book = await c.req.json();
  try {
    // search for the book
    const searchedbook = await getBookById(id);
    if (searchedbook == undefined) return c.text("book not found", 404);
    // get the data and update it
    const res = await updateBookService(id, book);
    // return a success message
    if (!res) return c.text("book not updated", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

//delete book
export const deletebook = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  try {
    //search for the book
    const book = await getBookById(id);
    if (book == undefined) return c.text("book not found", 404);
    //deleting the book
    const res = await deleteBookService(id);
    if (!res) return c.text("book not deleted", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};