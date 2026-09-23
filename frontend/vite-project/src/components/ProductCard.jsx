import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/wishlistContext";

function ProductCard({ product }) {
    const { WishList, addToWishlist, WishlistLoading } = useWishlist();
    const inWishList=WishList.some((item)=> item._id===product._id)
    return (
        <div className="group bg-white rounded-2xl overflow-hidden border border-[#E5E7DF] hover:shadow-xl transition-all duration-300">

            {/* Image */}
            <div className="relative overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    {product.category}
                </span>
            </div>

            {/* Content */}
            <div className="p-5">

                <h2 className="text-lg font-semibold line-clamp-1">
                    {product.name}
                </h2>

                <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[40px]">
                    {product.description}
                </p>

                {/* Price + Stock */}
                <div className="flex items-center justify-between mt-5">

                    <p className="text-xl font-bold">
                        ₹{product.price}
                    </p>

                    <p
                        className={`text-xs font-medium px-2 py-1 rounded-full ${product.stock > 0
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                    >
                        {product.stock > 0
                            ? `${product.stock} left`
                            : "Out of stock"}
                    </p>

                </div>

                {/* Wishlist */}
                <button
                    onClick={() => addToWishlist(product._id)}
                      disabled={WishlistLoading === product._id}
                    className="mt-5 w-full border border-[#20281F] text-[#20281F] py-3 rounded-lg hover:bg-[#20281F] hover:text-white transition"
                >
                   {WishlistLoading ===product._id ? "saving..." :inWishList?'Added to WishList':" ♡ Add to Wishlist" } 
                </button>

                {/* View Product */}
                <Link to={`/products/${product._id}`}>
                    <button
                        className="mt-3 w-full bg-[#20281F] text-white py-3 rounded-lg hover:bg-[#4A7856] transition"
                    >
                        View Product
                    </button>
                </Link>

            </div>
        </div>
    );
}

export default ProductCard;