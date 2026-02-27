import React, { useEffect, useState } from "react";
import {
    MdDelete,
    MdOutlineAssignment,
    MdAttachMoney,
    MdGroups,
    MdEventBusy,
    MdLayers,
} from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminTask = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    const fetchTasks = async () => {
        try {
            const response = await axiosSecure.get("/tasks");
            setTasks(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [axiosSecure]);

    const handleDeleteTask = async (taskId, taskTitle) => {
        Swal.fire({
            title: "Remove Task?",
            text: `Are you sure you want to delete "${taskTitle}"? This will remove it for all workers.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete It",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/tasks/${taskId}`);
                    if (res.data.deletedCount) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "The task has been removed from the platform.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false,
                        });
                        setTasks(tasks.filter((task) => task._id !== taskId));
                    }
                } catch (error) {
                    Swal.fire("Error", "Failed to delete the task.", "error");
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center bg-gray-50 dark:bg-gray-900">
                <span className="loading loading-spinner loading-lg text-[#59ba4a]"></span>
            </div>
        );
    }

    return (
        <div className="p-4 lg:p-10 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                            <MdLayers className="text-[#59ba4a]" /> Global{" "}
                            <span className="text-[#59ba4a]">Task Board</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Review and manage all active opportunities on the
                            platform.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest block">
                            Total Tasks
                        </span>
                        <span className="text-2xl font-black text-gray-900 dark:text-white">
                            {tasks.length}
                        </span>
                    </div>
                </div>

                {/* Tasks Table Card */}
                <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="w-full  overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-gray-50 dark:bg-gray-750 border-none">
                                <tr className="text-gray-400 uppercase text-[10px] tracking-widest">
                                    <th className="py-6 pl-8">Task Title</th>
                                    <th className="hidden lg:table-cell">
                                        Task Description
                                    </th>
                                    <th className="hidden md:table-cell text-center">
                                        Budget Info
                                    </th>
                                    <th className="hidden xl:table-cell">
                                        Deadline
                                    </th>
                                    <th className="text-right pr-8">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700 dark:text-gray-200">
                                {tasks.length > 0 ? (
                                    tasks.map((task) => (
                                        <tr
                                            key={task._id}
                                            className="hover:bg-green-50/30 dark:hover:bg-green-900/10 transition-colors border-gray-50 dark:border-gray-700"
                                        >
                                            <td className="pl-8">
                                                <div className="font-black text-gray-900 dark:text-white max-w-[180px] truncate">
                                                    {task.title}
                                                </div>
                                                <div className="text-[10px] font-bold text-[#59ba4a] uppercase tracking-tighter mt-1">
                                                    Buyer ID:{" "}
                                                    {task.buyer_id?.slice(-6) ||
                                                        "N/A"}
                                                </div>
                                            </td>

                                            <td className="hidden lg:table-cell">
                                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 max-w-xs italic">
                                                    "{task.detail}"
                                                </p>
                                            </td>

                                            <td className="hidden md:table-cell">
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className="flex items-center gap-1 px-3 py-1 bg-green-50 dark:bg-green-900/20 rounded-full text-[#59ba4a] font-black text-xs">
                                                        <MdAttachMoney />{" "}
                                                        {task.payment}{" "}
                                                        <span className="text-[10px] opacity-70">
                                                            / task
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                                                        <MdGroups />{" "}
                                                        {task.required_worker}{" "}
                                                        slots left
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="hidden xl:table-cell">
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                                    <MdEventBusy className="text-red-400" />{" "}
                                                    {task.deadline}
                                                </div>
                                            </td>

                                            <td className="text-right pr-8">
                                                <button
                                                    onClick={() =>
                                                        handleDeleteTask(
                                                            task._id,
                                                            task.title,
                                                        )
                                                    }
                                                    className="btn btn-sm btn-square bg-red-50 text-red-500 border-none hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                    title="Delete Task"
                                                >
                                                    <MdDelete size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="py-20 text-center"
                                        >
                                            <div className="opacity-20 flex flex-col items-center">
                                                <MdOutlineAssignment
                                                    size={80}
                                                />
                                                <p className="text-xl font-black mt-4 uppercase tracking-widest">
                                                    No active tasks
                                                </p>
                                            </div>
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

export default AdminTask;
