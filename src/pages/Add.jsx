import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../src/css/addForms.css'; // Import the CSS file

const Add = () => {
  const [input, setInput] = useState({
    title: '',
    desc: '',
    cover: '',
    price: null,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:7000/books', input);
      console.log(response.data);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
    <div className='add-form'>
      <h1>Add Book</h1>
      <input type='text'className='input' placeholder='Enter book name' name='title' onChange={handleChange} />
      <input type='text'className='input' placeholder='Enter description' name='desc' onChange={handleChange} />
      <input type='text'className='input' placeholder='Enter cover' name='cover' onChange={handleChange} />
      <input type='number'className='input' placeholder='Enter book price' name='price' onChange={handleChange} />
      <button className='submit-button' onClick={handleSubmit}>Add</button>
     
    </div>
    <button className='submit-butt'><Link to="/">Cancel Go Back</Link></button>
    </div>
  );
};

export default Add;
