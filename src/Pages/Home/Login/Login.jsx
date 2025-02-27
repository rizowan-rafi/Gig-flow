import React, { useState } from "react";
import PropTypes from "prop-types";
import logo from "../../../assets/Logo/footerLogo.png";
import registerLogo from "../../../assets/login/registration.json";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaHandHoldingDollar } from "react-icons/fa6";
const Login = (props) => {
    const { signInWithGoogle, signInUser } = useAuth();
    const [error, Seterror] = useState('');
    const { user } = useAuth();
    // console.log(user)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from || '/';
    const axiosPublic = useAxiosPublic();
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        signInUser(data.email, data.password)
            .then(res => {
                
                axiosPublic(`/userRole/${data?.email}`)
                    .then(res => {
                    navigate(location?.state?.from||`/dashboard/${res.data.role}/home`);
                    Seterror('')
                    // navigate(from);
                    Swal.fire({
                    position: 'center',
                        title: "Signed In Successfully",
                        text: "Welcome to GigFlow!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                    })
                })
                
            })
            .catch(res => {
                Seterror("invalid-credential.Please try Again");
            // console.log(res);
        })
    };
    // console.log(watch("password"));
    
        const handleGoogleLogin = () => {
            // Google Sign-In Code here
            signInWithGoogle().then((res) => {
                                axiosPublic(`/userRole/${res.user.email}`).then(
                                    (res) => {
                                        navigate(
                                            location?.state?.from ||
                                                `/dashboard/${res.data.role}/home`
                                        );
                                        Seterror("");
                                        // navigate(from);
                                        Swal.fire({
                                            position: "center",
                                            title: "Signed In Successfully",
                                            text: "Welcome to GigFlow!",
                                            icon: "success",
                                            showConfirmButton: false,
                                            timer: 2000,
                                        });
                                    }
                                );
            });
        };
    return (
        <div className="py-10 lg:flex items-center flex-row-reverse bg-background dark:text-background dark:bg-text">
            <div className="w-[50%] hidden lg:block ">
                <Lottie animationData={registerLogo} loop={true}></Lottie>
            </div>
            <div className="card  items-center justify-center w-[90%] mx-auto lg:w-[50%] max-w-xl  shadow-xl">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="card-body w-full "
                >
                    <span className="text-primary text-5xl">
                        <FaHandHoldingDollar></FaHandHoldingDollar>
                    </span>
                    <h3 className="text-2xl font-bold">
                        <span className="text-primary">Login</span> Your Account
                    </h3>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-background">
                                Email
                            </span>
                        </label>
                        <input
                            type="email"
                            placeholder="Input A Valid Email"
                            className="input input-bordered dark:text-green-500"
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
                            <span className="label-text dark:text-background">
                                Password
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="Input Password"
                            className="input input-bordered dark:text-green-500"
                            required
                            {...register("password", {
                                required: true,
                            })}
                        />
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn  bg-primary text-white">
                            Login
                        </button>
                    </div>
                    <p>
                        Doesn't Have Account?{" "}
                        <Link
                            to={"/register"}
                            className="text-primary font-semibold text-[16px]"
                        >
                            SignUp
                        </Link>
                    </p>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="divider ">OR</div>
                    <div>
                        <button
                            onClick={handleGoogleLogin}
                            className="btn bg-primary text-white"
                        >
                            <FaGoogle></FaGoogle> Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

Login.propTypes = {};

export default Login;
