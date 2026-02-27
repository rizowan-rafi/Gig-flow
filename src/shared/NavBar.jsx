import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCoins, FaSun, FaMoon } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import Swal from "sweetalert2";

const NavBar = () => {
    const { user, loading, signOutUser } = useAuth();
    const [data, refetch, isPending] = useUser();

    // Initialize theme from localStorage or system preference
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches),
    );

    // Apply the theme class to the document element
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    if (isPending || loading) {
        return (
            <div className="h-20 w-full flex justify-center items-center">
                <span className="loading loading-dots text-success"></span>
            </div>
        );
    }

    const handleLogout = () => {
        signOutUser().then(() => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Logged out successfully",
                showConfirmButton: false,
                timer: 1500,
            });
        });
    };

    const activeLink =
        "text-[#59ba4a] font-bold border-b-2 border-[#59ba4a] pb-1";
    const normalLink =
        "text-gray-600 dark:text-gray-300 font-semibold hover:text-[#59ba4a] transition-colors duration-200";

    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                    }
                >
                    Home
                </NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink
                            to={`/dashboard/${data?.role}/home`}
                            className={({ isActive }) =>
                                isActive ? activeLink : normalLink
                            }
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/alltasks"
                            className={({ isActive }) =>
                                isActive ? activeLink : normalLink
                            }
                        >
                            All Tasks
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <nav className="sticky top-0 z-[100] w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300 ">
            <div className="navbar max-w-7xl mx-auto lg:px-6 ">
                {/* Brand Logo */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden p-1 mr-2 text-[#59ba4a]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-white dark:bg-gray-800 rounded-2xl w-64 space-y-3"
                        >
                            {navLinks}
                        </ul>
                    </div>

                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-[#59ba4a] p-2 rounded-xl text-white shadow-lg shadow-green-200 dark:shadow-none group-hover:scale-110 transition-transform">
                            <FaHandHoldingDollar size={20} />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white hidden md:block">
                            Gig<span className="text-[#59ba4a]">Flow</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Links */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex items-center gap-8 px-1">{navLinks}</ul>
                </div>

                {/* Action Area */}
                <div className="navbar-end gap-2 md:gap-4">
                    {/* Dark Mode Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="btn btn-ghost btn-circle text-xl text-gray-600 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? <FaSun /> : <FaMoon />}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full border border-green-100 dark:border-green-800">
                                <FaCoins className="text-[#59ba4a]" />
                                <span className="font-bold text-[#59ba4a]">
                                    {data?.coin?.toLocaleString()}
                                </span>
                            </div>

                            <Link
                                to={`/dashboard/${data?.role}/profile`}
                                className="avatar online"
                            >
                                <div className="w-10 h-10 rounded-full border-2 border-[#59ba4a] hover:ring-4 ring-green-100 transition-all">
                                    <img
                                        src={data?.image}
                                        alt="User Profile"
                                        className="object-cover"
                                    />
                                </div>
                            </Link>

                            <button
                                onClick={handleLogout}
                                className=" px-5 py-2.5 bg-gray-900 dark:bg-white dark:text-gray-900 text-white text-xs font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-95"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/login"
                                className="px-5 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-[#59ba4a] transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-6 py-2.5 bg-[#59ba4a] text-white whitespace-nowrap text-sm font-bold rounded-xl shadow-lg shadow-green-100 dark:shadow-none hover:bg-[#4a9d3e] transition-all active:scale-95"
                            >
                                Join Now
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
