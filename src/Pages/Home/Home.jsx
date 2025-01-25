import React from "react";
import PropTypes from "prop-types";
import Banner from "./Banner";
import Testimonial from "./Testimonial/Testimonial";
import BestWorker from "./BestWorker";
import Acknowledge from "./Acknowledge";
import Faq from "./Faq";
import Ad from "./Ad";

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
            <section>
                 <Faq></Faq>
            </section>
            <section>
                 <Testimonial></Testimonial>
            </section>
            <section>
                <Ad></Ad>
            </section>
        </div>
    );
};

Home.propTypes = {};

export default Home;
