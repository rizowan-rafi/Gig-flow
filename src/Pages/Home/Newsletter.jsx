import React from "react";
import PropTypes from "prop-types";
import newsletter from "../../assets/newsletter/newsletter.jpg";
const Newsletter = (props) => {
    return (
        <div className="pb-20 bg-background dark:bg-text">
            <div className="mx-10 lg:flex justify-center gap-10 space-y-5 items-center bg-[#48ae38] rounded-xl lg:py-10 pb-4 ">
                <div className="lg:w-[30%]">
                    <img
                        src={newsletter}
                        width="lg:w-full"
                        className="rounded-xl"
                        alt=""
                    />
                </div>
                <div className="space-y-3">
                    <h2 className="capitalize text-2xl font-bold text-center lg:text-left">
                        <span className="text-4xl">
                            <span className="text-accent">Subcribe</span> to our{" "}
                            <span className="text-accent">newsletter</span>{" "}
                            <br />{" "}
                        </span>
                        to Stay Ahead & Earn More!
                    </h2>
                    <p className="text-xl w-[95%] lg:text-left text-center lg:w-[70%]">
                        Exclusive tips, earning opportunities, and special
                        rewards—straight to your inbox!
                    </p>
                    <form className="lg:text-left text-center">
                        <input
                            type="text"
                            placeholder="Email address"
                            className="lg:w-1/2 py-3 text-[17px] rounded-l-md p-2"
                        />
                        <button
                            type="submit"
                            className="bg-accent text-background font-bold py-[14px] px-5 rounded-r-lg"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

Newsletter.propTypes = {};

export default Newsletter;
