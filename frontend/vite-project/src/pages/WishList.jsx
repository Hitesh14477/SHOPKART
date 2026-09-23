import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import WishlistCard from "../components/WishlistCard.jsx";
import axiosInstance from "../axiosCalls/axios.js";
import { useWishlist } from "../context/wishlistContext.jsx";

function WishList() {
    const {WishList,toggleWishList}=useWishlist()

   
    return (
        <div className="min-h-screen bg-[#F7F5EE] text-[#20281F]">

            <Navbar/>

            <main className="max-w-7xl mx-auto px-6 py-10">

                <h1 className="text-3xl font-semibold mb-8">
                    My Wishlist
                </h1>

                {WishList.length === 0 ? (

                    <div className="text-center py-20">
                        <h2 className="text-xl font-semibold">
                            Your wishlist is empty
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Add some products to your wishlist.
                        </p>
                    </div>

                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                        {WishList.map((product) => (

                            <WishlistCard
                                key={product._id}
                                product={product}
                                // removeFromWishlist={deleteFromWishList}
                                toggleWishList={toggleWishList}
                            />

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
}

export default WishList;