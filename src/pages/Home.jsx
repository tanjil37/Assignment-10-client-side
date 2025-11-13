import React from "react";
import Hero from "../components/Hero";
import LatestBooks from "../components/LatestBooks"; // ✅ new import
import TopGenres from "../components/TopGenres";
import BookOfTheWeek from "../components/featuredBook";

const Home = () => {
  return (
    <div>
      <section>
        <Hero />
      </section>

      <section>
        <LatestBooks /> {/* ✅ show only 6 latest books */}
      </section>
       <section>
        <TopGenres />
      </section>

      <section>
        <BookOfTheWeek />
      </section>
    </div>
  );
};

export default Home;
