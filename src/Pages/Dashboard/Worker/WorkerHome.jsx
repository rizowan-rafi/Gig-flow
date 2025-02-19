import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FcViewDetails } from "react-icons/fc";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const WorkerHome = (props) => {
    const [taskCount, setTaskCount] = useState(0);
    const [taskPendingCount, setTaskPendingCount] = useState(0);
    const [totalEarn, setTotalEarn] = useState();
    const [taskApprovedCount, setTaskApprovedCount] = useState([]);
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    useEffect(() => {
        const taskC = async () => { 
            const taskCC = await axiosSecure.get(`/subCount/${user.email}`);
            setTaskCount(taskCC.data.count);

            const taskPP = await axiosSecure.get(`/subPendingCount/${user.email}`);
            setTaskPendingCount(taskPP.data.count);

            const taskPayment = await axiosSecure.get(`/subPayment/${user.email}`);
            setTotalEarn(taskPayment.data.total);

            const taskApproved = await axiosSecure.get(`/subApproved/${user.email}`);
            setTaskApprovedCount(taskApproved.data);
            setLoading(false)
        }
        taskC();
    }, [])
        if (loading) {
            return (
                <div className="h-screen w-screen flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg  text-success"></span>
                </div>
            );
        }
    return (
        <div>
            {/* state */}
            <div className="flex w-full justify-center items-center mt-5">
                <div className="stats justify-center items-center place-items-center  w-full lg:w-3/4  stats-vertical lg:stats-horizontal shadow">
                    <div className="stat">
                        <div className="stat-title">total Submission</div>
                        <div className="stat-value">{ taskCount}</div>
                        {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                    </div>

                    <div className="stat">
                        <div className="stat-title">
                            Total Pending Submission
                        </div>
                        <div className="stat-value">{ taskPendingCount}</div>
                        {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total Earning</div>
                        <div className="stat-value">{ totalEarn}</div>
                        {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                    </div>
                </div>
            </div>

            <div>
                <div className="overflow-x-auto mt-10">
                    <table className="table dark:text-background ">
                        {/* head */}
                        <thead>
                            <tr className="dark:text-background">
                                <th></th>
                                <th>Buyer Name</th>
                                <th>Task Title</th>
                                <th>Payable Amount</th>
                                <th>status</th>
                                
                            </tr>

                          
                        </thead>
                        <tbody>
                            {
                                taskApprovedCount.map((task, index) => (
                                    <tr key={task._id}>
                                        <th>{index + 1}</th>
                                        <td>{task.buyer_name}</td>
                                        <td>{task.task_title}</td>
                                        <td>{task.payable_amount}</td>
                                        <td>
                                            <button className="badge badge-success">
                                                Approved
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

WorkerHome.propTypes = {};

export default WorkerHome;
