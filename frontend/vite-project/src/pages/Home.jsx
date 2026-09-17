import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

function Home() {

    const { logout, logoutLoading } = useAuth();


    return (
        <div className="min-h-screen bg-[#F7F5EE] text-[#20281F]">

            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-5 bg-white border-b border-[#DFE4D6]">

                {/* Logo */}
                <h1 className="text-2xl font-serif">
                    <Link to="/">
                        shopkart<span className="text-[#B98A3E]">.</span>
                    </Link>
                </h1>

                {/* Center navigation */}
                <div className="absolute left-1/2 -translate-x-1/2 flex gap-6 font-sans text-sm">

                    <Link
                        to="/home"
                        className="text-[#4A7856]"
                    >
                        Home
                    </Link>

                    <Link
                        to="/products"
                        className="hover:text-[#4A7856]"
                    >
                        Products
                    </Link>
                       
                      
                </div>

                {/* Logout */}
                <button
                    className="hover:text-red-600 font-sans text-sm"
                    onClick={logout}
                    disabled={logoutLoading}
                >

                    {logoutLoading ? "Logging Out..." : "Logout"}
                </button>

            </nav>


            {/* Product Card */}
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">

                <div className="bg-white border border-[#E5E7DF] rounded-2xl shadow-sm p-8 text-center w-80">

                    <h1 className="text-3xl font-serif font-bold">
                        View Our Products
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Explore our collection of products.
                    </p>

                    <Link
                        to="/products"
                        className="inline-block mt-6 bg-[#20281F] text-white px-8 py-3 rounded-lg hover:bg-[#4A7856] transition"
                    >
                        View Products →
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Home;