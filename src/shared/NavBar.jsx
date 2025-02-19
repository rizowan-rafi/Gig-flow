import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import logo from "../assets/Logo/logo.png";
import { Link, NavLink } from "react-router-dom";
import "./shared.css";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { FaCoins } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useUser from "../hooks/useUser";
import { FaHandHoldingDollar } from "react-icons/fa6";
const NavBar = (props) => {
    const axiosPublic = useAxiosPublic();
    const { user, loading, signOutUser } = useAuth();
    // Show loading until the user data is available
    const [data, refetch, isPending] = useUser();
    // const [coin, setCoin] = useState(data?.coin);
    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains("dark")
    );
    
    if (isPending || loading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg  text-success"></span>
            </div>
        );
    }


    // console.log(data);
    // Setcoin(data.coin)


    const links = user ? (
        <>
            <li>
                <Link
                    to={"/"}
                    className="font-semibold text-primary hover:bg-primary hover:text-teal-50 text-[16px]"
                >
                    Home
                </Link>
            </li>
            <li>
                <Link
                    to={`/dashboard/${data?.role}/home`}
                    className="font-semibold text-primary hover:bg-primary hover:text-teal-50 text-[16px]"
                >
                    DashBoard
                </Link>
            </li>
            <li>
                <Link
                    to={`/alltasks`}
                    className="font-semibold text-primary hover:bg-primary hover:text-teal-50 text-[16px]"
                >
                    AllTasks
                </Link>
            </li>
            <li>
                <Link className="font-semibold text-primary hover:bg-primary hover:text-teal-50 text-[16px] hello">
                    <FaCoins></FaCoins>({data?.coin})
                </Link>
            </li>
            <li>
                <Link
                    to={`/dashboard/${data?.role}/profile`}
                    className="font-semibold text-primary hover:bg-primary hover:text-teal-50 text-[16px] hello"
                >
                    Profile
                </Link>
            </li>
            <li>
                <a
                    href="#faq"
                    className="font-semibold text-primary text-[16px] hover:bg-primary hover:text-teal-50"
                >
                    Faq
                </a>
            </li>
            <li>
                <a
                    href="#test"
                    className="font-semibold text-primary text-[16px] hover:bg-primary hover:text-teal-50"
                >
                    Reviews
                </a>
            </li>
        </>
    ) : (
        <>
            <li>
                <Link
                    to={"/"}
                    className="font-semibold text-primary hover:bg-primary hover:text-teal-50 text-[16px]"
                >
                    Home
                </Link>
            </li>
            <li>
                <a
                    href="#faq"
                    className="font-semibold text-primary text-[16px] hover:bg-primary hover:text-teal-50"
                >
                    Faq
                </a>
            </li>
            <li>
                <a
                    href="#test"
                    className="font-semibold text-primary text-[16px] hover:bg-primary hover:text-teal-50"
                >
                    Reviews
                </a>
            </li>
        </>
    );

    const handleLogout = () => {
        signOutUser().then(() => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Logout completed",
                showConfirmButton: false,
                timer: 1500,
            });
        });
    };

    const handleDarkMode = () => { 
        document.documentElement.classList.toggle('dark')
        setIsDark((prev) => !prev);
    }
    return (
        <div className="navbar bg-opacity-60 bg-background dark:bg-text  lg:px-16 mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost md:text-xl text-primary">
                    <span>
                        <FaHandHoldingDollar></FaHandHoldingDollar>
                    </span>
                    <span className="hidden md:block">GigFlow</span>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            {user ? (
                <div className="navbar-end gap-3">
                    <img
                        className="w-[40px] h-[40px] rounded-full"
                        src={data?.image}
                        alt=""
                    />
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline text-primary hover:bg-primary hover:text-white hover:border-primary "
                    >
                        Logout
                    </button>
                    <a
                        href="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-isagi299"
                        className="btn btn-outline text-primary hover:bg-primary hover:text-white hover:border-primary "
                    >
                        Join as <br />
                        Developer{" "}
                    </a>
                    <button
                        onClick={handleDarkMode}
                        className="btn bg-primary text-background"
                    >
                        {isDark ? "Light Mode" : "Dark Mode"}
                    </button>
                </div>
            ) : (
                <div className="navbar-end gap-3">
                    <Link
                        to={"/login"}
                        className="btn btn-outline  text-primary hover:bg-primary hover:text-white hover:border-primary "
                    >
                        Login
                    </Link>
                    <Link
                        to={"/register"}
                        className="btn btn-outline text-primary hover:bg-primary hover:text-white hover:border-primary "
                    >
                        SignUp
                    </Link>
                    <a className="btn btn-outline text-primary hover:bg-primary hover:text-white hover:border-primary ">
                        Join as <br />
                        Developer{" "}
                    </a>
                    <button
                        onClick={handleDarkMode}
                        className="btn bg-primary text-background"
                    >
                        {isDark ? "Light Mode" : "Dark Mode"}
                    </button>
                </div>
            )}
        </div>
    );
};

NavBar.propTypes = {};

export default NavBar;
