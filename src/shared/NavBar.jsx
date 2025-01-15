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
const NavBar = (props) => {
    const [coin, Setcoin] = useState(0);
    const axiosPublic = useAxiosPublic();
    const { user, loading, signOutUser } = useAuth();
    // Show loading until the user data is available

    useEffect(() => {
        if (!loading && user?.email) {
            axiosPublic
                .get(`/users/${user.email}`)
                .then((response) => {
                    Setcoin(response.data.coin);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, [user?.email, axiosPublic]);
    // const response = axiosPublic.get(`/users/${user.email}`).then(user => {
    //     Setcoin(user.data.coin)
    // })
    // if (isPending) return "Loading...";

    const links = user ? (
        <>
            <li>
                <NavLink
                    to={"/"}
                    className="font-semibold text-[#ff5851] text-[16px]"
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={"/dashboard"}
                    className="font-semibold text-[#ff5851] text-[16px]"
                >
                    DashBoard
                </NavLink>
            </li>
            <li>
                <Link className="font-semibold text-[#ff5851] text-[16px] hello">
                    <FaCoins></FaCoins>({coin})
                </Link>
            </li>
        </>
    ) : (
        <>
            <li>
                <NavLink
                    to={"/"}
                    className="font-semibold text-[#ff5851] text-[16px]"
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={"/know"}
                    className="font-semibold text-[#ff5851] text-[16px] hello"
                >
                    Item 3
                </NavLink>
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
    return (
        <div className="navbar bg-base-100  lg:px-16 mx-auto">
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
                <a className="btn btn-ghost md:text-xl">
                    <img src={logo} alt="" />{" "}
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
                        src={user.photoURL}
                        alt=""
                    />
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline text-[#ff5851] hover:bg-[#ff5851] hover:text-white hover:border-[#ff5851] "
                    >
                        Logout
                    </button>
                    <a className="btn btn-outline text-[#ff5851] hover:bg-[#ff5851] hover:text-white hover:border-[#ff5851] ">
                        Join as <br />
                        Developer{" "}
                    </a>
                </div>
            ) : (
                <div className="navbar-end gap-3">
                    <Link
                        to={"/login"}
                        className="btn btn-outline text-[#ff5851] hover:bg-[#ff5851] hover:text-white hover:border-[#ff5851] "
                    >
                        Login
                    </Link>
                    <Link
                        to={"/register"}
                        className="btn btn-outline text-[#ff5851] hover:bg-[#ff5851] hover:text-white hover:border-[#ff5851] "
                    >
                        SignUp
                    </Link>
                    <a className="btn btn-outline text-[#ff5851] hover:bg-[#ff5851] hover:text-white hover:border-[#ff5851] ">
                        Join as <br />
                        Developer{" "}
                    </a>
                </div>
            )}
        </div>
    );
};

NavBar.propTypes = {};

export default NavBar;
