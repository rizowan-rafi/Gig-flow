import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllTasks = (props) => {
    const axiosSecure = useAxiosSecure();
    const [tasks, setTasks] = useState();
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        axiosSecure.get("/tasks").then((response) => {
            setTasks(response.data);
            setLoading(false);
        });
    }, []);
        if (loading) {
            return (
                <div className="h-screen w-screen flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg  text-success"></span>
                </div>
            );
        }
    // console.log(tasks);
const handlePaymentSort = () => {
    const sortedTasks = [...tasks].sort((a, b) => b.payment - a.payment);
    setTasks(sortedTasks);
};
const handleWorkerSort = () => {
    const sortedTasks = [...tasks].sort(
        (a, b) => b.required_worker - a.required_worker
    );
    setTasks(sortedTasks);
};
    return (
        <div className="dark:bg-black">
            <div className="mx-6 my-8">
                {/* Header & Action Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6 dark:border-gray-700">
                    {/* Title Section */}
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Available Tasks
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Browse and filter tasks to start earning
                        </p>
                    </div>

                    {/* Controls Section */}
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold uppercase text-gray-400 mr-2 hidden sm:block">
                            Sort By:
                        </span>

                        <button
                            onClick={handlePaymentSort}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-[#59ba4a] hover:text-[#59ba4a] transition-all active:scale-95 shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            Payment
                        </button>

                        <button
                            onClick={handleWorkerSort}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-[#59ba4a] hover:text-[#59ba4a] transition-all active:scale-95 shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            Workers
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid lg:grid-cols-3 w-[80%] mx-auto gap-5 pb-5">
                {tasks &&
                    tasks.map((task) => (
                        <div key={task._id}>
                            <div className="max-w-sm bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                                <div className="relative h-48 w-full overflow-hidden">
                                    <img
                                        src={task.image}
                                        alt={task.title}
                                        className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                                        ${task.payment}
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1 truncate">
                                        {task.title}
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                                        {task.detail}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 border-t border-gray-100 dark:border-gray-700 pt-4 mb-5">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                                                Required Workers
                                            </p>
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                                👤 {task.required_worker} Slots
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                                                Submit Info
                                            </p>
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                                                📂 {task.submitInfo}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

AllTasks.propTypes = {};

export default AllTasks;
