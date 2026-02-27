import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { GrUserManager, GrUserWorker } from "react-icons/gr";
import { MdPayment, MdInsights } from "react-icons/md";
import { FaCoins } from "react-icons/fa";
import {
    PieChart,
    Pie,
    Legend,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

const OverView = () => {
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
                const [countRes, coinRes, paymentRes] = await Promise.all([
                    axiosSecure.get("/wcCount"),
                    axiosSecure.get("/wcSum"),
                    axiosSecure.get("/totalPayment"),
                ]);

                setStats({
                    workerCount: countRes.data.workerCount,
                    buyerCount: countRes.data.buyerCount,
                    coinCount: coinRes.data.total,
                    paymentCount: paymentRes.data.total,
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching admin analytics:", error);
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [axiosSecure]);

    if (loading) {
        return (
            <div className="h-96 w-full flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-[#59ba4a]"></span>
            </div>
        );
    }

    const chartData = [
        { name: "Buyers", value: stats.buyerCount },
        { name: "Workers", value: stats.workerCount },
    ];

    // Professional Chart Colors
    const COLORS = ["#59ba4a", "#3b82f6"];

    const statCards = [
        {
            label: "Total Buyers",
            val: stats.buyerCount,
            icon: <GrUserManager />,
            color: "text-purple-500",
            bg: "bg-purple-50 dark:bg-purple-900/10",
        },
        {
            label: "Total Workers",
            val: stats.workerCount,
            icon: <GrUserWorker />,
            color: "text-blue-500",
            bg: "bg-blue-50 dark:bg-blue-900/10",
        },
        {
            label: "Total Coins",
            val: stats.coinCount?.toLocaleString(),
            icon: <FaCoins />,
            color: "text-yellow-600",
            bg: "bg-yellow-50 dark:bg-yellow-900/10",
        },
        {
            label: "Total Revenue",
            val: `$${stats.paymentCount?.toLocaleString()}`,
            icon: <MdPayment />,
            color: "text-[#59ba4a]",
            bg: "bg-green-50 dark:bg-green-900/10",
        },
    ];

    return (
        <div className="p-4 lg:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Header Area */}
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <MdInsights className="text-[#59ba4a]" /> Platform{" "}
                        <span className="text-[#59ba4a]">Analytics</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Real-time overview of platform growth and financial
                        health.
                    </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {statCards.map((s, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all group"
                        >
                            <div
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 ${s.bg} ${s.color} transition-transform group-hover:scale-110`}
                            >
                                {s.icon}
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
                                    {s.label}
                                </p>
                                <p className="text-3xl font-black text-gray-900 dark:text-white">
                                    {s.val}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* User Distribution Pie Chart */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700">
                        <div className="mb-6">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-wider">
                                User Distribution
                            </h3>
                            <p className="text-xs text-gray-400 font-bold">
                                Buyer vs. Worker Ratio
                            </p>
                        </div>

                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        innerRadius={80}
                                        outerRadius={120}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: "16px",
                                            border: "none",
                                            boxShadow:
                                                "0 10px 15px -3px rgba(0,0,0,0.1)",
                                        }}
                                    />
                                    <Legend
                                        iconType="circle"
                                        verticalAlign="bottom"
                                        height={36}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Summary Card / Growth Info */}
                    <div className="bg-gradient-to-br from-[#59ba4a] to-emerald-700 p-10 rounded-[2.5rem] shadow-xl text-white flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-black mb-2 italic">
                                Platform Health
                            </h3>
                            <p className="opacity-80 text-sm leading-relaxed">
                                Your platform currently supports a healthy
                                ecosystem of{" "}
                                <strong>
                                    {stats.workerCount + stats.buyerCount}
                                </strong>{" "}
                                registered users. The total circulating economy
                                stands at{" "}
                                <strong>{stats.coinCount} coins</strong>.
                            </p>
                        </div>

                        <div className="mt-8 space-y-4">
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                                <span className="text-xs font-bold uppercase tracking-widest">
                                    Growth Index
                                </span>
                                <span className="text-xl font-black">
                                    Active
                                </span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                                <span className="text-xs font-bold uppercase tracking-widest">
                                    System Status
                                </span>
                                <span className="text-xl font-black">
                                    Secure
                                </span>
                            </div>
                        </div>

                        <button className="mt-10 w-full py-4 bg-white text-[#59ba4a] font-black rounded-2xl shadow-lg hover:bg-gray-50 transition-all active:scale-95">
                            Generate Detailed Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverView;
