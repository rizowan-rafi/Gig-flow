import React from "react";
import PropTypes from "prop-types";
import "./banner.css";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
const Ad = (props) => {
    const navigate = useNavigate();
    const [data] = useUser();
    const handleAd = () => {
        if (!data) navigate("/register", { replace: true });
        else navigate(`/dashboard/${data?.role}/home`);
    };
    return (
        <div className="pb-20 dark:bg-text">

        <div className="text-text mx-10 rounded-xl  bg-gradient-to-r from-accent via-secondary to-background dark:bg-gradient-to-l dark:from-text dark:via-secondary dark:to-accent dark:text-background flex flex-col lg:flex-row items-center justify-between shadow-xl p-12 py-16">
            <div className="lg:w-[70%]">
                <h2 className="text-2xl font-bold">
                    Start Earning Instantly with Simple Tasks!
                </h2>
                <p className="font-semibold text-gray-500 mt-2 w-[90%]">
                    Join thousands of users who are earning real money by
                    completing easy tasks from the comfort of their homes. No
                    experience needed—just your skills and a few minutes to get
                    started!
                </p>
            </div>
            <div className="mt-5 lg:mt-0">
                <button
                    onClick={handleAd}
                    className="  border-1 text-primary border-primary dark:text-background dark:border-background   btn btn-outline btn-lg hover:border-primary hover:bg-primary font-bold  hover:text-white"
                >
                    Get Started Today
                </button>
            </div>
        </div>
        </div>
    );
};

Ad.propTypes = {};

export default Ad;
