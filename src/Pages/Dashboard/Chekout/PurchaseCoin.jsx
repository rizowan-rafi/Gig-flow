import React from "react";
import { Link } from "react-router-dom";
import { FaCoins, FaCheckCircle, FaCrown } from "react-icons/fa";

const PurchaseCoin = () => {
    const plans = [
        { name: "Basic Plan", price: 1, coins: 10, popular: false },
        { name: "Standard Plan", price: 10, coins: 100, popular: true },
        { name: "Premium Plan", price: 20, coins: 200, popular: false },
        { name: "Elite Plan", price: 35, coins: 350, popular: false },
    ];

    return (
        <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen px-6">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
                    Top Up Your <span className="text-[#59ba4a]">Coins</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Select a plan that fits your needs and start posting tasks
                    today.
                </p>
            </div>

            {/* Pricing Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative flex flex-col p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                            plan.popular
                                ? "border-[#59ba4a] scale-105"
                                : "border-gray-100 dark:border-gray-700"
                        }`}
                    >
                        {/* Popular Badge */}
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#59ba4a] text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                                <FaCrown /> MOST POPULAR
                            </div>
                        )}

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                {plan.name}
                            </h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-gray-900 dark:text-white">
                                    ${plan.price}
                                </span>
                                <span className="text-gray-400 font-medium">
                                    /one-time
                                </span>
                            </div>
                        </div>

                        {/* Feature List */}
                        <ul className="space-y-4 mb-10 flex-grow">
                            <li className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                <FaCoins className="text-yellow-500" />
                                <span className="font-bold text-gray-900 dark:text-white">
                                    {plan.coins}
                                </span>{" "}
                                Total Coins
                            </li>
                            <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                                <FaCheckCircle className="text-[#59ba4a]" />{" "}
                                Instant Delivery
                            </li>
                            <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                                <FaCheckCircle className="text-[#59ba4a]" />{" "}
                                Secure Payment
                            </li>
                        </ul>

                        {/* Buy Button */}
                        <Link
                            to={"/dashboard/Buyer/Payment"}
                            state={{ coins: plan.price }}
                            className="w-full"
                        >
                            <button
                                className={`w-full py-4 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-md ${
                                    plan.popular
                                        ? "bg-[#59ba4a] text-white hover:bg-[#4a9d3e]"
                                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-[#59ba4a] hover:text-white"
                                }`}
                            >
                                Purchase Plan
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PurchaseCoin;
