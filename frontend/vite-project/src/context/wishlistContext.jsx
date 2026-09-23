import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosCalls/axios.js";
const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

    const [WishList, setWishList] = useState([]);
    const [WishlistLoading, setWishListLoading] = useState(null)
    useEffect(() => {
        const fetchWishList = async () => {
            try {
                const response = await axiosInstance.get("/wishlist/");
                setWishList(response.data.wishlist);
            } catch (error) {
                console.log(error.response?.data);
            }
        };

        fetchWishList();
    }, []);
    const addToWishlist = async (productId) => {
        try {
            setWishListLoading(productId)
            await axiosInstance.post(`/wishlist/${productId}`)
            const response = await axiosInstance.get("/wishlist/");
            setWishList(response.data.wishlist);
        } catch (error) {
            console.log(error.response?.data?.message)
        }
        finally {
            setWishListLoading(null)
        }
    }
     const toggleWishList = async (productId) => {
        try {
            await axiosInstance.patch(`/wishlist/${productId}/toggle`);

            setWishList((prev) =>
                prev.filter((product) => product._id !== productId)
            );

        } catch (error) {
            console.log(error.response?.data);
        }
    }
     // const deleteFromWishList = async (productId) => {
    //     try {
    //         await axiosInstance.delete(`/wishlist/${productId}`);

    //         // Remove it immediately from the UI
    //         setWishtList((prev) =>
    //             prev.filter((product) => product._id !== productId)
    //         );

    //     } catch (error) {
    //         console.log(error.response?.data);
    //     }
    // };

    return (
        <WishlistContext.Provider
            value={{ WishList, addToWishlist, WishlistLoading,toggleWishList}}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);