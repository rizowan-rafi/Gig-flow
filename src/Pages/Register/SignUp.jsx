import React, { useState } from "react";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import {
    FaGoogle,
    FaUser,
    FaEnvelope,
    FaLock,
    FaUserTag,
    FaCloudUploadAlt,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import logo from "../../assets/Logo/footerLogo.png";
import registerLogo from "../../assets/login/registration.json";

const image_hosting_key = import.meta.env.VITE_Image_Upload_Token;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const [authError, setAuthError] = useState("");
    const [loading, setLoading] = useState(false);
    const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        setAuthError("");

        try {
            // 1. Upload Image to ImgBB (Fixing the 400 Error)
            const formData = new FormData();
            formData.append("image", data.image[0]);

            const imgResponse = await axios.post(image_hosting_api, formData);

            if (imgResponse.data.success) {
                const photoURL = imgResponse.data.data.display_url;

                // 2. Create User in Firebase
                const result = await createUser(data.email, data.password);

                // 3. Update Firebase Profile
                await updateUserProfile(data.name, photoURL);

                // 4. Prepare User Data for DB
                const initialCoins = data.role === "Worker" ? 10 : 50;
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    image: photoURL,
                    role: data.role,
                    coin: initialCoins,
                    createdAt: new Date().toISOString(),
                };

                // 5. Save to Database
                const dbResponse = await axiosPublic.post("/users", userInfo);

                if (dbResponse.data.insertedId) {
                    reset();
                    Swal.fire({
                        icon: "success",
                        title: "Welcome to GigFlow!",
                        text: "Account created successfully.",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    navigate(`/dashboard/${data.role}/home`);
                }
            }
        } catch (err) {
            console.error(err);
            setAuthError(
                err.message.includes("email-already-in-use")
                    ? "This email is already registered."
                    : "Failed to create account. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-6 transition-colors duration-300">
            <div className="max-w-6xl w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row-reverse">
                {/* Visual Side (Hidden on Mobile) */}
                <div className="lg:w-1/2 bg-[#59ba4a]/10 dark:bg-emerald-900/10 flex flex-col justify-center items-center p-12 hidden lg:flex border-l border-gray-100 dark:border-gray-800">
                    <div className="w-full max-w-md">
                        <Lottie animationData={registerLogo} loop={true} />
                    </div>
                    <div className="text-center mt-8">
                        <h2 className="text-3xl font-black text-gray-800 dark:text-white">
                            Join the Community
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Start earning or posting tasks in minutes.
                        </p>
                    </div>
                </div>

                {/* Form Side */}
                <div className="lg:w-1/2 p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-8">
                        <img
                            className="w-12 h-12 object-contain"
                            src={logo}
                            alt="GigFlow Logo"
                        />
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                            Gig<span className="text-[#59ba4a]">Flow</span>
                        </h1>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                        Create your account
                    </h3>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        {/* Name Field */}
                        <div className="form-control">
                            <label className="label-text font-bold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                                <FaUser className="text-[#59ba4a]" /> Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:border-[#59ba4a]"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                            />
                            {errors.name && (
                                <span className="text-red-500 text-xs mt-1">
                                    {errors.name.message}
                                </span>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="form-control">
                            <label className="label-text font-bold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                                <FaEnvelope className="text-[#59ba4a]" /> Email
                                Address
                            </label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                            />
                        </div>

                        {/* Role & Photo Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="form-control">
                                <label className="label-text font-bold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                                    <FaUserTag className="text-[#59ba4a]" /> I
                                    am a...
                                </label>
                                <select
                                    {...register("role", {
                                        required: "Select a role",
                                        validate: (v) => v !== "default",
                                    })}
                                    className="select select-bordered w-full bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                                    defaultValue="default"
                                >
                                    <option disabled value="default">
                                        Select Role
                                    </option>
                                    <option value="Worker">Worker</option>
                                    <option value="Buyer">Buyer</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label-text font-bold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                                    <FaCloudUploadAlt className="text-[#59ba4a]" />{" "}
                                    Profile Photo
                                </label>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                                    {...register("image", {
                                        required: "Photo is required",
                                    })}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="form-control">
                            <label className="label-text font-bold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                                <FaLock className="text-[#59ba4a]" /> Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="input input-bordered w-full bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                                {...register("password", {
                                    required: "Password is required",
                                    pattern:
                                        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,20}$/,
                                })}
                            />
                            {errors.password?.type === "pattern" && (
                                <p className="text-red-500 text-[10px] mt-1 leading-tight">
                                    Include uppercase, lowercase, number, and
                                    special character.
                                </p>
                            )}
                        </div>

                        {/* Error Alert */}
                        {authError && (
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-100 dark:border-red-800">
                                {authError}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            disabled={loading}
                            className="btn w-full bg-[#59ba4a] hover:bg-[#4a9d3e] text-white border-none rounded-xl h-14 text-lg font-bold shadow-lg shadow-green-100 dark:shadow-none transition-all active:scale-95"
                        >
                            {loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                "Create Account"
                            )}
                        </button>

                        <div className="divider text-gray-400 text-xs uppercase font-bold">
                            Or join with
                        </div>

                        <button
                            type="button"
                            onClick={() => signInWithGoogle()}
                            className="btn btn-outline hover:text-accent w-full rounded-xl h-14 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            <FaGoogle className="text-accent mr-2" /> Google
                        </button>

                        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-[#59ba4a] font-black hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
