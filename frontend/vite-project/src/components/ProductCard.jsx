import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/wishlistContext.jsx";
import { useCart } from "../context/CartContext.jsx";




function ProductCard({ product }) {
    const {
        WishList,
        addToWishlist,
        WishlistLoading
    } = useWishlist()

    const { addToCart, cartLoading,cartErr } = useCart()

    const inWishList = WishList.some(
        (item) => item._id === product._id
    );

    return (

        <article className="group flex h-full flex-col overflow-hidden border border-[#E5E7DF] bg-white transition-colors duration-200 hover:border-[#BBC8B9]">
            <Link to={`/products/${product._id}`} className="relative block overflow-hidden bg-[#F4F2EC]">
                <div className="aspect-square overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                </div>
            </Link>

            <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="mb-4">
                    <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-[#777A70]">
                        {product.category}
                    </p>
                    <div className="min-w-0">
                        <Link to={`/products/${product._id}`}>
                            <h2 className="line-clamp-1 text-base font-semibold text-[#20281F] transition-colors group-hover:text-[#4A7856]">
                                {product.name}
                            </h2>
                        </Link>
                        <p className="mt-1.5 line-clamp-2 min-h-[2.5rem] text-sm leading-5 text-[#777A70]">
                            {product.description}
                        </p>
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#EEF0E9] pt-3">
                    <p className="text-xl font-semibold text-[#20281F]">₹{product.price}</p>
                    <p className={`text-xs ${product.stock > 0 ? "text-[#66806A]" : "text-[#9C5147]"}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                    </p>
                </div>

                <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
                    <button
                        onClick={() => addToCart(product._id)}
                        disabled={cartLoading === product._id}
                        className="rounded-md bg-[#20281F] px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4A7856] disabled:cursor-wait"
                    >
                        {cartLoading === product._id ? "Adding…" : "Add to cart"}
                    </button>
                    <button
                        onClick={() => addToWishlist(product._id)}
                        disabled={WishlistLoading === product._id}
                        aria-label={inWishList ? "Remove from wishlist" : "Add to wishlist"}
                        title={inWishList ? "Added to wishlist" : "Add to wishlist"}
                        className={`flex min-w-11 items-center justify-center rounded-md border px-3 text-lg transition-colors disabled:cursor-wait ${inWishList ? "border-[#C9D8C9] bg-[#EDF3EC] text-[#4A7856]" : "border-[#E2E5DC] bg-white text-[#596057] hover:border-[#A9BEAA] hover:text-[#4A7856]"}`}
                    >
                        {WishlistLoading === product._id ? "…" : inWishList ? "♥" : "♡"}
                    </button>
                </div>

                <Link
                    to={`/products/${product._id}`}
                    className="mt-2 block py-1.5 text-center text-xs font-medium text-[#687365] transition-colors hover:text-[#35573E]"
                >
                    View details <span aria-hidden="true">→</span>
                </Link>
            </div>
        </article>
    );
}

export default ProductCard;
