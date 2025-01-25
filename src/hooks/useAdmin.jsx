import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = (props) => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isAdminPending } = useQuery({
        queryKey: [user?.email, "admin"],
        queryFn: async () => {
            const response = await axiosSecure.get(`/checkAdmin/${user.email}`);
            // console.log(response.data)
            return response.data;
        },
    });
    return [isAdmin, isAdminPending];
};

useAdmin.propTypes = {};

export default useAdmin;
