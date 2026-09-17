import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosCalls/axios.js";



//creating context
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [logoutLoading, setLogoutLoading] = useState(false);


    useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get('/customers/me')
                // console.log(response)
                setUser(response.data.customer)
            }
            catch (error) {
                setUser(null)
            }
            finally {
                setLoading(false)
            }
        }
        checkAuth()
    }, [])

    const login = async (loginData) => {
        try {
            const response = await axiosInstance.post(
                "/customers/login",
                loginData
            );
            console.log(response.data.customer)
            setUser(response.data.customer);
            return response.data.customer;
        } catch (error) {
            console.log(error);
            throw error
        }

    };

    const logout = async () => {
        try {
            setLogoutLoading(true);

            const response = await axiosInstance.post("/customers/logout");

            console.log("Logout response:", response.data);

            setUser(null);


        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLogoutLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, logout, logoutLoading }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)
