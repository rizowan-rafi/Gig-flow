import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useUser from "../../../hooks/useUser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
    MdOutlineAssignment,
    MdOutlineDescription,
    MdGroups,
    MdAttachMoney,
    MdCalendarToday,
    MdInfoOutline,
    MdCloudUpload,
} from "react-icons/md";

const image_hosting_key = import.meta.env.VITE_Image_Upload_Token;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const BuyerAddTask = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [user, refetch] = useUser();
    const [loading, setLoading] = React.useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();

    // Live calculation of total cost
    const watchWorkers = watch("workerNumber", 0);
    const watchPayment = watch("payableAmount", 0);
    const totalCost =
        (parseInt(watchWorkers) || 0) * (parseInt(watchPayment) || 0);

    const onSubmit = async (data) => {
        if (totalCost > user?.coin) {
            Swal.fire({
                icon: "error",
                title: "Insufficient Balance",
                text: `This task costs ${totalCost} coins, but you only have ${user?.coin}.`,
                footer: '<a href="/dashboard/Buyer/Checkout" style="color: #59ba4a">Purchase more coins?</a>',
            });
            return;
        }

        try {
            setLoading(true);
            // Hosting image to ImgBB
            const imageFile = { image: data.buyerImage[0] };
            const response = await axios.post(image_hosting_api, imageFile, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.success) {
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

                const coinUpdate = {
                    email: user.email,
                    coin: user.coin - totalCost,
                };

                const result = await axiosSecure.post("/tasks", task);
                if (result?.data?.insertedId) {
                    const res = await axiosSecure.patch("/coins", coinUpdate);
                    if (res?.data?.modifiedCount) {
                        refetch();
                        Swal.fire(
                            "Success!",
                            "Your task is now live!",
                            "success",
                        );
                        reset();
                        setLoading(false);
                        navigate("/dashboard/Buyer/home");
                    }
                }
            }
        } catch (error) {
            Swal.fire(
                "Error",
                "Failed to create task. Please try again.",
                "error",
            );
        }finally {
            setLoading(false);
        }
    };

   if (loading) {
       return (
           <div className="h-screen w-full flex justify-center items-center bg-gray-50 dark:bg-gray-900">
               <span className="loading loading-spinner loading-lg text-[#59ba4a]"></span>
               <span>Adding task...</span>

           </div>
       );
   }

    return (
        <div className="p-4 lg:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-5xl mx-auto">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white">
                            Create a{" "}
                            <span className="text-[#59ba4a]">New Task</span>
                        </h2>
                        <p className="text-gray-500 mt-1 italic">
                            Empower the community by providing quality
                            opportunities.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                            <MdAttachMoney className="text-[#59ba4a] text-xl" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase">
                                Your Balance
                            </p>
                            <p className="text-xl font-black text-gray-900 dark:text-white">
                                {user?.coin}{" "}
                                <span className="text-xs text-gray-400">
                                    Coins
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Task Content */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                                    <MdOutlineAssignment className="text-[#59ba4a]" />{" "}
                                    Task Information
                                </h3>

                                <div className="space-y-4">
                                    <div className="form-control">
                                        <label className="label-text font-bold mb-2 block dark:text-gray-300">
                                            Task Title
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Subscribe to my Youtube Channel"
                                            className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
                                            {...register("taskTitle", {
                                                required: true,
                                            })}
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label-text font-bold mb-2 block dark:text-gray-300">
                                            Detailed Instructions
                                        </label>
                                        <textarea
                                            placeholder="Explain the steps clearly for the worker..."
                                            className="textarea textarea-bordered h-44 bg-gray-50 dark:bg-gray-700 text-base"
                                            {...register("taskDetail", {
                                                required: true,
                                            })}
                                        ></textarea>
                                    </div>

                                    <div className="form-control">
                                        <label className="label-text font-bold mb-2 block dark:text-gray-300">
                                            Submission Requirements
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="What proof should the worker submit? (e.g. Screenshot)"
                                            className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
                                            {...register("submitInfo", {
                                                required: true,
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Logistics & Summary */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                                    <MdGroups className="text-[#59ba4a]" />{" "}
                                    Logistics
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="label-text font-bold mb-2 block dark:text-gray-300 text-xs uppercase tracking-wider">
                                            Number of Workers
                                        </label>
                                        <input
                                            type="number"
                                            className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
                                            {...register("workerNumber", {
                                                required: true,
                                                min: 1,
                                            })}
                                        />
                                    </div>

                                    <div>
                                        <label className="label-text font-bold mb-2 block dark:text-gray-300 text-xs uppercase tracking-wider">
                                            Coin Per Worker
                                        </label>
                                        <input
                                            type="number"
                                            className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
                                            {...register("payableAmount", {
                                                required: true,
                                                min: 1,
                                            })}
                                        />
                                    </div>

                                    <div>
                                        <label className="label-text font-bold mb-2 block dark:text-gray-300 text-xs uppercase tracking-wider">
                                            Deadline
                                        </label>
                                        <input
                                            type="date"
                                            className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
                                            {...register("deadline", {
                                                required: true,
                                            })}
                                        />
                                    </div>

                                    <div className="pt-4 border-t dark:border-gray-700">
                                        <label className="label-text font-bold mb-2 block dark:text-gray-300 text-xs uppercase tracking-wider">
                                            Reference Image
                                        </label>
                                        <input
                                            type="file"
                                            className="file-input file-input-bordered file-input-success w-full dark:bg-gray-700 text-sm"
                                            {...register("buyerImage", {
                                                required: true,
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Summary Card */}
                            <div className="bg-green-50 dark:bg-green-900/10 p-8 rounded-3xl border border-green-100 dark:border-green-800">
                                <p className="text-xs font-black text-green-600 dark:text-green-400 uppercase mb-2 tracking-widest">
                                    Budget Summary
                                </p>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {watchWorkers || 0} slots ×{" "}
                                            {watchPayment || 0} coins
                                        </p>
                                        <p className="text-3xl font-black text-gray-900 dark:text-white">
                                            {totalCost.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 font-bold uppercase">
                                            Total Coins
                                        </p>
                                    </div>
                                </div>
                                <button className="btn w-full mt-6 bg-[#59ba4a] hover:bg-[#4a9d3e] text-white border-none h-14 rounded-2xl shadow-lg transition-all active:scale-95">
                                    <MdCloudUpload className="text-xl" /> Create
                                    Task Now
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BuyerAddTask;
