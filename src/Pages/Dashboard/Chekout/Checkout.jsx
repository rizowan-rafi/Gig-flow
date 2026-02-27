import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation, Link } from "react-router-dom";
import {
    FaLock,
    FaShieldAlt,
    FaCreditCard,
    FaCoins,
    FaArrowLeft,
} from "react-icons/fa";
import CheckoutForm from "./CheckoutForm";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway);

const Checkout = () => {
    const location = useLocation();
    const coinsAmount = location.state?.coins || 0;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 lg:p-10 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                {/* Header / Navigation */}
                <div className="mb-10">
                    <Link
                        to="/dashboard/Buyer/purchaseCoin"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-[#59ba4a] transition-colors font-bold text-sm uppercase tracking-widest mb-4"
                    >
                        <FaArrowLeft /> Back to Plans
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                        Secure <span className="text-[#59ba4a]">Checkout</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Complete your purchase to top up your account balance.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left Side: Payment Form */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                    <FaCreditCard className="text-[#59ba4a]" />{" "}
                                    Card Details
                                </h2>
                                <div className="flex gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                                        className="h-4"
                                        alt="Visa"
                                    />
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                                        className="h-4"
                                        alt="Mastercard"
                                    />
                                </div>
                            </div>

                            {/* Stripe Elements Wrapper */}
                            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-600">
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm coin={coinsAmount} />
                                </Elements>
                            </div>

                            <div className="mt-8 flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800">
                                <FaShieldAlt className="text-blue-500 mt-1" />
                                <div>
                                    <p className="text-xs font-bold text-blue-800 dark:text-blue-300">
                                        PCI-DSS Compliant
                                    </p>
                                    <p className="text-[10px] text-blue-600/70 dark:text-blue-400">
                                        Your payment information is encrypted
                                        and never stored on our servers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 sticky top-28">
                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">
                                Order Summary
                            </h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 font-medium">
                                        <FaCoins className="text-yellow-500" />{" "}
                                        Coin Purchase
                                    </div>
                                    <span className="font-bold dark:text-white">
                                        {coinsAmount * 10} Coins
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-400">
                                    <span>Rate</span>
                                    <span>$1.00 / 10 Coins</span>
                                </div>
                                <div className="h-[1px] bg-gray-100 dark:bg-gray-700"></div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                                        Total Amount
                                    </span>
                                    <span className="text-2xl font-black text-[#59ba4a]">
                                        ${coinsAmount}
                                    </span>
                                </div>
                            </div>

                            <div className="text-center space-y-3">
                                <div className="flex justify-center items-center gap-2 text-gray-400 text-xs font-bold">
                                    <FaLock size={10} /> 256-bit SSL Secure
                                    Payment
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
