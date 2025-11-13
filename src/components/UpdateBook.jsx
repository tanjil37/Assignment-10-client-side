// UpdateBook.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: "", author: "", genre: "", rating: "" });

  useEffect(() => {
    axios.get(`https://assignment-10-server-one-smoky.vercel.app/books/${id}`).then((res) => setBook(res.data.result));
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`https://assignment-10-server-one-smoky.vercel.app/books/${id}`, book);
    navigate("/my-books");
  };

  return (
    <div className="max-w-lg mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Book</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input name="title" value={book.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" />
        <input name="author" value={book.author} onChange={handleChange} placeholder="Author" className="w-full border p-2 rounded" />
        <input name="genre" value={book.genre} onChange={handleChange} placeholder="Genre" className="w-full border p-2 rounded" />
        <input name="rating" value={book.rating} onChange={handleChange} placeholder="Rating" className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBook;
