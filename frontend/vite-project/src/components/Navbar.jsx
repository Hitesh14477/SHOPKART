import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/wishlistContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";


function Navbar() {

    const { logout, logoutLoading, user } = useAuth();
    const { WishList } = useWishlist();
    const {cartItems}=useCart()
       const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );


    return (
        <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-[#DFE4D6] bg-white px-5 py-3.5 sm:px-8 sm:py-4">

            {/* Logo */}
            <h1 className="flex min-w-0 items-center gap-3 font-serif text-xl sm:text-2xl">
                <span className="shrink-0">
                    <Link to='/home'>
                    shopkart<span className="text-[#B98A3E]">.</span>
                    </Link>
                </span>
            </h1>

            {/* Center Navigation */}
            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 font-sans text-sm whitespace-nowrap lg:flex">

                <Link to="/home" className="py-2 text-[#596057] transition-colors hover:text-[#4A7856]">
                    Home
                </Link>

                <Link
                    to="/products"
                    className="py-2 text-[#596057] transition-colors hover:text-[#4A7856]"
                >
                    Products
                </Link>

                <Link
                    to="/wishlist"
                    className="py-2 text-[#596057] transition-colors hover:text-[#4A7856]"
                >
                    Wishlist - {WishList?.length}
                </Link>


                <Link
                    to="/cart"
                    className="py-2 text-[#596057] transition-colors hover:text-[#4A7856]"
                >
                    Cart - {totalItems}
                </Link>

            </div>

            {/* Mobile Navigation */}
            <div className="absolute left-0 top-full flex w-full items-center justify-between border-b border-[#DFE4D6] bg-[#F7F5EE] px-5 py-2 font-sans text-xs lg:hidden">

                <Link to="/home" className="py-1.5 text-[#596057] transition-colors hover:text-[#4A7856]">
                    Home
                </Link>

                <Link
                    to="/products"
                    className="py-1.5 text-[#596057] transition-colors hover:text-[#4A7856]"
                >
                    Products
                </Link>

                <Link
                    to="/wishlist"
                    className="py-1.5 text-[#596057] transition-colors hover:text-[#4A7856]"
                >
                    Wishlist - {WishList?.length}
                </Link>

                <Link
                    to="/cart"
                    className="py-1.5 text-[#596057] transition-colors hover:text-[#4A7856]"
                >
                    Cart - {totalItems}
                </Link>

            </div>

            {/* Profile and Logout */}
            <div className="ml-auto flex shrink-0 items-center gap-2.5 sm:gap-4">
                    <Link to='/profile'>
                <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EDF1E9] text-xs font-semibold uppercase text-[#35573E]">
                        {user?.name?.trim()?.charAt(0) || "U"}
                    </span>
                    <span className="hidden max-w-28 truncate text-sm font-medium text-[#596057] md:inline">
                        {user?.name || "Profile"}
                    </span>
                </div>
                    </Link>
                <button
                    onClick={logout}
                    disabled={logoutLoading}
                    className="border-l border-[#E5E7DF] py-2 pl-3 text-xs font-medium text-[#596057] transition-colors hover:text-[#9C5147] sm:pl-4 sm:text-sm"
                >
                    {logoutLoading ? "Logging out..." : "Logout"}
                </button>
            </div>

        </nav>
    );
}

export default Navbar;
