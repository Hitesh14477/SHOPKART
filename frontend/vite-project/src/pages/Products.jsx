import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosCalls/axios.js";
import { useAuth } from "../Context/AuthContext.jsx";
import { Link } from "react-router-dom";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const { logout, logoutLoading } = useAuth()

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
            <nav className="flex items-center justify-between px-8 py-5 bg-white border-b border-[#DFE4D6]">
                <Link to='/home'>
                    <h1 className="text-2xl font-serif">
                        shopkart<span className="text-[#B98A3E]">.</span>
                    </h1>
                </Link>
                <div className="flex items-center gap-6 text-sm">
                    <span className="text-[#4A7856]">
                        Products
                    </span>

                    <button className="hover:text-red-600" 
                        onClick={logout}
                        disabled={logoutLoading}
                        >

                        {logoutLoading ? 'loggingout' : 'Logout'}
                    </button> 
                </div>

            </nav>


            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-10">

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="w-full sm:max-w-md px-4 py-3 bg-white border border-[#DFE4D6] rounded-lg outline-none focus:border-[#4A7856] transition"
                    />

                    <select
                        className="px-4 py-3 bg-white border border-[#DFE4D6] rounded-lg outline-none focus:border-[#4A7856]"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Books">Books</option>
                        <option value="Fashion">Fashion</option>
                    </select>

                </div>


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

                            <div
                                key={product._id}
                                className="group bg-white rounded-2xl overflow-hidden border border-[#E5E7DF] hover:shadow-xl transition-all duration-300"
                            >

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


                                {/* Card Content */}
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


                                    {/* Button */}
                                    <Link to={`/products/${product._id}`}>
                                        <button
                                            className="mt-5 w-full bg-[#20281F] text-white py-3 rounded-lg hover:bg-[#4A7856] transition"
                                        >
                                            View Product
                                        </button>
                                    </Link>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </main>

        </div>
    );
}

export default Products;