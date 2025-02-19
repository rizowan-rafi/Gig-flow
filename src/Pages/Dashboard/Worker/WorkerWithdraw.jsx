import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import useUser from "../../../hooks/useUser";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const WorkerWithdraw = (props) => {
    const [error, setError] = useState()
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const [data, isPending] = useUser();

    // console.log(data?.coin)
    const coinRef = useRef();
    const coin = watch("coinAmount",0);
    // console.log(typeof(coin));

    if (coin > data?.coin) {
        alert("doesn't have enough coin.coin have to be less then or equal to total coin.");
        reset();
    }
    const coinMoney = parseInt(parseInt(coin) / 20);
    // console.log(coinMoney);
    // worker_email, worker_name, 
//withdrawal_coin, withdrawal_amount, payment_system, withdraw_date, and a status (pending) 
    const onSubmit = async (withdrawData) => {
        // console.log(withdrawData);
        const withdrawMoneyData = {
            worker_email: data?.email,
            worker_name: data?.name,
            withdrawal_coin: withdrawData.coinAmount,
            withdrawal_amount: coinMoney,
            payment_system: withdrawData.paymentMethod,
            withdraw_date: new Date().toISOString().split("T")[0],
            status: "pending",
        };

        const response = await axiosSecure.post("/withdraws", withdrawMoneyData);
        if (response.data.insertedId) {
            Swal.fire({
                position: "center",
                title: "Withdrawal Request Sent Successfully",
                text: "Your withdrawal request is being processed. You will be notified once your withdrawal is approved.",
                icon: "success",
            }
            )
        }
        // await props.withdraw(data);
        // reset();
    };
    // if (isPending) {
    //     return <div>Loading...</div>
    // }
    // if (error) {
    //     return <div>Error: {error.message}</div>
    // }
    // console.log(data?.email);
    const money = Math.round(parseInt(data?.coin / 20));
    return (
        <div className="p-5 text-text dark:text-background">
            <p className="text-xl font-semibold">Current Coin :{data?.coin}</p>
            <p className="text-xl font-semibold">
                Current Withdrawal Amount :
                {money}
            </p>
            <p className="text-red-500 font-semibold">Need Minimum 200 coin or 10 dollar to withdraw</p>

            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-background">Insert Coin</span>
                    </label>
                    <input
                        type="number"
                        ref={coinRef}
                        placeholder="Number of coin to withdraw"
                        className="input input-bordered text-text"
                        {...register("coinAmount")}
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-background">Money$</span>
                    </label>
                    <input
                        type="number"
                        value={coinMoney}
                        readOnly={true}
                        className="input input-bordered text-text"
                        {...register("moneyAmount")}
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-background">Payment System</span>
                    </label>
            <select
                defaultValue={""}
                {...register("paymentMethod", { required: true })}
                className="select select-bordered w-full max-w-xs text-text"
            >
                <option value="" disabled>
                    Select Payment Method
                </option>
                <option value="Bkash">Bkash</option>
                <option value="Nagad">Nagad</option>
                <option value="PayPal">PayPal</option>
            </select>

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text dark:text-background">Account Number</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Account Number"
                        className="input input-bordered text-text"
                        {...register("accountNumber")}
                        required
                    />
                </div>
                <div className="form-control mt-6">
                    {data?.coin >= 200 && parseInt(coin)>=200 ? (
                        <button className="btn bg-primary text-background">Withdraw Money</button>
                    ) : (
                        <button className="btn-disabled btn dark:bg-secondary dark:text-background">Insufficient coin</button>
                    )}
                </div>
            </form>
        </div>
    );
};

WorkerWithdraw.propTypes = {};

export default WorkerWithdraw;
