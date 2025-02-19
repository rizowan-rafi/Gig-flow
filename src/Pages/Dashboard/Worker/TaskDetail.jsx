import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TaskDetail = (props) => {
    const { taskId } = useParams();
    const [task, setTask] = useState([]);
    const [data] = useUser();
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure
            .get(`/task/${taskId}`)
            .then((response) => {
                setTask(response.data);
            })
            .catch((error) => {
                console.error("Error fetching task:", error);
            });
    }, []);

    //  task_id, task_title,
    //payable_amount, worker_email, submission_details , worker_name , Buyer_name, Buyer_email,
    //current_date, and a status ( pending ).

    const handleSubmit = (e) => {
        e.preventDefault();
        const submissionDetail = e.target.submission.value;
        const submission = {
            task_id: task._id,
            task_title: task.title,
            payable_amount: task.payment,
            worker_email: data.email,
            submission_details: submissionDetail,
            worker_name: data.name,
            buyer_name: task.buyer_name || "anonymous",
            buyer_email: task.buyer_email,
            status: "pending",
            current_date: new Date().toISOString().split("T")[0],
        };

        axiosSecure.post("/submissions", submission).then((response) => {
            if (response.data.insertedId) {
                const notification = {
                    message: `new submission for ${task.title} by ${data.name} to ${task.buyer_name}`,
                    toEmail: task.buyer_email,
                    fromEmail: data.email,
                    time: new Date().toISOString().split("T")[0],
                    actionRoute: `/dashboard/Buyer/home`,
                };

                axiosSecure.post("/notifications", notification).then((res) => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Task Submitted Successfully",
                            text: "Your task submission has been submitted successfully.",
                            icon: "success",
                            confirmButtonText: "Okay",
                        });
                    }
                });
            }
        });
    };

    return (
        <div className="flex p-5 space-x-4">
            <div className="w-1/2 p-5 bg-primary rounded-xl">
                <h1 className="text-xl font-semibold text-white">Task Detail: {task.title}</h1>
                <p className="text-xl font-semibold text-white">Description: {task.detail}</p>
                <p className="text-xl font-semibold text-white">Buyer email: {task.buyer_email}</p>
                <p className="text-xl font-semibold text-white">Required Worker : {task.required_worker}</p>
                <p className="text-xl font-semibold text-white">payment : {task.payment}</p>
                <p className="text-xl font-semibold text-white">Deadline: {task.deadline}</p>
            </div>

            <div className="card  flex-1 bg-base-100 w-1/2 max-w-sm shrink-0 shadow-2xl">
                <form onSubmit={handleSubmit} className="card-body w-full">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl mb-3 text-primary">
                                submission_Details.
                            </span>
                        </label>
                        <textarea
                            className="input input-bordered p-2 h-32 resize-none"
                            name="submission"
                            id=""
                        ></textarea>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn  bg-primary text-white">Submission</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

TaskDetail.propTypes = {};

export default TaskDetail;
