import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const BestWorker = () => {
    const [topWorker, setTopWorker] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic
            .get("/topWorker")
            .then((response) => setTopWorker(response.data))
            .catch((error) => console.error(error));
    }, [axiosPublic]);

    return (
        <div className="py-24 px-6 lg:px-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Section Header */}
            <div className="text-center mb-16">
                <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
                    Our <span className="text-[#59ba4a]">Top Earners</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Strive for the top and join the ranks of our best-performing
                    members!
                </p>
                <div className="w-24 h-1.5 bg-[#59ba4a] mx-auto mt-6 rounded-full"></div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {topWorker.map((worker, index) => (
                    <div
                        key={worker.email}
                        className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
                    >
                        {/* Ranking Badge */}
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#59ba4a] text-white rounded-full flex items-center justify-center font-bold shadow-lg border-4 border-white dark:border-gray-800">
                            #{index + 1}
                        </div>

                        {/* Avatar Section */}
                        <div className="flex flex-col items-center">
                            <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#59ba4a] to-green-200 mb-4">
                                <img
                                    className="w-24 h-24 object-cover rounded-full border-4 border-white dark:border-gray-800"
                                    src={worker.image}
                                    alt={worker.name}
                                />
                            </div>

                            {/* Info Section */}
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                    {worker.name}
                                </h3>
                                <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-6">
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
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    {worker.email}
                                </div>

                                {/* Coin Stat */}
                                <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/30 px-6 py-2 rounded-full border border-green-100 dark:border-green-800">
                                    <span className="text-2xl">💰</span>
                                    <span className="text-xl font-bold text-[#59ba4a]">
                                        {worker.coin.toLocaleString()}
                                    </span>
                                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                                        Coins
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestWorker;
