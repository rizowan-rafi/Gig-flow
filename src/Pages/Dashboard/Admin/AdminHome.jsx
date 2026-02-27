import React, { useEffect, useState } from "react";
import {
    FaUsers,
    FaUserTie,
    FaCoins,
    FaMoneyCheckAlt,
    FaCheckCircle,
    FaExclamationTriangle,
    FaClock,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminHome = () => {
    const [withdraw, setWithdraw] = useState([]);
    const [stats, setStats] = useState({
        workerCount: 0,
        buyerCount: 0,
        coinCount: 0,
        paymentCount: 0,
    });
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Using Promise.all for faster concurrent fetching
                const [withdrawRes, countRes, coinRes, paymentRes] =
                    await Promise.all([
                        axiosSecure.get("/withdraws"),
                        axiosSecure.get("/wcCount"),
                        axiosSecure.get("/wcSum"),
                        axiosSecure.get("/totalPayment"),
                    ]);

                setWithdraw(withdrawRes.data);
                setStats({
                    workerCount: countRes.data.workerCount,
                    buyerCount: countRes.data.buyerCount,
                    coinCount: coinRes.data.total,
                    paymentCount: paymentRes.data.total,
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [axiosSecure]);

    const handleWithdraw = async (id, email, wcoin, wstatus, name) => {
        if (wstatus === "approved") {
            Swal.fire({
                title: "Already Processed",
                text: "This withdrawal request has already been approved.",
                icon: "info",
                confirmButtonColor: "#59ba4a",
            });
            return;
        }

        // Added a confirmation step for security
        const confirm = await Swal.fire({
            title: "Approve Withdrawal?",
            text: `Are you sure you want to approve ${wcoin} coins for ${name}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#59ba4a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve",
        });

        if (!confirm.isConfirmed) return;

        try {
            const statusRes = await axiosSecure.patch(`/withdrawStatus/${id}`, {
                status: "approved",
            });
            const userRes = await axiosSecure.get(`/users/${email}`);
            const coinUpdateRes = await axiosSecure.patch(
                `/withdrawCoin/${email}`,
                {
                    coin: userRes.data.coin - wcoin,
                },
            );

            if (
                coinUpdateRes.data.modifiedCount &&
                statusRes.data.modifiedCount
            ) {
                const note = {
                    toEmail: email,
                    formEmail: "Admin@gigflow.com",
                    time: new Date().toISOString(),
                    message: `Congratulations! Your withdrawal request has been approved by the Admin.`,
                    actionRoute: "/dashboard/Worker/home",
                };
                await axiosSecure.post("/notifications", note);

                Swal.fire(
                    "Success",
                    "Withdrawal approved and coins deducted.",
                    "success",
                );

                // Update local state to reflect change without re-fetching everything
                setWithdraw((prev) =>
                    prev.map((w) =>
                        w._id === id ? { ...w, status: "approved" } : w,
                    ),
                );
            }
        } catch (err) {
            Swal.fire("Error", "Failed to process approval.", "error");
        }
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center bg-gray-50 dark:bg-gray-900">
                <span className="loading loading-spinner loading-lg text-[#59ba4a]"></span>
            </div>
        );
    }

    const platformStats = [
        {
            label: "Total Workers",
            val: stats.workerCount,
            icon: <FaUsers />,
            color: "bg-blue-50 text-blue-500",
        },
        {
            label: "Total Buyers",
            val: stats.buyerCount,
            icon: <FaUserTie />,
            color: "bg-purple-50 text-purple-500",
        },
        {
            label: "Available Coins",
            val: stats.coinCount?.toLocaleString(),
            icon: <FaCoins />,
            color: "bg-yellow-50 text-yellow-600",
        },
        {
            label: "Total Payments",
            val: `$${stats.paymentCount?.toLocaleString()}`,
            icon: <FaMoneyCheckAlt />,
            color: "bg-green-50 text-[#59ba4a]",
        },
    ];

    return (
        <div className="p-4 lg:p-10 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                        Admin <span className="text-[#59ba4a]">Overview</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
                        Platform-wide statistics and request management.
                    </p>
                </div>

                {/* Platform Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {platformStats.map((s, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-5 hover:shadow-md transition-all"
                        >
                            <div
                                className={`p-4 rounded-2xl text-2xl ${s.color} dark:bg-opacity-10`}
                            >
                                {s.icon}
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
                                    {s.label}
                                </p>
                                <p className="text-2xl font-black text-gray-900 dark:text-white leading-none">
                                    {s.val}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Withdrawal Queue Section */}
                <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="p-8 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">
                                Withdrawal Requests
                            </h3>
                            <p className="text-xs text-gray-400 font-bold uppercase mt-1">
                                Pending Approval Queue
                            </p>
                        </div>
                        <div className="badge bg-orange-50 text-orange-600 border-none font-black px-4 py-4">
                            {
                                withdraw.filter((w) => w.status !== "approved")
                                    .length
                            }{" "}
                            Active Requests
                        </div>
                    </div>

                    <div className="overflow-x-auto w-[300px]">
                        <table className="table table-zebra w-full">
                            <thead className="bg-gray-50 dark:bg-gray-750 border-none">
                                <tr className="text-gray-400 uppercase text-[10px] tracking-widest">
                                    <th className="py-6 pl-8">Worker</th>
                                    <th className="hidden lg:table-cell">
                                        Coins
                                    </th>
                                    <th>Amount</th>
                                    <th className="hidden lg:table-cell">
                                        Date
                                    </th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center pr-8">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700 dark:text-gray-200">
                                {withdraw.length > 0 ? (
                                    withdraw.map((w) => (
                                        <tr
                                            key={w._id}
                                            className="hover:bg-green-50/30 dark:hover:bg-green-900/10 transition-colors border-gray-50 dark:border-gray-700"
                                        >
                                            <td className="pl-8">
                                                <div className="font-bold text-gray-900 dark:text-white">
                                                    {w.worker_name}
                                                </div>
                                                <div className="text-[10px] text-gray-400">
                                                    {w.worker_email}
                                                </div>
                                            </td>
                                            <td className="hidden lg:table-cell">
                                                <div className="flex items-center gap-1 font-bold">
                                                    <FaCoins className="text-yellow-500 text-xs" />{" "}
                                                    {w.withdrawal_coin}
                                                </div>
                                            </td>
                                            <td>
                                                <span className="font-black text-lg text-gray-900 dark:text-white">
                                                    ${w.withdrawal_amount}
                                                </span>
                                            </td>
                                            <td className="hidden lg:table-cell text-xs text-gray-400 font-medium">
                                                {w.withdraw_date}
                                            </td>
                                            <td className="text-center">
                                                {w.status === "approved" ? (
                                                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-[10px] font-black uppercase border border-green-200 dark:border-green-800">
                                                        <FaCheckCircle />{" "}
                                                        Approved
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-[10px] font-black uppercase border border-amber-200 dark:border-amber-800">
                                                        <FaClock /> Pending
                                                    </div>
                                                )}
                                            </td>
                                            <td className="text-center pr-8">
                                                <button
                                                    disabled={
                                                        w.status === "approved"
                                                    }
                                                    onClick={() =>
                                                        handleWithdraw(
                                                            w._id,
                                                            w.worker_email,
                                                            w.withdrawal_coin,
                                                            w.status,
                                                            w.worker_name,
                                                        )
                                                    }
                                                    className={`btn btn-sm h-10 px-6 rounded-xl font-bold border-none transition-all active:scale-95 ${
                                                        w.status === "approved"
                                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                            : "bg-[#59ba4a] text-white hover:bg-[#4a9d3e] shadow-lg shadow-green-100 dark:shadow-none"
                                                    }`}
                                                >
                                                    Approve
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="py-20 text-center"
                                        >
                                            <FaExclamationTriangle className="mx-auto text-gray-200 dark:text-gray-700 text-6xl mb-4" />
                                            <p className="text-gray-400 font-bold italic">
                                                No withdrawal requests found.
                                            </p>
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

export default AdminHome;
