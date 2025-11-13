import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Link } from "react-router";

const Hero = () => {
  const slides = [
    {
      id: 1,
      title: "Discover Your Next Great Read 📖",
      subtitle: "Explore thousands of books that spark your imagination.",
      image: "https://i.ibb.co/Ctw1bgn/book-banner-1.jpg",
    },
    {
      id: 2,
      title: "Write, Share, Inspire ✍️",
      subtitle: "Add your own favorite books and inspire other readers.",
      image: "https://i.ibb.co/q0j9tQY/book-banner-2.jpg",
    },
    {
      id: 3,
      title: "Journey Through Stories 🌍",
      subtitle: "From timeless classics to modern adventures — read them all.",
      image: "https://i.ibb.co/Yf9sMTk/book-banner-3.jpg",
    },
  ];

  return (
    <section className="relative">
      <Swiper
        modules={[EffectFade, Autoplay, Pagination]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-[80vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-[80vh] bg-center bg-cover flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Animated text */}
              <motion.div
                className="relative z-10 text-center text-white px-4 md:px-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl mb-8">{slide.subtitle}</p>

                <div className="flex justify-center gap-4">
                  <Link to="/all-books">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-full text-white font-semibold shadow-lg"
                    >
                      All Books
                    </motion.button>
                  </Link>

                  <Link to="/add-book">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full text-white font-semibold shadow-lg"
                    >
                      Create Book
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
