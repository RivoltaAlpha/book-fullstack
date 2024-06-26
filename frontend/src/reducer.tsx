import { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import BookForm from './components/bookForm';
import BookTable from './components/bookTable';
import { BookAction, Book } from "./types/types";

const API_URL = "http://localhost:8000/api";

const bookReducer = (state: Book[], action: BookAction): Book[] => {
  switch (action.type) {
    case 'INIT':
      return action.books || [];
    case 'ADD_BOOK':
      return [...state, action.book];
    case 'EDIT_BOOK':
      return state.map((book) =>
        book.id === action.oldBook.id ? action.newBook : book
      );
    case 'DELETE_BOOK':
      return state.filter((book) => book.id !== action.id);
    default:
      return state;
  }
};

const BookAppReducer = () => {
  const [state, dispatch] = useReducer(bookReducer, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`);
      dispatch({ type: 'INIT', books: response.data });
      // console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    setFilteredBooks(
      state.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [state, searchTerm]);

  const addBook = async (book: Book) => {
    try {
      const response = await axios.post(`${API_URL}/create-book`, book);
      dispatch({ type: 'ADD_BOOK', book: response.data });
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  const editBook = async (book: Book) => {
    console.log("button clicked");
    console.log(currentBook);
    if (currentBook) {
      try {
        const response = await axios.put(`${API_URL}/update-book/${book.id}`, book);
        dispatch({ type: 'EDIT_BOOK',
                  oldBook: currentBook,   
                  newBook: response.data });
                  setCurrentBook(null);
      } catch (error) {
        console.error("Failed to edit book:", error);
      }
    }
  };
  const handleEdit = (id: number) => {
    const bookToEdit = state.find((book) => book.id === id);
    if (bookToEdit) {
      setCurrentBook(bookToEdit);
    }
  };

  const handleSubmit = async (book: Book) => {
    if (currentBook) {
      await editBook(book);
    } else {
      await addBook(book);
    }
    window.location.reload();
  };

  const deleteBook = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/delete-book/${id}`);
      dispatch({ type: 'DELETE_BOOK', id: id });
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };


  return (
    <div className="container mx-auto p-4">
  
      <BookForm
        onSubmit={handleSubmit}
        currentBook={currentBook}
      />
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 w-full mt-4 rounded-md"
      />
      <BookTable books={filteredBooks} onEdit={handleEdit} onDelete={deleteBook} />
    </div>
  );
};

export default BookAppReducer;