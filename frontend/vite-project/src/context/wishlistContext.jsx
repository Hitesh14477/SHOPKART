import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosCalls/axios.js";
import { useAuth } from "./AuthContext.jsx";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

    const [WishList, setWishList] = useState([]);
    const [WishlistLoading, setWishListLoading] = useState(null)            //stores product id 
    const [WishListErr, setWishListErr] = useState("")
    const [pageErr, setPageErr] = useState("")
    const { user } = useAuth();
    const fetchWishList = async () => {
        try {
            const response = await axiosInstance.get("/wishlist/");
            setWishList(response.data.wishlist);
            setPageErr("");
        } catch (error) {
            console.log(error.response?.data);
            setPageErr(error.response?.data?.message || 'Failed to add to wishlist')
            setWishList([])
        }
    };
    useEffect(() => {
        if (user) {
            fetchWishList();
        } else {
            setWishList([])
        }
    }, [user]);

    const addToWishlist = async (productId) => {
        try {
            setWishListLoading(productId)
            await axiosInstance.post(`/wishlist/${productId}`)
            const response = await axiosInstance.get("/wishlist/");
            setWishList(response.data.wishlist);
        } catch (error) {
            console.log(error.response?.data?.message)
            setWishListErr(error.response?.data?.message || 'Failed to add to wishlist')
            setTimeout(() => {
                setWishListErr("");
            }, 2000);
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
            setWishListErr(error.response?.data?.message || 'Failed to add to wishlist')
             setTimeout(() => {
                setWishListErr("");
            }, 2000);
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
            value={{ WishList, addToWishlist, WishlistLoading, toggleWishList, WishListErr, pageErr, fetchWishList }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
