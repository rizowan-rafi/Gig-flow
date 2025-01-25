import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure, { axiosSecure } from "./useAxiosSecure";

const useBuyer = (props) => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const { data: isBuyer, isPending: isBuyerPending } = useQuery({
        queryKey: [user?.email, "buyer"],
        queryFn: async () => {
            const response = await axiosSecure.get(`/checkBuyer/${user.email}`);
            // console.log(response.data)
            return response.data;
        },
    });
    return [isBuyer, isBuyerPending];
};

useBuyer.propTypes = {};

export default useBuyer;
