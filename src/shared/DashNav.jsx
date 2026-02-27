import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCoins, FaMoon, FaSun } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useUser from "../hooks/useUser";

const DashNav = () => {
    const [data] = useUser();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains("dark"),
    );

    const { data: notifications = [] } = useQuery({
        queryKey: ["notifications", location.pathname, data?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/notifications?route=${location.pathname}&email=${data.email}`,
            );
            return res.data;
        },
        enabled: !!data?.email,
    });

    const handleDarkMode = () => {
        document.documentElement.classList.toggle("dark");
        setIsDark(!isDark);
    };

    return (
        <nav className="sticky top-0 z-[50] w-full bg-white/70 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 transition-all ">
            <div className="navbar max-w-[1600px] mx-auto lg:px-10">
                {/* Brand Section */}
                <div className="navbar-start">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-[#59ba4a] p-2 rounded-xl text-white shadow-lg group-hover:rotate-12 transition-transform">
                            <FaHandHoldingDollar size={20} />
                        </div>
                        <span className="text-xl font-black text-gray-900 dark:text-white hidden sm:block">
                            Gig<span className="text-[#59ba4a]">Flow</span>
                        </span>
                    </Link>
                </div>

                {/* Center: Essential Navigation */}
                <div className="navbar-center hidden md:flex">
                    <ul className="flex items-center gap-6">
                        <li>
                            <Link
                                to="/"
                                className="text-sm font-bold text-gray-500 hover:text-[#59ba4a] transition-colors uppercase tracking-widest"
                            >
                                Home
                            </Link>
                        </li>
                        <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-700"></div>
                        <li className="flex items-center gap-2">
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 uppercase">
                                {data?.role}
                            </span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                                {data?.name}
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Right: Actions & User Info */}
                <div className="navbar-end gap-2 md:gap-5">
                    {/* Coin Balance Pill */}
                    <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full border border-green-100 dark:border-green-800">
                        <FaCoins className="text-[#59ba4a] animate-bounce" />
                        <span className="font-bold text-[#59ba4a] text-sm md:text-base">
                            {data?.coin?.toLocaleString() || 0}
                        </span>
                    </div>

                    {/* Notifications */}
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle bg-gray-50 dark:bg-gray-800 border-none"
                        >
                            <div className="indicator">
                                <IoIosNotificationsOutline
                                    size={26}
                                    className="text-gray-600 dark:text-gray-300"
                                />
                                {notifications.length > 0 && (
                                    <span className="badge badge-xs badge-primary indicator-item ring-2 ring-white dark:ring-gray-900"></span>
                                )}
                            </div>

                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu p-4 shadow-2xl bg-white dark:bg-gray-800 rounded-2xl w-72 mt-4 border border-gray-100 dark:border-gray-700"
                        >
                            <h3 className="font-black text-xs uppercase text-gray-400 mb-3 px-2">
                                Recent Notifications
                            </h3>
                            {notifications.length > 0 ? (
                                notifications.slice(0, 5).map((n, idx) => (
                                    <li
                                        key={n._id}
                                        className="border-b border-gray-50 dark:border-gray-700 last:border-none"
                                    >
                                        <a className="py-3 px-2 text-sm leading-tight hover:bg-[#59ba4a]/10">
                                            <span className="font-bold text-[#59ba4a] mr-2">
                                                {idx + 1}.
                                            </span>
                                            {n.message}
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <p className="text-center text-xs py-4 text-gray-400 italic">
                                    No new notifications
                                </p>
                            )}
                        </ul>
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={handleDarkMode}
                        className="btn btn-ghost btn-circle bg-gray-50 dark:bg-gray-800 border-none text-gray-600 dark:text-yellow-400 transition-all hover:scale-110"
                    >
                        {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
                    </button>

                    {/* Profile Avatar */}
                    <Link
                        to={`/dashboard/${data?.role}/profile`}
                        className="avatar"
                    >
                        <div className="w-10 h-10 rounded-2xl ring-2 ring-[#59ba4a] ring-offset-2 ring-offset-white dark:ring-offset-gray-900 overflow-hidden">
                            <img
                                src={data?.image}
                                alt="User"
                                className="object-cover"
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default DashNav;
