import CartItem from "../components/CartItem.jsx";
import { useCart } from "../context/CartContext.jsx";
import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router-dom";

function Cart() {
    const { cartItems,cartErr,cartLoading,fetchCart ,cartPageErr} = useCart();

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const subtotal = cartItems.reduce(
        (total, item) =>
            total + item.product.price * item.quantity,
        0
    );

    // 1. Loading State
    if (cartLoading) {
        return (
            <div className="min-h-screen bg-[#F7F5EE] text-[#20281F]">
                <Navbar />

                <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6 pt-24">
                    <p className="text-sm text-[#777A70]">Loading your cart...</p>
                </div>
            </div>
        );
    }

    // 2. Error State
    if (cartPageErr) {
        return (
            <div className="min-h-screen bg-[#F7F5EE] text-[#20281F]">
                <Navbar />

                <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6 pt-24">
                    <p className="mb-4 text-base text-[#777A70]">
                        Unable to load cart.
                    </p>

                    <button
                        onClick={fetchCart}
                        className="rounded-md bg-[#20281F] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4A7856]"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F7F5EE] text-[#20281F]">
            <Navbar />

            <main className="mx-auto max-w-7xl px-5 pb-12 pt-28 sm:px-6">

                {/* Heading */}
                <div className="mb-7 flex items-end justify-between border-b border-[#DFE4D6] pb-5">
                    <div>
                        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#4A7856]">Review your selection</p>
                        <h1 className="font-serif text-3xl font-medium">My cart</h1>
                    </div>
                    <p className="pb-1 text-sm text-[#777A70]">
                        {totalItems} {totalItems === 1 ? "item" : "items"}
                    </p>
                </div>

                {cartItems.length === 0 ? (
                     <div className="min-h-screen bg-[#F7F5EE] text-[#20281F]">
                                    <Navbar />
                    
                                    <div className="mx-auto flex min-h-[20vh] max-w-7xl flex-col items-center justify-center px-6 pt-24 text-center">
                                        <h2 className="font-serif text-3xl font-medium text-[#20281F]">
                                            Your cart is empty
                                        </h2>
                    
                                        <p className="mt-3 text-sm text-[#777A70]">
                                            Start adding products you love.
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

                    <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-3">

                        {/* Cart Items */}
                        <div className="space-y-4 lg:col-span-2">
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.product._id}
                                    item={item}
                                />
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div>
                            <div className="border border-[#E5E7DF] bg-white p-5 sm:p-6 lg:sticky lg:top-28">

                                <h2 className="text-base font-semibold text-[#20281F]">
                                    Order Summary
                                </h2>

                                <div className="mt-5 space-y-4">

                                    <div className="flex justify-between text-sm text-[#777A70]">
                                        <span>Items</span>
                                        <span>{totalItems}</span>
                                    </div>

                                    <div className="flex justify-between text-sm text-[#777A70]">
                                        <span>Subtotal</span>
                                        <span>
                                            ₹{subtotal.toLocaleString("en-IN")}
                                        </span>
                                    </div>

                                    <div className="flex justify-between border-t border-[#E5E7DF] pt-4">
                                        <span className="font-semibold text-[#20281F]">
                                            Total
                                        </span>

                                        <span className="text-lg font-semibold text-[#20281F]">
                                            ₹{subtotal.toLocaleString("en-IN")}
                                        </span>
                                    </div>

                                </div>

                                <button className="mt-6 w-full rounded-md bg-[#20281F] py-3 text-sm font-medium text-white transition-colors hover:bg-[#4A7856]">
                                    Proceed to Checkout
                                </button>

                            </div>
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
}

export default Cart;
