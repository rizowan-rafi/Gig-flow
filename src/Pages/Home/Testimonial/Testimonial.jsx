import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaQuoteLeft } from "react-icons/fa6";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Testimonial = (props) => {
    const CustomStar = (
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    );

    const myStyles = {
        itemShapes: CustomStar,
        itemStrokeWidth: 2,
        activeFillColor: "#ff5851",
        activeStrokeColor: "#ff5851",
        inactiveFillColor: "white",
        inactiveStrokeColor: "#ff5851",
    };
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0); // Initial value
    useEffect(() => {
        fetch("reviews.json")
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, []);

    return (
        <div className="w-[90%] mx-auto">
            <h1 className="text-3xl font-bold text-[#ff5851] mt-20">Testimonial</h1>
            <div className="py-5">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {reviews.map((r) => (
                        <SwiperSlide className="flex gap-4 flex-col justify-center items-center py-16">
                            <div>
                                <img src={r.image} alt="" />
                            </div>
                            <div>
                                <Rating
                                    style={{ maxWidth: 150 }}
                                    value={r.rating}
                                    readOnly={true}
                                    itemStyles={myStyles}
                                />
                            </div>
                            <h3 className="text-7xl">
                                <FaQuoteLeft />
                            </h3>
                            <p className="w-[80%] mx-auto">{r.details}</p>
                            <p className="text-xl text-[#ff5851] font-semibold">
                                {r.name}
                            </p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

Testimonial.propTypes = {};

export default Testimonial;
