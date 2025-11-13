import React from "react";
import Hero from "../components/Hero";
import LatestBooks from "../components/LatestBooks"; // ✅ new import

const Home = () => {
  return (
    <div>
      <section>
        <Hero />
      </section>

      <section>
        <LatestBooks /> {/* ✅ show only 6 latest books */}
      </section>
    </div>
  );
};

export default Home;
