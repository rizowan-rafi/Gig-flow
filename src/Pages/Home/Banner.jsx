import React from "react";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import img1 from "../../assets/Logo/footerLogo.png";
import Lottie from "lottie-react";
import general from "../../assets/Banner/general.json";
import buyer from "../../assets/Banner/buyer.json";
import worker from "../../assets/Banner/worker.json";
import './banner.css'
const Banner = (props) => {
    // bg-gradient-to-b from-primary to-background
    return (
        <div className=" py-5   bg-gradient-to-b from-accent via-secondary to-background dark:bg-gradient-to-r dark:from-text dark:via-secondary dark:to-accent dark:text-background ">
            <Carousel
                autoPlay={true}
                interval={2000}
                stopOnHover={true}
                className="cursor-pointer"
                infiniteLoop={true}
                showThumbs={false}
                
            >
                <div className="md:flex items-center justify-center  relative">
                    <div className="w-[90%] lg:w-[50%] ">
                        <h2 className="text-2xl md:text-4xl font-bold lg:text-left text-blac">
                            <span className="text-primary">Empowering</span>{" "}
                            Connections, <br />
                            <span className="text-primary">Rewarding </span>
                            Outcomes
                        </h2>
                        <p className="text-xl font-medium   lg:text-left">
                            Discover a platform where opportunities meet
                            ambition. Whether you're looking to get tasks done
                            or earn by completing them, we bridge the gap for
                            seamless collaboration.
                        </p>
                    </div>

                    <Lottie animationData={general} loop={true}></Lottie>
                </div>
                <div className="md:flex items-center justify-center">
                    <div className="w-[90%] lg:w-[50%]">
                        <h2 className="text-2xl md:text-4xl font-bold lg:text-left ">
                            <span className="text-primary">Find</span> Talent,{" "}
                            {/* <br /> */}
                            Get <span className="text-primary">Work </span> Done
                        </h2>
                        <p className="text-xl font-medium   lg:text-left">
                            Simplify your workflow with skilled workers ready to
                            take on your tasks. From quick gigs to specialized
                            projects, we help you achieve your goals faster and
                            more efficiently.
                        </p>
                    </div>

                    <Lottie animationData={buyer} loop={true}></Lottie>
                </div>
                <div className="md:flex items-center justify-center">
                    <div className="w-[90%] lg:w-[50%]">
                        <h2 className="text-2xl md:text-4xl font-bold lg:text-left ">
                            Turn Your
                            <span className="text-primary">
                                {" "}
                                Skills{" "}
                            </span> Into <br />
                            <span className="text-primary">Earnings </span>
                        </h2>
                        <p className="text-xl font-medium  lg:text-left">
                            Unlock a world of opportunities where your talents
                            shine. Take on tasks, build your portfolio, and earn
                            a steady income—one micro-task at a time.
                        </p>
                    </div>

                    <Lottie animationData={worker} loop={true}></Lottie>
                </div>
            </Carousel>
        </div>
    );
};

Banner.propTypes = {};

export default Banner;
