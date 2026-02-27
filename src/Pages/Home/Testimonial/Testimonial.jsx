import React, { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaQuoteRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Testimonial = () => {
    const [reviews, setReviews] = useState([]);

    const ratingStyles = {
        itemShapes: (
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        ),
        activeFillColor: "#59ba4a",
        inactiveFillColor: "#e5e7eb",
    };

    useEffect(() => {
        fetch("reviews.json")
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, []);

    return (
        <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                    Voices of <span className="text-[#59ba4a]">Success</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Real Experiences, Real Success — See What Our Users Say!
                </p>
            </div>

            <div className="max-w-5xl mx-auto">
                <Swiper
                    spaceBetween={50}
                    centeredSlides={true}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="testimonial-swiper"
                >
                    {reviews.map((r) => (
                        <SwiperSlide key={r.name} className="pb-16">
                            <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center">
                                {/* Floating Quote Icon */}
                                <div className="absolute top-6 left-8 text-[#59ba4a]/20 text-6xl">
                                    <FaQuoteRight />
                                </div>

                                {/* User Avatar */}
                                <div className="relative mb-6">
                                    <div className="w-24 h-24 rounded-full border-4 border-[#59ba4a] overflow-hidden shadow-inner">
                                        <img
                                            src={r.image}
                                            alt={r.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 right-0 bg-[#59ba4a] p-1.5 rounded-full shadow-lg">
                                        <svg
                                            className="w-4 h-4 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="mb-6">
                                    <Rating
                                        style={{ maxWidth: 130 }}
                                        value={r.rating}
                                        readOnly
                                        itemStyles={ratingStyles}
                                    />
                                </div>

                                {/* Testimonial Content */}
                                <blockquote className="text-center">
                                    <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 italic leading-relaxed mb-8">
                                        "{r.details}"
                                    </p>
                                    <cite className="not-italic">
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                            {r.name}
                                        </h4>
                                        <p className="text-sm text-[#59ba4a] font-semibold mt-1">
                                            Verified Worker
                                        </p>
                                    </cite>
                                </blockquote>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonial;
