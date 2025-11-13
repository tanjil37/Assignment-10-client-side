import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LatestBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((res) => {
        const allBooks = Array.isArray(res.data.result)
          ? res.data.result
          : res.data;

        // ✅ Only take the latest 6 books (assuming new ones come last)
        const latestBooks = allBooks.slice(-6).reverse();
        setBooks(latestBooks);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching latest books:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-dashed border-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        Latest Books
      </h2>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <motion.div
              key={book._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-indigo-700 mb-1">
                  {book.title}
                </h3>
                <p className="text-gray-600 mb-2">by {book.author}</p>
                <p className="text-yellow-500 mb-3">
                  ⭐ {book.rating || "N/A"}/5
                </p>
                <Link to={`/book-details/${book._id}`}>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-md">
                    View Details
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* See All Books button */}
      <div className="text-center mt-10">
        <Link
          to="/all-books"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md"
        >
          See All Books →
        </Link>
      </div>
    </section>
  );
};

export default LatestBooks;
