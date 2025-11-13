import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  //console.log(id);
  
  useEffect(() => {
    axios
      .get(`http://localhost:3000/books/${id}`) // Replace with your backend URL
      .then((res) => {
        setBook(res.data.result);
        //console.log(setBook);
        
        console.log(book);
        
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching book:", err);
        setLoading(false);
      });
  }, [book, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-12 h-12 border-4 border-dashed border-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        Book not found.
      </div>
    );
  }

  return (
    <section className="container mx-auto py-10 px-4">
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-8">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">
            {book.title}
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            <strong>Author:</strong> {book.author}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            <strong>Genre:</strong> {book.genre}
          </p>
          <p className="text-lg text-gray-600 mb-2">
            <strong>Rating:</strong> ⭐ {book.rating}/5
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">{book.summary}</p>
        </div>
      </motion.div>
    </section>
  );
};

export default BookDetails;
