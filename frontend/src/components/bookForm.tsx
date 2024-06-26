import { useRef, FormEvent } from 'react';
import { Book,BookFormProps } from '../types/types';

const BookForm = ({ onSubmit, currentBook }: BookFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (titleRef.current && authorRef.current && yearRef.current) {
      const newBook: Book = {
        title: titleRef.current.value,
        author: authorRef.current.value,
        year: yearRef.current.value, // Ensure the year is a number
      };
      onSubmit(newBook);
      titleRef.current.value = '';
      authorRef.current.value = '';
      yearRef.current.value = '';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Book Repository</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          ref={titleRef}
          placeholder="Title"
          defaultValue={currentBook?.title || ''}
          required
          className="border p-2 rounded-md w-full mt-5"
        />
        <input
          ref={authorRef}
          placeholder="Author"
          defaultValue={currentBook?.author || ''}
          required
          className="border p-2 rounded-md w-full mt-10"
        />
        <input
          ref={yearRef}
          placeholder="Publication Year"
          defaultValue={currentBook?.year ? currentBook.year.toString() : ''}
          required
          className="border p-2 rounded-md w-full mt-10"
        />
        <button type="submit" className="bg-blue-500 rounded-md mt-10 text-white p-2">
          {currentBook ? 'Update Book' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
