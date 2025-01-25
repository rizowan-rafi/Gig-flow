import React, { useState } from "react";
import PropTypes from "prop-types";
import logo from "../../assets/Logo/footerLogo.png";
import registerLogo from "../../assets/login/registration.json";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_Image_Upload_Token;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const SignUp = (props) => {
    const axiosPublic = useAxiosPublic();
    const [error, Seterror] = useState("");
    const { signInWithGoogle, createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        const image = { image: data.image[0] };
        const response = await axios.post(image_hosting_api, image, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (response.data.success) {
            createUser(data.email, data.password)
                .then((res) => {
                    // console.log(res.data);
                    updateUserProfile(data.name, response.data.data.display_url)
                        .then((res) => {
                            Seterror("");
                            reset();
                            const coin = data.role === "Worker" ? 10 : 50;
                            const user = {
                                name: data.name,
                                email: data.email,
                                image: response.data.data.display_url,
                                role: data.role,
                                coin: parseInt(coin),
                            };
                            axiosPublic.post("/users", user).then((res) => {
                                if (res.data.insertedId) {
                                    axiosPublic.get(`/userRole/${data?.email}`).then((res) => { 
                                        navigate(`/dashboard/${res.data.role}/home`)
                                        Swal.fire({
                                            position: "center",
                                            title: "Account Created Successfully",
                                            text: "Welcome to GigFlow!",
                                            icon: "success",
                                            showConfirmButton: false,
                                            timer: 2000,
                                        });
                                    })
                                }
                            });
                        })
                        .catch((err) => {
                            Swal.fire({
                                position: "center",
                                title: "Something went wrong.Please try again",
                                icon: "error",
                                showConfirmButton: false,
                                timer: 2000,
                            });
                        });
                })
                .catch((err) => {
                    Seterror(
                        "email-already-in-use.please enter another valid email address"
                    );
                    // console.log(err);
                });
        }
    };
    // console.log(watch("password"));

    return (
        <div className="my-10 lg:flex items-center flex-row-reverse">
            <div className="w-[50%] hidden lg:block">
                <Lottie animationData={registerLogo} loop={true}></Lottie>
            </div>
            <div className="card bg-base-100 items-center justify-center w-[90%] mx-auto lg:w-[50%] max-w-xl  shadow-xl">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="card-body w-full"
                >
                    <img className="w-[75px]" src={logo} alt="" />
                    <h3 className="text-2xl font-bold">
                        <span className="text-[#ff5851]">Register</span> Your
                        Account
                    </h3>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Input Your Name"
                            className="input input-bordered"
                            {...register("name", { required: true })}
                            required
                        />
                        {errors.name?.type === "required" && (
                            <p className="text-red-500 text-xs pt-2">
                                Please enter your name.
                            </p>
                        )}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Input A Valid Email"
                            className="input input-bordered"
                            {...register("email", { required: true })}
                            required
                        />
                        {errors.email?.type === "required" && (
                            <p className="text-red-500 text-xs pt-2">
                                Please enter a valid email address.
                            </p>
                        )}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            type="file"
                            className="file-input file-input-bordered file-input-error w-full max-w-xs"
                            {...register("image", { required: true })}
                        />
                        {errors.image?.type === "required" && (
                            <p className="text-red-500 text-xs pt-2">
                                Please upload a profile picture.
                            </p>
                        )}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Input Password"
                            className="input input-bordered"
                            required
                            {...register("password", {
                                required: true,
                                pattern:
                                    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,20}$/,
                            })}
                        />
                        {errors.password?.type == "pattern" && (
                            <p className="text-red-500 text-xs pt-2">
                                Password must be at least 6 characters long,
                                contain at least one uppercase letter, one
                                lowercase letter, one number, and one special
                                character.
                            </p>
                        )}
                    </div>
                    <div className="form-control">
                        {/* <label className="label">
                            <span className="label-text">Input Your Role</span>
                        </label> */}

                        <select
                            {...register("role", {
                                required: true,
                                validate: (formValue) =>
                                    formValue !== "default",
                            })}
                            className="select select-error w-full max-w-xs"
                            defaultValue={"default"}
                        >
                            <option disabled value={"default"}>
                                Select Your Role
                            </option>
                            <option>Worker</option>
                            <option>Buyer</option>
                        </select>
                        {errors.role?.type === "required" && (
                            <p className="text-red-500 text-xs pt-2">
                                Please select your role.
                            </p>
                        )}
                        {errors.role?.type === "validate" && (
                            <p className="text-red-500 text-xs pt-2">
                                Please select your role.
                            </p>
                        )}
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn  bg-[#ff5851] text-white">
                            SignUp
                        </button>
                    </div>
                    <p>
                        Already Have Account?{" "}
                        <Link
                            to={"/login"}
                            className="text-[#ff5851] font-semibold text-[16px]"
                        >
                            Login
                        </Link>
                    </p>
                    {error && <p className="text-red-500  mt-4">{error}</p>}
                    
                </form>
            </div>
        </div>
    );
};

SignUp.propTypes = {};

export default SignUp;
