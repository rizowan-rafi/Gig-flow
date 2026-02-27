import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaTasks, FaUser, FaUserTie } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";

const Acknowledge = () => {
    const axiosPublic = useAxiosPublic();
    const [stats, setStats] = useState({
        totalUser: 0,
        totalWorkers: 0,
        totalBuyers: 0,
        totalTask: 0,
    });

    useEffect(() => {
        // Optimized to handle multiple requests cleanly
        const fetchStats = async () => {
            try {
                const [userRes, wcRes, taskRes] = await Promise.all([
                    axiosPublic.get("/userCount"),
                    axiosPublic.get("/wcCount"),
                    axiosPublic.get("/taskCount"),
                ]);

                setStats({
                    totalUser: userRes.data.userCount,
                    totalWorkers: wcRes.data.workerCount,
                    totalBuyers: wcRes.data.buyerCount,
                    totalTask: taskRes.data.taskCount,
                });
            } catch (err) {
                console.error("Error fetching stats:", err);
            }
        };
        fetchStats();
    }, [axiosPublic]);

    const statItems = [
        {
            label: "Total Users",
            value: stats.totalUser,
            icon: <FaUser />,
            desc: "Diverse community of users with varying interests.",
            color: "bg-blue-50 text-blue-600",
        },
        {
            label: "Total Workers",
            value: stats.totalWorkers,
            icon: <GrUserWorker />,
            desc: "Experienced workers ready to handle your tasks.",
            color: "bg-green-50 text-green-600",
        },
        {
            label: "Total Buyers",
            value: stats.totalBuyers,
            icon: <FaUserTie />,
            desc: "Active buyers looking for the perfect results.",
            color: "bg-purple-50 text-purple-600",
        },
        {
            label: "Total Tasks",
            value: stats.totalTask,
            icon: <FaTasks />,
            desc: "Vast selection of tasks to build your portfolio.",
            color: "bg-orange-50 text-orange-600",
        },
    ];

    return (
        <section className="py-24 px-6 lg:px-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                    Our Impact in{" "}
                    <span className="text-[#59ba4a]">Numbers</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Empowering Earners, Connecting Buyers – A Thriving
                    Micro-Earning Community!
                </p>
                <div className="w-20 h-1.5 bg-[#59ba4a] mx-auto mt-6 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {statItems.map((item, idx) => (
                    <div
                        key={idx}
                        className="group p-8 bg-gray-50 dark:bg-gray-800 rounded-3xl border border-transparent hover:border-[#59ba4a] hover:bg-white dark:hover:bg-gray-750 transition-all duration-300 shadow-sm hover:shadow-xl text-center"
                    >
                        <div
                            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 text-3xl transition-transform duration-500 group-hover:rotate-[360deg] ${item.color} dark:bg-opacity-10`}
                        >
                            {item.icon}
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-4xl font-black text-gray-900 dark:text-white">
                                {item.value.toLocaleString()}
                            </h3>
                            <p className="text-sm font-bold uppercase tracking-widest text-[#59ba4a]">
                                {item.label}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed pt-2">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Acknowledge;
