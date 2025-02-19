import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DashNav from "../shared/DashNav";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import useUser from "../hooks/useUser";
import Footer from "../shared/Footer";

const DashBoard = (props) => {
    const [data, isPending, error] = useUser();
    // console.log(data?.coin);

    return (
        <div className="bg-background">
            <nav className="">
                <DashNav></DashNav>
            </nav>
            <main className="flex gap-10 dark:bg-text">
                <aside className="z-10">
                    <div className="sidebar-menu ">
                        <div className="drawer lg:drawer-open ">
                            <input
                                id="my-drawer-2"
                                type="checkbox"
                                className="drawer-toggle"
                            />
                            <div className="drawer-content">
                                {/* Page content here */}
                                <label
                                    htmlFor="my-drawer-2"
                                    className="btn text-xl drawer-button lg:hidden"
                                >
                                    <IoIosMenu></IoIosMenu>
                                </label>
                            </div>
                            <div className="drawer-side top-16 ">
                                <label
                                    htmlFor="my-drawer-2"
                                    aria-label="close sidebar"
                                    className="drawer-overlay "
                                ></label>

                                {data?.role === "Buyer" ? (
                                    <ul className="menu dark:bg-text  text-base-content   min-h-full lg:w-52 p-4">
                                        {/* Sidebar content here */}
                                        <li>
                                            <NavLink
                                                className="hover:font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                                                to={`/dashboard/${data?.role}/home`}
                                            >
                                                Home
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="hover:font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                                                to={`/dashboard/overview`}
                                            >
                                                Overview
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="hover:font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                                                to={`/dashboard/${data?.role}/profile`}
                                            >
                                                Profile
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="hover:font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                                                to={`/dashboard/${data?.role}/AddTask`}
                                            >
                                                Add new Tasks
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="hover:font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                                                to={`/dashboard/${data?.role}/TaskLists`}
                                            >
                                                My Task’s{" "}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="hover:font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                                                to={`/dashboard/${data?.role}/Checkout`}
                                            >
                                                Purchase Coin{" "}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="hover:font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                                                to={`/dashboard/${data?.role}/PaymentHistory`}
                                            >
                                                Payment history{" "}
                                            </NavLink>
                                        </li>
                                    </ul>
                                ) : data?.role === "Worker" ? (
                                    <ul className="menu dark:bg-text bg-base-200  text-base-content   min-h-full lg:w-52 p-4">
                                        {/* Sidebar content here */}
                                        <li>
                                            <NavLink
                                                className="hover:font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                                                to={`/dashboard/${data?.role}/home`}
                                            >
                                                Home
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="hover:font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                                                to={`/dashboard/overview`}
                                            >
                                                Overview
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="hover:font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                                                to={`/dashboard/${data?.role}/profile`}
                                            >
                                                Profile
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="hover:font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                                                to={`/dashboard/${data?.role}/taskList`}
                                            >
                                                TaskLists
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="hover:font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                                                to={`/dashboard/${data?.role}/submission`}
                                            >
                                                My Submissions{" "}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="hover:font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                                                to={`/dashboard/Worker/withdraws`}
                                            >
                                                withdrawals
                                            </NavLink>
                                        </li>
                                    </ul>
                                ) : data?.role === "Admin" ? (
                                    <ul className="menu dark:bg-text bg-base-200  text-base-content   min-h-full lg:w-52 p-4">
                                        {/* Sidebar content here */}
                                        <li>
                                            <NavLink
                                                className="hover:font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                                                to={"/dashboard/Admin/home"}
                                            >
                                                Home
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="hover:font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                                                to={`/dashboard/overview`}
                                            >
                                                Overview
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="hover:font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                                                to={`/dashboard/${data?.role}/profile`}
                                            >
                                                Profile
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="hover:font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                                                to={"/dashboard/Admin/users"}
                                            >
                                                Manage User
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                className="hover:font-semibold text-primary hover:bg-primary
                    hover:text-teal-50 text-[16px]"
                                                to={"/dashboard/Admin/tasks"}
                                            >
                                                Manage Task
                                            </NavLink>
                                        </li>
                                    </ul>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </aside>
                <aside className="flex-1 dark:bg-text">
                    <Outlet></Outlet>
                </aside>
            </main>
        </div>
    );
};

DashBoard.propTypes = {};

export default DashBoard;
