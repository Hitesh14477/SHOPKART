import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosCalls/axios.js";
import ProductCard from "../components/ProductCard.jsx";
import Navbar from "../components/Navbar.jsx";
import { useWishlist } from "../context/wishlistContext.jsx";
import { useCart } from "../context/CartContext.jsx";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const { addToWishlist, WishlistLoading, WishListErr } = useWishlist()
    const { cartErr, cartmsg } = useCart()


    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axiosInstance.get("/products", {
                    params: {
                        search: search,
                        category: category
                    }
                });

                // console.log(response.data.products);
                setProducts(response.data.products);
            } catch (error) {
                console.log(error?.response);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, [search, category]);

    return (
        <div className="min-h-screen bg-[#F7F5EE] text-[#20281F]">

            {/* Navbar */}
            <Navbar />
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 pt-28 pb-10">
                <div className="fixed right-6 top-24 z-50 space-y-3">
                    {WishListErr && (
                        <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-5 py-3 text-red-600 shadow-lg">
                            <span className="text-lg">⚠️</span>
                            <p className="text-sm font-medium">
                                {WishListErr}
                            </p>
                        </div>
                    )}

                    {cartErr && (
                        <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-5 py-3 text-red-600 shadow-lg">
                            <span className="text-lg">⚠️</span>
                            <p className="text-sm font-medium">
                                {cartErr}
                            </p>
                        </div>
                    )}
                </div>
                {cartmsg && (
                    <div className="fixed right-6 top-24 z-50 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-5 py-3 text-green-700 shadow-lg">
                        <span className="text-lg">✓</span>
                        <p className="text-sm font-medium">
                            {cartmsg}
                        </p>
                    </div>
                )}
                {/* Search & Filter */}
                <section className="mb-8 border-b border-[#DFE4D6] pb-6">
                    <div className="mb-5 flex items-end justify-between gap-4">
                        <div>
                            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#4A7856]">
                                Find your next favourite
                            </p>
                            <h1 className="font-serif text-3xl font-medium text-[#20281F]">Products</h1>
                        </div>
                        {!loading && (
                            <p className="pb-1 text-sm text-[#777A70]">
                                {products.length} {products.length === 1 ? "product" : "products"}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <label className="flex min-h-12 flex-1 items-center gap-3 border border-[#DDE1D7] bg-white px-4 transition-colors focus-within:border-[#4A7856] focus-within:ring-2 focus-within:ring-[#4A7856]/10">
                            <svg className="h-4 w-4 shrink-0 text-[#85897E]" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                <circle cx="8.8" cy="8.8" r="5.8" stroke="currentColor" strokeWidth="1.5" />
                                <path d="m13.2 13.2 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products by name..."
                                aria-label="Search products"
                                className="w-full border-0 bg-transparent py-3 text-sm text-[#20281F] outline-none placeholder:text-[#999C92] focus:border-0 focus:shadow-none focus:ring-0"
                            />
                        </label>

                        <label className="flex min-h-12 items-center gap-3 border border-[#DDE1D7] bg-white px-4 transition-colors focus-within:border-[#4A7856] focus-within:ring-2 focus-within:ring-[#4A7856]/10 sm:w-56">
                            <span className="shrink-0 text-xs font-medium text-[#777A70]">Category</span>
                            <select
                                className="min-w-0 flex-1 border-0 bg-transparent py-3 text-sm text-[#20281F] outline-none focus:border-0 focus:shadow-none focus:ring-0"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                aria-label="Filter by category"
                            >
                                <option value="">All</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Books">Books</option>
                                <option value="Fashion">Fashion</option>
                            </select>
                        </label>
                    </div>
                </section>


                {/* Loading */}
                {loading && (
                    <div className="flex justify-center py-20">
                        <p className="text-gray-500">
                            Loading products...
                        </p>
                    </div>
                )}


                {/* Empty */}
                {!loading && products.length === 0 && (
                    <div className="text-center py-20">
                        <h2 className="text-xl font-semibold">
                            No products found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Check back later for new products.
                        </p>
                    </div>
                )}


                {/* Products Grid */}
                {!loading && products.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                addToWishlist={addToWishlist}
                                WishlistLoading={WishlistLoading}
                            />
                        ))}
                    </div>
                )}


            </main>

        </div>
    );
}

export default Products;
