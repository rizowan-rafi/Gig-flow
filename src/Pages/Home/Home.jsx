import React from "react";
import PropTypes from "prop-types";
import Banner from "./Banner";
import Testimonial from "./Testimonial/Testimonial";

const Home = (props) => {
    return (
        <div>
            <section>
                <Banner></Banner>
            </section>
            <section>
                <Testimonial></Testimonial>
            </section>
        </div>
    );
};

Home.propTypes = {};

export default Home;
