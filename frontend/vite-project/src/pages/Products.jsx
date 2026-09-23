import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosCalls/axios.js";
import ProductCard from "../components/ProductCard.jsx";
import Navbar from "../components/Navbar.jsx";
import { useWishlist } from "../context/wishlistContext.jsx";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
   const{addToWishlist,WishlistLoading}=useWishlist()
    

   

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
         <Navbar/>
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