import React, { useState } from "react";
import PropTypes from "prop-types";
import logo from "../../../assets/Logo/footerLogo.png";
import registerLogo from "../../../assets/login/registration.json";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const Login = (props) => {
    const { signInWithGoogle, signInUser } = useAuth();
    const [error, Seterror] = useState('');
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        signInUser(data.email, data.password)
            .then(res => {
                Seterror('')
                Swal.fire({
                position: 'center',
                    title: "Signed In Successfully",
                    text: "Welcome to GigFlow!",
                    icon: "success",
                    showConfirmButton: false,
            })
            })
            .catch(res => {
                Seterror("invalid-credential.Please try Again");
            console.log(res);
        })
    };
    // console.log(watch("password"));
    
        const handleGoogleLogin = () => {
            // Google Sign-In Code here
            signInWithGoogle().then((res) => {
                Swal.fire({
                    position: 'center',
                    title: "Signed In Successfully",
                    text: "Welcome to GigFlow!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                })
            });
        };
    return (
        <div className="my-10 flex items-center flex-row-reverse">
            <div className="w-[50%] ">
                <Lottie animationData={registerLogo} loop={true}></Lottie>
            </div>
            <div className="card bg-base-100 items-center justify-center w-[50%] max-w-xl  shadow-xl">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="card-body w-full"
                >
                    <img className="w-[75px]" src={logo} alt="" />
                    <h3 className="text-2xl font-bold">
                        <span className="text-[#ff5851]">Login</span> Your
                        Account
                    </h3>

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
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Input Password"
                            className="input input-bordered"
                            required
                            {...register("password", {
                                required: true,
                            })}
                        />
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn  bg-[#ff5851] text-white">
                            Login
                        </button>
                    </div>
                    <p>
                        Doesn't Have Account?{" "}
                        <Link to={'/register'} className="text-[#ff5851] font-semibold text-[16px]">SignUp</Link>
                    </p>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="divider ">OR</div>
                    <div>
                        <button
                            onClick={handleGoogleLogin}
                            className="btn bg-[#ff5851] text-white"
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
