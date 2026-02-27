import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
    FaCoins,
    FaMoneyBillWave,
    FaCreditCard,
    FaUserAlt,
    FaExchangeAlt,
} from "react-icons/fa";

const WorkerWithdraw = () => {
    const axiosSecure = useAxiosSecure();
    const [data, refetch] = useUser();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            coinAmount: 0,
        },
    });

    // Real-time calculation based on 20 coins = $1
    const coinInput = watch("coinAmount", 0);
    const calculatedMoney = Math.floor(coinInput / 20);

    const onSubmit = async (withdrawData) => {
        const withdrawMoneyData = {
            worker_email: data?.email,
            worker_name: data?.name,
            withdrawal_coin: parseInt(withdrawData.coinAmount),
            withdrawal_amount: calculatedMoney,
            payment_system: withdrawData.paymentMethod,
            account_number: withdrawData.accountNumber,
            withdraw_date: new Date().toISOString(),
            status: "pending",
        };

        try {
            const response = await axiosSecure.post(
                "/withdraws",
                withdrawMoneyData,
            );
            if (response.data.insertedId) {
                Swal.fire({
                    title: "Request Submitted!",
                    text: "Your withdrawal is being processed by the admin.",
                    icon: "success",
                    confirmButtonColor: "#59ba4a",
                });
                refetch(); // Update current coin balance
            }
        } catch (error) {
            Swal.fire("Error", "Could not process request.", "error");
        }
    };

    return (
        <div className="p-4 lg:p-10 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                        Withdraw{" "}
                        <span className="text-[#59ba4a]">Earnings</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Convert your hard-earned coins into real money.
                    </p>
                </div>

                {/* Balance & Conversion Info Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-gradient-to-br from-[#59ba4a] to-emerald-600 p-8 rounded-3xl shadow-xl text-white">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                <FaCoins className="text-2xl" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest opacity-80">
                                Available Balance
                            </span>
                        </div>
                        <p className="text-4xl font-black mb-1">
                            {data?.coin?.toLocaleString() || 0}
                        </p>
                        <p className="text-sm opacity-90 font-medium">
                            Total Coins
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-200 mb-2">
                            <FaExchangeAlt className="text-[#59ba4a]" />
                            <span className="font-black uppercase text-xs tracking-widest">
                                Conversion Rate
                            </span>
                        </div>
                        <p className="text-2xl font-bold dark:text-white">
                            20 Coins ={" "}
                            <span className="text-[#59ba4a]">$1 USD</span>
                        </p>
                        <p className="text-xs text-red-500 font-bold mt-4 uppercase">
                            ⚠️ Minimum withdrawal: 200 coins ($10)
                        </p>
                    </div>
                </div>

                {/* Withdrawal Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Coin Amount Input */}
                        <div className="form-control">
                            <label className="label-text font-bold mb-3 block dark:text-gray-300">
                                Amount to Withdraw
                            </label>
                            <div className="relative">
                                <FaCoins className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="number"
                                    placeholder="Enter coins"
                                    className={`input input-bordered w-full pl-12 h-14 bg-gray-50 dark:bg-gray-700 focus:border-[#59ba4a] ${errors.coinAmount ? "border-red-500" : ""}`}
                                    {...register("coinAmount", {
                                        required: "Amount is required",
                                        min: {
                                            value: 200,
                                            message: "Min 200 coins required",
                                        },
                                        validate: (value) =>
                                            value <= data?.coin ||
                                            "Not enough coins available",
                                    })}
                                />
                            </div>
                            {errors.coinAmount && (
                                <span className="text-red-500 text-xs mt-2 font-bold italic">
                                    {errors.coinAmount.message}
                                </span>
                            )}
                        </div>

                        {/* Calculated Money Output */}
                        <div className="form-control">
                            <label className="label-text font-bold mb-3 block dark:text-gray-300">
                                Equivalent USD ($)
                            </label>
                            <div className="relative">
                                <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-[#59ba4a]" />
                                <input
                                    type="text"
                                    value={`$${calculatedMoney}`}
                                    readOnly
                                    className="input input-bordered w-full pl-12 h-14 bg-gray-100 dark:bg-gray-600 font-black text-lg text-gray-900 dark:text-white cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Payment Method Select */}
                        <div className="form-control">
                            <label className="label-text font-bold mb-3 block dark:text-gray-300">
                                Select Method
                            </label>
                            <div className="relative">
                                <FaCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                                <select
                                    className="select select-bordered w-full pl-12 h-14 bg-gray-50 dark:bg-gray-700 font-bold"
                                    {...register("paymentMethod", {
                                        required: true,
                                    })}
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select System
                                    </option>
                                    <option value="Bkash">Bkash</option>
                                    <option value="Nagad">Nagad</option>
                                    <option value="PayPal">PayPal</option>
                                </select>
                            </div>
                        </div>

                        {/* Account Number Input */}
                        <div className="form-control">
                            <label className="label-text font-bold mb-3 block dark:text-gray-300">
                                Account / Wallet Number
                            </label>
                            <div className="relative">
                                <FaUserAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Enter account detail"
                                    className="input input-bordered w-full pl-12 h-14 bg-gray-50 dark:bg-gray-700"
                                    {...register("accountNumber", {
                                        required: "Account info is required",
                                    })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button Section */}
                    <div className="mt-12">
                        {data?.coin >= 200 &&
                        coinInput >= 200 &&
                        coinInput <= data?.coin ? (
                            <button className="group btn w-full bg-[#59ba4a] hover:bg-[#4a9d3e] border-none text-white h-16 text-lg font-black rounded-2xl shadow-lg transition-all active:scale-95">
                                Withdraw{" "}
                                <span className="px-2 py-1 bg-white/20 rounded-lg ml-2 font-mono">
                                    ${calculatedMoney}
                                </span>
                            </button>
                        ) : (
                            <div className="w-full h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-600 text-gray-400 font-black uppercase tracking-widest">
                                Insufficient Balance
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WorkerWithdraw;
