import React, { useEffect, useState } from "react";
import {
    FaTasks,
    FaClock,
    FaCoins,
    FaCheckCircle,
    FaUserAlt,
    FaAward,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const WorkerHome = () => {
    const [taskCount, setTaskCount] = useState(0);
    const [taskPendingCount, setTaskPendingCount] = useState(0);
    const [totalEarn, setTotalEarn] = useState(0);
    const [taskApprovedCount, setTaskApprovedCount] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchWorkerStats = async () => {
            try {
                const [countRes, pendingRes, paymentRes, approvedRes] =
                    await Promise.all([
                        axiosSecure.get(`/subCount/${user.email}`),
                        axiosSecure.get(`/subPendingCount/${user.email}`),
                        axiosSecure.get(`/subPayment/${user.email}`),
                        axiosSecure.get(`/subApproved/${user.email}`),
                    ]);

                setTaskCount(countRes.data.count);
                setTaskPendingCount(pendingRes.data.count);
                setTotalEarn(paymentRes.data.total || 0);
                setTaskApprovedCount(approvedRes.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching stats:", error);
                setLoading(false);
            }
        };
        fetchWorkerStats();
    }, [axiosSecure, user.email]);

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center bg-gray-50 dark:bg-gray-900">
                <span className="loading loading-spinner loading-lg text-[#59ba4a]"></span>
            </div>
        );
    }

    const stats = [
        {
            label: "Total Submissions",
            val: taskCount,
            icon: <FaTasks />,
            color: "bg-blue-50 text-blue-500",
        },
        {
            label: "Pending Review",
            val: taskPendingCount,
            icon: <FaClock />,
            color: "bg-orange-50 text-orange-500",
        },
        {
            label: "Total Earnings",
            val: `${totalEarn} Coins`,
            icon: <FaCoins />,
            color: "bg-green-50 text-[#59ba4a]",
        },
    ];

    return (
        <div className="p-4 lg:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="mb-10 flex items-center gap-4">
                    <div className="p-4 hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <FaAward className="text-3xl text-yellow-500" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">
                            Welcome back,{" "}
                            <span className="text-[#59ba4a]">
                                {user.displayName?.split(" ")[0]}!
                            </span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Here is an overview of your earning progress.
                        </p>
                    </div>
                </div>

                {/* Achievement Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((s, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-6 hover:shadow-md transition-shadow"
                        >
                            <div
                                className={`p-5 rounded-2xl text-3xl ${s.color} dark:bg-opacity-10`}
                            >
                                {s.icon}
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
                                    {s.label}
                                </p>
                                <p className="text-3xl font-black text-gray-900 dark:text-white leading-none">
                                    {s.val}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Approved Tasks Section */}
                <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="p-8 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">
                            Recent Approved Submissions
                        </h3>
                        <div className="badge bg-green-50 text-[#59ba4a] border-none font-bold px-4 py-3">
                            {taskApprovedCount.length} Tasks
                        </div>
                    </div>

                    <div className="w-[90%] mx-auto overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead className="bg-gray-50 dark:bg-gray-750">
                                <tr className="text-gray-400 uppercase text-[10px] tracking-widest border-none">
                                    <th className="py-5 pl-8">#</th>
                                    <th>
                                        <div className="flex items-center gap-2">
                                            <FaUserAlt className="text-[10px]" />{" "}
                                            Buyer
                                        </div>
                                    </th>
                                    <th>Task Title</th>
                                    <th>Earnings</th>
                                    <th className="text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700 dark:text-gray-200">
                                {taskApprovedCount.length > 0 ? (
                                    taskApprovedCount.map((task, index) => (
                                        <tr
                                            key={task._id}
                                            className="hover:bg-green-50/30 dark:hover:bg-green-900/10 transition-colors border-gray-50 dark:border-gray-700"
                                        >
                                            <th className="pl-8 text-gray-300">
                                                {index + 1}
                                            </th>
                                            <td className="font-bold text-gray-900 dark:text-white">
                                                {task.buyer_name}
                                            </td>
                                            <td className="max-w-xs truncate">
                                                {task.task_title}
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-1 font-black text-[#59ba4a]">
                                                    <FaCoins className="text-xs" />{" "}
                                                    {task.payable_amount}
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-[10px] font-black uppercase tracking-tighter border border-green-200 dark:border-green-800">
                                                    <FaCheckCircle /> Approved
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="py-20 text-center text-gray-400 italic"
                                        >
                                            No approved tasks found yet. Start
                                            working to earn coins!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerHome;
