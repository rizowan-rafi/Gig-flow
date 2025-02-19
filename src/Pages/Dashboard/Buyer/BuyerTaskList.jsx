import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MdDelete, MdUpdate } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BuyerTaskList = (props) => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure
            .get(`/tasks/${user?.email}`)
            .then((response) => {
                setTasks(response.data);
                setLoading(false);
            })
            .catch((error) => {
                // console.log(error);
            });
    }, []);
    if (loading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg  text-success"></span>
            </div>
        );
    }

    // console.log(tasks);
    const handleUpdate = async (e, id, title1, tdetail, sdetail) => {
        e.preventDefault();
        // console.log(id);
        const title = e.target.title.value || title1;
        const task_detail = e.target.task_detail.value || tdetail;
        const submission_detail = e.target.submission_detail.value || sdetail;

        const updateTask = { title, task_detail, submission_detail };
        // console.log(updateTask);
        const taskUpdate = await axiosSecure.patch(
            `/taskUpdate/${id}`,
            updateTask
        );
        if (taskUpdate.data.modifiedCount) {
            Swal.fire({
                title: "Task Updated Successfully",
                text: "Task updated successfully!",
                icon: "success",
                confirmButtonText: "Okay",
            });
            // document.getElementById("close").click();

            e.target.reset();
        }
    };

    const handleDelete = async (id, worker, payment, title, email) => {
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
                const countCoin = parseInt(worker * payment);

                const res = await axiosSecure.delete(`/taskDelete/${id}`);
                if (res.data.deletedCount) {
                    const sdata = await axiosSecure.get(`/TaskSubmit/${title}`);
                    // console.log(sdata.data.status)
                    if (
                        sdata.data.status !== "approved" ||
                        sdata.data.status === undefined
                    ) {
                        const sUser = await axiosSecure.get(`/users/${email}`);
                        const coin = await axiosSecure.patch(`/coins`, {
                            email: email,
                            coin: sUser.data.coin + countCoin,
                        });
                    }
                    Swal.fire({
                        title: "Task deleted Successfully",
                        text: "Task deleted from the system",
                        icon: "success",
                        confirmButtonText: "Okay",
                    });
                    setTasks(tasks.filter((t) => t._id !== id));
                }
            }
        });
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table text-text dark:text-background">
                    {/* head */}
                    <thead>
                        <tr className="dark:text-background text-text">
                            <th className="hidden lg:table-cell"></th>
                            <th>Title</th>
                            <th className="hidden lg:table-cell">
                                Task Detail
                            </th>
                            <th className="hidden lg:table-cell">
                                Submission Info
                            </th>

                            <th className="hidden lg:table-cell">
                                payment(each)
                            </th>
                            <th className="hidden lg:table-cell">
                                required worker
                            </th>
                            <th className="hidden lg:table-cell">deadline</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks?.map((task, idx) => (
                            <tr key={task._id}>
                                <th className="hidden lg:table-cell">
                                    {idx + 1}
                                </th>
                                <td>{task.title}</td>
                                <td className="hidden lg:table-cell">
                                    {task.detail}
                                </td>
                                <td className="hidden lg:table-cell">
                                    {task.submitInfo}
                                </td>

                                <td className="hidden lg:table-cell">
                                    {task.payment}
                                </td>
                                <td className="hidden lg:table-cell">
                                    {task.required_worker}
                                </td>
                                <td className="hidden lg:table-cell">
                                    {task.deadline}
                                </td>
                                <td
                                    onClick={() =>
                                        document
                                            .getElementById(`my_modal_${idx}`)
                                            .showModal()
                                    }
                                    className=""
                                >
                                    <button
                                        // onClick={handleUpdate}
                                        className="btn text-xl btn-success"
                                    >
                                        <MdUpdate></MdUpdate>
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                task._id,
                                                task.required_worker,
                                                task.payment,
                                                task.title,
                                                task.buyer_email
                                            )
                                        }
                                        className="btn text-xl btn-error"
                                    >
                                        <MdDelete></MdDelete>
                                    </button>
                                </td>
                                <dialog
                                    id={`my_modal_${idx}`}
                                    className="modal"
                                >
                                    <div className="modal-box">
                                        <h3 className="font-bold text-lg">
                                            Update Task
                                        </h3>

                                        <div className="modal-action card bg-base-100 w-full max-w-sm shrink-0 ">
                                            <form
                                                onSubmit={() =>
                                                    handleUpdate(
                                                        event,
                                                        task._id,
                                                        task.title,
                                                        task.detail,
                                                        task.submitInfo
                                                    )
                                                }
                                                method="dialog w-full"
                                            >
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">
                                                            Title
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Task Title"
                                                        className="input input-bordered"
                                                        name="title"
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">
                                                            Task Detail
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Task Detail"
                                                        className="input input-bordered"
                                                        name="task_detail"
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">
                                                            Submission Detail
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Submission Detail"
                                                        className="input input-bordered"
                                                        name="submission_detail"
                                                    />
                                                </div>
                                                {/* if there is a button in form, it will close the modal */}
                                                <button
                                                    type="submit"
                                                    className="btn mt-3 w-full my-3"
                                                >
                                                    Update Info
                                                </button>
                                            </form>
                                            <button
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            `my_modal_${idx}`
                                                        )
                                                        .close()
                                                }
                                                className="btn"
                                                id="close"
                                            >
                                                Close{" "}
                                            </button>
                                        </div>
                                    </div>
                                </dialog>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

BuyerTaskList.propTypes = {};

export default BuyerTaskList;
