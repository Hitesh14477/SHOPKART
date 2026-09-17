import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosCalls/axios.js";


function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNo, setphoneNo] = useState("")
    const [agree, setAgree] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [err, setErr] = useState("")
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("")

        if (password !== ConfirmPassword) {
            alert("passwords do not match")
            return;
        }
        if (!agree) {
            setErr("Please agree to the terms and conditions");
            return;
        }

        setLoader(true);
        // console.log({ name, email, password, agree });
        try {
            const response = await axiosInstance.post('/customers/register', { name, email, password, phone: phoneNo })
            console.log(response.data)
            console.log('Account created')
            navigate('/login')
        }
        catch (error) {
            console.log(error.response?.data?.message)
            setErr(error.response?.data?.message)
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
                    <h1 className="text-xl font-medium mb-1.5">Create your account</h1>
                    <p className="font-sans text-[13.5px] text-[#6E7268] leading-relaxed mb-6">
                        Join Shopkart to start shopping and track your orders.
                    </p>

                    {err && (
                        <p className="text-red-500 font-sans text-sm mb-3">
                            {err}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block font-sans text-xs mb-1.5">
                                Full name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                required
                                className="w-full px-3 py-2.5 border border-[#DFE4D6] rounded-sm bg-[#F7F5EE] font-sans text-sm text-[#20281F] placeholder:text-[#AEB3A2] outline-none focus:border-[#4A7856] transition-colors"
                            />
                        </div>

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
                            <label htmlFor="PhoneNo" className="block font-sans text-xs mb-1.5">
                                Phone Number
                            </label>
                            <input
                                id="PhoneNo"
                                type="tel"
                                value={phoneNo}
                                onChange={(e) => setphoneNo(e.target.value.replace(/\D/g, ""))}
                                placeholder="phone number"
                                required
                                minLength={10}
                                maxLength={10}
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
                                placeholder="At least 6 characters"
                                required
                                minLength={6}
                                className="w-full px-3 py-2.5 border border-[#DFE4D6] rounded-sm bg-[#F7F5EE] font-sans text-sm text-[#20281F] placeholder:text-[#AEB3A2] outline-none focus:border-[#4A7856] transition-colors"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label
                                    htmlFor="password"
                                    className="font-sans text-xs"
                                >
                                    Confirm Password
                                </label>
                            </div>

                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={ConfirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="At least 6 characters"
                                required
                                minLength={6}
                                className="w-full px-3 py-2.5 border border-[#DFE4D6] rounded-sm bg-[#F7F5EE] font-sans text-sm text-[#20281F] placeholder:text-[#AEB3A2] outline-none focus:border-[#4A7856] transition-colors"
                            />
                        </div>



                        <div className="font-sans text-xs pt-0.5 pb-2">
                            <label className="flex items-start gap-1.5 text-[#6E7268] cursor-pointer leading-relaxed">
                                <input
                                    type="checkbox"
                                    checked={agree}
                                    onChange={(e) => setAgree(e.target.checked)}
                                    required
                                    className="mt-0.5"
                                />
                                <span>
                                    I agree to Shopkart's{" "}
                                    <a href="#" className="text-[#4A7856] hover:underline">
                                        Terms
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="text-[#4A7856] hover:underline">
                                        Privacy Policy
                                    </a>
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-[#4A7856] hover:bg-[#35573E] text-[#F7F5EE] rounded-sm font-sans text-sm font-semibold tracking-wide transition-colors"
                        >
                            {loader ? "Creating account..." : "Create account"}
                        </button>
                    </form>

                    <div className="text-center mt-5 font-sans text-[13px] text-[#6E7268]">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#4A7856] font-semibold hover:underline">Log in </Link>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default SignUp