import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
export const axiosSecure = axios.create({
    baseURL: "https://gig-flow-server.vercel.app",
});
const useAxiosSecure = (props) => {
    const navigate = useNavigate();
    const { signOutUser } = useAuth();
    axiosSecure.interceptors.request.use(
        function (config) {
            const token = localStorage.getItem("token");
            console.log(config, token)
            if (token) {
                
                config.headers.authorization = "Bearer " + token;
            }
            return config;
        },
        function (err) {
            return Promise.reject(err);
        }
    );

    // axiosSecure.interceptors.response.use(
    //     function (response) {
    //         return response;
    //     },
    //     async function (err) {
    //         await new Promise((resolve) => setTimeout(resolve, 2000)); 
    
    //         const status = err.response.status;
    //         if (status === 401 || status === 403 || status === 400) {
    //             // localStorage.removeItem('token');
    //             // window.location.href = '/login';
    //             await signOutUser();
    //             navigate("/login")
    //         }
    //         // console.log('status error', err.response.status);
    //         return Promise.reject(err);
    //     }
    // );
    return axiosSecure;
};

useAxiosSecure.propTypes = {};

export default useAxiosSecure;
