import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaHistory, FaReceipt, FaClock, FaDollarSign } from "react-icons/fa";

const PaymentHistory = () => {
    const [payment, setPayment] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure
            .get("/payments")
            .then((response) => {
                setPayment(response.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
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
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="p-4 bg-[#59ba4a] text-white rounded-2xl shadow-lg">
                        <FaHistory size={24} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white leading-none">
                            Payment{" "}
                            <span className="text-[#59ba4a]">History</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                            Keep track of all your coin purchases and
                            transactions.
                        </p>
                    </div>
                </div>

                {/* Table Card Container */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="w-[95%] mx-auto lg:w-full overflow-x-auto">
                        <table className="table w-full table-zebra">
                            {/* Table Head */}
                            <thead className="bg-gray-50 dark:bg-gray-750">
                                <tr className="text-gray-400 dark:text-gray-500 uppercase text-xs tracking-widest border-none">
                                    <th className="py-5 pl-8">#</th>
                                    <th>
                                        <div className="flex items-center gap-2">
                                            <FaReceipt /> Transaction ID
                                        </div>
                                    </th>
                                    <th>
                                        <div className="flex items-center gap-2">
                                            <FaDollarSign /> Amount
                                        </div>
                                    </th>
                                    <th className="hidden lg:table-cell">
                                        <div className="flex items-center gap-2">
                                            <FaClock /> Date
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="text-gray-700 dark:text-gray-200">
                                {payment.length > 0 ? (
                                    payment.map((item, index) => (
                                        <tr
                                            key={item.TranId}
                                            className="border-gray-50 dark:border-gray-700 hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-colors"
                                        >
                                            <th className="pl-8 font-medium text-gray-400">
                                                {index + 1}
                                            </th>
                                            <td className="font-mono text-sm text-[#59ba4a] font-bold">
                                                {item.TranId}
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-1">
                                                    <span className="font-black text-lg text-gray-900 dark:text-white">
                                                        ${item.amount}
                                                    </span>
                                                    <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-600 px-2 py-0.5 rounded-full font-bold">
                                                        SUCCESS
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="hidden lg:table-cell text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(
                                                    item.createdAt,
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="py-20 text-center"
                                        >
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="text-gray-200 dark:text-gray-700">
                                                    <FaReceipt size={60} />
                                                </div>
                                                <p className="text-gray-400 italic">
                                                    No payment history found
                                                    yet.
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

export default PaymentHistory;
