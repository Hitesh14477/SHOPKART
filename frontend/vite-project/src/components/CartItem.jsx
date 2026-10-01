import { useCart } from "../context/CartContext.jsx";

const CartItem = ({ item }) => {

    const{updateQuantity,removeFromCart}=useCart()

    return (
        <article className="border border-[#E5E7DF] bg-white p-4 transition-colors duration-200 hover:border-[#BBC8B9] sm:p-5">
            <div className="flex gap-4 sm:gap-5">

                {/* Product Image */}
                <div className="aspect-square w-24 shrink-0 overflow-hidden bg-[#F4F2EC] sm:w-32">
                    <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">

                    {/* Top Section */}
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:gap-6">

                        <div>
                            <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.08em] text-[#777A70]">
                                {item.product.category}
                            </p>

                            <h2 className="text-base font-semibold text-[#20281F] sm:text-lg">
                                {item.product.name}
                            </h2>

                            <p className="mt-1.5 text-sm text-[#777A70]">
                                ₹{item.product.price.toLocaleString("en-IN")} each
                            </p>
                        </div>

                        {/* Product Total */}
                        <div className="text-right shrink-0">
                            <p className="mb-1 text-xs text-[#777A70]">
                                Total
                            </p>

                            <p className="text-base font-semibold text-[#20281F] sm:text-lg">
                                ₹{(
                                    item.product.price * item.quantity
                                ).toLocaleString("en-IN")}
                            </p>
                        </div>

                    </div>

                    {/* Bottom Section */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#EEF0E9] pt-4 sm:mt-5">

                        {/* Quantity */}
                        <div className="flex items-center overflow-hidden border border-[#DDE1D7]">

                            <button
                                disabled={item.quantity <= 1}
                                onClick={() => updateQuantity(item.product._id,item.quantity-1)}
                                aria-label="Decrease quantity"
                                className="flex h-9 w-9 items-center justify-center text-lg text-[#20281F] transition-colors hover:bg-[#F4F2EC] disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                −
                            </button>

                            <span className="flex h-9 w-10 items-center justify-center border-x border-[#DDE1D7] text-sm font-medium text-[#20281F]">
                                {item.quantity}
                            </span>

                            <button
                                disabled={item.quantity >= item.product.stock}
                                onClick={() => updateQuantity(item.product._id,item.quantity+1)}
                                aria-label="Increase quantity"
                                className="flex h-9 w-9 items-center justify-center text-lg text-[#20281F] transition-colors hover:bg-[#F4F2EC] disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                +
                            </button>

                        </div>

                        {/* Stock + Remove */}
                        <div className="flex items-center gap-3 sm:gap-5">

                            <span className="text-xs text-[#777A70]">
                                {item.product.stock} in stock
                            </span>

                            <button
                                className="text-sm font-medium text-[#777A70] transition-colors hover:text-[#9C5147]"
                                onClick={() => removeFromCart(item.product._id)}
                            >
                                Remove
                            </button>

                        </div>

                    </div>

                </div>
            </div>
        </article>
    );
};

export default CartItem;
