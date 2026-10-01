import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosCalls/axios.js";
import { useAuth } from "./AuthContext.jsx";



const CartContext = createContext()


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [cartLoading, setCartLoading] = useState(null)
    const [cartErr, setCartErr] = useState("")
    const [cartPageErr, setCartPageErr] = useState("")
    const [cartmsg, setCartmsg ] = useState("")

    const { user } = useAuth()

    const fetchCart = async () => {
        try {
            setCartPageErr("")
            const response = await axiosInstance.get('/cart')
            setCartItems(response.data.cart)
        } catch (error) {
            console.log(error.response?.data?.message);
            setCartPageErr(error.response?.data?.message || 'something went wrong')
            setCartItems([])
        }
    }
    useEffect(() => {
        if (user) {
            fetchCart()
        }
        else {
            setCartItems([])
        }
    }, [user])

    const addToCart = async (productId) => {
        try {
            setCartLoading(productId)
            await axiosInstance.post(`/cart/${productId}`)
            const response = await axiosInstance.get(`/cart`)
            console.log(response.data.cart)
            setCartItems(response.data.cart)
            setCartmsg('Product Added to Cart')
            setTimeout(() => {
                setCartmsg("");
            }, 2000);
        } catch (error) {
            console.log(error.response?.data?.message)
            setCartErr(error.response?.data?.message || 'something went wrong')
            setTimeout(() => {
                setCartErr("");
            }, 2000);
        }
        finally {
            setCartLoading(null)
        }
    }

    const removeFromCart = async (productId) => {
        try {
            setCartErr("")
            await axiosInstance.delete(`/cart/${productId}`);

            // Remove it immediately from the UI
            setCartItems((prev) =>
                prev.filter((item) => item.product._id !== productId)
            );

        } catch (error) {
            console.log(error.response?.data?.message);
            setCartErr(error.response?.data?.message || 'something went wrong')
        }
    }

    const updateQuantity = async (productId, quantity) => {
        try {
            setCartErr("")
            const numericQuantity = Number(quantity)
            const response = await axiosInstance.patch(`cart/${productId}`, { quantity: numericQuantity })
            setCartItems(response.data.cart)

        } catch (error) {
            console.log(error.response?.data?.message);
            setCartErr(error.response?.data?.message || 'something went wrong')
        }
    }


    return (
        <CartContext.Provider value={{ addToCart, cartLoading, cartErr, cartItems, removeFromCart, fetchCart, updateQuantity,cartmsg, cartPageErr }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)