import { useReducer, useEffect, useState } from 'react';
import useLocalStorage from './components/localStorage';
import BookForm from './components/bookForm';
import BookTable from './components/bookTable';
import { BookAction, Book } from "./types/types";

const bookReducer = (state: Book[], action: BookAction): Book[] => {
  switch (action.type) {
    case 'ADD_BOOK':
      return [...state, action.book];
    case 'EDIT_BOOK':
      return state.map((book) =>
        book.title === action.oldBook.title ? action.newBook : book
      );
    case 'DELETE_BOOK':
      return state.filter((book) => book.title !== action.book.title);
    default:
      return state;
  }
};

const BookAppReducer = () => {
  const [books, setBooks] = useLocalStorage<Book[]>('books', []);
  const [state, dispatch] = useReducer(bookReducer, books);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  useEffect(() => {
    setBooks(state);
  }, [state, setBooks]);

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [books, searchTerm]);

  const addBook = (book: Book) => {
    dispatch({ type: 'ADD_BOOK', book });
  };

  const editBook = (newBook: Book) => {
    if (currentBook) {
      dispatch({ type: 'EDIT_BOOK', oldBook: currentBook, newBook });
      setCurrentBook(null);
    }
  };

  const deleteBook = (book: Book) => {
    dispatch({ type: 'DELETE_BOOK', book });
  };

  const handleEdit = (book: Book) => {
    setCurrentBook(book);
  };

  return (
    <div className="container mx-auto p-4">
      <BookForm addBook={addBook} editBook={editBook} currentBook={currentBook} />
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 w-full mt-4  p-2 rounded-md"
      />
      <BookTable books={filteredBooks} editBook={handleEdit} deleteBook={deleteBook} />
    </div>
  );
};

export default BookAppReducer;
