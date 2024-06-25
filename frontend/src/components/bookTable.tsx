import { BookTableProps } from "../types/types";
import { useState, useCallback } from 'react';



const BookTable =({ books, editBook, deleteBook }: BookTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 5;
  
    const handleNext = useCallback(() => {
      setCurrentPage((prevPage: number) => Math.min(prevPage + 1, Math.ceil(books.length / booksPerPage)));
    }, [books.length]);
  
    const handlePrevious = useCallback(() => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }, []);
  
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  
    return (
      <div>
        <table className="min-w-full bg-blue-100 divide-y divide-gray-500 mt-4">
          <thead>
            <tr>
              <th className="py-2">Title</th>
              <th className="py-2">Author</th>
              <th className="py-2">Year</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book, index) => (
              <tr key={index} className="text-center">
                <td className="py-2">{book.title}</td>
                <td className="py-2">{book.author}</td>
                <td className="py-2">{book.year}</td>
                <td className="py-2">
                  <button onClick={() => editBook(book)} className="bg-blue-500 text-white p-2 rounded-md mx-1">Edit</button>
                  <button onClick={() => deleteBook(book)} className="bg-red-600 text-white p-2 rounded-md mx-1">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button onClick={handlePrevious} disabled={currentPage === 1} className="bg-black text-white w-40 rounded-md p-300 p-2">Previous</button>
          <button onClick={handleNext} disabled={currentPage === Math.ceil(books.length / booksPerPage)} className="bg-black text-white rounded-md w-40 p-2">Next</button>
        </div>
      </div>
    );
  };
  
  export default BookTable;