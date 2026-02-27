import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Lottie from "lottie-react";
import general from "../../assets/Banner/general.json";
import buyer from "../../assets/Banner/buyer.json";
import worker from "../../assets/Banner/worker.json";
import "./banner.css";

const Banner = () => {
    return (
        <section className="w-full bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-950 dark:via-gray-900 dark:to-[#59ba4a]/10 transition-colors duration-500 overflow-hidden">
            <div className="max-w-7xl mx-auto py-10 lg:py-20 px-6">
                <Carousel
                    autoPlay={true}
                    interval={5000}
                    stopOnHover={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                    className="main-hero-carousel"
                >
                    {/* Slide 1: General/Welcome */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-left pb-12">
                        <div className="lg:w-1/2 space-y-6">
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">
                                <span className="text-[#59ba4a]">
                                    Empowering
                                </span>{" "}
                                Connections, <br />
                                Rewarding Outcomes
                            </h2>
                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                                Discover a platform where opportunities meet
                                ambition. Bridge the gap between needing a task
                                done and earning through collaboration.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="px-8 py-4 bg-[#59ba4a] text-white font-bold rounded-xl shadow-lg hover:bg-[#4a9d3e] transition-all transform hover:-translate-y-1">
                                    Explore Tasks
                                </button>
                                <button className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                                    How it Works
                                </button>
                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full max-w-lg lg:max-w-none">
                            <Lottie
                                animationData={general}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>

                    {/* Slide 2: Buyer Focus */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-left pb-12">
                        <div className="lg:w-1/2 space-y-6">
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">
                                Find{" "}
                                <span className="text-[#59ba4a]">Talent</span>,{" "}
                                <br />
                                Get Work Done
                            </h2>
                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                                Simplify your workflow with skilled workers
                                ready for any task. From quick gigs to
                                specialized projects, achieve goals faster.
                            </p>
                            <button className="px-8 py-4 bg-[#59ba4a] text-white font-bold rounded-xl shadow-lg hover:bg-[#4a9d3e] transition-all transform hover:-translate-y-1">
                                Post a Task
                            </button>
                        </div>
                        <div className="lg:w-1/2 w-full max-w-lg lg:max-w-none">
                            <Lottie
                                animationData={buyer}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>

                    {/* Slide 3: Worker Focus */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-left pb-12">
                        <div className="lg:w-1/2 space-y-6">
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">
                                Turn Your{" "}
                                <span className="text-[#59ba4a]">Skills</span>{" "}
                                <br />
                                Into Earnings
                            </h2>
                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                                Unlock opportunities where your talents shine.
                                Build your portfolio and earn a steady
                                income—one micro-task at a time.
                            </p>
                            <button className="px-8 py-4 bg-[#59ba4a] text-white font-bold rounded-xl shadow-lg hover:bg-[#4a9d3e] transition-all transform hover:-translate-y-1">
                                Start Earning
                            </button>
                        </div>
                        <div className="lg:w-1/2 w-full max-w-lg lg:max-w-none">
                            <Lottie
                                animationData={worker}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </Carousel>
            </div>
        </section>
    );
};

export default Banner;
