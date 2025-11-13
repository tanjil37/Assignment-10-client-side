import React, { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { auth } from "../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

const AddBook = () => {
  const [user] = useAuthState(auth);
  
  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    genre: "",
    rating: "",
    summary: "",
    coverImage: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !bookData.title ||
      !bookData.author ||
      !bookData.genre ||
      !bookData.rating ||
      !bookData.summary ||
      !bookData.coverImage
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    const newBook = {
      ...bookData,
      userEmail: user?.email,
      userName: user?.displayName,
    };

    setLoading(true);

    try {
      const res = await axios.post(
        "https://assignment-10-server-one-smoky.vercel.app/books", // replace with your backend endpoint
        newBook
      );
      if (res.data.insertedId) {
        toast.success("Book added successfully!");
        setBookData({
          title: "",
          author: "",
          genre: "",
          rating: "",
          summary: "",
          coverImage: "",
         
        });
      }
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto py-10 px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Add a New Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-indigo-600"
              placeholder="Enter book title"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block font-semibold mb-2">Author</label>
            <input
              type="text"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-indigo-600"
              placeholder="Enter author name"
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block font-semibold mb-2">Genre</label>
            <input
              type="text"
              name="genre"
              value={bookData.genre}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-indigo-600"
              placeholder="e.g., Mystery, Fantasy, Non-fiction"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block font-semibold mb-2">Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              value={bookData.rating}
              onChange={handleChange}
              min="1"
              max="5"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-indigo-600"
              placeholder="Rate this book"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block font-semibold mb-2">Summary</label>
            <textarea
              name="summary"
              value={bookData.summary}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-indigo-600"
              placeholder="Write a short description about the book"
            ></textarea>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block font-semibold mb-2">Cover Image URL</label>
            <input
              type="text"
              name="coverImage"
              value={bookData.coverImage}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-indigo-600"
              placeholder="Paste imgbb image URL"
            />
          </div>

          {/* User Info (read-only) */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">User Name</label>
              <input
                type="text"
                value={user?.displayName || ""}
                disabled
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-500"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">User Email</label>
              <input
                type="text"
                value={user?.email || ""}
                disabled
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold shadow-md"
            >
              {loading ? "Adding..." : "Add Book"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default AddBook;


