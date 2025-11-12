import React from 'react';
import Hero from '../components/Hero';
import AllBooks from './AllBooks';

const Home = () => {
    return (
        <div>
            <section>
                <Hero/>
            </section>
            <section>
                <AllBooks/>
            </section>
        </div>
    );
};

export default Home;