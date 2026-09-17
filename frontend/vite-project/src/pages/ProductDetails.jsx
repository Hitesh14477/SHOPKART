import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axiosCalls/axios.js";

function ProductDetails() {

    const { id } = useParams();
    const navigate = useNavigate()

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const getProduct = async () => {

            try {
                setLoading(true);

                const response = await axiosInstance.get(`/products/${id}`);

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
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!product) {
        return <h2>Product not found</h2>;
    }


    return (
        <div className="min-h-screen bg-[#F7F5EE] text-[#20281F]">

            {/* Navbar */}
            <nav className="flex items-center justify-between px-8 py-5 bg-white border-b border-[#DFE4D6]">
                <h1 className="text-2xl font-serif">
                    shopkart<span className="text-[#B98A3E]">.</span>
                </h1>

                <p className="text-sm text-[#4A7856]">
                    Product Details
                </p>
            </nav>


            {/* Product Details */}
            <main className="max-w-6xl mx-auto px-6 py-12">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl border border-[#E5E7DF] overflow-hidden shadow-sm">

                    {/* Product Image */}
                    <div className="bg-gray-100 flex items-center justify-center">

                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-[500px] object-cover"
                        />

                    </div>


                    {/* Product Information */}
                    <div className="p-8 flex flex-col justify-center">

                        {/* Category */}
                        <span className="w-fit bg-[#F7F5EE] text-[#4A7856] px-4 py-2 rounded-full text-sm font-medium">
                            {product.category}
                        </span>


                        {/* Name */}
                        <h1 className="text-4xl font-bold mt-5">
                            {product.name}
                        </h1>


                        {/* Description */}
                        <p className="text-gray-500 mt-5 leading-relaxed">
                            {product.description}
                        </p>


                        {/* Price */}
                        <p className="text-3xl font-bold mt-7">
                            ₹{product.price}
                        </p>


                        {/* Stock */}
                        <div className="mt-5">

                            {product.stock > 0 ? (

                                <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                                    In Stock — {product.stock} available
                                </span>

                            ) : (

                                <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                                    Out of Stock
                                </span>

                            )}

                        </div>



                        {/* Back Button */}
                        <button
                            // onClick={() => window.history.back()}
                            onClick={() => navigate("/products")}
                            className="mt-8 w-full bg-[#20281F] text-white py-3 rounded-lg hover:bg-[#4A7856] transition"

                      >
                            ← Back to Products
                        </button>
                        <div className="flex justify-center">
                        <button
                            className="mt-4 w-32 bg-[#FFD814] text-black py-2 rounded-full text-sm font-medium hover:bg-[#F7CA00] transition"
                        >
                            Add to Cart
                        </button>
                        </div>
                    </div>

                </div>

            </main>

        </div>
    )
}

export default ProductDetails