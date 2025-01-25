import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const WorkerTaskList = (props) => {
    const [taskList, setTaskList] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get("/taskslist").then((res) => setTaskList(res.data));
    }, []);
    // console.log(taskList);
    return (
        <div className="lg:grid space-y-3 lg:space-y-0 grid-cols-3 p-5 gap-4">
            {taskList.map((task) => (
                <div
                    key={task._id}
                    className="card bg-primary text-primary-content "
                >
                    <div className="card-body text-white bg-[#ff5851] rounded-xl">
                        <h2 className="card-title">Task Title : {task.title}</h2>
                        <p>Buyer Name: {task.buyer_email}</p>
                        <p>Deadline : {task.deadline}</p>
                        <p>required_worker: {task.required_worker}</p>
                        <p>Payment : {task.payment}</p>
                        <div className="card-actions justify-end">
                            <Link to={`/dashboard/Worker/taskDetail/${task._id}`}>
                                <button className="btn">View Detail</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

WorkerTaskList.propTypes = {};

export default WorkerTaskList;
