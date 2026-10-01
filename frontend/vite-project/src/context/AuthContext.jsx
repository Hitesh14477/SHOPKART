import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosCalls/axios.js";



//creating context
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [logoutLoading, setLogoutLoading] = useState(false);


    useEffect(() => {
        let isCurrent = true;

        const checkAuth = async () => {
            try {
                const response = await axiosInstance.get('/customers/me')
                if (isCurrent) {
                    setUser(response.data.customer)
                }
            }
            catch (error) {
                if (isCurrent) {
                    setUser(null)
                }
            }
            finally {
                if (isCurrent) {
                    setLoading(false)
                }
            }
        }
        checkAuth()

        return () => {
            isCurrent = false;
        }
    }, [])

    const login = async (loginData) => {
        try {
            const response = await axiosInstance.post(
                "/customers/login",
                loginData
            );
            // console.log(response.data.customer)
            setUser(response.data.customer);
            return response.data.customer;
        } catch (error) {
            console.log(error);
            throw error
        }

    };

    const updateProfile = async (profileData) => {
        const response = await axiosInstance.patch("/customers/profile", profileData);
        setUser(response.data.customer);
        return response.data.customer;
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
        <AuthContext.Provider value={{ user, setUser, loading, login, updateProfile, logout, logoutLoading }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)
