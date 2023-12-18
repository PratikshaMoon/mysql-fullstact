import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../src/css/addForms.css'; // Import the CSS file

const Update = () => {
  const [input, setInput] = useState({
    title: '',
    desc: '',
    cover: '',
    price: null,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/books/${id}`);
      setInput(response.data); // Set input values to the retrieved book details
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookDetails(); // Fetch book details when the component mounts
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:7000/books/${id}`, input);
      console.log(response.data);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className='add-form'>
        <h1>Update Book</h1>
        <input type='text' className='input' placeholder='Enter book name' name='title' value={input.title} onChange={handleChange} />
        <input type='text' className='input' placeholder='Enter description' name='desc' value={input.desc} onChange={handleChange} />
        <input type='text' className='input' placeholder='Enter cover' name='cover' value={input.cover} onChange={handleChange} />
        <input type='number' className='input' placeholder='Enter book price' name='price' value={input.price} onChange={handleChange} />
        <button className='submit-button' onClick={handleSubmit}>Update</button>
      </div>
      <button className='submit-butt'><Link to="/">Cancel Go Back</Link></button>
    </div>
  );
};

export default Update;
