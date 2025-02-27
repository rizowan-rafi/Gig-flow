import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { MdVerifiedUser } from "react-icons/md";
import { FaTasks, FaUser, FaUserTie } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";

const Acknowledge = (props) => {
    const axiosPublic = useAxiosPublic();
    const [totalUser, setTotalUser] = useState(0);
    const [totalWorkers, setTotalWorkers] = useState(0);
    const [totalBuyers, setTotalBuyers] = useState(0);
    const [totalTask, setTotalTask] = useState(0);
    useEffect(() => {
        axiosPublic.get("/userCount").then((res) => {
            setTotalUser(res.data.userCount);
        });
        axiosPublic.get("/wcCount").then((res) => {
            setTotalWorkers(res.data.workerCount);
            setTotalBuyers(res.data.buyerCount);
        });

        axiosPublic.get("/taskCount").then((res) => {
            setTotalTask(res.data.taskCount);
        });
    }, []);
    return (
        <div className="px-10 pb-20 bg-background dark:bg-text">
            <div className="mb-5 dark:text-background">
                <h1 className="text-3xl text-primary font-semibold  text-center">
                    What Makes us the Best?
                </h1>
                <p className="text-center text-xl lg:w-1/3  mx-auto">
                    Empowering Earners, Connecting Buyers – A Thriving
                    Micro-Earning Community!
                </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 dark:text-background">
                <div className="flex flex-col gap-2 justify-center p-3 items-center border-r-2 border-primary">
                    <p className="text-primary text-5xl">
                        <FaUser></FaUser>
                    </p>
                    <h2 className="text-xl font-semibold">
                        Total Users: {totalUser}
                    </h2>
                    <p className="text-center">
                        We proudly serve a diverse community of users with
                        varying needs and interests.
                    </p>
                </div>
                <div className="flex flex-col gap-2 justify-center p-3 items-center border-r-2 border-primary">
                    <p className="text-primary text-5xl">
                        <GrUserWorker></GrUserWorker>
                    </p>

                    <h2 className="text-xl font-semibold">
                        Total Workers: {totalWorkers}
                    </h2>
                    <p className="text-center">
                        We have a strong team of experienced workers to help you
                        with your tasks.
                    </p>
                </div>
                <div className="flex flex-col gap-2 justify-center p-3 items-center border-r-2 border-primary">
                    <p className="text-primary text-5xl">
                        <FaUserTie></FaUserTie>
                    </p>

                    <h2 className="text-xl font-semibold">
                        Total Buyers: {totalBuyers}
                    </h2>
                    <p className="text-center">
                        We have a wide range of buyers to help you find the
                        perfect tasks.
                    </p>
                </div>
                <div className="flex flex-col gap-2 justify-center border-r-2 border-primary lg:border-r-0 p-3 items-center">
                    <p className="text-primary text-5xl">
                        <FaTasks></FaTasks>
                    </p>

                    <h2 className="text-xl font-semibold">
                        Total Tasks: {totalTask}
                    </h2>
                    <p className="text-center">
                        We have a vast selection of tasks to help you earn money
                        and build your portfolio.
                    </p>
                </div>
            </div>
        </div>
    );
};

Acknowledge.propTypes = {};

export default Acknowledge;
