import React, { useEffect, useState } from "react";
import {
    FaThumbsDown,
    FaThumbsUp,
    FaTasks,
    FaClock,
    FaHandHoldingUsd,
    FaEye,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BuyerHome = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [taskNumbers, setTaskNumbers] = useState(0);
    const [totalWorkers, setTotalWorkers] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [totalSubmission, setTotalSubmission] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [tasks, workers, payments, submissions] =
                    await Promise.all([
                        axiosSecure.get(`/taskCount/${user.email}`),
                        axiosSecure.get(`/workersCount/${user.email}`),
                        axiosSecure.get(`/paymentsCount/${user.email}`),
                        axiosSecure.get(`/submissionBuyer/${user.email}`),
                    ]);

                setTaskNumbers(tasks.data.count);
                setTotalWorkers(workers.data.total);
                setTotalPayment(payments.data.total);

                // Only show pending submissions for the review table
                const pending = submissions.data.filter(
                    (t) => t.status === "pending",
                );
                setTotalSubmission(pending);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchStats();
    }, [axiosSecure, user.email]);

    const handleApproval = async (
        id,
        wemail,
        wcoinAmount,
        taskTitle,
        workerName,
    ) => {
        const statusRes = await axiosSecure.patch(`/submissionStatus/${id}`, {
            status: "approved",
        });
        const getW = await axiosSecure.get(`/users/${wemail}`);
        const coinRes = await axiosSecure.patch(`/coins`, {
            email: wemail,
            coin: getW.data.coin + wcoinAmount,
        });

        if (statusRes.data.modifiedCount && coinRes.data.modifiedCount) {
            const note = {
                message: `Task "${taskTitle}" approved! You received ${wcoinAmount} coins from ${user.displayName}.`,
                time: new Date().toISOString(),
                toEmail: wemail,
                fromEmail: user.email,
                actionRoute: "/dashboard/Worker/home",
            };
            await axiosSecure.post("/notifications", note);

            Swal.fire({
                icon: "success",
                title: "Approved!",
                showConfirmButton: false,
                timer: 1500,
            });
            setTotalSubmission(totalSubmission.filter((s) => s._id !== id));
        }
    };

    const handleReject = async (id, wemail, tid, taskTitle, workerName) => {
        const statusRes = await axiosSecure.patch(`/submissionStatus/${id}`, {
            status: "rejected",
        });
        const taskData = await axiosSecure.get(`/task/${tid}`);
        const taskUpdate = await axiosSecure.patch(`/task/${tid}`, {
            required_worker: taskData.data.required_worker + 1,
        });

        if (statusRes.data.modifiedCount && taskUpdate.data.modifiedCount) {
            const note = {
                message: `Task "${taskTitle}" was rejected by ${user.displayName}.`,
                time: new Date().toISOString(),
                toEmail: wemail,
                fromEmail: user.email,
                actionRoute: "/dashboard/Worker/home",
            };
            await axiosSecure.post("/notifications", note);

            Swal.fire({
                icon: "error",
                title: "Rejected",
                showConfirmButton: false,
                timer: 1500,
            });
            setTotalSubmission(totalSubmission.filter((s) => s._id !== id));
        }
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center bg-gray-50 dark:bg-gray-900">
                <span className="loading loading-spinner loading-lg text-[#59ba4a]"></span>
            </div>
        );
    }

    const stats = [
        {
            label: "Total Tasks",
            val: taskNumbers,
            icon: <FaTasks />,
            color: "bg-blue-50 text-blue-500",
        },
        {
            label: "Pending Tasks",
            val: totalWorkers,
            icon: <FaClock />,
            color: "bg-orange-50 text-orange-500",
        },
        {
            label: "Total Payment",
            val: `${totalPayment} Coins`,
            icon: <FaHandHoldingUsd />,
            color: "bg-green-50 text-[#59ba4a]",
        },
    ];

    return (
        <div className="p-4 lg:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-7xl mx-auto">
                {stats.map((s, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-5"
                    >
                        <div
                            className={`p-4 rounded-2xl text-2xl ${s.color} dark:bg-opacity-10`}
                        >
                            {s.icon}
                        </div>
                        <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                                {s.label}
                            </p>
                            <p className="text-2xl font-black text-gray-900 dark:text-white">
                                {s.val}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Submissions Table Section */}
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                        Review{" "}
                        <span className="text-[#59ba4a]">Submissions</span>
                    </h2>
                    <span className="badge badge-lg bg-[#59ba4a] text-white border-none px-4 py-4">
                        {totalSubmission.length} Pending
                    </span>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="w-[90%] lg:w-full overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead className="bg-gray-50 dark:bg-gray-750">
                                <tr className="text-gray-400 uppercase text-[10px] tracking-widest border-none">
                                    <th className="py-5 pl-8">#</th>
                                    <th>Worker</th>
                                    <th>Task Title</th>
                                    <th>Payment</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700 dark:text-gray-200">
                                {totalSubmission.length > 0 ? (
                                    totalSubmission.map((s, idx) => (
                                        <tr
                                            key={s._id}
                                            className="hover:bg-green-50/30 dark:hover:bg-green-900/10 transition-colors border-gray-50 dark:border-gray-700"
                                        >
                                            <th className="pl-8 text-gray-300">
                                                {idx + 1}
                                            </th>
                                            <td className="font-bold">
                                                {s.worker_name}
                                            </td>
                                            <td>{s.task_title}</td>
                                            <td>
                                                <span className="font-black text-[#59ba4a]">
                                                    {s.payable_amount}
                                                </span>
                                                <span className="text-[10px] text-gray-400 ml-1">
                                                    Coins
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex justify-center gap-2">
                                                    {/* View Detail Trigger */}
                                                    <button
                                                        onClick={() =>
                                                            document
                                                                .getElementById(
                                                                    `modal_${s._id}`,
                                                                )
                                                                .showModal()
                                                        }
                                                        className="btn btn-sm btn-square bg-blue-50 text-blue-500 border-none hover:bg-blue-500 hover:text-white"
                                                    >
                                                        <FaEye />
                                                    </button>

                                                    {/* Approve */}
                                                    <button
                                                        onClick={() =>
                                                            handleApproval(
                                                                s._id,
                                                                s.worker_email,
                                                                s.payable_amount,
                                                                s.task_title,
                                                                s.worker_name,
                                                            )
                                                        }
                                                        className="btn btn-sm btn-square bg-green-50 text-[#59ba4a] border-none hover:bg-[#59ba4a] hover:text-white"
                                                    >
                                                        <FaThumbsUp />
                                                    </button>

                                                    {/* Reject */}
                                                    <button
                                                        onClick={() =>
                                                            handleReject(
                                                                s._id,
                                                                s.worker_email,
                                                                s.task_id,
                                                                s.task_title,
                                                                s.worker_name,
                                                            )
                                                        }
                                                        className="btn btn-sm btn-square bg-red-50 text-red-500 border-none hover:bg-red-500 hover:text-white"
                                                    >
                                                        <FaThumbsDown />
                                                    </button>
                                                </div>

                                                {/* Submission Details Modal */}
                                                <dialog
                                                    id={`modal_${s._id}`}
                                                    className="modal modal-middle"
                                                >
                                                    <div className="modal-box w-[80%] lg:w-full mx-auto dark:bg-gray-800 rounded-3xl p-4 lg:p-8">
                                                        <h3 className="font-black text-2xl text-gray-900 dark:text-white mb-2">
                                                            Review Submission
                                                        </h3>
                                                        <p className="text-sm text-[#59ba4a] font-bold uppercase mb-6">
                                                            {s.task_title}
                                                        </p>

                                                        <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl mb-8 border border-gray-100 dark:border-gray-600">
                                                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                                                                Worker's Note /
                                                                Proof
                                                            </p>
                                                            <p className="text-gray-700 dark:text-gray-200 leading-relaxed italic">
                                                                "
                                                                {
                                                                    s.submission_details
                                                                }
                                                                "
                                                            </p>
                                                        </div>

                                                        <div className="modal-action">
                                                            <form method="dialog">
                                                                <button className="btn rounded-xl px-10 border-none bg-gray-100 text-gray-500">
                                                                    Close Review
                                                                </button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </dialog>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="py-20 text-center text-gray-400 italic"
                                        >
                                            No pending submissions to review.
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

export default BuyerHome;
