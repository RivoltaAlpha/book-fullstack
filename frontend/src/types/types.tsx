export interface Book {
    id?: number;
    title: string;
    author: string;
    year: string;
  }
  
  export type BookAction =
    | { type: 'INIT'; books: Book[] }
    | { type: 'ADD_BOOK'; book: Book }
    | { type: 'EDIT_BOOK'; oldBook: Book; newBook: Book }
    | { type: 'DELETE_BOOK'; id: number };

export interface BookTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

export interface BookFormProps {
  currentBook: Book | null;
  onSubmit: (book: Book) => void;    
}