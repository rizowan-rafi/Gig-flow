import React, { useEffect, useState } from "react";
import { MdDelete, MdShield, MdPerson, MdGroups } from "react-icons/md";
import { FaCoins, FaChevronDown } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    const fetchUsers = async () => {
        try {
            const response = await axiosSecure.get("/users");
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [axiosSecure]);

    const handleRoleChange = (newRole, currentRole, uid) => {
        if (newRole === currentRole) {
            Swal.fire({
                title: "Invalid Change",
                text: `This user is already assigned the ${currentRole} role.`,
                icon: "info",
                confirmButtonColor: "#59ba4a",
            });
            return;
        }

        Swal.fire({
            title: "Update User Role?",
            text: `Change this user's permissions from ${currentRole} to ${newRole}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#59ba4a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update Role",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(
                    `/updateRole?id=${uid}&role=${newRole}`,
                );
                if (res.data.modifiedCount) {
                    Swal.fire(
                        "Success",
                        `User is now an ${newRole}`,
                        "success",
                    );
                    fetchUsers(); // Refresh data to show updated roles
                }
            }
        });
    };

    const handleDeleteUser = (id, name) => {
        Swal.fire({
            title: "Delete Account?",
            text: `Are you sure you want to permanently remove ${name}? This cannot be undone!`,
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete User",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/deleteUser/${id}`);
                if (res.data.deletedCount) {
                    Swal.fire(
                        "Deleted",
                        "User has been removed from the platform.",
                        "success",
                    );
                    setUsers(users.filter((user) => user._id !== id));
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex justify-center items-center bg-gray-50 dark:bg-gray-900">
                <span className="loading loading-spinner loading-lg text-[#59ba4a]"></span>
            </div>
        );
    }

    return (
        <div className="pl-4  py-4 lg:p-10 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto ">
                {/* Header Section */}
                <div className="flex w-[90%]   lg:w-full flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                            User{" "}
                            <span className="text-[#59ba4a]">Management</span>
                            <div className="badge badge-lg bg-[#59ba4a] text-white border-none font-bold">
                                {users.length} Users
                            </div>
                        </h2>
                        <p className="text-gray-500 w-full   dark:text-gray-400 mt-1">
                            Review permissions and manage platform members.
                        </p>
                    </div>
                </div>

                {/* User Table Card */}
                <div className="w-[90%]  bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="w-full  overflow-x-auto">
                        <table className="table w-full  ">
                            <thead className="bg-gray-50 dark:bg-gray-750 border-none">
                                <tr className="text-gray-400 uppercase text-[10px] tracking-widest">
                                    <th className="py-6 pl-8">User Identity</th>
                                    <th className="hidden md:table-cell text-center">
                                        Available Balance
                                    </th>
                                    <th className="text-center">
                                        Current Role
                                    </th>
                                    <th className="text-right pr-8">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700 dark:text-gray-200 ">
                                {users.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="hover:bg-green-50/30 dark:hover:bg-green-900/10 transition-colors border-gray-50 dark:border-gray-700"
                                    >
                                        <td className="lg:pl-8 ">
                                            <div className="flex items-center gap-4">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-6 h-6 lg:w-12 lg:h-12 ring-2 ring-[#59ba4a]/10 ring-offset-2 dark:ring-offset-gray-800">
                                                        <img
                                                            src={user.image}
                                                            alt={user.name}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-black  text-gray-900 dark:text-white">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-[10px]  font-bold text-gray-400 uppercase tracking-tighter">
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="hidden md:table-cell text-center">
                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-600">
                                                <FaCoins className="text-yellow-500" />
                                                <span className="font-black text-gray-900 dark:text-white">
                                                    {user.coin?.toLocaleString()}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="text-center">
                                            <div className="dropdown dropdown-bottom dropdown-end">
                                                <div
                                                    tabIndex={0}
                                                    role="button"
                                                    className="btn btn-sm h-10 px-4 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 rounded-xl hover:border-[#59ba4a] transition-all flex items-center gap-2"
                                                >
                                                    <span
                                                        className={`text-[10px] font-black uppercase ${user.role === "Admin" ? "text-purple-500" : "text-[#59ba4a]"}`}
                                                    >
                                                        {user.role}
                                                    </span>
                                                    <FaChevronDown
                                                        size={10}
                                                        className="text-gray-400"
                                                    />
                                                </div>
                                                <ul
                                                    tabIndex={0}
                                                    className="dropdown-content menu p-2 shadow-2xl bg-white dark:bg-gray-800 rounded-2xl w-40 z-[1] mt-2 border border-gray-100 dark:border-gray-700"
                                                >
                                                    <li
                                                        onClick={() =>
                                                            handleRoleChange(
                                                                "Worker",
                                                                user.role,
                                                                user._id,
                                                            )
                                                        }
                                                    >
                                                        <a className="font-bold text-xs">
                                                            <MdPerson className="text-blue-500" />{" "}
                                                            Worker
                                                        </a>
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            handleRoleChange(
                                                                "Buyer",
                                                                user.role,
                                                                user._id,
                                                            )
                                                        }
                                                    >
                                                        <a className="font-bold text-xs">
                                                            <MdGroups className="text-[#59ba4a]" />{" "}
                                                            Buyer
                                                        </a>
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            handleRoleChange(
                                                                "Admin",
                                                                user.role,
                                                                user._id,
                                                            )
                                                        }
                                                    >
                                                        <a className="font-bold text-xs">
                                                            <MdShield className="text-purple-500" />{" "}
                                                            Admin
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>

                                        <td className="text-right pr-8">
                                            <button
                                                onClick={() =>
                                                    handleDeleteUser(
                                                        user._id,
                                                        user.name,
                                                    )
                                                }
                                                className="btn btn-sm btn-square bg-red-50 text-red-500 border-none hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                            >
                                                <MdDelete size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUser;
