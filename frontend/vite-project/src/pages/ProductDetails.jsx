import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axiosCalls/axios.js";
import { useWishlist } from "../context/wishlistContext.jsx";
import Navbar from "../components/Navbar.jsx";

function ProductDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { WishList, addToWishlist, WishlistLoading,WishListErr } = useWishlist()
    const inWishList = WishList.some((item) => item._id === product?._id)



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

            <Navbar />
            {/* <button
                    onClick={() => navigate("/products")}
                    className="text-sm text-gray-600 hover:text-[#4A7856] transition"
                >
                    ← Back to Products */}
            {/* </button> */}
           




            {/* Main */}
            <main className="mx-auto max-w-6xl px-5 pb-12 pt-28 sm:px-6">

                   {WishListErr && (
                       <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600 shadow-sm">
                        <span className="text-lg">⚠️</span>
                        <p className="text-sm font-medium">
                            {WishListErr}
                        </p>
                    </div>
                )}
                {/* Breadcrumb */}
                <div className="mb-5 text-sm text-[#777A70]">
                    <Link to="/home" className="transition-colors hover:text-[#4A7856]">Home</Link>
                    <span className="px-2 text-[#B8B9B1]">/</span>
                    <Link to="/products" className="transition-colors hover:text-[#4A7856]">Products</Link>
                    <span className="px-2 text-[#B8B9B1]">/</span>
                    <span className="text-[#20281F]">
                        {product.name}
                    </span>
                </div>


                {/* Product Container */}
                <div className="overflow-hidden border border-[#E5E7DF] bg-white">

                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        {/* Product Image */}
                        <div className="flex items-center justify-center bg-[#F4F2EC] p-5 sm:p-8 lg:p-10">

                            <div className="w-full overflow-hidden bg-white">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="aspect-square w-full object-contain"
                                />

                            </div>

                        </div>


                        {/* Product Information */}
                        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">

                            {/* Category */}
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4A7856]">
                                {product.category}
                            </p>


                            {/* Product Name */}
                            <h1 className="mt-3 font-serif text-3xl font-medium leading-tight text-[#20281F] sm:text-4xl">
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
                            <div className="mt-6">

                                <span className="text-3xl font-semibold tracking-tight">
                                    ₹{product.price}
                                </span>

                            </div>


                            {/* Divider */}
                            <div className="my-6 border-t border-[#E5E7DF]" />


                            {/* Description */}
                            <div>

                                <h3 className="text-sm font-semibold">
                                    About this product
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-[#777A70]">
                                    {product.description}
                                </p>

                            </div>


                            {/* Stock */}
                            <div className="mt-7">

                                {product.stock > 0 ? (

                                    <div className="flex items-center gap-3">

                                        <span className="h-2 w-2 rounded-full bg-[#4A7856]" />

                                        <span className="text-sm font-medium text-[#35573E]">
                                            In Stock
                                        </span>

                                        <span className="text-sm text-[#777A70]">
                                            ({product.stock} available)
                                        </span>

                                    </div>

                                ) : (

                                    <div className="flex items-center gap-3">

                                        <span className="h-2 w-2 rounded-full bg-[#9C5147]" />

                                        <span className="text-sm font-medium text-[#9C5147]">
                                            Out of Stock
                                        </span>

                                    </div>

                                )}

                            </div>


                            {/* Actions */}
                            <div className="mt-8">

                                {/* Main Actions */}
                                <div className="flex flex-col sm:flex-row gap-3">

                                    {/* Add to Cart */}
                                    <button
                                        disabled={product.stock === 0}
                                        className="flex-1 rounded-md bg-[#20281F] py-3 text-sm font-medium text-white transition-colors hover:bg-[#4A7856] disabled:cursor-not-allowed disabled:bg-gray-300"
                                    >
                                        Add to Cart
                                    </button>

                                    {/* Wishlist */}
                                    <button
                                        onClick={() => addToWishlist(product._id)}
                                        disabled={WishlistLoading === product._id}
                                        className="flex-1 rounded-md border border-[#D6DCCF] py-3 text-sm font-medium transition-colors hover:border-[#20281F] hover:bg-[#20281F] hover:text-white disabled:opacity-60"
                                    >
                                        {WishlistLoading === product._id
                                            ? "Saving..."
                                            : inWishList
                                                ? "✔️ Added to Wishlist"
                                                : "♡ Add to Wishlist"
                                        }
                                    </button>

                                </div>

                                {/* Back to Products */}
                                <Link
                                    to="/products"
                                    className="mt-3 block"
                                >
                                    <button
                                        className="w-full rounded-md border border-[#D6DCCF] py-3 text-sm font-medium text-[#20281F] transition-colors hover:border-[#D6DCCF] hover:bg-[#F7F5EE]"
                                    >
                                        ← Back to Products
                                    </button>
                                </Link>

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
