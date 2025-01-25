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
    return (
        <div className="banner py-5">
            <Carousel
                autoPlay={true}
                interval={2000}
                stopOnHover={true}
                className="cursor-pointer"
                infiniteLoop={true}
                showThumbs={false}
            >
                <div className="md:flex items-center justify-center">
                    <div className="w-[90%] lg:w-[50%]">
                        <h2 className="text-2xl md:text-4xl font-bold lg:text-left ">
                            <span className="text-[#ff5851]">Empowering</span>{" "}
                            Connections, <br />
                            <span className="text-[#ff5851]">Rewarding </span>
                            Outcomes
                        </h2>
                        <p className="text-xl font-medium text-gray-600  lg:text-left">
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
                            <span className="text-[#ff5851]">Find</span> Talent,{" "}
                            {/* <br /> */}
                            Get <span className="text-[#ff5851]">
                                Work{" "}
                            </span>{" "}
                            Done
                        </h2>
                        <p className="text-xl font-medium text-gray-600  lg:text-left">
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
                            <span className="text-[#ff5851]">
                                {" "}
                                Skills{" "}
                            </span>{" "}
                            Into <br />
                            <span className="text-[#ff5851]">Earnings </span>
                        </h2>
                        <p className="text-xl font-medium text-gray-600  lg:text-left">
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
