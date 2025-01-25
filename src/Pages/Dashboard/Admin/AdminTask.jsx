import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminTask = (props) => {
    const [tasks, setTasks] = useState();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axiosSecure.get("/tasks");
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching withdrawals:", error);
            }
        };
        fetchTasks();
    }, []);
    // console.log(tasks);
    const handleDeleteTask = async (taskId) => {
        try {
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
                    const deleteTask = await axiosSecure.delete(`/tasks/${taskId}`);
            if (deleteTask.data.deletedCount) {
                Swal.fire({
                    position: "center",
                    title: "Task Deleted Successfully",
                    text: "The task has been deleted",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                })
            }
            const updatedTasks = tasks.filter((task) => task._id!== taskId);
            setTasks(updatedTasks);
                }
            });

        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };
    return (
        <div>
            <div className="">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th className="">Task Detail</th>
                            <th className="hidden lg:table-cell">Submission Info</th>
                            <th className="hidden lg:table-cell">payment(each)</th>
                            <th className="hidden lg:table-cell">required worker</th>
                            <th className="hidden lg:table-cell">deadline</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks?.map((task, idx) => (
                            <tr key={task._id}>
                                <th>{idx + 1}</th>
                                <td>{task.title}</td>
                                <td>{task.detail}</td>
                                <td className="hidden lg:table-cell">{task.submitInfo}</td>
                                <td className="hidden lg:table-cell">{task.payment}</td>
                                <td className="hidden lg:table-cell">{task.required_worker}</td>
                                <td className="hidden lg:table-cell">{task.deadline}</td>

                                <td>
                                    <button onClick={()=>handleDeleteTask(task._id)} className="btn text-xl btn-error">
                                        <MdDelete></MdDelete>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

AdminTask.propTypes = {};

export default AdminTask;
