import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminUser = (props) => {
    const [users, setUsers] = useState();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosSecure.get("/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching withdrawals:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleRole = (role, urole, uid) => {
        if (role === urole) {
            alert(
                `The User is already ${urole}.please select another role to change`
            );
            return;
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(
                    `/updateRole?id=${uid}&role=${role}`
                );
                // console.log(res)
                if (res.data.modifiedCount) {
                    Swal.fire({
                        title: "Role Changed Successfully",
                        text: "Role changed to " + role,
                        icon: "success",
                        confirmButtonText: "Okay",
                    });
                }
            }
        });
    };
    // console.log(users);

    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/deleteUser/${id}`);
                // console.log(res)
                if (res.data.deletedCount) {
                    Swal.fire({
                        title: "User deleted Successfully",
                        text: "User deleted from the system",
                        icon: "success",
                        confirmButtonText: "Okay",
                    });
                    const updatedUser = users.filter(
                        (user) => user._id !== id
                    );
                    setUsers(updatedUser);
                }
            }
        });
    };
    return (
        <div>
            <h2>Admin User</h2>
            <div className="">
                <div className="overflow-x-auto">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Favorite Color</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user) => (
                                    <tr key={user._id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={user.image}
                                                            alt="Avatar Tailwind CSS Component"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-sm opacity-50">
                                                        {user.role}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.coin}</td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    handleDeleteUser(user._id)
                                                }
                                                className="btn btn-error"
                                            >
                                                <MdDelete></MdDelete>
                                            </button>
                                        </td>
                                        <th>
                                            <button className="">
                                                <div className="dropdown">
                                                    <div
                                                        tabIndex={0}
                                                        role="button"
                                                        className="btn m-1"
                                                    >
                                                        {user.role}
                                                    </div>
                                                    <ul
                                                        tabIndex={0}
                                                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                                                    >
                                                        <li
                                                            onClick={() =>
                                                                handleRole(
                                                                    "Worker",
                                                                    user.role,
                                                                    user._id
                                                                )
                                                            }
                                                        >
                                                            <a>Worker</a>
                                                        </li>
                                                        <li
                                                            onClick={() =>
                                                                handleRole(
                                                                    "Buyer",
                                                                    user.role,
                                                                    user._id
                                                                )
                                                            }
                                                        >
                                                            <a>Buyer</a>
                                                        </li>
                                                        <li
                                                            onClick={() =>
                                                                handleRole(
                                                                    "Admin",
                                                                    user.role,
                                                                    user._id
                                                                )
                                                            }
                                                        >
                                                            <a>Admin</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </button>
                                        </th>
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

AdminUser.propTypes = {};

export default AdminUser;
