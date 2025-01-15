import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "http://localhost:5000", // Public API endpoint
});
const useAxiosPublic = (props) => {
    return axiosPublic;
};

useAxiosPublic.propTypes = {};

export default useAxiosPublic;
