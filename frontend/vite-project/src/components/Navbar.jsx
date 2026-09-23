import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";
import { useWishlist } from "../context/wishlistContext.jsx";

function Navbar() {

    const { logout, logoutLoading } = useAuth();
    const {WishList}=useWishlist();

    return (
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-5 bg-white border-b border-[#DFE4D6]">
            {/* Logo */}
            <h1 className="text-2xl font-serif">

                    shopkart<span className="text-[#B98A3E]">.</span>

            </h1>


            {/* Center Navigation */}
            <div className="absolute left-1/2 -translate-x-1/2 flex gap-6 font-sans text-sm">

                    Home
                

                <Link
                    to="/products"
                    className="hover:text-[#4A7856] transition"
                >
                    Products
                </Link>

                <Link
                    to="/wishlist"
                    className="hover:text-[#4A7856] transition"
                >
                    Wishlist - {WishList?.length}
                </Link>

            </div>


            {/* Logout */}
            <button
                onClick={logout}
                disabled={logoutLoading}
                className="hover:text-red-600 transition"
            >
                {logoutLoading ? "Logging out..." : "Logout"}
            </button>

        </nav>
    );
}

export default Navbar;