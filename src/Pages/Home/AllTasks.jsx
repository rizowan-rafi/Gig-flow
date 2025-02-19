import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllTasks = (props) => {
    const axiosSecure = useAxiosSecure();
    const [tasks, setTasks] = useState();
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        axiosSecure.get("/tasks").then((response) => {
            setTasks(response.data);
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
    // console.log(tasks);
const handlePaymentSort = () => {
    const sortedTasks = [...tasks].sort((a, b) => b.payment - a.payment);
    setTasks(sortedTasks);
};
const handleWorkerSort = () => {
    const sortedTasks = [...tasks].sort(
        (a, b) => b.required_worker - a.required_worker
    );
    setTasks(sortedTasks);
};
    return (
        <div className="dark:bg-black">
            <h2 className="text-4xl font-bold text-primary p-10">AllTasks</h2>
            <div className="flex gap-3 justify-center items-center pb-10">
                <button onClick={handlePaymentSort} className="btn bg-primary text-background">Sort By Payment</button>
                <button onClick={handleWorkerSort} className="btn bg-primary text-background">Sort By Worker</button>
            </div>
            <div className="grid lg:grid-cols-3 w-[80%] mx-auto gap-5 pb-5">
                {tasks &&
                    tasks.map((task) => (
                        <div key={task._id}>
                            <div className="max-w-xs p-6 rounded-md shadow-md bg-primary text-background  dark:text-gray-900">
                                <img
                                    src={task.image}
                                    alt=""
                                    className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
                                />
                                <div className="mt-6 mb-2">
                                    
                                    <h2 className="text-xl font-semibold tracking-wide">
                                        {task.title}
                                    </h2>
                                </div>
                                <p className="dark:text-gray-800">
                                    {task.detail}
                                </p>
                                <p>
                                    <span className="font-bold">
                                        Required Worker :{" "}
                                    </span>
                                    {task.required_worker}
                                </p>
                                <p>
                                    <span className="font-bold">
                                        Payment :{" "}
                                    </span>
                                    {task.payment}
                                </p>
                                <p>
                                    <span className="font-bold">
                                        SubmitInfo :{" "}
                                    </span>
                                    {task.submitInfo}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

AllTasks.propTypes = {};

export default AllTasks;
