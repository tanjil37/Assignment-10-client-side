// src/components/BookOfTheWeek.jsx
import React from "react";
import { motion } from "framer-motion";

const featuredBook = {
  title: "The Alchemist",
  author: "Paulo Coelho",
  genre: "Adventure",
  rating: 4.8,
  coverImage: "/images/alchemist.jpg",
  summary:
    "A magical story about following your dreams, discovering your destiny, and the importance of perseverance.",
};

const BookOfTheWeek = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
        <motion.img
          src={featuredBook.coverImage}
          alt={featuredBook.title}
          className="w-full md:w-1/3 rounded-xl shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />

        <motion.div
          className="md:w-2/3"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">
            Book of the Week
          </h2>
          <h3 className="text-2xl font-semibold mb-2">{featuredBook.title}</h3>
          <p className="text-gray-600 mb-2">
            <strong>Author:</strong> {featuredBook.author}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Genre:</strong> {featuredBook.genre}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Rating:</strong> ⭐ {featuredBook.rating}/5
          </p>
          <p className="text-gray-700 mb-6">{featuredBook.summary}</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full shadow-lg transition">
            Read More
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BookOfTheWeek;
