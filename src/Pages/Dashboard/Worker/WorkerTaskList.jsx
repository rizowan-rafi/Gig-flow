import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaCalendarAlt,
    FaUsers,
    FaCoins,
    FaArrowRight,
    FaSearchDollar,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const WorkerTaskList = () => {
    const [taskList, setTaskList] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get("/taskslist").then((res) => {
            setTaskList(res.data);
            setLoading(false);
        });
    }, [axiosSecure]);

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center bg-gray-50 dark:bg-gray-900">
                <span className="loading loading-spinner loading-lg text-[#59ba4a]"></span>
            </div>
        );
    }

    return (
        <div className="p-4 lg:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white leading-tight">
                            Available{" "}
                            <span className="text-[#59ba4a]">Tasks</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Browse and complete tasks to start earning coins
                            instantly.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <FaSearchDollar className="text-[#59ba4a]" />
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                            {taskList.length} Tasks Found
                        </span>
                    </div>
                </div>
            </div>

            {/* Tasks Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {taskList.map((task) => (
                    <div
                        key={task._id}
                        className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
                    >
                        {/* Task Image & Payment Badge */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={task.image}
                                alt={task.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4 bg-[#59ba4a] text-white px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 font-black">
                                <FaCoins />
                                <span>{task.payment}</span>
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-[#59ba4a] transition-colors">
                                {task.title}
                            </h3>

                            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-6 flex items-center gap-1">
                                Posted by:{" "}
                                <span className="text-gray-600 dark:text-gray-300 italic">
                                    {task.buyer_email.split("@")[0]}
                                </span>
                            </p>

                            {/* Metadata Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-8 pt-4 border-t border-gray-50 dark:border-gray-700">
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">
                                        Available Slots
                                    </p>
                                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-bold">
                                        <FaUsers className="text-[#59ba4a]" />
                                        <span>{task.required_worker} Left</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] uppercase font-black tracking-widest text-gray-400">
                                        Deadline
                                    </p>
                                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-bold">
                                        <FaCalendarAlt className="text-red-400" />
                                        <span>{task.deadline}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="mt-auto">
                                <Link
                                    to={`/dashboard/Worker/taskDetail/${task._id}`}
                                >
                                    <button className="w-full py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-black rounded-2xl transition-all hover:bg-[#59ba4a] dark:hover:bg-[#59ba4a] dark:hover:text-white active:scale-95 shadow-lg flex items-center justify-center gap-2 group/btn">
                                        View Details
                                        <FaArrowRight className="text-sm transform group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {taskList.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 opacity-20">
                    <FaSearchDollar size={100} />
                    <p className="text-2xl font-black mt-4">
                        No tasks available right now.
                    </p>
                </div>
            )}
        </div>
    );
};

export default WorkerTaskList;
