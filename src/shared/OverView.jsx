import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { GrUserManager, GrUserWorker } from "react-icons/gr";
import { MdPayment } from "react-icons/md";
import { FaCoins } from "react-icons/fa";
import {
    PieChart,
    Pie,
    Legend,
    Tooltip,
    ResponsiveContainer,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
} from "recharts";

       

const OverView = (props) => {
        const [withdraw, setWithdraw] = useState([]);
        const [workerCount, setWorkerCount] = useState(0);
        const [buyerCount, setBuyerCount] = useState(0);
        const [coinCount, setCoinCount] = useState(0);
        const [paymentCount, setPaymentCount] = useState(0);
        const [loading, setLoading] = useState(true);
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
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching withdrawals:", error);
                }
            };
            fetchWithdrawals();
        }, []);
        if (loading) {
            return (
                <div className="h-screen w-screen flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg  text-success"></span>
                </div>
            );
    }
    
    console.log(buyerCount)
const data01 = [
    { name: "Buyer", value: buyerCount },
    { name: "Worker", value: workerCount },
   
    ];
    
    



    return (
        <div>
            <div>
                <section className="p-6 my-6  bg-background dark:bg-text  ">
                    <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
                        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-primary text-background ">
                            <div className="flex justify-center text-4xl p-2 align-middle rounded-lg sm:p-4 ">
                                <GrUserManager></GrUserManager>
                            </div>
                            <div className="flex flex-col justify-center align-middle">
                                <p className="text-3xl font-semibold leading-none">
                                    {buyerCount}
                                </p>
                                <p className="capitalize">Buyer</p>
                            </div>
                        </div>
                        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-primary text-background ">
                            <div className="flex justify-center text-4xl p-2 align-middle rounded-lg sm:p-4 ">
                                <GrUserWorker></GrUserWorker>
                            </div>
                            <div className="flex flex-col justify-center align-middle">
                                <p className="text-3xl font-semibold leading-none">
                                    {workerCount}
                                </p>
                                <p className="capitalize">Worker</p>
                            </div>
                        </div>
                        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-primary text-background ">
                            <div className="flex justify-center text-4xl p-2 align-middle rounded-lg sm:p-4 ">
                                <MdPayment></MdPayment>
                            </div>
                            <div className="flex flex-col justify-center align-middle">
                                <p className="text-3xl font-semibold leading-none">
                                    {paymentCount}
                                </p>
                                <p className="capitalize">Payment</p>
                            </div>
                        </div>
                        <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-primary text-background ">
                            <div className="flex justify-center text-4xl p-2 align-middle rounded-lg sm:p-4 ">
                                <FaCoins></FaCoins>
                            </div>
                            <div className="flex flex-col justify-center align-middle">
                                <p className="text-3xl font-semibold leading-none">
                                    {coinCount}
                                </p>
                                <p className="capitalize">Coin</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <ResponsiveContainer
                width={400}
                height={400}
                className="bg-accent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
"
            >
                <PieChart>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={data01}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#59ba4a"
                        label
                    />

                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>


        </div>
    );
};

OverView.propTypes = {};

export default OverView;
