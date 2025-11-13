import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  //  Fetch Book Details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/books/${id}`);
        setBook(res.data.result);
        setForm(res.data.result);
      } catch (err) {
        console.error("Error fetching book:", err);
        toast.error("Failed to fetch book details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  //  Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  //  Update Book
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/books/${id}`, form);
      toast.success("Book updated successfully!");
      setBook(form);
      setEditing(false);
    } catch (err) {
      console.error("Error updating book:", err);
      toast.error(" Failed to update book.");
    }
  };

  // Delete Book
 const handleDelete = async () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/books/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Book has been deleted successfully.",
          icon: "success",
        });
        toast.success("Book deleted successfully!");
        navigate("/allbooks");
      } catch (err) {
        console.error("Error deleting book:", err);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the book.",
          icon: "error",
        });
        toast.error("Failed to delete book.");
      }
    }
  });
};

 
  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-12 h-12 border-4 border-dashed border-indigo-600 rounded-full animate-spin"></div>
      </div>
    );

  if (!book)
    return (
      <p className="text-center text-red-500 font-semibold mt-10">
        Book not found.
      </p>
    );

  return (
    <section className="container mx-auto py-10 px-4">
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {editing ? (
          <form onSubmit={handleUpdate} className="p-8 space-y-4">
            <input
              name="title"
              value={form.title || ""}
              onChange={handleChange}
              className="border p-3 w-full rounded"
              placeholder="Title"
              required
            />
            <input
              name="author"
              value={form.author || ""}
              onChange={handleChange}
              className="border p-3 w-full rounded"
              placeholder="Author"
              required
            />
            <input
              name="genre"
              value={form.genre || ""}
              onChange={handleChange}
              className="border p-3 w-full rounded"
              placeholder="Genre"
            />
            <input
              type="number"
              name="rating"
              value={form.rating || ""}
              onChange={handleChange}
              className="border p-3 w-full rounded"
              placeholder="Rating (1-5)"
              min="1"
              max="5"
            />
            <textarea
              name="summary"
              value={form.summary || ""}
              onChange={handleChange}
              className="border p-3 w-full rounded"
              placeholder="Summary"
            />
            <input
              name="coverImage"
              value={form.coverImage || ""}
              onChange={handleChange}
              className="border p-3 w-full rounded"
              placeholder="Cover Image URL"
            />

            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
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
              <p className="text-gray-700 mt-4 leading-relaxed">
                {book.summary}
              </p>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => setEditing(true)}
                  className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default BookDetails;
