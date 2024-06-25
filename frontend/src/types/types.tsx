export interface Book {
    title: string;
    author: string;
    year: string;
  }
  
 export interface BookFormProps {
    addBook: (book: Book) => void;
    editBook: (book: Book) => void;
    currentBook: Book | null;
  }

  export interface BookTableProps {
    books: Book[];
    editBook: (book: Book) => void;
    deleteBook: (book: Book) => void;
  }
  
  export type BookAction =
    | { type: 'ADD_BOOK'; book: Book }
    | { type: 'EDIT_BOOK'; oldBook: Book; newBook: Book }
    | { type: 'DELETE_BOOK'; book: Book };