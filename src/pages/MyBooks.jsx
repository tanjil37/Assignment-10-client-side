// MyBooks.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import LoadingSpinner from "../components/LoadingSpinner";

const MyBooks = () => {
  const [user]  = useAuthState(auth);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's books
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/my-books?email=${user.email}`)
      .then((res) => {
        setMyBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user books:", err);
        setLoading(false);
      });
  }, [user]);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(`http://localhost:3000/books/${id}`);
      setMyBooks(myBooks.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  if (loading) {
    return <LoadingSpinner/>
  }

  return (
    <section className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        My Added Books
      </h2>

      {myBooks.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t added any books yet.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white text-left">
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Author</th>
                <th className="px-6 py-3">Genre</th>
                <th className="px-6 py-3">Rating</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myBooks.map((book, index) => (
                <motion.tr
                  key={book._id}
                  className={`hover:bg-gray-100 ${index % 2 ? "bg-gray-50" : ""}`}
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="px-6 py-4 font-medium text-gray-800">{book.title}</td>
                  <td className="px-6 py-4">{book.author}</td>
                  <td className="px-6 py-4">{book.genre}</td>
                  <td className="px-6 py-4">{book.rating}/5</td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <Link to={`/update-book/${book._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full shadow">
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full shadow"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default MyBooks;
