import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../../src/css/books.css'; // Import the CSS file

const Books = () => {
    const [books, setBooks] = useState([]);
  
    // Function to fetch books data from the server
    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const response = await fetch('http://localhost:7000/books');
          const data = await response.json();
          setBooks(data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchBooks();
    }, []);
  
    // Function to handle deletion of a book by ID
    const handleDelete = async (id) => {
      try {
        await fetch(`http://localhost:7000/books/${id}`, {
          method: 'DELETE',
        });
        // After deletion, refresh the book list
        const response = await fetch('http://localhost:7000/books');
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <div>
        <h1>Moon Book Store</h1>
        {/* Displaying books */}
        <div className='books-container'>
          {books.map((book) => (
            <div className='book' key={book.id}>
              {/* Book details */}
              {book.cover && <img src={book.cover} alt='book-cover' />}
              <h2>{book.title}</h2>
              <p>{book.desc}</p>
              <span>{book.price}</span>
              {/* Delete button for each book */}
              <button onClick={() => handleDelete(book.id)}>Delete</button>
              <button><Link to={`/update/${book.id}`}>Update</Link></button>
            </div>
          ))}
        </div>
        {/* Link to navigate to the add new book page */}
        <button>
          <Link to='/add'>Add New Book</Link>
        </button>
      </div>
    );
  };
  
  export default Books;