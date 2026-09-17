import { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosCalls/axios";
import { useAuth } from "../Context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [loader, setLoader] = useState(false)
    const [err, setErr] = useState("")


    const {login}=useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // wire this up to your auth flow
        // console.log({ email, password, keepLoggedIn });
        setErr("")
        setLoader(true)
        try {
             await login({email,password});
        }
        catch (err) {
            setErr(err.response?.data?.message || 'something went wrong')
        }
        finally {
            setLoader(false)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7F5EE] font-serif text-[#20281F] p-6">
            <div className="w-full max-w-[380px]">
                <div className="flex items-baseline justify-center gap-0.5 mb-7">
                    <Link to={'/'}>
                        <span className="text-2xl tracking-wide">shopkart</span>
                        <span className="text-2xl text-[#B98A3E] leading-none">.</span>
                    </Link>
                </div>

                <div className="bg-white border border-[#DFE4D6] rounded p-9">
                    <h1 className="text-xl font-medium mb-1.5">Welcome back</h1>
                    <p className="font-sans text-[13.5px] text-[#6E7268] leading-relaxed mb-6">
                        Log in to pick up your cart and orders.
                    </p>
                    {err && (
                        <p className="text-red-500 font-sans text-sm mb-3">
                            {err}
                        </p>
                    )}


                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block font-sans text-xs mb-1.5">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full px-3 py-2.5 border border-[#DFE4D6] rounded-sm bg-[#F7F5EE] font-sans text-sm text-[#20281F] placeholder:text-[#AEB3A2] outline-none focus:border-[#4A7856] transition-colors"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label
                                    htmlFor="password"
                                    className="font-sans text-xs"
                                >
                                    Password
                                </label>

                                <label className="flex items-center gap-1.5 font-sans text-xs cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={showPassword}
                                        onChange={() => setShowPassword(!showPassword)}
                                    />
                                    Show
                                </label>
                            </div>

                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                className="w-full px-3 py-2.5 border border-[#DFE4D6] rounded-sm bg-[#F7F5EE] font-sans text-sm text-[#20281F] placeholder:text-[#AEB3A2] outline-none focus:border-[#4A7856] transition-colors"
                            />
                        </div>

                        <div className="flex items-center justify-between font-sans text-xs pt-0.5 pb-2">
                            <label className="flex items-center gap-1.5 text-[#6E7268] cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={keepLoggedIn}
                                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                                    className="m-0"
                                />
                                Keep me logged in
                            </label>
                            <a href="#" className="text-[#4A7856] hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-[#4A7856] hover:bg-[#35573E] text-[#F7F5EE] rounded-sm font-sans text-sm font-semibold tracking-wide transition-colors"
                        >
                            {loader ? "Loggin..." : "Log In"}

                        </button>
                    </form>

                    <div className="text-center mt-5 font-sans text-[13px] text-[#6E7268]">
                        New to Shopkart?{" "}

                        <Link
                            to="/register" className="text-[#4A7856] font-semibold hover:underline">
                            Create an account
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login