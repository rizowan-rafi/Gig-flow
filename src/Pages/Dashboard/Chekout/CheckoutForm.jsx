import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useUser from "../../../hooks/useUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckoutForm = ({ coin }) => {
    // const { user } = useAuth();
    const [user, refetch] = useUser();
    const [clientSecret, setClientSecret] = useState("");
    const [error, setError] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const res = await axiosSecure.post("/create-payment-intent", {
                    price: coin,
                });
                setClientSecret(res.data.clientSecret);
            } catch (err) {
                console.error("Error fetching client secret:", err);
                setError("Failed to initiate payment. Please try again.");
            }
        };

        fetchClientSecret();
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            // console.log("[error]", error);
            setError(error.message);
        } else {
            // console.log("[PaymentMethod]", paymentMethod);
            setError("");
        }

        // conform payment
        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: "test@example.com",
                    },
                },
            });

        if (confirmError) {
            // console.log("[confirmError]", confirmError);
            setError(confirmError.message);
        } else {
            // console.log("Payment confirmed:", paymentIntent);
            setError("");

            // update user balance
            const coinData = {
                email: user.email,
                coin: user.coin + coin * 10,
            };
            axiosSecure.patch("/coins", coinData).then((res) => {
                if (res.data.modifiedCount) {
                    refetch();
                    const paymentData = {
                        email: user.email,
                        TranId: paymentIntent.id,
                        amount: coin,
                        status: paymentIntent.status,
                        createdAt: new Date().toISOString().split("T", 1)[0],
                    };

                    axiosSecure.post("/payments", paymentData).then((res) => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "center",
                                title: "Payment Successful!",
                                text: "Thank you for your payment!",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 2000,
                            });
                        }
                    });
                }
            });
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <button className="btn  text-white bg-primary hover:bg-primary mt-5" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
};

CheckoutForm.propTypes = {};

export default CheckoutForm;
