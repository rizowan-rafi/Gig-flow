import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";

const useWorker = (props) => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { data: isWorker, isPending: isWorkerPending } = useQuery({
        queryKey: [user?.email, "buyer"],
        queryFn: async () => {
            const response = await axiosSecure.get(
                `/checkWorker/${user?.email}`
            );
            // console.log(response.data)
            return response.data;
        },
    });
    return [isWorker, isWorkerPending];
};

useWorker.propTypes = {};

export default useWorker;
