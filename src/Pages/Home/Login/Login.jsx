import React, { useState } from "react";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import registerLogo from "../../../assets/login/registration.json";

const Login = () => {
    const { signInWithGoogle, signInUser } = useAuth();
    const [authError, setAuthError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        setAuthError("");
        try {
            await signInUser(data.email, data.password);
            const res = await axiosPublic.get(`/userRole/${data?.email}`);

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Welcome Back!",
                text: "Login Successful",
                showConfirmButton: false,
                timer: 1500,
            });

            navigate(
                location?.state?.from || `/dashboard/${res.data.role}/home`,
            );
        } catch (err) {
            setAuthError(
                "Invalid credentials. Please check your email and password.",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const res = await signInWithGoogle();
            const roleRes = await axiosPublic.get(
                `/userRole/${res.user.email}`,
            );

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Signed In with Google",
                showConfirmButton: false,
                timer: 1500,
            });

            navigate(
                location?.state?.from || `/dashboard/${roleRes.data.role}/home`,
            );
        } catch (err) {
            setAuthError("Google Sign-In failed.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-6 transition-colors duration-300">
            <div className="max-w-6xl w-full bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row-reverse">
                {/* Visual Side (Hidden on Mobile) */}
                <div className="lg:w-1/2 bg-[#59ba4a]/5 dark:bg-emerald-900/10 flex flex-col justify-center items-center p-12 hidden lg:flex border-l border-gray-100 dark:border-gray-800">
                    <div className="w-full max-w-md">
                        <Lottie animationData={registerLogo} loop={true} />
                    </div>
                    <div className="text-center mt-8">
                        <h2 className="text-3xl font-black text-gray-800 dark:text-white">
                            Get Back to Earning
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Log in to manage your tasks and withdrawals.
                        </p>
                    </div>
                </div>

                {/* Form Side */}
                <div className="lg:w-1/2 p-8 md:p-16">
                    {/* Brand Header */}
                    <div className="flex items-center gap-3 mb-10">
                        <div className="bg-[#59ba4a] p-2 rounded-xl text-white shadow-lg shadow-green-100 dark:shadow-none">
                            <FaHandHoldingDollar size={24} />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
                            Gig<span className="text-[#59ba4a]">Flow</span>
                        </h1>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                        Welcome back!
                    </h3>
                    <p className="text-gray-400 dark:text-gray-500 mb-8 font-medium">
                        Please enter your details to sign in.
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Email Field */}
                        <div className="form-control">
                            <label className="label-text font-bold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                                <FaEnvelope className="text-[#59ba4a]" /> Email
                                Address
                            </label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className="input input-bordered w-full h-14 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:border-[#59ba4a]"
                                {...register("email", { required: true })}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-xs mt-1">
                                    Email is required
                                </span>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="form-control">
                            <div className="flex justify-between items-end mb-2">
                                <label className="label-text font-bold text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                    <FaLock className="text-[#59ba4a]" />{" "}
                                    Password
                                </label>
                                
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="input input-bordered w-full h-14 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:border-[#59ba4a]"
                                {...register("password", { required: true })}
                            />
                        </div>

                        {/* Error Alert */}
                        {authError && (
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-2xl border border-red-100 dark:border-red-800 font-medium">
                                {authError}
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            disabled={loading}
                            className="group btn w-full bg-[#59ba4a] hover:bg-[#4a9d3e] text-white border-none rounded-2xl h-14 text-lg font-black shadow-lg shadow-green-100 dark:shadow-none transition-all active:scale-95"
                        >
                            {loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                <>
                                    Sign In{" "}
                                    <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <div className="divider text-gray-400 text-[10px] uppercase font-black tracking-widest">
                            Or continue with
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="btn btn-outline w-full hover:text-accent rounded-2xl h-14 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold"
                        >
                            <FaGoogle className="text-accent mr-2 text-xl" />{" "}
                            Sign in with Google
                        </button>

                        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-[#59ba4a] font-black hover:underline underline-offset-4"
                            >
                                Join GigFlow
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
