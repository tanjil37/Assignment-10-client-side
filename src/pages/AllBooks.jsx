

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Links } from "react-router";
import { motion } from "framer-motion";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/books") // Replace with your backend URL
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-12 h-12 border-4 border-dashed border-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        All Books
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white text-left">
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Author</th>
              <th className="px-6 py-3">Genre</th>
              <th className="px-6 py-3">Rating</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <motion.tr
                key={book._id}
                className={`hover:bg-gray-100 ${index % 2 ? "bg-gray-50" : ""}`}
                whileHover={{ scale: 1.01 }}
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {book.title}
                  
                  
                </td>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4">{book.genre}</td>
                <td className="px-6 py-4">{book.rating}/5</td>
                <td className="px-6 py-4 text-center">
                  <Link to={`/book-details/${book._id}`}>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-md">
                      View Details
                    </button>
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllBooks;
