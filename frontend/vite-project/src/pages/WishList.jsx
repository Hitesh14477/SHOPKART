import React from "react";
import Navbar from "../components/Navbar.jsx";
import WishlistCard from "../components/WishlistCard.jsx";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/wishlistContext.jsx";

function WishList() {
    const {
        WishList,
        WishlistLoading,
        pageErr,
        fetchWishList
    } = useWishlist();

    return (
        <div className="min-h-screen bg-[#F7F5EE] text-[#20281F]">
            <Navbar />

            <main className="mx-auto max-w-7xl px-5 pb-12 pt-28 sm:px-6">
                <header className="mb-7 flex items-end justify-between gap-4 border-b border-[#DFE4D6] pb-5">
                    <div>
                        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#4A7856]">
                            Saved for later
                        </p>
                        <h1 className="font-serif text-3xl font-medium">My wishlist</h1>
                    </div>
                    {!pageErr && !WishlistLoading && (
                        <p className="pb-1 text-sm text-[#777A70]">
                            {WishList.length} {WishList.length === 1 ? "product" : "products"}
                        </p>
                    )}
                </header>

                {WishlistLoading ? (
                    <div className="flex min-h-[40vh] items-center justify-center">
                        <p className="text-sm text-[#777A70]">Loading your wishlist...</p>
                    </div>
                ) : pageErr ? (
                    <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
                        <h2 className="font-serif text-2xl font-medium">Unable to load your wishlist</h2>
                        <p className="mt-2 text-sm text-[#777A70]">Please try again in a moment.</p>
                        <button
                            onClick={fetchWishList}
                            className="mt-6 rounded-md bg-[#20281F] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4A7856]"
                        >
                            Try again
                        </button>
                    </div>
                ) : WishList.length === 0 ? (
                     <div className="min-h-screen bg-[#F7F5EE] text-[#20281F]">
                                    <Navbar />
                    
                                    <div className="mx-auto flex min-h-[20vh] max-w-7xl flex-col items-center justify-center px-6 pt-24 text-center">
                                        <h2 className="font-serif text-3xl font-medium text-[#20281F]">
                                            Your wishlist is empty
                                        </h2>
                    
                                        <p className="mt-3 text-sm text-[#777A70]">
                                            Start saving products you love.
                                        </p>
                    
                                        <Link
                                            to="/products"
                                            className="mt-6 rounded-md bg-[#20281F] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4A7856]"
                                        >
                                            Browse Products
                                        </Link>
                                    </div>
                                </div>

                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {WishList.map((product) => (
                            <WishlistCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default WishList;
