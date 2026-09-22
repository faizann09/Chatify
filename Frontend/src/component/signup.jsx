import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {

    const { authUser, setAuthUser } = useAuth();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password", "");
    const confirmPassword = watch("confirmPassword", "");

    const validatePasswordMatch = (value) => {
        return value === password || "Passwords didn't matched";
    }
    const onSubmit = async (data) => {
        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password,
            confirmpassword: data.confirmPassword,
        };
        await axios.post("/api/user/signup", userInfo)
            .then((response) => {
                console.log(response.data);
                if (response.data) {
                    toast.success("Signin Successful! You can now login")
                }
                localStorage.setItem("messenger", JSON.stringify(response.data));
                setAuthUser(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    toast.error("Error :" + error.response.data.error);
                }
            });
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f2937] via-[#111827] to-[#0f172a] p-4 text-white">
                <form noValidate className="bg-[#161b22] p-6 rounded-xl shadow-md w-full max-w-md " onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-blue-400 font-bold text-3xl text-center mb-2">Chatify</h1>

                    <h1 className="text-2xl font-semibold mb-1 text-center">Create a new {""}
                        <span className="text-blue-600 font-bold">Account</span>
                    </h1>
                    <h2 className="text-gray-400 text-center mb-6 text-sm">It's free and always will be</h2>

                    <div className="flex flex-col gap-4">

                        {/* Email */}
                        <label className="flex items-center gap-2 border border-gray-700 bg-[#0d1117] px-3 py-2 rounded focus-within:border-blue-500">
                            <svg className="h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>
                            <input
                                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
                                type="email"
                                placeholder="mail@site.com"
                                {...register("email", { required: true })}
                                required
                            />
                        </label>
                        {errors.email && <span className="text-red-600 text-sm">**This field is required**</span>}

                        {/* Username */}
                        <label className="flex items-center gap-2 border border-gray-700 bg-[#0d1117] px-3 py-2 rounded focus-within:border-blue-500">
                            <svg className="h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </g>
                            </svg>
                            <input
                                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
                                type="text"
                                required
                                placeholder="Username"
                                {...register("name", { required: true })}
                                pattern="[A-Za-z][A-Za-z0-9\-]*"
                                minLength="3"
                                maxLength="30"
                                title="Only letters, numbers or dash"
                            />

                        </label>
                        {errors.name && <span className="text-red-600 text-sm">**This field is required**</span>}

                        {/* Password */}
                        <label className="flex items-center gap-2 border border-gray-700 bg-[#0d1117] px-3 py-2 rounded focus-within:border-blue-500">
                            <svg className="h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                </g>
                            </svg>
                            <input
                                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
                                type="password"
                                required
                                placeholder="Password"
                                {...register("password", { required: true })}
                                minLength="8"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must include number, lowercase, uppercase letter"
                            />

                        </label>
                        {errors.password && <span className="text-red-600 text-sm">**This field is required**</span>}

                        {/* Confirm Password */}
                        <label className="flex items-center gap-2 border border-gray-700 bg-[#0d1117] px-3 py-2 rounded focus-within:border-blue-500">
                            <svg className="h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                </g>
                            </svg>
                            <input
                                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
                                type="password"
                                required
                                placeholder="Confirm Password"
                                {...register("confirmPassword", { required: true, validate: validatePasswordMatch })}
                                minLength="8"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must include number, lowercase, uppercase letter"
                            />

                        </label>
                        {errors.confirmPassword && <span className="text-red-600 text-sm">{errors.confirmPassword.message}</span>}


                        {/* Submit Button */}
                        <button
                            type="submit"
                            className=" cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-300 font-medium"
                        >
                            Sign Up
                        </button>
                        {/* Login Redirect */}
                        <p className="text-sm text-gray-400 text-center">
                            Already have an account? <Link to={"/login"} className="text-blue-500 cursor-pointer hover:underline">Login</Link>
                        </p>
                    </div>
                </form>
                <div className="absolute bottom-4 w-full text-center text-gray-500 text-sm">
                    Made with <span className="text-red-500">❤️</span> by Faizan
                </div>
            </div>
        </>
    );
}

