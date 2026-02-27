import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    FaArrowLeft,
    FaCoins,
    FaUsers,
    FaCalendarAlt,
    FaEnvelope,
    FaUserTie,
    FaFileUpload,
} from "react-icons/fa";
import useUser from "../../../hooks/useUser";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TaskDetail = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData] = useUser();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure
            .get(`/task/${taskId}`)
            .then((response) => {
                setTask(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching task:", error);
                setLoading(false);
            });
    }, [taskId, axiosSecure]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const submissionDetail = e.target.submission.value;

        const submission = {
            task_id: task._id,
            task_title: task.title,
            payable_amount: task.payment,
            worker_email: userData.email,
            submission_details: submissionDetail,
            worker_name: userData.name,
            buyer_name: task.buyer_name || "Anonymous Buyer",
            buyer_email: task.buyer_email,
            status: "pending",
            current_date: new Date().toISOString().split("T")[0],
        };

        try {
            const response = await axiosSecure.post("/submissions", submission);
            if (response.data.insertedId) {
                const notification = {
                    message: `New submission for "${task.title}" by ${userData.name}`,
                    toEmail: task.buyer_email,
                    fromEmail: userData.email,
                    time: new Date().toISOString().split("T")[0],
                    actionRoute: `/dashboard/Buyer/home`,
                };

                await axiosSecure.post("/notifications", notification);

                Swal.fire({
                    title: "Submitted!",
                    text: "Your work is now pending approval.",
                    icon: "success",
                    confirmButtonColor: "#59ba4a",
                });
                e.target.reset();
            }
        } catch (error) {
            Swal.fire("Error", "Submission failed. Please try again.", "error");
        }
    };

    if (loading) {
        return (
            <div className="h-96 flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-[#59ba4a]"></span>
            </div>
        );
    }

    return (
        <div className="p-4 lg:p-10 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                {/* Header / Navigation */}
                <div className="mb-8">
                    <Link
                        to="/dashboard/Worker/taskList"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-[#59ba4a] transition-colors font-bold text-sm uppercase tracking-widest"
                    >
                        <FaArrowLeft /> Back to Tasks
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-4">
                        Task <span className="text-[#59ba4a]">Details</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Task Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                            {/* Task Banner Image */}
                            <div className="h-64 w-full relative">
                                <img
                                    src={task.image}
                                    className="w-full h-full object-cover"
                                    alt={task.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <h2 className="absolute bottom-6 left-8 text-2xl font-bold text-white pr-8">
                                    {task.title}
                                </h2>
                            </div>

                            <div className="p-8">
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
                                    Instructions
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-8">
                                    {task.detail}
                                </p>

                                {/* Metadata Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-gray-50 dark:border-gray-700">
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                                        <div className="p-3 bg-white dark:bg-gray-800 rounded-xl text-[#59ba4a] shadow-sm">
                                            <FaUserTie />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">
                                                Buyer
                                            </p>
                                            <p className="font-bold dark:text-white">
                                                {task.buyer_name || "Anonymous"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                                        <div className="p-3 bg-white dark:bg-gray-800 rounded-xl text-blue-500 shadow-sm">
                                            <FaEnvelope />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">
                                                Contact
                                            </p>
                                            <p className="font-bold dark:text-white truncate max-w-[150px]">
                                                {task.buyer_email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Submission Area */}
                    <div className="space-y-6">
                        {/* Task Stats Card */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500 font-bold">
                                        <FaCoins className="text-yellow-500" />{" "}
                                        Payment
                                    </div>
                                    <div className="text-2xl font-black text-[#59ba4a]">
                                        {task.payment}{" "}
                                        <span className="text-xs uppercase">
                                            Coins
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500 font-bold">
                                        <FaUsers className="text-blue-500" />{" "}
                                        Open Slots
                                    </div>
                                    <div className="font-black dark:text-white">
                                        {task.required_worker} Left
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-500 font-bold">
                                        <FaCalendarAlt className="text-red-500" />{" "}
                                        Deadline
                                    </div>
                                    <div className="font-black dark:text-white">
                                        {task.deadline}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submission Form Card */}
                        <div className="bg-[#59ba4a] p-1 rounded-3xl shadow-2xl">
                            <div className="bg-white dark:bg-gray-900 rounded-[22px] p-8">
                                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                                    Submit Work
                                </h3>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <FaFileUpload className="text-[#59ba4a]" />{" "}
                                    Required: {task.submitInfo}
                                </p>

                                <form
                                    onSubmit={handleFormSubmit}
                                    className="space-y-4"
                                >
                                    <textarea
                                        name="submission"
                                        required
                                        placeholder="Paste proof links or write completion notes here..."
                                        className="textarea textarea-bordered w-full h-40 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:border-[#59ba4a] resize-none"
                                    ></textarea>

                                    <button
                                        type="submit"
                                        className="btn w-full bg-[#59ba4a] hover:bg-[#4a9d3e] border-none text-white font-black rounded-2xl h-14 shadow-lg shadow-green-100 dark:shadow-none transition-all active:scale-95"
                                    >
                                        Send Submission
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;
