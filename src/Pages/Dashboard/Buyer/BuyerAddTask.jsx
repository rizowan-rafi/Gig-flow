import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_Image_Upload_Token;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const BuyerAddTask = (props) => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    // const { user } = useAuth();
    const [user, refetch] = useUser();
    // console.log(user);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const onSubmit = async (data) => {
        const payableAmount =
            parseInt(data.workerNumber) * parseInt(data.payableAmount);
        if (payableAmount > user?.coin) {
            alert("Not enough coin to create task");
            navigate("/dashboard/Buyer/Checkout");
            return;
        }
        const image = { image: data.buyerImage[0] };
        const response = await axios.post(image_hosting_api, image, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        const task = {
            title: data.taskTitle,
            detail: data.taskDetail,
            required_worker: parseInt(data.workerNumber),
            payment: parseInt(data.payableAmount),
            image: response.data.data.display_url,
            deadline: data.deadline,
            buyer_name: user.name,
            buyer_email: user.email,
            buyer_id: user._id,
            submitInfo: data.submitInfo,
        };

        const coin = {
            email: user.email,
            coin: user.coin - payableAmount,
        };


        

        const result = await axiosSecure.post("/tasks", task);
        if (result?.data?.insertedId) {
            const res = await axiosSecure.patch("/coins", coin)
            // console.log(res.data)
            if (res?.data?.modifiedCount) {
                refetch()
                Swal.fire({
                    position: "center",
                    title: "Task Created Successfully",
                    text: "Your task has been submitted successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                })
                reset();
            }
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-text dark:text-background">Task Title</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Task Title"
                        className="input input-bordered"
                        required
                        {...register("taskTitle", { required: true })}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-text dark:text-background">Task Detail</span>
                    </label>
                    <textarea
                        {...register("taskDetail", { required: true })}
                        placeholder="Task Detail"
                        id=""
                        className="resize-none h-40 input input-bordered p-3"
                    ></textarea>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-text dark:text-background">Required Worker</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Required Worker"
                        className="input input-bordered"
                        required
                        {...register("workerNumber", { required: true })}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-text dark:text-background">Payable Amount</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Payable Amount"
                        className="input input-bordered"
                        required
                        {...register("payableAmount", { required: true })}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-text dark:text-background">Completion Data</span>
                    </label>
                    <input
                        type="date"
                        placeholder="Completion Data"
                        className="input input-bordered"
                        required
                        {...register("deadline", { required: true })}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-text dark:text-background">Submit Info</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Submit Information"
                        className="input input-bordered"
                        required
                        {...register("submitInfo", { required: true })}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-text dark:text-background">Image URL</span>
                    </label>
                    <input
                        type="file"
                        className="file-input file-input-bordered file-input-success w-full  max-w-xs"
                        required
                        {...register("buyerImage", { required: true })}
                    />
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary bg-accent text-background">Add Task</button>
                </div>
            </form>
        </div>
    );
};

BuyerAddTask.propTypes = {};

export default BuyerAddTask;
