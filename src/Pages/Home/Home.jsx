import React from "react";
import PropTypes from "prop-types";
import Banner from "./Banner";
import Testimonial from "./Testimonial/Testimonial";
import BestWorker from "./BestWorker";
import Acknowledge from "./Acknowledge";
import Faq from "./Faq";
import Ad from "./Ad";
import Newsletter from "./Newsletter";
import Blog from "./Blog";

const Home = (props) => {
    return (
        <div>
            <section>
                <Banner></Banner>
            </section>
            <section>
                <BestWorker></BestWorker>
            </section>
            <section>
                <Acknowledge></Acknowledge>
            </section>
            <section id="faq">
                <Faq></Faq>
            </section>
            <section id="test">
                <Testimonial></Testimonial>
            </section>
            <section>
                <Newsletter></Newsletter>
            </section>
            <section>
                <Blog></Blog>
            </section>
            <section>
                <Ad></Ad>
            </section>
        </div>
    );
};

Home.propTypes = {};

export default Home;
