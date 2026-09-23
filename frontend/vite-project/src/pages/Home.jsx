import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";

function Home() {

    const {user } = useAuth();
    if (!user) {
        return <p>laoding...</p>
    }

    return (
        <div className="min-h-screen bg-[#F7F5EE] text-[#20281F]">

            {/* Navbar */}
          <Navbar/>

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