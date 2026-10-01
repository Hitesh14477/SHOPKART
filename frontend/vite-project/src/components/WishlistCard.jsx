import React from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/wishlistContext";
import { useCart } from "../context/CartContext.jsx";

function WishlistCard({ product }) {

    const { toggleWishList } = useWishlist();
    const { addToCart, cartLoading } = useCart();
    const navigate = useNavigate();

    const handleViewProduct = async () => {
        await toggleWishList(product._id);
        navigate(`/products/${product._id}`);
    };

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#E5E7DF] bg-white transition duration-200 hover:-translate-y-0.5 hover:border-[#C9D4C6] hover:shadow-md">
            <div className="aspect-square overflow-hidden bg-[#F4F2EC]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
            </div>

            <div className="flex flex-1 flex-col p-4 sm:p-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#777A70]">
                    {product.category}
                </p>

                <h2 className="mt-1.5 line-clamp-1 text-base font-semibold text-[#20281F] transition-colors group-hover:text-[#4A7856]">
                    {product.name}
                </h2>

                <div className="mt-4 flex items-end justify-between gap-3 border-t border-[#EEF0E9] pt-3">
                    <p className="text-xl font-semibold text-[#20281F]">
                        ₹{product.price.toLocaleString("en-IN")}
                    </p>
                    <p className={`text-xs ${product.stock > 0 ? "text-[#66806A]" : "text-[#9C5147]"}`}>
                        {product.stock > 0 ? "In stock" : "Out of stock"}
                    </p>
                </div>

                <button
                    onClick={() => toggleWishList(product._id)}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#E8D8D3] bg-[#FBF7F5] py-2.5 text-sm font-medium text-[#8C5A50] transition-colors hover:border-[#D8B8AE] hover:bg-[#F8EFEC] hover:text-[#82473C]"
                >
                    
                   ♡ Remove from wishlist
                </button>

                <button
                    onClick={() => addToCart(product._id)}
                    disabled={cartLoading === product._id || product.stock <= 0}
                    className="mt-4 w-full rounded-md bg-[#20281F] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4A7856] disabled:cursor-not-allowed disabled:bg-[#AEB3A8]"
                >
                    {cartLoading === product._id
                        ? "Adding..."
                        : product.stock <= 0
                            ? "Out of stock"
                            : "Add to cart"}
                </button>

                <button
                    onClick={handleViewProduct}
                    className="mt-2 block w-full py-1.5 text-center text-xs font-medium text-[#687365] transition-colors hover:text-[#35573E]"
                >
                    View details <span aria-hidden="true">→</span>
                </button>
            </div>
        </article>
    );
}

export default WishlistCard;
