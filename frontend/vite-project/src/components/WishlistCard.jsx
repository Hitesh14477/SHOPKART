import React from "react";
import { Link } from "react-router-dom";

function WishlistCard({ product,toggleWishList}) {
    return (
        <div className="bg-white rounded-xl border border-[#E5E7DF] overflow-hidden">

            {/* Image */}
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover"
            />

            {/* Content */}
            <div className="p-4">

                <p className="text-xs text-[#4A7856]">
                    {product.category}
                </p>

                <h2 className="text-lg font-semibold mt-1">
                    {product.name}
                </h2>

                <p className="text-xl font-bold mt-3">
                    ₹{product.price}
                </p>

                {/* View Product */}
                <Link to={`/products/${product._id}`}>
                    <button className="w-full mt-4 bg-[#20281F] text-white py-2.5 rounded-lg hover:bg-[#4A7856] transition">
                        View Product
                    </button>
                </Link>

                {/* Remove */}
                <button
                    onClick={() => toggleWishList(product._id)}
                    className="w-full mt-2 border border-red-500 text-red-500 py-2.5 rounded-lg hover:bg-red-500 hover:text-white transition"
                >
                    ♥ Remove from Wishlist
                </button>

            </div>

        </div>
    );
}

export default WishlistCard;