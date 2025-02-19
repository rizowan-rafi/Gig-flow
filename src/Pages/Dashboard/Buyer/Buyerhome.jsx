import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth"
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Buyerhome = (props) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [taskNumbers, setTaskNumbers] = useState(0);
    const [totalWorkers, setTotalWorkers] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [totalSubmission, setTotalSubmission] = useState([]);
    const [wcoins, setWcoins] = useState(0);
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure.get(`/taskCount/${user.email}`).then((response) => {
            setTaskNumbers(response.data.count);
        });
        axiosSecure.get(`/workersCount/${user.email}`).then((response) => {
            setTotalWorkers(response.data.total);
        });

        axiosSecure.get(`/paymentsCount/${user.email}`).then((response) => {
            setTotalPayment(response.data.total);
        });
        axiosSecure.get(`/submissionBuyer/${user.email}`).then((response) => {
            const updateSubmission = response.data.filter(
                (t) => t.status === "pending"
            );
            setTotalSubmission(updateSubmission);
            setLoading(false);
        });
    }, []);

       if (loading) {
           return (
               <div className="h-screen w-screen flex justify-center items-center">
                   <span className="loading loading-spinner loading-lg  text-success"></span>
               </div>
           );
       }

    const handleApproval = async (id, wemail, wcoin1, s,ss) => {
        const status = await axiosSecure.patch(`/submissionStatus/${id}`, {
            status: "approved",
        });

        const getW = await axiosSecure.get(`/users/${wemail}`);
        const wcoin = await axiosSecure.patch(`/coins`, {
            email: wemail,
            coin: getW.data.coin + wcoin1,
        });

        if (status.data.modifiedCount && wcoin.data.modifiedCount) {
            const note = {
                message: `Task ${s} has been approved form ${user.displayName} to ${ss}`,
                time: new Date().toISOString().split("T")[0],
                toEmail: wemail,
                fromEmail: user.email,
                actionRoute: "/dashboard/Worker/home",
            };
            const res = await axiosSecure.post("/notifications", note);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "center",
                    title: "Task Approved",
                    text: "Payment Received",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }

        // const wwc = {
        //     email: wemail,

        // }
        // const wcoin = await axiosSecure.patch('/coins')
    };

    const handleReject = async (id, wemail, wcoin11, tid, s,ss) => {
        const status = await axiosSecure.patch(`/submissionStatus/${id}`, {
            status: "rejected",
        });

        const task = await axiosSecure.get(`/task/${tid}`);
        const taskworker = await axiosSecure.patch(`/task/${tid}`, {
            required_worker: task.data.required_worker + 1,
        });

        if (status.data.modifiedCount && taskworker.data.modifiedCount) {
            const note = {
                message: `Task ${s} has been rejected form ${user.displayName} to ${ss}`,
                time: new Date().toISOString().split("T")[0],

                toEmail: wemail,
                fromEmail: user.email,
                actionRoute: "/dashboard/Worker/home",
            };
            const res = await axiosSecure.post("/notifications", note);
            if (res.data.insertedId) {
                
                Swal.fire({
                    position: "center",
                    title: "Task Rejected",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    };

    // console.log(totalSubmission)
    return (
        <div className="">
            {/* state */}
            <div className="flex  w-3/4 lg:w-full mx-auto justify-center items-center mt-5">
                <div className="stats justify-center bg-secondary  items-center place-items-center  w-full lg:w-3/4   stats-vertical lg:stats-horizontal shadow">
                    <div className="stat">
                        <div className="stat-title  ">total task</div>
                        <div className="stat-value">{taskNumbers}</div>
                        {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                    </div>

                    <div className="stat">
                        <div className="stat-title">pending Task</div>
                        <div className="stat-value">{totalWorkers}</div>
                        {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
                    </div>

                    <div className="stat">
                        <div className="stat-title">total payment</div>
                        <div className="stat-value">{totalPayment}</div>
                        {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                    </div>
                </div>
            </div>

            <div>
                <div className="overflow-x-auto w-full mt-10">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="text-text dark:text-background">
                            <tr>
                                <th></th>
                                <th className="hidden lg:table-cell">
                                    Worker Name
                                </th>
                                <th className="">Task Title</th>
                                <th className="hidden lg:table-cell">
                                    Payable Amount
                                </th>
                                <th className="hidden lg:table-cell">status</th>
                                <th>View Detail</th>
                                <th>Approve</th>
                                <th>Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {totalSubmission.map((s, idx) => (
                                <tr key={s._id}>
                                    <th>{idx + 1}</th>
                                    <td className="hidden lg:table-cell">
                                        {s.worker_name}
                                    </td>
                                    <td className="hidden lg:table-cell">
                                        {s.task_title}
                                    </td>
                                    <td className="hidden lg:table-cell">
                                        {s.payable_amount}
                                    </td>
                                    <td className="hidden lg:table-cell">
                                        <button className="badge ">
                                            {s.status}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "my_modal_1"
                                                    )
                                                    .showModal()
                                            }
                                            className="btn btn-info btn-sm"
                                        >
                                            <FcViewDetails></FcViewDetails>
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            onClick={() =>
                                                handleApproval(
                                                    s._id,
                                                    s.worker_email,
                                                    s.payable_amount,
                                                    s.task_title,
                                                    s.worker_name
                                                )
                                            }
                                            className="btn btn-success btn-sm"
                                        >
                                            <FaThumbsUp></FaThumbsUp>
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                handleReject(
                                                    s._id,
                                                    s.worker_email,
                                                    s.payable_amount,
                                                    s.task_id,
                                                    s.task_title,
                                                    s.worker_name
                                                );
                                            }}
                                            className="btn btn-error btn-sm"
                                        >
                                            <FaThumbsDown></FaThumbsDown>
                                        </button>
                                    </td>
                                    {/* modal code  */}
                                    <dialog id="my_modal_1" className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">
                                                {s.task_title}
                                            </h3>
                                            <p className="py-4">
                                                {s.submission_details}
                                            </p>
                                            <div className="modal-action">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn">
                                                        Close
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

Buyerhome.propTypes = {};

export default Buyerhome;
