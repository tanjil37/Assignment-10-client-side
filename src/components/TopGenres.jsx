// src/components/TopGenres.jsx
import React from "react";
import { motion } from "framer-motion";

const genres = [
  { name: "Fantasy", image: "/images/fantasy.jpg" },
  { name: "Mystery", image: "/images/mystery.jpg" },
  { name: "Romance", image: "/images/romance.jpg" },
  { name: "Science Fiction", image: "/images/scifi.jpg" },
  { name: "Non-fiction", image: "/images/nonfiction.jpg" },
];

const TopGenres = () => {
  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-12">
        Top Genres
      </h2>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {genres.map((genre, idx) => (
          <motion.div
            key={idx}
            className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={genre.image}
              alt={genre.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2 font-semibold">
              {genre.name}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopGenres;
