import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminHome = (props) => {
    const [withdraw, setWithdraw] = useState([]);
    const [workerCount, setWorkerCount] = useState(0);
    const [buyerCount, setBuyerCount] = useState(0);
    const [coinCount, setCoinCount] = useState(0);
    const [paymentCount, setPaymentCount] = useState(0);
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        const fetchWithdrawals = async () => {
            try {
                const response = await axiosSecure.get("/withdraws");
                // console.log(response.data);
                setWithdraw(response.data);

                const wwcc = await axiosSecure.get("/wcCount");
                setWorkerCount(wwcc.data.workerCount);
                setBuyerCount(wwcc.data.buyerCount);

                const wcSUm = await axiosSecure.get("/wcSum");
                setCoinCount(wcSUm.data.total);

                const payment = await axiosSecure.get("/totalPayment");
                setPaymentCount(payment.data.total);
            } catch (error) {
                console.error("Error fetching withdrawals:", error);
            }
        };
        fetchWithdrawals();
    }, []);

    const handleWithdraw = async (id, email, wcoin, wstatus, name) => {
        // console.log(id, email);
        if (wstatus === "approved") {
            Swal.fire({
                title: "Withdrawal Request Already Approved",
                text: "The withdrawal request is already approved.",
                icon: "warning",
                confirmButtonText: "Okay",
            });
            return;
        }
        const withdrawStatus = await axiosSecure.patch(
            `/withdrawStatus/${id}`,
            {
                status: "approved",
            }
        );

        const user = await axiosSecure.get(`/users/${email}`);
        // console.log(user.data.coin);
        const withdrawCoin = await axiosSecure.patch(`/withdrawCoin/${email}`, {
            coin: user.data.coin - wcoin,
        });

        if (
            withdrawCoin.data.modifiedCount &&
            withdrawStatus.data.modifiedCount
        ) {
            const note = {
                toEmail: email,
                formEmail: "Admin@gmail.com",
                time: new Date().toISOString().split("T")[0],
                message: `Withdrawal request approved for ${name} by Admin`,
                actionRoute: '/dashboard/Worker/home'
            };
            const res = await axiosSecure.post("/notifications", note);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Withdrawal Approved",
                    text: "The withdrawal request has been approved.",
                    icon: "success",
                    confirmButtonText: "Okay",
                });
            }
        }
    };

    // console.log(withdraw);
    return (
        <div>
            <div className="flex w-full justify-center items-center mt-5">
                <div className="stats justify-center items-center place-items-center  w-full lg:w-3/4  stats-vertical lg:stats-horizontal shadow">
                    <div className="stat">
                        <div className="stat-title">Total Worker</div>
                        <div className="stat-value">{workerCount}</div>
                        {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total Buyer</div>
                        <div className="stat-value">{buyerCount}</div>
                        {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total Available Coin</div>
                        <div className="stat-value">{coinCount}</div>
                        {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                    </div>
                    <div className="stat">
                        <div className="stat-title">Total Payment</div>
                        <div className="stat-value">{paymentCount}</div>
                        {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                    </div>
                </div>
            </div>

            <div>
                <div className="overflow-x-auto">
                    <table className="table table-md">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Worker Name</th>
                                <th>Worker Email</th>
                                <th>Withdraw Coin</th>
                                <th>Withdraw Money</th>
                                <th>Withdraw Date</th>
                                <th>Status</th>
                                <th>Approval</th>
                            </tr>
                        </thead>
                        <tbody>
                            {withdraw.map((w, index) => (
                                <tr key={w._id}>
                                    <th>{index + 1}</th>
                                    <td>{w.worker_name}</td>
                                    <td>{w.worker_email}</td>
                                    <td>{w.withdrawal_coin}</td>
                                    <td>{w.withdrawal_amount}</td>
                                    <td>{w.withdraw_date}</td>
                                    <td>{w.status}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleWithdraw(
                                                    w._id,
                                                    w.worker_email,
                                                    w.withdrawal_coin,
                                                    w.status,
                                                    w.worker_name
                                                )
                                            }
                                            className="btn-sm btn btn-success"
                                        >
                                            Payment <br /> Approve
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {/* row 1 */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

AdminHome.propTypes = {};

export default AdminHome;
