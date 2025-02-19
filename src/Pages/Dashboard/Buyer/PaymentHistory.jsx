import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = (props) => {
    const [payment, setPayment] = useState('');
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    useEffect(() => { 
        axiosSecure.get("/payments").then((response) => {
            setPayment(response.data);
            setLoading(false);
        }).catch((error) => {
            // console.log(error);
        });
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
            <table className="table table-sm">
                <thead>
                    <tr className="text-text dark:text-background">
                        <th className="hidden lg:table-cell"></th>
                        <th>TranId</th>
                        <th>Amount</th>
                        <th className="hidden lg:table-cell">Date</th>
                    </tr>
                </thead>
                <tbody className="text-text dark:text-background">
                    {(payment.length > 0 &&
                        payment.map((item, index) => (
                            <tr key={index}>
                                <th className="hidden lg:table-cell">
                                    {index + 1}
                                </th>
                                <td>{item.TranId}</td>
                                <td>${item.amount}</td>
                                <td className="hidden lg:table-cell">
                                    {item.createdAt}
                                </td>
                            </tr>
                        ))) || <p>No payment history found</p>}
                </tbody>
            </table>
        </div>
    );
};

PaymentHistory.propTypes = {};

export default PaymentHistory;
