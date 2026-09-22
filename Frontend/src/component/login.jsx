import { useForm } from "react-hook-form";
import api from "../config.js";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
    const { setAuthUser } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const userInfo = {

            email: data.email,
            password: data.password,

        };
        api.post("/api/user/login", userInfo)
            .then((response) => {
                console.log(response.data);
                if (response.data) {
                    toast.success("Login Successful! ")
                }
                localStorage.setItem("messenger", JSON.stringify(response.data));
                setAuthUser(response.data);
                navigate("/chat", { replace: true });
            })
            .catch((error) => {
                if (error.response) {
                    toast.error("Error :" + error.response.data.message);
                }
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
            <form noValidate className="bg-[#1f1f1f] p-6 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-blue-400 font-bold text-3xl text-center mb-4">Chatify</h1>

                <h1 className="text-2xl font-semibold mb-1 text-center">
                    Welcome back <span className="text-blue-600 font-bold">User</span>
                </h1>
                <p className="text-center text-gray-400 mb-6">Login to continue</p>

                <div className="flex flex-col gap-4">

                    {/* Email Field */}
                    <label className="flex items-center gap-2 border border-gray-600 px-3 py-2 rounded bg-[#1f1f1f]">
                        <svg className="h-5 opacity-50 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input
                            className="flex-1 outline-none bg-transparent text-white placeholder-gray-400"
                            type="email"
                            placeholder="mail@site.com"
                            {...register("email", { required: true })}
                            required
                        />
                    </label>
                    {errors.email && <span className="text-red-600 text-sm">**This field is required**</span>}

                    {/* Password Field */}
                    <label className="flex items-center gap-2 border border-gray-600 px-3 py-2 rounded bg-[#1f1f1f]">
                        <svg className="h-5 opacity-50 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <path
                                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                ></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input
                            className="flex-1 outline-none bg-transparent text-white placeholder-gray-400"
                            type="password"
                            placeholder="Password"
                            {...register("password", { required: true })}
                            required
                            minLength="8"
                        />
                    </label>
                    {errors.Password && <span className="text-red-600 text-sm">**This field is required**</span>}

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-300 font-semibold"
                    >
                        Login
                    </button>

                    {/* Link to Signup */}
                    <p className="text-center text-sm text-gray-400 mt-2">
                        Don't have an account?{" "}
                        <Link to={"/signup"} className="text-blue-500 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </form>




            <div className="absolute bottom-4 w-full text-center text-gray-500 text-sm">
                Made with <span className="text-red-500">❤️</span> by Faizan
            </div>


        </div>

    );
}
