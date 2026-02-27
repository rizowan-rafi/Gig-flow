import React, { useEffect, useState } from "react";
import {
    MdDelete,
    MdUpdate,
    MdOutlineTaskAlt,
    MdGroups,
    MdAttachMoney,
    MdEventBusy,
} from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BuyerTaskList = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure
            .get(`/tasks/${user?.email}`)
            .then((response) => {
                setTasks(response.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [axiosSecure, user?.email]);

    const handleUpdate = async (e, id) => {
        e.preventDefault();
        const form = e.target;
        const updateTask = {
            title: form.title.value,
            task_detail: form.task_detail.value,
            submission_detail: form.submission_detail.value,
        };

        const res = await axiosSecure.patch(`/taskUpdate/${id}`, updateTask);
        if (res.data.modifiedCount) {
            Swal.fire({
                title: "Updated!",
                text: "Task details saved successfully.",
                icon: "success",
                confirmButtonColor: "#59ba4a",
            });
            setTasks(
                tasks.map((t) =>
                    t._id === id
                        ? {
                              ...t,
                              title: updateTask.title,
                              detail: updateTask.task_detail,
                              submitInfo: updateTask.submission_detail,
                          }
                        : t,
                ),
            );
            document.getElementById(`my_modal_${id}`).close();
        }
    };

    const handleDelete = async (id, worker, payment, title, email) => {
        const result = await Swal.fire({
            title: "Delete Task?",
            text: "You will be refunded for uncompleted slots.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            const countCoin = parseInt(worker * payment);
            const res = await axiosSecure.delete(`/taskDelete/${id}`);
            if (res.data.deletedCount) {
                // Refund logic (assuming it stays as per your original requirement)
                await axiosSecure.patch(`/coins`, {
                    email,
                    coin_to_add: countCoin,
                });

                Swal.fire(
                    "Deleted!",
                    "Task has been removed and coins refunded.",
                    "success",
                );
                setTasks(tasks.filter((t) => t._id !== id));
            }
        }
    };

    if (loading) {
        return (
            <div className="h-96 flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-[#59ba4a]"></span>
            </div>
        );
    }

    return (
        <div className="p-4 lg:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        My Active <span className="text-[#59ba4a]">Tasks</span>
                        <div className="badge badge-lg bg-[#59ba4a] text-white border-none">
                            {tasks.length}
                        </div>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Manage and update your posted opportunities.
                    </p>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className="bg-gray-50 dark:bg-gray-750">
                            <tr className="text-gray-400 uppercase text-xs tracking-widest border-none">
                                <th className="py-5 pl-8">#</th>
                                <th>Task Title</th>
                                <th className="hidden lg:table-cell">
                                    Pay/Worker
                                </th>
                                <th className="hidden lg:table-cell">
                                    Required
                                </th>
                                <th className="hidden lg:table-cell">
                                    Deadline
                                </th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 dark:text-gray-200">
                            {tasks.length > 0 ? (
                                tasks.map((task, idx) => (
                                    <tr
                                        key={task._id}
                                        className="hover:bg-green-50/30 dark:hover:bg-green-900/10 transition-colors"
                                    >
                                        <th className="pl-8 text-gray-300 font-medium">
                                            {idx + 1}
                                        </th>
                                        <td>
                                            <div className="font-bold text-gray-900 dark:text-white">
                                                {task.title}
                                            </div>
                                            <div className="text-xs text-gray-400 truncate max-w-xs lg:hidden">
                                                {task.detail}
                                            </div>
                                        </td>
                                        <td className="hidden lg:table-cell">
                                            <div className="flex items-center gap-1 font-black text-[#59ba4a]">
                                                <MdAttachMoney />
                                                {task.payment}
                                            </div>
                                        </td>
                                        <td className="hidden lg:table-cell">
                                            <div className="flex items-center gap-2">
                                                <MdGroups className="text-gray-400" />{" "}
                                                {task.required_worker}
                                            </div>
                                        </td>
                                        <td className="hidden lg:table-cell text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <MdEventBusy /> {task.deadline}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex justify-center gap-2">
                                                {/* Update Trigger */}
                                                <button
                                                    onClick={() =>
                                                        document
                                                            .getElementById(
                                                                `my_modal_${task._id}`,
                                                            )
                                                            .showModal()
                                                    }
                                                    className="btn btn-sm btn-square bg-green-50 text-[#59ba4a] border-none hover:bg-[#59ba4a] hover:text-white transition-all"
                                                >
                                                    <MdUpdate size={18} />
                                                </button>

                                                {/* Delete Trigger */}
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            task._id,
                                                            task.required_worker,
                                                            task.payment,
                                                            task.title,
                                                            task.buyer_email,
                                                        )
                                                    }
                                                    className="btn btn-sm btn-square bg-red-50 text-red-500 border-none hover:bg-red-500 hover:text-white transition-all"
                                                >
                                                    <MdDelete size={18} />
                                                </button>
                                            </div>

                                            {/* Refined Modal */}
                                            <dialog
                                                id={`my_modal_${task._id}`}
                                                className="modal modal-bottom sm:modal-middle"
                                            >
                                                <div className="modal-box dark:bg-gray-800 rounded-3xl p-8">
                                                    <h3 className="font-black text-2xl text-gray-900 dark:text-white mb-6">
                                                        Update{" "}
                                                        <span className="text-[#59ba4a]">
                                                            Task
                                                        </span>
                                                    </h3>
                                                    <form
                                                        onSubmit={(e) =>
                                                            handleUpdate(
                                                                e,
                                                                task._id,
                                                            )
                                                        }
                                                        className="space-y-4"
                                                    >
                                                        <div className="form-control">
                                                            <label className="label uppercase text-[10px] font-bold text-gray-400">
                                                                Task Title
                                                            </label>
                                                            <input
                                                                name="title"
                                                                type="text"
                                                                defaultValue={
                                                                    task.title
                                                                }
                                                                className="input input-bordered focus:border-[#59ba4a] dark:bg-gray-700"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="form-control">
                                                            <label className="label uppercase text-[10px] font-bold text-gray-400">
                                                                Task Details
                                                            </label>
                                                            <textarea
                                                                name="task_detail"
                                                                defaultValue={
                                                                    task.detail
                                                                }
                                                                className="textarea textarea-bordered h-24 dark:bg-gray-700"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="form-control">
                                                            <label className="label uppercase text-[10px] font-bold text-gray-400">
                                                                Submission
                                                                Requirements
                                                            </label>
                                                            <input
                                                                name="submission_detail"
                                                                defaultValue={
                                                                    task.submitInfo
                                                                }
                                                                className="input input-bordered dark:bg-gray-700"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="modal-action gap-3">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    document
                                                                        .getElementById(
                                                                            `my_modal_${task._id}`,
                                                                        )
                                                                        .close()
                                                                }
                                                                className="btn rounded-xl px-8 border-none bg-gray-100 text-gray-500"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                className="btn bg-[#59ba4a] text-white border-none rounded-xl px-8 hover:bg-[#4a9d3e]"
                                                            >
                                                                Save Changes
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </dialog>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="py-20 text-center"
                                    >
                                        <div className="flex flex-col items-center opacity-30">
                                            <MdOutlineTaskAlt size={80} />
                                            <p className="mt-4 font-bold italic">
                                                No active tasks found in your
                                                dashboard.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BuyerTaskList;
