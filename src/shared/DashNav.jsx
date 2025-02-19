import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useUser from "../hooks/useUser";
import logo from "../assets/Logo/logo.png";
import { FaAddressBook, FaCoins } from "react-icons/fa";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaHandHoldingDollar } from "react-icons/fa6";

const DashNav = (props) => {
    const [data, refetch, isPending] = useUser();
    const [notifications, setNotifications] = useState([]);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
        const [isDark, setIsDark] = useState(
            document.documentElement.classList.contains("dark")
        );
    // if (isPending) {
    //     return <p>loading....</p>;
    // }
    // console.log(data);
    const location = useLocation();
    // console.log(location.pathname);

    const fetchNotifications = async () => {
        const res = await axiosSecure.get(
            `/notifications?route=${location.pathname}&email=${data.email}`
        );
        return res.data;
    };

    const { data: note } = useQuery({
        queryKey: ["notifications", location.pathname, data?.email], // Ensure `data` refers to your props/state, not from useQuery
        queryFn: fetchNotifications,
        enabled: !!data?.email,
    });
    useEffect(() => {
        if (note) {
            setNotifications(note);
        }
    }, [note]);

    const links = (
        <>
            <li>
                <Link
                    className="font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                    to={"/"}
                >
                    Home
                </Link>
            </li>
            <li>
                <a
                    className="font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                >
                    {data?.name}
                </a>
            </li>

            <li>
                <a
                    className="font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                >
                    {data?.role}
                </a>
            </li>
            <li>
                <a
                    className="font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                >
                    <FaCoins></FaCoins>({data?.coin})
                </a>
            </li>
        </>
    );
    const handleDarkMode = () => {
        document.documentElement.classList.toggle("dark");
        setIsDark((prev) => !prev);
    };
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
                <a className="btn btn-ghost text-primary md:text-xl">
                    <span>
                        <FaHandHoldingDollar></FaHandHoldingDollar>
                    </span>
                    <span className="hidden md:block">GigFlow</span>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            <div className="navbar-end gap-4">
                {/* {links} */}
                <a>
                    <img
                        className="w-9 h-9 rounded-full "
                        src={data?.image}
                        alt=""
                    />
                </a>
                <a className=" text-2xl">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1 bg-primary text-background">
                            <IoIosNotificationsOutline></IoIosNotificationsOutline>
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                        >
                            {notifications?.map((n, idx) => (
                                <li key={n._id}>
                                    <a>
                                        {idx + 1}. {n.message}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </a>
                <button
                    onClick={handleDarkMode}
                    className="btn bg-primary text-background"
                >
                    {isDark ? "Light Mode" : "Dark Mode"}
                </button>
            </div>
        </div>
    );
};

DashNav.propTypes = {};

export default DashNav;
