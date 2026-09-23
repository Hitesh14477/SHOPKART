import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axiosCalls/axios.js";

function ProductDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [wishLoading, setWishLoading] = useState(false);

    const addToWishlist = async (productId) => {
        try {
            setWishLoading(true);

            const response = await axiosInstance.post(
                `/wishlist/${productId}`
            );

            console.log(response.data);

        } catch (error) {
            console.log(error.response?.data);
        } finally {
            setWishLoading(false);
        }
    };

    useEffect(() => {

        const getProduct = async () => {

            try {
                setLoading(true);

                const response = await axiosInstance.get(
                    `/products/${id}`
                );

                setProduct(response.data.product);

            } catch (error) {

                console.log(error?.response);
                setError("Failed to load product");

            } finally {

                setLoading(false);

            }
        };

        getProduct();

    }, [id]);


    if (loading) {
        return (
            <div className="min-h-screen bg-[#F7F5EE] flex items-center justify-center">
                <p className="text-gray-500">
                    Loading product...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#F7F5EE] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">
                        {error}
                    </h2>

                    <button
                        onClick={() => navigate("/products")}
                        className="mt-5 bg-[#20281F] text-white px-6 py-3 rounded-lg"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#F7F5EE] flex items-center justify-center">
                <p>Product not found</p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-[#F7F5EE] text-[#20281F]">

            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-5 bg-white border-b border-[#DFE4D6]">

                <button onClick={() => navigate("/home")}>
                    <h1 className="text-2xl font-serif">
                        shopkart
                        <span className="text-[#B98A3E]">.</span>
                    </h1>
                </button>

                <button
                    onClick={() => navigate("/products")}
                    className="text-sm text-gray-600 hover:text-[#4A7856] transition"
                >
                    ← Back to Products
                </button>

            </nav>


            {/* Main */}
            <main className="max-w-6xl mx-auto px-6 py-12">

                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-6">
                    Home / Products /{" "}
                    <span className="text-[#20281F]">
                        {product.name}
                    </span>
                </div>


                {/* Product Container */}
                <div className="bg-white rounded-3xl border border-[#E5E7DF] overflow-hidden shadow-sm">

                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        {/* Product Image */}
                        <div className="bg-[#F3F2EC] p-8 lg:p-12">

                            <div className="relative overflow-hidden rounded-2xl bg-white">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-[450px] lg:h-[550px] object-cover hover:scale-105 transition-transform duration-500"
                                />

                                {/* Category */}
                                <span className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                                    {product.category}
                                </span>

                            </div>

                        </div>


                        {/* Product Information */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">

                            {/* Category */}
                            <p className="text-sm uppercase tracking-widest text-[#4A7856] font-semibold">
                                {product.category}
                            </p>


                            {/* Product Name */}
                            <h1 className="text-4xl lg:text-5xl font-semibold mt-3 leading-tight">
                                {product.name}
                            </h1>


                            {/* Rating */}
                            {/* <div className="flex items-center gap-2 mt-5">

                                <div className="flex text-[#B98A3E]">
                                    ★ ★ ★ ★ ★
                                </div>

                                <span className="text-sm text-gray-500">
                                    Customer favorite
                                </span>

                            </div> */}


                            {/* Price */}
                            <div className="mt-7">

                                <span className="text-4xl font-bold">
                                    ₹{product.price}
                                </span>

                            </div>


                            {/* Divider */}
                            <div className="border-t border-[#E5E7DF] my-7" />


                            {/* Description */}
                            <div>

                                <h3 className="font-semibold text-lg">
                                    About this product
                                </h3>

                                <p className="text-gray-500 mt-3 leading-7">
                                    {product.description}
                                </p>

                            </div>


                            {/* Stock */}
                            <div className="mt-7">

                                {product.stock > 0 ? (

                                    <div className="flex items-center gap-3">

                                        <span className="w-3 h-3 rounded-full bg-green-500" />

                                        <span className="text-green-700 font-medium">
                                            In Stock
                                        </span>

                                        <span className="text-gray-500 text-sm">
                                            ({product.stock} available)
                                        </span>

                                    </div>

                                ) : (

                                    <div className="flex items-center gap-3">

                                        <span className="w-3 h-3 rounded-full bg-red-500" />

                                        <span className="text-red-600 font-medium">
                                            Out of Stock
                                        </span>

                                    </div>

                                )}

                            </div>


                            {/* Actions */}
                            <div className="mt-8 flex flex-col sm:flex-row gap-3">

                                {/* Add to Cart */}
                                <button
                                    disabled={product.stock === 0}
                                    className="flex-1 bg-[#20281F] text-white py-4 rounded-xl font-medium hover:bg-[#4A7856] transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Add to Cart
                                </button>


                                {/* Wishlist */}
                                <button
                                    onClick={() => addToWishlist(product._id)}
                                    disabled={wishLoading}
                                    className="flex-1 border border-[#20281F] py-4 rounded-xl font-medium hover:bg-[#20281F] hover:text-white transition disabled:opacity-60"
                                >
                                    {wishLoading
                                        ? "Saving..."
                                        : "♡ Add to Wishlist"}
                                </button>

                            </div>


                            {/* Additional Info */}
                           

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default ProductDetails;