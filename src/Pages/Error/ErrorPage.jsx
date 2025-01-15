import React from "react";
import PropTypes from "prop-types";
import error from "../../assets/404/errorPage.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
const ErrorPage = (props) => {
    return (
        <div className="w-[60%] mx-auto">
            <Lottie animationData={error} loop={true}></Lottie>
            <div className="flex justify-center items-center">
                <Link
                    className="btn text-xl bg-[#ff5851] text-white text-center w-[300px]"
                    to={"/"}
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

ErrorPage.propTypes = {};

export default ErrorPage;
