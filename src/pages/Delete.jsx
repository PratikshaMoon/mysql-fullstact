import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Delete = () => {
  // State to manage form input values
  const [input, setInput] = useState({
    title: "",
    desc: "",
    cover: "", // Ensure the correct field name for the cover
    price: null
  });

  // State to manage book list and selected book ID for deletion
  const [books, setBooks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate(); // Access navigation functionality from React Router

  // Fetch all books from the server when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch all books from the server
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:7000/books");
      setBooks(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle changes in input fields and update the state accordingly
  const handleChange = (event) => {
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // Function to handle form submission (Adding a book)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    try {
      // Sending a POST request to add a book
      const response = await axios.post("http://localhost:7000/books", input);
      
      // Log the response data (for debugging purposes)
      console.log(response.data);
      
      // Refresh book list after adding a book
      fetchBooks();

      // Clear input fields after successful addition
      setInput({
        title: "",
        desc: "",
        cover: "",
        price: null
      });

      // Navigate to the homepage ("/") after successfully adding the book
      navigate("/");
    } catch (err) {
      console.log(err); // Log any errors that occur during the request
    }
  };

  // Function to handle deletion of a selected book by ID
  const handleDelete = async () => {
    try {
      if (selectedId) {
        await axios.delete(`http://localhost:7000/books/${selectedId}`);
        fetchBooks(); // Refresh book list after deletion
        setSelectedId(null); // Clear selectedId after deletion
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='form'>
      <h1>Add Book</h1>
      {/* Input fields for adding a book */}
      {/* ... (input fields for adding a book) */}
      {/* Button to trigger the form submission */}
      <button className="button" onClick={handleSubmit}>Add</button>

      {/* Book list with delete button for each book */}
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title}
            <button onClick={() => setSelectedId(book.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Delete button for the selected book */}
      {selectedId && (
        <button className="button" onClick={handleDelete}>Delete Selected Book</button>
      )}
    </div>
  );
};

export default Delete;
