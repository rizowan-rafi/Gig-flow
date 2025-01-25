import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = (props) => {
    const [payment, setPayment] = useState('');
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    useEffect(() => { 
        axiosSecure.get("/payments").then((response) => {
            setPayment(response.data);
        }).catch((error) => {
            // console.log(error);
        });
    },[])
    return (
        <div>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th className="hidden lg:table-cell"></th>
                        <th>TranId</th>
                        <th>Amount</th>
                        <th className="hidden lg:table-cell">Date</th>
                    </tr>
                </thead>
                <tbody>
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
